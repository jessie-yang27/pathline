// Mock data for the Pathline candidate-side prototype.
// Nothing here is real — no backend, no live scoring.

export const STAGES = ["Seed", "Series A", "Series B", "Growth"];

export const ROLES = [
  {
    id: "role-1",
    title: "Product Manager, Platform",
    company: "Meridian",
    blurb: "Developer infrastructure for fintech APIs used by 400+ companies.",
    stage: "Series A",
    location: "Remote (US)",
    salary: "$155k – $185k",
    salaryMin: 155,
    salaryMax: 185,
    matchReason: "Matches your seed-to-Series A preference and high autonomy priority.",
    logoLetter: "M",
    logoColor: "bg-[#3f5d43]",
  },
  {
    id: "role-2",
    title: "Senior PM, Growth",
    company: "Northloop",
    blurb: "Consumer savings app helping households automate their budgets.",
    stage: "Series B",
    location: "San Francisco, CA (Hybrid)",
    salary: "$170k – $200k",
    salaryMin: 170,
    salaryMax: 200,
    matchReason: "Growth-stage scope with a dedicated data science partner, as you requested.",
    logoLetter: "N",
    logoColor: "bg-[#9c5f22]",
  },
  {
    id: "role-3",
    title: "Product Manager, AI Tools",
    company: "Fernwell",
    blurb: "AI-assisted clinical documentation for independent healthcare practices.",
    stage: "Seed",
    location: "Remote (US)",
    salary: "$140k – $165k",
    salaryMin: 140,
    salaryMax: 165,
    matchReason: "Early-stage ambiguity and 0-to-1 scope match your autonomy answers.",
    logoLetter: "F",
    logoColor: "bg-[#33492f]",
  },
  {
    id: "role-4",
    title: "Product Manager, Marketplace",
    company: "Cordial Goods",
    blurb: "B2B marketplace connecting independent bakeries with wholesale buyers.",
    stage: "Series A",
    location: "New York, NY (Hybrid)",
    salary: "$150k – $175k",
    matchReason: "Marketplace dynamics align with your product-sense assessment strengths.",
    logoLetter: "C",
    logoColor: "bg-[#7e4b1b]",
  },
  {
    id: "role-5",
    title: "Lead PM, Core Experience",
    company: "Ashform",
    blurb: "Vertical SaaS for independent architecture and design studios.",
    stage: "Growth",
    location: "Remote (US)",
    salary: "$180k – $210k",
    matchReason: "Later-stage stability with the work-life balance priority you flagged.",
    logoLetter: "A",
    logoColor: "bg-[#55554a]",
  },
];

export const ASSESSMENT_SECTIONS = [
  {
    id: "behavioral",
    label: "Behavioral",
    description: "How you operate under ambiguity, conflict, and pressure.",
    minutes: 20,
  },
  {
    id: "product-sense",
    label: "Product Sense",
    description: "How you reason about users, tradeoffs, and product decisions.",
    minutes: 20,
  },
  {
    id: "ai-fluency",
    label: "AI Fluency",
    description: "How you evaluate and work with AI-native product surfaces.",
    minutes: 15,
  },
];

export const ASSESSMENT_TOTAL_MINUTES = ASSESSMENT_SECTIONS.reduce((sum, s) => sum + s.minutes, 0);

export const BEHAVIORAL_QUESTIONS = [
  {
    id: "b1",
    prompt: "Tell me about yourself.",
    helper: "A quick intro — walk us through your background and what's brought you to this point.",
  },
  {
    id: "b2",
    prompt: "Tell me about the most challenging product you've launched.",
    helper: "Focus on what made it hard and the specific decisions you made along the way.",
  },
  {
    id: "b3",
    prompt: "Tell me about a time you championed something that other people disagreed with.",
    helper: "We're listening for how you built conviction and brought others along.",
  },
];

export const PRODUCT_SENSE_QUESTIONS = [
  {
    id: "q1",
    prompt: "How would you design an AI agent for senior citizens?",
    helper: "Walk through who you're designing for, the core problem, and how you'd approach trust and usability.",
  },
];

