# Pathline — candidate-side prototype

A clickable prototype of the candidate experience for Pathline, a skills-first
job marketplace for PM roles. Instead of a resume, candidates take one
standardized assessment (behavioral, product sense, AI fluency) and get a
transparent, percentile-ranked score that companies see too.

This is a **mock-data prototype**: no backend, no real auth, no real AI
grading. All state lives in React on the client.

## Flow

1. **Landing** — thesis and CTA
2. **Dashboard** — the hub. Three independent assessment cards, a survey
   card ("tell us about the job you want"), and a link to browse companies.
   No fixed order — this is also where every assessment returns to when
   it's done, and it's designed to read as the shape of a real account
   dashboard once a candidate has signed up.
3. **Intake survey** — 4-step form capturing role preferences; completing
   it drops you into the companies list
4. **Assessment, per section** — Behavioral (20 min, 3 questions), Product
   Sense (20 min, 1 core design question), and AI Fluency (15 min, a mock
   "connect GitHub" gate then 3 questions) are each started independently
   from the dashboard. **Only Behavioral runs the full recording/proctoring
   flow** for this demo — Product Sense and AI Fluency skip straight to the
   assessment with a plain text answer box, no recording:
   - **Readiness gate** *(Behavioral only)* — a skimmable recording-consent
     screen (camera + screen recorded, proves it's really you,
     Pathline-only), a 2-question visual liveness check (shape-sequence
     patterns answered by mock voice capture, not clickable options), then
     "I'm ready" (→ mock camera/screen permissions → the assessment) or
     "Not ready yet" (→ training materials, with a way back to the gate)
   - **The assessment itself** — Behavioral answers each question via a
     large mock video-recording panel under a proctoring shell (recording
     indicator + timer); Product Sense and AI Fluency use a plain textarea
     instead. No back/home nav appears on the assessment screen itself.
   - Finishing an assessment returns straight to the dashboard, with that
     section marked complete and its score visible immediately.
5. **Results** *(optional, linked from the dashboard)* — full score
   breakdown; the overall percentile unlocks once all three sections are
   complete, with completed dimensions shown progressively before that
6. **Companies** — every matched company explains why it was picked,
   filterable by stage / work style / salary range; sharing your score is
   locked until all three assessments are done, browsing isn't

Every screen except the proctored assessment itself shows a back button and
a "Home" link in the header, backed by a navigation history stack so back
always returns to the screen you actually came from.

A top-level tab switcher toggles between this candidate flow and a **bonus
recruiter view**: a ranked candidate dashboard with a live-resorting rubric
(reweight Behavioral / Product Sense / AI Fluency and the ranking reorders
immediately) and a candidate detail view with the full score breakdown plus
a Product Sense response excerpt. The recruiter view is intentionally
lighter than the candidate flow and labeled "Bonus" in the UI.

## Rubric view

A third top-level view (alongside Candidate and Recruiter), labeled
"Internal" in the switcher since candidates never see it: shows what a
perfect response looks like for each of the three assessment sections —
Behavioral ("zero-to-one" / "entrepreneurial" language, impactful stories,
startup fit, enough experience, STAR format), Product Sense (a north-star
framework covering user, pain point, solution, success and guardrail
metrics, prioritized with reasoning for what didn't make the cut), and AI
Fluency (GitHub activity thresholds — repos and build sessions — plus
answer accuracy and depth). Every criterion is fully customizable per
company: reorder by priority, edit the text, remove it, add new ones, or
tune the numeric thresholds (e.g. "at least 5 repositories") inline.

## Story pages

The same top-level switcher also links to three narrative pages for the live
walkthrough — not part of the clickable product flow, and visually distinct
via a dark banner header. Content is pulled as close to verbatim as possible
from the actual take-home doc, so it reads in the author's own words rather
than a rewritten summary:

- **Why Pathline?** — the thesis as a pull-quote, the key-problem stats, a
  6-card grid of key product decisions, the candidate↔company connection
  flow, North Star / "not optimizing for" callouts, and the cold-start plan
- **Why We're Better** — a competitor comparison (Indeed/Google, LinkedIn,
  Wellfound, Paraform, Otta) with color-coded candidate/recruiter strength
  badges, Pathline's row highlighted at the top
- **How We Built This** — a 6-step timeline of the actual build process
  (Claude, Granola, Wispr Flow, Claude Code, Vercel), with a featured
  "turning point" moment and the best prompt of the project as a closing
  pull-quote

## Run locally

```bash
npm install
npm run dev
```

Build: `npm run build`. Lint: `npm run lint`.

Stack: React + Tailwind CSS v4 (utility classes only, no custom config file).
