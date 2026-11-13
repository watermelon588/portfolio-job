import assert from "node:assert/strict";
import { test } from "node:test";
import traffic from "../api/traffic.js";

const origin = "https://portfolio.example";
const visitor = "71725906-028c-4dd6-9fb0-c82fab9d76bf";

function request({ method = "POST", from = origin, id = visitor } = {}) {
  return new Request(`${origin}/api/traffic`, {
    method,
    headers: { Origin: from, "X-Portfolio-Visitor": id },
  });
}

test("the counter accepts only same-origin POSTs with a valid browser ID", async () => {
  assert.equal((await traffic.fetch(request({ method: "GET" }))).status, 405);
  assert.equal((await traffic.fetch(request({ from: "https://elsewhere.example" }))).status, 403);
  assert.equal((await traffic.fetch(request({ id: "invalid" }))).status, 400);
});

function useEnv(t, env) {
  for (const key of ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "KV_REST_API_URL", "KV_REST_API_TOKEN", "VERCEL_ENV"]) {
    const previous = process.env[key];
    if (env[key] === undefined) delete process.env[key];
    else process.env[key] = env[key];
    t.after(() => {
      if (previous === undefined) delete process.env[key];
      else process.env[key] = previous;
    });
  }
}

test("production returns shared totals and previews stay out of the counter", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json({ result: [32, 54] }));
  useEnv(t, {
    UPSTASH_REDIS_REST_URL: "https://redis.example",
    UPSTASH_REDIS_REST_TOKEN: "test-token",
    VERCEL_ENV: "production",
  });

  const response = await traffic.fetch(request());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await response.json(), { visitors: 32, visits: 54 });

  process.env.VERCEL_ENV = "preview";
  assert.equal((await traffic.fetch(request())).status, 204);
  assert.equal(fetch.mock.callCount(), 1);

  process.env.VERCEL_ENV = "production";
  fetch.mock.mockImplementation(async () => Response.json({ error: "Storage unavailable" }));
  assert.equal((await traffic.fetch(request())).status, 503);
});

test("the live domain uses Marketplace Redis credentials with system variables disabled", async (t) => {
  useEnv(t, { KV_REST_API_URL: "https://marketplace.example", KV_REST_API_TOKEN: "marketplace-token" });
  const redis = t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://marketplace.example");
    assert.equal(options.headers.Authorization, "Bearer marketplace-token");
    return Response.json({ result: [1, 1] });
  });
  const liveOrigin = "https://portfolio2-mu-inky.vercel.app";
  const liveRequest = new Request(`${liveOrigin}/api/traffic`, {
    method: "POST",
    headers: { Origin: liveOrigin, "X-Portfolio-Visitor": visitor },
  });

  assert.equal((await traffic.fetch(request())).status, 204);
  assert.equal((await traffic.fetch(liveRequest)).status, 200);
  process.env.VERCEL_ENV = "preview";
  assert.equal((await traffic.fetch(liveRequest)).status, 204);
  assert.equal(redis.mock.callCount(), 1);
});
