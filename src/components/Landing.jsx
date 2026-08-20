import { Logo, PrimaryButton, Kicker } from "./ui";
import MatchGraph from "./MatchGraph";
import { ASSESSMENT_SECTIONS, BUILT_WITH_COMPANIES, TESTIMONIALS } from "../data";

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen bg-paper-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <Logo />
        <nav className="flex items-center gap-8 text-sm text-ink-600">
          <span className="hidden sm:inline">For candidates</span>
          <span className="hidden text-ink-400 sm:inline">For companies</span>
          <button
            onClick={onStart}
            className="rounded-sm border border-ink-900/20 px-4 py-2 text-sm font-medium text-ink-900 transition hover:border-ink-900/60"
          >
            Start assessment
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:pt-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Kicker>Skills-first hiring for product managers</Kicker>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-ink-950 sm:text-6xl">
              Your resume was never
              <br />
              the signal.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
              Pathline replaces the resume with a single standardized assessment —
              behavioral, product sense, and AI fluency. Take it once, get scored, and
              let startups evaluate you on evidence instead of a bullet-pointed history.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <PrimaryButton onClick={onStart} className="px-7 py-3.5 text-base">
                Start free assessment
                <span aria-hidden>→</span>
              </PrimaryButton>
              <p className="text-sm text-ink-500">
                {ASSESSMENT_SECTIONS.map((s) => s.minutes).join(" + ")} min. Three assessments, done
                independently.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-ink-900/10 pt-8">
              <div>
                <p className="font-serif text-3xl text-ink-950">1</p>
                <p className="mt-1 text-sm text-ink-500">score, not a<br />pile of applications</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-ink-950">100%</p>
                <p className="mt-1 text-sm text-ink-500">of your score visible<br />to you and companies</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-ink-950">0</p>
                <p className="mt-1 text-sm text-ink-500">resumes, cover letters,<br />or easy-apply spam</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 hidden rounded-lg bg-gradient-to-br from-signal-500/10 to-verified-600/10 lg:block" />
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
              The Pathline Assessment
            </p>
            <p className="mb-4 text-sm leading-relaxed text-ink-600">
              One sitting, three parts — Behavioral, Product Sense, and AI Fluency — scored the
              moment you finish and shown to companies exactly as you see it below.
            </p>
            <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-7 shadow-[0_1px_0_rgba(20,20,15,0.04)]">
              <div className="flex items-center justify-between border-b border-ink-900/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-500">Candidate score</p>
                  <p className="mt-1 font-serif text-xl text-ink-950">Jordan Alvarez</p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-4xl text-signal-600">82<span className="text-lg text-ink-400">nd</span></p>
                  <p className="text-xs text-ink-500">percentile</p>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                {[
                  { label: "Behavioral", value: 78 },
                  { label: "Product Sense", value: 88 },
                  { label: "AI Fluency", value: 80 },
                ].map((d) => (
                  <div key={d.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-700">{d.label}</span>
                      <span className="font-medium text-ink-900">{d.value}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/8">
                      <div
                        className="h-full rounded-full bg-verified-600"
                        style={{ width: `${d.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-sm bg-verified-600/8 px-3 py-2.5 text-xs leading-relaxed text-verified-700">
                This score is fully transparent — companies see exactly what you see.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-20 border-t border-ink-900/10 pt-10">
          <p className="text-center text-xs uppercase tracking-[0.14em] text-ink-400">
            The assessment was built with PMs from
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {BUILT_WITH_COMPANIES.map((c) => (
              <span key={c} className="font-serif text-lg text-ink-400 sm:text-xl">
                {c}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-28 border-t border-ink-900/10 pt-16">
          <Kicker>How the assessment gets you matched</Kicker>
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <h2 className="font-serif text-3xl text-ink-950">
                Take the assessment. Uplevel your skills. Get matched.
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-ink-600">
                Every assessment scores you across the same dimensions companies are actually
                hiring for. The more your skills line up with what recruiters want, the more
                precisely you get matched — and the feedback after each section shows you
                exactly where to close the gap.
              </p>
            </div>
            <MatchGraph />
          </div>
        </section>

        <section className="mt-28 border-t border-ink-900/10 pt-16">
          <Kicker>What candidates are saying</Kicker>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-lg border border-ink-900/10 bg-paper-50 p-6">
                <p className="font-serif text-lg leading-snug text-ink-950">"{t.quote}"</p>
                <p className="mt-4 text-sm font-medium text-ink-900">{t.name}</p>
                <p className="text-xs text-ink-500">{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-28 border-t border-ink-900/10 pt-16">
          <Kicker>Why not just use LinkedIn or a recruiter</Kicker>
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <p className="font-serif text-lg text-ink-950">Resume boards optimize for volume</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Easy-apply turns hiring into a numbers game. Recruiters skim keywords,
                not judgment — the thing that actually determines whether a PM is good.
              </p>
            </div>
            <div>
              <p className="font-serif text-lg text-ink-950">Recruiters don't scale</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Human-matched marketplaces are high quality but bottlenecked by headcount.
                Great candidates and great roles still go unmatched.
              </p>
            </div>
            <div>
              <p className="font-serif text-lg text-ink-950">Pathline scores the work, not the resume</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                One standardized assessment becomes your unit of signal — take it once,
                get ranked on evidence, and let companies come to you.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-900/10 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs text-ink-400">
          <Logo className="opacity-70 [&_span]:text-sm" />
          <span>Prototype — candidate experience only</span>
        </div>
      </footer>
    </div>
  );
}
