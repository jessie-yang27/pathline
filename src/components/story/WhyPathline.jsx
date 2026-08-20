import { useEffect, useRef, useState } from "react";
import StoryShell from "./StoryShell";
import SkillStepGraph from "./SkillStepGraph";
import { SecondaryButton } from "../ui";
import {
  THESIS_QUOTE,
  KEY_PROBLEM,
  PROBLEM_STATS,
  CORE_ISSUE,
  SOLUTION_LABEL,
  THESIS_CARDS,
  CONNECTION_STEPS,
  NORTH_STAR,
  NOT_OPTIMIZING,
  COLD_START_STEPS,
  COLD_START_CAPTION,
} from "../../storyData";

const SLIDES = [
  { id: "belief", label: "Our belief" },
  { id: "problem", label: "Key problem" },
  { id: "metrics", label: "North star" },
  { id: "solution", label: "The solution" },
  { id: "connection", label: "Moment of connection" },
  { id: "coldstart", label: "Cold start" },
];

const FLOATING_RESUMES = [
  { top: "8%", left: "6%", size: 30, anim: "animate-float-a", delay: "0s" },
  { top: "18%", left: "88%", size: 24, anim: "animate-float-b", delay: "1.2s" },
  { top: "62%", left: "4%", size: 26, anim: "animate-float-c", delay: "2.4s" },
  { top: "78%", left: "92%", size: 32, anim: "animate-float-a", delay: "0.6s" },
  { top: "4%", left: "45%", size: 22, anim: "animate-float-b", delay: "3s" },
  { top: "88%", left: "40%", size: 24, anim: "animate-float-c", delay: "1.8s" },
  { top: "35%", left: "94%", size: 20, anim: "animate-float-a", delay: "2.1s" },
  { top: "45%", left: "1%", size: 28, anim: "animate-float-b", delay: "0.3s" },
  { top: "12%", left: "70%", size: 20, anim: "animate-float-c", delay: "3.6s" },
  { top: "68%", left: "60%", size: 22, anim: "animate-float-a", delay: "4.2s" },
];

