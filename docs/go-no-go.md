# Go / No-Go Threshold for Stage 0 Customer Validation

**Status:** **AGREED — binding.** Approved by the founder in writing ("Umbral aprobado") on 2026-08-27, before any interview ran. The bar below can no longer be moved after seeing results.

## Why this document exists

Desk research says NDIS providers lose money to rejected claims and dread audits. Desk research is cheap and often wrong. Before building anything, we test the claim against real people. This document fixes, in advance, exactly what result counts as "build it" — so that neither optimism nor sunk effort can bend the interpretation later.

## The threshold (proposed)

From **at least 10 completed interviews** with people who are decision-makers or day-to-day operators at NDIS providers (5–50 staff) or NDIS plan managers:

1. **Pain:** at least **60%** report at least one of the following in the last 12 months:
   - a claim that was rejected, cancelled, or clawed back, or
   - audit preparation they describe as painful, costly, or frightening (in their words — the scoring sheet defines what counts).
2. **Willingness to pay proxy:** at least **50%** currently spend **A$150 or more per month** on operations software (rostering, care management, accounting — anything they pay for to run the business).

**Both** conditions must pass. Pain without spend means a market that hurts but doesn't buy software.

### Secondary signals (recorded, not gating)

These don't decide go/no-go but inform Stage 1 priorities:

- How they check claims today (person, spreadsheet, nothing).
- Whether anyone asks unprompted "can I try it?" or offers to pilot.
- Which hurts more: rejected claims (cash flow) or audit prep (existential risk).

## What each outcome means

| Result | Verdict | What we do |
|---|---|---|
| Both conditions pass | **GO** | Proceed to Stage 1 (rules engine). Interview notes feed the golden set design. |
| Pain passes, spend fails | **PIVOT candidate** | The problem is real but this segment may not pay. Consider: target plan managers only (higher volume, clearer ROI), or larger providers. New mini-round of interviews before any code. |
| Pain fails | **NO-GO** | The core premise is wrong or overstated. Stop. Write up what we learned. Any pivot starts from new evidence, not from re-reading the same desk research. |
| Fewer than 10 completed interviews after reasonable effort (≈40+ outreach attempts over ~3 weeks) | **Inconclusive** | The difficulty of reaching the market is itself a finding — it predicts the difficulty of selling to it. Discuss before spending more. |

## Honesty clause

If the interviews fail the threshold, the agent's report will say so plainly and recommend stopping or pivoting. Being agreeable is not a service; wasting a year building for a market that won't pay is the actual harm.

## Counting rules (so the arithmetic can't be argued later)

- A "completed interview" = the essential (★) questions in `docs/interviews/interview-script.md` were answered.
- Percentages are computed over completed interviews only.
- One organisation = one interview for counting, even if two people joined the call.
- The agent fills in `docs/interviews/scoring-sheet.md` from the founder's raw notes and shows the arithmetic. The founder checks the verdict, not the adding-up.
