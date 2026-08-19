import { Logo, PrimaryButton, Kicker } from "./ui";
import { TRAINING_RESOURCES } from "../data";

export default function TrainingMaterials({ onBackToGate }) {
  return (
    <div className="min-h-screen bg-paper-100">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-7">
        <Logo />
        <p className="text-sm text-ink-500">Taking a moment to prepare</p>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <Kicker>Let's get you ready</Kicker>
        <h1 className="mt-4 font-serif text-4xl text-ink-950">A few things worth a quick look</h1>
        <p className="mt-3 max-w-xl text-ink-600">
          No pressure — plenty of strong candidates take a few minutes here first. Come back to the
          readiness check whenever you feel good about starting.
        </p>

        <div className="mt-9 space-y-4">
          {TRAINING_RESOURCES.map((r) => (
            <div
              key={r.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-ink-900/10 bg-paper-50 p-6 transition hover:border-ink-900/25"
            >
              <div>
                <p className="font-serif text-lg text-ink-950">{r.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{r.description}</p>
              </div>
              <span className="mt-1 shrink-0 whitespace-nowrap text-xs uppercase tracking-[0.1em] text-ink-400">
                {r.time}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-9 flex justify-end border-t border-ink-900/10 pt-6">
          <PrimaryButton onClick={onBackToGate}>
            Back to readiness check <span aria-hidden>→</span>
          </PrimaryButton>
        </div>
      </main>
    </div>
  );
}
