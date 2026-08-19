import { Logo, SecondaryButton, Pill } from "./ui";
import { CANDIDATES, ASSESSMENT_SECTIONS, PRODUCT_SENSE_QUESTIONS } from "../data";

const DIMENSIONS = ASSESSMENT_SECTIONS.map((s) => ({ id: s.id, label: s.label }));

export default function RecruiterCandidateDetail({ candidateId, weights, onBack }) {
  const candidate = CANDIDATES.find((c) => c.id === candidateId);
  if (!candidate) return null;

  const total = weights.behavioral + weights["product-sense"] + weights["ai-fluency"] || 1;
  const weighted = Math.round(
    (candidate.scores.behavioral * weights.behavioral +
      candidate.scores["product-sense"] * weights["product-sense"] +
      candidate.scores["ai-fluency"] * weights["ai-fluency"]) /
      total
  );

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-7">
        <Logo />
        <Pill className="border-signal-600/30 bg-signal-500/10 text-signal-700">Bonus: Recruiter view</Pill>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <SecondaryButton onClick={onBack} className="px-4 py-2 text-xs">
          ← Back to ranking
        </SecondaryButton>

        <div className="mt-6 flex items-center gap-4">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-serif text-xl text-paper-50 ${candidate.color}`}
          >
            {candidate.initial}
          </span>
          <div>
            <h1 className="font-serif text-3xl text-ink-950">{candidate.name}</h1>
            <p className="text-sm text-ink-500">Candidate for {DIMENSIONS.length} assessment dimensions</p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-ink-900/10 bg-paper-50">
          <div className="flex flex-col items-center border-b border-ink-900/10 bg-ink-950 px-8 py-10 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-paper-300/70">Weighted score, current rubric</p>
            <p className="mt-3 font-serif text-6xl text-paper-50">{weighted}</p>
            <p className="mt-2 text-xs text-paper-300/70">out of 100 · recalculates with your slider weights</p>
          </div>

          <div className="p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-500">Score breakdown</p>
            <div className="mt-5 space-y-6">
              {DIMENSIONS.map((dim) => (
                <div key={dim.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-lg text-ink-950">{dim.label}</span>
                    <span className="font-serif text-lg text-ink-950">
                      {candidate.scores[dim.id]}
                      <span className="text-sm text-ink-400">/100</span>
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/8">
                    <div
                      className="h-full rounded-full bg-verified-600"
                      style={{ width: `${candidate.scores[dim.id]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-ink-900/10 pt-6">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-500">
                Product Sense response excerpt
              </p>
              <p className="mt-2 text-sm italic text-ink-500">{PRODUCT_SENSE_QUESTIONS[0].prompt}</p>
              <blockquote className="mt-3 rounded-sm border-l-2 border-signal-600/50 bg-paper-100 px-5 py-4 text-sm leading-relaxed text-ink-700">
                "{candidate.excerpt}"
              </blockquote>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
