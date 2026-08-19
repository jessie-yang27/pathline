import { useState } from "react";
import { Logo, PrimaryButton, SecondaryButton, Kicker, StepDots } from "./ui";
import { LOGIC_CHECK_QUESTIONS } from "../data";

const STEPS = ["Recording notice", "Quick check", "Ready?"];

function CameraIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <rect x="2" y="6" width="15" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M17 10.5 22 7.5V16.5L17 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="9.5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ConsentStep({ consented, setConsented, onContinue }) {
  return (
    <div>
      <Kicker>Before you begin</Kicker>
      <h2 className="mt-4 font-serif text-3xl text-ink-950">This assessment is recorded</h2>
      <p className="mt-3 max-w-xl text-ink-600">
        Pathline's entire model depends on your score meaning something. To protect that signal for
        you and for every company that reads it, your camera and full screen are recorded for the
        duration of the assessment.
      </p>

      <div className="mt-7 space-y-4 rounded-sm border border-ink-900/10 bg-paper-100 p-6">
        <div className="flex gap-3">
          <span className="mt-0.5 text-ink-500"><CameraIcon /></span>
          <p className="text-sm leading-relaxed text-ink-700">
            <span className="font-medium text-ink-900">What's recorded:</span> your webcam feed and
            your full screen, starting when you click "I'm ready" and ending when you submit or exit.
          </p>
        </div>
        <div className="flex gap-3">
          <span className="mt-0.5 text-ink-500" aria-hidden>⚿</span>
          <p className="text-sm leading-relaxed text-ink-700">
            <span className="font-medium text-ink-900">Why:</span> it's how we prevent AI-assisted or
            impersonated completions from entering the same pool as your real, unaided work.
          </p>
        </div>
        <div className="flex gap-3">
          <span className="mt-0.5 text-ink-500" aria-hidden>◎</span>
          <p className="text-sm leading-relaxed text-ink-700">
            <span className="font-medium text-ink-900">Who sees it:</span> only Pathline's integrity
            review. Companies never receive the recording — only your score, same as they always do.
          </p>
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink-700">
        <input
          type="checkbox"
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-ink-900"
        />
        I understand this session will be video and screen recorded, and I consent to that recording.
      </label>

      <div className="mt-8 flex justify-end border-t border-ink-900/10 pt-6">
        <PrimaryButton onClick={onContinue} disabled={!consented}>
          Continue <span aria-hidden>→</span>
        </PrimaryButton>
      </div>
    </div>
  );
}

function LogicCheckStep({ answers, setAnswer, onContinue, onBack }) {
  const allAnswered = LOGIC_CHECK_QUESTIONS.every((q) => answers[q.id]);

  return (
    <div>
      <Kicker>Quick check</Kicker>
      <h2 className="mt-4 font-serif text-3xl text-ink-950">Let's make sure you're ready</h2>
      <p className="mt-3 max-w-xl text-ink-600">
        Three quick warm-up questions — nothing job-related, and this isn't scored. It's just a
        moment to get focused before the real thing starts.
      </p>

      <div className="mt-8 space-y-6">
        {LOGIC_CHECK_QUESTIONS.map((q, i) => (
          <div key={q.id} className="rounded-sm border border-ink-900/10 bg-paper-100 p-5">
            <p className="text-sm font-medium text-ink-900">
              {i + 1}. {q.prompt}
            </p>
            {q.display && <p className="mt-1 font-mono text-sm text-ink-600">{q.display}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAnswer(q.id, opt)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    answers[q.id] === opt
                      ? "border-ink-900 bg-ink-900 text-paper-50"
                      : "border-ink-900/15 text-ink-800 hover:border-ink-900/40"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-ink-900/10 pt-6">
        <SecondaryButton onClick={onBack}>Back</SecondaryButton>
        <PrimaryButton onClick={onContinue} disabled={!allAnswered}>
          Continue <span aria-hidden>→</span>
        </PrimaryButton>
      </div>
    </div>
  );
}

function DecisionStep({ onReady, onNotReady, onBack }) {
  return (
    <div>
      <Kicker>Last step before we start</Kicker>
      <h2 className="mt-4 font-serif text-3xl text-ink-950">Ready to begin?</h2>
      <p className="mt-3 max-w-xl text-ink-600">
        Once you start, your camera and screen recording begin immediately and the assessment
        clock starts running. There's no shame in taking a few more minutes to prepare first.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          onClick={onReady}
          className="rounded-lg border border-ink-900 bg-ink-900 p-6 text-left text-paper-50 transition hover:bg-signal-700"
        >
          <p className="font-serif text-xl">I'm ready</p>
          <p className="mt-2 text-sm text-paper-300/80">
            Start camera & screen recording and begin the assessment now.
          </p>
        </button>
        <button
          onClick={onNotReady}
          className="rounded-lg border border-ink-900/15 bg-paper-50 p-6 text-left text-ink-900 transition hover:border-ink-900/40"
        >
          <p className="font-serif text-xl">Not ready yet</p>
          <p className="mt-2 text-sm text-ink-600">
            Spend a few minutes with prep materials first, then come back here.
          </p>
        </button>
      </div>

      <div className="mt-8 border-t border-ink-900/10 pt-6">
        <SecondaryButton onClick={onBack}>Back</SecondaryButton>
      </div>
    </div>
  );
}

export default function ReadinessGate({ onReady, onNotReady }) {
  const [step, setStep] = useState(0);
  const [consented, setConsented] = useState(false);
  const [answers, setAnswers] = useState({});

  const setAnswer = (id, value) => setAnswers((a) => ({ ...a, [id]: value }));

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-7">
        <Logo />
        <p className="text-sm text-ink-500">Readiness check</p>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <div className="mb-10 flex items-center justify-between">
          <StepDots total={STEPS.length} current={step} />
          <span className="text-xs uppercase tracking-[0.14em] text-ink-500">{STEPS[step]}</span>
        </div>

        <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-8 sm:p-10">
          {step === 0 && (
            <ConsentStep consented={consented} setConsented={setConsented} onContinue={() => setStep(1)} />
          )}
          {step === 1 && (
            <LogicCheckStep
              answers={answers}
              setAnswer={setAnswer}
              onContinue={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && <DecisionStep onReady={onReady} onNotReady={onNotReady} onBack={() => setStep(1)} />}
        </div>
      </main>
    </div>
  );
}
