# pbtestseries.in — test series plan

Last updated: 26 October 2026. This plan decides which Punjab exams get test series, in what order, how many tests each
series has, and what has to happen before the site can earn. Update the status table at the bottom as work lands.

## 1. Where we stand

- pbtestseries.in is live but **noindex** (`launched: false` in `src/sites/pb.ts`). Until it is launched, Google sends no
  traffic, however many tests we add. Launching is part of this plan (section 7).
- The only Punjab test today is the free **Punjab GK mock** (`prisma/punjab/free-mock.ts`). There is **no paid Punjab series**.
- Exam pages exist for PSSSB Clerk, Group D, JE, Punjab Police Constable and PPSC PCS (`prisma/exam-pages/punjab.ts`).
- Questions are stored in **English + Hindi** only. Punjabi-language questions (the Punjabi paper) are written in
  Gurmukhi inside both blocks, the way HP's Hindi sections keep Hindi in both. A Punjabi *interface* for question text
  is a platform change and is not in this plan.
- On HP, **court exams bring ~60% of clicks** (High Court Process Server, Steno, Clerk). Court clerk is our proven formula.

## 2. What is already over (do not build for these now)

| Exam | Why not now |
|---|---|
| PSSSB Group D (2,098 posts) | Written exam held **25 Oct 2026**, answer keys out |
| PSSSB Clerk (531 posts, Advt 02/2026) | Written exam held **11 Oct 2026**, answer keys out |
| PSSSB Excise & Taxation Inspector (197) | Exam held 31 May 2026 |
| Punjab Police Constable 2026 (3,298) | CBT held July; PST/PMT in October |
| PSTET 2026 | Held in March 2026 |

## 3. Priority order

| # | Exam | Posts / audience | Timing | Why this rank |
|---|---|---|---|---|
| **1** | **Punjab District Court Clerk** (SSSC, Advt 37C/SSSC/PB/2026) | 1,270 posts | Apply 7 Oct – **4 Nov 2026**; CBT date not yet announced (likely Dec–Jan) | Live exam, people are searching now; court clerk is what works on HP; unique pattern so generic mocks don't fit; same society also hires Haryana court clerks (reuse on hr) |
| **2** | **Punjab Police Constable** (2027 drive) | ~3.5 lakh applicants; 1,746 posts in 2024, 3,298 in 2026 | Yearly; last notified in March, so the next one is *likely* Feb–Mar 2027 (our guess) | Biggest audience, every year; build Dec–Jan so pages rank before the notification |
| **3** | **Punjabi qualifying paper** (shared) | Every PSSSB and Police candidate | Always | Clerk Part A, Police Paper 2 and Patwari all have a pass-or-out Punjabi paper; one bank serves all |
| **4** | **PSSSB Patwari** | ~1,001 posts expected; 2.34 lakh sat in 2021 | Notification awaited | Big, but no date; build fast from the shared bank when it is notified |
| **5** | **PSSSB Clerk** (next drive) | 531 in 2026 | Next drive unknown | Recurring; reuse the Punjabi + Punjab GK banks |
| later | Punjab ETT (~4,000 expected), Master Cadre, PSTET 2027, PPSC PCS | — | Not notified | Different syllabus (pedagogy); after the above |

Sources: official notices on sssb.punjab.gov.in for Group D and Clerk; the Court Clerk, Police and Patwari figures come
from aggregator sites (Adda247, Testbook, CareerPower, PW) and must be re-checked against the official notice before
they go into exam copy.

## 4. Series specs

Test counts are what we ship first. Prices are proposals: **the owner has not confirmed any of them.**

### 4.1 Punjab District Court Clerk — build now

**Official written pattern (2026 notice):** online CBT, 100 marks, 2 hours.
- General Knowledge: 50 objective questions × 1 mark
- English Composition (objective): 20 questions × 1 mark
- English Composition (subjective, typed): essay ~150 words (10), letter (5), précis (5), Punjabi → English translation (10) = 30
- Negative marking: 0.25 per wrong objective answer. Qualifying: 33% in each subject and 40% overall; the subjective
  part is marked only if GK ≥ 33%.
- Then a qualifying Computer Proficiency Test: spreadsheet (10 marks, 10 min, pass 4) and English typing at 30 wpm.

Our CBT marks only objective questions, so the mocks cover the **70 objective marks** and the subjective part is
practised through a post with formats and model answers.

| Test | Count | Questions | Time | Notes |
|---|---|---|---|---|
| Free full mock | 1 | 70 (GK 50 + English 20) | 70 min | Whole test free, no login needed to view |
| Paid full mocks | 6 | 70 each | 70 min | Mocks 1–2 first, 3–6 in the following weeks |
| GK sectionals | 4 | 25 each | 20 min | Punjab GK, Indian polity & history, geography & science, current affairs & static GK |
| English sectionals | 2 | 25 each | 20 min | Grammar & error spotting; vocabulary, idioms, one-word |
| **Total** | **13 tests** | **≈ 670 questions** | | |

GK split inside a mock (ours, not official): Punjab GK 15, Indian history 7, polity 7, geography 6, economy 4, science 5,
current affairs & static GK 6. English 20: grammar/error spotting 8, vocabulary (synonyms, antonyms, one-word, idioms) 8,
sentence improvement / fill-ins 4.

