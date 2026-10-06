/**
 * VEILS: a low-quality version of the face. Features stay visible
 * (eyes, nose, mouth), just softer, grainier and lower-fi.
 *
 * Applied at runtime to every <img data-veil>, so swapping the image in
 * assets.js keeps the effect. Contract: the <img> sits alone inside a wrapper
 * (e.g. <figure>), and overlays (grain, scribble) are added to that wrapper.
 *
 * theme.<variant>.veil = { type, amount }
 *   haze     amount = resolution in pixels across (≈ 120–220, lower = softer)
 *   mosaic   amount = pixel cells across          (≈ 48–90,  lower = blockier)
 *   dither   amount = dots across                 (≈ 160–260, lower = coarser)
 *   smear    amount = sideways blur, % of width   (≈ 0.5–1.5)
 *   scribble amount = resolution in pixels across (≈ 120–220); a thin ink loop
 *            is drawn AROUND the head, never across the face
 *   none
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

/** Film grain clipped to the head's silhouette (uses the image as a mask). */
function grain(img, opacity = 0.35) {
  const g = document.createElement("i");
  g.className = "veil-grain";
  g.setAttribute("aria-hidden", "true");
  Object.assign(g.style, {
    position: "absolute", inset: 0, pointerEvents: "none", opacity,
    backgroundImage: GRAIN, mixBlendMode: "multiply",
    maskImage: `url("${img.src}")`, maskSize: "100% 100%",
    webkitMaskImage: `url("${img.src}")`, webkitMaskSize: "100% 100%",
  });
  img.parentElement.append(g);
}

/** Redraw the image at `across` pixels wide; optional pixel edit; result replaces src. */
function resample(img, across, { edit, pixelated = false } = {}) {
  const w = Math.max(4, Math.round(across));
  const h = Math.max(4, Math.round((w * img.naturalHeight) / img.naturalWidth));
  const cv = Object.assign(document.createElement("canvas"), { width: w, height: h });
  const cx = cv.getContext("2d", { willReadFrequently: true });
  cx.drawImage(img, 0, 0, w, h);
  if (edit) {
    const data = cx.getImageData(0, 0, w, h);
    edit(data.data, w, h);
    cx.putImageData(data, 0, 0);
  }
  img.src = cv.toDataURL();
  if (pixelated) img.style.imageRendering = "pixelated";
}

const lum = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

function rgb(css) {
  const el = document.createElement("i");
  el.style.color = css;
  document.body.append(el);
  const m = getComputedStyle(el).color.match(/\d+/g).map(Number);
  el.remove();
  return m;
}

/** Seeded random so the scribble is the same on every visit. */
function rand(seed) {
  return () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
}

/** Bounding box of the opaque head, in % of the image: [left, top, right, bottom]. */
function headBox(img) {
  const w = 48, h = Math.round((48 * img.naturalHeight) / img.naturalWidth);
  const cx = Object.assign(document.createElement("canvas"), { width: w, height: h }).getContext("2d", { willReadFrequently: true });
  cx.drawImage(img, 0, 0, w, h);
  const a = cx.getImageData(0, 0, w, h).data;
  let [l, t, r, b] = [w, h, 0, 0];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (a[(y * w + x) * 4 + 3] > 120) {
    l = Math.min(l, x); r = Math.max(r, x); t = Math.min(t, y); b = Math.max(b, y);
  }
  return r > l ? [(l / w) * 100, (t / h) * 100, (r / w) * 100, (b / h) * 100] : [15, 10, 85, 90];
}

const toGrey = (d) => {
  for (let i = 0; i < d.length; i += 4) d[i] = d[i + 1] = d[i + 2] = lum(d, i);
};

const VEILS = {
  /** Soft, low-resolution, grainy. */
  haze(img, { amount = 160 }) {
    resample(img, amount, { edit: toGrey });
    img.style.filter = "contrast(0.94) brightness(1.03)";
    grain(img, 0.4);
  },

  /** Small grey pixel cells; the features read, the detail doesn't. */
  mosaic(img, { amount = 64 }) {
    resample(img, amount, {
      pixelated: true,
      edit: (d) => {
        toGrey(d);
        for (let i = 3; i < d.length; i += 4) d[i] = d[i] > 110 ? 255 : 0;
      },
    });
  },

  /** 1-bit ordered dither in the ink colour. */
  dither(img, { amount = 200 }) {
    const [r, g, b] = rgb(getComputedStyle(document.documentElement).getPropertyValue("--ink"));
    resample(img, amount, {
      pixelated: true,
      edit: (d, w) => {
        for (let i = 0, p = 0; i < d.length; i += 4, p++) {
          const x = p % w, y = (p / w) | 0;
          const lit = d[i + 3] > 110 && lum(d, i) / 255 > (BAYER[(y % 4) * 4 + (x % 4)] + 0.5) / 16;
          d[i] = r; d[i + 1] = g; d[i + 2] = b;
          d[i + 3] = lit ? 255 : 0;
        }
      },
    });
  },

  /** A light sideways motion blur with grain. */
  smear(img, { amount = 0.9 }) {
    const id = `smear-${Math.random().toString(36).slice(2, 8)}`;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", 0);
    svg.setAttribute("height", 0);
    svg.style.position = "absolute";
    svg.innerHTML = `<filter id="${id}" x="-10%" width="120%"><feGaussianBlur stdDeviation="0 0"/></filter>`;
    document.body.append(svg);
    const blur = svg.querySelector("feGaussianBlur");
    const set = () => blur.setAttribute("stdDeviation", `${(img.clientWidth * amount) / 100} 0`);
    set();
    new ResizeObserver(set).observe(img);
    img.style.filter = `grayscale(1) url(#${id})`;
    grain(img, 0.35);
  },

  /** Low-res + grain, with a thin hand-drawn loop around (not over) the head. */
  scribble(img, { amount = 170 }) {
    const [L, T, R, B] = headBox(img);
    resample(img, amount, { edit: toGrey });
    grain(img, 0.35);
    const rx = (R - L) / 2 + 7, ry = (B - T) / 2 + 5, cx = (L + R) / 2, cy = (T + B) / 2;
    const rnd = rand(11);
    let d = "";
    for (let k = 0; k <= 72; k++) {
      const a = (k / 36) * Math.PI * 2 - 2.2; // two loose turns
      const wob = 1 + (rnd() - 0.5) * 0.06;
      d += `${k ? "L" : "M"} ${(cx + Math.cos(a) * rx * wob).toFixed(1)} ${(cy + Math.sin(a) * ry * wob).toFixed(1)} `;
    }
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("veil-scribble");
    Object.assign(svg.style, { position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" });
    svg.innerHTML = `<path d="${d}" pathLength="1" fill="none" stroke="var(--accent)" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>`;
    img.parentElement.append(svg);
    if (reduced) return;
    gsap.fromTo(svg.querySelector("path"), { strokeDasharray: 1, strokeDashoffset: 1 }, {
      strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", delay: 0.6,
      scrollTrigger: { trigger: img.parentElement, start: "top 85%", once: true },
    });
  },
};

export function applyVeils(cfg) {
  if (!cfg || cfg.type === "none" || !VEILS[cfg.type]) return;
  document.querySelectorAll("img[data-veil]").forEach(async (img) => {
    if (getComputedStyle(img.parentElement).position === "static") img.parentElement.style.position = "relative";
    try { await img.decode(); } catch { return; }
    VEILS[cfg.type](img, cfg);
    ScrollTrigger.refresh();
  });
}
