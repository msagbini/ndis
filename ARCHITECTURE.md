# Architecture (intent)

This document describes the technical shape the product **will** have. In Stage 0 almost none of it exists yet — it is written down now so every later stage builds toward the same picture, and so that any change of direction is a recorded decision rather than drift.

## The one rule that matters most: the deterministic / AI boundary

The product's credibility rests on this split:

**Always deterministic code (plain, testable logic — never AI):**

- Matching a claim line to a plan, a budget category, and a price limit
- All arithmetic: totals, GST, remaining balances
- Date logic: plan validity, service dates, expiry of screenings/insurance/registration
- Duplicate detection
- The pass/fail verdict itself and its reason codes

**May use AI (a large language model), always schema-validated, with human approval on anything consequential:**

- Extracting structured fields from unstructured documents (shift notes, invoices, PDFs)
- Explaining a failed rule in plain English
- Drafting corrective notes or evidence summaries
- Suggesting which quality-standard indicator a piece of evidence supports

AI output that feeds any decision must be structured (machine-checkable format), carry a confidence signal, and be routed to human review below a threshold. The rules engine consumes structured data only — never free text. A test will assert that no payment/eligibility verdict can bypass the rules engine.

## Planned repository layout

```
packages/
  rules/       Pure claim-validation logic. No network, no database, no AI.
               Importable and testable in complete isolation. Exists now as a placeholder.
  ingestion/   Document intake and extraction pipelines.
  ai/          The single internal abstraction over LLM access: model routing,
               fallback, per-tenant cost caps, prompt versioning, full audit logging.
  api/         The HTTP API.
  web/         React frontend, server-side rendered, typed end-to-end against the API.
  jobs/        Durable queue workers: OCR, nightly rule re-evaluation, expiry sweeps,
               evidence-pack compilation. Idempotent (safe to run twice).
  db/          Schema, versioned reversible migrations, row-level security policies.
skills/        Reusable agent procedures (see master prompt §6).
seed/          Seed and fixture data. Fixture files are prefixed FIXTURE_ and never
               contain real participant data or invented support item codes.
docs/          Research, plans, decisions, threat model.
```

## Technical baseline (from the master prompt, confirmed in DECISIONS.md)

- **Language:** TypeScript on Node.js, one language end to end.
- **Database:** PostgreSQL with row-level security ("RLS" — the database itself refuses to return another organisation's rows, so tenant isolation does not depend on application code being bug-free). Every table carries `organisation_id`.
- **Migrations:** versioned, reversible, in the repo, never hand-edited in production.
- **Files:** encrypted object storage in an Australian region, signed time-limited URLs, no public buckets.
- **Observability:** structured logs, traces, error tracking; personally identifiable information is redacted at the logging boundary.
- **Audit:** `AuditLog` is append-only; for AI-assisted actions it records the model, prompt version, and whether a human approved.
- **Retention:** deletion is soft first; hard deletion only via an explicit, logged, permissioned job honouring the seven-year retention rule (longer for records concerning participants who were minors).

## Core entities (Stage 4 data model)

`Organisation`, `User`/`Role`, `Participant`, `Plan`, `BudgetLineItem`, `SupportItem`, `PriceLimit`, `ServiceRecord`, `Claim`, `ClaimLine`, `RuleResult`, `EvidenceItem`, `Worker`, `Credential`, `Incident`, `AuditPack`, `AuditLog`.

## What we will never build

Rostering, payroll/award interpretation, a general CRM, a care-delivery mobile app, a generic AI chatbot, or autonomous writes into any government portal without an explicit human approval step.
