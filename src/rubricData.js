// Default scoring rubrics for the internal "Rubric view" — what a perfect
// response looks like per assessment section. Order is priority (highest
// first). Companies can reorder, edit, remove, and add criteria; "threshold"
// criteria expose an editable number inline.

export const RUBRICS = [
  {
    id: "behavioral",
    label: "Behavioral",
    framework: "STAR format",
    criteria: [
      { id: "b1", type: "text", text: 'Uses "zero-to-one" language when describing ownership' },
      { id: "b2", type: "text", text: 'References an "entrepreneurial" mindset or initiative' },
      { id: "b3", type: "text", text: "Tells specific, high-impact stories — not generic anecdotes" },
      { id: "b4", type: "text", text: "Shows strong fit for fast-moving startup environments" },
      { id: "b5", type: "text", text: "Has enough relevant work experience for the role" },
      { id: "b6", type: "text", text: "Follows STAR format: Situation, Task, Action, Result" },
    ],
  },
  {
    id: "product-sense",
    label: "Product Sense",
    framework: "North-star framework",
    criteria: [
      { id: "p1", type: "text", text: "Defines a clear north-star goal" },
      { id: "p2", type: "text", text: "Identifies the target user precisely" },
      { id: "p3", type: "text", text: "Articulates the core pain point" },
      { id: "p4", type: "text", text: "Proposes a concrete solution" },
      { id: "p5", type: "text", text: "Defines success metrics" },
      { id: "p6", type: "text", text: "Defines guardrail metrics" },
      { id: "p7", type: "text", text: "Prioritizes across all of the above, and explains why the rest didn't come first" },
    ],
  },
  {
    id: "ai-fluency",
    label: "AI Fluency",
    framework: "GitHub + interview signal",
    criteria: [
      { id: "a1", type: "threshold", prefix: "GitHub shows at least", value: 5, suffix: "repositories" },
      { id: "a2", type: "threshold", prefix: "Projects span at least", value: 3, suffix: "distinct build sessions" },
      { id: "a3", type: "text", text: "Answers are technically accurate" },
      { id: "a4", type: "text", text: "Answers are comprehensive, not surface-level" },
    ],
  },
];
