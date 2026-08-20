// Plot area: x 70→410, y 260→30, mapped from a 0–100 scale on both axes
// (0 = Weak, 50 = Medium, 100 = Strong candidate/recruiter experience).
const PLOT_X_MIN = 70;
const PLOT_X_MAX = 410;
const PLOT_Y_TOP = 30;
const PLOT_Y_BOTTOM = 260;

function toX(value) {
  return PLOT_X_MIN + (value / 100) * (PLOT_X_MAX - PLOT_X_MIN);
}
function toY(value) {
  return PLOT_Y_BOTTOM - (value / 100) * (PLOT_Y_BOTTOM - PLOT_Y_TOP);
}

// Label offsets are hand-placed per point so they stay legible at these
// specific coordinates rather than overlapping the dot or a neighbor.
const POINTS = [
  { name: "Pathline", x: 90, y: 80, labelDx: -12, labelDy: -10, anchor: "end", highlighted: true },
  { name: "Wellfound", x: 80, y: 60, labelDx: -12, labelDy: 18, anchor: "end" },
  { name: "Paraform", x: 60, y: 70, labelDx: -12, labelDy: -10, anchor: "end" },
  { name: "Otta", x: 50, y: 20, labelDx: 12, labelDy: -8, anchor: "start" },
  { name: "LinkedIn", x: 30, y: 20, labelDx: -12, labelDy: -8, anchor: "end" },
  { name: "Indeed / Google", x: 10, y: 10, labelDx: 12, labelDy: 14, anchor: "start" },
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
          <line x1={toX(50)} y1={PLOT_Y_TOP} x2={toX(50)} y2={PLOT_Y_BOTTOM} />
          <line x1={PLOT_X_MIN} y1={toY(50)} x2={PLOT_X_MAX} y2={toY(50)} />
        </g>

        <line x1={PLOT_X_MIN} y1={PLOT_Y_BOTTOM} x2={PLOT_X_MAX} y2={PLOT_Y_BOTTOM} className="stroke-ink-900/30" strokeWidth="1.5" />
        <line x1={PLOT_X_MIN} y1={PLOT_Y_BOTTOM} x2={PLOT_X_MIN} y2={PLOT_Y_TOP} className="stroke-ink-900/30" strokeWidth="1.5" />

        {["Weak", "Medium", "Strong"].map((label, i) => (
          <text key={label} x={toX(i * 50)} y="282" textAnchor="middle" className="fill-ink-400 text-[10px]">
            {label}
          </text>
        ))}
        {["Weak", "Medium", "Strong"].map((label, i) => (
          <text key={label} x="62" y={toY(i * 50) + 3} textAnchor="end" className="fill-ink-400 text-[10px]">
            {label}
          </text>
        ))}

        <text x={toX(50)} y="306" textAnchor="middle" className="fill-ink-500 text-[11px] font-medium">
          Candidate experience →
        </text>
        <text
          x="14"
          y={toY(50)}
          textAnchor="middle"
          className="fill-ink-500 text-[11px] font-medium"
          transform={`rotate(-90 14 ${toY(50)})`}
        >
          ↑ Recruiter experience
        </text>

        {POINTS.map((p) => {
          const cx = toX(p.x);
          const cy = toY(p.y);
          return (
            <g key={p.name}>
              <circle cx={cx} cy={cy} r={p.highlighted ? 7 : 5} className={p.highlighted ? "fill-signal-600" : "fill-ink-500"} />
              <text
                x={cx + p.labelDx}
                y={cy + p.labelDy}
                textAnchor={p.anchor}
                className={`text-[11px] ${p.highlighted ? "fill-signal-700 font-semibold" : "fill-ink-600"}`}
              >
                {p.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
