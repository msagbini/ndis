# CLAUDE.md — project context for Claude Code sessions

## What this is

Pre-seed Australian B2B SaaS (working name **Claimguard** — internal only, never public): pre-submission NDIS claim validation + audit evidence assembly. The founding brief lives in the conversation history and its rules are restated here because they bind every session.

## Current state (update this section as stages complete)

- **Stage 0 (validation) — built, gate NOT yet passed.** Research dossier, interview kit, go/no-go threshold, repo skeleton all exist. Waiting on: founder-run customer interviews and their verdict per `docs/go-no-go.md`.
- **No product code exists. Do not write any** until the founder explicitly confirms the Stage 0 gate passed (GO verdict). Stage plans live in `docs/plans/`.

## Non-negotiable rules (from the founding brief)

1. Never fabricate an integration, a support item code, a price, or any domain data. Real sources or clearly labelled `FIXTURE_` files only.
2. Money/eligibility verdicts are **deterministic code only** — an LLM never matches claims to budgets, does arithmetic, date logic, duplicate detection, or the pass/fail verdict. LLMs may extract/explain/draft, always schema-validated with confidence signals and human gates.
3. Never mark incomplete work complete; show real test output.
4. Never write real participant data into logs, prompts, fixtures, or traces.
5. Stage gates require explicit founder approval; stages ≤ ~1 day of work each.
6. Never build: rostering, payroll, CRM, care-delivery apps, chatbots, autonomous government-portal writes.

## Working with the founder

- **All founder-facing communication in Spanish** (see DECISIONS.md). Customer-facing material (outreach, interview script) stays in Australian English. Repo docs are English-canonical with `.es.md` translations of founder-instruction docs.
- Assume zero NDIS/stack knowledge: define every term at first use; every decision arrives with options + a recommendation + a "your call" default; never ask the founder to do something the agent can do.
- Questions to the founder: batch them, last resort, in the format defined in the brief (what/why/options/recommendation/steps).

## Technical baseline

TypeScript on Node 22 + pnpm workspaces; Biome (lint+format, tab indentation); Vitest; GitHub Actions CI (`pnpm lint && pnpm typecheck && pnpm test` — run these before every push). Future: PostgreSQL + RLS per-tenant, Australian-region hosting, versioned reversible migrations. `packages/rules` must stay pure (no network/db/LLM imports).

## Key documents

- `docs/plans/stage-0.md` + `stage-0-gate-report.md` — current gate status
- `docs/go-no-go.md` — interview pass/fail bar (PROPOSED until founder agrees)
- `docs/research/` — domain facts with confidence labels (OFFICIAL/WEAK/UNVERIFIED) and retrieval dates; `sources/README.md` lists primary files the founder must supply (downloads are proxy-blocked in this environment)
- `docs/interviews/` — the kit; `scoring-sheet.md` is filled by the agent from founder notes
- `DECISIONS.md` — decision log; add an entry for every consequential choice
- `docs/plans/stage-1.md` — DRAFT, do not execute before the gate

## Environment quirks

- Outbound fetches to most external domains (incl. ndis.gov.au, oaic.gov.au, legislation.gov.au) are blocked by the egress proxy; WebSearch snippets work. Label research confidence accordingly.
- Work on branch `claude/claimguard-ndis-platform-tflbqs`; push with `git push -u origin <branch>`.
