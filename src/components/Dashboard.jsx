import { ScreenHeader, PrimaryButton, SecondaryButton, Kicker, Pill } from "./ui";
import { ASSESSMENT_SECTIONS, SCORE } from "../data";

function AssessmentCard({ section, done, onStart }) {
  const dim = SCORE.dimensions.find((d) => d.id === section.id);

  return (
    <div
      className={`flex flex-col rounded-lg border p-6 ${
        done ? "border-verified-700/25 bg-verified-600/5" : "border-ink-900/10 bg-paper-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.1em] text-ink-500">{section.minutes} min</span>
        {done ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-verified-600/10 px-2.5 py-1 text-[11px] font-semibold text-verified-700">
            <span aria-hidden>✓</span> Completed
          </span>
        ) : (
          <span className="rounded-full bg-ink-900/5 px-2.5 py-1 text-[11px] font-semibold text-ink-500">
            Not started
          </span>
        )}
      </div>

      <p className="mt-3 font-serif text-xl text-ink-950">{section.label}</p>
      <p className="mt-1 text-sm text-ink-600">{section.description}</p>

      {done && dim ? (
        <div className="mt-4 rounded-sm bg-paper-100 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-700">Score</span>
            <span className="font-serif text-lg text-ink-950">
              {dim.score}
              <span className="text-xs text-ink-400">/100</span>
            </span>
          </div>
        </div>
      ) : (
        <PrimaryButton onClick={onStart} className="mt-5 w-full">
          Start {section.label} <span aria-hidden>→</span>
        </PrimaryButton>
      )}
    </div>
  );
}

export default function Dashboard({
  assessmentStatus,
  surveyCompleted,
  onStartAssessment,
  onStartSurvey,
  onViewCompanies,
  onViewResults,
  onBack,
  onHome,
}) {
  const completedCount = Object.values(assessmentStatus).filter(Boolean).length;
  const allDone = completedCount === ASSESSMENT_SECTIONS.length;

  return (
    <div className="min-h-screen bg-paper-100">
      <ScreenHeader onBack={onBack} onHome={onHome} right={<p className="text-sm text-ink-500">Dashboard</p>} />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-6">
        <Kicker>Your Pathline dashboard</Kicker>
        <h1 className="mt-4 font-serif text-4xl text-ink-950">Everything happens from here</h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          Take each assessment on your own time, tell us about the job you want, then share your
          score with companies. No fixed order.
        </p>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
              Assessments · {completedCount} of {ASSESSMENT_SECTIONS.length} complete
            </p>
            {completedCount > 0 && (
              <button
                onClick={onViewResults}
                className="text-xs font-medium text-signal-600 underline decoration-signal-600/40 underline-offset-2 hover:text-signal-700"
              >
                View full score breakdown →
              </button>
            )}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ASSESSMENT_SECTIONS.map((section) => (
              <AssessmentCard
                key={section.id}
                section={section}
                done={Boolean(assessmentStatus[section.id])}
                onStart={() => onStartAssessment(section.id)}
              />
            ))}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-6">
            <div className="flex items-center justify-between">
              <Pill>Preferences</Pill>
              {surveyCompleted && (
                <span className="inline-flex items-center gap-1 rounded-full bg-verified-600/10 px-2.5 py-1 text-[11px] font-semibold text-verified-700">
                  <span aria-hidden>✓</span> Completed
                </span>
              )}
            </div>
            <p className="mt-3 font-serif text-xl text-ink-950">Tell us about the job you want</p>
            <p className="mt-1 text-sm text-ink-600">
              Salary, location, stage, autonomy — a few quick questions so your matches actually fit.
            </p>
            {surveyCompleted ? (
              <SecondaryButton onClick={onStartSurvey} className="mt-5 w-full">
                Edit your answers
              </SecondaryButton>
            ) : (
              <PrimaryButton onClick={onStartSurvey} className="mt-5 w-full">
                Start survey <span aria-hidden>→</span>
              </PrimaryButton>
            )}
          </div>

          <div className="rounded-lg border border-signal-600/25 bg-signal-500/8 p-6">
            <Pill className="border-signal-600/30 bg-signal-500/10 text-signal-700">Companies</Pill>
            <p className="mt-3 font-serif text-xl text-ink-950">Browse matched companies</p>
            <p className="mt-1 text-sm text-ink-600">
              {allDone
                ? "Your score is ready — filter the list and share it with companies you like."
                : "Browse and filter anytime. Sharing your score unlocks once all three assessments are done."}
            </p>
            <PrimaryButton onClick={onViewCompanies} className="mt-5 w-full">
              View companies <span aria-hidden>→</span>
            </PrimaryButton>
          </div>
        </section>
      </main>
    </div>
  );
}
