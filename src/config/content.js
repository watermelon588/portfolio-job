/**
 * CONTENT: the single source of truth. Every word on every variant comes from here.
 * Edit text, add/remove/reorder projects, and all five portfolios update.
 *
 * Use *asterisks* around a phrase to mark it as emphasis. Each variant styles
 * emphasis its own way (accent colour, italic, grey…).
 *
 * Projects: a project with a `slug` and `sections` gets its own detail page
 * (work.html?p=<slug>). Its images live in site-assets/variants/<variant>/<slug>/.
 *   summary     one line on the home page: what it is + the hardest engineering
 *   highlights  the bullet list a recruiter scans on the case page
 *   sections    the case study: architecture, hard problems, how they were solved
 *
 * Every number below is taken from the project's repository (tests, limits,
 * thresholds). Keep it that way: no number goes in that the code can't back.
 */
import { docs } from "./assets.js";

export const content = {
  meta: {
    title: "Rohit Maity — Backend & AI Engineer",
    description:
      "Backend and AI engineer (Python, FastAPI, Node.js, LangGraph). Distributed systems, realtime services and LLM agents with code-enforced guardrails, durable queues, evals and fallbacks.",
  },

  person: {
    name: "Rohit Maity",
    first: "Rohit",
    last: "Maity",
    nativeName: "রোহিত মাইতি",
    role: "Backend & AI Engineer",
    roleLong: "Backend & AI engineer — distributed systems, LLM agents, production APIs",
    location: "Kolkata, India",
    timezone: "Asia/Kolkata",
    status: "Open to backend & AI engineering roles",
    email: "maityrohit021@gmail.com",
    resume: docs.resume,
  },

  nav: { home: "Index", work: "Work", about: "About", contact: "Contact", resume: "Résumé", back: "Back", next: "Next project", all: "All work", highlights: "Engineering highlights" },

  // Case-page buttons. A project without a link shows the "missing" label, disabled.
  buttons: { live: "Live site", github: "GitHub repo", liveMissing: "Live — runs locally", githubMissing: "Repo — private", resume: "Download résumé" },

  hero: {
    tagline: "backends that hold up.",
    statement:
      "I build backends that hold up — distributed services, realtime systems and LLM agents with *guardrails, evals and fallbacks* under the hood.",
    note: ["Backend & AI engineer, Kolkata.", "(Python · FastAPI · Node · LangGraph)"],
    // Proof strip on the home page: numbers a recruiter can check in the repos.
    proof: [
      { value: "711", label: "API tests on Walkthru's agent platform" },
      { value: "13,311", label: "deep-sky objects scored live per request" },
      { value: "24", label: "tools on a remote MCP server I built" },
      { value: "20 Hz", label: "sensor stream driving a realtime state machine" },
    ],
  },

  about: {
    // Short block used on home pages
    lead:
      "Backend engineer first. I design the parts that keep a product standing — service boundaries, queues, caches, rate limits, auth — and I build AI into those systems, not around them.",
    body: [
      "I've shipped a three-service distributed system with a 20 Hz realtime loop, a WebRTC mesh verified against a live server, hybrid multimodal retrieval with cited answers, and *LangGraph agents* with checkpointed state, durable Postgres queues, circuit-broken model chains and *LangSmith evals*.",
      "Computer Science (IoT, Cybersecurity & Blockchain) at Heritage Institute of Technology, CGPA 9.02. Smart India Hackathon 2025 national finalist.",
    ],
    // About page
    statement: "Backend & AI engineer. I build systems that *hold up* — and agents that do too.",
    story: [
      "I'm a backend engineer who builds AI into systems, not around them. My work sits where reliability meets models: services that stay up when an LLM provider doesn't, agents whose every action passes a code gate, and data paths that are fast because they were designed that way.",
      "I learned it by shipping. SkyGuide AI taught me hard service boundaries, realtime state machines and caches that serve something real in milliseconds. Yap Chat taught me that realtime is mostly unhappy paths — and to prove behaviour with tests against a live server. Neuron taught me retrieval: hybrid ranking, chunking that keeps citations intact, and degrading instead of crashing.",
      "Walkthru and TripVerse are where it came together: *LangGraph agents* with Postgres checkpointing and interrupt/resume over HTTP, a durable job queue built on `FOR UPDATE SKIP LOCKED`, a circuit breaker across model providers, an SSRF-hardened crawler, a remote MCP server and evals on adversarial fixture sites. The interesting part is never the model call. It's the *harness* around it.",
      "I took the long road to LLMs — NumPy, Pandas and scikit-learn, classical machine learning, deep learning, then transformers and modern GPT architectures — so I reason about models, not just their APIs. Right now I'm going deep on agent harnesses, sandboxes and memory systems.",
      "My degree specialises in IoT, cybersecurity and blockchain, and it shows in every repository: threat models, rate limits, constant-time comparisons and hardening headers land in the first commit, not the last.",
    ],
    principles: [
      { title: "Deterministic code before a model call", body: "Scores, budgets, rankings and fix prompts are computed in code. Models explain and propose; they never decide the numbers a user sees." },
      { title: "Prompts are never a safety boundary", body: "Every rule about what an agent may do runs on the server — before the run and again at every step — so neither the model nor a modified client can talk past it." },
      { title: "Degrade, don't crash", body: "A missing model, atlas or provider switches off one capability and says so. Ranking falls back to BM25, generation to extractive answers, the platform keeps serving." },
      { title: "Serve something real, then refresh", body: "Stale-while-revalidate over spinners, single-flight over thundering herds, idempotency keys over duplicate side effects." },
      { title: "Prove it", body: "711 tests on Walkthru, 188 on TripVerse, 35 live-server tests on Yap Chat, a 23-check attack probe on Shiori. Behaviour is verified, not assumed." },
    ],
    now: [
      { label: "Building", value: "Walkthru — agent safety, evals and production hardening" },
      { label: "Going deep on", value: "Agent harnesses, sandboxes and long-term memory architectures" },
      { label: "Learning", value: "The maths under modern models — linear algebra, probability, optimisation" },
      { label: "Reading", value: "Engineering write-ups on long-running agents and distributed systems" },
    ],
    timeline: [
      { year: "2024", title: "B.Tech, Computer Science", detail: "IoT, Cybersecurity & Blockchain — Heritage Institute of Technology" },
      { year: "2025", title: "Yap Chat", detail: "Realtime MERN, WebRTC mesh, 35 live-server tests" },
      { year: "2025", title: "Smart India Hackathon — National Finalist", detail: "Backend for LivestockIQ: Node, Express, MongoDB, JWT, PDF reporting" },
      { year: "2025", title: "SBI Ideathon — Top 1000", detail: "Technical lead and system design, PraanaCare" },
      { year: "2026", title: "SkyGuide AI · Neuron", detail: "Distributed realtime systems and multimodal retrieval" },
      { year: "2026", title: "TripVerse · Shiori", detail: "LangGraph planning agents; security-hardening a Go media server" },
      { year: "2026", title: "Walkthru", detail: "Browser agents, durable queues, MCP and evals" },
      { year: "2026", title: "KOE (声)", detail: "Realtime voice, connected workspaces and persisted approval gates" },
    ],
  },

  focus: {
    title: "Currently going deep on",
    items: [
      { n: "01", title: "Agent harnesses", body: "The runtime around a model: step budgets, interrupts, tool gates and safe stops enforced in code." },
      { n: "02", title: "Sandboxes", body: "Running agent actions and untrusted code with least privilege — browser, process and network boundaries." },
      { n: "03", title: "Agent memory", body: "Checkpointed state, short- and long-term memory, and what an agent should recall across sessions." },
      { n: "04", title: "Retrieval pipelines", body: "Hybrid search, chunking that preserves citations, and deciding what reaches the model at what cost." },
      { n: "05", title: "Evals & observability", body: "LangSmith traces, adversarial fixtures and regression suites — proof an agent works, not a demo." },
      { n: "06", title: "Distributed systems", body: "Queues, idempotency, circuit breakers and caches that keep AI features up when providers aren't." },
    ],
  },

  work: [
    {
      slug: "walkthru",
      title: "Walkthru",
      year: "2026",
      role: "AI agent platform",
      tagline: "AI test users that run your real flows — and a backend built like infrastructure.",
      summary:
        "A LangGraph browser agent that drives real user journeys in your own Chrome, backed by a stateless FastAPI API, a durable Postgres job queue, 18 deterministic scanners and a 24-tool remote MCP server. 711 API tests.",
      overview:
        "Walkthru is a launch check for apps built with AI. Persona agents try your real signup, onboarding and checkout flows inside your own browser, think aloud, and report exactly where they got stuck — with the step, the screenshot and the reason. The browser is the hands; the server is the brain. Everything that can be code is code: only the persona session is an agent, and every rule about where it may act is enforced on the server.",
      status: "Implemented and tested end to end locally; production deployment is the next stage.",
      metrics: [
        { value: "711", label: "API tests (+90 extension tests)" },
        { value: "24", label: "MCP tools, per-key rate limited" },
        { value: "18", label: "deterministic scanners" },
        { value: "1", label: "HTTP call per agent step" },
      ],
      highlights: [
        "LangGraph decide → act → check loop with interrupt()/Command(resume) — one HTTP call per step, state in a Postgres checkpointer, API stateless and horizontally scalable",
        "Code safety gate (_enforce) re-checked every step: hallucinated elements, pay/delete actions and unverified-site writes are replaced or safely stopped",
        "Durable Postgres job queue — FOR UPDATE SKIP LOCKED, 15-minute leases, per-kind attempt budgets, exponential backoff with jitter",
        "Multi-provider LLM chain (Claude Haiku on Vertex → Groq gpt-oss → Gemini) behind a circuit breaker with strict per-provider timeouts",
        "SSRF-safe fetcher: resolve once, block private/metadata/IPv4-in-IPv6 ranges, pin the connection, re-validate every redirect",
        "Remote MCP server (streamable HTTP) — 24 tools, SHA-256-hashed keys, Postgres-backed per-key limits",
        "LangSmith evals on easy/hard/showcase fixture sites full of traps; findings without real evidence are dropped in code",
      ],
      sections: [
        { kicker: "Architecture", title: "Browser on the user's machine, brain on the server.", body: "A Chrome MV3 extension (WXT, TypeScript) snapshots the DOM including open shadow roots, masks PII in-page, runs axe-core and Core Web Vitals, and executes actions. FastAPI and LangGraph decide. No headless Chromium on servers, so hosting stays near zero and logged-in pages work without anyone sharing a password." },
        { kicker: "Agent design", title: "One HTTP call per agent step.", body: "The persona graph is decide → act → check. act calls LangGraph's interrupt(), returning the next action to the extension; the thread sleeps in a PostgresSaver checkpointer (private schema, bounded pool) until /observe resumes it with Command(resume=observation). The API holds no state between calls, start/observe/stop are idempotent, and production refuses to boot without durable persistence." },
        { kicker: "Guardrails", title: "Prompts are never a safety boundary.", body: "Policy is decided on the server before the run and at every step: visitor, owner (domain proven by an HMAC token via meta tag, well-known file or DNS TXT) or refused. _enforce() swaps unsafe or invalid model choices — a non-existent element becomes a scroll, pay/delete becomes a safe stop, a second send never happens. Goal rules run on NFKC-normalised text with zero-width characters stripped, so obfuscated instructions don't slip through." },
        { kicker: "Reliability", title: "Fail soft, never fake.", body: "Reports, comparisons, watch checks and notifications run from a Postgres job table claimed with FOR UPDATE SKIP LOCKED, with leases, attempt budgets and jittered backoff — they survive restarts and run across processes. Three consecutive provider failures open a 60-second circuit; one caller probes recovery and a generation counter stops a stale result from closing a newer circuit. A failed scan marks its area unavailable instead of sinking the report." },
        { kicker: "Security", title: "The scanner can't be turned into an SSRF.", body: "Every host is resolved once, every address must be globally routable (metadata IPs, NAT64 and IPv4 hidden in IPv6 included), the socket is pinned to the checked address so DNS rebinding has no window, redirects are re-validated hop by hop, and each host gets at most two concurrent requests. Supabase row-level security covers every table, API keys and deploy hooks are stored only as SHA-256, and migrations are checksummed." },
        { kicker: "Evals", title: "Grounded, measured, regression-tested.", body: "LangSmith evals run the agent against fixture sites built to trap it, plus a model bake-off and a headless end-to-end driver for the built extension. grounded_ux() drops any UX finding that doesn't point at a real step with evidence, and the Launch Ready score is computed in code from what was actually measured — never by the model." },
      ],
      stack: ["Python", "FastAPI", "LangGraph", "LangSmith", "PostgreSQL", "Supabase (RLS)", "MCP", "Chrome MV3", "TypeScript"],
      links: { github: "https://github.com/watermelon588/Walkthru" },
    },
    {
      slug: "tripverse",
      title: "TripVerse",
      year: "2026",
      role: "Agentic planner",
      tagline: "Two LangGraph planners, one normalized trip — LLMs propose, code decides.",
      summary:
        "Two LangGraph planning graphs writing into one normalized trip document. Budget, routing cost and day capacity are deterministic code; models only propose. Streamed over FastAPI with a Groq → Groq → Gemini fallback chain and 188 backend tests.",
      overview:
        "TripVerse turns a conversation into a trip you can see, change and carry. A guided graph handles onboarding and validation; a planning subgraph researches the destination with tools and extracts an itinerary graph; a collaborative copilot builds the trip one day at a time. All of it writes into a single normalized trip document that feeds the plan, sketchbook, map, 3D route, budget ledger and exports — so one edit stays consistent everywhere.",
      metrics: [
        { value: "188", label: "backend tests (pytest)" },
        { value: "2", label: "LangGraph planning modes" },
        { value: "3", label: "model fallback tiers" },
        { value: "1", label: "normalized trip document" },
      ],
      highlights: [
        "Main graph routes onboarding → validation → planning choice; a planning subgraph runs understand → research (tool node: Tavily, Google Places) → itinerary extraction",
        "Deterministic copilot core: budget math, routing cost, day capacity by pace, hard vs soft preferences, ranking and money-saving moves are plain functions",
        "Graph updates streamed to the client with astream(stream_mode=\"updates\")",
        "Per-node model routing — a small fast model for JSON extraction and intent, a larger one for writing",
        "Rate-limit detection across SDKs (exceptions, HTTP 429, message patterns) fails over to a second Groq key, then Gemini",
        "Every edit returns a change receipt; replies are checked against computed facts before they reach the user",
      ],
      sections: [
        { kicker: "Architecture", title: "Two agent paths, one source of truth.", body: "React holds the workspace, FastAPI streams graph updates, and two LangGraph planning paths — a complete researched itinerary or a day-by-day copilot — feed one normalized trip document and itinerary graph. Plan, sketchbook, map and 3D route are views over the same document, so nothing drifts out of sync." },
        { kicker: "Deterministic core", title: "LLMs propose, code decides.", body: "Budget math, routing cost, day capacity (6, 8 or 11 hours by pace), hard must/avoid rules versus soft likes, ranking and money-saving moves live in plain, tested functions. The copilot's state persists with the conversation; already-researched queries are remembered so tool calls can't loop, and \"the second one\" resolves against the last suggestions." },
        { kicker: "Resilience", title: "A plan even when a provider says no.", body: "Nodes route to the right model size. When a provider rate-limits — detected from exception types, HTTP 429 or error text, never from auth errors — the call fails over to a second Groq key and then Gemini. Extraction falls back to a deterministic itinerary graph, and web search falls back from Tavily to HTML search or a deterministic summary." },
        { kicker: "Edits with receipts", title: "Change the plan, keep the trail.", body: "Add, move or remove a stop and the engine computes the edit deterministically, returns a change receipt and guards the reply against the computed facts. Trips persist in PostgreSQL through Supabase Auth, SQLAlchemy and asyncpg; guest trips are claimed after sign-in and export as PDF or image." },
      ],
      stack: ["LangGraph", "FastAPI", "PostgreSQL", "SQLAlchemy", "asyncpg", "Supabase Auth", "Groq", "Gemini", "Tavily", "React", "TypeScript"],
      links: { live: "https://tripverse-0.vercel.app/", github: "https://github.com/watermelon588/Tripverse" },
    },
    {
      slug: "skyguide-ai",
      title: "SkyGuide AI",
      year: "2026",
      role: "Distributed realtime system",
      tagline: "Three services, a 20 Hz realtime loop and 13,311 objects scored for one sky.",
      summary:
        "React, an Express 5 gateway and a private FastAPI astronomy engine. Vectorised scoring of 13,311 deep-sky objects for your exact telescope and sky, and live telescope guidance over a 20 Hz WebSocket stream with a hysteresis state machine.",
      overview:
        "SkyGuide answers the question every amateur astronomer has: what should I look at right now, and how do I point at it? It fuses your location, telescope optics, live weather, light pollution and precise astronomy into one ranked, explained recommendation — then turns your phone, mounted on the scope, into a guide that talks you onto the target in real time.",
      metrics: [
        { value: "13,311", label: "objects scored per request" },
        { value: "20 Hz", label: "orientation stream" },
        { value: "3", label: "independent services" },
        { value: "<0.01°", label: "extrapolation error" },
      ],
      highlights: [
        "Private FastAPI engine behind a shared internal key; browsers reach it only through an allowlisted, safe-methods reverse proxy on the gateway",
        "Realtime alignment: linear ephemeris extrapolation, great-circle error per packet, no awaits on the hot path, single-flight background refresh",
        "Lock state machine with two-way hysteresis so a hand tremor can't flicker the lock",
        "One vectorised Astropy/NumPy AltAz transform across the whole catalogue, plus batch airmass",
        "Stale-while-revalidate compute cache in MongoDB with a TTL index and in-flight de-duplication, shared across processes",
        "Skyfield SGP4 passes with an Earth-shadow test; light pollution decoded from a reverse-engineered binary atlas",
        "Layered rate limiters (login, OTP, reset, LLM spend), HTTP-only JWT, bcrypt, ~40 km geohash privacy",
      ],
      sections: [
        { kicker: "Architecture", title: "Three services, one hard boundary.", body: "The frontend never does astronomy and the browser never touches the engine. The Express 5 gateway owns auth, sessions, Socket.IO rooms, CRUD and cron jobs; the FastAPI engine (Astropy, Skyfield, Astroplan, Motor) owns every coordinate transform, visibility calculation and recommendation. The engine requires a shared X-Internal-Key, refuses to start in production without one, and is reachable only through an allowlisted proxy that attaches the key server-side." },
        { kicker: "Realtime", title: "A 20 Hz loop that never waits.", body: "The phone streams orientation at 20 Hz. The engine returns the target's Alt/Az plus angular drift rates; the gateway extrapolates linearly between refreshes (well under 0.01° of error), computes the great-circle pointing error for each packet in microseconds, and refreshes the ephemeris in the background, single-flight per session. A lock state machine with hysteresis — engage after holding within 1.2°, release only after drifting beyond it for a set time — keeps the lock stable on a wobbly tripod." },
        { kicker: "Scoring at scale", title: "13,311 objects, ranked and explained.", body: "One vectorised SkyCoord transform evaluates the whole Messier/NGC/IC catalogue at once. A base score blends altitude, magnitude and apparent size with a Moon penalty; a personalised layer adds aperture feasibility, field-of-view fit, novelty and the intersection of each object's up-time with astronomical darkness. Every adjustment ships with a plain-English reason, and the engine stays stateless so a learned ranker can replace the weights without touching the plumbing." },
        { kicker: "Caching", title: "Never a blank panel.", body: "Expensive responses — recommendations, the nightly brief, LLM output — go through a stale-while-revalidate cache stored in MongoDB: fresh values serve instantly, stale ones serve now and recompute in the background, and an in-flight set collapses bursts of misses into one computation. Keys encode location and telescope, a TTL index bounds the collection, and the cache survives restarts across gateway processes." },
        { kicker: "Science data", title: "Real physics, graceful failure.", body: "ISS and satellite passes come from Celestrak TLEs propagated with Skyfield's SGP4 (fresh cache → network → stale cache → 503), filtered by a sunlit-versus-Earth-shadow test so only genuinely visible passes appear. Sky brightness comes from the Lorenz 2024 light-pollution atlas: 600×600 delta-compressed binary tiles decoded by hand, converted to mag/arcsec² and Bortle class, with a haversine search for darker sites. Every enhancer degrades to nothing rather than failing a recommendation." },
        { kicker: "Security", title: "Hardened end to end.", body: "HTTP-only JWT cookies, bcrypt at cost 12, and separate limiters for failed logins, OTP guesses (keyed to the code being guessed), password resets and LLM spend, with proxy-aware client IPs. Community locations are snapped to ~40 km geohash cells, public profiles are built from a whitelist, and auth responses never reveal which accounts exist." },
      ],
      stack: ["FastAPI", "Astropy", "Skyfield", "NumPy", "Express 5", "Socket.IO", "MongoDB Atlas", "node-cron", "Groq", "React 19"],
      links: { live: "https://skyguide-ai.vercel.app", github: "https://github.com/watermelon588/skyguide-ai" },
    },
    {
      slug: "neuron",
      title: "Neuron",
      year: "2026",
      role: "Multimodal retrieval & RAG",
      tagline: "Hybrid multimodal search with explainable ranking and citations to the line.",
      summary:
        "Text, image and audio fused into one CLIP query vector, re-ranked by a weighted blend of BM25, dense and visual similarity, with location-aware RAG that cites the exact page and line — and degrades gracefully when a model is missing.",
      overview:
        "Keyword search can't see. Neuron accepts any mix of inputs — image plus query, audio plus image plus query — transcribes and embeds them into one query vector, and re-ranks results by what they mean and what they look like. Every result explains its rank. Upload your own documents and chat with them: answers are grounded in retrieved chunks with numbered citations that reopen the exact passage.",
      status: "Self-hosted: the backend needs torch, Whisper, CLIP and FFmpeg in process memory.",
      metrics: [
        { value: "4", label: "input modalities" },
        { value: "3", label: "ranking signals blended" },
        { value: "100%", label: "of answers cited" },
        { value: "3", label: "generation fallback tiers" },
      ],
      highlights: [
        "Layered FastAPI backend with inward-only dependencies: API → services → core / ml / db",
        "Hybrid ranker: BM25 + dense embeddings + CLIP visual similarity, with mode-specific weights that re-normalise when a model is down",
        "Response schema requires per-result signals, confidence and an explanation — unexplained ranked lists are structurally impossible",
        "Location-aware chunking with overlap carry-over keeps page, heading and line ranges for citations",
        "Lazy, thread-safe model registry; /system/capabilities reports live status; Groq → local model → extractive answers",
        "PBKDF2 (210k iterations), httpOnly JWT cookies, Origin-based CSRF checks, SSRF guard, magic-byte upload validation",
      ],
      sections: [
        { kicker: "Pipeline", title: "Understand, retrieve, rank, explain.", body: "Whisper transcribes audio, CLIP embeds the picture's actual pixels (not a caption of them), and every input is fused into one query vector plus a keyword query. Web results arrive through a SearchProvider interface and vectors live behind a VectorStore interface, so Serper and FAISS are swappable details rather than dependencies." },
        { kicker: "Hybrid ranking", title: "Sparse, dense and visual — weighted per mode.", body: "Text mode blends semantic similarity (0.55), BM25 (0.30) and a decaying provider-position prior (0.15); visual mode leads with CLIP thumbnail similarity. If the dense embedder is unavailable the weights re-normalise to BM25 and position and the response is flagged degraded. The schema requires signals, confidence and a plain-language explanation for every result." },
        { kicker: "RAG", title: "Citations that land on the exact line.", body: "Parsers for PDF, DOCX, spreadsheets, HTML, JSON and source code preserve pages, headings and line ranges; chunking keeps them, carrying overlap between chunks and hard-wrapping pathological sentences. Answers cite numbered chunks that reopen the source scrolled to the passage, and weak context is topped up with live web search." },
        { kicker: "Resilience", title: "Lazy models, graceful degradation.", body: "A thread-safe registry loads models on first use, so the API starts instantly and a missing optional dependency disables one capability instead of the platform. Generation runs Groq when configured, then a small local model, then cited extractive answers." },
        { kicker: "Security", title: "Hardened like a public API.", body: "httpOnly access and refresh JWT cookies, PBKDF2-SHA256 at 210k iterations with constant-time comparison, login throttling per IP and email, Origin checks against CSRF on multipart endpoints, an SSRF guard that re-validates every redirect, magic-byte validation for uploads (including EBML and ISO-BMFF containers), sliding-window rate limits, and a production boot that refuses insecure configuration." },
      ],
      stack: ["Python", "FastAPI", "CLIP", "Whisper", "BLIP", "FAISS", "BM25", "MongoDB", "React 19"],
      links: { github: "https://github.com/watermelon588/Neuron" },
    },
    {
      slug: "yapchat",
      title: "Yap Chat",
      year: "2025",
      role: "Realtime messaging & WebRTC",
      tagline: "Realtime messaging and an 8-way WebRTC mesh, verified against a live server.",
      summary:
        "Room-scoped realtime chat and 8-way peer-to-peer video: JWT-verified Socket.IO identity, a glare-free WebRTC mesh where media never touches the server, and 35/35 tests passing against a live server.",
      overview:
        "Yap Chat is built around private, code-based rooms: you only see people who hold your room's code. Inside, one-to-one messaging with photos and voice notes runs over Socket.IO, and group calls for up to eight people run peer-to-peer over WebRTC. The engineering is in the edges: identity, authorisation on every message, and signalling that stays correct when people join late, lose their camera or drop.",
      metrics: [
        { value: "8", label: "-way P2P video" },
        { value: "35/35", label: "live-server tests" },
        { value: "0", label: "media bytes through the server" },
      ],
      highlights: [
        "Socket identity comes from a JWT verified in the handshake — never from a client-supplied user id",
        "Joiner-offers negotiation makes the WebRTC mesh glare-free; host handover when the caller leaves",
        "Every peer connection always carries audio and video m-lines, so a camera-less peer can't blank video for everyone",
        "Room membership and sender/recipient rights checked on every message read and write (IDOR-proof)",
        "NoSQL operator coercion, uniform login errors with a dummy bcrypt compare, data:-URI-only uploads to block request-proxy abuse",
        "20/20 signalling tests and 15/15 API-security tests against a running server",
      ],
      sections: [
        { kicker: "Realtime model", title: "Sockets for chat, WebRTC for calls.", body: "Login issues a JWT that the client presents in the Socket.IO handshake; the server verifies it and maps user to socket. Messages are persisted in MongoDB and then pushed to online recipients, with presence and unseen counts. Membership in the room is checked on every read and write." },
        { kicker: "WebRTC mesh", title: "Signalling that can't glare.", body: "Media never touches the server; it only relays the handshake. The joiner always offers to everyone already in the call, so negotiation is one-directional and glare never happens. Every connection carries both audio and video m-lines even when a device has neither, a missing camera falls back to audio-only, calls live in memory and the host role hands over when the caller leaves." },
        { kicker: "Security", title: "Every message authorised.", body: "Values are coerced to strings so {\"$ne\": null} can't widen a query; login answers uniformly and runs a dummy bcrypt compare on unknown emails so accounts can't be enumerated; uploads must be data: URIs so the endpoint can't proxy requests; profile updates use an explicit field list; and the server refuses to start with a weak JWT secret." },
        { kicker: "Verification", title: "Tested against a live server.", body: "20/20 call-signalling tests cover codes, ring delivery, join ordering, offer/answer targeting, non-participant rejection, ghost removal on disconnect and host handover. 15/15 API-security tests cover forged tokens, NoSQL operators, IDOR on mark-as-seen, upload abuse and login rate limiting. WebRTC negotiation was exercised with canvas-generated media, including a peer with no camera." },
      ],
      stack: ["Node.js", "Express 5", "Socket.IO", "WebRTC", "MongoDB", "JWT", "Cloudinary", "React 19"],
      links: { live: "https://yap-chat-five.vercel.app", github: "https://github.com/watermelon588/Yap-Chat" },
    },
    {
      slug: "koe",
      title: "KOE (声)",
      year: "2026",
      role: "Voice agent & workspace",
      tagline: "A voice-first workday companion. Every consequential action gets a preview.",
      summary:
        "Gemini Live voice calls, chat and voice notes over one FastAPI tool registry. GitHub, Calendar, Docs, Sheets and Notion workflows share a persisted approval gate; an exclusive audio coordinator keeps Spotify and conversations from competing.",
      overview:
        "KOE — voice in Japanese — brings a developer's day into one conversational workspace. Speak to a 3D companion, type a question or leave a voice note to review pull requests, find meeting time, update a document or log hours. A React dashboard makes the underlying work visible: the schedule, review queue, proposed changes and their results. The core engineering problem is carrying a conversation across realtime audio and external APIs while keeping identity, approval and the outcome of each write explicit.",
      status:
        "Voice, chat and connected-tool paths are implemented; real-provider and physical-device acceptance is still pending. Screenshots show the running app with synthetic account/API responses and a simulated call.",
      metrics: [
        { value: "16 kHz", label: "mono PCM16 microphone input" },
        { value: "24 kHz", label: "scheduled PCM16 playback" },
        { value: "10 min", label: "persisted proposal expiry" },
        { value: "3", label: "conversation entry points: call, chat, WhatsApp" },
      ],
      highlights: [
        "One Python tool registry and approval flow behind live calls, web chat and WhatsApp text/voice notes, with conversation-scoped context",
        "PostgreSQL-backed proposals freeze the destination and exact arguments; an owner/session-bound atomic claim prevents duplicate confirmation from executing the same proposal twice",
        "AudioWorklet microphone capture, gapless Web Audio scheduling, interruption-driven queue flushing and Gemini session resumption",
        "Calendar etags, Google Docs required revisions and stable Sheets row metadata keep approved edits tied to the evidence the user reviewed",
        "Fernet-encrypted OAuth credentials stay on the backend; provider grants and account identity are checked before connected work",
        "Music/call coordination requires evidence that playback stopped; an unknown player state blocks voice acquisition instead of assuming silence",
        "Source-backed limits and focused regression suites; product screenshots, design concepts and live acceptance are documented separately",
      ],
      sections: [
        { kicker: "The problem", title: "A workday spread across tabs.", body: "A developer can have a review waiting in GitHub, meeting time in Calendar, notes in Notion and hours in a spreadsheet. KOE gives those tasks a conversational entry point and a visible workspace. Requests stay bounded: read the review queue, explain a selected commit, propose a meeting or prepare an exact document edit. The companion provides continuity while the backend validates the work." },
        { kicker: "Architecture", title: "One backend, three conversational entrances.", body: "React and TypeScript provide the call, chat, dashboard, Notion, Music and settings views. FastAPI handles HTTP APIs, provider authentication and two WebSocket paths: audio/control for calls and JSON events for activity and approvals. Gemini Live handles speech-to-speech interaction; text and recorded-note paths reuse the Python tool registry and approval mechanism. Neon PostgreSQL persists accounts, connections, chat, activity and proposed actions." },
        { kicker: "Realtime audio", title: "Interruptions are part of the protocol.", body: "An AudioWorklet captures mono PCM16 at 16 kHz. Incoming 24 kHz audio chunks are scheduled against the Web Audio clock, with an initial jitter buffer. When the user talks over a reply, the backend sends an interrupted event and the player flushes unheard audio. Gemini resumption handles let a logical call continue across model connections. The audio analyser drives the VRM companion's mouth, and speech-end-to-first-audio timings are recorded for diagnosis." },
        { kicker: "Approval gate", title: "A proposal has an explicit lifecycle.", body: "Write tools normalize and validate arguments, read current provider evidence and persist an exact proposal before execution. PostgreSQL permits one pending proposal per owner/session and expires it after ten minutes. The application accepts confirmation only after the proposal has been presented, then atomically changes pending to executing before invoking the allowlisted writer. Repeated clicks cannot claim it again. Results become executed or failed; ambiguous external outcomes are never automatically replayed. The owner's append-only Notion daily log is the explicitly documented exception to separate approval." },
        { kicker: "GitHub & Calendar", title: "Read evidence before proposing a change.", body: "GitHub OAuth and repository selection bound the review queue, PR/CI views, shipped history and commit-detail reads. Python deduplicates activity and calculates statistics; the model explains returned evidence. PR comments require an approved exact body, and there is no merge tool. Calendar proposals freeze the configured calendar, timezone and relevant event versions. Bounded recurrence expands to at most twenty occurrences; moves and cancellations check etags. Saving an event and obtaining a ready Google Meet link are reported as separate outcomes." },
        { kicker: "Documents & records", title: "Approval stays attached to the version you read.", body: "Google Docs reads identify a tab and revision; edits append plain text or replace one unique exact passage. Execution uses requiredRevisionId, so a collaborator's intervening edit is rejected rather than silently merged. Sheets previews freeze a row's values and schema, preserve formulas and tracking fields, and resolve stable developer-metadata anchors before a RAW cell update. These checks are optimistic concurrency safeguards, not an external-editor transaction lock. Notion supports bounded task, note and meeting records, additive schema changes and approved trash, while its agent integration remains owner-scoped." },
        { kicker: "Music & voice", title: "One audio owner at a time.", body: "Spotify playback has a separate service and browser SDK lifecycle. The audio coordinator arbitrates music, live calls, recordings and recorded replies, including cross-tab ownership. Voice starts only after a pause is confirmed; a timeout or unknown playback state blocks acquisition. Voice music controls have their own enablement and playlist permissions. Track metadata stays outside model prompts. Eligible accounts, a real active device and controlled audible acceptance remain necessary to validate the complete experience." },
        { kicker: "Reliability & identity", title: "Bound the work and retain the result.", body: "Model generation has per-attempt timeouts and an overall selection budget; a text-provider fallback is limited to the start of a turn so tool work is not replayed. Credentials are encrypted with Fernet before database storage and loaded by account/provider on the server. Cold credential lookups and blocking I/O move off the event loop. Durable proposal and result writes are awaited, while best-effort activity logging has a bounded backlog. A degraded provider is surfaced to the user instead of becoming a fabricated successful action." },
        { kicker: "Product evidence", title: "The interface exposes what the agent is doing.", body: "The dashboard brings Calendar, the review queue, PRs, approvals and activity together. Calls pair the 3D companion with transcript and workspace views; chat and recorded voice notes offer another way in. A PWA manifest, service worker and install flow support the mobile web channel. The images in this case study come from the actual application running with isolated synthetic account/API responses. The call state is simulated. Separate concept art and proposed pages are kept out of these product captures." },
        { kicker: "Verification & next steps", title: "Implemented is different from accepted live.", body: "The repository contains backend and frontend regression suites for approval races, identity isolation, provider contracts, interruption handling, audio ownership and connected-workspace state. Those fixtures prove specific behavior without authorizing real account mutations. Remaining acceptance includes real Google/GitHub consent and writes, eligible Spotify playback and voice handoff, Meta delivery setup, and physical-phone microphone and push behavior. The next milestone is controlled hosted acceptance with exact callback URLs and migrated storage; this case study does not claim that a build or a synthetic screenshot proves those integrations live." },
      ],
      stack: ["Python", "FastAPI", "Gemini Live", "PostgreSQL / Neon", "React", "TypeScript", "WebSockets", "Web Audio", "Three.js / VRM", "OAuth", "Spotify SDK", "PWA"],
      links: { live: "https://koe-pi.vercel.app/", github: "https://github.com/watermelon588/Koe" },
    },
    {
      slug: "shiori",
      title: "Shiori",
      year: "2026",
      role: "Go server hardening",
      tagline: "Auditing and hardening a Go media server — plus a sandboxed provider pipeline.",
      summary:
        "A security-hardened fork of a Go/Echo media server: audited ~300 routes, closed a critical unauthenticated network exposure, added per-IP rate limiting, lockout and a strict CSP, and runs sandboxed JavaScript providers with automatic failover. 23/23 attack probes pass.",
      overview:
        "Shiori is my build of Seanime, an open-source Go media server for anime and manga, run privately on your own machine. Under the interface is a lot of backend: an Echo server with around 300 routes, a WebSocket event bus, cron loops, a rule-based auto-downloader and a plugin system that executes JavaScript source providers inside an embedded JS engine. I audited it like an attacker, fixed what I found, and built the provider and failover layer on top.",
      metrics: [
        { value: "11", label: "security findings fixed" },
        { value: "23/23", label: "attack-probe checks pass" },
        { value: "~300", label: "API routes audited" },
        { value: "20 min", label: "auto-download cycle" },
      ],
      highlights: [
        "Found the server bound to 0.0.0.0 with no password — full control, including extension code execution — and closed it",
        "Per-IP token-bucket limiter (25 req/s, burst 150) keyed on a spoof-resistant client IP; lockout after 10 wrong tries",
        "Constant-time token comparison everywhere (crypto/subtle); CSP without unsafe-inline; SVG sanitiser for plugin icons",
        "Source providers are JavaScript running inside Goja (a JS engine embedded in Go) behind fixed contracts",
        "Priority-ordered provider failover and a smoke test that verifies real playback, not just search results",
        "Every third-party provider payload reviewed for eval, filesystem, OS and env access before install",
      ],
      sections: [
        { kicker: "Architecture", title: "One Go binary, a lot of backend.", body: "A single Go process boots a service container, opens SQLite through GORM, serves around 300 Echo routes under /api/v1, pushes live updates over a WebSocket event bus, and runs cron loops: AniList refresh every 10 minutes, local data every 30, releases hourly. A rule engine checks providers every 20 minutes and grabs new episodes by show, resolution and release group." },
        { kicker: "Provider pipeline", title: "Untrusted code, contained.", body: "Every source is a JavaScript extension executed inside Goja, an engine embedded in the Go server, against fixed contracts (search, findEpisodes, findEpisodeServer…). Streams fail over in priority order when a source breaks, a smoke-test script verifies search and actual playback per provider, and I reviewed every installed payload for eval, filesystem, OS and environment access before it ran." },
        { kicker: "Security audit", title: "Audited like an outsider.", body: "The critical finding: the server listened on 0.0.0.0 with no password, giving anyone on the network control of files, torrents and extensions. I added an environment-only password applied after config writes, made spoofed Origin and X-Forwarded-For headers fail, put media folders behind an HttpOnly SameSite=Strict cookie, added a per-IP limiter and a lockout, switched token checks to constant time, shipped a strict CSP by moving the inline boot script, and sanitised plugin SVGs." },
        { kicker: "Verification", title: "23 attacks, 23 passes.", body: "A probe script behaves like an attacker — no password, wrong passwords, spoofed headers, floods, direct media URLs — and prints PASS/FAIL per check: 23/23. The production build was verified with the CSP enforced and zero violations during HLS playback." },
      ],
      stack: ["Go", "Echo", "GORM", "SQLite", "WebSockets", "Goja", "React", "TypeScript"],
      links: { live: "https://shiori-dusky.vercel.app/", github: "https://github.com/watermelon588/Shiori-" },
    },
    {
      slug: "forcaster",
      title: "Forcaster",
      year: "2025",
      role: "Weather interface",
      tagline: "A calm weather client over a thin API layer.",
      summary: "A minimal weather client: OpenWeather data through a thin Axios layer, 5-day and 24-hour forecasts in expandable views, and a backdrop that follows the conditions.",
      overview:
        "An early front-end project focused on clarity: instead of dense tables, the forecast unfolds on demand, and the interface decides what deserves attention. It's where I first separated a data layer from the views that consume it.",
      metrics: [
        { value: "5-day", label: "forecast" },
        { value: "24h", label: "hourly breakdown" },
      ],
      highlights: [
        "Thin Axios data layer separated from the views",
        "Current conditions, 5-day and 24-hour forecasts in expandable cards",
        "Theme-aware backdrop driven by live conditions",
      ],
      sections: [
        { kicker: "Data", title: "Live conditions, calmly mapped.", body: "OpenWeather feeds temperature, RealFeel, humidity, pressure, wind and visibility through a thin Axios layer; the interface surfaces what matters and folds the rest into detail on demand." },
        { kicker: "Interface", title: "Weather you read at a glance.", body: "Expandable day cards (morning, afternoon, evening, night) and a 24-hour breakdown replace cluttered tables, and the backdrop shifts with the sky." },
      ],
      stack: ["React", "Vite", "Tailwind", "OpenWeather", "Axios"],
      links: { live: "https://forcastr-wheat.vercel.app", github: "https://github.com/watermelon588/FORCASTR" },
    },
  ],

  recognition: [
    { year: "2025", title: "Smart India Hackathon", detail: "National Finalist — backend for LivestockIQ (Node, Express, MongoDB, JWT)" },
    { year: "2025", title: "SBI Ideathon", detail: "Top 1000 nationally — technical lead and system design, PraanaCare" },
  ],

  education: [
    {
      years: "2024 — 2028",
      school: "Heritage Institute of Technology, Kolkata",
      degree: "B.Tech, Computer Science & Engineering (IoT, Cybersecurity & Blockchain)",
      note: "CGPA 9.02 / 10 · DSA, OOP, DBMS, Operating Systems, Computer Networks",
    },
  ],

  // Skills, grouped the way a recruiter scans them: strongest first.
  stack: [
    { label: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C", "C++", "Go (working)"] },
    { label: "Backend", items: ["FastAPI", "Node.js", "Express", "REST", "WebSockets", "Socket.IO", "WebRTC", "Pydantic"] },
    { label: "AI / LLM", items: ["LangGraph", "LangChain", "LangSmith", "RAG", "MCP", "Tool calling", "Embeddings", "FAISS", "Evals"] },
    { label: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite", "Supabase (RLS)", "Indexing", "Sharding", "Partitioning"] },
    { label: "Systems", items: ["System design", "Microservices", "API gateways", "Caching", "Rate limiting", "Job queues", "Circuit breakers", "Load balancing"] },
    { label: "Security", items: ["JWT & sessions", "OWASP Top 10", "SSRF defence", "CSRF", "Row-level security", "Threat modelling"] },
    { label: "ML", items: ["NumPy", "Pandas", "scikit-learn", "Matplotlib", "Seaborn", "Deep learning", "Transformers"] },
    { label: "Tooling", items: ["Git & GitHub", "Linux", "Docker", "Jenkins CI", "pytest", "Vitest"] },
  ],

  writing: [
    { title: "Why does JavaScript feel so absurd? — Part 1", date: "Sep 2026", read: "11 min", topic: "Type coercion & IEEE 754", url: "https://zaxx-blog.hashnode.dev/why-does-javascript-feel-so-absurd-part-1" },
    { title: "Why does JavaScript feel so absurd? — Part 2", date: "Sep 2026", read: "11 min", topic: "Functions, scope & composition", url: "https://zaxx-blog.hashnode.dev/why-does-javascript-feel-so-absurd-part-2" },
    { title: "Why does JavaScript feel so absurd? — Part 3", date: "Sep 2026", read: "12 min", topic: "Closures, TDZ & this", url: "https://zaxx-blog.hashnode.dev/why-does-javascript-feel-so-absurd-part-3" },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/watermelon588" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/maity-rohit" },
    { label: "X", href: "https://x.com/turquoise_0904" },
    { label: "Hashnode", href: "https://hashnode.com/@zaxx" },
  ],

  contact: {
    title: "Let's talk",
    ping: "Fastest way to reach me is email. LinkedIn works too — I check it daily.",
    line: "Hiring for backend, platform or AI engineering? I reply within a day.",
    headline: "Building something that has to *hold up*? Let's talk.",
    availability: "Open to backend, AI and platform engineering internships and full-time roles — remote or on-site.",
    // Web3Forms public access key: messages arrive at the email above.
    formKey: "656aa372-69dc-4538-9589-82376c182405",
    form: {
      name: "Your name",
      email: "Email",
      message: "Message",
      send: "Send message",
      subject: "New message from your portfolio",
      sending: "Sending…",
      sent: "Thanks — it's in my inbox. I'll reply soon.",
      error: "That didn't go through. Email me directly instead.",
      invalid: "Please fill in every field with a valid email.",
    },
  },

  footer: {
    copyright: "© 2026 Rohit Maity",
  },
};

/** "*word*" → <em>word</em>, "`code`" → <code>code</code>. Each variant styles them its own way. */
export const em = (s) => s.replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`(.+?)`/g, "<code>$1</code>");
