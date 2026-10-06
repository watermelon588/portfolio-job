# Portfolio 2: plan

A minimal, text-led portfolio for a backend engineer moving into agentic AI.
There are five complete variants (home, work detail, about, contact). Each one stands on its own, and you pick one at the end.

## Run
Run `npm install` once, then `npm run dev`. The variant picker opens at `/`. `npm run build` writes to `dist/`.

## Entry: the dice preloader
`/` is a global preloader. A die with the five themes on it rolls, lands on one, fades into that theme's colours and opens its home page.
- Every visit to `/` rolls a fresh random theme, never the same one twice in a row.
- Every page has a **theme switcher** (bottom right). It opens the same page in another theme.
- Code: `index.html` + `src/preloader.js`. The switcher is injected by `src/shared/boot.js`. The last roll is remembered in `src/shared/theme-choice.js`, theme names/order in `theme.js` → `variants`.

## Rules
- Palette: greys from white to black, plus ONE accent per variant.
- Type: light weights only (200–300; 400 max for tiny UI). No bold.
- Motion: GSAP + Lenis. Masked line reveals, hairline draws, one signature interaction per variant, a quiet page fade between pages. Respects `prefers-reduced-motion`.
- Face: shown as a **low-quality** version, never a clean photo. Features stay visible (eyes, nose, mouth) but lo-fi. The veil is a runtime effect, not baked into the file, so swapping the image keeps it.
- Project imagery: toned per page (mono, mono→colour on hover, duotone or colour), so colourful case images don't break the palette.

## Global knobs (the only files you need to touch)
| File | What lives there |
|---|---|
| `src/config/content.js` | Every word: hero, about story, principles, now, timeline, focus, every project's case study, recognition, education, stack, writing, contact/form copy |
| `src/config/assets.js` | Imports from `site-assets/` only (portraits, résumé). Project and About images are picked up automatically from `site-assets/variants/<variant>/<project>/` and `site-assets/variants/<variant>/about/`. Files are used in filename order and the first is the cover. Drop a file in or delete it; no code change needed |
| `site-assets/thumbnails/<slug>.*` | The laptop mock-up shown as each project's thumbnail on every home page (all five themes). Swap a file to change it |
| `src/config/theme.js` | Per variant: colours, fonts, portrait and its size, **veil** (type + amount), **media tone** per page, motion speed |

### Veil types (`theme.<variant>.veil`)
| type | What it does | Used by |
|---|---|---|
| `haze` | Low resolution (~120 px across), greyscale and fine grain | Paper |
| `mosaic` | Small grey pixel cells (~64 across) | Ledger |
| `dither` | 1-bit dot dither (~210 dots across) in the ink colour | Signal |
| `smear` | Light sideways motion blur (0.9% of width) with grain, then the duotone | Blueprint |
| `scribble` | Low resolution and grain, with a thin ink loop drawn *around* the head | Dial |
| `none` | No veil | none |

`amount` scales each type (see `src/shared/veil.js` for ranges).

## Pages (every variant)
| Page | File | Contents |
|---|---|---|
| Home | `index.html` | Hero + veiled portrait, intro, focus areas, selected work (rows link to the detail page), facts, contact strip |
| Work detail | `work.html?p=<slug>` | Title, tagline, meta, **Live site + GitHub repo buttons** (disabled with a note when a link is missing), cover + up to 2 images, overview, metrics, case sections, buttons again, next project |
| About | `about.html` | Statement, story, 2 photos (sneakers, striped shirt), veiled portrait, principles, now, timeline, recognition, education, stack, writing |
| Footer | every page | Dedicated contact footer per variant: email, how to reach me, socials, availability, local time, résumé, link to the contact page |
| Contact | `contact.html` | Headline, email, availability + local clock, socials, résumé, a Web3Forms message form |

## Variants
| # | Route | Fonts | Accent | Signature | Veil |
|---|---|---|---|---|---|
| 1 | `/paper/` | Inter Tight + JetBrains Mono | Cobalt | Swiss lowercase name on a hairline, right-ragged text, row thumbnails | haze |
| 2 | `/ledger/` | Archivo condensed + JetBrains Mono | Lime | Giant uppercase ledger, +/− accordion with cover, ghost type | mosaic |
| 3 | `/signal/` | Geist + Geist Mono | Signal orange | Dark, the band follows the hovered row, a cursor preview of the cover | dither |
| 4 | `/blueprint/` | Hanken Grotesk + IBM Plex Mono | Klein blue | All-blue CV, duotone figure swaps to the hovered project, Bengali name | smear |
| 5 | `/dial/` | Newsreader + IBM Plex Mono | Forest | Pinned rotating dial, serif index, cover reveal | scribble |

## Shared code (`src/shared/`)
- `boot.js`: theme to CSS vars, Google Fonts, render, Lenis, reveal hooks (`data-split`, `data-reveal`, `data-rule`), clocks, page fade, veils, media tone.
- `veil.js`: the five face-veil effects.
- `data.js`: current page, project from the query string, next project, `projectHref`.
- `form.js`: Web3Forms submit with status messages.

## Asset curation
Each variant has its own image set in `site-assets/variants/<variant>/`, at most 3 per project. They were picked with a scoring script (colourfulness, brightness, edge busyness, whitespace) plus a visual check per variant:
- Paper: light product UI and clean mockups
- Ledger: monochrome editorial photos and UI
- Signal: dark UI and night photography
- Blueprint: simple, strong shapes that survive the blue duotone
- Dial: quiet editorial photography and serif posters

Rejected on purpose: illustrated posters, mascots, loud collages, colourful stock photos, launch videos. CodeAtlas is removed.

## Status
- [x] Five landing pages (v1)
- [x] Plan v2
- [x] Shared: veil, data, form, page fade, media tone, image optimisation
- [x] Content: full case studies, about story, principles, timeline, writing
- [x] Paper: home / work / about / contact
- [x] Ledger: home / work / about / contact
- [x] Signal: home / work / about / contact
- [x] Blueprint: home / work / about / contact
- [x] Dial: home / work / about / contact
- [x] Build + desktop/mobile check
- [x] v3: light veils, per-variant image folders, 2 About photos, dedicated footers, Live/GitHub buttons, CodeAtlas removed
- [x] v4: research-backed content, laptop thumbnails, dice preloader + theme switcher
- [ ] You pick a variant and send the updated bio
