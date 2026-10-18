# KOE (声) — case-study sources

Content audit: 18 October 2026. Source repository: [watermelon588/Koe](https://github.com/watermelon588/Koe), reference commit `b1fc1ae` (`Add short Koe about section`). Facts and captures were checked against the supplied local files. The KOE repository was read, not modified. No credentials or environment files were read or copied.

## Portfolio integration

- Shared project record: `src/config/content.js`, slug `koe`, first in the work list.
- Case route in every theme: `/<theme>/work.html?p=koe`.
- Shared home thumbnail: `site-assets/thumbnails/koe.webp`.
- Each theme has three images in `site-assets/variants/<theme>/koe/`; existing tone, layout and gallery behavior apply.
- The new timeline entry links KOE's voice/workspace engineering to the existing portfolio narrative.
- Only the supplied GitHub link is advertised. No deployed application URL was supplied or verified.

## Evidence behind the copy

All paths in this table are relative to the KOE source repository.

| Claim | Source checked |
| --- | --- |
| Voice, chat, recorded notes, connected services and acceptance boundaries | `README.md`; `docs/SPEC.md`; `docs/ARCHITECTURE.md`; `docs/REVIEW_2026-10-16.md` |
| React/TypeScript, FastAPI, Gemini, PostgreSQL, Three.js/VRM | `frontend/package.json`; `backend/pyproject.toml`; application source |
| 16 kHz PCM16 microphone input | `frontend/src/call/mic.ts`; `backend/koe/voice_call.py` |
| 24 kHz scheduling, initial jitter buffer, queued audio flush | `frontend/src/call/player.ts` |
| Interruption events, transcript relay and session-resumption handles | `backend/koe/voice_call.py`; `frontend/src/call/useCall.ts` |
| Shared tool dispatcher, explicit approval readiness, writer allowlist and no automatic mutation replay | `backend/koe/agent.py`, `_run_tool`, `confirmation`, `_confirm` |
| Ten-minute proposal expiry, one pending action per owner/session and atomic claim | `backend/migrations/001_phase2.sql`, pending-action table and proposal/claim/finish functions |
| Owner-only append-only Notion daily log exception | `backend/koe/agent.py`; `README.md` |
| Repository selection and bounded deterministic GitHub reads | `backend/koe/tools/github.py`; `github_work.py`; `github_stats.py`; `docs/GITHUB_WORKFLOW.md` |
| Calendar recurrence, version checks and separate Meet readiness | `docs/CALENDAR_EXTENSIONS.md`; `backend/koe/tools/calendar.py`; `docs/ARCHITECTURE.md` |
| Google Docs unique passage, tab/revision checks and requiredRevisionId | `backend/koe/tools/docs.py`; `docs/GOOGLE_DOCS.md` |
| Sheets row/schema checks, formula preservation and developer-metadata anchors | `backend/koe/tools/sheet_workspace.py`; `docs/SCHEMA_ROW_EDIT_PLAN.md` |
| Account/provider-scoped Fernet-encrypted credentials | `backend/koe/connections.py` |
| Bounded generation attempts and activity logging | `backend/koe/gemini.py`; `backend/koe/store.py`; `docs/ARCHITECTURE.md` |
| Confirmed-pause requirement and cross-tab audio ownership | `frontend/src/audio/coordinator.ts`; `crossTab.ts`; `evidence.ts` |
| Separate Spotify service and gated voice controls | `backend/koe/music_voice.py`; `docs/spotify/VOICE_CONTROL.md`; `docs/SPOTIFY_MUSIC_ARCHITECTURE.md` |
| Regression coverage exists, without claiming a new run or success rate | `backend/tests/`; `frontend/tests/` |

The case-study numbers describe checked source contracts, not measured production performance. KOE's tests and real providers were not executed to prepare this portfolio addition. Deployment, physical-phone behavior and real-account acceptance are stated as outstanding rather than claimed complete.

## Image provenance

Every image comes from `design/koe-mockups-2026-10-17/screenshots/current/` in KOE. Its `capture-report.json` and adjacent README identify running-app captures made with isolated synthetic account/API responses. `12-live-call.png` uses a simulated call. These are not the separate HTML design concepts or generated companion artwork.

| Portfolio placement | Original captures, in order |
| --- | --- |
| Shared home thumbnail | `12-live-call.png` |
| Paper | `03-dashboard.png`, `12-live-call.png`, `04-chat.png` |
| Ledger | `03-dashboard.png`, `05-notion.png`, `06-music.png` |
| Signal | `12-live-call.png`, `03-dashboard.png`, `06-music.png` |
| Blueprint | `03-dashboard.png`, `12-live-call.png`, `05-notion.png` |
| Dial | `02-home.png`, `12-live-call.png`, `06-music.png` |

Case-page captures are converted to lossless WebP at their original dimensions. The home thumbnail is resized to 1200 pixels wide and encoded as WebP. No content is generated, retouched or composited. Original source files remain unchanged. The visible case-study status and Product evidence section disclose the synthetic data and simulated call.

## Portfolio verification

- Production Vite build.
- Isolated Chrome checks at 1440 × 1000 and 390 × 844 for all five themes: home work-index link → KOE case → another theme with `p=koe` retained.
- Project title/description, repository action, truthful missing-live-link state, metrics, detailed sections and screenshot disclosure.
- All three case images decode successfully and fit the viewport; no horizontal page overflow, runtime errors or failed local resources.
- The existing final project, Forcaster, wraps to KOE; KOE's next project is Walkthru.
- Visual review of desktop and mobile case layouts, including expanded Ledger sections.
