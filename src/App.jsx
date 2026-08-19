import { useState } from "react";
import CandidateApp from "./components/CandidateApp";
import RecruiterApp from "./components/RecruiterApp";
import RubricView from "./components/RubricView";
import WhyPathline from "./components/story/WhyPathline";
import WhyBetter from "./components/story/WhyBetter";
import HowBuilt from "./components/story/HowBuilt";

const STORY_MODES = ["why", "better", "built"];

function TopSwitcher({ mode, setMode }) {
  return (
    <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 border-b border-ink-900/10 bg-paper-50/95 px-4 py-1.5 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="mr-1 text-[11px] uppercase tracking-[0.1em] text-ink-400">Prototype</span>
        <button
          onClick={() => setMode("candidate")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            mode === "candidate" ? "bg-ink-900 text-paper-50" : "text-ink-500 hover:text-ink-900"
          }`}
        >
          Candidate view
        </button>
        <button
          onClick={() => setMode("recruiter")}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
            mode === "recruiter" ? "bg-ink-900 text-paper-50" : "text-ink-500 hover:text-ink-900"
          }`}
        >
          Recruiter view
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
              mode === "recruiter" ? "bg-signal-500/30 text-paper-50" : "bg-signal-500/15 text-signal-700"
            }`}
          >
            Bonus
          </span>
        </button>
        <button
          onClick={() => setMode("rubric")}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
            mode === "rubric" ? "bg-ink-900 text-paper-50" : "text-ink-500 hover:text-ink-900"
          }`}
        >
          Rubric view
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
              mode === "rubric" ? "bg-signal-500/30 text-paper-50" : "bg-signal-500/15 text-signal-700"
            }`}
          >
            Internal
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="mr-1 text-[11px] uppercase tracking-[0.1em] text-ink-400">Story</span>
        <button
          onClick={() => setMode("why")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            mode === "why" ? "bg-signal-600 text-paper-50" : "text-ink-500 hover:text-ink-900"
          }`}
        >
          Why Pathline?
        </button>
        <button
          onClick={() => setMode("better")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            mode === "better" ? "bg-signal-600 text-paper-50" : "text-ink-500 hover:text-ink-900"
          }`}
        >
          Why We're Better
        </button>
        <button
          onClick={() => setMode("built")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            mode === "built" ? "bg-signal-600 text-paper-50" : "text-ink-500 hover:text-ink-900"
          }`}
        >
          How We Built This
        </button>
      </div>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState("candidate");
  const backToProduct = () => setMode("candidate");

  return (
    <>
      <TopSwitcher mode={mode} setMode={setMode} />
      {mode === "candidate" && <CandidateApp />}
      {mode === "recruiter" && <RecruiterApp />}
      {mode === "rubric" && <RubricView />}
      {STORY_MODES.includes(mode) && (
        <>
          {mode === "why" && <WhyPathline onNavigate={setMode} onBackToProduct={backToProduct} />}
          {mode === "better" && <WhyBetter onNavigate={setMode} onBackToProduct={backToProduct} />}
          {mode === "built" && <HowBuilt onNavigate={setMode} onBackToProduct={backToProduct} />}
        </>
      )}
    </>
  );
}

export default App;
