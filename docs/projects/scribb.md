# Scribb — case-study sources

Reviewed 3 November 2026. Source repository: [watermelon588/Scribb](https://github.com/watermelon588/Scribb). Primary local source: `../New folder`, reference commit `cfab0bb` plus its existing working files. The companion checkout `../scribb-install-wt` supplied an additional README and implementation reference. Both source checkouts were read without changes. Credentials and private stored journals were not read or copied.

## Integration

- Live application: `https://scribb.xyz`, as linked in the source README and confirmed by the owner. Walkthru now links to `https://trywalkthru.com`, the URL already saved locally when this task began.
- Scribb follows Yap Chat and precedes KOE in the Projects catalog.
- Each theme exposes `projects.html` and `work.html?p=scribb` with live-site and GitHub actions.
- Categories: AI, Full-stack and Backend. AI journal retrieval uses Postgres full-text search; this case study does not present it as a separately trained ML model.
- Existing resume changes in the portfolio working tree were left untouched.

## Evidence behind the copy

Paths below are relative to the Scribb source checkout.

| Claim | Sources |
| --- | --- |
| Product scope, bindings, creator profiles and deployment URL | `README.md`, `src/components/Sketchbook.tsx`, `src/Profile.tsx` |
| Three sketchbook bindings and 18 journal layouts | README; `src/data/journal.ts`; renderer and journal components |
| React / TypeScript / Express / FastAPI / LangGraph / Postgres | `package.json`, `ai/requirements.txt`, `vercel.json`, `server/app.ts` |
| Versioned writes, owner checks, private-by-default books, cursor pagination | `server/books.ts`, SQL migrations |
| Consent, verified email, quotas and signed 60-second AI tickets | `server/ai.ts`, `ai/scribb_ai/tickets.py` |
| Identity from tickets; parameterized owner-scoped full-text retrieval | `ai/scribb_ai/main.py`, `retrieval.py`; `db/migrations/002_journals.sql` |
| Restricted role rejects RLS bypass; eight passages, 31-entry date limit, 8,000-word context budget | `ai/scribb_ai/retrieval.py` |
| Structured question planning and fixed refusal paths | `ai/scribb_ai/graph.py` |
| Turn-based browser voice, rather than full-duplex calling | `docs/ASK-JOURNAL-PRODUCTION.md`, frontend Ask components |
| Image ingestion and independent server byte/type/quota checks | `src/lib/images.ts`, `server/media.ts`; `docs/UPLOADS.md` is an earlier browser-local contract |
| Rich text allowlist, retained drafts and stable sheet layout | `src/lib/richtext.ts`, journal components, `src/data/journal.ts` |
| Public HTML, canonical/share metadata, sitemap and IndexNow | `server/seo.ts`, `vercel.json` |
| Process-local ticket replay tracking and Cloudinary deletion boundary | `ai/scribb_ai/tickets.py`, `server/media.ts` |
| Test suites exist; no newly claimed Scribb test totals | `server/*.test.ts`, `tests/`, `ai/tests/` |

The owner reports the application as deployed and working. Preparing this portfolio entry did not run authenticated production journal queries or the Scribb test suites. Source limits describe implementation contracts, not measured production results. The case study preserves the documented service boundaries without reproducing credentials, private records or deployment secrets.

## Image provenance

Case-study images are existing product-tour captures from `docs/readme/` in the primary source checkout. They show sample creator profiles and books, including public-domain sample paintings credited in Scribb's `public/artworks/credits.json`. Captures were resized with aspect ratio preserved and encoded as WebP, without retouching. The shared catalog thumbnail is a separate generated presentation mockup, added on 3 November 2026 at the owner's request: a silver laptop with only the Scribb logo on its screen. Its original PNG and generation prompt are in `site-assets/mockups/scribb/`.

| Placement | Original files, in order |
| --- | --- |
| Shared thumbnail | Generated `site-assets/mockups/scribb/scribb-laptop-logo.png`, exported at 1200 × 900; the previous `explore-light.jpg` thumbnail is preserved in that mockup folder |
| Paper | `explore-light.jpg`, `book-preview.jpg`, `studio-journal.jpg` |
| Ledger | `studio-sketchbook.jpg`, `book-preview.jpg`, `profile.jpg` |
| Signal | `explore-dark.jpg`, `book-preview.jpg`, `studio-journal.jpg` |
| Blueprint | `explore-light.jpg`, `studio-sketchbook.jpg`, `mobile-profile.jpg` |
| Dial | `book-preview.jpg`, `studio-journal.jpg`, `profile.jpg` |

Case captures are at most 1600px wide, with no upscaling. Each theme's existing media treatment applies.

## Portfolio checks

- Vite production build includes five new Projects routes and Scribb media.
- Isolated Chrome journeys across all five themes at 320, 390, 768 and 1440px.
- Five featured projects; nine catalog entries; category membership, counts, pressed state, keyboard activation, refresh and back navigation.
- Category-preserving catalog-to-case links and Projects theme switching.
- Scribb title, live/repository actions and three decoded images per theme; category-filtered case chooser and Walkthru live action.
- Responsive overflow checks, screenshot inspection, runtime errors and failed local resources; normal-motion catalog smoke checks.