export const AI_FLUENCY_QUESTIONS = [
  {
    id: "a1",
    prompt: "How do you use AI in your personal and professional workflows today?",
    helper: "Be specific — which tools, for what tasks, and how it's changed how you work.",
  },
  {
    id: "a2",
    prompt: "Describe how an AI agent works.",
    helper: "Explain it the way you'd explain it to a smart teammate who hasn't built one.",
  },
  {
    id: "a3",
    prompt: "What's your experience building products with guardrails and evals?",
    helper: "If you haven't shipped this directly, talk through how you'd think about it.",
  },
];

export const SCORE = {
  overallPercentile: 82,
  dimensions: [
    {
      id: "behavioral",
      label: "Behavioral",
      score: 78,
      summary: "Strong structured reasoning under ambiguous prompts; clear ownership language.",
      feedback:
        "Add more quantified outcomes to your stories — \"we grew signups\" lands stronger as \"grew signups 40% in six weeks.\"",
    },
    {
      id: "product-sense",
      label: "Product Sense",
      score: 88,
      summary: "Sharp tradeoff framing and metric selection; ties decisions back to user impact.",
      feedback:
        "Already strong — tie your guardrail metrics more explicitly to the tradeoffs you're making, and this pushes into the 90s.",
    },
    {
      id: "ai-fluency",
      label: "AI Fluency",
      score: 80,
      summary: "Comfortable evaluating AI-native flows and their failure modes.",
      feedback:
        "Broaden the range of projects on your GitHub — reviewers want to see iteration across sessions, not polish on a single repo.",
    },
  ],
};

export const RETAKE_COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000;

export const INTAKE_DEFAULTS = {
  roleType: "Product Manager",
  salaryMin: 140,
  salaryMax: 190,
  location: "Remote (US)",
  stages: [],
  autonomy: 3,
  workLifeBalance: 3,
};

// A single "which object comes next" visual pattern used for the liveness
// check. Panels and options are described as line segments (0-100 box
// space) plus an optional red dot, rendered by PatternBox in ReadinessGate.
export const LIVENESS_PATTERN = {
  sequence: [
    { lines: [{ x1: 0, y1: 0, x2: 100, y2: 100 }], dot: { x: 75, y: 75 } },
    { lines: [{ x1: 50, y1: 0, x2: 50, y2: 100 }], dot: null },
    { lines: [{ x1: 0, y1: 100, x2: 100, y2: 0 }], dot: { x: 27, y: 73 } },
  ],
  options: [
    { key: "A", lines: [{ x1: 0, y1: 50, x2: 100, y2: 50 }], dot: null },
    { key: "B", lines: [{ x1: 0, y1: 50, x2: 100, y2: 50 }], dot: { x: 65, y: 50 } },
    {
      key: "C",
      lines: [
        { x1: 50, y1: 50, x2: 100, y2: 50 },
        { x1: 0, y1: 100, x2: 50, y2: 50 },
      ],
      dot: { x: 50, y: 50 },
    },
    { key: "D", lines: [{ x1: 50, y1: 0, x2: 50, y2: 100 }], dot: null },
    {
      key: "E",
      lines: [
        { x1: 50, y1: 0, x2: 50, y2: 100 },
        { x1: 0, y1: 100, x2: 50, y2: 50 },
      ],
      dot: { x: 50, y: 50 },
    },
  ],
};

export const BUILT_WITH_COMPANIES = ["OpenAI", "Anthropic", "Cursor", "Granola", "Vercel", "Perplexity"];

export const TESTIMONIALS = [
  {
    name: "Maya Chen",
    role: "Senior PM, Series B fintech — landed via Pathline",
    quote:
      "The assessment forced me to actually structure my product-sense answers instead of winging them. I walked into every intro call already knowing my score was legit.",
  },
  {
    name: "Tomás Rivera",
    role: "PM, seed-stage healthtech — landed via Pathline",
    quote:
      "I'd been ghosted by six recruiters in a row. Pathline's the first place a company reached out to me first — because they'd already seen my score.",
  },
  {
    name: "Aisha Bello",
    role: "PM, Series A dev-tools startup — landed via Pathline",
    quote:
      "The feedback after my behavioral section alone was worth more than any resume review I've ever paid for.",
  },
];

