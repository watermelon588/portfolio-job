# ROHIT MAITY

**Backend & AI Engineer** — agentic LLM systems · distributed systems · realtime services

[maityrohit021@gmail.com](mailto:maityrohit021@gmail.com) · [+91 98837 67936](tel:+919883767936) · Kolkata, India
[LinkedIn](https://www.linkedin.com/in/maity-rohit) · [GitHub](https://github.com/watermelon588) · [Portfolio](https://portfolio2-mu-inky.vercel.app)

---

## Summary

Third-year B.Tech CSE student (CGPA 9.02) with Python as my strongest suit, building backends that hold up: LangGraph agents with checkpointed state, durable Postgres job queues, circuit-broken model providers, and realtime streaming systems. Strong ML / deep learning fundamentals and agentic system design (memory, context engineering, human-in-the-loop). Every safety rule lives in code, not in the prompt. Smart India Hackathon 2025 National Finalist. Seeking backend / AI engineering internships and full-time roles.

---

## Projects

### Walkthru — AI agent platform for launch-readiness testing
*Python · FastAPI · LangGraph · LangSmith · PostgreSQL / Supabase (RLS) · MCP · Chrome MV3 · React 19* — [GitHub](https://github.com/watermelon588/Walkthru)

- Built a LangGraph persona agent that runs real user journeys inside the user's own Chrome via a stateless FastAPI API: one HTTP call per step using `interrupt()` / `Command(resume)` with a Postgres checkpointer, so the API scales horizontally.
- Enforced safety in code, not prompts: a server-side gate re-checked at every step replaces hallucinated elements and safe-stops pay/delete actions; an SSRF-safe fetcher resolves each host once, blocks private/metadata ranges, pins the connection and re-validates every redirect.
- Engineered for failure: durable Postgres job queue (`FOR UPDATE SKIP LOCKED`, leases, jittered backoff), a circuit-broken multi-provider LLM failover chain, and a 24-tool remote MCP server with SHA-256-hashed, per-key rate-limited access.
- Verified with 1,185 passing API tests (+177 extension, 52 web) and LangSmith evals on adversarial fixture sites; Launch Ready score computed in code, never by the model.

### TripVerse — agentic travel planner
*Python · LangGraph · FastAPI · PostgreSQL · SQLAlchemy / asyncpg · Supabase Auth · React · Three.js* — [Live](https://tripverse-0.vercel.app) · [GitHub](https://github.com/watermelon588/Tripverse)

- Designed two LangGraph planning graphs (researched full itinerary, or day-by-day copilot) streamed over FastAPI into one normalized trip document that feeds the plan, map, 3D route, budget ledger and PDF/image export.
- "LLMs propose, code decides": budget math, routing cost, day capacity and ranking are deterministic, tested functions; every edit returns a change receipt and replies are checked against computed facts.
- Rate-limit-aware multi-provider LLM failover with deterministic fallbacks for extraction and search; 188 backend tests.

### SkyGuide AI — distributed realtime astronomy system
*React 19 · Express 5 · FastAPI · Astropy / Skyfield · NumPy · Socket.IO · MongoDB Atlas* — [Live](https://skyguide-ai.vercel.app) · [GitHub](https://github.com/watermelon588/skyguide-ai)

- Architected 3 independent services with a hard boundary: a private FastAPI science engine reachable only through an allowlisted reverse proxy that attaches a shared internal key server-side.
- Scores 13,311 deep-sky objects per request in one vectorised Astropy/NumPy transform, cached with stale-while-revalidate in MongoDB (TTL index, single-flight de-duplication).
- Live telescope guidance over a 20 Hz WebSocket stream: linear ephemeris extrapolation (<0.01° error) and a hysteresis lock state machine; layered rate limiters, HTTP-only JWT, bcrypt.

### KOE (声) — voice-first workday agent
*Python · FastAPI · PostgreSQL (Neon) · React · WebSockets · Web Audio · Three.js (VRM) · OAuth* — [Live](https://koe-pi.vercel.app) · [GitHub](https://github.com/watermelon588/Koe)

- Built live voice calls, chat and voice notes over one FastAPI tool registry connecting GitHub, Calendar, Docs, Sheets, Notion and Spotify.
- Designed a persisted human-in-the-loop approval gate: exact-argument proposals stored in Postgres with 10-minute expiry and an atomic pending→executing claim, so a double confirmation can never run a write twice; Calendar etags and Docs `requiredRevisionId` tie each edit to what the user reviewed.
- Realtime audio pipeline: AudioWorklet 16 kHz PCM16 capture, gapless 24 kHz playback scheduling, interruption-driven queue flush and session resumption; Fernet-encrypted OAuth credentials.

---

## Technical Skills

**Languages:** Python (advanced), JavaScript, Java, C, SQL
**Agentic AI & Systems:** LangGraph, LangSmith evals, RAG architectures, tool calling, MCP, prompt & context engineering, agent memory management, human-in-the-loop (HITL)
**ML & Deep Learning:** PyTorch, Transformers & attention mechanisms, sequence models (RNN/LSTM), generative models (VAE, GAN, DDPM foundations), classical ML, scikit-learn, NumPy, Pandas
**Backend & APIs:** FastAPI, Pydantic, async Python, Node.js, Express, REST, WebSockets, WebRTC, JWT / OAuth
**Systems & Architecture:** distributed systems, realtime streaming & latency optimization, job queues, caching, rate limiting, circuit breakers, system design, SSRF/CSRF defense
**Databases:** PostgreSQL, MongoDB, Redis, MySQL, Supabase (row-level security)
**Frontend & Tools:** React, HTML / CSS, Git & GitHub, Linux

---

## Achievements

- **Smart India Hackathon 2025 — National Finalist** (PS 25007): backend for LivestockIQ — Node, Express, MongoDB, JWT, PDFKit reporting for AMU/MRL monitoring.
- **SBI Ideathon 2025 — Top 1000 nationally:** Technical Lead on PraanaCare (AI telemedicine); owned architecture, stack selection and system design.

---

## Education

**Heritage Institute of Technology, Kolkata** — B.Tech, Computer Science & Engineering (IoT, Cybersecurity & Blockchain) · 2024 – 2028
CGPA 9.02 / 10 · No backlogs · DSA, OOP, DBMS, Operating Systems, Computer Networks
Class XII: 90% · Class X: 96% (State Rank 20)
