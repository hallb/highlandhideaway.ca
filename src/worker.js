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

// Honest automation announces itself in the User-Agent. This catches that and
// nothing more: a scraper sending a Chrome string is indistinguishable here,
// which is why the raw user agent and the network operator go into the row
// alongside the verdict. The verdict is a convenience for the dashboard; the
// other two are the evidence, and they let a better rule be applied later to
// data already collected.
//
// Cloudflare's own bot score would be better and is not available: request.cf
// .botManagement needs Bot Management, a paid add-on. request.cf.asn and
// .asOrganization are on every plan, which is why they are what we have.
const BOT_UA =
  /bot|crawl|spider|slurp|scrape|archiver|monitor|uptime|pingdom|probe|check|validator|preview|fetch|feed|curl|wget|lychee|python|java|go-http|okhttp|libwww|httpclient|axios|node-fetch|postman|insomnia|headless|phantom|puppeteer|playwright|lighthouse|facebookexternalhit|embedly|whatsapp|telegram|discord|slack/i;

function classifyAgent(ua) {
  // No User-Agent at all is not a browser. Every one of them sends something.
  if (!ua) return "bot";
  return BOT_UA.test(ua) ? "bot" : "human";
}

function recordClick(env, request, source, position) {
  if (!env.CLICKS) return;
  try {
    const ua = request.headers.get("user-agent") || "";
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
        classifyAgent(ua),
        ua.slice(0, 128),
        (request.cf?.asOrganization || "").slice(0, 64),
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