function ResumeIcon({ style, className }) {
  return (
    <svg viewBox="0 0 24 30" style={style} className={className} aria-hidden>
      <rect x="1" y="1" width="22" height="28" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <line x1="5" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.3" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.3" />
      <line x1="5" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function DownArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Slide({ id, nextId, children, className = "" }) {
  return (
    <section
      id={id}
      data-slide={id}
      className={`relative mx-auto flex min-h-screen w-full max-w-5xl scroll-mt-6 flex-col items-center justify-center px-4 py-24 [scroll-snap-align:start] ${className}`}
    >
      {children}
      {nextId && (
        <button
          onClick={() => document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Next section"
          className="absolute bottom-8 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-ink-900/15 bg-paper-50 text-ink-500 transition hover:border-ink-900/40 hover:text-ink-900"
        >
          <DownArrowIcon />
        </button>
      )}
    </section>
  );
}

function SlideNav({ active }) {
  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
      {SLIDES.map((s) => (
        <button
          key={s.id}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
          className="group flex items-center gap-2"
          aria-label={s.label}
        >
          <span
            className={`whitespace-nowrap text-[11px] font-medium opacity-0 transition group-hover:opacity-100 ${
              active === s.id ? "text-ink-900" : "text-ink-500"
            }`}
          >
            {s.label}
          </span>
          <span
            className={`h-1.5 rounded-full transition-all ${
              active === s.id ? "w-6 bg-signal-600" : "w-1.5 bg-ink-900/20 group-hover:bg-ink-900/40"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function UrgencyImpactMatrix() {
  return (
    <div className="mt-6 rounded-lg border border-ink-900/10 bg-paper-100 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">Urgency × impact</p>
      <div className="mt-4 grid grid-cols-[56px_1fr_1fr] gap-1.5">
        <div />
        <div className="pb-1 text-center text-[10px] uppercase tracking-wide text-ink-400">Low impact</div>
        <div className="pb-1 text-center text-[10px] uppercase tracking-wide text-ink-400">High impact</div>

        <div className="flex items-center justify-end pr-1 text-right text-[10px] uppercase leading-tight tracking-wide text-ink-400">
          High
          <br />
          urgency
        </div>
        <div className="h-20 rounded-sm border border-ink-900/10 bg-paper-50" />
        <div className="flex h-20 items-center justify-center rounded-sm border border-signal-600/30 bg-signal-500/10">
          <span className="rounded-full bg-ink-900 px-3 py-1 text-[11px] font-semibold text-paper-50">
            Candidates
          </span>
        </div>

        <div className="flex items-center justify-end pr-1 text-right text-[10px] uppercase leading-tight tracking-wide text-ink-400">
          Low
          <br />
          urgency
        </div>
        <div className="h-20 rounded-sm border border-ink-900/10 bg-paper-50" />
        <div className="flex h-20 items-center justify-center rounded-sm border border-verified-700/25 bg-verified-600/10">
          <span className="rounded-full border border-ink-900/20 px-3 py-1 text-[11px] font-semibold text-ink-800">
            Recruiters
          </span>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-500">
        Recruiters have a large pool to draw from, so any one hire is lower urgency. Candidates
        don't — that's the wedge.
      </p>
    </div>
  );
}

function ThesisCarousel() {
  const [index, setIndex] = useState(0);
  const card = THESIS_CARDS[index];
  const whyLines = Array.isArray(card.why) ? card.why : [card.why];
  const isLast = index === THESIS_CARDS.length - 1;

  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-[240px_1fr] md:items-center md:gap-12">
      <div className="flex gap-1.5 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
        {THESIS_CARDS.map((c, i) => (
          <button
            key={c.q}
            onClick={() => setIndex(i)}
            className={`shrink-0 rounded-sm px-4 py-3 text-left transition ${
              i === index ? "bg-ink-900 text-paper-50" : "text-ink-500 hover:bg-paper-50"
            }`}
          >
            <span className="block text-[10px] uppercase tracking-wide opacity-60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="block whitespace-nowrap text-sm font-medium md:whitespace-normal">{c.q}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[22rem] rounded-lg border border-ink-900/10 bg-paper-50 p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-signal-600">{card.q}</p>
        <p className="mt-4 font-serif text-3xl leading-snug text-ink-950 sm:text-4xl">{card.a}</p>
        {whyLines.map((line, i) => (
          <p key={i} className="mt-4 max-w-xl text-base leading-relaxed text-ink-600">
            {line}
          </p>
        ))}
        {card.visual === "urgencyImpact" && <UrgencyImpactMatrix />}

        <div className="mt-10 flex items-center justify-between border-t border-ink-900/10 pt-6">
          <SecondaryButton
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="px-4 py-2 text-xs"
          >
            ← Prev
          </SecondaryButton>
          <span className="text-xs text-ink-400">
            {index + 1} / {THESIS_CARDS.length}
          </span>
          <SecondaryButton
            onClick={() => setIndex((i) => Math.min(THESIS_CARDS.length - 1, i + 1))}
            disabled={isLast}
            className="px-4 py-2 text-xs"
          >
            Next →
          </SecondaryButton>
        </div>
      </div>
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
  const [activeSlide, setActiveSlide] = useState(SLIDES[0].id);
  const observerRef = useRef(null);

  useEffect(() => {
    const previous = document.documentElement.style.scrollSnapType;
    document.documentElement.style.scrollSnapType = "y proximity";
    return () => {
      document.documentElement.style.scrollSnapType = previous;
    };
  }, []);

  useEffect(() => {
    const sections = SLIDES.map((s) => document.getElementById(s.id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSlide(visible.target.id);
      },
      { threshold: [0.35, 0.5, 0.65] }
    );
    sections.forEach((s) => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <StoryShell
      active="why"
      onNavigate={onNavigate}
      onBackToProduct={onBackToProduct}
      kicker="The Thesis"
      title="Why Pathline?"
      subtitle="Scroll through, one idea per screen."
    >
      <SlideNav active={activeSlide} />

      <Slide id="belief" nextId="problem" className="text-center">
        <span className="font-serif text-7xl leading-none text-signal-500/40" aria-hidden>“</span>
        <p className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-ink-950 sm:text-5xl">
          {THESIS_QUOTE}
        </p>
      </Slide>

      <Slide id="problem" nextId="metrics" className="relative max-w-6xl overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          {FLOATING_RESUMES.map((r, i) => (
            <ResumeIcon
              key={i}
              style={{ top: r.top, left: r.left, width: r.size, animationDelay: r.delay }}
              className={`absolute text-ink-400/25 ${r.anim}`}
            />
          ))}
        </div>

        <div className="relative z-10 w-full">
          <p className="mx-auto max-w-lg text-center text-base font-medium text-ink-600">{KEY_PROBLEM}</p>

          <div className="mx-auto mt-8 grid w-full max-w-4xl grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {PROBLEM_STATS.map((p) => (
                <div key={p.caption} className="rounded-lg border border-ink-900/10 bg-paper-50 p-6 text-center">
                  <p className="text-sm leading-relaxed text-ink-500">{p.caption}</p>
                  <p className="mt-3 font-serif text-5xl text-signal-600">{p.stat}</p>
                  <p className="mt-2 text-sm font-medium text-ink-900">{p.detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">{CORE_ISSUE.kicker}</p>
              <p className="mt-2 font-serif text-xl leading-snug text-ink-950">{CORE_ISSUE.title}</p>
              <div className="mt-4">
                <SkillStepGraph />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">{CORE_ISSUE.caption}</p>
            </div>
          </div>
        </div>
      </Slide>

      <Slide id="metrics" nextId="solution">
        <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-6">
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
        </div>
      </Slide>

      <Slide id="solution" nextId="connection" className="max-w-4xl">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
          {SOLUTION_LABEL}
        </p>
        <ThesisCarousel />
      </Slide>

      <Slide id="connection" nextId="coldstart">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
          The moment of connection
        </p>
        <div className="mt-8 w-full">
          <ConnectionFlow />
        </div>
        <p className="mt-6 max-w-2xl text-center text-sm text-ink-500">
          Beats a cold LinkedIn InMail or an Easy Apply into a void — both sides show up already
          knowing there's a reason to talk.
        </p>
      </Slide>

      <Slide id="coldstart">
        <div className="w-full max-w-2xl rounded-lg border border-ink-900/10 bg-paper-50 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Cold-start plan</p>

          <div className="relative mt-8">
            <div className="absolute bottom-2 left-4 top-2 w-px bg-ink-900/10" aria-hidden />
            <div className="space-y-8">
              {COLD_START_STEPS.map((s) => (
                <div key={s.n} className="relative pl-12">
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink-900/15 bg-paper-100 font-serif text-sm text-ink-700">
                    {s.n}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-signal-600">
                    {s.category}
                  </p>
                  <p className="mt-1 font-medium text-ink-900">{s.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 border-t border-ink-900/10 pt-6 text-sm italic leading-relaxed text-ink-500">
            {COLD_START_CAPTION}
          </p>
        </div>
      </Slide>
    </StoryShell>
  );
}
