import { ScreenHeader, PrimaryButton, Kicker, Pill } from "./ui";
import { ROLES } from "../data";

function RoleCard({ role, locked }) {
  return (
    <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-6 transition hover:border-ink-900/25">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-sm font-serif text-lg text-paper-50 ${role.logoColor}`}
          >
            {role.logoLetter}
          </div>
          <div>
            <p className="font-serif text-lg text-ink-950">{role.title}</p>
            <p className="text-sm text-ink-500">{role.company}</p>
          </div>
        </div>
        <Pill>{role.stage}</Pill>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-600">{role.blurb}</p>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-700">
        <span>{role.salary}</span>
        <span className="text-ink-300">·</span>
        <span>{role.location}</span>
      </div>

      <p className="mt-3 text-xs italic text-verified-700">{role.matchReason}</p>

      <div className="mt-5 flex items-center justify-between border-t border-ink-900/10 pt-4">
        {locked ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-400">
            <LockIcon /> Take the assessment to apply
          </span>
        ) : (
          <span className="text-xs text-verified-700">Unlocked — ready to apply</span>
        )}
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function Discovery({ survey, onTakeAssessment, onBack, onHome }) {
  return (
    <div className="min-h-screen bg-paper-100">
      <ScreenHeader
        maxWidth="max-w-5xl"
        onBack={onBack}
        onHome={onHome}
        right={<p className="text-sm text-ink-500">Based on your intake survey</p>}
      />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-6">
        <Kicker>{ROLES.length} matched roles</Kicker>
        <h1 className="mt-4 font-serif text-4xl text-ink-950">Roles that fit what you told us</h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          {survey.stages.length ? survey.stages.join(", ") : "Any stage"} · {survey.location} · $
          {survey.salaryMin}k–${survey.salaryMax}k · autonomy {survey.autonomy}/5
        </p>

        <div className="mt-6 flex items-center justify-between rounded-lg border border-signal-600/25 bg-signal-500/8 px-6 py-4">
          <p className="text-sm text-ink-800">
            <span className="font-semibold text-signal-700">Take the assessment</span> to unlock your
            score and apply to any of these roles.
          </p>
          <PrimaryButton onClick={onTakeAssessment} className="shrink-0 whitespace-nowrap">
            Take the assessment <span aria-hidden>→</span>
          </PrimaryButton>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {ROLES.map((role) => (
            <RoleCard key={role.id} role={role} locked />
          ))}
        </div>
      </main>
    </div>
  );
}
