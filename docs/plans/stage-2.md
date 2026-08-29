# Stage 2 Plan — Ingestion + Document Extraction

**Status: DRAFT — do not execute.** Stage 2 starts only after (a) the Stage 0 interview verdict is GO, (b) Stage 1's remaining blockers are closed (real 2026-27 pricing files loaded; reason codes mapped to the NDIA's official guides), and (c) the founder supplies the inputs listed under Blockers. Gate: **extraction accuracy meets the agreed bar on a held-out set** (bar to be agreed with the founder before work starts — proposed: per-field precision ≥ 98% and recall ≥ 95% on money/date/item fields, lower fields route to review).

## Goal

Turn the unstructured documents providers actually have (invoices, shift notes, PDFs, spreadsheets) into the structured `ClaimLine`/`ServiceRecord` data the deterministic engine consumes — with AI doing the reading and humans approving anything uncertain, per the deterministic/AI boundary.

## Scope

1. **`packages/ai`** — the single internal LLM abstraction mandated by the brief: model routing, fallback, per-tenant cost caps, prompt versioning, full request/response audit logging, PII redaction before anything leaves the boundary. No other package may call a model directly (enforced by a purity-style test).
2. **Extraction pipelines** in `packages/ingestion`: document → schema-validated structured fields + a per-field confidence signal. Output that fails schema validation or falls below the confidence threshold goes to a human-review queue, never onward.
3. **AI eval harness** (brief §11): a held-out set of documents with hand-labelled expected extractions; precision/recall per field, tracked over time; a prompt change that lowers the score is rejected. The labelled set is built from documents the founder supplies (real de-identified, or realistic samples the founder approves — never fabricated by the agent and passed off as real).
4. **Hallucination guard test** (brief §11): an automated test asserting no eligibility/payment verdict can be produced from free text without passing through `packages/rules` — concretely: `packages/ai` exposes no verdict-shaped output type, and the only path to a `LineResult` is `validateClaims` on schema-validated data. The structural half already holds (rules purity test); this test makes it explicit end to end.
5. **Threat-model items T4/T5/T8** (uploaded files are hostile input; fenced prompts; scanning; redaction) built in, not bolted on — see `../threat-model.md`.

## Out of scope

Evidence mapping and audit packs (Stage 3), any UI beyond the review queue's minimal surface, databases/tenancy (Stage 4), and any autonomous action on extracted data.

## Blockers (who: founder)

1. GO verdict from the interviews.
2. **Sample documents**: 10–20 real invoices/shift notes, de-identified (or approved realistic samples) — needed for prompts AND the labelled eval set. The interview closing question ("can I try it?") is the natural source.
3. Anthropic API access with a spending cap the founder sets (first real money spend — founder decision with options + recommendation when we get there).
4. Agreement on the extraction accuracy bar above.

## Risks

- Interview findings may reorder this stage entirely (e.g. if plan managers dominate, invoice extraction outranks shift notes). The draft is re-cut against the verdict before execution.
- De-identification is itself sensitive work: rule 4 of the brief (no real participant data in the repo/prompts/fixtures) applies to samples the founder sends — the intake step includes verifying de-identification before anything is stored.

## Acceptance criteria (draft)

- [ ] Eval harness runs in CI on the labelled set; scores logged; regression blocks merge.
- [ ] Accuracy bar met on held-out documents.
- [ ] Hallucination guard test green.
- [ ] Every model call visible in the audit log with prompt version and cost.
- [ ] Human-review queue demonstrated on a below-threshold extraction.
