import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./base.css";
import { theme, variants } from "../config/theme.js";
import { setSessionTheme } from "./theme-choice.js";
import { content } from "../config/content.js";
import { images } from "../config/assets.js";
import { page, currentProject, nextProject, aboutPhotos } from "./data.js";
import { applyVeils } from "./veil.js";
import { wireForm } from "./form.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
export { gsap, ScrollTrigger, SplitText };

const TITLES = { index: null, about: "About", contact: "Contact" };

/**
 * Boot a variant page: apply its theme, load fonts, render, then wire motion.
 * `render(ctx)` returns the page HTML; `after(ctx)` adds variant-only motion.
 * ctx = { c: content, t: theme, page, portrait, photos, project, next }
 */
export async function boot(key, render, after) {
  const t = theme[key];
  const root = document.documentElement;
  root.classList.add("is-loading");
  root.dataset.variant = key;
  root.dataset.tone = t.media?.[page] ?? "color";

  for (const [k, v] of Object.entries(t.colors)) root.style.setProperty(`--${k}`, v);
  for (const k of ["display", "body", "mono"]) root.style.setProperty(`--font-${k}`, t.fonts[k]);
  root.style.setProperty("--portrait-w", t.portrait.width);

  const fonts = document.createElement("link");
  fonts.rel = "stylesheet";
  fonts.href = `https://fonts.googleapis.com/css2?${t.fonts.google.map((f) => `family=${f}`).join("&")}&display=swap`;
  document.head.append(fonts);

  const ctx = {
    c: content,
    t,
    page,
    portrait: t.portrait.image ? images[t.portrait.image] : null,
    photos: aboutPhotos(),
  };
  if (page === "work") {
    ctx.project = currentProject();
    ctx.next = nextProject(ctx.project);
  }

  const name = content.person.name;
  document.title = page === "work" ? `${ctx.project.title} — ${name}` : TITLES[page] ? `${TITLES[page]} — ${name}` : content.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", page === "work" ? ctx.project.summary : content.meta.description);

  document.getElementById("app").innerHTML = duotoneFilter(t.colors) + render(ctx);

  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1800))]);
  root.classList.remove("is-loading");

  ctx.lenis = reduced ? null : smoothScroll(t.motion.lerp);
  if (!reduced) reveals(t.motion.speed);
  applyVeils(t.veil);
  setSessionTheme(key);
  themeSwitcher(key);
  wireForm();
  startClocks();
  pageFades();
  after?.(ctx);
  if (location.hash) requestAnimationFrame(() => ctx.lenis?.scrollTo(location.hash, { immediate: true }));
  return ctx;
}

