// Presentation content for the narrative "story" pages (Why Pathline?,
// Why We're Better, How We Built This). Not part of the clickable
// candidate/recruiter product flow — walkthrough material only.
//
// Content here is pulled as close to verbatim as possible from the actual
// take-home doc (thesis, key product decisions, competitive analysis, AI
// process notes) so the walkthrough sounds like the person who wrote it,
// not a rewritten summary of it.

export const STORY_PAGES = [
  { id: "why", label: "Why Pathline?" },
  { id: "better", label: "Why We're Better" },
  { id: "built", label: "How We Built This" },
];

export const THESIS_QUOTE = "Our belief: A verified assessment score is 10x better signal than a resume.";

export const KEY_PROBLEM = "Problem: Existing tools optimize for volume, not signal.";

export const PROBLEM_STATS = [
  {
    caption: "Candidates send",
    stat: "100s",
    detail: "of applications",
  },
  {
    caption: "Recruiters receive",
    stat: "1000s",
    detail: "of resumes",
  },
];

export const SOLUTION_LABEL = "The Solution: Pathline";

export const THESIS_CARDS = [
  {
    q: "Who's the wedge?",
    a: "Candidates.",
    why: "Candidates are higher urgency users — recruiters have a large pool to draw from, but candidates are also the root cause of the existing volume problem.",
    visual: "urgencyImpact",
  },
  {
    q: "Why PM roles first?",
    a: "To create expertise in one niche.",
    why: "PM roles first, then expand — depth in one function before breadth across others.",
  },
  {
    q: "What's the unit of signal?",
    a: "A standardized assessment score.",
    why: [
      "The assessment 1) increases quality by helping the candidate self-improve, and 2) shares meaning beyond a resume to the recruiter.",
      "I'd first thought about a human recruiter doing this assessment — but a virtual, standardized version gets there faster and scales further.",
    ],
    visual: "accuracySpeed",
  },
  {
    q: "Who initiates?",
    a: "Candidates express interest.",
    why: "Candidates are in charge here — it's infeasible for a recruiter to initiate among thousands of candidates.",
    visual: "candidateJobRatio",
  },
  {
    q: "How transparent are we?",
    a: "Full score, hidden weights.",
    why: "We fully show the score to both sides, but hide the exact weights of the scoring model. Transparency builds fairness and trust; hidden weights protect against gaming it.",
  },
  {
    q: "What are the guardrail metrics?",
    a: "Fraud rate, drop-off rate, bottom-of-the-bucket risk.",
    why: "Proctoring with screen recording and rotating questions are the first line of defense — these three metrics catch what slips through.",
    guardrails: [
      {
        metric: "Fraud rate",
        definition: "% of assessments flagged for cheating",
        mitigation: "AI proctoring + rotating questions",
      },
      {
        metric: "Drop-off rate",
        definition: "% completion rate of the assessment",
        mitigation: "Short, easy interviews + candidate testimonials",
      },
      {
        metric: "Bottom-of-the-bucket risk",
        definition: "Average time to match",
        mitigation: "Feedback loop after every assessment",
      },
    ],
  },
  {
    q: "What are we NOT building?",
    a: "A basic job board.",
    why: "One that lets people flood the market with low-quality applications. Volume is the enemy.",
  },
];

export const CONNECTION_STEPS = [
  { icon: "📝", label: "Candidate takes assessment" },
  { icon: "📊", label: "Gets scored" },
  { icon: "🙋", label: "Candidate expresses interest (sends score)" },
  { icon: "📋", label: "Company sees candidates ranked on their rubric" },
  { icon: "🤝", label: "Company expresses interest" },
  { icon: "🚀", label: "Match begins" },
];

export const NORTH_STAR = {
  title: "North Star",
  metric: "Match Rate",
  definition: "% of match requests — a candidate expressing interest in a role — that result in a completed, successful transaction.",
  why: "The goal is improving quality of matches, not volume of them. Completion is the proxy for whether a match was actually worth making.",
};

export const NOT_OPTIMIZING = {
  title: "Not Optimizing For (Yet)",
  metric: "# of Requests",
  definition: "Raw volume of match requests sent stays off the dashboard as a goal.",
  why: "Chasing request volume just recreates the old spam problem. We care whether requests convert, not how many get sent.",
};

export const MATCH_HYPOTHESIS = {
  title: "Hypothesis",
  statement:
    "Increasing candidate quality and restricting the jobs they apply to will increase match rate.",
};

export const COLD_START_STEPS = [
  {
    n: "01",
    category: "Credibility",
    label: "Build assessment with PMs from name-brand companies",
  },
  {
    n: "02",
    category: "Candidate acquisition",
    label: "Market free assessment as a tool for candidates",
  },
  {
    n: "03",
    category: "Recruiter acquisition",
    label: "Approach recruiters with supply",
  },
];

