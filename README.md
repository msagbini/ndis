# Claimguard (working name)

**One sentence:** NDIS payments have moved from "pay first, check later" to "prove it before you're paid" — Claimguard is the assurance layer that validates every claim against the participant's plan, budget and price limits *before* submission, and continuously assembles audit-ready evidence.

(NDIS is Australia's National Disability Insurance Scheme, which funds disability supports; providers deliver the supports and claim payment from the scheme.)

> **Working name only.** "Claimguard" must be renamed before any public artefact exists — see `DECISIONS.md`.

## Current status: Stage 0 — validation, no product code

This repository currently contains **no product code**, on purpose. Stage 0 validates the business with real customers before anything is built. What exists now:

| Where | What |
|---|---|
| `docs/research/` | Research dossier: primary-source findings on NDIS pricing, claiming, audits, record-keeping, privacy law, and competitors |
| `docs/interviews/` | Complete kit for running customer-validation interviews |
| `docs/go-no-go.md` | The agreed pass/fail bar for those interviews |
| `docs/plans/` | Per-stage plans with scope and acceptance criteria |
| `ARCHITECTURE.md` | The intended technical shape of the product (intent, not implementation) |
| `DECISIONS.md` | Log of decisions made and why |
| `packages/rules/` | Empty placeholder package with one smoke test proving the toolchain works |

## Stages

| Stage | Output | Gate to pass |
|---|---|---|
| 0 (now) | Validation pack + repo skeleton | Founder confirms interview results meet the threshold |
| 1 | Deterministic rules engine + test harness | 100% of golden-set cases pass |
| 2 | Ingestion + document extraction | Extraction accuracy meets the agreed bar |
| 3 | Evidence gaps + audit pack generator | A real provider's evidence pack passes founder review |
| 4 | Multi-tenant app, auth, RBAC, billing | Security checklist passes |
| 5 | Plan-manager bulk console + rejection prediction | Pilot customer uses it unaided for two weeks |

## Running the checks

Requires Node.js 22+ and pnpm 10+ (pnpm is the package manager — the tool that installs the project's dependencies).

```bash
pnpm install     # install dependencies
pnpm lint        # code style and correctness checks (Biome)
pnpm typecheck   # TypeScript type checking
pnpm test        # run the test suite (Vitest)
pnpm format      # auto-fix formatting
```

The same checks run automatically on every push via GitHub Actions (see `.github/workflows/ci.yml`). "CI" — continuous integration — just means these checks run on a server on every change, so a mistake can't slip in unnoticed.
