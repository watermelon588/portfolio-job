import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import { resolve } from "node:path";
import { site } from "./src/config/site.js";

export const variants = ["paper", "ledger", "signal", "blueprint", "dial"];
const pages = ["index", "projects", "work", "about", "contact"];

// Emit real HTML metadata: social crawlers do not need to execute the app.
const socialMetadata = {
  name: "portfolio-social-metadata",
  transformIndexHtml(_html, ctx) {
    const page = ctx.path.split("/").pop()?.replace(".html", "");
    const label = { projects: "Projects", work: "Projects", about: "About", contact: "Contact" }[page];
    const title = label ? `${label} — ${site.name}` : site.title;
    const image = new URL(site.image, site.origin).href;
    const meta = (kind, name, content) => ({ tag: "meta", attrs: { [kind]: name, content }, injectTo: "head" });
    return [
      meta("property", "og:type", "website"),
      meta("property", "og:site_name", site.name),
      meta("property", "og:title", title),
      meta("property", "og:description", site.description),
      meta("property", "og:url", new URL(ctx.path === "/index.html" ? "/" : ctx.path, site.origin).href),
      meta("property", "og:image", image),
      meta("property", "og:image:secure_url", image),
      meta("property", "og:image:type", "image/png"),
      meta("property", "og:image:width", "1200"),
      meta("property", "og:image:height", "630"),
      meta("property", "og:image:alt", site.imageAlt),
      meta("name", "twitter:card", "summary_large_image"),
      meta("name", "twitter:title", title),
      meta("name", "twitter:description", site.description),
      meta("name", "twitter:image", image),
      meta("name", "twitter:image:alt", site.imageAlt),
    ];
  },
};

export default defineConfig({
  plugins: [imagetools(), socialMetadata],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        ...Object.fromEntries(
          variants.flatMap((v) => pages.map((p) => [`${v}-${p}`, resolve(import.meta.dirname, v, `${p}.html`)]))
        ),
      },
    },
  },
});
