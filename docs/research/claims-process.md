# How NDIS Claiming and Pre-Payment Review Work Today

**Retrieved:** 2026-08-27. Same method note and confidence labels as `pricing-arrangements.md` (**[OFFICIAL]** / **[WEAK]** / **[UNVERIFIED]**): direct page fetches were proxy-blocked, so facts come from search-result snippets of the cited pages.

## Plain-English summary

Providers deliver a support, then ask the NDIA for payment ("make a claim"). For years the NDIA paid almost everything automatically and checked afterwards. That has reversed: the agency now runs automated checks and targeted human reviews **before** paying, and cancels a large share of what it reviews. A rejected claim can't be edited — the provider must fix the problem and submit a fresh claim, with the cash delayed the whole time. This "prove it before you're paid" shift is the market moment the product is built for, and it is documented by the national audit office, not just vendor marketing.

## The systems: PACE and two portals

- **PACE** is the NDIA's business computer system, introduced **30 October 2023** alongside the new **my NDIS provider portal** [OFFICIAL — NSW government source expands PACE as "Provider and Participant Communication Environment"; the NDIA's own expansion of the acronym is UNVERIFIED].
- Rollout was staged from late 2023, with existing plans transitioning as they expired from about February 2024 [OFFICIAL — peak body NDS]. Vendors report the transition completed around mid-2025, meaning effectively the whole scheme now runs on PACE [WEAK — no official completion announcement retrieved].
- Claiming today is bulk-first: for plans in the new system, *"single claims will not be accepted via the myplace provider portal"* — providers *"submit all claims via the bulk upload process"* [OFFICIAL snippet]. The **bulk payment request is a CSV file uploaded through the myplace provider portal** [OFFICIAL]. A current guide, "my NDIS provider portal June 2026", exists [OFFICIAL].

## The bulk claim format (directly relevant to our product)

The NDIA publishes a bulk payment request CSV template and guides [OFFICIAL]. Retrieved column list:

`RegistrationNumber, NDISNumber, SupportsDeliveredFrom, SupportsDeliveredTo, SupportNumber, ClaimReference, Quantity, Hours, UnitPrice, GSTCode, AuthorisedBy, ParticipantApproved, InKindFundingProgram, ClaimType, CancellationReason, ABN of Support Provider`

Format rules with rejection consequences [OFFICIAL snippets]: filename max 20 characters including `.CSV`; dates strictly `YYYY-MM-DD` "otherwise your claim will be rejected". Claim-type codes must be capitalised (see `pricing-arrangements.md`).

**Product implication:** our validation layer can (and should) validate the exact artefact the NDIA receives — the CSV — not an abstraction of it.

## Pre-payment checking: what actually happens now

- The ANAO (Australian National Audit Office — the federal auditor) reported in 2025 (Report No. 48 of 2024-25) that the NDIA's management of claimant compliance was **"partly effective"** and that the scheme was *"designed and implemented (up until 2024) without basic prevention controls, such as clear claim requirements and robust identity verification and pre-payment validation processes"* [OFFICIAL — ANAO].
- **Automated pre-payment checks** (since 2022-23) verify: service date is in the past; the claim is not a duplicate; the plan has sufficient budget [OFFICIAL — ANAO].
- **Manual pre-payment reviews** are risk-targeted, cover only ~0.4% of outlays — but **over 50% of reviewed claims by dollar value get cancelled** [OFFICIAL — ANAO]. That cancellation rate is the single most important number in this file: when the NDIA looks closely, most of what it looks at (by value) fails.
- The **Crack Down on Fraud program** ($732.9m over three tranches, 2024–2026) is remediating those gaps [OFFICIAL — ANAO/NDIA]. NDIA news (Oct 2025): "$86 million in dodgy NDIS claims blocked" — 100,000+ claims reviewed in 2024-25 through **pre-payment reviews (PPR)** and **manual payment reviews (MPR)**, now running at ~20,000 high-risk claims reviewed per month [OFFICIAL — NDIA news].
- Legislation reportedly passed April 2025 (Integrity and Safeguarding Bill) mandates electronic claim forms and lets the NDIA demand evidence before paying [WEAK — media report only; confirm on legislation.gov.au].

