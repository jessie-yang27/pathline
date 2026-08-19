import { Logo } from "../ui";
import { STORY_PAGES } from "../../storyData";

export default function StoryShell({ active, onNavigate, onBackToProduct, kicker, title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-paper-100">
      <div className="border-b border-ink-900/10 bg-ink-950">
        <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div className="flex items-center gap-6">
            <div className="text-paper-50">
              <Logo />
            </div>
            <nav className="flex flex-wrap items-center gap-1.5">
              {STORY_PAGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onNavigate(p.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    active === p.id
                      ? "bg-signal-500 text-ink-950"
                      : "text-paper-300/70 hover:bg-paper-50/10 hover:text-paper-50"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </nav>
          </div>
          <button
            onClick={onBackToProduct}
            className="text-xs font-medium text-paper-300/70 underline decoration-paper-300/30 underline-offset-2 transition hover:text-paper-50"
          >
            ← Back to the product
          </button>
        </header>

        <div className="mx-auto max-w-6xl px-6 pb-10 pt-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal-500">{kicker}</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-paper-50 sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-paper-300/80">{subtitle}</p>}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-14">{children}</main>
    </div>
  );
}
