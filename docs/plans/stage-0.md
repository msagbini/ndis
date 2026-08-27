# Stage 0 Plan — Validation Pack and Repository Skeleton

**Status:** In progress
**Started:** 2026-08-27
**Stage gate:** Founder confirms the customer interview results meet the agreed go/no-go threshold (see `docs/go-no-go.md`).

## What Stage 0 is, in plain words

Before we write any product code, we prove two things:

1. **The problem is real enough that people will pay.** The market research so far is desk research (reading reports and websites). Stage 0 turns it into evidence from real conversations with real NDIS providers and plan managers.
2. **Every domain fact we will later build on is grounded in a primary source.** "Primary source" means the original official document — the actual government pricing document, the actual legislation — not a blog post summarising it.

We also set up the repository skeleton: the folder structure, automated checks, and documentation files that every later stage builds inside. Skeleton only — no business logic.

## In scope

1. **Research dossier** (`docs/research/`) — six files, each citing primary sources with retrieval dates:
   - `pricing-arrangements.md` — the current NDIS pricing rules document and its machine-readable form
   - `claims-process.md` — how claiming and pre-payment checking works today, and what rejection looks like
   - `practice-standards.md` — the quality standards auditors check providers against
   - `record-keeping.md` — what records must be kept and for how long
   - `privacy-obligations.md` — privacy law obligations, including the automated-decision-making transparency rules starting 10 December 2026
   - `competitors.md` — what incumbent software costs and what its users complain about
2. **Interview kit** (`docs/interviews/`) — everything the founder needs to run customer interviews with zero outreach experience: where to find people, exact outreach messages, a verbatim interview script, a note-taking template, and a scoring sheet that the agent (not the founder) fills in.
3. **Go/no-go threshold** (`docs/go-no-go.md`) — the pass/fail bar for the interviews, agreed in writing before any interview runs.
4. **Repository skeleton** — CI (continuous integration: automated checks that run on every change), linting and formatting (automated code-style checks), a test runner, `.env.example` (a template listing the secret settings the app will need, with no real values), `README.md`, `ARCHITECTURE.md`, `DECISIONS.md`.

## Out of scope (deliberately)

- Any product code: no rules engine, no database, no schema, no AI integration.
- Parsing the pricing document into data (Stage 1). Here we only locate and describe it.
- Creating the proposed skills from §6 of the master prompt (Stage 1+).
- Any outreach or interviews performed by the agent — talking to humans is the founder's part.

## Risks and how we handle them

| Risk | Handling |
|---|---|
| A primary source is unreachable or ambiguous | Mark the fact **UNVERIFIED**, record what we could and couldn't confirm, raise as an open question. Never guess. |
| Legal questions (privacy, retention) | Everything tagged LEGAL REQUIREMENT / BEST PRACTICE / OUR RECOMMENDATION; items needing an Australian lawyer are listed explicitly. We are not lawyers. |
| Interviews fail the threshold | The go/no-go doc commits us, in advance, to saying so plainly and recommending stop or pivot. |
| Fabricated domain data creeping in | No support item codes, prices, or contact details are invented anywhere in this repo. Templates show where real data goes. |

## Open questions for the founder

Collected and presented once, at the stage gate — see the gate report.

## Acceptance criteria

- [ ] All six research files exist, each with primary sources and retrieval dates.
- [ ] Interview kit is complete: sourcing guide, three outreach messages, verbatim script with ★-marked essential questions, note template, scoring sheet.
- [ ] Go/no-go threshold documented with explicit stop / pivot / proceed meanings.
- [ ] `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass locally with output shown.
- [ ] CI workflow present and green on the pushed branch.
- [ ] No secrets in the repo; no business logic in the repo.
- [ ] `DECISIONS.md` records the tooling choices and why.
- [ ] Founder has seen the gate report and explicitly approved proceeding to Stage 1.
