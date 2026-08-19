import { useState } from "react";
import { Logo, Pill, Kicker } from "./ui";
import { RUBRICS } from "../rubricData";

function cloneRubrics() {
  return RUBRICS.map((r) => ({ ...r, criteria: r.criteria.map((c) => ({ ...c })) }));
}

function ArrowButton({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "up" ? "Move up" : "Move down"}
      className="flex h-4 w-4 items-center justify-center text-ink-400 transition hover:text-ink-900 disabled:opacity-20 disabled:hover:text-ink-400"
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
        <path
          d={direction === "up" ? "M5 15 12 8l7 7" : "M5 9l7 7 7-7"}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function CriterionRow({ criterion, index, total, onMove, onChangeText, onChangeValue, onRemove }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-ink-900/10 bg-paper-50 px-3 py-2.5">
      <span className="flex w-5 shrink-0 items-center justify-center font-serif text-sm text-ink-400">
        {index + 1}
      </span>
      <div className="flex shrink-0 flex-col items-center">
        <ArrowButton direction="up" onClick={() => onMove(-1)} disabled={index === 0} />
        <ArrowButton direction="down" onClick={() => onMove(1)} disabled={index === total - 1} />
      </div>

      {criterion.type === "threshold" ? (
        <p className="flex-1 text-sm text-ink-800">
          {criterion.prefix}{" "}
          <input
            type="number"
            min={0}
            value={criterion.value}
            onChange={(e) => onChangeValue(Number(e.target.value))}
            className="w-14 rounded-sm border border-ink-900/15 bg-white px-1.5 py-0.5 text-center text-sm text-ink-900 focus:border-ink-900/40 focus:outline-none"
          />{" "}
          {criterion.suffix}
        </p>
      ) : (
        <input
          value={criterion.text}
          onChange={(e) => onChangeText(e.target.value)}
          className="flex-1 border-0 bg-transparent text-sm text-ink-800 focus:outline-none"
        />
      )}

      <button
        onClick={onRemove}
        aria-label="Remove criterion"
        className="shrink-0 text-ink-300 transition hover:text-red-600"
      >
        ×
      </button>
    </div>
  );
}

function AddCriterionRow({ onAdd }) {
  const [value, setValue] = useState("");

  const submit = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Add a criterion..."
        className="flex-1 rounded-sm border border-dashed border-ink-900/20 bg-transparent px-3 py-2 text-sm text-ink-800 placeholder:text-ink-400 focus:border-ink-900/40 focus:outline-none"
      />
      <button
        onClick={submit}
        className="shrink-0 rounded-sm border border-ink-900/15 px-3 py-2 text-xs font-medium text-ink-700 transition hover:border-ink-900/40"
      >
        Add
      </button>
    </div>
  );
}

function RubricSectionCard({ section, onMove, onChangeText, onChangeValue, onRemove, onAdd, onReset }) {
  return (
    <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-serif text-xl text-ink-950">{section.label}</p>
          <Pill className="mt-1.5">{section.framework}</Pill>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-medium text-ink-400 underline decoration-ink-300 underline-offset-2 hover:text-ink-700"
        >
          Reset to default
        </button>
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.1em] text-ink-500">
        Ranked by priority — reorder to change what matters most
      </p>

      <div className="mt-3 space-y-2">
        {section.criteria.map((c, i) => (
          <CriterionRow
            key={c.id}
            criterion={c}
            index={i}
            total={section.criteria.length}
            onMove={(dir) => onMove(c.id, dir)}
            onChangeText={(text) => onChangeText(c.id, text)}
            onChangeValue={(value) => onChangeValue(c.id, value)}
            onRemove={() => onRemove(c.id)}
          />
        ))}
      </div>

      <div className="mt-3">
        <AddCriterionRow onAdd={onAdd} />
      </div>
    </div>
  );
}

export default function RubricView() {
  const [rubrics, setRubrics] = useState(cloneRubrics);

  const updateCriteria = (sectionId, updater) =>
    setRubrics((rs) => rs.map((r) => (r.id === sectionId ? { ...r, criteria: updater(r.criteria) } : r)));

  const moveCriterion = (sectionId, critId, dir) =>
    updateCriteria(sectionId, (criteria) => {
      const i = criteria.findIndex((c) => c.id === critId);
      const j = i + dir;
      if (j < 0 || j >= criteria.length) return criteria;
      const next = [...criteria];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const changeText = (sectionId, critId, text) =>
    updateCriteria(sectionId, (criteria) => criteria.map((c) => (c.id === critId ? { ...c, text } : c)));

  const changeValue = (sectionId, critId, value) =>
    updateCriteria(sectionId, (criteria) => criteria.map((c) => (c.id === critId ? { ...c, value } : c)));

  const removeCriterion = (sectionId, critId) =>
    updateCriteria(sectionId, (criteria) => criteria.filter((c) => c.id !== critId));

  const addCriterion = (sectionId, text) =>
    updateCriteria(sectionId, (criteria) => [
      ...criteria,
      { id: `${sectionId}-${Date.now()}`, type: "text", text },
    ]);

  const resetSection = (sectionId) =>
    setRubrics((rs) =>
      rs.map((r) =>
        r.id === sectionId
          ? { ...r, criteria: RUBRICS.find((d) => d.id === sectionId).criteria.map((c) => ({ ...c })) }
          : r
      )
    );

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-7">
        <Logo />
        <Pill className="border-signal-600/30 bg-signal-500/10 text-signal-700">Internal · Rubric view</Pill>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-6">
        <Kicker>Scoring rubric</Kicker>
        <h1 className="mt-4 font-serif text-4xl text-ink-950">What a perfect response looks like</h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          This is what Pathline's graders — human and AI — score against for each section.
          Reorder, edit, remove, or add criteria to customize what "great" means for your role.
        </p>

        <div className="mt-10 mx-auto max-w-3xl space-y-6">
          {rubrics.map((section) => (
            <RubricSectionCard
              key={section.id}
              section={section}
              onMove={(critId, dir) => moveCriterion(section.id, critId, dir)}
              onChangeText={(critId, text) => changeText(section.id, critId, text)}
              onChangeValue={(critId, value) => changeValue(section.id, critId, value)}
              onRemove={(critId) => removeCriterion(section.id, critId)}
              onAdd={(text) => addCriterion(section.id, text)}
              onReset={() => resetSection(section.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
