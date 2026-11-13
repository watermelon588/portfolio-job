import { site } from "../src/config/site.js";

const visitorId = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;

// Redis executes the whole update atomically, including across concurrent tabs.
const recordVisit = `
  local active = redis.call("EXISTS", KEYS[3])
  redis.call("SET", KEYS[3], "1", "EX", 1800)
  if active == 0 then
    redis.call("SADD", KEYS[1], ARGV[1])
    redis.call("INCR", KEYS[2])
  end
  return { redis.call("SCARD", KEYS[1]), tonumber(redis.call("GET", KEYS[2])) }
`;

export default {
  async fetch(request) {
    const headers = { "Cache-Control": "no-store" };
    if (request.method !== "POST") {
      return new Response(null, { status: 405, headers: { ...headers, Allow: "POST" } });
    }
    const origin = new URL(request.url).origin;
    if (request.headers.get("Origin") !== origin) {
      return new Response(null, { status: 403, headers });
    }

    const id = request.headers.get("X-Portfolio-Visitor");
    if (!id || !visitorId.test(id)) return new Response(null, { status: 400, headers });

    const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, KV_REST_API_URL, KV_REST_API_TOKEN, VERCEL_ENV } = process.env;
    const production = VERCEL_ENV ? VERCEL_ENV === "production" : origin === site.origin;
    if (!production) {
      return new Response(null, { status: 204, headers: { ...headers, "X-Portfolio-Traffic": "disabled" } });
    }

    const [url, token] = UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN
      ? [UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN]
      : [KV_REST_API_URL, KV_REST_API_TOKEN];
    if (!url || !token) {
      return new Response(null, { status: 204, headers: { ...headers, "X-Portfolio-Traffic": "redis-unconfigured" } });
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([
          "EVAL", recordVisit, 3,
          "{portfolio-traffic}:visitors", "{portfolio-traffic}:visits", `{portfolio-traffic}:active:${id}`,
          id,
        ]),
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) return new Response(null, { status: 503, headers });

      const { result: [visitors, visits] } = await response.json();
      if (Number.isSafeInteger(visitors) && visitors >= 0 && Number.isSafeInteger(visits) && visits >= visitors) {
        return Response.json({ visitors, visits }, { headers });
      }
    } catch {
      // The portfolio remains usable if the counter's storage is unavailable.
    }
    return new Response(null, { status: 503, headers });
  },
};