/** #duo: shadows → accent, highlights → bg. Used by the "duotone" media tone. */
function duotoneFilter({ accent, bg }) {
  const ch = (hex) => [1, 3, 5].map((i) => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(3));
  const [a, b] = [ch(accent), ch(bg)];
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="duo" color-interpolation-filters="sRGB">
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>${["R", "G", "B"].map((c, i) => `<feFunc${c} type="table" tableValues="${a[i]} ${b[i]}"/>`).join("")}</feComponentTransfer>
  </filter></svg>`;
}

function smoothScroll(lerp) {
  const lenis = new Lenis({ lerp });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    lenis.scrollTo(a.getAttribute("href") === "#" ? 0 : a.getAttribute("href"), { duration: 1.4 });
  });
  return lenis;
}

/**
 * Floating theme switcher (every page, every variant). Picking a theme opens
 * the same page in that variant.
 */
function themeSwitcher(key) {
  const file = location.pathname.split("/").pop() || "index.html";
  const n = variants.findIndex((v) => v.key === key);
  const dot = (v) => `<i class="ts-dot" style="background:${v.accent}"></i>`;
  const el = document.createElement("div");
  el.className = "ts";
  el.innerHTML = `
    <ul class="ts-menu" id="ts-menu" hidden>
      ${variants.map((v, i) => `<li><a href="/${v.key}/${file}${location.search}" data-theme="${v.key}"${v.key === key ? ' aria-current="true"' : ""}>${dot(v)}<span class="ts-n">0${i + 1}</span>${v.name}</a></li>`).join("")}
    </ul>
    <button class="ts-btn" type="button" aria-expanded="false" aria-controls="ts-menu">${dot(variants[n])}Theme 0${n + 1} / 0${variants.length}</button>`;
  document.body.append(el);
  const btn = el.querySelector(".ts-btn");
  const menu = el.querySelector(".ts-menu");
  const set = (open) => { menu.hidden = !open; btn.setAttribute("aria-expanded", open); };
  btn.addEventListener("click", () => set(menu.hidden));
  document.addEventListener("click", (e) => !el.contains(e.target) && set(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && set(false));
}

/** Quiet fade-out before moving to another page of the site. */
function pageFades() {
  addEventListener("pageshow", (e) => e.persisted && document.documentElement.classList.remove("is-leaving"));
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || /\.(pdf|png|jpe?g|webp)$/i.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    document.documentElement.classList.add("is-leaving");
    setTimeout(() => (location.href = url.href), reduced ? 0 : 380);
  });
}

/**
 * Markup hooks every variant can use:
 *   data-split          masked line-by-line rise
 *   data-reveal         soft fade + lift
 *   data-rule           hairline draws left → right
 *   data-clip           image wipes up into view
 *   data-delay="0.2"    extra delay (seconds)
 */
function reveals(speed) {
  const d = (el) => parseFloat(el.dataset.delay || 0);
  const trigger = (el) => ({ trigger: el, start: "top 90%", once: true });

  document.querySelectorAll("[data-split]").forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 105,
          duration: 1.2 * speed,
          ease: "expo.out",
          stagger: 0.08 * speed,
          delay: d(el),
          scrollTrigger: trigger(el),
        }),
    });
  });

  gsap.utils.toArray("[data-reveal]").forEach((el) =>
    gsap.from(el, { autoAlpha: 0, y: 14, duration: 1.1 * speed, ease: "power3.out", delay: d(el), scrollTrigger: trigger(el) })
  );

  gsap.utils.toArray("[data-rule]").forEach((el) =>
    gsap.from(el, { scaleX: 0, transformOrigin: "left center", duration: 1.4 * speed, ease: "expo.inOut", delay: d(el), scrollTrigger: trigger(el) })
  );

  gsap.utils.toArray("[data-clip]").forEach((el) =>
    gsap.from(el, { clipPath: "inset(100% 0 0 0)", duration: 1.5 * speed, ease: "expo.inOut", delay: d(el), scrollTrigger: trigger(el) })
  );
}

/** Any element with [data-clock] shows the owner's local time. */
function startClocks() {
  const els = document.querySelectorAll("[data-clock]");
  if (!els.length) return;
  const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: content.person.timezone });
  const tick = () => els.forEach((el) => (el.textContent = fmt.format(new Date())));
  tick();
  setInterval(tick, 15000);
}

/* ---------- small markup helpers shared by variants ---------- */

export const ext = (href, label, cls = "") =>
  `<a class="${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;

export const workLinks = (links = {}, cls = "") =>
  [links.live && ext(links.live, "Live", cls), links.github && ext(links.github, "Code", cls)].filter(Boolean).join("");

/** Live + GitHub buttons for a case page. Missing links render disabled. */
export const actions = (links = {}, cls = "btn") => {
  const b = content.buttons;
  const one = (href, label, missing, kind) =>
    href
      ? `<a class="${cls} ${cls}-${kind}" href="${href}" target="_blank" rel="noopener noreferrer"><span>${label}</span><span aria-hidden="true">↗</span></a>`
      : `<span class="${cls} ${cls}-${kind} is-off" aria-disabled="true"><span>${missing}</span></span>`;
  return `<div class="${cls}s">${one(links.live, b.live, b.liveMissing, "live")}${one(links.github, b.github, b.githubMissing, "code")}</div>`;
};

/** <figure> + <img> with lazy loading. `veil` adds the face veil hook. */
export const fig = (src, { cls = "", alt = "", veil = false, attrs = "" } = {}) =>
  src
    ? `<figure class="m ${cls}" ${attrs}><img src="${src}" alt="${alt}" loading="lazy" decoding="async"${veil ? " data-veil" : ""} /></figure>`
    : "";
