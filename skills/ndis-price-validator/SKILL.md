---
name: ndis-price-validator
description: Import a new NDIS Support Catalogue spreadsheet into the versioned price data the rules engine uses, and verify nothing regressed. Use whenever a new or amended official price file arrives (every 1 July, plus mid-year amendments) or when the founder supplies the official 2026-27 files for the first time.
---

# ndis-price-validator

The repeatable procedure for loading official NDIS price data. Prices change every 1 July plus mid-year amendments; each change is a new **versioned** catalogue entry, never an edit to an old one — a claim is always validated against the version in force on its service date.

## Preconditions

- The official file (NDIS Support Catalogue XLSX) supplied by the founder, with where/when it was downloaded. **Never** hand-type prices or invent items; if there is no official file, stop.
- Record the download provenance — it goes into the data.

## Procedure

1. **First time with a real official file:** expect the header check to fail — the parser (`packages/ingestion/src/catalogueParser.ts`) is built against a canonical layout, not the official one (unobtainable from this environment when written). Read the error's `Expected vs Found`, adjust the header mapping in `EXPECTED_HEADERS` (and column semantics if needed) deliberately, and add a test that loads the real file's bytes. Never make the parser guess.
2. Run the import:

   ```bash
   pnpm --filter @claimguard/ingestion import -- <catalogue.xlsx> \
     --version-id "2026-27-v1.0" \
     --source "NDIS Support Catalogue 2026-27 v1.0, downloaded YYYY-MM-DD from ndis.gov.au" \
     --from 2026-07-01 --to 2027-06-30 \
     --out seed/catalogue-2026-27-v1.0.json
   ```

3. Record the printed **SHA-256** and row count in `DECISIONS.md` (or the data's PR description) next to the download provenance.
4. **Close the previous version's window:** set the prior version's `effectiveTo` to the day before the new `effectiveFrom` (amendments mid-year make this a real edit, not a formality). Versions must not overlap and must not leave gaps.
5. Verify: `pnpm lint && pnpm typecheck && pnpm test` — the golden set must stay green (it runs on FIXTURE data and is unaffected by real prices; if it is affected, something touched the engine, stop and investigate).
6. Sanity-check the new data against the source document: pick 3 items across categories and compare their price limits by eye with the official PDF/Schedule. Money data gets a human glance, always.
7. Commit the JSON + any parser mapping change together, with the sha256 in the commit message.

## What this skill must never do

- Invent, round, or "fix" a price or support item code.
- Edit an existing catalogue version's prices (a correction is a new version with provenance).
- Proceed past a parser rejection by loosening validation instead of understanding the difference.
