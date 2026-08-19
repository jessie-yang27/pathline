# Pathline — candidate-side prototype

A clickable prototype of the candidate experience for Pathline, a skills-first
job marketplace for PM roles. Instead of a resume, candidates take one
standardized assessment (behavioral, product sense, AI fluency) and get a
transparent, percentile-ranked score that companies see too.

This is a **mock-data prototype**: no backend, no real auth, no real AI
grading. All state lives in React on the client.

## Flow

1. **Landing** — thesis and CTA
2. **Intake survey** — 4-step form capturing role preferences
3. **Discovery** — matched roles, locked behind the assessment
4. **Readiness gate** — recording consent notice, a short non-scored logic
   check, then "I'm ready" (→ mock camera/screen permissions → assessment)
   or "Not ready yet" (→ training materials)
5. **Training materials** — supportive prep resources, with a way back to
   the readiness gate
6. **Assessment** — 3-section flow wrapped in a light proctoring UI shell
   (recording indicator + mock camera preview); Product Sense is fully
   interactive with real mock questions, Behavioral and AI Fluency are
   represented as completed steps
7. **Results** — percentile score broken into the three dimensions, with
   explicit transparency framing
8. **Matches** — unlocked roles with an "express interest" flow

A top-level tab switcher toggles between this candidate flow and a **bonus
recruiter view**: a ranked candidate dashboard with a live-resorting rubric
(reweight Behavioral / Product Sense / AI Fluency and the ranking reorders
immediately) and a candidate detail view with the full score breakdown plus
a Product Sense response excerpt. The recruiter view is intentionally
lighter than the candidate flow and labeled "Bonus" in the UI.

## Run locally

```bash
npm install
npm run dev
```

Build: `npm run build`. Lint: `npm run lint`.

Stack: React + Tailwind CSS v4 (utility classes only, no custom config file).
