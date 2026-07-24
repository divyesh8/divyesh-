/** All page copy and structured content, sourced from Divyesh's resume.
 *  Sections import from here so wording changes never touch a component. */

export const HERO = {
  roles: [
    "Cloud Computing Student",
    "Full Stack Developer",
    "AI Enthusiast",
    "Builder",
  ],
  intro:
    "I enjoy building AI-powered products, scalable web applications, and modern digital experiences. Currently pursuing B.Tech in Cloud Computing while creating projects that combine design, engineering, and artificial intelligence.",
} as const;

export const ABOUT = {
  paragraph:
    "I love transforming ideas into products that solve real problems. My focus is on AI, cloud technologies, scalable backend systems, and intuitive user experiences.",
  facts: [
    { label: "Age", value: "18" },
    { label: "Year", value: "B.Tech, 2nd year" },
    { label: "Branch", value: "CSE — Cloud Computing" },
    { label: "University", value: "SRM Institute of Science and Technology" },
    { label: "Campus", value: "Chennai, Tamil Nadu" },
    { label: "Programme", value: "2025 — 2029" },
  ],
  interests: [
    "Artificial Intelligence",
    "Cloud Computing",
    "Full Stack Development",
    "UI/UX",
    "Fitness",
    "Building Products",
  ],
  /** Spoken languages, from the resume. */
  languages: [
    { name: "English", level: "Professional" },
    { name: "Telugu", level: "Native" },
    { name: "Hindi", level: "Fluent" },
  ],
} as const;

export type SkillGroup = {
  title: string;
  /** Mono caption naming the group's role in the stack. */
  caption: string;
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Programming",
    caption: "Languages",
    items: ["Java", "Python", "JavaScript", "TypeScript", "C", "SQL"],
  },
  {
    title: "Frontend",
    caption: "Interface",
    items: ["React", "Next.js", "Tailwind", "HTML", "CSS"],
  },
  {
    title: "Backend",
    caption: "Services",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "WebSockets",
      "Authentication",
    ],
  },
  {
    title: "Database",
    caption: "Persistence",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Prisma", "Supabase", "Neon"],
  },
  {
    title: "Cloud",
    caption: "Infrastructure",
    items: ["AWS", "Deployment", "CI/CD", "Linux", "Docker"],
  },
  {
    title: "Tools",
    caption: "Workflow",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Vercel",
      "Render",
      "Postman",
      "Figma",
    ],
  },
  {
    title: "AI",
    caption: "Intelligence",
    items: [
      "OpenAI",
      "Claude",
      "Prompt Engineering",
      "Pandas",
      "NumPy",
      "Scikit-learn",
    ],
  },
];

export const CONCEPTS = [
  "Data Structures",
  "Algorithms",
  "OOPs",
  "DBMS",
  "Operating Systems",
  "REST APIs",
  "WebSockets",
] as const;

export type Project = {
  slug: string;
  title: string;
  /** Short qualifier shown beside the title. */
  kind: string;
  year: string;
  status: "Live" | "Ongoing";
  description: string;
  features: string[];
  stack: string[];
  href: string | null;
  repo: string | null;
  tags: ("ai" | "web" | "product")[];
  /** Drives the generated preview artwork. */
  motif: "arena" | "fitness" | "bots";
};

