import { useState } from "react";
import { ScreenHeader, PrimaryButton, Kicker } from "./ui";

function PermissionCard({ icon, title, description, granted, onGrant }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-sm border border-ink-900/10 bg-paper-100 p-5">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 text-2xl" aria-hidden>{icon}</span>
        <div>
          <p className="font-medium text-ink-900">{title}</p>
          <p className="mt-1 text-sm text-ink-600">{description}</p>
        </div>
      </div>
      {granted ? (
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-verified-600/10 px-3 py-1.5 text-sm font-medium text-verified-700">
          <span aria-hidden>✓</span> Enabled
        </span>
      ) : (
        <button
          onClick={onGrant}
          className="shrink-0 rounded-sm bg-ink-900 px-4 py-2 text-sm font-medium text-paper-50 transition hover:bg-signal-700"
        >
          Allow
        </button>
      )}
    </div>
  );
}

export default function Permissions({ sectionLabel, onContinue, onBack, onHome }) {
  const [camera, setCamera] = useState(false);
  const [screen, setScreen] = useState(false);
  const bothGranted = camera && screen;

  return (
    <div className="min-h-screen bg-paper-100">
      <ScreenHeader
        onBack={onBack}
        onHome={onHome}
        right={<p className="text-sm text-ink-500">Enabling recording · {sectionLabel}</p>}
      />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <Kicker>One moment</Kicker>
        <h1 className="mt-4 font-serif text-3xl text-ink-950">Enable camera & screen recording</h1>
        <p className="mt-2 max-w-lg text-ink-600">
          This is a prototype — clicking "Allow" below simulates granting browser permissions. No
          real camera or screen access is requested.
        </p>

        <div className="mt-8 space-y-4">
          <PermissionCard
            icon="🎥"
            title="Camera access"
            description="A small preview of your camera will stay visible during the assessment."
            granted={camera}
            onGrant={() => setCamera(true)}
          />
          <PermissionCard
            icon="🖥️"
            title="Screen recording"
            description="Your full screen is captured for the duration of the assessment."
            granted={screen}
            onGrant={() => setScreen(true)}
          />
        </div>

        <div className="mt-8 flex justify-end border-t border-ink-900/10 pt-6">
          <PrimaryButton onClick={onContinue} disabled={!bothGranted}>
            Begin {sectionLabel} <span aria-hidden>→</span>
          </PrimaryButton>
        </div>
      </main>
    </div>
  );
}
