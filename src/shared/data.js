import { content } from "../config/content.js";
import { variantMedia, thumbnails } from "../config/assets.js";

/** Which page this is: index | work | about | contact (set on <body data-page>). */
export const page = document.body.dataset.page || "index";

/** Projects that have a detail page (a slug + case sections). */
export const cases = content.work.filter((w) => w.slug && w.sections?.length);

export const projectHref = (w) => (cases.includes(w) ? `./work.html?p=${w.slug}` : null);

export function currentProject() {
  const slug = new URLSearchParams(location.search).get("p");
  return cases.find((w) => w.slug === slug) ?? cases[0];
}

export const nextProject = (w) => cases[(cases.indexOf(w) + 1) % cases.length];

const variant = () => document.documentElement.dataset.variant;

/** { cover, gallery[] } from site-assets/variants/<variant>/<slug>/. */
export function imagesOf(w) {
  const [cover, ...gallery] = variantMedia(variant(), w.slug);
  return { cover, gallery };
}

/** Home-page thumbnail: site-assets/thumbnails/<slug>.*, else the variant's cover. */
export const thumbOf = (w) => thumbnails[w.slug] ?? imagesOf(w).cover;

/** Photos from site-assets/variants/<variant>/about/. */
export const aboutPhotos = () => variantMedia(variant(), "about");
