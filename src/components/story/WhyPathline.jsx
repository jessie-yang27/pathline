import StoryShell from "./StoryShell";
import {
  THESIS_QUOTE,
  THESIS_CARDS,
  CONNECTION_STEPS,
  NORTH_STAR,
  NOT_OPTIMIZING,
  COLD_START_STEPS,
} from "../../storyData";

function ThesisCard({ card }) {
  return (
    <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-signal-600">{card.q}</p>
      <p className="mt-3 font-serif text-2xl leading-snug text-ink-950">{card.a}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-500">{card.why}</p>
    </div>
  );
}

function ConnectionFlow() {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max items-stretch gap-2">
        {CONNECTION_STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="flex w-40 flex-col items-center gap-2 rounded-lg border border-ink-900/10 bg-paper-50 px-3 py-5 text-center">
              <span className="text-2xl" aria-hidden>{s.icon}</span>
              <span className="text-xs font-medium leading-snug text-ink-800">{s.label}</span>
            </div>
            {i < CONNECTION_STEPS.length - 1 && (
              <span className="shrink-0 text-lg text-ink-300" aria-hidden>→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CalloutBox({ title, metric, definition, why, accent }) {
  return (
    <div className={`rounded-lg border p-6 ${accent === "signal" ? "border-signal-600/25 bg-signal-500/8" : "border-ink-900/10 bg-paper-100"}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">{title}</p>
      <p className={`mt-2 font-serif text-2xl ${accent === "signal" ? "text-signal-700" : "text-ink-950"}`}>{metric}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-700">{definition}</p>
      <p className="mt-3 text-xs leading-relaxed text-ink-500">
        <span className="font-semibold text-ink-700">Why: </span>
        {why}
      </p>
    </div>
  );
}

export default function WhyPathline({ onNavigate, onBackToProduct }) {
  return (
    <StoryShell
      active="why"
      onNavigate={onNavigate}
      onBackToProduct={onBackToProduct}
      kicker="The Thesis"
      title="Why Pathline?"
      subtitle="One screen, the whole argument. Skim the headers, then read what you want."
    >
      <section className="flex flex-col items-center py-6 text-center">
        <span className="font-serif text-6xl leading-none text-signal-500/40" aria-hidden>“</span>
        <p className="max-w-3xl font-serif text-3xl leading-tight text-ink-950 sm:text-4xl">
          {THESIS_QUOTE}
        </p>
      </section>

      <section className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {THESIS_CARDS.map((card) => (
          <ThesisCard key={card.q} card={card} />
        ))}
      </section>

      <section className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
          The moment of connection
        </p>
        <div className="mt-5">
          <ConnectionFlow />
        </div>
        <p className="mt-4 max-w-2xl text-sm text-ink-500">
          Beats a cold LinkedIn InMail or an Easy Apply into a void — both sides show up already
          knowing there's a reason to talk.
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
        <CalloutBox
          title={NORTH_STAR.title}
          metric={NORTH_STAR.metric}
          definition={NORTH_STAR.definition}
          why={NORTH_STAR.why}
          accent="signal"
        />
        <CalloutBox
          title={NOT_OPTIMIZING.title}
          metric={NOT_OPTIMIZING.metric}
          definition={NOT_OPTIMIZING.definition}
          why={NOT_OPTIMIZING.why}
        />
      </section>

      <section className="mt-16 rounded-lg border border-ink-900/10 bg-paper-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
          Cold-start plan
        </p>
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {COLD_START_STEPS.map((s) => (
            <div key={s.n} className="flex gap-3">
              <span className="font-serif text-xl text-ink-300">{s.n}</span>
              <div>
                <p className="font-medium text-ink-900">{s.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </StoryShell>
  );
}
