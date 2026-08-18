import { useState } from "react";
import { Logo, PrimaryButton, SecondaryButton, Kicker } from "./ui";
import { ASSESSMENT_SECTIONS, PRODUCT_SENSE_QUESTIONS } from "../data";

const PHASE = { BEHAVIORAL: 0, PRODUCT_SENSE: 1, AI_FLUENCY: 2 };

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

function MockCompletedSection({ section, onContinue, buttonLabel }) {
  const skillsBySection = {
    behavioral: [
      "Ownership under ambiguous scope",
      "Conflict navigation with cross-functional peers",
      "Prioritization when everything feels urgent",
    ],
    "ai-fluency": [
      "Evaluating AI-native product surfaces",
      "Recognizing failure modes in model-driven flows",
      "Judgment on when AI is (and isn't) the right tool",
    ],
  };

  return (
    <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-8 sm:p-10">
      <Kicker>{section.label} · {section.minutes} min</Kicker>
      <h2 className="mt-4 font-serif text-3xl text-ink-950">{section.label} section</h2>
      <p className="mt-2 max-w-xl text-ink-600">{section.description}</p>

      <div className="mt-8 rounded-sm border border-ink-900/10 bg-paper-100 p-6">
        <p className="text-xs uppercase tracking-[0.14em] text-ink-500">This section evaluates</p>
        <ul className="mt-3 space-y-2">
          {(skillsBySection[section.id] || []).map((skill) => (
            <li key={skill} className="flex items-start gap-2 text-sm text-ink-700">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
              {skill}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-400">
          Prototype note: this section is represented as complete for demo purposes. In the full
          product, this is a real structured interview flow — see Product Sense for a live example.
        </p>
      </div>

      <div className="mt-8 flex justify-end border-t border-ink-900/10 pt-6">
        <PrimaryButton onClick={onContinue}>
          {buttonLabel} <span aria-hidden>→</span>
        </PrimaryButton>
      </div>
    </div>
  );
}

function ProductSenseSection({ onFinish }) {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = PRODUCT_SENSE_QUESTIONS[qIndex];
  const isLast = qIndex === PRODUCT_SENSE_QUESTIONS.length - 1;
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
        <Kicker>Product Sense · question {qIndex + 1} of {PRODUCT_SENSE_QUESTIONS.length}</Kicker>
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
          {isLast ? "Submit Product Sense section" : "Next question"} <span aria-hidden>→</span>
        </PrimaryButton>
      </div>
    </div>
  );
}

export default function Assessment({ onComplete }) {
  const [phase, setPhase] = useState(PHASE.BEHAVIORAL);
  const [completed, setCompleted] = useState([]);

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
        <p className="text-sm text-ink-500">Assessment in progress</p>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <SectionStepper activePhase={phase} completed={completed} />

        {phase === PHASE.BEHAVIORAL && (
          <MockCompletedSection
            section={ASSESSMENT_SECTIONS[0]}
            buttonLabel="Continue to Product Sense"
            onContinue={() => advance(PHASE.BEHAVIORAL)}
          />
        )}
        {phase === PHASE.PRODUCT_SENSE && (
          <ProductSenseSection onFinish={() => advance(PHASE.PRODUCT_SENSE)} />
        )}
        {phase === PHASE.AI_FLUENCY && (
          <MockCompletedSection
            section={ASSESSMENT_SECTIONS[2]}
            buttonLabel="Finish assessment"
            onContinue={() => advance(PHASE.AI_FLUENCY)}
          />
        )}
      </main>
    </div>
  );
}
