import type { RealmId } from "./realmConfig";

/* ─────────────────────────────────────────────
   Single source of truth for portfolio content.
   Projects were picked from github.com/DhruvMalviya0:
   personal builds, hackathons and team projects only —
   coursework drills and company take-home assignments
   are intentionally left out.
───────────────────────────────────────────── */

export const PROFILE = {
  name: "Dhruv Malviya",
  handle: "LEAF",
  tagline: "Full-Stack · Data Science · AI/ML",
  location: "Pune, India",
  status: "Open to internships",
  bio: "CS undergrad at MIT ADT University through Kalvium's SPE program. I like the space between a clean model and a cinematic UI — forecasting demand curves by day, sculpting 3D worlds with shaders by night.",
  links: {
    github: "https://github.com/DhruvMalviya0",
    linkedin: "https://www.linkedin.com/in/dhruv-malviya-02a7b7322/",
    discord: "https://discord.com/users/884316563686166548",
    v1: "https://dhruvmalviya.vercel.app",
  },
};

export type ProjectKind = "PERSONAL" | "HACKATHON" | "TEAM";

export interface Project {
  id: string;
  title: string;
  codename: string;
  kind: ProjectKind;
  realms: RealmId[];
  /** Confidant rank 1–10 — how much it shaped me */
  rank: number;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  repo?: string;
  live?: string;
  badge?: string;
}

const GH = "https://github.com/DhruvMalviya0";

