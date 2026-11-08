# Claimwise — case-study sources

Reviewed 8 November 2026 against [Claimwise at `6195dc8`](https://github.com/watermelon588/Claimwise/tree/6195dc8eef468fb6335a53bcd8e23a480e342155). The public [hosted demo](https://claimwise-sigma.vercel.app/) returned the Claimwise landing page. It is a prototype for synthetic data; the portfolio does not claim live insurer access, production case authorization, or a new run of Claimwise's tests.

| Case-study topic | Repository evidence |
| --- | --- |
| Dossier, user roles and six workflow checkpoints | `README.md`, `docs/01-product-brief.md`, `docs/03-lifecycle/lifecycle-map.md` |
| Typed Gemini extraction and user confirmation | `backend/app/agent/onboarding.py`, `docs/05-technical/models-and-retrieval.md` |
| LangGraph persistence and exact-pack approval | `backend/app/agent/graph.py`, `actions.py`, `claim.py`, `docs/05-technical/execution-and-memory.md` |
| Representative scope and release gates | `backend/app/agent/authority.py`, `docs/05-technical/actions-permissions-and-data.md` |
| Stable client references and ambiguous submission recovery | `backend/app/agent/submission.py`, `docs/04-architecture/g4-sequence-recovery.md` |
| Reported payments versus verified credits | `backend/app/agent/payment.py`, `docs/03-lifecycle/branch-matrix.md` |
| 124 of 127 checks across 13 journeys, with three open checks | `docs/07-delivery/validation-plan.md`, recorded 6 November 2026 |

The two product captures are copied from `docs/assets/claimwise-home.webp` and `docs/assets/claimwise-dossier.webp`. The workflow diagram is a 1600px-wide WebP export of `docs/diagrams/export/g4-sequence-and-recovery.svg`. Paper and Signal lead with the home screen; Ledger, Blueprint and Dial lead with the Dossier. All five show both captures and the recovery diagram. The repository identifies the capture data as synthetic.

The shared thumbnail is generated presentation artwork based on the original Pip brand mark. See `site-assets/mockups/claimwise/README.md` for the source files and prompt. Claimwise takes the fifth homepage slot; Yap Chat remains in the catalog and its original case URLs still work.
