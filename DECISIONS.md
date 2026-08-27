# Decision log

Every consequential decision, newest first. Format: date, decision, why, and how reversible it is. Reversible technical choices are decided by the agent and recorded here (master prompt §13); business, legal, and financial decisions go to the founder.

---

## 2026-08-27 — Libraries: exceljs for spreadsheet parsing, tsx for the CLI demo

**Decision:** `@claimguard/ingestion` uses **exceljs** to read the Support Catalogue XLSX; `@claimguard/cli` uses **tsx** (dev-only) to run TypeScript directly for the `demo` script. Both live outside `packages/rules`, which remains dependency-free and pure.

**Why:** exceljs is actively maintained on npm (SheetJS community builds stopped publishing there); tsx avoids a build step for a demo tool. Reversible library choices per §13 of the brief.

**Reversibility:** Easy — both are isolated behind small interfaces.

## 2026-08-27 — Founder decision: start Stage 1 before the interview verdict

**Decision:** Begin building the Stage 1 rules engine now, without waiting for the Stage 0 interview verdict. Decided explicitly by the founder ("Arranca con el programa es de una"), after the agent twice explained the recommendation to wait and why. Interviews continue in parallel and still decide the business verdict per `docs/go-no-go.md`; a NO-GO stops the build.

**Why:** The founder judged that having the program under way matters more than sequencing purity. The agent's recorded recommendation was to wait for the interview verdict (risk: building the wrong shape before knowing which failure modes and which buyer segment matter most).

**Constraints that do NOT change:** no fabricated domain data — the engine is built and tested against clearly labelled `FIXTURE_` data only; real 2026-27 prices load only when the founder supplies the official Support Catalogue file. Deterministic-only money/eligibility logic. `packages/rules` stays pure.

**Reversibility:** The code is real either way; the risk is wasted shaping, not wasted architecture. Interview findings will re-prioritise rules before Stage 2.

## 2026-08-27 — Founder communication in Spanish

**Decision:** All chat communication and explanations addressed to the founder are in Spanish (their primary language). Customer-facing material (outreach messages, interview script) stays in Australian English, because the interviewees are Australian providers. Repo docs remain in English for now; Spanish versions of the founder-instruction docs can be produced on request.

**Why:** The founder asked for it (2026-08-27). Clear communication with the founder outranks consistency of language.

**Reversibility:** Trivial.

## 2026-08-27 — Backend language: TypeScript on Node.js

**Decision:** TypeScript everywhere (backend, frontend, tooling). Never mixed with Python.

**Why:** The frontend is mandated as React, which is TypeScript territory; one language means types can flow end-to-end from the database to the browser, one toolchain to maintain, and no context-switching for a tiny team. Python's advantages (data-science libraries) don't apply: our core is deterministic business rules and web plumbing, and AI heavy-lifting is done by external model APIs, not local ML.

**Reversibility:** High cost after Stage 1, low now. If a strong reason appears (e.g. a Python-only OCR dependency in Stage 2), an isolated Python worker behind a queue is the escape hatch — not a rewrite.

## 2026-08-27 — Package manager: pnpm with workspaces

**Decision:** pnpm 10, monorepo via `pnpm-workspace.yaml`, packages under `packages/`.

**Why:** The architecture mandates strict separation (`rules/` must be importable with no network/database/AI). A workspace monorepo enforces that as real package boundaries while keeping one repo, one CI run, one version history. pnpm is the fastest and strictest of the mainstream options (it physically prevents importing undeclared dependencies).

**Reversibility:** Easy — npm/yarn migration is mechanical.

## 2026-08-27 — Lint + format: Biome (not ESLint + Prettier)

**Decision:** Biome 2.x as the single linter and formatter, default (tab) formatting, recommended rules.

**Why:** One tool, one config file, no plugin dependency chains, and it is fast enough to run on every save and every CI push. For a solo-maintained repo, fewer moving parts beats ecosystem breadth.

**Reversibility:** Easy — `biome migrate` exists in both directions; formatting churn is one commit.

## 2026-08-27 — Test runner: Vitest

**Decision:** Vitest 4 for all packages.

**Why:** First-class TypeScript and ES modules support with zero config, same assertion style as Jest (the long-time default), faster, and it will later share config with the React frontend.

**Reversibility:** Easy at this stage.

## 2026-08-27 — CI: GitHub Actions

**Decision:** One workflow (`.github/workflows/ci.yml`) running install → lint → typecheck → test on every push and pull request.

**Why:** The repo is hosted on GitHub; Actions is free at this scale and requires no external service or credentials.

**Reversibility:** Easy.

## 2026-08-27 — Working name "Claimguard" is internal-only

**Decision:** Keep "Claimguard" as the internal working name; rename before any public artefact (domain, landing page, outreach material) exists.

**Why:** Mandated by the master prompt. Trademark and domain availability have not been checked; outreach messages in the interview kit therefore avoid using the name.

**Reversibility:** That's the point — decided before anything public exists.
