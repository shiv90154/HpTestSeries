# rjtestseries.in — Rajasthan plan

Written 26 October 2026. rjtestseries.in has been live since 25 October 2026 (commit d495700) in **soft launch**: anyone can open it, but it serves `noindex` and has no sitemap entries, so Google will not rank it yet. The GSC Domain property has been added.

This file covers three things: what Rajasthan aspirants are preparing for right now, what we build first, and how we do SEO for the site. The general multi-site rules are in [MULTI-SITE-PLAN.md](MULTI-SITE-PLAN.md).

> **Dates change often in Rajasthan.** RSSB revised its whole calendar on 28–29 September 2026 because of the municipal and Panchayati Raj elections. Every date below comes from news and coaching sites that quote RSSB and RPSC press notes. Check the date on rssb.rajasthan.gov.in or rpsc.rajasthan.gov.in before it goes on the site.

---

## 1. What is happening in Rajasthan (October 2026)

### Upcoming exams, nearest first

| When | Exam | Body | Notes for us |
|---|---|---|---|
| 17 Nov – 21 Dec 2026 | Teaching Associate (contract), 32 subjects | RSSB | Too many subjects for us. Skip. |
| **1 – 3 Dec 2026** | **CET Senior Secondary (12th level) 2026** | RSSB | Eligibility test for RSSB's 12th-level posts (LDC/Junior Assistant, Forest Guard and others; check each advertisement). **Our nearest big target.** |
| **6 Dec 2026** | **RAS / RTS Prelims 2026**, 607 posts | RPSC | The date moved from 29 Nov to 6 Dec 2026. Mains is 1–2 May 2027. |
| 8 Dec 2026 | School Lecturer (Special Education) | RPSC | Niche. Skip. |
| 27 Dec 2026 | Assistant Prosecution Officer Mains | RPSC | Niche. Skip. |
| **16 – 18 Jan 2027** | **CET Graduate Level 2026** | RSSB | Gateway for graduate posts such as Patwari, VDO and Junior Accountant. **Biggest search volume of the season.** |
| ~25 Jan 2027 | Laboratory Attendant 2025 | RSSB | One source prints "25 Nov 2027"; that looks like a typo. |
| 3 – 5 Feb 2027 | Junior Engineer combined 2026 | RSSB | Technical. Later, if at all. |

### Expected, not yet notified

| Exam | Status | Why it matters |
|---|---|---|
| **Rajasthan Police Constable 2026** | Notification expected early 2027 (sources disagree on vacancies: 1,000 to 6,000+). | Highest-volume evergreen exam in the state. Build before the notification so we rank when it lands. |
| **Rajasthan Patwari** | No 2026 notification yet. The last exam was 17 Aug 2025 (3,705 posts). It needs CET Graduate. | Comes right after CET Graduate. Same Rajasthan GK, so the work carries over. |
| **Rajasthan High Court LDC / JJA** | Notification "expected"; no official date. | On hptestseries.in, High Court pages bring ~60% of clicks. This may behave the same way in Rajasthan. Watch hcraj.nic.in. |
| VDO (Gram Vikas Adhikari) | No 2026 notification found. | Same CET Graduate gateway as Patwari. |

### Already over (posts only, no mocks)

- **LDC / Junior Assistant 2026** (10,644 posts): exam held 5 July 2026. Result, cut-off and DV posts can get traffic.
- **4th Grade (Group D) 2024** (53,749 posts): final result 29 June 2026.
- **REET Mains 2025** (Level 1 and 2): exam January 2026, results May–June 2026. No new REET notification found.

### How Rajasthan papers work (this changes our product)

