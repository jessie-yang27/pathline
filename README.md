# Pathline — candidate-side prototype

A clickable prototype of the candidate experience for Pathline, a skills-first
job marketplace for PM roles. Instead of a resume, candidates take one
standardized assessment (behavioral, product sense, AI fluency) and get a
transparent, percentile-ranked score that companies see too.

This is a **mock-data prototype**: no backend, no real auth, no real AI
grading. All state lives in React on the client.

## Flow

1. **Landing** — thesis and CTA
2. **How it works** — explains the assessment → score → matches loop, then
   forks into two starting paths:
   - **Continue with the free assessment** — skips straight to the
     readiness gate with the standard question set
   - **Tell us about the job you want** — goes through the intake survey
     and matched-roles discovery screen first, then the readiness gate
3. **Intake survey** *(tailored path only)* — 4-step form capturing role
   preferences
4. **Discovery** *(tailored path only)* — matched roles, locked behind the
   assessment
5. **Readiness gate** — recording consent notice, a short non-scored logic
   check, then "I'm ready" (→ mock camera/screen permissions → assessment)
   or "Not ready yet" (→ training materials)
6. **Training materials** — supportive prep resources, with a way back to
   the readiness gate
7. **Assessment** — three real, fully interactive sections wrapped in a
   light proctoring UI shell (recording indicator + mock camera preview),
   about 20 minutes total:
   - **Behavioral** (8 min) — 3 open-response questions
   - **Product Sense** (5 min) — 1 core design question
   - **AI Fluency** (7 min) — a mock "connect GitHub" gate, then 3 questions
8. **Results** — percentile score broken into the three dimensions, with
   explicit transparency framing
9. **Matches** — unlocked roles with an "express interest" flow

Every screen except the proctored Assessment itself shows a back button and
a "Home" link in the header, backed by a navigation history stack so back
always returns to the screen you actually came from (including across the
two forked paths).

A top-level tab switcher toggles between this candidate flow and a **bonus
recruiter view**: a ranked candidate dashboard with a live-resorting rubric
(reweight Behavioral / Product Sense / AI Fluency and the ranking reorders
immediately) and a candidate detail view with the full score breakdown plus
a Product Sense response excerpt. The recruiter view is intentionally
lighter than the candidate flow and labeled "Bonus" in the UI.

## Story pages

The same top-level switcher also links to three narrative pages for the live
walkthrough — not part of the clickable product flow, and visually distinct
via a dark banner header:

- **Why Pathline?** — the thesis as a pull-quote, a 6-card grid of key
  product decisions, the candidate↔company connection flow, North Star /
  "not optimizing for" callouts, and the cold-start plan
- **Why We're Better** — a competitor comparison (Indeed/Google, LinkedIn,
  Wellfound, Paraform, Otta) with color-coded candidate/recruiter strength
  badges, Pathline's row highlighted at the top
- **How We Built This** — a 6-step timeline of the actual build process
  (Claude, Wispr Flow, Claude Code, Vercel), with a featured "turning point"
  moment and the best prompt of the project as a closing pull-quote

## Run locally

```bash
npm install
npm run dev
```

Build: `npm run build`. Lint: `npm run lint`.

Stack: React + Tailwind CSS v4 (utility classes only, no custom config file).
