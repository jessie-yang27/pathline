// Presentation content for the narrative "story" pages (Why Pathline?,
// Why We're Better, How We Built This). Not part of the clickable
// candidate/recruiter product flow — walkthrough material only.

export const STORY_PAGES = [
  { id: "why", label: "Why Pathline?" },
  { id: "better", label: "Why We're Better" },
  { id: "built", label: "How We Built This" },
];

export const THESIS_QUOTE = "A verified assessment score is a better signal than a resume.";

export const THESIS_CARDS = [
  {
    q: "Who's the wedge?",
    a: "Candidates. PM roles first.",
    why: "A concentrated, high-intent population — one assessment travels across many roles and companies.",
  },
  {
    q: "What replaces the resume?",
    a: "A standardized assessment score.",
    why: "Resumes signal pedigree, not skill. Scores measure the thing that actually predicts whether someone's good at the job.",
  },
  {
    q: "Who moves first?",
    a: "Candidates initiate.",
    why: "Assessment-first flips \"apply and wait\" into \"get scored, then get pursued.\"",
  },
  {
    q: "How transparent are we?",
    a: "Full score visibility. Hidden weights.",
    why: "You see every dimension of your score. Companies privately choose how much each dimension matters to them.",
  },
  {
    q: "Biggest risk?",
    a: "Gaming the system.",
    why: "We're not hiding from this one: proctoring, live logic checks, and rotating question banks are day-one defenses, not an afterthought.",
  },
  {
    q: "What are we NOT building?",
    a: "A resume-flood job board.",
    why: "No easy-apply, no keyword spam. One assessment, one signal, unlimited relevant matches.",
  },
];

export const CONNECTION_STEPS = [
  { icon: "📝", label: "Candidate takes assessment" },
  { icon: "📊", label: "Gets scored" },
  { icon: "🙋", label: "Expresses interest" },
  { icon: "📋", label: "Company sees ranked candidates on their rubric" },
  { icon: "🤝", label: "Company expresses interest" },
  { icon: "🚀", label: "Match begins" },
];

export const NORTH_STAR = {
  title: "North Star",
  metric: "Match Rate",
  definition: "The share of mutual-interest pairs (candidate + company both express interest) that convert to an interview.",
  why: "Completion, not clicks — it measures whether both sides actually found the match worth pursuing, not just whether they looked.",
};

export const NOT_OPTIMIZING = {
  title: "Not Optimizing For (Yet)",
  metric: "Efficiency & monetization",
  definition: "Take-rate, margin, and funnel efficiency stay off the dashboard for now.",
  why: "Those are mature-marketplace problems — worth solving once there's liquidity worth protecting, not before there's liquidity at all.",
};

export const COLD_START_STEPS = [
  {
    n: "01",
    label: "Borrow credibility",
    body: "Partner with name-brand PMs to build assessments candidates trust.",
  },
  {
    n: "02",
    label: "Market the mirror",
    body: "Sell the assessment itself as \"see how you rank\" — value before there's a marketplace.",
  },
  {
    n: "03",
    label: "Walk in with supply",
    body: "Go to employers with a ready, scored candidate pool — not a cold pitch.",
  },
];

export const BETTER_HERO = "Every competitor picked a side. We didn't get the memo.";

export const STRENGTH = { WEAK: "WEAK", MEDIUM: "MEDIUM", STRONG: "STRONG" };

export const COMPETITORS = [
  {
    name: "Indeed / Google Jobs",
    candidate: { level: STRENGTH.MEDIUM, note: "Huge reach, zero curation." },
    recruiter: { level: STRENGTH.WEAK, note: "Volume without signal — recruiters drown in resumes." },
  },
  {
    name: "LinkedIn",
    candidate: { level: STRENGTH.MEDIUM, note: "Great for visibility, exhausting to actually use." },
    recruiter: { level: STRENGTH.MEDIUM, note: "Good search, still manual screening at scale." },
  },
  {
    name: "Wellfound",
    candidate: { level: STRENGTH.STRONG, note: "Beloved by startup-curious candidates." },
    recruiter: { level: STRENGTH.MEDIUM, note: "Good top-of-funnel, still resume-based screening." },
  },
  {
    name: "Paraform",
    candidate: { level: STRENGTH.MEDIUM, note: "Only as good as the recruiter you're paired with." },
    recruiter: { level: STRENGTH.STRONG, note: "White-glove and high quality — doesn't scale past headcount." },
  },
  {
    name: "Otta",
    candidate: { level: STRENGTH.STRONG, note: "Great discovery, curated by values and culture." },
    recruiter: { level: STRENGTH.WEAK, note: "Candidate-first product, thin employer tooling." },
  },
];

export const PATHLINE_ROW = {
  name: "Pathline",
  candidate: { level: STRENGTH.STRONG, note: "One assessment, full transparency, unlimited relevant matches." },
  recruiter: { level: STRENGTH.STRONG, note: "One score, ranked and rubric-weighted — no resume triage." },
};

export const THE_PATTERN =
  "The strongest players win by narrowing: Wellfound narrows by company stage, Paraform narrows by white-glove service on one side. Pathline's assessment score is the mechanism that lets both sides be strong at once — without a narrow niche or an army of recruiters.";

export const BUILD_TIMELINE = [
  {
    n: "01",
    icon: "📄",
    label: "Fed it everything",
    body: "Uploaded the assignment doc, Granola call transcripts, and the job description.",
    tools: ["Claude"],
  },
  {
    n: "02",
    icon: "🗺️",
    label: "Asked for a map, not an answer",
    quote: "Give me an outline — not the solution.",
    body: "Deliberately protected original thinking before generating anything.",
    tools: ["Claude"],
  },
  {
    n: "03",
    icon: "🎙️",
    label: "Got stuck on \"human matchmaker\"",
    body: "Talked it out loud via Wispr Flow instead of typing through the block.",
    tools: ["Wispr Flow"],
  },
  {
    n: "04",
    icon: "💡",
    label: "The turning point",
    body: "Claude asked what a matchmaker's actual inputs and outputs were — and whether it needed to be human at all. That question unlocked the standardized-assessment idea.",
    quote: "It didn't give me the answer. It asked the question that got me unstuck.",
    tools: ["Claude"],
    featured: true,
  },
  {
    n: "05",
    icon: "📐",
    label: "Built the spec, then the thing",
    body: "Claude drafted the Claude Code build spec. The prototype got built and shipped to Vercel.",
    tools: ["Claude", "Claude Code", "Vercel"],
  },
  {
    n: "06",
    icon: "🔁",
    label: "Kept iterating, two ways",
    body: "Direct edits in Claude Code for small stuff, spec-first through Claude for bigger changes.",
    tools: ["Claude Code"],
  },
];

export const TOOLKIT = [
  { icon: "🧠", name: "Claude", role: "Thinking partner + spec-writing" },
  { icon: "🎙️", name: "Wispr Flow", role: "Talking through stuck points" },
  { icon: "⌨️", name: "Claude Code", role: "Build + iterate" },
];

export const BEST_PROMPT = {
  text: "Help me brainstorm the solution... without giving me an answer, I want to generate it on my own.",
  caption: "The best prompt of the project — it protects your own reasoning while still using AI as leverage.",
};
