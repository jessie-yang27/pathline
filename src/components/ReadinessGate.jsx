import { useEffect, useState } from "react";
import { ScreenHeader, PrimaryButton, SecondaryButton, Kicker, StepDots } from "./ui";
import { SHAPE_SEQUENCE_QUESTIONS } from "../data";
import { formatElapsed } from "../utils";

const STEPS = ["Recording notice", "Liveness check", "Ready?"];

function FactCard({ icon, title, body }) {
  return (
    <div className="rounded-sm border border-ink-900/10 bg-paper-100 p-4">
      <span className="text-xl" aria-hidden>{icon}</span>
      <p className="mt-2 text-sm font-semibold text-ink-900">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-500">{body}</p>
    </div>
  );
}

function ConsentStep({ consented, setConsented, onContinue }) {
  return (
    <div>
      <Kicker>Before you begin</Kicker>
      <h2 className="mt-4 font-serif text-3xl text-ink-950">This assessment is recorded</h2>
      <p className="mt-2 text-sm text-ink-500">The quick version — three things to know.</p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <FactCard
          icon="🎥"
          title="Camera + screen recorded"
          body="Both are captured for the full assessment."
        />
        <FactCard
          icon="🤖"
          title="Proves it's really you"
          body="Not an AI answering on your behalf."
        />
        <FactCard
          icon="🔒"
          title="Pathline-only"
          body="Never shared with companies — only your score is."
        />
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

function MicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Shape({ type }) {
  const stroke = "stroke-ink-700";
  if (type === "circle") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" className={stroke} strokeWidth="2" />
      </svg>
    );
  }
  if (type === "square") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="1.5" className={stroke} strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 4 21 20H3Z" className={stroke} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function VoiceAnswer({ answered, onChange }) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!recording) return undefined;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  if (answered) {
    return (
      <div className="mt-4 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-verified-700">
          <span aria-hidden>✓</span> Answer captured
        </span>
        <button
          onClick={() => onChange(false)}
          className="text-xs font-medium text-ink-400 underline decoration-ink-300 underline-offset-2 hover:text-ink-700"
        >
          Record again
        </button>
      </div>
    );
  }

  if (recording) {
    return (
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => {
            setRecording(false);
            onChange(true);
          }}
          aria-label="Stop recording"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-paper-50 transition hover:bg-red-700"
        >
          <span className="h-3 w-3 rounded-[2px] bg-paper-50" aria-hidden />
        </button>
        <span className="flex items-end gap-0.5" aria-hidden>
          {[10, 16, 8, 20, 12].map((h, i) => (
            <span
              key={i}
              className="w-1 animate-pulse rounded-full bg-red-500"
              style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
            />
          ))}
        </span>
        <span className="font-mono text-xs text-red-700">{formatElapsed(seconds)}</span>
        <span className="text-xs text-ink-500">Listening…</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        setSeconds(0);
        setRecording(true);
      }}
      className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-900/20 px-4 py-2 text-sm font-medium text-ink-800 transition hover:border-ink-900/50"
    >
      <MicIcon /> Tap to answer out loud
    </button>
  );
}

function LivenessCheckStep({ answered, setAnswered, onContinue, onBack }) {
  const allAnswered = SHAPE_SEQUENCE_QUESTIONS.every((q) => answered[q.id]);

  return (
    <div>
      <Kicker>Quick check</Kicker>
      <h2 className="mt-4 font-serif text-3xl text-ink-950">Prove you're really here</h2>
      <p className="mt-3 max-w-xl text-ink-600">
        Two visual patterns, not scored. Answer out loud — it's not something a script reading the
        screen could fake.
      </p>

      <div className="mt-8 space-y-6">
        {SHAPE_SEQUENCE_QUESTIONS.map((q, i) => (
          <div key={q.id} className="rounded-sm border border-ink-900/10 bg-paper-100 p-5">
            <p className="text-sm font-medium text-ink-900">{i + 1}. What comes next in the pattern?</p>
            <div className="mt-4 flex items-center gap-3">
              {q.shapes.map((s, si) => (
                <div
                  key={si}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-ink-900/10 bg-paper-50"
                >
                  <Shape type={s} />
                </div>
              ))}
              <span className="text-ink-300" aria-hidden>→</span>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border-2 border-dashed border-signal-600/40 bg-signal-500/5 font-serif text-xl text-signal-600">
                ?
              </div>
            </div>
            <VoiceAnswer answered={Boolean(answered[q.id])} onChange={(val) => setAnswered(q.id, val)} />
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

function DecisionStep({ sectionLabel, minutes, onReady, onNotReady, onBack }) {
  return (
    <div>
      <Kicker>Last step before we start</Kicker>
      <h2 className="mt-4 font-serif text-3xl text-ink-950">Ready to begin {sectionLabel}?</h2>
      <p className="mt-3 max-w-xl text-ink-600">
        This assessment runs about {minutes} minutes. Once you start, your camera and screen
        recording begin immediately and the clock starts running.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          onClick={onReady}
          className="rounded-lg border border-ink-900 bg-ink-900 p-6 text-left text-paper-50 transition hover:bg-signal-700"
        >
          <p className="font-serif text-xl">I'm ready</p>
          <p className="mt-2 text-sm text-paper-300/80">
            Start camera & screen recording and begin now.
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

export default function ReadinessGate({ sectionLabel, minutes, onReady, onNotReady, onBack, onHome }) {
  const [step, setStep] = useState(0);
  const [consented, setConsented] = useState(false);
  const [answered, setAnsweredState] = useState({});

  const setAnswered = (id, value) => setAnsweredState((a) => ({ ...a, [id]: value }));

  return (
    <div className="min-h-screen bg-paper-100">
      <ScreenHeader
        onBack={onBack}
        onHome={onHome}
        right={<p className="text-sm text-ink-500">Readiness check · {sectionLabel}</p>}
      />

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
            <LivenessCheckStep
              answered={answered}
              setAnswered={setAnswered}
              onContinue={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <DecisionStep
              sectionLabel={sectionLabel}
              minutes={minutes}
              onReady={onReady}
              onNotReady={onNotReady}
              onBack={() => setStep(1)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
