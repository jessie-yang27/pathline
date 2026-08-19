export function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
        <path
          d="M3 19V3.5C3 3.22386 3.22386 3 3.5 3H12C15.0376 3 17.5 5.46243 17.5 8.5C17.5 11.5376 15.0376 14 12 14H6.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-serif text-lg tracking-tight">Pathline</span>
    </div>
  );
}

export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-sm bg-ink-900 px-6 py-3 text-sm font-medium text-paper-50 transition hover:bg-signal-700 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-sm border border-ink-900/20 bg-transparent px-6 py-3 text-sm font-medium text-ink-900 transition hover:border-ink-900/60 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Pill({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-ink-900/15 px-3 py-1 text-xs font-medium tracking-wide text-ink-600 ${className}`}
    >
      {children}
    </span>
  );
}

export function Kicker({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-signal-600 ${className}`}>
      <span className="h-px w-8 bg-signal-600/60" />
      {children}
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ScreenHeader({ maxWidth = "max-w-3xl", onBack, onHome, right }) {
  return (
    <header className={`mx-auto flex ${maxWidth} items-center justify-between px-6 py-7`}>
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Back"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-900/15 text-ink-600 transition hover:border-ink-900/40 hover:text-ink-900"
          >
            <BackIcon />
          </button>
        )}
        <Logo />
        {onHome && (
          <button
            onClick={onHome}
            className="ml-1 text-xs font-medium text-ink-500 underline decoration-ink-300 underline-offset-2 transition hover:text-ink-900"
          >
            Home
          </button>
        )}
      </div>
      {right}
    </header>
  );
}

export function StepDots({ total, current }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i === current ? "w-6 bg-ink-900" : i < current ? "w-1.5 bg-ink-900/50" : "w-1.5 bg-ink-900/15"
          }`}
        />
      ))}
    </div>
  );
}