- **Offline OMR, not CBT.** RSSB and RPSC 2026 exams are pen-and-paper. Rajasthan Police Constable is OMR too. Our "real CBT format" line from HP doesn't fit Rajasthan as it stands.
- **The 5th option (E).** RSSB and RPSC papers have options A–E. **E means "I am not answering this".** The official rule: a candidate who leaves more than 10% of the questions with no bubble filled, not even E, is disqualified. Students practise this, and almost no mock site enforces it. *Verify the exact rule text in a current RSSB advertisement before we build it.*
- **Negative marking is 1/3** on RSSB and RPSC papers (CET Graduate, Patwari). CET Senior Secondary may have none; sources disagree. Constable is 1/4.
- **Patterns we can use now** (verify each against the advertisement):
  - **CET (both levels):** 150 questions, 300 marks, 3 hours. Rajasthan GK, history, art and culture, geography, polity, economy, science, reasoning and maths, Hindi, English, computer, current affairs.
  - **Patwari:** 150 questions, 300 marks, 3 hours, 1/3 negative. Basic computer is 15 questions (official RSSB PDF).
  - **Police Constable:** 150 questions, about 2 hours, 1/4 negative. About 60 reasoning and computer, 45 Rajasthan GK, plus GK and women/children-crime laws. Section split differs by source.
- **Language:** papers are bilingual, and students search mostly in Hindi ("राजस्थान पटवारी मॉक टेस्ट", "CET मॉक टेस्ट फ्री").

---

## 2. What we build, in order

The rule from the multi-site plan applies here: **depth on a few exams first.** Fill two exams fully (body page, exam page, syllabus, pattern, mocks, posts) before starting a third.

### Phase A — CET first (now → 30 Nov 2026)

CET is the right first exam: it is the nearest, every graduate and 12th-pass aspirant takes it, and it is mostly Rajasthan GK, which we already started.

1. **RSSB body** (`rssb`, sites `["rj"]`) with a body page: what RSSB is, CET as the gateway, the OMR and option E rule, official site link.
2. **Exams:** `rssb/cet-graduate` and `rssb/cet-senior-secondary`, with description, syllabus, pattern and FAQs from the official notice.
3. **Mocks:** 2 full CET Senior Secondary mocks (150 Q) before 20 Nov, then 3 CET Graduate mocks before mid-December. Plus 5 sectional Rajasthan GK tests (history, geography, art and culture, polity, economy) that serve every exam.
4. **Posts** (Hindi-first titles):
   - RSSB revised exam calendar 2026 (update it every time RSSB changes it; "RSSB exam calendar" is searched all year).
   - CET Senior Secondary 2026: exam date, admit card, pattern.
   - CET Graduate 2026 moved to January 2027: new dates and what it means.
   - The option E rule explained: how not to get disqualified.
   - Rajasthan GK: 50 most-asked questions from CET 2024 (from the official paper, not invented).
5. **Spot-check** the free mock and /rajasthan facts (see the end of this file).

### Phase B — RAS Prelims (parallel, small)

RAS gets heavy search volume, but big coaching brands own it. Don't build a full series. Make 2 free RAS Prelims mocks and one pattern post before 6 Dec. They pull RAS traffic into the site and the Rajasthan GK tests.

### Phase C — Patwari and Police Constable (Dec 2026 → Feb 2027)

- **Patwari** after CET Graduate: same Rajasthan GK, plus computer and revenue terms. 5 mocks.
- **Rajasthan Police Constable** before its notification: Rajasthan Police body, exam page with pattern and physical standards, 5 mocks with the OMR/E behaviour.
- Watch **Rajasthan High Court LDC/JJA**. If the notification comes, it jumps the queue: High Court pages are what work best on hp.

### Phase D — the OMR practice mode (product)

Rajasthan students don't sit a CBT, so a CBT-only mock sells the wrong practice. Add a per-test option:

- Five bubbles (A–E). E is "not attempted".
- At submit, warn when more than 10% of the questions have no bubble, and show in the result that the real paper would have been disqualified.
- An OMR-sheet style layout (question paper + separate answer sheet) for rj tests.

The question model already supports any number of options (`QuestionOption` relation). This is a test-level setting and a UI change, not a schema rewrite. **Build it before the Constable series**, because that is where it matters most.

### Launch checklist (flip `launched: true`)

Flip only when all of these are true:

- [ ] RSSB body + CET Graduate + CET Senior Secondary pages are filled.
- [ ] At least 4 full mocks and 5 Rajasthan GK sectionals are published.
- [ ] At least 6 rj posts are published, each built from an official notice.
- [ ] A human has checked the GK facts (free mock, /rajasthan, sectionals).
- [ ] Razorpay has approved rjtestseries.in, and a test payment has gone through end to end.
- [ ] Resend has verified the domain and `EMAIL_FROM_RJ` is set on the VPS.
- [ ] A Telegram or WhatsApp channel exists, and its link is in `src/sites/rj.ts` `social`.
- [ ] The price is decided (pb and hp mocks are Rs 99–199).