export const PROJECTS: Project[] = [
  {
    id: "arcane",
    title: "Arcane — Property Search Portal",
    codename: "THE MAGICIAN",
    kind: "HACKATHON",
    realms: ["fs"],
    rank: 9,
    period: "2025",
    summary:
      "Centralised property lookup for Delhi — ownership, encumbrance and loan status in one search.",
    highlights: [
      "Led a 4-person team through a national 24-hour hackathon",
      "Mock government DB integration (DORIS / CERSAI)",
      "Colour-coded verification algorithm: mortgaged vs clear title",
      "One-click PDF property reports",
    ],
    stack: ["React", "Tailwind", "shadcn/ui", "Node.js", "MongoDB", "Firebase"],
    repo: `${GH}/Arcane`,
    badge: "3RD / 50+ TEAMS",
  },
  {
    id: "rockguard",
    title: "RockGuard — Rockfall Prediction",
    codename: "THE TOWER",
    kind: "HACKATHON",
    realms: ["ds", "ai", "fs"],
    rank: 10,
    period: "SIH 2025",
    summary:
      "Early-warning system for open-pit mines: IoT slope sensors feed an interpretable model that flags rockfall risk before it is visible.",
    highlights: [
      "Smart India Hackathon 2025 — Team Recursion, top 25 of 800 teams",
      "Compared LogReg, Random Forest, LightGBM, XGBoost on 100k samples",
      "Glass-box alerts: every warning shows the sensor readings behind it",
      "Built the immersive Three.js + GSAP project site",
    ],
    stack: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "FastAPI",
      "React",
      "Three.js",
      "ESP32 + LoRa",
    ],
    repo: `${GH}/RockGuard-Team_Recursion`,
    live: `${GH}/AI-Based-Rockfall-Prediction-and-Alert-System`,
    badge: "TOP 25 / 800",
  },
  {
    id: "time-series",
    title: "Retail Demand Forecasting",
    codename: "THE HERMIT",
    kind: "PERSONAL",
    realms: ["ds"],
    rank: 8,
    period: "2026",
    summary:
      "End-to-end weekly demand forecasting on the Kaggle Store Sales data — SARIMA vs Prophet with a full decomposition pipeline.",
    highlights: [
      "STL decomposition + seasonal-strength scoring",
      "ADF / KPSS stationarity testing, ACF/PACF-driven SARIMA orders",
      "Baselines scored on MAE / RMSE / MAPE over a 12-week horizon",
      "8-week forward forecast framed as inventory variance",
    ],
    stack: [
      "Python",
      "pandas",
      "statsmodels",
      "pmdarima",
      "Prophet",
      "seaborn",
    ],
    repo: `${GH}/time-series-demand-forecast`,
  },
  {
    id: "morphos",
    title: "MorphOS Media Studio",
    codename: "THE STAR",
    kind: "PERSONAL",
    realms: ["ai", "fs"],
    rank: 9,
    period: "2026",
    summary:
      "A desktop AI media suite — photo inpainting, prompt-driven music, and a manga engine that turns pages into motion comics.",
    highlights: [
      "Manga engine: panel extraction, RTL reading flow, motion-comic render",
      "Audio engine: DSP analytics, tempo edits, MusicGen sequencing",
      "Photo engine: mask-based inpainting with adjustable denoise",
      "Hardware gatekeeper profiles the GPU before picking models",
    ],
    stack: ["Tauri", "React", "TypeScript", "FastAPI", "Python", "MusicGen"],
    repo: `${GH}/MorphOS-Media`,
  },
  {
    id: "desktop-ai",
    title: "Interactive AI Desktop Assistant",
    codename: "THE LOVERS",
    kind: "PERSONAL",
    realms: ["ai"],
    rank: 8,
    period: "2026",
    summary:
      "A real-time 3D VRM avatar that talks back — LLM replies drive emotions, procedural animation and lip-sync.",
    highlights: [
      "Python brain ↔ Unity body over WebSockets",
      "LLM tags each reply with an emotion that fires animator states",
      "Amplitude-driven lip-sync on VRM blend shapes",
      "Edge-TTS voice generated on the fly",
    ],
    stack: ["Unity", "C#", "VRM", "Python", "Groq", "Edge TTS", "WebSockets"],
    repo: `${GH}/Desktop-AI-Assistant`,
  },
  {
    id: "butterfly",
    title: "Project Butterfly",
    codename: "THE WHEEL",
    kind: "PERSONAL",
    realms: ["fs", "ai"],
    rank: 8,
    period: "2026",
    summary:
      "An autonomous internship pipeline: scrapes listings, filters scams, and assembles a tailored ATS-ready résumé per job.",
    highlights: [
      "Playwright multi-site ingestion with a two-tier scam filter",
      "Gemini matches job descriptions to my project catalog",
      "WeasyPrint compiles tailored PDFs; Sheets API mirrors the CRM",
      "Dev-journal engine drafts 'build in public' posts",
    ],
    stack: [
      "Next.js",
      "FastAPI",
      "SQLite",
      "Gemini",
      "Playwright",
      "WeasyPrint",
    ],
    repo: `${GH}/Butterfly`,
  },
  {
    id: "pivot",
    title: "Pivot — AI LeetCode Coach",
    codename: "THE HANGED MAN",
    kind: "PERSONAL",
    realms: ["ai"],
    rank: 7,
    period: "2026",
    summary:
      "A Chrome extension that watches your LeetCode submissions and points at the exact broken line — hints, not answers.",
    highlights: [
      "Content script reads problem, code and failing test case",
      "MV3 service worker calls any OpenRouter model (BYOK)",
      "Zero backend, zero stored data — keys stay local",
      "Submission history + day-streak tracker",
    ],
    stack: ["Chrome MV3", "JavaScript", "OpenRouter"],
    repo: `${GH}/Pivot`,
  },
  {
    id: "openenv",
    title: "OpenEnv Support Triage",
    codename: "JUSTICE",
    kind: "PERSONAL",
    realms: ["ai"],
    rank: 6,
    period: "2026",
    summary:
      "An OpenEnv environment where LLM agents resolve support tickets through real tool calls and get graded deterministically.",
    highlights: [
      "Tools: query_db, issue_refund, send_email, escalate",
      "Easy / medium / hard tasks with strict parameter matching",
      "Baseline GPT-4o-mini agent + grader endpoint",
      "Dockerised FastAPI server, deployable as a HF Space",
    ],
    stack: ["Python", "FastAPI", "OpenEnv", "Docker", "OpenAI SDK"],
    repo: `${GH}/openenv-customer-support`,
  },
  {
    id: "virtual-mouse",
    title: "AI Virtual Mouse",
    codename: "THE CHARIOT",
    kind: "PERSONAL",
    realms: ["ai"],
    rank: 6,
    period: "2025",
    summary:
      "Hands-free cursor control: hand landmarks tracked in real time, pinches mapped to clicks. Spun off into a gesture-driven Hill Climb Racing controller.",
    highlights: [
      "MediaPipe hand landmarks → screen-space cursor",
      "Pinch gestures for left / right click",
      "Jitter smoothing + frame-reduction for reach",
      "Same pipeline drives Hill Climb Racing with hand gestures",
    ],
    stack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    repo: `${GH}/Virtual-Mouse`,
    live: `${GH}/Hill-Climb-racing-using-hand-gestures`,
  },
  {
    id: "ray-tracer",
    title: "Solar System Ray Tracer",
    codename: "THE SUN",
    kind: "PERSONAL",
    realms: ["fs"],
    rank: 9,
    period: "2025 – 2026",
    summary:
      "A real-time solar system written from scratch in C++ and OpenGL with Keplerian orbits and custom GLSL lighting.",
    highlights: [
      "Data-driven ECS-style body management",
      "Orbital velocity v ∝ 1/√r, nested moon transforms via GLM",
      "Lambertian GLSL lighting with the Sun as point light",
      "Procedural starfield + eccentric asteroid belt, arcball camera",
    ],
    stack: ["C++17", "OpenGL 3.3", "GLSL", "GLM", "CMake", "vcpkg"],
    repo: `${GH}/Solar-System`,
  },
  {
    id: "omerta",
    title: "Omertà — Multiplayer Mafia",
    codename: "THE MOON",
    kind: "PERSONAL",
    realms: ["fs"],
    rank: 7,
    period: "2026",
    summary:
      "A real-time multiplayer Mafia party game — room codes, hidden roles, night phases and live voting.",
    highlights: [
      "Pusher presence channels for live lobbies",
      "Vercel KV (Redis) game state with in-memory fallback",
      "Server-authoritative role assignment and phase machine",
    ],
    stack: ["Next.js", "TypeScript", "Pusher", "Vercel KV", "Tailwind"],
    repo: `${GH}/Mafia-game`,
  },
  {
    id: "stickr",
    title: "Stickr — Digital Loyalty",
    codename: "THE EMPRESS",
    kind: "PERSONAL",
    realms: ["fs"],
    rank: 6,
    period: "2026",
    summary:
      "A mobile-first loyalty platform for small-town merchants — phone-number check-ins, QR codes and configurable rewards.",
    highlights: [
      "QR + phone-number check-ins, no app install for customers",
      "Configurable visits-per-reward thresholds",
      "Merchant dashboard with daily / monthly analytics",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Firestore"],
    repo: `${GH}/Stickr`,
  },
  {
    id: "particle-portfolio",
    title: "Particle Solar System Portfolio",
    codename: "THE WORLD",
    kind: "PERSONAL",
    realms: ["fs"],
    rank: 7,
    period: "2026",
    summary:
      "Portfolio v1 — every planet, orbit and star built from GPU particles, morphing as you scroll.",
    highlights: [
      "~100k particles via THREE.Points + custom GLSL",
      "Raycast hover, scroll-driven camera tweens",
      "Touch-aware cursor and planet scaling on mobile",
    ],
    stack: ["Three.js", "GLSL", "GSAP", "React", "TypeScript"],
    repo: `${GH}/Portfolio`,
    live: "https://dhruvmalviya.vercel.app",
  },
  {
    id: "snake-sprint",
    title: "Snake Sprint",
    codename: "THE FOOL",
    kind: "PERSONAL",
    realms: ["fs"],
    rank: 3,
    period: "2025",
    summary:
      "Where it started — a polished Pygame snake with sprites, sound and a packaged Windows build.",
    highlights: [
      "Sprite-based head/body/tail rendering",
      "Packaged as a standalone .exe",
    ],
    stack: ["Python", "Pygame", "PyInstaller"],
    repo: `${GH}/Snake-Sprint`,
  },
];

