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
4. **Assessment** — 3-section flow; Product Sense is fully interactive with
   real mock questions, Behavioral and AI Fluency are represented as
   completed steps
5. **Results** — percentile score broken into the three dimensions, with
   explicit transparency framing
6. **Matches** — unlocked roles with an "express interest" flow

## Run locally

```bash
npm install
npm run dev
```

Build: `npm run build`. Lint: `npm run lint`.

Stack: React + Tailwind CSS v4 (utility classes only, no custom config file).
