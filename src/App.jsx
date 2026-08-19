import { useState } from "react";
import CandidateApp from "./components/CandidateApp";
import RecruiterApp from "./components/RecruiterApp";

function TopSwitcher({ mode, setMode }) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-end gap-2 border-b border-ink-900/10 bg-paper-50/95 px-4 py-1.5 backdrop-blur">
      <span className="mr-1 text-[11px] uppercase tracking-[0.1em] text-ink-400">Prototype view</span>
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
    </div>
  );
}

function App() {
  const [mode, setMode] = useState("candidate");

  return (
    <>
      <TopSwitcher mode={mode} setMode={setMode} />
      {mode === "candidate" ? <CandidateApp /> : <RecruiterApp />}
    </>
  );
}

export default App;