Target: **launch around 20 November 2026**, so CET Senior Secondary pages can get indexed and rank before 1 December.

---

## 3. SEO for rjtestseries.in

### Before launch (now)

- **Keep `noindex` until the launch checklist is done.** Indexing a near-empty site that shares a template with hp and pb is exactly Google's "doorway" pattern. A late start costs less than a bad first impression.
- **Don't submit the sitemap yet.** It is empty while `launched: false`. Submit it on launch day.
- Use GSC only to check that the property is verified and that there are no security or manual-action messages.

### On launch day

1. Deploy with `launched: true`.
2. GSC → Sitemaps → submit `https://rjtestseries.in/sitemap.xml`.
3. GSC → URL Inspection → "Request indexing" for the home page, `/rajasthan`, `/rssb`, both CET exam pages, and the free mock. About 10 URLs a day is enough; don't spam.
4. Share the free mock in the Telegram/WhatsApp channel and Rajasthan aspirant groups. The first real visits and links come from there, not from Google.

### Keywords to aim at

Aim each page at one main query. Use Hindi + English in the title, as Rajasthan searches are mostly Hindi or Hinglish.

| Page | Main query | Also |
|---|---|---|
| /rssb/cet-graduate | Rajasthan CET mock test | राजस्थान सीईटी मॉक टेस्ट, CET graduate level test series |
| /rssb/cet-senior-secondary | CET 12th level mock test | सीईटी 12वीं लेवल टेस्ट |
| /rajasthan | Rajasthan GK in Hindi | राजस्थान सामान्य ज्ञान, Rajasthan districts list 41 |
| Rajasthan GK sectionals | Rajasthan GK mock test | राजस्थान इतिहास टेस्ट, राजस्थान भूगोल टेस्ट |
| Calendar post | RSSB exam calendar 2026 | RSSB new exam date, rssb revised calendar |
| Option E post | OMR 5th option rule RSSB | ई विकल्प नियम, 10 प्रतिशत नियम |
| Later: Patwari, Constable | Rajasthan Patwari mock test, Rajasthan Police constable test series | पटवारी मॉक टेस्ट, राजस्थान पुलिस टेस्ट |

Long-tail queries that big sites answer badly are the easiest early wins: "option E rule", "CET graduate new date January 2027", "Rajasthan 41 districts list after 2024", "RSSB calendar revised September 2026".

### Content rules

- **Every page must be genuinely about Rajasthan.** No copying HP or Punjab text with the state name swapped. Google's scaled-content and doorway policies are the main risk of the multi-site setup.
- **Facts come from official notices, never from memory or AI alone.** Each news post links to the RSSB/RPSC notice it is based on. Rajasthan sites quote conflicting dates all the time; being right and dated is how we earn trust.
- **Update, don't duplicate.** When RSSB changes a date, edit the existing post, change "Updated on", and add a short "What changed" line. Don't write a new post for each revision.
- **Answer the question in the first two lines.** "CET Graduate 2026 will be held on 16, 17 and 18 January 2027 (RSSB press note, 28 Sep 2026)." Then the details.
- **Each exam page gets FAQ schema** (already supported) with real questions: negative marking, option E, validity of the CET score, which posts it opens.
- **Internal links:** home → CET pages → mocks; /rajasthan → Rajasthan GK sectionals; every post → the matching exam page and the free mock.
- **No sitewide links to hp or pb** (multi-site rule 5). National exams (NDA, CDS, PGIMER, etc.) already canonical to hp; leave that as is.

### After launch, every week

- GSC → Performance → Queries: note queries with impressions but position 8–20 and improve those pages (better title, an answer in the first lines, an FAQ).
- GSC → Pages: fix anything "Crawled – currently not indexed". Usually the page is thin; add content or merge it.
- Write 2–3 posts a week, only from official notices: calendar changes, admit cards, answer keys, results, cut-offs.
- Track on the admin site filter (`?site=rj`): signups, free-mock attempts, paid orders.

