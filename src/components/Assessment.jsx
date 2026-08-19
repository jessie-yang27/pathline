import { useEffect, useState } from "react";
import { Logo, PrimaryButton, SecondaryButton, Kicker } from "./ui";
import {
  ASSESSMENT_SECTIONS,
  BEHAVIORAL_QUESTIONS,
  PRODUCT_SENSE_QUESTIONS,
  AI_FLUENCY_QUESTIONS,
} from "../data";

const PHASE = { BEHAVIORAL: 0, PRODUCT_SENSE: 1, AI_FLUENCY: 2 };

function formatElapsed(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function RecordingBadge({ elapsed }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-900/15 bg-red-950/5 px-3 py-1 text-xs font-medium text-red-800">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
      </span>
      Recording · {formatElapsed(elapsed)}
    </span>
  );
}

function CameraPreview({ elapsed }) {
  return (
    <div className="fixed bottom-5 right-5 z-40 w-40 overflow-hidden rounded-lg border border-ink-900/20 bg-ink-950 shadow-lg">
      <div className="flex aspect-video items-center justify-center bg-ink-800">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-ink-500">
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 19.5c1.4-3.3 4-5 7-5s5.6 1.7 7 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex items-center justify-between px-2.5 py-1.5">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-paper-100">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
          REC
        </span>
        <span className="font-mono text-[11px] text-paper-300/70">{formatElapsed(elapsed)}</span>
      </div>
    </div>
  );
}