export const projectsFor = (realm: RealmId | null) =>
  (realm ? PROJECTS.filter((p) => p.realms.includes(realm)) : PROJECTS)
    .slice()
    .sort((a, b) => b.rank - a.rank);

export interface Achievement {
  title: string;
  detail: string;
  year: string;
  /** Bankai-style release name shown on reveal */
  release: string;
  kanji: string;
  realms: RealmId[];
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Smart India Hackathon 2025",
    detail:
      "Team Recursion — RockGuard rockfall prediction. Top 25 of ~800 teams nationally.",
    year: "2025",
    release: "TOP 25 / 800",
    kanji: "卍解",
    realms: ["ds", "ai", "fs"],
  },
  {
    title: "National 24-Hour Hackathon — 3rd Place",
    detail: "Led a team of 4 building Arcane, beating 50+ teams.",
    year: "2025",
    release: "3RD PLACE",
    kanji: "始解",
    realms: ["fs"],
  },
  {
    title: "IIT Bombay E-Summit",
    detail: "Built a startup MVP for the E-Summit challenge.",
    year: "2025",
    release: "MVP SHIPPED",
    kanji: "霊圧",
    realms: ["fs", "ai"],
  },
  {
    title: "Competitive Programming",
    detail: "Regular DSA grind — the reason Pivot exists.",
    year: "ONGOING",
    release: "STREAK",
    kanji: "瞬歩",
    realms: ["ds", "ai", "fs"],
  },
  {
    title: "Linux Power User",
    detail: "Daily drives Arch & Fedora. Ricing counts as engineering.",
    year: "ONGOING",
    release: "ROOT",
    kanji: "鬼道",
    realms: ["fs"],
  },
];

