# NDIS Pricing: the Pricing Schedule, Support Catalogue, and how prices work

**Retrieved:** 2026-08-27. **Method note:** this session's network proxy blocked direct fetches of ndis.gov.au pages, so findings come from search-result snippets of the cited official pages, corroborated across sources. Each fact carries a confidence label: **[OFFICIAL]** = from an ndis.gov.au / government page title or snippet; **[WEAK]** = vendor/blog/third-party only; **[UNVERIFIED]** = could not be confirmed. Before Stage 1 builds a price table, the primary documents must be downloaded and the UNVERIFIED items closed — listed at the end.

## Plain-English summary

The NDIA (National Disability Insurance Agency — the government agency that runs the NDIS) sets a **maximum price** for almost every fundable support. A provider can charge less, never more; a claim above the cap is rejected. Each support has a **support item number** (a unique code like `01_661_0128_1_3` [WEAK example]) that a provider must quote when claiming. The prices change **every July**, with mid-year amendments — which is exactly why providers struggle to stay current, and why our product must treat the price table as versioned, dated data, never as constants in code.

## The current documents (as of August 2026)

- For 2026-27 the NDIA **restructured its pricing publications**. The single document previously called the *NDIS Pricing Arrangements and Price Limits* ("PAPL") has been split; the key pricing document is now the **"National Disability Insurance Scheme Pricing Schedule 2026-27"** [OFFICIAL title, retrieved from ndis.gov.au search results], reportedly released 22 June 2026 and effective **1 July 2026** [WEAK for the exact release date].
- Hosted from the official page "Pricing arrangements": `https://www.ndis.gov.au/providers/pricing-and-payments/pricing/pricing-arrangements` [OFFICIAL]; direct document link seen: `https://www.ndis.gov.au/media/8703/download` [OFFICIAL title match].
- A **version 1.2** of the 2026-27 schedule appears to exist [UNVERIFIED — seen only in a third-party re-upload's filename]. Prior years show the pattern: e.g. PAPL 2025-26 v1.1 took effect 24 Nov 2025 [WEAK], announced via official news (`ndis.gov.au/news/10778`) [OFFICIAL].

## Machine-readable form — this is what Stage 1 will parse

- The **NDIS Support Catalogue 2026-27** is published as an **XLSX (Excel) spreadsheet** (~126 KB) [OFFICIAL snippet]. Explainer page: `https://www.ndis.gov.au/providers/pricing-and-payments/pricing/what-support-catalogue` [OFFICIAL].
- Per the official description, the catalogue holds, per support item: the maximum price the NDIA considers appropriate, **which claim type applies**, registration group numbers/names, support category numbers/names, whether a quote is required, claim period, and **separate price columns for remote and very remote areas** [OFFICIAL snippet]. The Pricing Schedule holds support item number, name, unit, and national/remote/very-remote maximum prices [OFFICIAL snippet].
- Whether a CSV variant exists for 2026-27: [UNVERIFIED] (existed in prior years).

## How pricing actually works (facts our rules engine must model)

- **Price limits are maximums** — charging less is allowed, more is not [OFFICIAL/WEAK combined].
- **Time-of-day / day-of-week loadings:** separate rates for weekday, evening, Saturday, Sunday, public holiday, and sleepover shifts. 2026-27 support-worker figures reported: weekday $73.58/hr (up 4.8% after the Fair Work wage decision and superannuation moving 11.5%→12%), evening $81.07, Saturday $103.54, Sunday $133.50, public holiday $163.46, sleepover $311.79/shift [WEAK — vendor figures; must be confirmed from the Schedule itself before use].
- **Geographic loadings:** national pricing in MMM 1–5 areas; **remote (MMM 6) +40%**, **very remote (MMM 7) +50%** [WEAK, but consistent with the official catalogue's remote/very-remote columns]. (MMM = Modified Monash Model, the government's remoteness classification.)
- **Claim types** in the bulk claiming format [OFFICIAL — from NDIA portal guides]: blank = standard service, `CANC` = cancellation, `REPW` = report writing, `TRAN` = provider travel, `NF2F` = non-face-to-face, `THLT` = telehealth, `IRSS` = irregular SIL supports. Codes must be capitalised. Cancellation reason sub-codes exist (health / family / transport / other); exact code spelling [UNVERIFIED — one snippet showed "NDDH" where "NSDH" is expected].
- **Update cadence:** annual on 1 July, driven by the **Annual Pricing Review** (`.../what-annual-pricing-review-apr`) [OFFICIAL], plus mid-year amendment versions [OFFICIAL pattern]. 2026-27 changes reported: psychology up 8.6% to $252.99; cuts to dietetics, exercise physiology, "Other Professional" rate; OT/speech/physio/podiatry/audiology unchanged; COVID addendum removed [all WEAK — vendor summaries of the APR].
- A May 2026 bill ("Securing the NDIS for Future Generations") reportedly gives the Minister power to make pricing determinations, with assent ~20 Aug 2026 [UNVERIFIED — legislation.gov.au was unreachable].

## What this means for the product

1. Price validation must be **versioned by effective date**: a service delivered 30 June is checked against the old schedule, 1 July against the new one — and mid-year amendments mean more than one version per financial year.
2. The Support Catalogue XLSX is the natural ingestion source; the parser must survive annual format drift and never hard-code column positions without a checksum/shape test.
3. Claim-type and cancellation codes are part of validation (a lowercase code alone can reject a claim).

## Must close before Stage 1 (UNVERIFIED list)

1. Download the actual Pricing Schedule 2026-27 and Support Catalogue 2026-27 from ndis.gov.au on an unrestricted connection; confirm exact version number and effective dates from the documents themselves.
2. Confirm every dollar figure above from the primary document (all currently WEAK).
3. Confirm cancellation reason code spellings from the NDIA bulk payment guide.
4. Confirm whether a CSV catalogue variant exists for 2026-27.
5. Confirm the "Securing the NDIS for Future Generations" Act status and whether ministerial pricing determinations change the update cadence.

## Sources (retrieved 2026-08-27)

- https://www.ndis.gov.au/providers/pricing-and-payments/pricing/pricing-arrangements
- https://www.ndis.gov.au/media/8703/download (Pricing Schedule 2026-27)
- https://www.ndis.gov.au/providers/pricing-and-payments/pricing/what-support-catalogue
- https://www.ndis.gov.au/providers/pricing-and-payments/pricing/pricing-updates
- https://www.ndis.gov.au/providers/pricing-and-payments/pricing/what-annual-pricing-review-apr
- https://www.ndis.gov.au/news/11589-ndia-has-released-annual-pricing-review-apr-report
- https://www.ndis.gov.au/news/10778-2025-26-ndis-pricing-arrangement-and-price-limits-released
- https://www.ndis.gov.au/media/6341/download ("Explaining the NDIS Pricing Arrangements and Price Limits")
- https://www.ndis.gov.au/media/7739/download (PAPL 2025-26); https://www.ndis.gov.au/media/7150/download (PAPL 2024-25)
- Weak-evidence corroboration: provider360.com.au, mycarespace.com.au, kandacare.com.au, labourcare.com.au, daar.com.au, providerscout.com.au, teiro.com.au, scribd.com (labelled inline)
