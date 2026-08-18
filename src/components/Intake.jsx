import { useState } from "react";
import { Logo, PrimaryButton, SecondaryButton, Pill, Kicker, StepDots } from "./ui";
import { STAGES } from "../data";

const STEPS = ["Role", "Location", "Stage & autonomy", "Priorities"];

function Field({ label, hint, children }) {
  return (
    <div className="mb-7">
      <label className="mb-2 block text-sm font-medium text-ink-900">{label}</label>
      {hint && <p className="mb-3 text-sm text-ink-500">{hint}</p>}
      {children}
    </div>
  );
}

function VoiceAffordance({ id }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 underline decoration-ink-300 underline-offset-2 hover:text-signal-600"
      >
        <span aria-hidden>🎙</span> or use voice instead
      </button>
      {open && (
        <div className="mt-3 rounded-sm border border-dashed border-ink-900/25 bg-paper-50 p-4">
          <p className="mb-2 text-xs text-ink-500">
            Voice input placeholder — in the full product this would record and
            transcribe. For now, type what you'd say.
          </p>
          <textarea
            id={id}
            rows={2}
            placeholder={'e.g. "I want a Series A or B role, fully remote, with a lot of autonomy..."'}
            className="w-full resize-none rounded-sm border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-800 placeholder:text-ink-400 focus:border-ink-900/40 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}

export default function Intake({ initial, onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initial);

  const update = (patch) => setData((d) => ({ ...d, ...patch }));
  const toggleStage = (stage) =>
    update({
      stages: data.stages.includes(stage)
        ? data.stages.filter((s) => s !== stage)
        : [...data.stages, stage],
    });

  const next = () => (step < STEPS.length - 1 ? setStep(step + 1) : onComplete(data));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-7">
        <Logo />
        <p className="text-sm text-ink-500">Step {step + 1} of {STEPS.length}</p>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <div className="mb-10 flex items-center justify-between">
          <StepDots total={STEPS.length} current={step} />
          <span className="text-xs uppercase tracking-[0.14em] text-ink-500">{STEPS[step]}</span>
        </div>

        <div className="rounded-lg border border-ink-900/10 bg-paper-50 p-8 sm:p-10">
          {step === 0 && (
            <div>
              <Kicker>Tell us what you're looking for</Kicker>
              <h2 className="mt-4 font-serif text-3xl text-ink-950">Role &amp; compensation</h2>
              <p className="mt-2 text-ink-600">This helps us surface relevant roles before you take the assessment.</p>

              <div className="mt-9">
                <Field label="Role type" hint="Pathline is focused on Product Management roles right now.">
                  <div className="flex items-center gap-3">
                    <Pill className="border-verified-700/30 bg-verified-600/8 text-verified-700">
                      Product Manager
                    </Pill>
                    <span className="text-xs text-ink-400">Locked for this prototype</span>
                  </div>
                </Field>

                <Field label="Target salary range" hint="Annual base, USD.">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={data.salaryMin}
                        onChange={(e) => update({ salaryMin: Number(e.target.value) })}
                        className="w-full rounded-sm border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-ink-900/40 focus:outline-none"
                      />
                      <p className="mt-1 text-xs text-ink-400">Minimum ($k)</p>
                    </div>
                    <span className="mt-[-16px] text-ink-400">—</span>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={data.salaryMax}
                        onChange={(e) => update({ salaryMax: Number(e.target.value) })}
                        className="w-full rounded-sm border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-ink-900/40 focus:outline-none"
                      />
                      <p className="mt-1 text-xs text-ink-400">Maximum ($k)</p>
                    </div>
                  </div>
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <Kicker>Where you work</Kicker>
              <h2 className="mt-4 font-serif text-3xl text-ink-950">Location &amp; remote preference</h2>
              <p className="mt-2 text-ink-600">We'll only surface roles that match how you want to work.</p>

              <div className="mt-9">
                <Field label="Preference">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {["Remote (US)", "Hybrid", "In-office"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update({ location: opt })}
                        className={`rounded-sm border px-4 py-3 text-left text-sm font-medium transition ${
                          data.location === opt
                            ? "border-ink-900 bg-ink-900 text-paper-50"
                            : "border-ink-900/15 text-ink-800 hover:border-ink-900/40"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </Field>
                <VoiceAffordance id="location-voice" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <Kicker>How you want to operate</Kicker>
              <h2 className="mt-4 font-serif text-3xl text-ink-950">Company stage &amp; autonomy</h2>
              <p className="mt-2 text-ink-600">Select every stage you'd consider, and how much ownership you want on day one.</p>

              <div className="mt-9">
                <Field label="Company stage" hint="Select all that apply.">
                  <div className="flex flex-wrap gap-3">
                    {STAGES.map((stage) => (
                      <button
                        key={stage}
                        type="button"
                        onClick={() => toggleStage(stage)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                          data.stages.includes(stage)
                            ? "border-ink-900 bg-ink-900 text-paper-50"
                            : "border-ink-900/15 text-ink-800 hover:border-ink-900/40"
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field
                  label="Autonomy level"
                  hint="1 = highly structured, clear scope. 5 = ambiguous, build it yourself."
                >
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={data.autonomy}
                    onChange={(e) => update({ autonomy: Number(e.target.value) })}
                    className="w-full accent-ink-900"
                  />
                  <div className="mt-1 flex justify-between text-xs text-ink-400">
                    <span>Structured</span>
                    <span className="font-medium text-ink-700">{data.autonomy} / 5</span>
                    <span>Ambiguous</span>
                  </div>
                </Field>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <Kicker>Last thing</Kicker>
              <h2 className="mt-4 font-serif text-3xl text-ink-950">What matters most</h2>
              <p className="mt-2 text-ink-600">Rank how much you're optimizing for work-life balance right now.</p>

              <div className="mt-9">
                <Field
                  label="Work-life balance priority"
                  hint="1 = I want to move fast and grind. 5 = Sustainable pace matters most."
                >
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={data.workLifeBalance}
                    onChange={(e) => update({ workLifeBalance: Number(e.target.value) })}
                    className="w-full accent-ink-900"
                  />
                  <div className="mt-1 flex justify-between text-xs text-ink-400">
                    <span>Move fast</span>
                    <span className="font-medium text-ink-700">{data.workLifeBalance} / 5</span>
                    <span>Sustainable pace</span>
                  </div>
                </Field>
                <VoiceAffordance id="priority-voice" />

                <div className="mt-8 rounded-sm border border-ink-900/10 bg-paper-100 p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-500">Summary</p>
                  <dl className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                    <dt className="text-ink-500">Salary</dt>
                    <dd className="text-ink-800">${data.salaryMin}k – ${data.salaryMax}k</dd>
                    <dt className="text-ink-500">Location</dt>
                    <dd className="text-ink-800">{data.location}</dd>
                    <dt className="text-ink-500">Stages</dt>
                    <dd className="text-ink-800">{data.stages.length ? data.stages.join(", ") : "Any"}</dd>
                    <dt className="text-ink-500">Autonomy</dt>
                    <dd className="text-ink-800">{data.autonomy} / 5</dd>
                  </dl>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-ink-900/10 pt-6">
            {step > 0 ? (
              <SecondaryButton onClick={back}>Back</SecondaryButton>
            ) : (
              <span />
            )}
            <PrimaryButton onClick={next}>
              {step < STEPS.length - 1 ? "Continue" : "See matched roles"}
              <span aria-hidden>→</span>
            </PrimaryButton>
          </div>
        </div>
      </main>
    </div>
  );
}
