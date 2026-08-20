export default function MatchGraph() {
  return (
    <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-6 sm:p-8">
      <svg
        viewBox="0 0 440 300"
        className="h-auto w-full"
        role="img"
        aria-label="Chart showing the candidate's skills and what recruiters want converging into a match"
      >
        <g className="stroke-ink-900/5">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={`v${i}`} x1={40 + i * 50} y1="20" x2={40 + i * 50} y2="250" />
          ))}
          {[1, 2, 3, 4].map((i) => (
            <line key={`h${i}`} x1="40" y1={250 - i * 50} x2="410" y2={250 - i * 50} />
          ))}
        </g>

        <line x1="40" y1="250" x2="410" y2="250" className="stroke-ink-900/30" strokeWidth="1.5" />
        <line x1="40" y1="250" x2="40" y2="20" className="stroke-ink-900/30" strokeWidth="1.5" />
        <text x="225" y="278" textAnchor="middle" className="fill-ink-500 text-[11px] font-medium">
          Craft &amp; depth of experience →
        </text>
        <text
          x="18"
          y="135"
          textAnchor="middle"
          className="fill-ink-500 text-[11px] font-medium"
          transform="rotate(-90 18 135)"
        >
          ↑ Judgment &amp; strategic thinking
        </text>

        <ellipse cx="300" cy="90" rx="105" ry="72" className="fill-signal-500/15 stroke-signal-600/30" strokeWidth="1.5" />
        <text x="405" y="42" textAnchor="end" className="fill-signal-700 text-[11px] font-semibold">
          What recruiters want
        </text>

        <circle cx="105" cy="215" r="5" className="fill-ink-400" />
        <text x="70" y="234" className="fill-ink-400 text-[10px]">
          Before Pathline
        </text>
        <path
          d="M108 210 C 155 165, 195 140, 245 118"
          fill="none"
          className="stroke-ink-400"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          markerEnd="url(#match-arrow)"
        />

        <ellipse cx="235" cy="145" rx="95" ry="68" className="fill-verified-600/15 stroke-verified-700/30" strokeWidth="1.5" />
        <text x="55" y="200" className="fill-verified-700 text-[11px] font-semibold">
          Your skills, scored
        </text>

        <g transform="translate(280 108)">
          <path
            d="M0 -14 L4 -4 L14 -4 L6 3 L9 13 L0 7 L-9 13 L-6 3 L-14 -4 L-4 -4 Z"
            className="fill-signal-600"
          />
        </g>
        <text x="280" y="68" textAnchor="middle" className="fill-ink-900 text-[12px] font-semibold">
          The match
        </text>

        <defs>
          <marker id="match-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" className="fill-ink-400" />
          </marker>
        </defs>
      </svg>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-verified-600/60" aria-hidden />
          Your skills, scored by the assessment
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-signal-500/60" aria-hidden />
          What recruiters are actually looking for
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="text-signal-600" aria-hidden>★</span>
          Where they overlap, you get matched
        </span>
      </div>
    </div>
  );
}
