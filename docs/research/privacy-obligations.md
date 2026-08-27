# Privacy Act Obligations for This Product

**Retrieved:** 2026-08-27. **We are not lawyers** — this file maps the terrain and flags what needs Australian counsel; nothing here is legal advice. Method note: the session proxy blocked direct page fetches (including oaic.gov.au and legislation.gov.au), so facts come from search-based retrieval of the cited pages; quotes are as-retrieved, not page scrapes. Labels used: **LEGAL REQUIREMENT** (the law, per OAIC/legislation), **BEST PRACTICE** (expected but not statutory), **OUR RECOMMENDATION** (our design position). Confidence: findings below trace to OAIC's own pages unless marked otherwise.

## Plain-English summary

We will hold NDIS participant data, which is health information — the most protected category under Australian privacy law. The Privacy Act 1988 and its Australian Privacy Principles ("APPs" — 13 rules covering collection through destruction) will apply to us in full: the usual small-business exemption is not something we can or should rely on. Two 2024-25 law changes matter specifically to us: individuals can now sue directly for serious privacy invasions (since June 2025), and from **10 December 2026** privacy policies must disclose automated decision-making — which describes our product almost exactly.

## 1. The Act applies to us — plan on full coverage

- **LEGAL REQUIREMENT:** Health information is "sensitive information" under the Privacy Act, attracting extra protections. (OAIC, Guide to health privacy.)
- **LEGAL REQUIREMENT:** The small-business exemption (turnover ≤ A$3M) does **not** cover organisations that "provide a health service and hold health information" — they're covered regardless of size. (OAIC, small business page.)
- **NEEDS COUNSEL:** Whether a B2B SaaS that *processes* providers' participant data itself "provides a health service" is not settled by anything we retrieved. Related hooks that may capture us anyway (trading in personal information; Commonwealth contracted service providers) were seen but not verified verbatim.
- **OUR RECOMMENDATION:** Build as if fully covered from day one (a formal opt-in mechanism exists if ever needed). Being "arguably exempt" is worthless in enterprise sales anyway — customers will demand APP compliance contractually.

## 2. The APPs that shape the product

- **APP 3 & 6 — collection and use** (collecting sensitive information generally needs consent; use limited to the purpose collected for). Detail **UNVERIFIED this session** — chapters not retrieved; close before Stage 4 design. **NEEDS COUNSEL** for the consent chain: participants consent to the *provider*; what covers the provider passing data to *us* (likely contractual + privacy policy, but confirm).
- **APP 8 — cross-border disclosure.** See §5 (data residency).
- **APP 11 — security. LEGAL REQUIREMENT:** reasonable steps to protect personal information; the 2024 amendments added APP 11.3 clarifying this includes "technical and organisational measures". (OAIC, APP guidelines ch. 11, updated Oct 2025.)
- **APP 11.2 — destruction. LEGAL REQUIREMENT:** when information is no longer needed for any permitted purpose, take reasonable steps to destroy or de-identify it — *except* where retention is required by law. That exception is the bridge to the NDIS seven-year record-keeping rule (see `record-keeping.md`): **OUR RECOMMENDATION:** the deletion engine models, per record class, "which law requires me to keep this and until when", then destroys.
- **APP 12 & 13 — access and correction.** Individuals can request access/correction. Detail UNVERIFIED this session. **OUR RECOMMENDATION:** design data export per participant early; retrofitting is painful.
- **APP 1 — open management.** Becomes the ADM hook below.

## 3. Automated decision-making transparency — commencing 10 December 2026 — this is about us

- **LEGAL REQUIREMENT (commencement confirmed from OAIC):** "From 10 December 2026, APP entities that use personal information in ADM with the potential to affect rights or interests will be required to provide information in their privacy policies about the kinds of personal information used and the kinds of decisions made using ADM." Mechanism: amends APP 1 (privacy policy content). Captures decisions "made by, or substantially supported by, a computer program" that "could reasonably be expected to significantly affect" someone's rights or interests. It is a **disclosure obligation, not a prohibition**. (OAIC consultation page + ADM issues paper; 24-month commencement from the Act's 10 Dec 2024 assent.)
- Why it's us: an automated validator that blocks or flags claims "substantially supports" decisions affecting providers' payment and participants' funded supports.
- **Who discloses:** our provider/plan-manager customers in their privacy policies — and we in ours. **OUR RECOMMENDATION:** (a) ship a template ADM disclosure paragraph to customers as a product feature (compliance is our value proposition — this is free product surface); (b) our deterministic rules engine with explainable reason codes is exactly the architecture that makes this disclosure easy and honest. OAIC guidance was still in consultation at retrieval — track it. **NEEDS COUNSEL:** final wording of both policies before 10 Dec 2026.

