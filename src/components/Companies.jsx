import { useMemo, useState } from "react";
import { ScreenHeader, PrimaryButton, Kicker, Pill } from "./ui";
import { ROLES, STAGES } from "../data";

const WORK_STYLES = ["Remote", "Hybrid", "In-office"];

function workStyleOf(role) {
  if (role.location.includes("Remote")) return "Remote";
  if (role.location.includes("Hybrid")) return "Hybrid";
  return "In-office";
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        active ? "border-ink-900 bg-ink-900 text-paper-50" : "border-ink-900/15 text-ink-800 hover:border-ink-900/40"
      }`}
    >
      {children}
    </button>
  );
}

function CompanyCard({ role, scoreShared, interested, onExpressInterest }) {
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

      <div className="mt-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-400">Why this one</p>
        <p className="mt-1 text-xs italic text-verified-700">{role.matchReason}</p>
      </div>

      <div className="mt-5 border-t border-ink-900/10 pt-4">
        {!scoreShared ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-400">
            <LockIcon /> Complete your assessments to share your score
          </span>
        ) : interested ? (
          <div className="flex items-center gap-2 rounded-sm bg-verified-600/10 px-3 py-2.5 text-sm text-verified-700">
            <span aria-hidden>✓</span>
            Score shared with {role.company} — they'll review it.
          </div>
        ) : (
          <button
            onClick={() => onExpressInterest(role.id)}
            className="w-full rounded-sm bg-ink-900 px-4 py-2.5 text-sm font-medium text-paper-50 transition hover:bg-signal-700"
          >
            Share your score
          </button>
        )}
      </div>
    </div>
  );
}

export default function Companies({ scoreShared, onGoToDashboard, onBack, onHome }) {
  const [stagesFilter, setStagesFilter] = useState([]);
  const [workStyleFilter, setWorkStyleFilter] = useState(null);
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(999);
  const [interested, setInterested] = useState(new Set());

  const toggleStage = (stage) =>
    setStagesFilter((s) => (s.includes(stage) ? s.filter((x) => x !== stage) : [...s, stage]));

  const filteredRoles = useMemo(
    () =>
      ROLES.filter((r) => {
        if (stagesFilter.length && !stagesFilter.includes(r.stage)) return false;
        if (workStyleFilter && workStyleOf(r) !== workStyleFilter) return false;
        if (r.salaryMax < salaryMin || r.salaryMin > salaryMax) return false;
        return true;
      }),
    [stagesFilter, workStyleFilter, salaryMin, salaryMax]
  );

  const expressInterest = (roleId) => setInterested((prev) => new Set(prev).add(roleId));

  return (
    <div className="min-h-screen bg-paper-100">
      <ScreenHeader
        maxWidth="max-w-5xl"
        onBack={onBack}
        onHome={onHome}
        right={<p className="text-sm text-ink-500">{filteredRoles.length} of {ROLES.length} companies</p>}
      />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-6">
        <Kicker>Matched companies</Kicker>
        <h1 className="mt-4 font-serif text-4xl text-ink-950">Companies for you</h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          Every card explains why it's a fit. Filter to narrow the list, then share your score once
          your assessments are done.
        </p>

        {!scoreShared && (
          <div className="mt-6 flex items-center justify-between rounded-lg border border-signal-600/25 bg-signal-500/8 px-6 py-4">
            <p className="text-sm text-ink-800">
              <span className="font-semibold text-signal-700">Complete your assessments</span> to
              unlock sharing your score with these companies.
            </p>
            <PrimaryButton onClick={onGoToDashboard} className="shrink-0 whitespace-nowrap">
              Go to dashboard <span aria-hidden>→</span>
            </PrimaryButton>
          </div>
        )}

        <div className="mt-8 rounded-lg border border-ink-900/10 bg-paper-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Filters</p>

          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-ink-600">Stage</p>
            <div className="flex flex-wrap gap-2">
              {STAGES.map((stage) => (
                <FilterChip key={stage} active={stagesFilter.includes(stage)} onClick={() => toggleStage(stage)}>
                  {stage}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-ink-600">Work style</p>
            <div className="flex flex-wrap gap-2">
              {WORK_STYLES.map((style) => (
                <FilterChip
                  key={style}
                  active={workStyleFilter === style}
                  onClick={() => setWorkStyleFilter((s) => (s === style ? null : style))}
                >
                  {style}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-end gap-4">
            <div>
              <p className="mb-2 text-xs font-medium text-ink-600">Salary min ($k)</p>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-28 rounded-sm border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus:border-ink-900/40 focus:outline-none"
              />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-ink-600">Salary max ($k)</p>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-28 rounded-sm border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus:border-ink-900/40 focus:outline-none"
              />
            </div>
            {(stagesFilter.length > 0 || workStyleFilter || salaryMin !== 0 || salaryMax !== 999) && (
              <button
                onClick={() => {
                  setStagesFilter([]);
                  setWorkStyleFilter(null);
                  setSalaryMin(0);
                  setSalaryMax(999);
                }}
                className="pb-2 text-xs font-medium text-ink-400 underline decoration-ink-300 underline-offset-2 hover:text-ink-700"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredRoles.map((role) => (
            <CompanyCard
              key={role.id}
              role={role}
              scoreShared={scoreShared}
              interested={interested.has(role.id)}
              onExpressInterest={expressInterest}
            />
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <div className="mt-10 rounded-lg border border-ink-900/10 bg-paper-50 p-10 text-center">
            <p className="font-serif text-xl text-ink-950">No companies match those filters.</p>
            <p className="mt-2 text-sm text-ink-600">Try widening your salary range or clearing a filter.</p>
          </div>
        )}

        {scoreShared && filteredRoles.length > 0 && interested.size === filteredRoles.length && (
          <div className="mt-10 rounded-lg border border-verified-700/25 bg-verified-600/8 p-6 text-center">
            <p className="font-serif text-xl text-ink-950">You've shared your score with every match.</p>
            <p className="mt-2 text-sm text-ink-600">
              Companies typically respond within a few days. We'll notify you here when they do.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
