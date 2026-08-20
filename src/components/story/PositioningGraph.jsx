// Plot area: x 70→410 (Weak/Medium/Strong candidate experience),
// y 260→30 (Weak/Medium/Strong recruiter experience, inverted for SVG).
// Positions are hand-placed rather than derived from a formula so that
// companies tied on the same rung (several are STRONG/STRONG) stay legible
// instead of stacking exactly on top of one another.
const POINTS = [
  { name: "Pathline", cx: 410, cy: 26, labelX: 396, labelY: 16, anchor: "end", highlighted: true },
  { name: "Wellfound", cx: 384, cy: 48, labelX: 384, labelY: 66, anchor: "middle" },
  { name: "Paraform", cx: 406, cy: 76, labelX: 406, labelY: 94, anchor: "middle" },
  { name: "LinkedIn", cx: 220, cy: 260, labelX: 206, labelY: 246, anchor: "end" },
  { name: "Otta", cx: 260, cy: 260, labelX: 274, labelY: 246, anchor: "start" },
  { name: "Indeed / Google", cx: 70, cy: 232, labelX: 84, labelY: 236, anchor: "start" },
];

export default function PositioningGraph() {
  return (
    <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-6 sm:p-8">
      <svg
        viewBox="0 0 440 320"
        className="h-auto w-full"
        role="img"
        aria-label="Scatter plot positioning companies by candidate experience and recruiter experience"
      >
        <g className="stroke-ink-900/5">
          <line x1="240" y1="30" x2="240" y2="260" />
          <line x1="70" y1="145" x2="410" y2="145" />
        </g>

        <line x1="70" y1="260" x2="410" y2="260" className="stroke-ink-900/30" strokeWidth="1.5" />
        <line x1="70" y1="260" x2="70" y2="30" className="stroke-ink-900/30" strokeWidth="1.5" />

        {["Weak", "Medium", "Strong"].map((label, i) => (
          <text key={label} x={70 + i * 170} y="282" textAnchor="middle" className="fill-ink-400 text-[10px]">
            {label}
          </text>
        ))}
        {["Weak", "Medium", "Strong"].map((label, i) => (
          <text key={label} x="62" y={260 - i * 115 + 3} textAnchor="end" className="fill-ink-400 text-[10px]">
            {label}
          </text>
        ))}

        <text x="240" y="306" textAnchor="middle" className="fill-ink-500 text-[11px] font-medium">
          Candidate experience →
        </text>
        <text
          x="14"
          y="145"
          textAnchor="middle"
          className="fill-ink-500 text-[11px] font-medium"
          transform="rotate(-90 14 145)"
        >
          ↑ Recruiter experience
        </text>

        {POINTS.map((p) => (
          <g key={p.name}>
            <circle cx={p.cx} cy={p.cy} r={p.highlighted ? 7 : 5} className={p.highlighted ? "fill-signal-600" : "fill-ink-500"} />
            <text
              x={p.labelX}
              y={p.labelY}
              textAnchor={p.anchor}
              className={`text-[11px] ${p.highlighted ? "fill-signal-700 font-semibold" : "fill-ink-600"}`}
            >
              {p.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
