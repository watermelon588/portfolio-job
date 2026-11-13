const visitorKey = "rm-portfolio-visitor";
const number = new Intl.NumberFormat("en");

function getVisitorId() {
  const saved = localStorage.getItem(visitorKey);
  if (saved) return saved;

  const id = crypto.randomUUID();
  localStorage.setItem(visitorKey, id);
  return id;
}

export function wireTraffic(counter) {
  // Vite's plain dev server has no Vercel Functions.
  if (import.meta.env.DEV) return;

  const update = async () => {
    try {
      // Coordinate first-time ID creation when two tabs open together.
      const id = navigator.locks ? await navigator.locks.request(visitorKey, getVisitorId) : getVisitorId();

      const response = await fetch("/api/traffic", {
        method: "POST",
        headers: { "X-Portfolio-Visitor": id },
        keepalive: true,
      });
      if (response.status !== 200) return;

      const { visitors, visits } = await response.json();
      if (!Number.isSafeInteger(visitors) || !Number.isSafeInteger(visits)) return;
      counter.textContent = `${number.format(visitors)} ${visitors === 1 ? "visitor" : "visitors"} · ${number.format(visits)} ${visits === 1 ? "visit" : "visits"}`;
      counter.hidden = false;
    } catch {
      // Storage may be blocked or the counter may be offline.
    }
  };

  void update();
  addEventListener("pageshow", (event) => {
    if (event.persisted) void update();
  });
}
