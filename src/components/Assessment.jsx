import { useEffect, useState } from "react";
import { Logo, PrimaryButton, SecondaryButton, Kicker } from "./ui";
import { BEHAVIORAL_QUESTIONS, PRODUCT_SENSE_QUESTIONS, AI_FLUENCY_QUESTIONS } from "../data";
import { formatElapsed } from "../utils";

const SECTION_QUESTIONS = {
  behavioral: BEHAVIORAL_QUESTIONS,
  "product-sense": PRODUCT_SENSE_QUESTIONS,
  "ai-fluency": AI_FLUENCY_QUESTIONS,
};

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

function VideoAnswerPanel() {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-ink-900/15 bg-ink-950">
      <div className="relative flex aspect-video items-center justify-center bg-ink-900">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="text-ink-600">
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M5 19.5c1.4-3.3 4-5 7-5s5.6 1.7 7 5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-paper-50">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
          Recording your answer
        </span>
      </div>
    </div>
  );
}

function TextAnswerPanel({ value, onChange }) {
  return (
    <textarea
      rows={9}
      value={value}
      onChange={onChange}
      placeholder="Type your response..."
      className="mt-6 w-full rounded-sm border border-ink-900/15 bg-white px-4 py-3 text-sm leading-relaxed text-ink-800 placeholder:text-ink-400 focus:border-ink-900/40 focus:outline-none"
    />
  );
}

function QuestionFlowSection({ sectionLabel, minutes, questions, finishLabel, onFinish, proctored }) {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = questions[qIndex];
  const isLast = qIndex === questions.length - 1;

  const next = () => (isLast ? onFinish() : setQIndex((i) => i + 1));

  return (
    <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-8 sm:p-10">
      <Kicker>
        {sectionLabel} · {minutes} min · question {qIndex + 1} of {questions.length}
      </Kicker>

      <h2 className="mt-4 font-serif text-2xl leading-snug text-ink-950">{question.prompt}</h2>
      <p className="mt-2 text-sm text-ink-500">{question.helper}</p>

      {proctored ? (
        <VideoAnswerPanel />
      ) : (
        <TextAnswerPanel
          value={answers[question.id] || ""}
          onChange={(e) => setAnswers((a) => ({ ...a, [question.id]: e.target.value }))}
        />
      )}

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
        finishLabel="Finish AI Fluency assessment"
        onFinish={onFinish}
        proctored={false}
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

const FINISH_LABELS = {
  behavioral: "Finish Behavioral assessment",
  "product-sense": "Finish Product Sense assessment",
};

export default function Assessment({ section, onComplete }) {
  const proctored = section.id === "behavioral";
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!proctored) return undefined;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [proctored]);

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-7">
        <Logo />
        <div className="flex items-center gap-3">
          {proctored && <RecordingBadge elapsed={elapsed} />}
          <p className="hidden text-sm text-ink-500 sm:block">{section.label} assessment</p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        {section.id === "ai-fluency" ? (
          <AIFluencySection minutes={section.minutes} onFinish={onComplete} />
        ) : (
          <QuestionFlowSection
            sectionLabel={section.label}
            minutes={section.minutes}
            questions={SECTION_QUESTIONS[section.id]}
            finishLabel={FINISH_LABELS[section.id]}
            onFinish={onComplete}
            proctored={proctored}
          />
        )}
      </main>
    </div>
  );
}
