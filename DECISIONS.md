# Decision log

Every consequential decision, newest first. Format: date, decision, why, and how reversible it is. Reversible technical choices are decided by the agent and recorded here (master prompt §13); business, legal, and financial decisions go to the founder.

---

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