## 4. Other live obligations

- **Statutory tort for serious invasions of privacy — LEGAL REQUIREMENT, commenced 10 June 2025** (OAIC): individuals can sue directly for intrusion upon seclusion or misuse of information; damages include emotional distress; applies even beyond APP entities. Raises the stakes of any breach or over-collection.
- **Tiered civil penalties** (2024 amendments): new mid-tier and low-tier penalties with infringement-notice powers — enforcement no longer requires a "serious" interference. (OAIC media release/submission.)
- **Notifiable Data Breaches scheme — LEGAL REQUIREMENT:** notify OAIC and affected individuals when a breach is "likely to result in serious harm" and remediation hasn't removed that likelihood; assess suspected breaches within 30 days maximum (OAIC expects much faster). **NEEDS COUNSEL / CONTRACT DESIGN:** who notifies — us or the provider customer — for jointly held data; not resolved by anything retrieved. **OUR RECOMMENDATION:** answer this in our standard customer contract, not during an incident.
- Children's Online Privacy Code: in development; unlikely to hit a B2B SaaS directly, but we hold minors' data via providers — **NEEDS COUNSEL** at Stage 4.

## 5. Data residency: what is law vs what the market expects

- **LEGAL REQUIREMENT (accountability, not localisation):** APP 8 + s 16C — before disclosing personal information overseas, take reasonable steps to ensure the recipient complies with the APPs; if they mishandle it, *we* are treated as the breacher. Exceptions include substantially-similar-law regimes and informed consent. So offshore hosting is **not prohibited** — we'd just wear full liability for it. (OAIC, APP guidelines ch. 8.)
- **LEGAL REQUIREMENT, narrow:** the My Health Records Act's Australia-only storage rule applies **only** to My Health Record data, which we don't touch (secondary source; verbatim UNVERIFIED).
- **No NDIS-specific residency statute was found.** Caveat: the NDIS Practice Standards could not be fetched this session, so a residency clause there can't be positively excluded — cross-check against `practice-standards.md` findings and close before Stage 4.
- **BEST PRACTICE / market expectation:** Australian hosting is a procurement checkbox in this sector; incumbents market it.
- **OUR RECOMMENDATION:** Host in an Australian region regardless (already in `ARCHITECTURE.md`). It removes the APP 8 analysis, matches buyer expectations, and costs little. Watch for LLM API calls being an *overseas disclosure* — model endpoints must be region-pinned or the data de-identified before any prompt leaves the country. This constraint feeds Stage 2/4 design directly.

## Items for Australian counsel (running list)

1. Are we a "health service provider" under the Act, and does any small-business analysis matter? (§1)
2. Consent chain for provider → us data flows; contents of our customer data-processing terms. (§2)
3. ADM disclosure wording for our policy and the customer template, before 10 Dec 2026. (§3)
4. Breach-notification responsibility allocation in customer contracts. (§4)
5. Minors' data handling and the Children's Online Privacy Code. (§4)
6. Confirm APP 3/6/12/13 detail and the small-business covered-categories list from primary text. (§2)

## Sources (retrieved 2026-08-27, via search retrieval; re-open in a browser before relying on wording)

- https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/health-service-providers/guide-to-health-privacy
- https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business
- https://www.oaic.gov.au/privacy/your-privacy-rights/health-information/what-is-a-health-service-provider
- https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-quick-reference
- https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-11-app-11-security-of-personal-information
- https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-8-app-8-cross-border-disclosure-of-personal-information
- https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/handling-personal-information/sending-personal-information-overseas
- https://www.oaic.gov.au/engage-with-us/consultations/consultation-on-guidance-for-transparency-in-automated-decision-making (ADM commencement)
- https://www.oaic.gov.au/__data/assets/pdf_file/0027/263925/ADM-Issues-Paper.pdf
- https://www.oaic.gov.au/privacy/your-privacy-rights/more-privacy-rights/statutory-tort-for-serious-invasions-of-privacy
- https://www.oaic.gov.au/news/media-centre/pasing-of-bill-a-significant-step-for-australias-privacy-law
- https://www.oaic.gov.au/privacy/notifiable-data-breaches/about-the-notifiable-data-breaches-scheme (and related NDB pages)
- https://www.legislation.gov.au/C2024A00128/asmade/text (Act; text not opened this session)
- Secondary (labelled): jws.com.au ADM analysis; sognos.com.au on MHR s 77; ndiscompliant.com.au on digital records
