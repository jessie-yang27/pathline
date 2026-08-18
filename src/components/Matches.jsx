import { useState } from "react";
import { Logo, Kicker, Pill } from "./ui";
import { ROLES, SCORE } from "../data";
import { ordinal } from "../utils";

function MatchCard({ role, interested, onExpressInterest }) {
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

      <p className="mt-3 text-xs italic text-verified-700">{role.matchReason}</p>

      <div className="mt-5 border-t border-ink-900/10 pt-4">
        {interested ? (
          <div className="flex items-center gap-2 rounded-sm bg-verified-600/10 px-3 py-2.5 text-sm text-verified-700">
            <span aria-hidden>✓</span>
            Interest sent to {role.company} — they'll review your score.
          </div>
        ) : (
          <button
            onClick={() => onExpressInterest(role.id)}
            className="w-full rounded-sm bg-ink-900 px-4 py-2.5 text-sm font-medium text-paper-50 transition hover:bg-signal-700"
          >
            Express interest
          </button>
        )}
      </div>
    </div>
  );
}

export default function Matches({ onBackToLanding }) {
  const [interested, setInterested] = useState(new Set());

  const expressInterest = (roleId) => {
    setInterested((prev) => new Set(prev).add(roleId));
  };

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-7">
        <Logo />
        <div className="flex items-center gap-2 text-sm text-ink-600">
          <span>Your score:</span>
          <span className="font-semibold text-signal-600">
            {SCORE.overallPercentile}{ordinal(SCORE.overallPercentile)} percentile
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-6">
        <Kicker>Unlocked</Kicker>
        <h1 className="mt-4 font-serif text-4xl text-ink-950">Your matched roles</h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          Your assessment score is attached to every application. Express interest and the
          company reviews your Pathline profile directly — no resume required.
        </p>

        {interested.size > 0 && (
          <p className="mt-4 text-sm text-ink-500">
            {interested.size} of {ROLES.length} companies notified.
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {ROLES.map((role) => (
            <MatchCard
              key={role.id}
              role={role}
              interested={interested.has(role.id)}
              onExpressInterest={expressInterest}
            />
          ))}
        </div>

        {interested.size === ROLES.length && (
          <div className="mt-10 rounded-lg border border-verified-700/25 bg-verified-600/8 p-6 text-center">
            <p className="font-serif text-xl text-ink-950">You've expressed interest in every match.</p>
            <p className="mt-2 text-sm text-ink-600">
              Companies typically respond within a few days. We'll notify you here when they do.
            </p>
            <button
              onClick={onBackToLanding}
              className="mt-5 text-sm font-medium text-signal-600 underline decoration-signal-600/40 underline-offset-2 hover:text-signal-700"
            >
              Back to start
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
