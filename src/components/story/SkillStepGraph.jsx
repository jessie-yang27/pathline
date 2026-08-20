export default function SkillStepGraph() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-auto w-full"
      role="img"
      aria-label="Step chart showing candidate skill climbing in steps toward the job's required threshold"
    >
      <line x1="40" y1="170" x2="300" y2="170" className="stroke-ink-900/30" strokeWidth="1.5" />
      <line x1="40" y1="170" x2="40" y2="20" className="stroke-ink-900/30" strokeWidth="1.5" />
      <text x="170" y="192" textAnchor="middle" className="fill-ink-500 text-[10px] font-medium">
        Skill after each assessment attempt →
      </text>
      <text x="16" y="95" textAnchor="middle" className="fill-ink-500 text-[10px] font-medium" transform="rotate(-90 16 95)">
        ↑ Skill level
      </text>

      <line x1="40" y1="70" x2="300" y2="70" className="stroke-signal-600/50" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="295" y="63" textAnchor="end" className="fill-signal-700 text-[10px] font-semibold">
        Job requirement threshold
      </text>

      <path
        d="M40 150 H90 V130 H140 V100 H190 V70"
        fill="none"
        className="stroke-ink-400"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M190 70 V45 H260"
        fill="none"
        className="stroke-verified-700"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <circle cx="260" cy="45" r="5" className="fill-verified-700" />
      <text x="260" y="32" textAnchor="middle" className="fill-verified-700 text-[10px] font-semibold">
        Matched
      </text>
    </svg>
  );
}
