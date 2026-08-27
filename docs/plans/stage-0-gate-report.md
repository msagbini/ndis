# Stage 0 Gate Report — for the founder

**Date:** 2026-08-27. Written for someone who has not read the code or the commit history.

## What was built, in plain words

Stage 0 is done except for the part only a human can do: the interviews. The repository now contains:

1. **A research dossier** (`docs/research/` — start with its README): how NDIS pricing, claiming, audits, record-keeping and privacy law actually work, from government sources, with every fact labelled by how solid it is.
2. **A complete interview kit** (`docs/interviews/` — start with its README): where to find 40 prospects, the exact outreach messages, a word-for-word interview script, a note template, and a scoring sheet that I fill in — not you.
3. **A written go/no-go bar** (`docs/go-no-go.md`): the pass/fail rule for the interviews, fixed before any interview happens.
4. **A working repo skeleton**: automated checks (formatting, types, tests) run on every change, locally and on GitHub. No product code exists, on purpose.

## What the research found (the four things that matter)

1. **The thesis checks out against government sources.** The national audit office found the NDIA historically paid claims without basic pre-payment checks and is now fixing that: automated checks plus ~20,000 targeted human reviews a month — and when the NDIA manually reviews claims, **over half the money value gets cancelled**. "Prove it before you're paid" is real and documented.
2. **The market moment got stronger during this research.** A new law (assented 20 Aug 2026) makes 7-year record-keeping for payment records mandatory for **every** provider — even unregistered ones — with fines, starting 27 Aug 2026. And from 10 Dec 2026, privacy policies must disclose automated decision-making — a rule our explainable, deterministic design turns into a selling point.
3. **The wedge looks open, with two named threats.** No competitor markets pre-submission claim validation against plan budgets and price limits as its product; claim-level audit evidence looks unoccupied. Closest threats: FlowLogic (provider side) and Careview (plan-manager side). Incumbents' own users complain most about exactly the billing failures we'd prevent.
4. **One "fact" from the original brief failed checking.** The rule "keep minors' records until they turn 25" appears only in vendor blogs, not in NDIS law we could find. It may still apply via state health-records laws — it's flagged for a lawyer, and the future schema will treat retention per record class so either answer fits.

## What I'm worried about (honestly)

1. **Research quality ceiling.** The network here couldn't open web pages directly, so every fact came via search-engine retrieval of the official pages. Confidence labels are honest, and each file lists what to re-verify — but the pricing documents and NDIA error-code guides must be downloaded and read before Stage 1 code trusts them.
2. **Platform risk.** Careview or FlowLogic could ship a "validation" feature in one release cycle. Our answers — independence (validate claims from any system) and depth — are arguments, not proof, until customers confirm them in interviews.
3. **The interviews are the actual test.** Everything above is still desk research done better. If ten real conversations fail the agreed bar, the honest move is stop or pivot, and the go/no-go doc commits us to that in advance.

## What I recommend

**I think we should proceed — to the interviews, not to code.** The evidence supports spending your time on outreach; it does not yet support writing Stage 1. Nothing in Stage 1 should start until the interview verdict is in.

## What I need from you (the complete list — nothing else is waiting on you)

**1. Agree (or amend) the go/no-go bar.**
- **What I need:** one reply saying "threshold agreed" (or your changes).
- **Why it matters:** the bar must be fixed before the first interview so results can't be reinterpreted.
- **Your options:** agree as proposed (≥60% report claim pain or painful audit prep, AND ≥50% spend ≥A$150/month on software, from ≥10 interviews) — or propose different numbers.
- **My recommendation:** agree as proposed; it's strict enough to mean something and achievable in ~10 calls.
- **If you'd rather not decide:** say "your call" and the proposed bar becomes binding.

**2. Run the outreach and interviews** (the one thing I can't do).
- Step by step: (1) open `docs/interviews/README.md` and read it — five minutes; (2) spend ~2 hours building the prospect list per `finding-people.md`; (3) send the messages from `outreach-messages.md`; (4) before the first call, ask me to rehearse — I'll play a sceptical provider; (5) after each call, paste your notes to me and I'll do all scoring.
- Success looks like: 10 completed calls within ~3 weeks of first outreach.

**3. BLOCKING for Stage 1 only (not for interviews): confirm you can download two files** on your own computer and share them with me when Stage 1 starts: the NDIS Pricing Schedule 2026-27 and the NDIS Support Catalogue 2026-27 (both linked in `docs/research/pricing-arrangements.md`). My connection here couldn't fetch them; Stage 1's price engine must be built from the real files, not from my notes.

Nothing else needs you. Rename-the-product, lawyer engagement, and pricing decisions are all deliberately deferred until after a GO verdict.
