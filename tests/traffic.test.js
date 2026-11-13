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

test("production returns shared totals and previews stay out of the counter", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json({ result: [32, 54] }));
  const env = {
    UPSTASH_REDIS_REST_URL: "https://redis.example",
    UPSTASH_REDIS_REST_TOKEN: "test-token",
    VERCEL_ENV: "production",
  };
  for (const [key, value] of Object.entries(env)) {
    const previous = process.env[key];
    process.env[key] = value;
    t.after(() => {
      if (previous === undefined) delete process.env[key];
      else process.env[key] = previous;
    });
  }

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