function SectionStepper({ activePhase, completed }) {
  return (
    <div className="mb-10 flex items-center">
      {ASSESSMENT_SECTIONS.map((s, i) => (
        <div key={s.id} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  completed.includes(i)
                    ? "bg-verified-600 text-paper-50"
                    : i === activePhase
                      ? "bg-ink-900 text-paper-50"
                      : "bg-ink-900/10 text-ink-500"
                }`}
              >
                {completed.includes(i) ? "✓" : i + 1}
              </span>
              <span className={`text-sm font-medium ${i === activePhase ? "text-ink-950" : "text-ink-500"}`}>
                {s.label}
              </span>
            </div>
          </div>
          {i < ASSESSMENT_SECTIONS.length - 1 && (
            <div className={`mx-3 h-px flex-1 ${completed.includes(i) ? "bg-verified-600/50" : "bg-ink-900/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function QuestionFlowSection({ sectionLabel, minutes, questions, finishLabel, onFinish }) {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = questions[qIndex];
  const isLast = qIndex === questions.length - 1;
  const wordCount = (answers[question.id] || "").trim().split(/\s+/).filter(Boolean).length;

  const next = () => {
    if (isLast) {
      onFinish();
    } else {
      setQIndex((i) => i + 1);
    }
  };

  return (
    <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-8 sm:p-10">
      <div className="flex items-center justify-between">
        <Kicker>
          {sectionLabel} · {minutes} min · question {qIndex + 1} of {questions.length}
        </Kicker>
        <span className="text-xs text-ink-400">{wordCount} words</span>
      </div>

      <h2 className="mt-4 font-serif text-2xl leading-snug text-ink-950">{question.prompt}</h2>
      <p className="mt-2 text-sm text-ink-500">{question.helper}</p>

      <textarea
        rows={9}
        value={answers[question.id] || ""}
        onChange={(e) => setAnswers((a) => ({ ...a, [question.id]: e.target.value }))}
        placeholder="Type your response..."
        className="mt-6 w-full rounded-sm border border-ink-900/15 bg-white px-4 py-3 text-sm leading-relaxed text-ink-800 placeholder:text-ink-400 focus:border-ink-900/40 focus:outline-none"
      />

      <div className="mt-6 flex items-center justify-between border-t border-ink-900/10 pt-6">
        <SecondaryButton onClick={() => setQIndex((i) => Math.max(0, i - 1))} disabled={qIndex === 0}>
          Back
        </SecondaryButton>
        <PrimaryButton onClick={next}>
          {isLast ? finishLabel : "Next question"} <span aria-hidden>→</span>
        </PrimaryButton>
      </div>
    </div>
  );
}

function GithubMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink-700">
      <path
        d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.6-.2.6-.43v-1.68c-2.5.55-3.03-1.07-3.03-1.07-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.38 2.1.98 2.6.75.08-.58.32-.98.57-1.21-2-.23-4.1-1-4.1-4.44 0-.98.35-1.78.92-2.4-.09-.23-.4-1.15.09-2.4 0 0 .75-.24 2.46.92a8.4 8.4 0 0 1 4.48 0c1.7-1.16 2.45-.92 2.45-.92.5 1.25.18 2.17.09 2.4.58.62.92 1.42.92 2.4 0 3.45-2.1 4.2-4.11 4.43.33.29.62.85.62 1.71v2.53c0 .24.15.52.61.43A9 9 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AIFluencySection({ minutes, onFinish }) {
  const [connected, setConnected] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  if (showQuestions) {
    return (
      <QuestionFlowSection
        sectionLabel="AI Fluency"
        minutes={minutes}
        questions={AI_FLUENCY_QUESTIONS}
        finishLabel="Finish assessment"
        onFinish={onFinish}
      />
    );
  }

  return (
    <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-8 sm:p-10">
      <Kicker>AI Fluency · {minutes} min</Kicker>
      <h2 className="mt-4 font-serif text-3xl text-ink-950">Connect your GitHub</h2>
      <p className="mt-2 max-w-xl text-ink-600">
        This section looks at how you actually build with AI. Connecting GitHub grounds the
        questions ahead in real work — this is a prototype, so no real account access happens here.
      </p>

      <div className="mt-8 flex items-center justify-between rounded-sm border border-ink-900/10 bg-paper-100 p-5">
        <div className="flex items-center gap-3">
          <GithubMark />
          <div>
            <p className="font-medium text-ink-900">GitHub</p>
            <p className="text-sm text-ink-600">
              {connected ? "Connected as @jordan-alvarez" : "Not connected yet"}
            </p>
          </div>
        </div>
        {connected ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-verified-600/10 px-3 py-1.5 text-sm font-medium text-verified-700">
            <span aria-hidden>✓</span> Connected
          </span>
        ) : (
          <button
            onClick={() => setConnected(true)}
            className="shrink-0 rounded-sm bg-ink-900 px-4 py-2 text-sm font-medium text-paper-50 transition hover:bg-signal-700"
          >
            Connect GitHub
          </button>
        )}
      </div>

      <div className="mt-8 flex justify-end border-t border-ink-900/10 pt-6">
        <PrimaryButton onClick={() => setShowQuestions(true)} disabled={!connected}>
          Continue to questions <span aria-hidden>→</span>
        </PrimaryButton>
      </div>
    </div>
  );
}

export default function Assessment({ onComplete }) {
  const [phase, setPhase] = useState(PHASE.BEHAVIORAL);
  const [completed, setCompleted] = useState([]);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const advance = (fromPhase) => {
    setCompleted((c) => (c.includes(fromPhase) ? c : [...c, fromPhase]));
    if (fromPhase === PHASE.AI_FLUENCY) {
      onComplete();
    } else {
      setPhase(fromPhase + 1);
    }
  };

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-7">
        <Logo />
        <div className="flex items-center gap-3">
          <RecordingBadge elapsed={elapsed} />
          <p className="hidden text-sm text-ink-500 sm:block">Assessment in progress</p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <SectionStepper activePhase={phase} completed={completed} />

        {phase === PHASE.BEHAVIORAL && (
          <QuestionFlowSection
            sectionLabel="Behavioral"
            minutes={ASSESSMENT_SECTIONS[0].minutes}
            questions={BEHAVIORAL_QUESTIONS}
            finishLabel="Continue to Product Sense"
            onFinish={() => advance(PHASE.BEHAVIORAL)}
          />
        )}
        {phase === PHASE.PRODUCT_SENSE && (
          <QuestionFlowSection
            sectionLabel="Product Sense"
            minutes={ASSESSMENT_SECTIONS[1].minutes}
            questions={PRODUCT_SENSE_QUESTIONS}
            finishLabel="Continue to AI Fluency"
            onFinish={() => advance(PHASE.PRODUCT_SENSE)}
          />
        )}
        {phase === PHASE.AI_FLUENCY && (
          <AIFluencySection minutes={ASSESSMENT_SECTIONS[2].minutes} onFinish={() => advance(PHASE.AI_FLUENCY)} />
        )}
      </main>

      <CameraPreview elapsed={elapsed} />
    </div>
  );
}
