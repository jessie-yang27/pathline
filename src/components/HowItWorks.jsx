import { ScreenHeader, Kicker } from "./ui";
import { ASSESSMENT_TOTAL_MINUTES } from "../data";

const STEPS = [
  {
    n: "01",
    title: "Take the assessment",
    body: `Behavioral, Product Sense, and AI Fluency — about ${ASSESSMENT_TOTAL_MINUTES} minutes, done once.`,
  },
  {
    n: "02",
    title: "Get scored",
    body: "A percentile score across all three dimensions. Fully visible to you, not just a summary.",
  },
  {
    n: "03",
    title: "Get matched",
    body: "Express interest in roles you like — companies review your score directly, no resume required.",
  },
];

export default function HowItWorks({ onBack, onHome, onContinueGeneric, onGatherInfo }) {
  return (
    <div className="min-h-screen bg-paper-100">
      <ScreenHeader onBack={onBack} onHome={onHome} right={<p className="text-sm text-ink-500">How it works</p>} />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <Kicker>Before you start</Kicker>
        <h1 className="mt-4 font-serif text-4xl text-ink-950">How Pathline works</h1>
        <p className="mt-3 max-w-xl text-ink-600">
          One assessment replaces the resume. Here's the whole thing, start to finish.
        </p>

        <div className="mt-10 space-y-6">
          {STEPS.map((s) => (
            <div key={s.n} className="flex gap-5">
              <span className="font-serif text-2xl text-ink-300">{s.n}</span>
              <div>
                <p className="font-serif text-lg text-ink-950">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-ink-900/10 pt-10">
          <p className="text-xs uppercase tracking-[0.14em] text-ink-500">Choose how to start</p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={onContinueGeneric}
              className="flex flex-col items-start rounded-lg border border-ink-900 bg-ink-900 p-6 text-left text-paper-50 transition hover:bg-signal-700"
            >
              <p className="font-serif text-xl">Continue with the free assessment</p>
              <p className="mt-2 text-sm text-paper-300/80">
                Jump straight in with the standard set of questions.
              </p>
            </button>

            <button
              onClick={onGatherInfo}
              className="flex flex-col items-start rounded-lg border border-ink-900/15 bg-paper-50 p-6 text-left text-ink-900 transition hover:border-ink-900/40"
            >
              <p className="font-serif text-xl">Tell us about the job you want</p>
              <p className="mt-2 text-sm text-ink-600">
                Answer a few quick questions about the role you're after, and we'll tailor the
                context around your assessment and match you to relevant roles.
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
