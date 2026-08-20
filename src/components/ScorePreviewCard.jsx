const DIMENSIONS = [
  { label: "Behavioral", value: 78 },
  { label: "Product Sense", value: 88 },
  { label: "AI Fluency", value: 80 },
];

export default function ScorePreviewCard() {
  return (
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
        {DIMENSIONS.map((d) => (
          <div key={d.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-700">{d.label}</span>
              <span className="font-medium text-ink-900">{d.value}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/8">
              <div className="h-full rounded-full bg-verified-600" style={{ width: `${d.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 rounded-sm bg-verified-600/8 px-3 py-2.5 text-xs leading-relaxed text-verified-700">
        This score is fully transparent — companies see exactly what you see.
      </p>
    </div>
  );
}