export const PROJECTS: Project[] = [
  {
    slug: "ragebait",
    title: "Ragebait",
    kind: "AI Powered Battle Platform",
    year: "2026",
    status: "Live",
    description:
      "A competitive debate and roast battle platform where users are matched in real time and an AI judges each round on engagement and creativity.",
    features: [
      "Real-time Battles",
      "AI Judging",
      "Live Chat over WebSockets",
      "Aura & XP System",
      "Leaderboards",
      "Authentication",
    ],
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Tailwind",
    ],
    href: "https://ragebait-v5.vercel.app/",
    repo: "https://github.com/divyesh8",
    tags: ["ai", "web", "product"],
    motif: "arena",
  },
  {
    slug: "wedxui-fit",
    title: "WEDXUI Fit",
    kind: "AI Fitness Platform",
    year: "2026",
    status: "Live",
    description:
      "An AI-powered fitness platform with personalized workout planning, body analytics, and recommendations that adapt as you train.",
    features: [
      "AI Workout Planner",
      "Body Analytics",
      "Progress Tracking",
      "Modern Dashboard",
      "Responsive Design",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "OpenAI"],
    href: "https://wedxui-fit.vercel.app/",
    repo: null,
    tags: ["ai", "product"],
    motif: "fitness",
  },
  {
    slug: "ragebait-bots",
    title: "AI Bot Ecosystem",
    kind: "Autonomous Agents for Ragebait",
    year: "2026",
    status: "Ongoing",
    description:
      "Bot accounts that generate topics, hold their own conversations, and enter battles on a schedule — so the platform stays alive for new users even at low traffic.",
    features: [
      "Topic Generation",
      "AI Conversation Flow",
      "Automated Scheduling",
      "Cold-start Coverage",
    ],
    stack: ["Node.js", "OpenAI", "MongoDB", "Cron"],
    href: null,
    repo: "https://github.com/divyesh8",
    tags: ["ai", "product"],
    motif: "bots",
  },
];

/** Filter chips for the work section. */
export const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web" },
  { id: "product", label: "Product" },
] as const;

export type JourneyEntry = {
  year: string;
  /** Omitted for years still ahead — the timeline stays open rather than
   *  announcing plans. */
  title?: string;
  detail?: string;
  status: "done" | "active" | "future";
};

export const JOURNEY: JourneyEntry[] = [
  {
    year: "2023",
    title: "Python mini projects",
    detail:
      "Data analysis, automation scripts, and small machine learning models with Pandas, NumPy, Scikit-learn, Matplotlib and Flask.",
    status: "done",
  },
  {
    year: "2025",
    title: "Started full stack development",
    detail:
      "From first principles to shipping — JavaScript, React, and the request/response cycle everything else sits on.",
    status: "done",
  },
  {
    year: "2025",
    title: "B.Tech at SRM, Chennai",
    detail:
      "Computer Science and Engineering, Cloud Computing specialisation. Class of 2029.",
    status: "done",
  },
  {
    year: "2026",
    title: "Built Ragebait",
    detail:
      "A real-time AI battle platform with matchmaking, WebSocket chat, an XP system, and model-judged scoring.",
    status: "active",
  },
  {
    year: "2026",
    title: "Building WEDXUI Fit",
    detail:
      "An AI fitness platform with personalized planning and body analytics. In active development.",
    status: "active",
  },
  { year: "2027", status: "future" },
  { year: "2028", status: "future" },
  { year: "2029", status: "future" },
];

export const CERTIFICATIONS = [
  "Python Programming Course — Udemy / Coursera",
  "Web Development Bootcamp — Udemy / Coursera",
  "Active open source contributor on GitHub",
  "Hackathons and competitive coding contests",
] as const;

/** Nodes for the hero topology graphic — the stack Ragebait actually runs
 *  on. Coordinates are percentages of the 100x100 viewBox. */
export const TOPOLOGY_NODES = [
  { id: "client", label: "CLIENT", x: 14, y: 20 },
  { id: "edge", label: "EDGE", x: 52, y: 9 },
  { id: "api", label: "API", x: 50, y: 49 },
  { id: "ai", label: "AI JUDGE", x: 86, y: 28 },
  { id: "db", label: "MONGO", x: 19, y: 78 },
  { id: "socket", label: "SOCKET.IO", x: 82, y: 74 },
] as const;

export const TOPOLOGY_EDGES: [string, string][] = [
  ["client", "edge"],
  ["edge", "api"],
  ["api", "ai"],
  ["api", "db"],
  ["api", "socket"],
  ["client", "socket"],
];