### What not to do

- Don't buy links or join link-exchange networks.
- Don't publish 30 thin exam pages at once. Add an exam only when its page, pattern and at least two mocks exist.
- Don't list hp's or pb's YouTube/Telegram on rj (`social` stays rj-only).
- Don't let AI-written GK go live unchecked.

---

## 4. Open questions for the owner

1. **Price** for rj mocks: Rs 99 like pb and the new HP series, or lower for CET, where students are price-sensitive?
2. **Who checks the facts?** Rajasthan GK needs a person who knows it (a teacher or a recent CET topper) to spot-check mocks and /rajasthan.
3. **Channel:** start a Telegram channel "RJ Test Series" now, before launch, so it has members on launch day.
4. **OMR mode:** OK to build the A–E / 10% rule (Phase D) before the Police series?

## 5. Facts to spot-check before launch

- 41 districts after the December 2024 reorganisation (src/sites/rj.ts, /rajasthan page, free mock Q16).
- 7 divisions (/rajasthan quick facts).
- Chambal as "the only perennial river" (free mock Q5); Banas as the longest river entirely within the state (CBT preview).
- State symbols: Camel and Chinkara (animal), Godawan (bird), Khejri (tree), Rohida (flower).
- The district "known for" chips on /rajasthan, especially the new districts (Balotra, Didwana-Kuchaman, Khairthal-Tijara, Phalodi).

## Sources (read 25–26 October 2026)

- RSSB revised calendar, 29 Sep 2026: [Daily Jagran](https://www.thedailyjagran.com/education/news/rssb-exam-calendar-2026-out-rssb-confirms-dates-for-5-major-exams-including-rajasthan-cet-full-schedule-here-10330882), [eduadvice](https://eduadvice.in/educational-news-details/rssb-exam-calender-2026-out-rajasthan-cet-je-other-exam-details/12753), [FreeJobAlert](https://www.freejobalert.com/articles/rssb-cet-exam-calendar-2026-3070107)
- CET dates and pattern: [Adda247](https://www.adda247.com/exams/rajasthan/rajasthan-cet-graduation-level-notification-2026/), [Testbook](https://testbook.com/rajasthan-cet-for-graduates), [Utkarsh syllabus](https://utkarsh.com/exams/rsmssb-cet/rsmssb-cet-syllabus/rajasthan-cet-graduation-level-syllabus)
- RAS 2026: [rasonly.com](https://rasonly.com/ras/exams/ras-exam-date), [Testbook](https://testbook.com/rpsc-ras), [RPSC](https://rpsc.rajasthan.gov.in/)
- Police Constable: [Testbook](https://testbook.com/rajasthan-police-constable), [Careers360](https://competition.careers360.com/articles/rajasthan-police-recruitment), [AglaSem pattern](https://career.aglasem.com/police/rajasthan-police-constable/syllabus)
- Patwari: [Testbook](https://testbook.com/rajasthan-patwari), [RSSB Patwari pattern PDF via ResultBharat](https://www.resultbharat.com/NOTICE/RSSB-Patwari-2025-Exam-Pattern-Syllabus.pdf)
- LDC / Junior Assistant 2026: [Adda247](https://www.adda247.com/exams/rajasthan/rajasthan-ldc-recruitment-2026/), [Utkarsh](https://utkarsh.com/exams/rsmssb-ldc)
- 4th Grade result: [FreeJobAlert](https://www.freejobalert.com/articles/rajasthan-4th-grade-result-2026-3034961)
- REET Mains: [Adda247](https://www.adda247.com/teaching-jobs-exam/reet-mains-result-2026-out/), [Careers360](https://news.careers360.com/reet-mains-notification-2025-out-for-7123-posts-registration-begins-today-rssb-level-1-2-upper-primary-school-teacher-recruitment)
- High Court LDC: [computeranudeshak.in](https://computeranudeshak.in/high-court-ldc-bharti-2026/)
- OMR mode and option E: [Adda247 (Computer Instructor)](https://www.adda247.com/exams/rajasthan/rssb-computer-instructor-admit-card-2026/), [PW (Forester)](https://www.pw.live/state-govt-jobs/exams/rssb-forester-question-paper-2026)
