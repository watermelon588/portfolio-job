/**
 * ASSETS: every image and file the site uses lives in /site-assets, and only there.
 *
 *   site-assets/portraits/profile.png        shared profile image used by all five themes
 *   site-assets/thumbnails/<project-slug>.*   laptop mock-up shown on every home page
 *   site-assets/variants/<theme>/<slug>/      images for that theme's case page
 *   site-assets/variants/<theme>/about/       photos for that theme's About page
 *   site-assets/files/                        résumé
 *
 * Folders are picked up automatically, in filename order; the first file in a
 * project folder (01-cover-…) is the cover. Drop a file in, delete it or rename
 * it: no code change needed.
 *
 * Size: WebP files are served as they are (keep them ≤ 1600 px wide, ~quality 85).
 * PNG/JPG dropped in are resized and converted to WebP at build time.
 * The raw library in /assets is local-only and never shipped.
 */

/* ---------- portraits ---------- */
import profile from "../../site-assets/portraits/profile.png";

export const images = { profile };

/** WebP as-is; PNG/JPG converted at build time. Returns { path: url }. */
const pick = (webp, other) => ({ ...webp, ...other });

/* ---------- per-theme folders ---------- */
const files = pick(
  import.meta.glob("../../site-assets/variants/*/*/*.webp", { eager: true, import: "default" }),
  import.meta.glob("../../site-assets/variants/*/*/*.{png,jpg,jpeg,PNG,JPG,JPEG}", { eager: true, import: "default", query: "?w=1600&format=webp" })
);

const media = {};
for (const path of Object.keys(files).sort()) {
  const [variant, folder] = path.split("/variants/")[1].split("/");
  ((media[variant] ??= {})[folder] ??= []).push(files[path]);
}

/** Images in site-assets/variants/<theme>/<folder>/, in filename order. */
export const variantMedia = (variant, folder) => media[variant]?.[folder] ?? [];

/* ---------- home-page thumbnails: one laptop mock-up per project, shared by all themes ---------- */
const thumbFiles = pick(
  import.meta.glob("../../site-assets/thumbnails/*.webp", { eager: true, import: "default" }),
  import.meta.glob("../../site-assets/thumbnails/*.{png,jpg,jpeg,PNG,JPG,JPEG}", { eager: true, import: "default", query: "?w=1200&format=webp" })
);
export const thumbnails = Object.fromEntries(
  Object.entries(thumbFiles).map(([path, url]) => [path.split("/").pop().replace(/\.[^.]+$/, ""), url])
);

/* ---------- files ---------- */
import resume from "../../site-assets/files/Rohit-Maity-Resume.pdf";

export const docs = { resume };
