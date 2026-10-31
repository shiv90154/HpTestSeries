# SSC test series plan: where it lives, exams, tests, SEO, admin

Written 31 October 2026. Nothing in this file is built yet. It covers all eight SSC exams we want to sell: GD Constable,
CGL, CHSL, MTS & Havaldar, CPO, Stenographer, JE and Selection Post. It sets out where they live (on every state site),
what each one needs (pattern, tests, pages, posts, keywords, price), the order we build them in, the code changes, and
the admin records. The general multi-site rules are in [MULTI-SITE-PLAN.md](MULTI-SITE-PLAN.md) and apply here too.

> **Every date and pattern below comes from coaching and news sites** (Testbook, Adda247, PW, Careers360, Mahendras and
> others; links at the end). They often disagree with each other. Before a pattern goes into a seed or a date goes into a
> post, check it against the notice PDF on [ssc.gov.in](https://ssc.gov.in). Rows marked ⚠ are where the sources disagree.

---

## 1. Where SSC lives: on every state site, with SEO that sets itself up

### Decision (owner, 31 Oct 2026)

- **No separate SSC domain, now or later.** SSC is a national body like Delhi Police, NDA and CDS: `sites: ["*"]`.
- **Every state site shows and sells every SSC test**: hp, pb and rj today, and each state added later, with no extra
  work. An HP student buys SSC GD on hptestseries.in, a Punjab student on pbtestseries.in.
- **The SEO for SSC must set itself up on every site.** Adding a state must never mean writing SSC SEO pages for it by
  hand. §1.2 shows how.

### 1.1 The one rule Google forces on us

The SSC GD syllabus page is the same text on hp, pb, rj and every later site. **Google ranks only one copy of identical
pages.** If ten sites all claim theirs is the original (self-canonical), Google picks one at random, drops the rest,
and can treat the set as doorway pages (multi-site plan, "The two policies to stay clear of"). So identical pages get
**one canonical, on hptestseries.in** (the primary site, and the one with the most Google authority today). The code
already does this for every `"*"` body (`canonicalSiteCode`, `src/modules/catalog/visibility.ts:51`), and each site's
sitemap leaves out pages it doesn't own.

This is automatic today: when a new state site is added, every SSC page and test appears on it, its canonical points to
hp, and its sitemap skips them. **Nothing to do per site.**

What that alone does *not* give a state site is any SSC traffic from Google. §1.2 fixes that, also automatically.

### 1.2 What every site gets automatically

| Layer | Pages | Same on every site? | Canonical | Work per new state |
|---|---|---|---|---|
| **A. Shared SSC pages** | `/ssc`, the 8 exam hubs, `/syllabus`, `/exam-pattern`, `/previous-year-papers`, `/tests`, every test page | Yes | hptestseries.in | **None** (already works). |
| **B. State SSC pages, generated from data** | `/ssc/gd-constable/<state>` and `/ssc/mts/<state>` (pbtestseries.in/ssc/gd-constable/punjab), **only for the site's own state** | No: each state's own numbers | **Self-canonical on the state's site**, listed in its sitemap | **None**, provided the data table covers every state (filled once per exam cycle, for all 36 states/UTs). |
| **C. A state block on the shared pages** | On pb's `/ssc/gd-constable`: "SSC GD in Punjab: 1,234 posts, last cut-off 142" + a link to layer B | Varies by site | (as A) | **None.** It reads the same data as B. |
| **D. National news posts** | Notification, admit card, answer key, result posts | Yes | Published on hp only (D5) and linked from every site | Written once, on hp. |

**Layer B is the key part.** These pages rank on the state's own domain for searches big sites answer badly:
"ssc gd vacancy punjab", "ssc gd cut off himachal pradesh", "एसएससी जीडी राजस्थान कट ऑफ". They are genuinely different
per state (real numbers from the SSC notice), so they are state content, not doorways.

**Which exams get layer B: only those where SSC publishes state-wise numbers.**

| Exam | State-wise data from SSC | Layer B? |
|---|---|---|
| GD Constable | Vacancies per state/UT (by force, category, male/female); cut-off per state; PET/PST relaxations for hill areas and some states | ✅ |
| MTS & Havaldar | Vacancies per state/UT; state-wise cut-off | ✅ |
| Selection Post | Region-wise (NR, CR, WR ...), not state-wise | ✗ (a region doesn't map onto our state sites) |
| CGL, CHSL, CPO, Steno, JE | All-India merit; no state numbers | ✗: layer A only |

**The guard against thin pages:** a layer B page renders only when its state row has **at least** the vacancies **and** one
previous cut-off. Otherwise the URL returns 404 and stays out of the sitemap. When a new state site launches, its
state pages appear on their own if the table already has the state's row, and only if they do.

**Own state only.** pbtestseries.in gets the Punjab page and nothing else. hp does **not** host pages for Bihar, UP and
other states that have no site yet: 30 template pages at once is "scaled content", and when that state's site
launched, the page would have to move its canonical (multi-site rule 2). Rows for states without a site sit in the
table unused until their site exists.

### 1.3 What a new state needs for SSC: nothing

The adding-state checklist in MULTI-SITE-PLAN stays as it is. SSC adds no step. With the new state's `stateName` in its
config, layers A, B and C switch on by themselves. A state-wise SSC *post* (for example "SSC GD exam centres in Haryana")
is a nice extra the owner can write, never a requirement.

### 1.4 Other rules

- **Delhi Police Constable stays under its own `delhi-police` body** (SSC runs the exam, but hp already ranks for its
  pages). Link it from `/ssc` as "Delhi Police Constable (conducted by SSC)".
- **No "official" look.** Every SSC page says "We are a private practice platform, not affiliated with the Staff Selection
  Commission." Use no SSC logo and no government emblem. Google Ads and Meta ads check this.
- **SSC questions are written once** and serve every site, because the question bank is already global.

---

## 2. Calendar: where each exam stands (31 October 2026)

| Exam | 2026 cycle | Vacancies | Next thing that happens | What we do now |
|---|---|---|---|---|
| **GD Constable 2027** | Notification **not out yet**. It was expected 30 Sep, then 30 Oct 2026. ⚠ | 25,000–45,000+ (estimate; 25,487 in 2026, 53,690 in 2025) | Notification any day; CBT **Jan–Mar 2027** | **Top priority.** It has the most students, the most runway, and the same students as our Police series. |
| **CHSL 2026** | Applications closed 7 Oct | 2,536 | **Tier 1: 30 Nov – 31 Dec 2026** | **Second priority.** The exam is 30 days away. Sell to visitors already on our sites and through WhatsApp/Telegram; new pages won't rank against Testbook in time. |
| **CGL 2026** | Tier 1 held 30 Sep – 30 Oct | 12,256 → revised to **10,731** ⚠ | Answer key, Tier 1 result, then **Tier 2 ~Dec 2026** ⚠ | Answer-key, cut-off and result posts now (traffic is high right now). Tier 2 mocks for December. Tier 1 series for CGL 2027. |
| **CPO (SI Delhi Police & CAPF) 2026** | Applications closed 30 Sep | 1,871 | **Paper 1: 23 – 28 Nov 2026** (revised 26 Oct) ⚠ | 3 quick Paper 1 mocks + a pattern page. Paper 2 (English) mocks later. |
| **JE 2026** | Notification out | 1,699 | **Paper 1: 2 – 6 Nov 2026** (+ 30 Nov – 1 Dec per one corrigendum ⚠); Paper 2 ~Dec | Too late for Paper 1. JE comes last: it is technical and needs subject experts. |
| **MTS & Havaldar 2026** | Notification ~26–30 Jun 2026 ⚠, ~7,900–8,000 posts ⚠ | ~8,000 ⚠ | CBT "Sep–Nov 2026"; no confirmed dates ⚠ | **Check ssc.gov.in first.** If the CBT hasn't happened yet, MTS jumps to priority 2. If it has, build for MTS 2027. |
| **Stenographer 2026** | CBT held 9–15 Sep ⚠ | 1,275 | Skill test (date TBA); 2027 notification ~Apr 2027 | Posts only for now. Series for 2027. |
| **Selection Post Phase XIV** | CBT held 16–26 Sep; answer key 9 Oct | 3,003 (one source: 2,919) ⚠ | Result; Phase XV notification ~Apr 2027 | Posts only for now. Series for Phase XV. |

The SSC calendar slips often: the 2026-27 calendar has already been revised at least once. Keep **one** post
"SSC exam calendar 2026-27 (updated)" and edit it each time instead of writing new ones (the same playbook as the RSSB
calendar on rj).

---

## 3. Build order

**Depth on a few exams first** (multi-site plan). An exam page goes live only when its pattern, syllabus and at least 2
mocks exist. Empty exam pages get a site flagged as thin, and an SSC page is on every site at once.

| Phase | When | Exams | Goal |
|---|---|---|---|
| **0. Body** | 1 – 3 Nov | (none) | `ssc` body with `sites: ["*"]`, the `/ssc` page, the SSC Pass. No new domain or site. |
| **1. CHSL + CPO + GD start** | 1 – 20 Nov | CHSL T1, CPO P1, GD | CHSL 6 mocks by 20 Nov, CPO 3 mocks by 18 Nov, GD free mock + 4 mocks. Each goes live on every site as it's seeded. |
| **2. GD full push + state pages** | 20 Nov – 31 Jan | GD, CGL T2 | GD to 20 mocks + sectionals before the CBT; layer B state pages once the GD 2027 notice gives state-wise vacancies (§5 part 1); CGL Tier 2 (needs the section timer). |
| **3. MTS + CGL 2027** | Dec – Mar | MTS, CGL T1 2027, CHSL T2 | Depends on what ssc.gov.in says about MTS. CHSL Tier 2 only after the T1 result. |
| **4. Selection Post + Steno** | Mar – Jun 2027 | Phase XV, Steno 2027 | Both notify around April. |
| **5. JE** | when we have engineers to check it | JE (Civil, Electrical, Mechanical) | Engineering questions need subject experts. Don't publish AI-only technical content. |

---

## 4. Exam by exam

Conventions, the same as our other series:

- **Mock 1 of every series is free in full.** Paid mocks use `demoPercent` so students can try the first few questions.
- **Every question is written fresh** (the `delhi-police` convention). PYQ-style papers copy the mix and the level of
  past papers, not the papers themselves. Real previous papers go on `/previous-year-papers` only where SSC published them
  with an answer key, and the page says so.
- **No question repeats within one exam's series.** Across exams at different levels (GD vs CGL), reuse is OK but
  sparing: a Pass holder sees both.
- Bilingual (Hindi + English) for GA, Reasoning and Maths. The English section stays English-only.
- Seeds live in `prisma/ssc/<exam>/` (one file per test, an `index.ts` per series, as in `prisma/delhi-police/`).
- Pages: hub + `/syllabus` + `/exam-pattern` + `/previous-year-papers` + `/tests` (already built, and they switch on per exam).
- Prices are suggestions. They are the owner's call (§8).

### 4.1 SSC GD Constable 2027 ⭐ priority 1

**Who:** 10th pass, 18–23 years. Posts are Constable (GD) in BSF, CISF, CRPF, ITBP, SSB, SSF, Assam Rifles Rifleman and
NCB Sepoy. This is the biggest SSC exam by applicants (lakhs) and our Police-series students already take it.

**Pattern (CBE) ⚠ check the 2027 notice:**

| Part | Subject | Questions | Marks |
|---|---|---|---|
| A | General Intelligence & Reasoning | 20 | 40 |
| B | General Knowledge & General Awareness | 20 | 40 |
| C | Elementary Mathematics | 20 | 40 |
| D | English **or** Hindi (the candidate chooses one) | 20 | 40 |
| | **Total** | **80** | **160**, 60 minutes, −0.25 per wrong answer |

After the CBE: PET/PST (race, height and chest by state and category), medical, document verification. The paper is also
set in 13 regional languages (including Punjabi) ⚠.

**Tests to build:**

| Test | Count | Questions | Notes |
|---|---|---|---|
| Full mocks | 20 (4 by 20 Nov, 12 by 31 Dec, 20 by 31 Jan) | 80 each | Mock 1 free. Part D: see "Hindi or English" below. |
| Sectionals | 8 (2 per part) | 25 each | Reasoning, GK, Maths, English/Hindi. |
| Current affairs monthly | 1 a month from Nov | 25 each | GD asks current affairs. Freshness also helps SEO. |
| PYQ-style papers | 4 (2024, 2025, 2026 shift style) | 80 each | Labelled "PYQ-style", not reproductions. |

Content: about **2,100 new questions**. Reasoning and Maths at 10th level can go into the shared bank for MTS later.

**Hindi or English (Part D):** the CBT can't yet offer "pick one section". Until it can (§5 part 2), seed **two
versions of Part D in each mock** (20 English + 20 Hindi questions), tell the student in the instructions to attempt only
one, and score the better of the two. If scoring "the better of two" is too fiddly, the simpler fallback is two tests per
mock ("Hindi medium" and "English"), but that doubles the test count. Decide before Mock 2.

**Pages:** `/ssc/gd-constable` hub, `/syllabus`, `/exam-pattern`, `/previous-year-papers`, `/tests`. FAQs: negative
marking, Hindi vs English part, height and chest by state, age relaxation, can a 12th-pass apply, normalisation.

**Posts (dated; edit them, don't duplicate):**

1. SSC GD 2027 notification: dates, vacancies, how to apply (update it the day it comes out).
2. SSC GD syllabus 2027 in Hindi (एसएससी जीडी सिलेबस 2027).
3. SSC GD physical standards: height, chest and race, state-wise and category-wise.
4. SSC GD cut-off 2026, 2025, 2024: state-wise and force-wise.
5. SSC GD 2027: Hindi or English, which part should you pick?
6. SSC GD salary and posting: BSF vs CISF vs CRPF vs ITBP vs SSB vs Assam Rifles.
7. SSC GD 60-day study plan (links the free mock and the sectionals).
8. Later: admit card, answer key, result, PET/PST date.

**State pages (layer B, automatic):** once the notice is out, fill the state-wise table (vacancies by force and
category, the last 3 years' state cut-offs, exam centres, PET/PST relaxations) for all 36 states/UTs. Then
hptestseries.in/ssc/gd-constable/himachal-pradesh, pbtestseries.in/ssc/gd-constable/punjab and
rjtestseries.in/ssc/gd-constable/rajasthan build themselves, as will any later state's.

**Keywords:**

| Page | Main query | Also |
|---|---|---|
| GD hub | ssc gd mock test | ssc gd test series 2027, एसएससी जीडी मॉक टेस्ट |
| Free mock | ssc gd mock test free | ssc gd free mock test in hindi, ssc gd online test |
| /syllabus | ssc gd syllabus 2027 | ssc gd syllabus in hindi, एसएससी जीडी सिलेबस |
| /previous-year-papers | ssc gd previous year paper | ssc gd question paper pdf |
| Physical post | ssc gd height | ssc gd chest, ssc gd running |
| Cut-off post | ssc gd cut off | ssc gd cut off state wise |

**Price:** Rs 99 (20 mocks + sectionals). GD students are the most price-sensitive.

### 4.2 SSC CHSL 2026 ⭐ priority 2 (Tier 1: 30 Nov – 31 Dec 2026)

**Who:** 12th pass, 18–27. Posts are LDC/JSA, DEO and Postal/Sorting Assistant.

**Tier 1 pattern:** 100 questions, 200 marks, 60 minutes, −0.50 per wrong answer. Reasoning 25, General Awareness 25,
Quantitative Aptitude (basic) 25, English 25.

**Tier 2 pattern ⚠ (2023 scheme, check the 2026 notice):** Session I: Section I = Maths 30 + Reasoning 30 (1 hour);
Section II = English 40 + GA 20 (1 hour); Section III Module I = Computer 15 (15 minutes). 3 marks per question, −1 per
wrong answer in Sections I–II and Section III Module I. Session II = Skill test / typing test (qualifying).

**Tests to build:**

| Test | Count | When |
|---|---|---|
| Tier 1 full mocks | 10 (6 by 20 Nov, 10 by 30 Nov) | Now |
| Tier 1 sectionals | 8 (2 per subject) | By 30 Nov |
| Tier 2 mocks | 3 | Only after the Tier 1 result; needs the section timer (§5) |

Content: about **1,200 new questions** for Tier 1. CGL Tier 1 uses the same pattern one level harder, so CHSL questions
written at the "hard" end can serve CGL 2027 sparingly.

**Posts:** CHSL Tier 1 exam date and shift timings; admit card and city slip; 30-day revision plan; good attempts and
expected cut-off; later the answer key and the response-sheet marks calculation, then the result.

**Keywords:** ssc chsl mock test, ssc chsl mock test free, ssc chsl test series 2026, एसएससी सीएचएसएल मॉक टेस्ट,
ssc chsl tier 1 exam date, ssc chsl cut off.

**Reality check:** new pages on hp can get indexed within days (hp already has authority), but ranking for "ssc chsl
mock test" against Testbook and Adda in 30 days is unlikely. CHSL 2026 sales come from visitors already on our sites,
the WhatsApp/Telegram groups and the free mock link. The pages are mostly for CHSL 2027 rankings.

**Price:** Rs 99 (Tier 1). Tier 2 Rs 99 separately, or included if it's bought before the result.

### 4.3 SSC CGL 2026 (Tier 2) and CGL 2027 (Tier 1)

**Who:** graduates, 18–32 depending on the post. Posts are ASO, Inspector (Income Tax / Excise / Customs), Auditor,
Accountant, JSO, Tax Assistant and others. CGL has the highest prestige and the hardest competition (Testbook, Adda and
PW all fight for it).

**Tier 1 pattern:** 100 questions, 200 marks, 60 minutes, −0.50. Reasoning 25, GA 25, Quant 25, English 25. Qualifying
only; it doesn't count in the final merit.

**Tier 2 Paper I pattern ⚠ (2023 scheme):**

| Session | Section | Modules | Questions | Time |
|---|---|---|---|---|
| I | Section I | Maths 30 + Reasoning 30 | 60 (180 marks) | 1 hour |
| I | Section II | English 45 + GA 25 | 70 (210 marks) | 1 hour |
| I | Section III Module I | Computer Knowledge | 20 (60 marks, qualifying) | 15 minutes |
| II | Section III Module II | DEST (typing) | 1 task (qualifying) | 15 minutes |

3 marks per question, −1 per wrong answer. Paper II (Statistics) is only for JSO/SI posts ⚠. Whether Paper III still
exists is disputed between sources ⚠, so check before building it.

**Tests to build:**

| Test | Count | When |
|---|---|---|
| Tier 2 Paper I mocks | 5 | By mid-Dec 2026, once the Tier 2 date is out. **Needs the section timer.** |
| Tier 1 full mocks (CGL 2027) | 15 | Jan – May 2027 |
| Tier 1 sectionals | 8 | With the Tier 1 mocks |
| Statistics (Paper II) | (none) | Skip; it's for a small group. |

**Posts now (CGL 2026 Tier 1 just ended, so traffic is high):** answer key and how to raise objections; Tier 1 good
attempts and expected cut-off; Tier 1 result date; Tier 2 exam date; Tier 2 strategy in 45 days; post-wise salary and
job profile (and the 8th Pay Commission angle, which is searched a lot in 2026).

**Keywords:** ssc cgl mock test, ssc cgl tier 2 mock test, ssc cgl test series, ssc cgl cut off 2026, ssc cgl answer
key 2026, ssc cgl salary.

**Price:** Tier 2 Rs 149, Tier 1 Rs 149, or both for Rs 199.

### 4.4 SSC MTS & Havaldar (check whether the 2026 CBT has happened)

**Who:** 10th pass, 18–25 (MTS) / 18–27 (Havaldar and some MTS posts). MTS has a very large pool of applicants (lakhs).

**Pattern ⚠ (2023 scheme; question counts differ between sources):**

| Session | Subjects | Questions | Marks | Time | Negative |
|---|---|---|---|---|---|
| I | Numerical & Mathematical Ability 20, Reasoning 20 | 40 | 120 | 45 minutes | none |
| II | General Awareness 25, English 25 | 50 | 150 | 45 minutes | −1 per wrong answer |

Both sessions are on the same day and both count. Havaldar adds a PET/PST. Session I must be passed for Session II to be
evaluated ⚠.

**Tests to build:** 10 full mocks (two sessions, each with its own 45-minute timer. **This needs the section timer;**
until then a mock runs as one 90-minute test and the instructions say so), 6 sectionals, 2 PYQ-style papers. About
**1,050 questions**. 10th-level Reasoning and Maths are shared with GD (no repeats within MTS).

**State pages (layer B, automatic):** MTS vacancies and cut-offs are state-wise too, so MTS gets
`/ssc/mts/<state>` from the same kind of table as GD.

**Posts:** MTS 2026 exam date status; Session I vs II rules (no negative marking in Session I); MTS vs Havaldar
(the PET/PST difference); cut-off state-wise; salary.

**Keywords:** ssc mts mock test, ssc mts mock test in hindi, ssc mts havaldar test series, ssc mts exam date 2026,
ssc mts cut off.

**Price:** Rs 99.

### 4.5 SSC CPO: SI in Delhi Police and CAPF (Paper 1: 23–28 Nov 2026)

**Who:** graduates, 20–25. Posts are SI in Delhi Police, SI (GD) in CAPFs and SI (Fire) in CISF. The posts are
prestigious and men need a strong PET.

**Pattern ⚠:** Paper 1 is 200 questions, 200 marks, 2 hours, −0.25. Reasoning 50, GK 50, Quant 50, English 50.
Then PET/PST, then Paper 2 (English Language & Comprehension, 200 questions, 200 marks, 2 hours, −0.25), then medical.

**Tests to build:**

| Test | Count | When |
|---|---|---|
| Paper 1 full mocks | 3 (by 18 Nov), then 8 for CPO 2027 | Now |
| Paper 2 English mocks | 3 | After the Paper 1 result |

Content: 600 questions for the first 3 mocks (graduate level; GA and Reasoning can feed CGL later).

**Posts:** CPO 2026 revised Paper 1 date; CPO physical standards and PET; Delhi Police SI vs CAPF SI; cut-off; Paper 2
strategy.

**Keywords:** ssc cpo mock test, ssc cpo si mock test, ssc cpo exam date 2026, ssc cpo cut off, ssc cpo physical.

**Price:** Rs 99.

### 4.6 SSC Stenographer Grade C & D (next cycle 2027)

**Who:** 12th pass. Grade C 18–30, Grade D 18–27.

**Pattern ⚠:** CBT of 200 questions, 200 marks, 2 hours, −0.25. Reasoning 50, General Awareness 50, English 100. Then
a qualifying shorthand skill test: Grade C at 100 wpm, Grade D at 80 wpm. Transcription time is 40/55 minutes (C,
English/Hindi) and 50/65 minutes (D).

**Tests to build (for 2027):** 8 full CBT mocks, 4 English sectionals (50 each). About **1,800 questions**. Half of every
paper is English, so the English bank is the big job. Shorthand isn't something we can teach online; mention it on the
page, but don't build anything for it.

**Posts now:** Steno 2026 skill test date and rules; the result; then the 2027 notification.

**Keywords:** ssc stenographer mock test, ssc steno test series, ssc stenographer syllabus, ssc steno skill test.

**Price:** Rs 99.

### 4.7 SSC Selection Post (Phase XV, ~2027)

**Who:** 10th, 12th and graduate levels (three separate papers). There are hundreds of different posts across ministries;
each post has its own eligibility.

**Pattern ⚠:** each level is 100 questions, 200 marks, 60 minutes, −0.50. Reasoning 25, GA 25, Quant 25, English 25.
The difficulty rises with the level. Some posts add a skill test.

**Tests to build (for Phase XV):** 5 mocks per level = 15 full mocks. Levels map onto our other banks: Matric ≈ GD/MTS
level, Higher Secondary ≈ CHSL, Graduate ≈ CGL Tier 1. Write fresh mocks, but at the same levels so authors aren't
starting from zero. About **1,500 questions**.

**Posts:** Phase XIV result and cut-off; how to find the right posts in a Selection Post notice (students struggle with
the post list); Phase XV notification.

**Keywords:** ssc selection post mock test, ssc phase 14 result, ssc selection post phase 15, ssc phase 15 notification.

**Price:** Rs 99 per level, Rs 149 for all three.

### 4.8 SSC JE: Civil, Electrical, Mechanical (last)

**Who:** diploma or degree in engineering, up to 30–32 depending on the post. Posts are JE in CPWD, MES, BRO, CWC and
others.

**Pattern:** Paper 1 is 200 questions, 200 marks, 2 hours, −0.25: Reasoning 50, GA 50, General Engineering 100 (Civil &
Structural / Electrical / Mechanical). Paper 1 is qualifying ⚠. Paper 2 is 100 questions, 300 marks, 2 hours (objective,
in the chosen branch).

**Tests to build:** 5 Paper 1 mocks per branch (Reasoning and GA can be shared across branches; 100 engineering questions
per branch per mock), then 3 Paper 2 mocks per branch. About **1,500 + 900 engineering questions**.

**Gate:** **don't publish JE until someone with an engineering degree checks the technical questions.** A wrong formula
in an engineering mock costs more trust than the series earns. HPSEBL JE and HPRCA JE content already on hp may help;
check what can be adapted.

**Keywords:** ssc je mock test, ssc je civil mock test, ssc je electrical test series, ssc je previous year paper.

**Price:** Rs 149 per branch.

### Content volume at a glance

| Exam | New questions (first round) | First deadline |
|---|---|---|
| GD | ~2,100 | 4 mocks by 20 Nov, 20 by 31 Jan |
| CHSL T1 | ~1,200 | 6 mocks by 20 Nov |
| CPO P1 | ~600 | 3 mocks by 18 Nov |
| CGL T2 | ~750 | by mid-Dec |
| MTS | ~1,050 | depends on the 2026 status |
| CGL T1 2027 | ~1,700 | by May 2027 |
| Selection Post | ~1,500 | ~Jun 2027 |
| Steno | ~1,800 | ~Jun 2027 |
| JE | ~2,400 | when an engineer can check it |

That's about 13,000 questions in total. The GK and current-affairs questions need a human fact check (the same rule as
HP GK). Reasoning and Maths need their answers verified (re-solve every question; don't trust the generated key).

---

## 5. Code changes

### Part 1: the automatic SEO structure (§1.2)

Layer A (shared pages, canonical on hp, left out of other sites' sitemaps) **already works** for any `"*"` body, so it
needs no code. What does need code:

1. **State data table.** A new model, roughly:

   ```prisma
   model ExamStateData {
     id        String   @id @default(cuid())
     examId    String
     exam      Exam     @relation(fields: [examId], references: [id], onDelete: Cascade)
     state     String   // slug: "punjab", "himachal-pradesh", ...
     cycle     String   // "2027": the notification year the numbers belong to
     vacancies Json     // per force/post × category × gender, as the notice prints it
     cutoffs   Json     // [{ year, category, marks }] for the last 3 cycles
     centres   String[] // exam cities in the state
     notes     String?  // markdown: PET/PST relaxations, state-specific rules
     sourceUrl String   // the SSC notice PDF the numbers come from
     updatedAt DateTime @updatedAt
     @@unique([examId, state, cycle])
   }
   ```

   **Admin:** on `/admin/exams/[id]`, a "State-wise data" tab where you **paste CSV** (copy the table from the notice
   PDF into a sheet, export it, paste it) and see a preview before saving. Entering 36 states once per cycle should take
   about half an hour.
2. **State slug in `SiteConfig`.** Add `stateSlug` ("punjab", "himachal-pradesh", "rajasthan"), with a test that every
   site has one that is unique.
3. **Route** `src/app/[site]/[body]/[exam]/[state]/page.tsx`, next to `syllabus`, `exam-pattern`, ... (static segments
   win over the dynamic one, so those routes keep working).
   - It renders only when `params.state === site.stateSlug` **and** the exam has a row for that state with vacancies
     and at least one cut-off. Anything else is a 404.
   - Canonical: **self** (on the state's own site). This is the only kind of SSC page that isn't canonical to hp.
   - Content: the state's vacancies table, its cut-off trend, centres, notes, the date and source link, a "Start the
     free SSC GD mock" button, and links to the state's own GK tests (pb → Punjab GK; that's what makes the page more than
     a table).
   - `generateStaticParams`: one page per site per exam that has data; ISR, revalidated when the admin saves.
   - FAQ schema with real questions ("How many SSC GD posts are there in Punjab in 2027?").
4. **Sitemap:** each site's `sitemap.xml` lists its own state pages (`src/app/[site]/sitemap.xml/route.ts`).
5. **Layer C state block** on the exam hub: when the current site's state has data, show "SSC GD in Punjab: N posts,
   last cut-off M → see details". It reads the same table.
6. **Tests:** pb renders `/ssc/gd-constable/punjab`, but `/ssc/gd-constable/bihar` and `/ssc/cgl/punjab` are 404; the
   page is self-canonical; hp's GD hub is still canonical to hp from pb; the sitemap includes it only when there is data.

### Part 1b: the SSC Pass

D3 says a site's Pass opens every test the site shows, national ones included (`passCovers`,
`src/modules/commerce/access.ts:25`). With SSC as national, **an Rs 299 HP Pass would open all 8 SSC series**.
Recommendation: **a separate SSC Pass, sold on every site**, and state Passes don't cover SSC. In code, that's a
`passExcluded` flag on `ExamBody` (true for `ssc`) that `passCovers` checks, plus an SSC PASS product, sold on every site,
that covers only `ssc` (how it fits `Product.site` is decided when it's built). Delhi Police, NDA and CDS stay in state Passes as they are today.

### Part 2: needed for specific exams

| Feature | Needed by | Today | Change |
|---|---|---|---|
| **Section timer** | CGL T2, CHSL T2, MTS (two 45-minute sessions) | `TestSection.durationSec` exists in the schema, but the CBT only runs one test-wide deadline (`cbt.tsx:386`) | Enforce per-section time when it's set: lock the section when its time ends and move to the next, with no going back (SSC behaviour). |
| **Per-section marking** | MTS (Session I no negative, Session II −1) | Already supported: `marksCorrect` / `marksWrong` per section | None; just set it in the seed. |
| **Choose-one section** | GD Part D (English or Hindi) | Not supported | A `TestSection.choiceGroup`: the student picks one section of the group at the start; only that one is scored. Until then, use the fallback in §4.1. |
| **Typing test** | CGL DEST, CHSL skill test | Not supported | Phase 3. Also make it a **free public typing-test page** (`/ssc-typing-test`): "ssc typing test online" is a big, steady query, and every visitor is a CHSL/CGL aspirant. |
| **Regional languages** | GD, MTS, CHSL (13 languages ⚠) | `en`, `hi`, `pa` | Not worth it at first. Punjabi GD mocks on pbtestseries.in are a cheap niche later, since `pa` already exists. |

### Part 3: tools that pull traffic (after launch, pick 1–2)

- **SSC age calculator** ("age as on 1 Jan 2027 for GD"), cheap to build.
- **GD physical standards checker** (state + category → required height, chest and race).
- **Marks calculator from the response sheet** ("ssc chsl marks calculator"): huge traffic for 2 weeks after every exam,
  but it means parsing SSC's response-sheet page, which can change without notice. Build it only if one exam proves it
  is worth it.

---

## 6. SEO for SSC on the state sites

### What we're up against

Testbook, Adda247, PW, Oliveboard and Careers360 own the head terms ("ssc cgl mock test"). hp won't beat them on those
soon. We win on:

1. **State pages (layer B)**: "ssc gd vacancy punjab", "ssc gd cut off himachal". Big sites have one all-India page for
   these; we have a page per state, on that state's own domain.
2. **Hindi and Hinglish long-tail** ("ssc gd mock test in hindi free", "एसएससी जीडी हाइट स्टेट वाइज").
3. **A free mock with no login** (we already have this; the big sites gate theirs behind sign-up).
4. **Freshness:** being first with a correct, dated answer the day a notice comes out.
5. **Tools** (typing test, age and physical checker), later.

### What happens automatically (no SEO work per site)

| Thing | How |
|---|---|
| SSC pages appear on every site | `sites: ["*"]` |
| One indexable copy of each shared page | canonical to hp (`canonicalSiteCode`) |
| Other sites' sitemaps skip shared pages | the sitemap route's `owns()` check |
| Each site's own SSC state pages | layer B route + sitemap, from the state data table |
| The state block on shared hubs | layer C, same table |
| Exam FAQ schema, OG image, breadcrumbs | existing exam page code |
| A new state site | all of the above switch on with its config |

### What is done by hand, once, on hp (not per site)

- Exam hub copy, syllabus, pattern, FAQs (`prisma/exam-pages/ssc.ts`).
- National news posts (notification, admit card, answer key, result, cut-off). They're published on hp (D5); the other
  sites link to them from the exam hub's "Latest" list.
- The state data table, once per cycle, for all 36 states/UTs.
- When a new SSC hub or state page goes live: GSC → URL Inspection → "Request indexing" (on hp's property for hubs, on the
  state site's property for its state page). A few URLs a day.

### URL plan (the same on every site)

| URL | What | Canonical |
|---|---|---|
| `/ssc` | Body page: what SSC is, all exams, the calendar | hp |
| `/ssc/gd-constable`, `/ssc/cgl`, `/ssc/chsl`, `/ssc/mts`, `/ssc/cpo`, `/ssc/stenographer`, `/ssc/je`, `/ssc/selection-post` | Exam hubs (+ `/syllabus`, `/exam-pattern`, `/previous-year-papers`, `/tests`) | hp |
| `/ssc/gd-constable/<own-state>`, `/ssc/mts/<own-state>` | State page (layer B) | **the site itself** |
| `/tests/ssc-gd-constable-full-mock-1` and so on | Tests (the existing `/tests/<slug>` route) | hp |
| `/blog/<slug>` | National news posts, on hp only | hp |

### Page rules

- **One main query per page**, with Hindi + English in the title: "SSC GD Mock Test 2027 Free (Hindi & English) |
  80 Questions". State page: "SSC GD Vacancy 2027 in Punjab: Force-wise Posts & Cut-off".
- **Answer in the first two lines** ("SSC CHSL Tier 1 2026 is from 30 November to 31 December 2026, SSC notice of 1
  October 2026"), then the details.
- **FAQ schema on every exam page** (already supported) with real questions.
- **Dated facts link to the SSC notice PDF.** State pages show "Source: SSC notice of <date>" and "Updated on <date>".
- **Update, don't duplicate:** one calendar post, one notification post per exam per cycle. Edit them, change "Updated
  on", and add a "What changed" line.
- **Internal links:** state home → "Central exams (SSC)" → hubs → free mock → series; every post → its exam hub and free
  mock; state page → state GK tests and the free mock.
- **The disclaimer** "not affiliated with the Staff Selection Commission" goes on every SSC page.
- **Don't publish an exam before it has its pattern and 2 mocks.** JE, Steno and Selection Post stay unpublished until
  their phase. (An unpublished exam is hidden on every site at once.)

### Weekly routine

- GSC (hp property) → Queries filtered on "ssc": find pages at position 8–20 with impressions; improve the title, add a
  first-lines answer and an FAQ.
- GSC (each state property) → its state pages: are they indexed, what do they rank for?
- GSC → Pages: fix "Crawled – currently not indexed" (usually thin pages: add to them or merge them).
- 3–4 SSC posts a week on hp, only from SSC notices.
- One monthly current-affairs test (GD, MTS and CHSL all use it).
- Admin: SSC orders per site (which state site sells the most SSC?).

---

## 7. Go-live checklist (per exam, not per site)

SSC has no site launch: each exam goes live on every site the moment it's published. Before publishing an exam:

- [ ] Hub filled: description, syllabus, pattern, FAQs, all checked against the current SSC notice.
- [ ] At least 2 mocks seeded (GD 4, CHSL 6, CPO 3 for the first round), Mock 1 free.
- [ ] A human has checked the GK and current-affairs answers in the free mock.
- [ ] The series product and price exist, and the SSC Pass covers it.
- [ ] On pb or rj: the hub shows, its canonical points to hp, and pb's sitemap doesn't list it.
- [ ] The disclaimer shows on the hub and the test pages.

Before the first layer B page goes live (GD, once the 2027 notice is out):

- [ ] The state data table is filled for all 36 states/UTs from the notice, with the source URL.
- [ ] pb's `/ssc/gd-constable/punjab` renders, is self-canonical and is in pb's sitemap; `/ssc/gd-constable/bihar` is 404.
- [ ] hp and rj state pages render the same way.

Target: **CHSL, CPO and GD live by 15 November 2026.**

---

## 8. Admin setup (records to create)

Seed these through `prisma/catalogue.ts` and the series seeds rather than by hand in `/admin`, so a fresh database
gets them too. `/admin` is for edits afterwards.

**Body** (`prisma/catalogue.ts`):

| Field | Value |
|---|---|
| slug | `ssc` |
| name / nameHi | Staff Selection Commission (SSC) / कर्मचारी चयन आयोग (SSC) |
| sites | `["*"]` (every site; canonical on hp) |
| passExcluded | `true` (state Passes don't cover SSC; see §5 part 1b) |

**Exams** (under `ssc`; pages in `prisma/exam-pages/ssc.ts`, posts in `prisma/exam-pages/ssc-posts.ts` with `site: "hp"`; state data from the admin CSV paste, §5 part 1):

| slug | name | nameHi | Publish in phase |
|---|---|---|---|
| `gd-constable` | GD Constable | जीडी कांस्टेबल | 1 |
| `chsl` | CHSL (10+2) | सीएचएसएल | 1 |
| `cpo` | CPO (SI in Delhi Police & CAPF) | सीपीओ (दिल्ली पुलिस एवं CAPF में SI) | 1 |
| `cgl` | CGL | सीजीएल | 2 |
| `mts` | MTS & Havaldar | एमटीएस एवं हवलदार | 3 |
| `selection-post` | Selection Post | सिलेक्शन पोस्ट | 4 |
| `stenographer` | Stenographer Grade C & D | स्टेनोग्राफर ग्रेड C एवं D | 4 |
| `je` | Junior Engineer (Civil, Electrical, Mechanical) | जूनियर इंजीनियर | 5 |

**Series and products (suggested prices; the owner decides):**

| Product | Contains | Price |
|---|---|---|
| SSC GD Constable 2027 Mock Test Series | 20 mocks + 8 sectionals + monthly CA + 4 PYQ-style | Rs 99 |
| SSC CHSL 2026 Tier 1 Series | 10 mocks + 8 sectionals | Rs 99 |
| SSC CHSL Tier 2 Series | 3 mocks | Rs 99 |
| SSC CPO Paper 1 Series | 3 → 8 mocks | Rs 99 |
| SSC CGL Tier 2 Series | 5 mocks | Rs 149 |
| SSC CGL Tier 1 Series (2027) | 15 mocks + 8 sectionals | Rs 149 |
| SSC MTS & Havaldar Series | 10 mocks + 6 sectionals + 2 PYQ-style | Rs 99 |
| SSC Selection Post Series (per level / all) | 5 mocks per level | Rs 99 / Rs 149 |
| SSC Stenographer Series | 8 mocks + 4 sectionals | Rs 99 |
| SSC JE Series (per branch) | 5 Paper 1 + 3 Paper 2 | Rs 149 |
| **SSC Pass** (every SSC series, 1 year) | all of the above | **Rs 299** |

For comparison, the big sites sell an all-exam yearly pass for roughly Rs 300–600, so the SSC Pass has to stay close to
that. Per-exam series at Rs 99 is our edge.

**Test slug pattern** (the `delhi-police` style): `ssc-gd-constable-full-mock-1`, `ssc-gd-constable-reasoning-1`,
`ssc-chsl-tier-1-full-mock-1`, `ssc-cgl-tier-2-full-mock-1`, `ssc-cpo-paper-1-full-mock-1`, `ssc-mts-full-mock-1`,
`ssc-selection-post-matric-full-mock-1`, `ssc-stenographer-full-mock-1`, `ssc-je-civil-paper-1-full-mock-1`.

**Coupons:** one SSC launch coupon valid on every site (`Coupon.site = null`), and a Telegram-only coupon to see which
channel sells.

---

## 9. Risks

- **The "HP" brand on national searches.** hp holds the canonical, and a student in Bihar may not click "HP Test
  Series" for SSC GD. Layer B (state pages on each state's own domain) and the Hindi long-tail are the answer; head terms
  stay hard. Accepted by the owner: no separate SSC domain.
- **CHSL 2026 and CPO 2026 are close.** Sales come from visitors already on our sites and from WhatsApp/Telegram, not
  from new Google rankings.
- **The SSC calendar slips.** GD 2027 has already missed two expected notification dates. Every date post says "as of
  <date>" and gets edited.
- **The patterns change.** SSC rewrote CGL and CHSL Tier 2 in 2023, and GD and MTS details move between cycles. Seed a
  pattern only after reading the current notice, and keep each test's "check the notification" line.
- **Scaled content.** ~13,000 questions and 8 hubs is a lot of content. Publish in phases, check facts, and keep empty
  exam pages unpublished.
- **The look of an official site.** SSC pages must not look like ssc.gov.in to users, Google or ad platforms. Keep the
  disclaimer and no SSC logo.
- **Wrong state numbers.** A layer B page with a wrong vacancy count is worse than no page. Paste from the notice, show
  the source link, and spot-check the three states we have sites for.
- **Shared VPS.** SSC pages are ISR on every site (pages × sites). Watch memory once GD traffic arrives.

## 10. Open questions for the owner

1. ~~Domain~~: decided 31 Oct 2026. No separate SSC domain; SSC lives on every state site, canonical on hp.
2. **SSC Pass:** separate, sold on every site (recommended), or part of the state Passes?
3. **Prices:** OK with §8?
4. **GD Part D:** both versions in one mock (recommended), or two tests per mock?
5. **MTS 2026:** please check ssc.gov.in. Has the CBT happened, or is there a date?
6. **Who checks facts?** GK and current affairs need a person. JE needs an engineer.
7. **Delhi Police Constable:** keep its own body (recommended), or move it under SSC? Moving it changes its URLs, so
   only with 301 redirects.

## Sources (read 31 October 2026)

- SSC calendar 2026-27: [Testbook (revised calendar)](https://testbook.com/news/ssc-new-exam-calendar-2026-27-out/), [PW](https://www.pw.live/news/ssc-calendar-2026-cgl-chsl-mts-gd-dates), [Adda247](https://www.adda247.com/exams/ssc/ssc-calendar-2026/), [Shiksha](https://www.shiksha.com/news/sarkari-exams-ssc-new-calendar-2026-27-released-check-cgl-chsl-mts-gd-application-notification-dates-here-blogId-224676)
- CGL 2026: [Mahendras (exam date)](https://www.mahendras.org/blogs/ssc-cgl-exam-date-tier-1-schedule-tier-2-date), [Career Power (revised vacancies)](https://www.careerpower.in/ssc-cgl.html), [Testbook](https://testbook.com/ssc-cgl-exam), [Mahendras (syllabus)](https://www.mahendras.org/blogs/ssc-cgl-syllabus-and-exam-pattern-tier-1-and-tier-2), [PracticeMock (pattern)](https://www.practicemock.com/blog/ssc-cgl-exam-pattern-2026/)
- CHSL 2026: [Testbook (notification)](https://testbook.com/news/ssc-chsl-notification-2026-out/), [Testbook (exam date)](https://testbook.com/news/ssc-chsl-exam-date-2026-out/), [FreeJobAlert](https://www.freejobalert.com/articles/ssc-chsl-tier-1-exam-date-2026-3075674), [Careers360](https://competition.careers360.com/articles/ssc-chsl-2026)
- GD 2027: [Oliveboard](https://www.oliveboard.in/ssc-gd-notification/), [Daily Jagran](https://www.thedailyjagran.com/education/news/ssc-gd-recruitment-2027-ssc-to-release-gd-constable-notification-likely-to-be-out-soon-check-exam-date-eligibility-and-application-process-10333212), [Testbook](https://testbook.com/news/ssc-gd-constable-notification-2027/), [Mahendras (pattern)](https://www.mahendras.org/blogs/ssc-gd-exam-pattern), [Careers360 (2026 cycle)](https://news.careers360.com/ssc-gd-constable-2026-exam-postponed-25487-vacancies-new-date-soon-capfs-ssf-assam-rifles-pattern-hall-ticket-city-slip-updates)
- MTS: [Mahendras](https://www.mahendras.org/blogs/ssc-mts-notification), [Mahendras (pattern)](https://www.mahendras.org/blogs/ssc-mts-syllabus-and-exam-pattern), [Adda247](https://www.adda247.com/ssc-mts), [Career Power](https://www.careerpower.in/ssc-mts.html)
- CPO: [PW (revised date)](https://www.pw.live/news/ssc-cpo-si-capf-revised-exam-date-2026), [Career Power](https://www.careerpower.in/ssc-cpo.html), [Adda247](https://www.adda247.com/exams/ssc/ssc-cpo-notification-2026-out/)
- Stenographer: [Testbook](https://testbook.com/ssc-stenographer), [Adda247](https://www.adda247.com/exams/ssc/ssc-stenographer-notification-2026/), [SSC Drishti](https://www.sscdrishti.com/blog/ssc-stenographer-2026-exam-date-grade-c-d-pattern-tips), [class24 (pattern)](https://www.class24.study/ssc-stenographer/ssc-stenographer-exam-pattern)
- JE: [Testbook (notification)](https://testbook.com/news/ssc-je-2026-notification-out/), [Adda247 (exam date)](https://www.adda247.com/engineering-jobs/ssc-je-exam-date-2026/), [PW](https://www.pw.live/ae-je/exams/ssc-je-2026), [MADE EASY (pattern)](https://blog.madeeasy.in/ssc-je-civil-syllabus)
- Selection Post Phase XIV: [PW](https://www.pw.live/ssc/exams/ssc-selection-post-phase-14-vacancy-2026), [Adda247](https://www.adda247.com/exams/ssc/ssc-selection-post-phase-14-exam-date-2026-out/), [Testbook](https://testbook.com/ssc-selection-post)
- Official: [ssc.gov.in](https://ssc.gov.in) (check every pattern and date here before seeding)