export const COLD_START_CAPTION =
  "Give something away for free to attract candidates first — then candidates become the asset that attracts recruiting.";

export const BETTER_HERO =
  "The top competitors win by focusing on a narrow segment. Pathline builds for the candidate first, to create the best experience for all.";

export const STRENGTH = { WEAK: "WEAK", MEDIUM: "MEDIUM", STRONG: "STRONG" };

export const COMPETITORS = [
  {
    name: "Indeed / Google",
    candidate: { level: STRENGTH.WEAK, note: "Standard job listings, no unique features. Outdated feeling." },
    recruiter: { level: STRENGTH.WEAK, note: "Too easy to post listings — floods the market, volume problem." },
  },
  {
    name: "LinkedIn",
    candidate: { level: STRENGTH.MEDIUM, note: "Job listings, Easy Apply with your profile as signal." },
    recruiter: { level: STRENGTH.WEAK, note: "Still too easy to post — Easy Apply makes it worse for recruiters." },
  },
  {
    name: "Wellfound",
    candidate: { level: STRENGTH.STRONG, note: "Startup-focused listings, personalized questions and AI videos." },
    recruiter: { level: STRENGTH.STRONG, note: "Smaller pool, but connections feel closer and more personal." },
  },
  {
    name: "Paraform",
    candidate: { level: STRENGTH.STRONG, note: "Niche selection, personal touch from a Paraform recruiter." },
    recruiter: { level: STRENGTH.STRONG, note: "1,000 specialized recruiters, white-glove support for employers." },
  },
  {
    name: "Otta",
    candidate: { level: STRENGTH.MEDIUM, note: "Survey up front, but it isn't very comprehensive." },
    recruiter: { level: STRENGTH.WEAK, note: "Likely a smaller pool, and likely lower quality." },
  },
];

export const PATHLINE_ROW = {
  name: "Pathline",
  candidate: { level: STRENGTH.STRONG, note: "One assessment, full transparency, unlimited relevant matches." },
  recruiter: { level: STRENGTH.STRONG, note: "One score, ranked and rubric-weighted — no resume triage." },
};

export const THE_PATTERN =
  "The top competitors win by focusing on a specific niche (Wellfound narrows to startups) or one side of the marketplace (Paraform is built for the employer). Pathline's assessment score is what lets us be strong on both sides at once — without narrowing to one.";

export const BUILD_TIMELINE = [
  {
    n: "01",
    icon: "📄",
    label: "Context Dump",
    body: "Uploaded the take-home assignment doc, Granola meeting transcripts, and the job description.",
    tools: ["Claude", "Granola"],
  },
  {
    n: "02",
    icon: "🗺️",
    label: "Prompting Claude",
    quote: "Help me brainstorm the solution — without giving me an answer. I want to generate it on my own.",
    body: "Got an outline, not a solution, then wrote up my own thinking in a doc from there.",
    tools: ["Claude"],
  },
  {
    n: "03",
    icon: "🎙️",
    label: "Brainstorming with Wispr",
    quote: "If I put a human between candidates and companies, it's going to be really slow... I'm trying to think how an AI could do that.",
    body: "Talked it out loud via Wispr Flow instead of typing through the block.",
    tools: ["Wispr Flow"],
  },
  {
    n: "04",
    icon: "💡",
    label: "Eureka Moment",
    body: "Claude asked what the matchmaker's actual inputs and outputs were — and whether it needed to be human at all. That's what unlocked the standardized-assessment idea.",
    quote: "It didn't give me the answer. It asked the question that got me unstuck.",
    tools: ["Claude"],
    featured: true,
  },
  {
    n: "05",
    icon: "📐",
    label: "Claude Code Prototype Development",
    body: "Asked Claude to draft the build spec for Claude Code. Built the prototype and deployed it to Vercel.",
    tools: ["Claude", "Claude Code", "Vercel"],
  },
  {
    n: "06",
    icon: "🔁",
    label: "Iterative Refinement",
    body: "Direct edits in Claude Code for small stuff, spec-first through Claude for bigger changes, design & copy updates with Claude Design.",
    tools: ["Claude Code", "Claude Design"],
  },
];

export const TOOLKIT = [
  { icon: "🧠", name: "Claude", role: "Thinking partner + spec-writing" },
  { icon: "🗒️", name: "Granola", role: "Meeting transcripts, fed straight into the research" },
  { icon: "🎙️", name: "Wispr Flow", role: "Talking through stuck points" },
  { icon: "⌨️", name: "Claude Code", role: "Build + iterate" },
  { icon: "🎨", name: "Claude Design", role: "Visual design + copy polish" },
];

export const BEST_PROMPT = {
  text: "Help me brainstorm the solution for this take-home assignment, without giving me an answer. I want to generate it on my own, but I'm getting stuck.",
  caption: "The best prompt of the project — it protects your own reasoning while still using AI as leverage.",
};
