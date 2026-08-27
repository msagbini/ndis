# Record-Keeping and Retention Obligations

**Retrieved:** 2026-08-27. Labels: **[OFFICIAL]** = Commission/legislation/government source, **[WEAK]** = vendor/consultant, **[UNVERIFIED]**. Method note as per the rest of the dossier: facts via search retrieval of cited pages; exact section numbers mostly unconfirmed because full rule text was unreachable this session. **Not legal advice**; counsel items flagged.

## Plain-English summary

Registered providers must keep detailed records — of incidents, complaints, worker screening, and participant information — and keep most of them for **seven years**. As of **27 August 2026** (literally the week of this research), a new Act extends a 7-year record-keeping duty for *payment* records to **every** provider, registered or not, with civil penalties for failure. That is a tailwind for this product: record-keeping just became a legal obligation with teeth for the whole market. One widely-repeated "rule" did **not** survive primary-source checking: "keep minors' records until they turn 25" appears only in vendor blogs, not in any NDIS legislation or Commission page we could retrieve.

## What must be recorded [OFFICIAL unless noted]

Registration conditions flow from **NDIS Act 2013 s 73F** into the 2018 Rules. Specific obligations:

- **Incidents** — NDIS (Incident Management and Reportable Incidents) Rules 2018 (F2018L00633): an incident record must capture impact/harm, assessment, actions taken, consultations, and who recorded it (reported as s 12 [UNVERIFIED section number]).
- **Complaints** — NDIS (Complaints Management and Resolution) Rules 2018 (F2018L00634): the complaint, remediation actions, and outcomes.
- **Worker screening** — NDIS (Practice Standards—Worker Screening) Rules 2018 (compilation F2020C01138): written records of all risk-assessed roles and who fills them; also allegations of misconduct against cleared workers and the provider's response [WEAK for exact wording].
- **Participant information** — the Practice Standards include an information-management outcome: each participant's information "identifiable, accurately recorded, current and confidential" and "easily accessible to the participant" [WEAK for the clause number].
- **Payments** — NDIA guidance: "complete and accurate records of NDIS supports delivered", payment requests within 2 years of the support; now superseded/strengthened by the 2026 Act below.

## Retention periods — the numbers our deletion engine must honour

| Record class | Period | Confidence |
|---|---|---|
| Incident management records | **7 years** from when the record is made | [OFFICIAL — Commission guidance PDF] |
| Reportable incident records | **7 years** from notification to the Commission | [OFFICIAL — Commission factsheet] |
| Complaints records | **7 years** from when the record is made | [OFFICIAL — Commission complaint-handling guidelines] |
| Worker screening / risk-assessed role records | **7 years** from when made | [OFFICIAL page located; exact 7-year wording via WEAK source] |
| **Payment/claim records — ALL providers, registered or not** | **7 years**, civil penalty for failure; commences **27 Aug 2026** | [OFFICIAL — Dept of Health, NDIS Amendment (Securing the NDIS for Future Generations) Act 2026; passed 19 Aug, assent 20 Aug 2026] |
| Records of participants who were minors — "until age 25" | **[UNVERIFIED in NDIS law]** — vendor blogs only; likely derives from state/territory health-records statutes (e.g. NSW/Vic health records law), which may still bind providers | NEEDS COUNSEL |

Two design consequences:

1. **Retention is per-record-class, per-trigger-date** (made / notified / payment), not one global "7 years". The deletion engine models each class with its own clock, exactly as `ARCHITECTURE.md` requires — and the Privacy Act APP 11.2 "destroy when no longer needed" duty is bridged by its "required by law to retain" exception (see `privacy-obligations.md`).
2. **The minors rule must be resolved by counsel, not assumed.** The master build prompt states it as fact; primary NDIS sources do not. If state health-records law applies to our customers, the "until 25" clock may be real via that route — the schema should allow a per-class configurable retention override so either answer fits without migration pain.

## The 27 August 2026 change — market-shaping [OFFICIAL — health.gov.au]

The **NDIS Amendment (Securing the NDIS for Future Generations) Act 2026** requires providers "to keep records relating to payment and receipt of NDIS funds for 7 years", applying "to both registered and unregistered providers", with civil penalties; participants who received NDIS payments and kept no records can owe the NDIA a **debt**. Requirements begin **27 August 2026**. For our pitch: every unregistered provider — previously outside most record rules — now has a statutory record-keeping duty tied precisely to *claims and payments*, which is our exact domain.

## Plan managers [OFFICIAL unless noted]

- Registration group **0127 Plan Management**; verification pathway with an accountant/bookkeeper requirement [WEAK for the pathway detail].
- NDIA guidance: plan managers must provide participants a **monthly financial statement**, keep **all invoices and records for claims they submit**, and pay providers within **2 business days** of receiving NDIS funds. The NDIA and Commission have jointly reminded plan managers of record-keeping and conflict-of-interest obligations — i.e. the regulator is already watching this segment.

## Unregistered providers [OFFICIAL]

The **NDIS Code of Conduct** applies to registered and unregistered providers and workers alike. Until August 2026 no NDIS-specific retention period bound the unregistered; the 2026 Act's 7-year payment-record rule now does.

## Must close before Stage 1/3 (and counsel list)

1. **COUNSEL:** the minors/"until 25" question — which state/territory health-records laws apply to NDIS providers' records, and therefore what retention override our schema needs.
2. Obtain the full text of the 2026 Act and confirm exactly which records "relating to payment and receipt of NDIS funds" covers (does it include service records evidencing the claim?).
3. Confirm exact section numbers for the 7-year provisions in each 2018 Rule (durations are solid; citations are not).
4. Confirm whether the Provider Registration Rules contain a standalone general record-keeping section beyond the per-topic Rules.

## Sources (retrieved 2026-08-27)

- https://classic.austlii.edu.au/au/legis/cth/consol_act/ndisa2013341/s73f.html
- https://www.legislation.gov.au/F2018L00631/latest ; /Details/F2018L00633 ; /Details/F2018L00634 ; /Details/F2020C01138
- https://www.ndiscommission.gov.au/rules-and-standards/reportable-incidents-and-incident-management/incident-management
- https://www.ndiscommission.gov.au/sites/default/files/2024-09/detailed-guidance-incident-management-systems-detailed-guidance-regi-20240926.pdf
- https://www.ndiscommission.gov.au/sites/default/files/2022-02/factsheet-incident-reporting-management-and-prevention.pdf
- https://www.ndiscommission.gov.au/sites/default/files/2024-09/complainthandlingguidelinesforproviders_0.pdf
- https://www.ndiscommission.gov.au/workforce/worker-screening/worker-screening-registered-providers
- https://www.ndiscommission.gov.au/rules-and-standards/ndis-code-conduct (and the Code of Conduct PDF)
- https://www.ndis.gov.au/providers/working-provider/reporting-and-recording-keeping/what-are-record-keeping-requirements
- https://www.ndis.gov.au/news/10125-plan-managers-and-support-coordinators-obligations (and plan-manager guide pages)
- https://www.health.gov.au/our-work/ndis-legislation-changes/amendments/ndis-amendment-securing-the-ndis-for-future-generations-bill-2026/about-the-changes-to-the-ndis (and the fact sheet)
- Weak-evidence corroboration (labelled inline): veyora.com.au, cliniccomply.com.au, ndiscompliant.com.au, paperbarkndis.com.au, pmlawyers.com.au
