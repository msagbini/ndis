# Competitor Teardown — NDIS Provider and Plan-Manager Software

**Retrieved:** 2026-08-27. Confidence labels: **[VENDOR]** = the company's own page (reliable for features/pricing they publish, biased on quality), **[WEAK]** = review sites and third-party comparisons (paraphrased by search retrieval, not verbatim), **[UNVERIFIED]** = could not confirm. Direct fetches were proxy-blocked; everything came via search retrieval of the cited URLs. Before quoting any price in sales material, re-open the vendor page in a browser.

## Plain-English summary

The incumbents are systems of record for **rostering and care delivery**; billing and claiming are secondary modules — and the reviews show it: incorrect rate calculations, broken accounting syncs, "test the billing before you buy". **Nobody found markets pre-submission claim validation against plan budgets and price limits as their headline product**, and claim-level audit-evidence assembly (every claim carrying its validation trail and supporting evidence) appears genuinely unoccupied. The two closest threats: FlowLogic (provider side, explicitly claims pre-submission checks) and Careview (plan-manager side, has the live NDIA data connection that makes real validation feasible).

## Provider platforms

### ShiftCare — rostering + care management
- **Pricing [VENDOR]:** Essentials **$9**/staff/mo, Growth **$15**, Intelligence **$25** (20% off annually; 5-staff minimum). https://shiftcare.com/pricing
- **User complaints [WEAK, Capterra]:** billing feature "poor… test ShiftCare's billing before making a decision"; accounting integration dropping data, forcing manual re-entry; a reported incident-report visibility issue across teams; "very expensive for small to medium sized businesses". https://www.capterra.com/p/233684/ShiftCare/reviews/
- **Wedge proximity:** generates PRODA-ready bulk claim files (PRODA is the government's provider login system) and has a PRODA submission integration [VENDOR]. Claim-file generation ≠ validation; no evidence of budget/price-limit checking as a feature.

### Brevity — all-in-one NDIS/aged-care
- **Pricing [VENDOR]:** per-client model with an on-page calculator; exact figures not retrievable [UNVERIFIED — a "$4.49/$6.49 per client" figure circulates but was attributed inconsistently; do not quote]. https://www.brevity.com.au/pricing/
- **User complaints [WEAK, Trustpilot/Capterra]:** "repeated incorrect rate calculations, incorrect invoicing, incorrect payruns, and ongoing data errors… locked out of the platform without warning"; support "gotten worse… trying to iron out bugs with PACE integration". https://uk.trustpilot.com/review/brevity.com.au
- **Wedge proximity:** the complaints ARE our pitch — their rate calculation errors are precisely what a deterministic price-limit engine prevents.

### SupportAbility — compliance-oriented practice management
- **Pricing:** not public; third-party estimate ~$20+/active participant/mo [WEAK]. 
- **Complaints [WEAK]:** mobile app overwhelms field workers; post-commitment charges for setup/training.
- **Wedge proximity:** described by third parties as the compliance-strongest incumbent ("guided by audit requirements") — the closest incumbent *framing* to audit evidence, though evidence is secondary only.

### Astalty — NDIS CRM, strongest small-provider momentum
- **Pricing [VENDOR]:** **$64/mo per standard user, $30/mo per support worker**, unlimited participants, no minimums; free "Lite" tier. https://astalty.com.au/pricing
- **Complaints:** none found — retrieved reviews almost exclusively positive [honest gap, not evidence of perfection].
- **Wedge proximity — closest provider-side feature set [VENDOR]:** PRODA bulk file generation, payment reconciliation showing paid/underpaid/**rejected**, budget building "with full access to NDIS pricing arrangements", remaining-funds tracking. But this is **post-submission** rejection visibility; a pre-submission validation gate is implied, not marketed.

### Splose — allied-health practice management
- **Pricing [VENDOR]:** **$27/practitioner/mo** ex GST; AI add-on $27/user/mo. https://splose.com/pricing
- **Complaints [WEAK, Capterra/G2]:** opaque add-on costs; batch invoicing limitations requiring workarounds; Xero sync issues left to users.
- **Wedge proximity:** has NDIS bulk upload; no budget-validation evidence.

### Lumary — Salesforce-based enterprise (~100+ staff)
- **Pricing:** not public; quote-only, Salesforce licensing plus "significant" implementation, 3–6 months [WEAK/secondary].
- **Complaints [WEAK, ProductReview/Trustpilot]:** "lacking even basic functionality required for NDIS providers after spending tens of thousands"; one reviewer alleges clients "if audited, would be found breaking NDIS reporting requirements" (a reviewer's allegation, not a finding).
- **Wedge proximity:** not our segment (we target 5–50 staff), but the audit-compliance complaint shows the pain exists even at enterprise tier.

### Others (thin retrieval)
- **Nightingale** (50+ staff, quote-only), **VisiCase** (quote-only), **MYP** (pricing not public), **CareMaster** (third-party cites A$16–36/user/mo [WEAK]).

## Plan-manager platforms

### Careview — the plan-manager incumbent, and the closest competitor overall
- **Pricing:** **not public** — demo/quote required.
- **Complaints:** no usable review evidence found [honest gap].
- **Wedge proximity [VENDOR]:** **NDIS SyncPro** connects to PRODA and PACE by API — electronic payment-request submission, real-time claim status, service-booking management, instant retrieval of current plan data. Plus "Streamline", an AI invoice-processing add-on. Real-time plan data + AI ingestion is most of the raw material for pre-submission validation, even though they don't market validation as the product. **If Careview ships a validation gate, the plan-manager wedge narrows sharply.** https://www.careviewapp.com/ndis-syncpro/

### FlowLogic (Datanova) — the most explicit validation claim found
- **[VENDOR]:** claims "built-in compliance checks validate every claim against current NDIS requirements before submission", automatic price-guide updates, PRODA integration, PACE sync. Phrased at the price-guide/format level, not plan-budget level. **Pricing not public.** https://flowlogic.com.au/ndis-billing-software/

### Maica — most concretely documented validation mechanics
- **[VENDOR, knowledge base]:** duplicate-invoice prevention; agency-managed invoices "validated against an existing and active Plan as well as any associated Service Booking"; live budget panel during invoice entry; service-agreement price book applied by default. Pricing page exists, figures not retrieved. https://kb.maica.com.au/ndis-management/invoice-management/invoice-entry/alerts-and-validation

## Adjacent category: audit-readiness tools

A separate cluster (Clearline Health, CareVisor, Complynce, RomeoHR, FlowLogic's compliance module) does **Practice-Standards evidence**: policy libraries, credential/screening expiry tracking, audit-ready exports. None found does **claim-level payment-integrity evidence** — the validation trail and supporting documents per claim.

## Honest wedge assessment

1. **Pre-submission validation against plan budget + price limits as the product: unoccupied as a category**, but present as plumbing in FlowLogic (claimed) and Maica (documented), and feasible-any-quarter for Careview.
2. **Claim-level audit evidence: genuinely open.** The audit cluster does HR/policy evidence; claiming platforms do files and reconciliation; nothing combines "every claim carries its validation verdict + evidence, export-ready".
3. **The billing layer is where incumbents bleed in reviews** — Brevity's wrong rates, ShiftCare's "test the billing first", Splose's batch limits. Demand signal, from their own users.
4. **Strategic risk:** we sit on top of platforms that could each extend into validation in one release cycle. Watch **Careview** (plan-manager side) and **FlowLogic** (provider side). Counter-positioning: independence (we validate claims from *any* system) and depth (deterministic engine + evidence trail vs a warning banner).

## Sources

Vendor pages and review URLs are cited inline above (all retrieved 2026-08-27). Full UNVERIFIED list: Brevity/MYP per-client dollar figures; CareMaster and SupportAbility pricing (third-party only); all quote-only vendors' actual prices; Careview user sentiment; whether Lumary/Nightingale validate pre-submission internally; verbatim wording of all review quotes.