## What a provider actually sees when a claim fails

- Rejection surfaces in the **myplace provider portal**: *"the error message will show the reason why the claim has not been processed"*; for bulk files, the provider drills into each incomplete payment request in the uploaded file [OFFICIAL snippets].
- Failures come in two layers [OFFICIAL guidance]:
  1. **Upload-time validation** — wrong date format, missing field, price over the cap, filename too long.
  2. **Processing rejections** — no plan covering the service dates, support not funded in the plan, provider not recorded against the participant, funding exhausted.
- A claim in **'Rejected' status cannot be edited** — a new payment request must be created [OFFICIAL snippet]. Exact status wording in the newer my NDIS portal: [UNVERIFIED].
- The NDIA publishes error documentation: a *Bulk Payment request self-help guide* (rejection reasons) and a *System and error messages self-help guide* [OFFICIAL]. Third-party error-code tables exist [WEAK]. **Stage 1 must obtain these two official guides — they are effectively the specification for our reason codes.**

## Timeframes and held claims

- Valid claims: paid **2–3 business days**; up to **~10 business days** if the provider isn't recorded against the participant or the NDIA checks accuracy [OFFICIAL].
- Claim under review: put on hold, provider notified **in writing**, at least **14 business days** to supply evidence, review can take **up to 28 days** [OFFICIAL].
- **Manual payment review** (all of a provider's claims held pre-payment where misuse/fraud is suspected): evidence requested (14 days), then if insufficient, reasons given and a further 14 days, then final decision [OFFICIAL].
- Cash-flow arithmetic for our pitch: a provider on manual review can have their entire claim pipeline frozen for a month or more.

## Must close before Stage 1

1. Download the bulk payment CSV template and both self-help guides (rejection reasons; system/error messages) and treat them as the source spec for reason codes.
2. Confirm PACE rollout completion status from an official source.
3. Confirm the Integrity and Safeguarding Act 2025 provisions on legislation.gov.au.
4. Get screenshots/wording of the current portal rejection experience from a real provider (interview opportunity — Q4/Q5 in the interview script).

## Sources (retrieved 2026-08-27)

- https://www.ndis.gov.au/providers/working-provider/getting-paid/claims-and-payments-our-new-computer-system
- https://www.ndis.gov.au/providers/working-provider/getting-paid/bulk-payments
- https://www.ndis.gov.au/media/2707/download (Bulk Payment Request template)
- https://www.ndis.gov.au/media/3152/download, https://www.ndis.gov.au/media/7650/download, https://www.ndis.gov.au/media/2018/download (bulk claiming guides)
- https://ndis.gov.au/media/8697/download ("my NDIS provider portal June 2026")
- https://www.ndis.gov.au/providers/pricing-and-payments/payments/how-troubleshoot-claims-and-payments
- https://www.ndis.gov.au/providers/working-provider/getting-paid/claims-and-payments-troubleshooting
- https://www.ndis.gov.au/media/3150/download (System and error messages self-help guide)
- https://www.ndis.gov.au/providers/pricing-and-payments/payments/guide-getting-paid
- https://www.ndis.gov.au/providers/pricing-and-payments/payments/what-manual-payment-review
- https://www.ndis.gov.au/about-us/improving-integrity-and-preventing-fraud/manual-payment-reviews
- https://www.ndis.gov.au/about-us/improving-integrity-and-preventing-fraud/crack-down-fraud
- https://www.ndis.gov.au/news/10956-86-million-dodgy-ndis-claims-blocked
- https://www.anao.gov.au/work/performance-audit/ndia-management-of-claimant-compliance-with-ndis-claim-requirements (and the report PDF)
- https://www.tag.nsw.gov.au/news/ndis-introduced-new-computer-system-pace
- https://nds.org.au/news/ndia-to-use-staged-approach-to-national-pace-rollout
- https://www.themandarin.com.au/314214-agencies-get-proactive-to-combat-ndis-fraud-and-non-compliance/ (media)
