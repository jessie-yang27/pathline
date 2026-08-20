# Pathline — candidate-side prototype

A clickable prototype of the candidate experience for Pathline, a skills-first
job marketplace for PM roles. Instead of a resume, candidates take one
standardized assessment (behavioral, product sense, AI fluency) and get a
transparent, percentile-ranked score that companies see too.

This is a **mock-data prototype**: no backend, no real auth, no real AI
grading. All state lives in React on the client.

## Flow

1. **Landing** — thesis and CTA, with a short explainer of what the
   assessment actually is above the score-preview widget, a "built with PMs
   from OpenAI / Anthropic / Cursor / Granola / Vercel / Perplexity" trust
   strip, a chart visualizing how the assessment lines up a candidate's
   scored skills against what recruiters are looking for (the overlap is
   the match), and a row of candidate testimonials
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
   from the dashboard, and each is answered via a large mock
   video-recording panel (no text box) under a proctoring shell (recording
   indicator + timer). **Only Behavioral runs the full consent/liveness-
   check gate before recording starts** for this demo — Product Sense and
   AI Fluency skip straight from the dashboard into the recorded assessment:
   - **Readiness gate** *(Behavioral only)* — a skimmable recording-consent
     screen (camera + screen recorded, proves it's really you,
     Pathline-only), a single "which object comes next" visual liveness
     check (answered by mock voice capture, not by clicking an option), then
     "I'm ready" (→ mock camera/screen permissions → the assessment) or
     "Not ready yet" (→ training materials, with a way back to the gate)
   - No back/home nav appears on the assessment screen itself.
   - Finishing an assessment returns straight to the dashboard, with that
     section marked complete and its score visible immediately. Each
     assessment can be retaken 2 weeks after completion — the dashboard
     card shows a "Retake available [date]" note until then, then swaps in
     a Retake button.
5. **Results** *(optional, linked from the dashboard)* — full score
   breakdown, with a "How to improve" feedback callout under each completed
   dimension; the overall percentile unlocks once all three sections are
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

- **Why Pathline?** — presented as a slide deck rather than a scrolling
  article: seven full-viewport sections, each filling the screen with
  generous space so it reads as a standalone slide when presented on a
  desktop, and each with a clickable down-arrow at the bottom to advance
  to the next one. Scroll-snap glides between sections, and a fixed
  dot-nav on the right tracks the active slide (via IntersectionObserver)
  and jumps to any section on click. In order: **belief** (pull-quote),
  **key problem** (two stat cards, with faint resume icons animating in
  the background as a nod to the volume problem), **North Star / "not
  optimizing for"** (stacked callouts), **hypothesis** (increasing
  candidate quality and restricting the jobs candidates apply to should
  raise match rate — illustrated with a before/after 6×6 grid of job
  requests, all low quality, with a 2×2 subset highlighted in mustard
  once quality is restricted), **the solution** (the candidate-to-company
  connection flow, now including "take job preferences survey" and "see
  list of companies and send score"), **the decisions** (a one-at-a-time
  card carousel — a numbered menu of the seven key product decisions on
  the left, Prev/Next controls on the right, each with its own small 2×2
  or ratio visual: "who's the wedge" — urgency × impact, candidates vs.
  recruiters; "why PM roles first" as its own card right after it; "unit
  of signal" — accuracy × speed to scale, human vs. AI assessment; "who
  initiates" — a candidate-vs-job-count ratio; "how transparent are we"
  — the same score-preview card shown on the landing page; and
  "guardrail metrics" — fraud rate, drop-off rate, and bottom-of-the-
  bucket risk, each paired with its mitigation), and **cold-start plan**
  (a vertical, numbered timeline, each step labeled with what it's
  solving for — Credibility, Candidate acquisition, Recruiter
  acquisition).
- **Why We're Better** — a competitor comparison (Indeed/Google, LinkedIn,
  Wellfound, Paraform, Otta) with color-coded candidate/recruiter strength
  badges, Pathline's row highlighted at the top, plus the same comparison
  plotted as a scatter graph (candidate experience × recruiter experience)
  underneath
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
