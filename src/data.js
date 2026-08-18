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
    minutes: 25,
  },
  {
    id: "ai-fluency",
    label: "AI Fluency",
    description: "How you evaluate and work with AI-native product surfaces.",
    minutes: 15,
  },
];

export const PRODUCT_SENSE_QUESTIONS = [
  {
    id: "q1",
    prompt:
      "A ride-share app's weekend ride volume is up 30% quarter-over-quarter, but driver cancellation rate has also doubled. Walk through how you'd diagnose the cause and what you'd do in the first two weeks.",
    helper: "We're evaluating your diagnostic process, not just your final answer.",
  },
  {
    id: "q2",
    prompt:
      "You're the PM for a note-taking app used by students. Usage is high during exam weeks and nearly dead otherwise. Design a feature that could smooth out that seasonality — and explain what you'd measure to know if it worked.",
    helper: "Consider tradeoffs between engagement and staying true to the core use case.",
  },
  {
    id: "q3",
    prompt:
      "Your team ships a redesigned checkout flow. Conversion is flat, but customer support tickets about checkout have dropped 40%. Do you consider this a win? What would you tell leadership?",
    helper: "There's no single correct verdict — we're looking at how you frame the decision.",
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
    },
    {
      id: "product-sense",
      label: "Product Sense",
      score: 88,
      summary: "Sharp tradeoff framing and metric selection; ties decisions back to user impact.",
    },
    {
      id: "ai-fluency",
      label: "AI Fluency",
      score: 80,
      summary: "Comfortable evaluating AI-native flows and their failure modes.",
    },
  ],
};

export const INTAKE_DEFAULTS = {
  roleType: "Product Manager",
  salaryMin: 140,
  salaryMax: 190,
  location: "Remote (US)",
  stages: [],
  autonomy: 3,
  workLifeBalance: 3,
};