export const TRAINING_RESOURCES = [
  {
    id: "t1",
    title: "PM Product Sense: Structuring Your Answer",
    description: "A simple framework for walking through ambiguous product problems out loud — clarify, diagnose, decide.",
    time: "8 min read",
  },
  {
    id: "t2",
    title: "Talking Through Trade-offs Under Time Pressure",
    description: "How to narrate your reasoning when a prompt doesn't have a clean right answer.",
    time: "6 min read",
  },
  {
    id: "t3",
    title: "What Behavioral Interviewers Are Actually Listening For",
    description: "Ownership, specificity, and how to avoid vague 'we' answers when describing your own impact.",
    time: "5 min read",
  },
  {
    id: "t4",
    title: "Sample Assessment Walkthrough (Recorded)",
    description: "Watch a full mock run of the three sections, including pacing and what a strong answer sounds like.",
    time: "12 min watch",
  },
];

export const CANDIDATES = [
  {
    id: "cand-1",
    name: "Priya Natarajan",
    initial: "P",
    color: "bg-[#3f5d43]",
    scores: { behavioral: 84, "product-sense": 91, "ai-fluency": 76 },
    excerpt:
      "I'd start by segmenting the cancellation spike by driver tenure and geography before touching the product — if it's concentrated in new drivers, this is an onboarding problem, not a demand problem...",
  },
  {
    id: "cand-2",
    name: "Marcus Webb",
    initial: "M",
    color: "bg-[#9c5f22]",
    scores: { behavioral: 79, "product-sense": 85, "ai-fluency": 88 },
    excerpt:
      "The support ticket drop is the more reliable signal here — conversion is noisy and lagging, while a 40% drop in checkout tickets tells you the friction is actually gone. I'd tell leadership...",
  },
  {
    id: "cand-3",
    name: "Elena Sokolova",
    initial: "E",
    color: "bg-[#7e4b1b]",
    scores: { behavioral: 90, "product-sense": 82, "ai-fluency": 71 },
    excerpt:
      "Before designing a feature to smooth out exam-week seasonality, I'd question whether we should — that seasonality might just reflect true usage, and building for it risks diluting the core...",
  },
  {
    id: "cand-4",
    name: "Devon Okafor",
    initial: "D",
    color: "bg-[#33492f]",
    scores: { behavioral: 73, "product-sense": 88, "ai-fluency": 82 },
    excerpt:
      "I'd frame this as a two-week sprint: week one is pure diagnosis — cohort the cancellations by time of day, driver rating, and trip length — week two is a targeted intervention...",
  },
  {
    id: "cand-5",
    name: "Sofia Herrera",
    initial: "S",
    color: "bg-[#55554a]",
    scores: { behavioral: 81, "product-sense": 76, "ai-fluency": 90 },
    excerpt:
      "This is a good moment to bring in an AI-assisted triage layer for the support tickets themselves, to confirm the drop is a genuine friction fix and not a routing or classification artifact...",
  },
  {
    id: "cand-6",
    name: "Jamal Reeves",
    initial: "J",
    color: "bg-[#6f6f5f]",
    scores: { behavioral: 88, "product-sense": 79, "ai-fluency": 68 },
    excerpt:
      "Not automatically a win. I'd want to know if the ticket drop is because the flow is genuinely clearer, or because people are abandoning silently before ever reaching support...",
  },
  {
    id: "cand-7",
    name: "Nina Vasquez",
    initial: "N",
    color: "bg-[#8f8f7c]",
    scores: { behavioral: 77, "product-sense": 84, "ai-fluency": 79 },
    excerpt:
      "My first move is always to rule out a measurement problem before a product problem — check whether the cancellation definition changed or a new driver cohort skews the average...",
  },
];

export const RECRUITER_ROLE = {
  title: "Senior PM, Growth",
  company: "Northloop",
  stage: "Series B",
  applicants: CANDIDATES.length,
};
