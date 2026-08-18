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

function recordClick(env, request, source) {
  if (!env.CLICKS) return;
  try {
    env.CLICKS.writeDataPoint({
      indexes: ["booking"],
      blobs: [
        source.slice(0, 96),
        request.headers.get("referer") || "",
        request.cf?.country || "",
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
      recordClick(env, request, source);
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
