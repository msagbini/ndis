# Skill Proposals (per §6 of the founding brief)

*(Resumen en español: este documento propone las 4 "skills" — procedimientos reutilizables del agente — que sugiere el encargo original, con qué haría cada una y cuándo construirla. Son solo propuestas para tu aprobación; no se construye ninguna todavía. Mi recomendación: aprobar la construcción de cada una recién al inicio de la etapa que la usa.)*

**Status: PROPOSED — nothing is built yet.** The founding brief suggests four skills. Building a skill before its stage would front-load work that interview findings may reshape. Recommendation per skill below.

## 1. `ndis-price-validator`

- **What:** parse the official Support Catalogue XLSX into a queryable, versioned table; validate a claim line (item code, date, price, location class) against it.
- **When to build:** at Stage 1 start — it *is* the heart of Stage 1, and building it as a skill makes the procedure repeatable for every annual/mid-year price update.
- **Depends on:** the real 2026-27 files from the founder.
- **Recommendation:** approve now, build at Stage 1 kickoff.

## 2. `ndis-evidence-mapper`

- **What:** map a service record to the Practice Standards quality indicators it evidences.
- **When to build:** Stage 3 — and only after the KPMG standards review outcome is known (the indicator structure may change; see `../research/practice-standards.md`).
- **Recommendation:** defer decision to Stage 3 planning.

## 3. `claim-rejection-triage`

- **What:** given a cancellation/rejection reason, classify the failure and propose the fix.
- **When to build:** late Stage 1 / Stage 2 — needs the NDIA error-code guides (founder download) as its source of truth, plus real rejection stories from interviews.
- **Recommendation:** approve in principle; build once the two NDIA self-help guides are in `docs/research/sources/`.

## 4. `au-privacy-review`

- **What:** checklist a feature against the Australian Privacy Principles and the ADM transparency rules before it ships.
- **When to build:** before Stage 4 (first stage handling real personal data in a running app), seeded from `../research/privacy-obligations.md` and refined with counsel's advice.
- **Recommendation:** build at Stage 4 threat-modelling time.

## Not proposed (yet)

No skill for interview scoring (one-off, lives fine in `scoring-sheet.md`) or for repo chores (CI already covers them). New skill proposals get added here when a procedure is about to be repeated a third time.
