import { ScreenHeader, PrimaryButton, Kicker } from "./ui";
import { SCORE, ASSESSMENT_SECTIONS } from "../data";
import { ordinal } from "../utils";

export default function Results({ assessmentStatus, onSeeCompanies, onBack, onHome }) {
  const completedDimensions = SCORE.dimensions.filter((d) => assessmentStatus[d.id]);
  const allDone = completedDimensions.length === ASSESSMENT_SECTIONS.length;

  return (
    <div className="min-h-screen bg-paper-100">
      <ScreenHeader
        onBack={onBack}
        onHome={onHome}
        right={<p className="text-sm text-ink-500">Your score</p>}
      />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <Kicker>Your results</Kicker>
        <h1 className="mt-4 font-serif text-4xl text-ink-950">Here's your score so far</h1>
        <p className="mt-2 max-w-lg text-ink-600">
          This is the same score companies will see when you share it — nothing is hidden or
          summarized differently on their side.
        </p>

        <div className="mt-10 overflow-hidden rounded-lg border border-ink-900/10 bg-paper-50">
          <div className="flex flex-col items-center border-b border-ink-900/10 bg-ink-950 px-8 py-12 text-center">
            {allDone ? (
              <>
                <p className="text-xs uppercase tracking-[0.2em] text-paper-300/70">Overall percentile</p>
                <p className="mt-3 font-serif text-7xl text-paper-50">
                  {SCORE.overallPercentile}
                  <span className="text-3xl text-paper-300/70">{ordinal(SCORE.overallPercentile)}</span>
                </p>
                <p className="mt-3 text-sm text-paper-300/80">
                  You scored in the {SCORE.overallPercentile}
                  {ordinal(SCORE.overallPercentile)} percentile among PM candidates on Pathline.
                </p>
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.2em] text-paper-300/70">Overall percentile</p>
                <p className="mt-3 font-serif text-3xl text-paper-50">
                  {completedDimensions.length} of {ASSESSMENT_SECTIONS.length} assessments done
                </p>
                <p className="mt-3 text-sm text-paper-300/80">
                  Complete all three to see your overall percentile — each dimension unlocks as you go.
                </p>
              </>
            )}
          </div>

          <div className="p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-500">Score breakdown</p>
            <div className="mt-5 space-y-6">
              {ASSESSMENT_SECTIONS.map((section) => {
                const d = SCORE.dimensions.find((dim) => dim.id === section.id);
                const done = Boolean(assessmentStatus[section.id]);
                return (
                  <div key={section.id}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-lg text-ink-950">{section.label}</span>
                      {done ? (
                        <span className="font-serif text-lg text-ink-950">
                          {d.score}
                          <span className="text-sm text-ink-400">/100</span>
                        </span>
                      ) : (
                        <span className="text-xs font-medium uppercase tracking-wide text-ink-400">
                          Not started
                        </span>
                      )}
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/8">
                      <div
                        className={`h-full rounded-full ${done ? "bg-verified-600" : "bg-ink-900/10"}`}
                        style={{ width: `${done ? d.score : 0}%` }}
                      />
                    </div>
                    {done && <p className="mt-2 text-sm leading-relaxed text-ink-600">{d.summary}</p>}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-sm border border-verified-700/25 bg-verified-600/8 px-5 py-4">
              <span className="mt-0.5 text-verified-700" aria-hidden>✓</span>
              <p className="text-sm leading-relaxed text-verified-700">
                <span className="font-semibold">Full transparency:</span> companies will see this
                exact score — the same dimensions, the same summaries. No black box.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <PrimaryButton onClick={onSeeCompanies}>
            Browse companies <span aria-hidden>→</span>
          </PrimaryButton>
        </div>
      </main>
    </div>
  );
}
