/**
 * THEME: per-variant colours, fonts, portrait, face veil and image tone.
 *
 * colors   → CSS variables (--bg, --ink, --muted, --line, --accent…)
 * fonts    → `google` is the Google Fonts query (family:axes); `display`,
 *            `body`, `mono` are the CSS stacks that use them.
 * portrait → `image` is a key from assets.js `images`; `width` is any CSS size.
 *            Set image to null to hide the portrait.
 * veil     → a light "low-quality" filter on every portrait, whatever image you pick.
 *            type: "haze" | "mosaic" | "dither" | "smear" | "scribble" | "none"
 *            amount: strength (see the table in src/shared/veil.js)
 * media    → how project/photo images are toned on each page:
 *            "mono" | "hover" (mono → colour on hover) | "duotone" | "color"
 * motion   → `lerp` is Lenis smoothness (lower = floatier). `speed` scales
 *            every reveal duration (1 = default, 0.5 = twice as fast).
 */
export const theme = {
  paper: {
    colors: { bg: "#EEEDEA", ink: "#161616", muted: "#8A8984", line: "#CFCDC8", accent: "#2B3FE0" },
    fonts: {
      google: ["Inter+Tight:wght@200..400", "JetBrains+Mono:wght@300..400"],
      display: '"Inter Tight", system-ui, sans-serif',
      body: '"Inter Tight", system-ui, sans-serif',
      mono: '"JetBrains Mono", ui-monospace, monospace',
    },
    portrait: { image: "sunglasses05", width: "clamp(130px, 14vw, 230px)" },
    veil: { type: "haze", amount: 120 },
    media: { index: "hover", work: "hover", about: "mono", contact: "mono" },
    motion: { lerp: 0.085, speed: 1 },
  },

  ledger: {
    colors: { bg: "#F3F3F1", ink: "#111111", muted: "#8D8D8A", line: "#1A1A1A", ghost: "#EAEAE7", accent: "#D4FF3A" },
    fonts: {
      google: ["Archivo:wdth,wght@62..125,100..400", "JetBrains+Mono:wght@300..400"],
      display: '"Archivo", system-ui, sans-serif',
      body: '"Archivo", system-ui, sans-serif',
      mono: '"JetBrains Mono", ui-monospace, monospace',
    },
    portrait: { image: "sunglasses03", width: "clamp(170px, 19vw, 300px)" },
    veil: { type: "mosaic", amount: 64 },
    media: { index: "hover", work: "hover", about: "mono", contact: "mono" },
    motion: { lerp: 0.1, speed: 1 },
  },

  signal: {
    colors: { bg: "#0A0A0A", ink: "#EDEDEB", muted: "#7A7A78", line: "#222221", accent: "#FF5B37" },
    fonts: {
      google: ["Geist:wght@100..400", "Geist+Mono:wght@300..400"],
      display: '"Geist", system-ui, sans-serif',
      body: '"Geist", system-ui, sans-serif',
      mono: '"Geist Mono", ui-monospace, monospace',
    },
    portrait: { image: "sunglasses07", width: "clamp(220px, 28vw, 420px)" },
    veil: { type: "dither", amount: 210 },
    media: { index: "mono", work: "hover", about: "mono", contact: "mono" },
    motion: { lerp: 0.08, speed: 1 },
  },

  blueprint: {
    colors: { bg: "#FFFFFF", ink: "#1D2CF3", muted: "#9B9BAE", line: "#1D2CF3", accent: "#1D2CF3", paper: "#FFFFFF" },
    fonts: {
      google: ["Hanken+Grotesk:wght@200..400", "IBM+Plex+Mono:wght@300;400", "Noto+Sans+Bengali:wght@200..400"],
      display: '"Hanken Grotesk", "Noto Sans Bengali", system-ui, sans-serif',
      body: '"Hanken Grotesk", "Noto Sans Bengali", system-ui, sans-serif',
      mono: '"IBM Plex Mono", ui-monospace, monospace',
    },
    portrait: { image: "sunglasses02", width: "min(28vw, 400px)" },
    veil: { type: "smear", amount: 0.9 },
    media: { index: "duotone", work: "duotone", about: "duotone", contact: "duotone" },
    motion: { lerp: 0.1, speed: 1 },
  },

  dial: {
    colors: { bg: "#F1F1EF", ink: "#1C1C1B", muted: "#9A9A96", line: "#D6D6D2", accent: "#2F5D46" },
    fonts: {
      google: ["Newsreader:ital,opsz,wght@0,6..72,200..400;1,6..72,200..400", "IBM+Plex+Mono:wght@300;400"],
      display: '"Newsreader", Georgia, serif',
      body: '"Newsreader", Georgia, serif',
      mono: '"IBM Plex Mono", ui-monospace, monospace',
    },
    portrait: { image: "sunglasses10", width: "clamp(170px, 20vw, 320px)" },
    veil: { type: "scribble", amount: 170 },
    media: { index: "hover", work: "hover", about: "mono", contact: "mono" },
    motion: { lerp: 0.075, speed: 1 },
  },
};

/** The five themes in dice order (face 1 → 5). Names show in the preloader and switcher. */
export const variants = [
  { key: "paper", name: "Paper" },
  { key: "ledger", name: "Ledger" },
  { key: "signal", name: "Signal" },
  { key: "blueprint", name: "Blueprint" },
  { key: "dial", name: "Dial" },
].map((v) => ({ ...v, accent: theme[v.key].colors.accent, bg: theme[v.key].colors.bg, ink: theme[v.key].colors.ink }));
