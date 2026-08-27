# Stage 1 Plan — Deterministic Rules Engine + Test Harness

**Status: ACTIVE — started 2026-08-27 by explicit founder decision** (recorded in `DECISIONS.md`: the founder chose to start before the interview verdict; interviews continue in parallel and still decide the business verdict). Build order adjusted: everything runs against `FIXTURE_` data first; the real 2026-27 catalogue plugs in when the founder supplies the official file. Interview findings will re-prioritise rules and golden-set weighting as they arrive.

## Goal

A pure, dependency-free TypeScript package (`packages/rules`) that takes structured claim data + structured plan/pricing data and returns a deterministic verdict (`PASS` / `FAIL` / `NEEDS_REVIEW`) with machine-readable reason codes. Gate: **100% of golden-set cases pass.**

## Scope

1. **Data contracts** (pure types, no I/O): `ClaimLine`, `Plan`, `BudgetLineItem`, `SupportItem`, `PriceLimit` (versioned by effective date), `RuleResult` with reason codes.
2. **Rules, each pure and individually tested:**
   - Support item exists in the catalogue version effective on the service date
   - Unit price ≤ price limit (national/remote/very-remote variant per provider location claim)
   - Service date within plan start/end; date not in the future
   - Claim type / cancellation code validity (capitalised codes, valid combinations)
   - Budget: line fits remaining category budget (arithmetic in integer cents, never floats)
   - Duplicate detection (same participant + item + date + provider heuristics)
   - Bulk CSV shape validation mirroring NDIA upload rules (dates `YYYY-MM-DD`, required fields, filename length)
3. **Pricing data ingestion (build-time, not runtime):** parser for the official Support Catalogue XLSX → versioned JSON in `seed/` with checksum + shape tests. Input = the real file the founder downloads (see `../research/sources/README.md`). **Never hand-typed price data.**
4. **Golden set:** `seed/FIXTURE_golden-set/` — curated known-good and known-bad claims with expected verdicts + reason codes. Sources: NDIA published rejection reasons (the two self-help guides), interview stories (each real rejection a provider describes becomes an anonymised case), and boundary cases per rule. All fixture data clearly fake (FIXTURE_ prefix, invented NDIS numbers in an invalid range) — no real participant data, no invented support item codes (only codes present in the real catalogue).
5. **Harness:** golden-set runner in CI; a regression fails the merge. 100% branch coverage target on `rules/`.

## Out of scope

Database, API, UI, LLM anything, document ingestion (Stage 2), evidence mapping (Stage 3). No network or filesystem access inside `rules/` — enforced by a test that imports the package in isolation.

## Blockers to clear before starting (from Stage 0)

1. Real Pricing Schedule 2026-27 + Support Catalogue 2026-27 files from the founder (proxy blocks downloads here).
2. The two NDIA self-help guides (bulk rejection reasons; system/error messages) — they are the spec for our reason codes.
3. Confirm cancellation-code spellings and whether a CSV catalogue variant exists (dossier UNVERIFIED items).
4. Interview findings: which failure modes providers actually hit, to prioritise rule order and golden-set weight.

## Open questions (to resolve at stage start, not now)

- Is validation of the NDIA bulk CSV itself (pre-upload lint) part of Stage 1 or Stage 2 ingestion? Draft position: the *format rules* live in `rules/`; file parsing lives in `ingestion/`.
- How to model MMM remoteness (1–7 geographic classes) without an address-geocoding dependency — likely: postcode→MMM lookup table as versioned seed data, with provenance.

## Acceptance criteria

- [x] Golden set ≥ 100 cases spanning every rule and every reason code; 100% pass. (102 cases — 79 engine, 23 CSV — covering all 26 reason codes; 129 tests green.)
- [x] `rules/` at 100% branch coverage (131/131 branches, 161/161 statements); purity enforced by `purity.test.ts` (no non-relative imports, no runtime deps, no ambient time/randomness).
- [ ] Catalogue parser round-trips the real 2026-27 XLSX with a checksum test. **← BLOCKED on the founder downloading the official files** (`docs/research/sources/README.md`); the engine consumes catalogue data as input, so this plugs in without engine changes.
- [x] A price-limit change between catalogue versions produces different verdicts for the same claim on either side of the effective date (golden cases "6100 under old version limit" / "6100 under new version limit").
- [x] CI green; founder demo shown (live run: PASS / PRICE_ABOVE_LIMIT / SERVICE_DATE_IN_FUTURE / DUPLICATE_IN_BATCH with plain-English reasons).
- [ ] Reason codes mapped to the NDIA's official rejection reasons — **needs the two NDIA self-help guides** (same founder download).