export const achievementsFor = (realm: RealmId | null) =>
  realm ? ACHIEVEMENTS.filter((a) => a.realms.includes(realm)) : ACHIEVEMENTS;

export const EDUCATION = [
  {
    school: "MIT ADT University",
    program: "B.Tech — Computer Science & Engineering",
    via: "Kalvium Software Product Engineering (SPE)",
    period: "2024 — 2028",
    place: "Pune, India",
    notes: [
      "Work-integrated program — real repos, real reviews, from semester one",
      "nand2tetris: built a CPU from NAND gates up to an assembler",
      "Core CS: DSA, DBMS, OS, Computer Architecture, Networks",
    ],
  },
];

export const SKILLS: Record<RealmId, { label: string; items: string[] }[]> = {
  fs: [
    {
      label: "LANGUAGES",
      items: ["TypeScript", "JavaScript", "C++", "SQL", "GLSL"],
    },
    {
      label: "FRONTEND",
      items: ["React", "Next.js", "Tailwind", "Three.js", "GSAP"],
    },
    { label: "BACKEND", items: ["Node.js", "Express", "FastAPI", "Prisma"] },
    { label: "DATA", items: ["PostgreSQL", "MongoDB", "Redis", "Firebase"] },
    { label: "OPS", items: ["Docker", "GitHub Actions", "Vercel", "Linux"] },
  ],
  ds: [
    { label: "CORE", items: ["Python", "pandas", "NumPy", "SQL"] },
    {
      label: "MODELLING",
      items: ["scikit-learn", "XGBoost", "LightGBM", "statsmodels"],
    },
    { label: "TIME SERIES", items: ["SARIMA", "Prophet", "pmdarima", "STL"] },
    { label: "VISUAL", items: ["matplotlib", "seaborn", "Jupyter"] },
  ],
  ai: [
    {
      label: "LLM",
      items: ["Groq", "Gemini", "OpenAI SDK", "OpenRouter", "RAG"],
    },
    { label: "AGENTS", items: ["OpenEnv", "Tool calling", "FastAPI"] },
    { label: "VISION", items: ["OpenCV", "MediaPipe"] },
    {
      label: "GENERATIVE",
      items: ["MusicGen", "Diffusion inpainting", "Edge TTS"],
    },
    { label: "EMBODIED", items: ["Unity", "VRM", "WebSockets"] },
  ],
};

/** Persona social stats, 1–5 per realm */
export const SOCIAL_STATS: Record<
  RealmId | "hub",
  { stat: string; level: number; rank: string }[]
> = {
  hub: [
    { stat: "KNOWLEDGE", level: 4, rank: "Scholarly" },
    { stat: "GUTS", level: 4, rank: "Staunch" },
    { stat: "PROFICIENCY", level: 4, rank: "Skilled" },
    { stat: "KINDNESS", level: 3, rank: "Considerate" },
    { stat: "CHARM", level: 3, rank: "Smooth" },
  ],
  fs: [
    { stat: "KNOWLEDGE", level: 4, rank: "Scholarly" },
    { stat: "GUTS", level: 4, rank: "Staunch" },
    { stat: "PROFICIENCY", level: 5, rank: "Transcendent" },
    { stat: "KINDNESS", level: 3, rank: "Considerate" },
    { stat: "CHARM", level: 4, rank: "Charismatic" },
  ],
  ds: [
    { stat: "KNOWLEDGE", level: 5, rank: "Erudite" },
    { stat: "GUTS", level: 3, rank: "Bold" },
    { stat: "PROFICIENCY", level: 4, rank: "Skilled" },
    { stat: "KINDNESS", level: 4, rank: "Empathetic" },
    { stat: "CHARM", level: 3, rank: "Smooth" },
  ],
  ai: [
    { stat: "KNOWLEDGE", level: 5, rank: "Erudite" },
    { stat: "GUTS", level: 5, rank: "Lionhearted" },
    { stat: "PROFICIENCY", level: 4, rank: "Skilled" },
    { stat: "KINDNESS", level: 3, rank: "Considerate" },
    { stat: "CHARM", level: 4, rank: "Charismatic" },
  ],
};

export const SECTIONS = [
  { id: "about", label: "ABOUT", sub: "Status" },
  { id: "projects", label: "PROJECTS", sub: "Confidants" },
  { id: "achievements", label: "ACHIEVEMENTS", sub: "Bankai" },
  { id: "education", label: "EDUCATION", sub: "Calendar" },
  { id: "connect", label: "CONNECT", sub: "Wanted" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
