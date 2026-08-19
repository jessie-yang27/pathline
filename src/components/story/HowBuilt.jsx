import StoryShell from "./StoryShell";
import { BUILD_TIMELINE, TOOLKIT, BEST_PROMPT } from "../../storyData";

function ToolBadge({ tool }) {
  return (
    <span className="rounded-full border border-ink-900/15 bg-paper-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-600">
      {tool}
    </span>
  );
}

function TimelineStep({ step }) {
  const featured = Boolean(step.featured);
  return (
    <div className="relative pl-12">
      <div
        className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm ${
          featured ? "border-signal-600 bg-signal-500 text-ink-950" : "border-ink-900/15 bg-paper-100"
        }`}
        aria-hidden
      >
        {step.icon}
      </div>

      <div
        className={`rounded-lg border ${
          featured ? "border-signal-600 bg-signal-500/8 p-8" : "border-ink-900/10 bg-paper-50 p-6"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-ink-400">Step {step.n}</span>
          {step.tools.map((t) => (
            <ToolBadge key={t} tool={t} />
          ))}
        </div>

        <p className={`mt-2 font-serif text-ink-950 ${featured ? "text-3xl" : "text-xl"}`}>{step.label}</p>

        {step.quote && (
          <blockquote className="mt-3 border-l-2 border-signal-600/50 pl-4 text-sm italic leading-relaxed text-ink-700">
            "{step.quote}"
          </blockquote>
        )}

        <p className="mt-3 text-sm leading-relaxed text-ink-600">{step.body}</p>
      </div>
    </div>
  );
}

export default function HowBuilt({ onNavigate, onBackToProduct }) {
  return (
    <StoryShell
      active="built"
      onNavigate={onNavigate}
      onBackToProduct={onBackToProduct}
      kicker="The Process"
      title="How We Built This"
      subtitle="The honest version, told as a timeline — where AI helped, and where it deliberately didn't."
    >
      <div className="relative">
        <div className="absolute bottom-2 left-4 top-2 w-px bg-ink-900/10" aria-hidden />
        <div className="space-y-6">
          {BUILD_TIMELINE.map((step) => (
            <TimelineStep key={step.n} step={step} />
          ))}
        </div>
      </div>

      <section className="mt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Toolkit</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {TOOLKIT.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-3 rounded-full border border-ink-900/10 bg-paper-50 px-4 py-2.5"
            >
              <span className="text-xl" aria-hidden>{t.icon}</span>
              <div>
                <p className="text-sm font-medium text-ink-900">{t.name}</p>
                <p className="text-xs text-ink-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-lg border border-ink-900/10 bg-ink-950 p-8 text-paper-50">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal-500">
          Best prompt of the project
        </p>
        <p className="mt-4 font-serif text-2xl leading-snug">"{BEST_PROMPT.text}"</p>
        <p className="mt-4 text-sm text-paper-300/70">{BEST_PROMPT.caption}</p>
      </section>
    </StoryShell>
  );
}
