# hrtestseries.in — test series plan

Last updated: 9 November 2026. Same method as `docs/PB-TEST-SERIES-PLAN.md`: decide which Haryana exams get series, in
what order, and what must happen before the site can earn. Update the status table at the bottom as work lands.

## 1. Where we stand

- hrtestseries.in is live but **noindex** (`launched: false` in `src/sites/hr.ts`). No organic traffic until it is launched
  (section 6), however many tests we add.
- The only Haryana test today is the free **Haryana GK mock** (`prisma/haryana/free-mock.ts`). No paid series, no exam
  pages, no posts.
- All exam facts below come from aggregator sites (Testbook, Adda247, CareerPower, PW, news sites) found on 9 Nov 2026.
  **None is verified against hssc.gov.in / hpsc.gov.in.** Re-check each against the official notice before it goes into
  exam-page copy (the PB plan has the same rule).

## 2. What is live or likely (research, unverified)

| Exam | What the sources say | Use |
|---|---|---|
| HSSC CET Group C (Advt 02/2026) | ~7,339 Group C vacancies reported; Mains date "to be announced"; CET score gates Police, Patwari, Clerk and most Group C posts | **Series 1** — covers the most posts |
| Haryana Police Constable (Advt 01/2026) | 5,500 posts (4,500 male GD, 600 female GD, 400 male GRP); form closed Jan 2026. A further ~4,000 posts reported for ~Nov 2026 / Mar 2027, **not confirmed** | **Series 2** — largest audience |
| HPSC HCS | 102 posts, prelims 26 Apr 2026 (already held). Next cycle unknown | later |
| HTET | no 2026 date found | later (pedagogy syllabus, separate bank) |
| Patwari, Clerk, Gram Sachiv | recruited through CET Group C | served by Series 1 + Haryana GK bank |

**Open conflict — CET marking.** Aggregators say 100 questions, 100 marks, 105 minutes, and *no negative marking for wrong
answers*; the HSSC advertisement PDF (possibly the 2025 cycle) says **−1 for each unattempted question**. Our CBT can
only deduct for wrong answers, so mocks use `marksWrong: 0` and say in the instructions that the unattempted-question
penalty is not simulated. Owner/human must confirm with the 2026 advertisement before launch.

## 3. Series specs

### 3.1 HSSC CET Group C — build first

Proposed (our section split; HSSC's is only partly published): 100 questions, 105 minutes, `marksWrong: 0`.
Haryana GK 25, General Awareness / current affairs 20, Reasoning 20, Maths 15, English 10, Hindi 10, Computer 10 minus
overlap to total 100 (final split to be fixed after the owner checks the notice).

| Test | Count | Questions |
|---|---|---|
| Free full mock | 1 | 100 |
| Paid full mocks | 6 | 100 each |
| Sectionals (Haryana GK ×4, GA ×2, Reasoning ×2, Maths ×2, English ×2, Hindi ×2, Computer ×1) | 15 | 25 each |
| **Total** | **22** | **≈ 1,075** |

Price proposal: **₹149**, 180 days (not owner-confirmed).

### 3.2 Haryana Police Constable — second

Paper = CET-scored; the physical stage follows. Reuse the HP Police bank (GK, reasoning, maths, English are not state
specific) via the hash-reuse approach in `prisma/pb-reuse.ts`, plus Haryana GK from the new bank. 1 free + 6 paid mocks +
8 sectionals. ₹199, 365 days (proposal).

### 3.3 Shared Haryana GK bank — written first, serves both

Target 300 questions: history (Panipat, Kurukshetra, Rakhigarhi, Haryana formation), geography and rivers (Ghaggar,
Yamuna, Markanda), districts (22), culture and fairs, economy and agriculture, polity and administration, sports and
personalities. The existing taxonomy `haryana-gk` already has the topics. **Facts are AI-written and need a human spot
check before sale.**

## 4. Content around it (SEO)

- Exam bodies `hssc`, `hpsc` and exam pages: HSSC CET, Haryana Police Constable (pattern, syllabus, FAQs, `seo` block).
- Posts (seeded as drafts for the owner to publish): *HSSC CET Group C syllabus & exam pattern 2026*; *Haryana Police
  Constable syllabus, PST/PET and exam pattern*; *Haryana GK important topics for CET (district-wise)*; *CET vs Police
  cut-offs*.
- Per-site `PostSeed` with `site: "hr"` in `prisma/exam-pages/haryana-posts.ts`, mirroring `punjab-posts.ts`.
- Dated claims always say "in the 2026 drive" and link to hssc.gov.in.

## 5. Next drive to watch

The reported ~4,000-post Police notification (Nov 2026 / Mar 2027): when HSSC announces it, update the Police page the
same day. Not confirmed, so no copy may state it as fact.

## 6. Launch checklist (blocks all organic traffic)

- [ ] CET series live (free mock + at least 2 paid mocks) — questions written; needs seeding/deploy and switching the product on in /admin/products
- [ ] Owner confirms CET pattern/marking against the 2026 advertisement
- [ ] Razorpay: add hrtestseries.in as a website
- [ ] Resend domain + `EMAIL_FROM_HR`
- [ ] Google Search Console property + sitemap
- [ ] Human spot-check of Haryana GK facts
- [ ] Flip `launched: true` in `src/sites/hr.ts`, deploy

## 7. Status

| Item | Status |
|---|---|
| This plan | ✅ written |
| Haryana free GK mock | ✅ live (noindex) |
| `hssc` / `hpsc` bodies and exam pages | not started |
| Haryana GK bank | not started |
| CET series (free + 6 mocks + sectionals) | in progress: free mock + paid mocks 1–2 (`prisma/hr-cet/mocks.ts`, 300 Qs, Haryana GK new, other sections reused from the HP/Punjab banks) and 4 Haryana GK sectionals done; paid mocks 3–6 and 11 other sectionals to go |
| Police series | not started |
| Posts | not started |
