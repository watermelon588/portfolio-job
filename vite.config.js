import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import { resolve } from "node:path";

export const variants = ["paper", "ledger", "signal", "blueprint", "dial"];
const pages = ["index", "work", "about", "contact"];

export default defineConfig({
  plugins: [imagetools()],
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