Content around it:
- Exam page `/punjab-courts/clerk` with pattern, syllabus, FAQs.
- Post: *Punjab Court Clerk syllabus & exam pattern 2026*.
- Post: *Essay, letter, précis and Punjabi→English translation: formats with model answers* (the 30 subjective marks).
- Post: *Computer Proficiency Test: spreadsheet tasks and 30 wpm typing*.

Proposed price: **₹149** for the series, 180 days.

### 4.2 Punjab Police Constable — build Dec 2026 – Jan 2027

**Pattern (2026 drive, aggregator sources):** Paper 1, 100 questions, 2 hours, **no negative marking**: General Awareness 35,
Quantitative Aptitude 20, Mental Ability & Reasoning 20, English 10, Punjabi 10, Digital Literacy 5. Paper 2: 50 Punjabi
questions, 60 minutes, qualifying at 50%, not counted in merit.

| Test | Count | Questions | Time |
|---|---|---|---|
| Free Paper 1 mock | 1 | 100 | 120 min |
| Paid Paper 1 mocks | 8 | 100 each | 120 min |
| Paper 2 Punjabi mocks | 4 | 50 each | 60 min |
| Sectionals (GA ×3, Quant ×3, Reasoning ×3, Digital literacy ×1, English ×2) | 12 | 25 each | 20 min |
| **Total** | **25 tests** | **≈ 1,400 questions** | |

`marksWrong: 0` on every Police test. Proposed price: **₹199**, 365 days (covers the whole 2027 cycle).

### 4.3 Punjabi qualifying bank — alongside 4.2

Needs a `punjabi` subject in `prisma/taxonomy.ts` (ਵਿਆਕਰਨ, ਸ਼ਬਦ-ਜੋੜ, ਮੁਹਾਵਰੇ-ਅਖਾਣ, ਸਮਾਨਾਰਥੀ/ਵਿਰੋਧੀ, ਪੈਰਾ, ਸਾਹਿਤ).
Target 300 questions, used by Police Paper 2, PSSSB Clerk Part A and Patwari. **A Punjabi-speaking human must check
these** before they are sold; AI-written Gurmukhi grammar is the riskiest content in this plan.

### 4.4 PSSSB Patwari / Clerk — when notified

PSSSB pattern (Clerk 2026): Part A Punjabi 50 (qualifying) + Part B 100 (GK, Punjab history & culture, reasoning,
Punjabi, English, ICT), 0.25 negative in Part B. Plan: 1 free + 6 full mocks + 8 sectionals each, mostly from the shared
Punjab GK, Punjabi and reasoning banks. Proposed ₹149–199.

## 5. Shared question banks

Write once, reuse across series:

| Bank | Used by | Target size |
|---|---|---|
| Punjab GK (history, Gurus, geography, rivers, districts, culture, economy, polity) | all | 400 |
| Indian GK & current affairs | Court Clerk, Police, PSSSB | 400 |
| English (objective) | Court Clerk, Police, PSSSB | 250 |
| Punjabi (Gurmukhi) | Police P2, PSSSB Part A, Patwari | 300 |
| Reasoning & Quant | Police, PSSSB | 400 |

Rules: every stem must be specific (the seed dedupes by English-stem hash, so a generic stem silently reuses an old
HP question); each series gets a data test (`src/modules/content/*-data.test.ts`) checking counts, unique stems,
valid topics and answer spread; questions use markdown + KaTeX rules (wrap `$` and code in backticks).

## 6. Pricing and packs

- Show the per-test price and the real pack saving only; no fake MRP.
- Once two Punjab series exist, add a **Punjab pack** (Court Clerk + Police) at a real discount.
- All prices above wait for the owner's confirmation.

## 7. Launch checklist (blocks all organic traffic)

- [ ] Court Clerk series live (at least free mock + 2 paid mocks)
- [ ] Razorpay: add pbtestseries.in as a website
- [ ] Resend domain + `EMAIL_FROM_PB`
- [ ] Google Search Console property + sitemap
- [ ] Human spot-check of Punjab GK facts (free mock and Court Clerk)
- [ ] Flip `launched: true` in `src/sites/pb.ts`, deploy

## 8. Timeline

| When | What |
|---|---|
| 26 Oct – 2 Nov 2026 | Court Clerk: exam page, free mock, mocks 1–2, sectionals, syllabus post |
| by 4 Nov 2026 (form deadline) | Launch checklist done, pb indexed |
| Nov 2026 | Court Clerk mocks 3–6, subjective-writing post, CPT post |
| Dec 2026 – Jan 2027 | Punjabi bank; Police free mock + Paper 1 mocks 1–4 + Paper 2 mocks |
| Feb 2027 | Police mocks 5–8 + sectionals, before the expected notification |
| On notification | Patwari / PSSSB Clerk series from the shared banks |

## 9. Status

| Item | Status |
|---|---|
| Phone header fix (Punjabi switch in menu) | ✅ live (55055e7) |
| Court Clerk exam body + page | ✅ pushed (7ff819c), needs deploy |
| Court Clerk free mock | ✅ pushed, needs deploy |
| Court Clerk mocks 1–2 | ✅ pushed, needs deploy |
| Court Clerk mocks 3–6 | ✅ pushed and deployed |
| Court Clerk sectionals (4 GK + 2 English) | ✅ pushed and deployed |
| Court Clerk posts (syllabus, subjective, CPT) | not started |
| Launch checklist | owner's tasks open |
| Police Constable series | not started |
| Punjabi bank | not started |
