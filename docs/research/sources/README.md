# Primary source files — status

This folder will hold the actual primary documents (pricing schedule, support catalogue, portal error guides, bulk claim CSV template) once obtained. They are the ground truth for Stage 1.

**2026-08-27 — download attempt from this environment: BLOCKED.** Both direct HTTP fetch (`curl`) and the session's web reader were refused by the network egress proxy for `ndis.gov.au` (error `EGRESS_BLOCKED`; curl exit with no connection). This matches the retrieval caveat noted throughout the dossier: research facts came from search-engine retrieval of official pages, not from the documents themselves.

**What's needed (founder, from any normal browser):**

1. NDIS Pricing Schedule 2026-27 — via https://www.ndis.gov.au/providers/pricing-and-payments/pricing/pricing-arrangements
2. NDIS Support Catalogue 2026-27 (Excel/XLSX) — same page or https://www.ndis.gov.au/providers/pricing-and-payments/pricing/what-support-catalogue
3. "Bulk Payment request self-help guide" and "System and error messages self-help guide" — via https://www.ndis.gov.au/providers/pricing-and-payments/payments/how-troubleshoot-claims-and-payments
4. Bulk Payment Request CSV template — https://www.ndis.gov.au/media/2707/download

Drop them into this folder (or attach them in chat) named as downloaded, and the dossier's UNVERIFIED items get closed against them before any Stage 1 code is written.
