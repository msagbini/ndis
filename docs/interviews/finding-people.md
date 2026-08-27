# Where to Find the People

Goal: a list of ~40 prospects (NDIS providers with 5–50 staff, and NDIS plan managers) in `prospect-list-template.csv`. Budget about two hours of list-building.

A note on honesty: the sources below are real, but pages move and groups rename. Each entry says exactly what to do; if a link doesn't work or a page looks different from the description, tell the agent — don't spend time hunting. Individual names and emails are **not** pre-filled here, because inventing contact details would be worse than useless; the sources below are where the real ones come from.

## 1. Official registers (best for volume)

**NDIS Provider Finder** — the NDIA's own public directory of registered providers.
1. Go to `https://www.ndis.gov.au` and use the site search for **"Provider Finder"** (it also appears under Participants → Working with providers).
2. Search by your city/region. Filter or scan for supports like "daily personal activities", "community participation" — these are the service types delivered by the 5–50-staff providers we want.
3. Each listing shows the business name and usually a phone number and website. Copy into the CSV.
4. Skip the giants (names you'd recognise from TV, or listings covering every state) — they have compliance teams and aren't our first customers.

**NDIS Commission provider register** — the regulator (the NDIS Quality and Safeguards Commission) publishes a searchable register of all registered providers.
1. Go to `https://www.ndiscommission.gov.au` and search the site for **"provider register"**.
2. Same drill: filter to your state, collect small-to-mid names.

For **plan managers** specifically: filter or search for the registration group **"Plan Management"** (registration group 0127 — see `../research/record-keeping.md`). Searching Google for `"plan management" NDIS site:.com.au` also surfaces them quickly because they market directly to participants.

## 2. Industry associations (best for warm-ish contacts)

- **Disability Intermediaries Australia (DIA)** — the peak body specifically for plan managers and support coordinators. Their website has a **member directory** of plan management businesses. Search: `Disability Intermediaries Australia member directory`.
- **National Disability Services (NDS)** — the peak body for disability service providers. They run events and publish a member list. Search: `National Disability Services members`.
- **Ability Roundtable** and state-based provider networks also exist; treat them as secondary.

## 3. Facebook groups (best for finding people already complaining)

Facebook is where this industry actually talks. In Facebook's search bar, search these phrases and request to join the 2–3 biggest results (thousands of members, active in the last week):

- `NDIS providers` (there are several large owner/operator groups)
- `NDIS plan managers`
- `NDIS business` / `NDIS provider support`

Joining usually requires answering 1–2 screening questions — answer honestly: "I run/am starting a business that helps providers with claims and audits, and I'm doing research — not selling anything."

Once in: **do not post a survey.** Instead, search the group for the words `rejected`, `cancelled claim`, `audit`, and message people who complained (see the LinkedIn/DM message in `outreach-messages.md` — the same wording works).

## 4. LinkedIn (best for plan managers and operations managers)

1. In LinkedIn search, enter **"plan manager NDIS"** or **"operations manager NDIS"**, filter People → Location: Australia.
2. Also search **"claims officer NDIS"** and **"NDIS finance"** — these people feel the rejection pain personally.
3. Connect with the short note from `outreach-messages.md`. 10–15 connection requests a day is safe; more risks LinkedIn restricting the account.

## 5. Consultants and newsletters (secondary, but high quality)

A small industry of NDIS consultants exists whose whole business is helping providers pass audits — for example, search for **"Disability Services Consulting"** (also known as DSC / Team DSC), which runs widely-read newsletters and training. Consultants talk to dozens of providers; one friendly consultant conversation is worth five provider interviews for market texture. The email template has a consultant variant.

## Pre-loaded list (2026-08-27)

`prospect-list.csv` already holds **31 real organisations** (17 plan managers, 14 providers across VIC/NSW/QLD/WA/SA) found via web search — every row cites the URL where it appeared. No emails, phone numbers, or person names were invented (those columns are blank on purpose: fill them from each org's own website). National giants and software vendors were excluded. **Verify each row on the org's website before contacting anyone** — team sizes were rarely visible in search results.

## Filling the CSV

Open `prospect-list-template.csv` in any spreadsheet app (or ask the agent to manage it). One row per organisation. The `segment` column is `provider`, `plan_manager`, or `consultant`. Don't overthink `size_guess` — website team-page headcount or "looks small/medium" is fine.

Stop at ~40 rows. More list-building past that point is procrastination; start sending.
