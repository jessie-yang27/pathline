import StoryShell from "./StoryShell";
import PositioningGraph from "./PositioningGraph";
import { BETTER_HERO, BETTER_DESCRIPTION, COMPETITORS, PATHLINE_ROW, THE_PATTERN } from "../../storyData";

const BADGE_STYLES = {
  WEAK: "border-red-900/15 bg-red-950/5 text-red-800",
  MEDIUM: "border-signal-600/25 bg-signal-500/10 text-signal-700",
  STRONG: "border-verified-700/25 bg-verified-600/10 text-verified-700",
};

function StrengthBadge({ level, note }) {
  return (
    <div>
      <span
        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${BADGE_STYLES[level]}`}
      >
        {level}
      </span>
      <p className="mt-1.5 text-xs leading-snug text-ink-500">{note}</p>
    </div>
  );
}

function CompetitorRow({ row, highlighted }) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 rounded-lg border p-5 sm:grid-cols-[180px_1fr_1fr] sm:items-start ${
        highlighted
          ? "border-signal-600 bg-signal-500/8 shadow-[0_1px_0_rgba(181,114,43,0.08)]"
          : "border-ink-900/10 bg-paper-50"
      }`}
    >
      <p className={`font-serif text-lg ${highlighted ? "text-signal-700" : "text-ink-950"}`}>{row.name}</p>
      <StrengthBadge level={row.candidate.level} note={row.candidate.note} />
      <StrengthBadge level={row.recruiter.level} note={row.recruiter.note} />
    </div>
  );
}

export default function WhyBetter({ onNavigate, onBackToProduct }) {
  return (
    <StoryShell
      active="better"
      onNavigate={onNavigate}
      onBackToProduct={onBackToProduct}
      kicker="The Competition"
      title={BETTER_HERO}
      subtitle={BETTER_DESCRIPTION}
    >
      <section className="rounded-lg border border-ink-900/10 bg-paper-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal-600">The pattern</p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-700">{THE_PATTERN}</p>
      </section>

      <section className="mt-10">
        <div className="hidden gap-4 px-5 sm:grid sm:grid-cols-[180px_1fr_1fr]">
          <span />
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Candidate experience</p>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Recruiter experience</p>
        </div>

        <div className="mt-3 space-y-3">
          <CompetitorRow row={PATHLINE_ROW} highlighted />
          {COMPETITORS.map((row) => (
            <CompetitorRow key={row.name} row={row} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
          Same comparison, plotted
        </p>
        <PositioningGraph />
      </section>
    </StoryShell>
  );
}
