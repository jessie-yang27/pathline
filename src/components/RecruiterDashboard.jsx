import { useMemo } from "react";
import { Logo, Kicker, Pill } from "./ui";
import { CANDIDATES, RECRUITER_ROLE, ASSESSMENT_SECTIONS } from "../data";

const DIMENSIONS = ASSESSMENT_SECTIONS.map((s) => ({ id: s.id, label: s.label }));

function weightedScore(candidate, weights) {
  const total = weights.behavioral + weights["product-sense"] + weights["ai-fluency"];
  if (total === 0) return 0;
  const raw =
    candidate.scores.behavioral * weights.behavioral +
    candidate.scores["product-sense"] * weights["product-sense"] +
    candidate.scores["ai-fluency"] * weights["ai-fluency"];
  return raw / total;
}

function RubricPanel({ weights, setWeight }) {
  const total = weights.behavioral + weights["product-sense"] + weights["ai-fluency"] || 1;

  return (
    <div className="rounded-lg border border-signal-600/25 bg-signal-500/8 p-6">
      <Kicker>Customize the rubric</Kicker>
      <p className="mt-3 text-sm text-ink-600">
        Reweight how much each dimension counts toward the ranking below. The list re-sorts live.
      </p>
      <div className="mt-5 space-y-5">
        {DIMENSIONS.map((dim) => {
          const pct = Math.round((weights[dim.id] / total) * 100);
          return (
            <div key={dim.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink-900">{dim.label}</span>
                <span className="text-ink-500">{pct}% of weight</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={weights[dim.id]}
                onChange={(e) => setWeight(dim.id, Number(e.target.value))}
                className="mt-2 w-full accent-signal-600"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScoreBars({ scores }) {
  return (
    <div className="flex items-center gap-3">
      {DIMENSIONS.map((dim) => (
        <div key={dim.id} className="flex items-center gap-1.5" title={`${dim.label}: ${scores[dim.id]}`}>
          <span className="text-[10px] uppercase tracking-wide text-ink-400">{dim.label[0]}</span>
          <div className="h-1.5 w-10 overflow-hidden rounded-full bg-ink-900/8">
            <div className="h-full rounded-full bg-verified-600" style={{ width: `${scores[dim.id]}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RecruiterDashboard({ weights, setWeight, onSelectCandidate }) {
  const ranked = useMemo(
    () =>
      [...CANDIDATES]
        .map((c) => ({ ...c, weighted: weightedScore(c, weights) }))
        .sort((a, b) => b.weighted - a.weighted),
    [weights]
  );

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-7">
        <Logo />
        <Pill className="border-signal-600/30 bg-signal-500/10 text-signal-700">Bonus: Recruiter view</Pill>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-6">
        <Kicker>{RECRUITER_ROLE.applicants} candidates</Kicker>
        <h1 className="mt-4 font-serif text-4xl text-ink-950">{RECRUITER_ROLE.title}</h1>
        <p className="mt-2 text-ink-600">
          {RECRUITER_ROLE.company} · {RECRUITER_ROLE.stage}
        </p>

        <div className="mt-8">
          <RubricPanel weights={weights} setWeight={setWeight} />
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-ink-900/10 bg-paper-50">
          <div className="flex items-center gap-4 border-b border-ink-900/10 px-6 py-3 text-xs uppercase tracking-[0.1em] text-ink-500">
            <span className="w-8">Rank</span>
            <span className="flex-1">Candidate</span>
            <span className="hidden sm:block">Breakdown</span>
            <span className="w-20 text-right">Score</span>
          </div>
          {ranked.map((c, i) => (
            <button
              key={c.id}
              onClick={() => onSelectCandidate(c.id)}
              className="flex w-full items-center gap-4 border-b border-ink-900/10 px-6 py-4 text-left transition last:border-b-0 hover:bg-paper-100"
            >
              <span className="w-8 font-serif text-lg text-ink-400">{i + 1}</span>
              <span className="flex flex-1 items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif text-sm text-paper-50 ${c.color}`}
                >
                  {c.initial}
                </span>
                <span className="font-medium text-ink-900">{c.name}</span>
              </span>
              <span className="hidden sm:block">
                <ScoreBars scores={c.scores} />
              </span>
              <span className="w-20 text-right font-serif text-xl text-ink-950">
                {Math.round(c.weighted)}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
