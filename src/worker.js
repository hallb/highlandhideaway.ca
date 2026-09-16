/**
 * Booking redirect and conversion counter for www.highlandhideaway.ca.
 *
 * The "Book now" buttons point at /go/airbnb rather than straight at the
 * listing, so every click to Airbnb becomes a request on our own domain.
 * It is counted server-side, which means ad blockers cannot hide it and no
 * cookie is involved.
 *
 * wrangler.toml sets run_worker_first = ["/go/*"], so this Worker is only
 * invoked for the redirect and for paths with no matching asset. Everything
 * else is served from the asset store without running any code.
 *
 * Both bindings are declared in wrangler.toml but treated as optional here,
 * so a binding that fails to attach can never cost a booking:
 *   BOOKING_URL  plain var          the listing URL
 *   CLICKS       Analytics Engine   dataset to write click events to
 */
const FALLBACK_URL = "https://airbnb.ca/h/hideaway-near-haliburton";

// Honest automation announces itself in the User-Agent. That is the first of
// two tests here, and on its own it was not enough: a scraper sending a Chrome
// string is indistinguishable by user agent alone, which is why the raw user
// agent and the network operator also go into the row alongside the verdict.
// The verdict is a convenience for the dashboard; those two are the evidence.
//
// Cloudflare's own bot score would be better and is not available: request.cf
// .botManagement needs Bot Management, a paid add-on. request.cf.asn and
// .asOrganization are on every plan, which is why they are what we have.
const BOT_UA =
  /bot|crawl|spider|slurp|scrape|archiver|monitor|uptime|pingdom|probe|check|validator|preview|fetch|feed|curl|wget|lychee|python|java|go-http|okhttp|libwww|httpclient|axios|node-fetch|postman|insomnia|headless|phantom|puppeteer|playwright|lighthouse|facebookexternalhit|embedly|whatsapp|telegram|discord|slack/i;

// The second test, added 2026-09-15 for ISS-58, and the reason the evidence
// was recorded in the first place. Over 2026-08-18 to 2026-09-06 the user
// agent alone labelled 141 clicks "human" while Cloudflare RUM saw 70 real
// visits for the same window -- a conversion numerator twice its denominator,
// which is impossible. Reclassifying those rows by network operator found 13
// clicks from Google LLC sending an ordinary Android Chrome string, plus a
// long tail arriving one at a time from 40-plus countries RUM records no
// visitors from at all. Roughly 80% of what this function called human was a
// machine, so every conversion figure built on it was overstated about
// fivefold.
//
// People browse from consumer ISPs. Nobody books a cottage from a datacenter,
// so the operator is a stronger signal than the string the client chooses to
// send -- the client controls the user agent and cannot fake the network it
// comes from.
//
// Generic terms are in here deliberately, alongside the named operators, to
// catch that long tail without this list having to be updated for every new
// host. The known-false-positive cost is a guest browsing over a corporate
// VPN or a cloud-hosted privacy relay, which is rare on a cottage booking
// link and, unlike the machines, does not arrive thirteen at a time.
const BOT_ASN =
  /\b(?:google|amazon|aws|microsoft|azure|cloudflare|huawei|alibaba|aliyun|tencent|baidu|oracle|ibm|digitalocean|linode|akamai|fastly|ovh|hetzner|scaleway|vultr|choopa|contabo|leaseweb|m247|datacamp|censys|shodan|cloud|hosting|datacenter|colo|vps|server)\b|data\s*cent(?:er|re)/i;

function classifyAgent(ua, asOrg) {
  // No User-Agent at all is not a browser. Every one of them sends something.
  if (!ua) return "bot";
  // Either test is sufficient. asOrg is optional: it is absent in tests and
  // could be absent at the edge, and a missing operator must never promote a
  // request to "human" that the user agent already condemned.
  if (asOrg && BOT_ASN.test(asOrg)) return "bot";
  return BOT_UA.test(ua) ? "bot" : "human";
}

function recordClick(env, request, source, position) {
  if (!env.CLICKS) return;
  try {
    const ua = request.headers.get("user-agent") || "";
    const asOrg = request.cf?.asOrganization || "";
    env.CLICKS.writeDataPoint({
      indexes: ["booking"],
      blobs: [
        source.slice(0, 96),
        request.headers.get("referer") || "",
        request.cf?.country || "",
        // blob4 onwards are appended rather than inserted: rows written before
        // the sticky rail existed carry three blobs, and every Grafana panel
        // reads blob1-3, so adding fields on the end costs no history. Keep
        // following that rule -- inserting one would silently reinterpret
        // every row already written.
        position.slice(0, 16),
        // blob5-7, added 2026-08-20 for ISS-36. Page views from Web Analytics
        // exclude bots and these clicks did not, so any conversion rate built
        // from the two was overstated by however much of the numerator was
        // machines -- measured at roughly 16% of rows over the preceding two
        // weeks, from crawlers following the booking link on every page.
        //
        // blob5 still holds the verdict and still holds only "bot" or "human",
        // which is what keeps the existing panels reading it correctly. What
        // changed on 2026-09-15 is how it is computed: classifyAgent now also
        // weighs the operator in blob7 (ISS-58). Rows written before that date
        // carry the weaker user-agent-only verdict, so a panel spanning the
        // deploy sees the rule improve rather than the traffic change. The
        // fixed field is blob6 and blob7 -- the raw evidence, which is why a
        // better rule could be written at all, and why the next one can be
        // applied to this data too.
        classifyAgent(ua, asOrg),
        ua.slice(0, 128),
        asOrg.slice(0, 64),
      ],
      doubles: [1],
    });
  } catch (err) {
    // A failed write must never break the redirect.
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/go/airbnb") {
      const source = url.searchParams.get("src") || "unknown";
      // Which CTA on the page: "inline" for the {{< book >}} shortcode,
      // "rail" for the sticky card beside the article above 900px, and "bar"
      // for the strip pinned to the bottom of the viewport below it (ISS-33).
      // The three are mutually exclusive on any given viewport, which is what
      // makes them comparable in the dashboard.
      const position = url.searchParams.get("pos") || "unknown";
      recordClick(env, request, source, position);
      return new Response(null, {
        status: 302,
        headers: {
          Location: env.BOOKING_URL || FALLBACK_URL,
          // The count is only correct if this is never served from cache.
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
