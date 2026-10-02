import { FREE_MOCK_HREF as FREE_MOCK } from "../../src/lib/site";
import type { PostSeed } from "./types";

// Draft notification posts for the drives that were open or recent in October 2026. They are seeded as DRAFT (see
// prisma/seed-content.ts), so nothing here is public until it is published from /admin/blog. Figures come from news and
// coaching-site reports, not from the official PDFs, so every post carries the [VERIFY] reminder: check each number
// against the notification before publishing, and update the dates if you publish after they have passed.

export const NOTIFICATION_POSTS: PostSeed[] = [
  {
    slug: "hp-tet-november-2026-notification-dates-fee-exam-pattern",
    seoTitle: "HP TET November 2026: Dates, Fee, Exam Pattern, Papers",
    seoDescription: "HP TET November 2026: apply by 3 October, exams on 22 and 29 November and 6 December. Fee, all 10 papers, the 150-question pattern and qualifying marks.",
    title: "HP TET November 2026: Application Dates, Exam Dates, Fee, Pattern & Qualifying Marks",
    titleHi: "एचपी टेट नवंबर 2026: आवेदन, परीक्षा तिथि, फीस और पैटर्न",
    excerpt: "HP TET November 2026 — online application dates, late-fee window, exam dates, all 10 papers, fee, 150-question pattern and qualifying marks in one place.",
    category: "NOTIFICATION",
    exams: ["hpbose/hp-tet"],
    content: `**HP TET (Teacher Eligibility Test)** ka November 2026 session HPBOSE, Dharamshala ne announce kar diya hai. Is post me application dates, exam dates, fee, papers aur pattern ek jagah hain.

> ⚠ Yeh draft hai. **[VERIFY]** har date aur fee ko HPBOSE ke information bulletin (hpbose.org) se match karke hi publish karein. Agar publish karte waqt dates nikal chuki hon, to neeche ki "Last date" lines update karein.

## HP TET November 2026: key dates

| Event | Date |
|---|---|
| Online application starts | 11 September 2026 [VERIFY] |
| Last date (without late fee) | 3 October 2026, 11:59 PM [VERIFY] |
| Last date with late fee (₹600 extra) | 4 to 8 October 2026 [VERIFY] |
| Correction window | 9 to 12 October 2026 [VERIFY] |
| Exam dates | 22 November, 29 November and 6 December 2026, two shifts a day [VERIFY] |

## Papers (categories)

HP TET me ek hi session me kai papers hote hain: **JBT, TGT Arts, TGT Non-Medical, TGT Medical, TGT Sanskrit, Hindi Language Teacher, Punjabi Language Teacher, Urdu Language Teacher** aur **Special Educator** (Pre-Primary to Class V aur Class VI to XII). [VERIFY]

## Exam pattern

- **150 MCQs**, 1 mark each, **150 minutes**
- **No negative marking** [VERIFY]
- Child Development & Pedagogy sab papers me common hai, baaki sections category ke hisaab se

Detailed pattern: [HP TET exam pattern](/hpbose/hp-tet/exam-pattern) aur [HP TET syllabus](/hpbose/hp-tet/syllabus).

## Fee and qualifying marks

- **Fee:** ₹1,200 for General and sub-categories; ₹700 for OBC/SC/ST/PH [VERIFY]
- **Qualifying marks:** 60% (90 of 150) for General; 55% for SC/ST/OBC/PH [VERIFY]

## Taiyari kaise karein

Child development aur pedagogy sabse pehle pakki karo, phir apne category ka subject aur language. Exam me kam din bache hain, isliye roz ek timed practice karo. [Free HP TET mock test](/tests/hp-tet-free-mock-1) se shuruaat karo, aur CBT ka feel lene ke liye [Free Himachal GK mock](${FREE_MOCK}) bhi try karo.

Sab TET aspirants ke liye: [HP TET mock tests](/hpbose/hp-tet).`,
    faqs: [
      { q: "HP TET November 2026 ki last date kya hai?", a: "Regular application ki last date 3 October 2026 thi; late fee ke saath 8 October tak mauka bataya gaya hai. HPBOSE ka bulletin check karein. [VERIFY]" },
      { q: "HP TET 2026 me kitne papers hain?", a: "Din categories ke papers: JBT, TGT Arts/Non-Medical/Medical, TGT Sanskrit, Hindi/Punjabi/Urdu Language Teacher aur do Special Educator papers. [VERIFY]" },
      { q: "Does HP TET have negative marking?", a: "As per the reported pattern, no. The paper has 150 MCQs of 1 mark in 150 minutes. Confirm in the HPBOSE bulletin. [VERIFY]" },
    ],
  },

  {
    slug: "hprca-recruitment-2026-all-posts-dates-vacancies",
    seoTitle: "HPRCA Recruitment 2026: All Posts, Vacancies & Dates",
    seoDescription: "HPRCA Hamirpur recruitment 2026 in one table: Patwari, JBT, TGT, JOA IT, Clerk, JE, Pharmacist, Staff Nurse and more, with dates and vacancies.",
    title: "HPRCA Recruitment 2026: All Posts, Vacancies and Application Dates (Patwari, JBT, JOA IT, Clerk & More)",
    titleHi: "एचपीआरसीए भर्ती 2026: सभी पद, रिक्तियां और तिथियां",
    excerpt: "HPRCA Hamirpur recruitment 2026 in one table — Patwari, JBT, TGT, JOA IT, Clerk, Junior Engineer, Pharmacist, Staff Nurse and more, with dates and links to preparation pages.",
    category: "NOTIFICATION",
    exams: ["hprca/joa-it", "hprca/clerk", "hprca/jbt", "hprca/tgt", "hprca/junior-engineer", "hprca/pharmacist", "hprca/staff-nurse", "hp-revenue/patwari"],
    content: `**Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur** ab Himachal ki zyadatar Class III bhartiyan karta hai. 2026 me kaafi posts nikle hain, jinki dates aur vacancies is table me ek jagah hain.

> ⚠ Yeh draft hai. Figures news aur coaching sites se liye gaye hain, isliye **[VERIFY]** har row ko hprca.hp.gov.in ke official notification se match karke hi publish karein.

## HPRCA 2026: posts, vacancies and dates

| Post | Vacancies | Application window | Preparation |
|---|---|---|---|
| Patwari | 530 [VERIFY] | 12 April to 16 May 2026 | [HP Patwari mock tests](/hp-revenue/patwari) |
| JBT Teacher | 600 [VERIFY] | 16 March to 6 April 2026 | [HPRCA JBT](/hprca/jbt) |
| TGT (Arts, Non-Medical, Medical) | Arts 425, Non-Medical 49, Medical 169 [VERIFY] | different windows | [HPRCA TGT](/hprca/tgt) |
| JOA (IT) | 234 [VERIFY] | 27 January to 27 February 2026 | [HPRCA JOA IT](/hprca/joa-it) |
| Clerk | 40 [VERIFY] | 14 August to 11 September 2026 | [HPRCA Clerk](/hprca/clerk) |
| Junior Engineer (Civil) | 149 [VERIFY] | 10 April to 2 May 2026 | [HPRCA JE](/hprca/junior-engineer) |
| Pharmacy Officer (Allopathy) | 41 [VERIFY] | 28 April to 20 May 2026 | [HPRCA Pharmacist](/hprca/pharmacist) |
| Radiographer and other health posts | see notification [VERIFY] | 10 March to 4 April 2026 | [HPRCA Radiographer](/hprca/radiographer) |
| Assistant Staff Nurse | see notification [VERIFY] | 30 July to 29 August 2026 | [HPRCA Staff Nurse](/hprca/staff-nurse) |
| Special Educator (Pre-Primary to V) | 108 [VERIFY] | 4 December 2025 to 8 January 2026 | [Special Educator](/hprca/special-educator) |
| JOA (Library) | 78 [VERIFY] | 4 December 2025 to 8 January 2026 | [JOA Library](/hprca/joa-library) |
| Steno Typist | 1 [VERIFY] | 4 December 2025 to 8 January 2026 | [Steno Typist](/hprca/steno-typist) |

## Selection process

Zyadatar posts me **computer-based test (CBT)** hota hai, uske baad document verification. Clerk aur JOA IT jaise posts me typing skill test bhi hota hai (30 wpm English ya 25 wpm Hindi, 2026 notification ke hisaab se) [VERIFY]. Age limit aam taur par 18 se 45 saal (1 January 2026 ko), relaxation ke saath [VERIFY].

## Application fee

Kai posts me ₹800 total: ₹100 exam fee aur ₹700 processing fee [VERIFY].

## Ab kya karein

Notification ka wait kiye bina taiyari shuru karo: Himachal GK, reasoning aur maths sabme common hain. [Free Himachal GK mock test](${FREE_MOCK}) bina login ke try karo, aur apni post ka hub [exams page](/exams) se kholo.`,
    faqs: [
      { q: "HPRCA recruitment 2026 me kaun se posts aaye?", a: "Patwari, JBT, TGT, JOA IT, Clerk, Junior Engineer, Pharmacy Officer, Radiographer, Staff Nurse, Special Educator, JOA Library aur Steno Typist ke notifications 2026 me aaye hain. Table me dates dekhein. [VERIFY]" },
      { q: "HPRCA ka exam kaise hota hai?", a: "Zyadatar posts me computer-based test hota hai, uske baad document verification; Clerk/JOA jaise posts me typing skill test bhi. Post-wise notification me details hoti hain." },
    ],
  },

  {
    slug: "hppsc-recruitment-2026-open-vacancies-ado-hpas-assistant-professor",
    seoTitle: "HPPSC Recruitment 2026: ADO, HPAS, Asst Professor & More",
    seoDescription: "HPPSC Shimla recruitment 2026: Agriculture Development Officer, HPAS, Assistant Professor and Police Constable, with vacancies and last dates.",
    title: "HPPSC Recruitment 2026: ADO, HPAS, Assistant Professor, Police Constable — Vacancies and Dates",
    titleHi: "एचपीपीएससी भर्ती 2026: सभी पद और तिथियां",
    excerpt: "HPPSC Shimla recruitment 2026 — Agriculture Development Officer, HPAS, Assistant Professor, Police Constable and more, with vacancies, last dates and exam preparation links.",
    category: "NOTIFICATION",
    exams: ["hppsc/ado", "hppsc/hpas", "hppsc/assistant-professor", "hp-police/constable"],
    content: `**Himachal Pradesh Public Service Commission (HPPSC), Shimla** 2026 me kai badi bhartiyan chala raha hai. Open aur recent vacancies ek jagah:

> ⚠ Yeh draft hai. Figures news aur job sites se liye gaye hain, isliye **[VERIFY]** har row ko hppsc.hp.gov.in ke official advertisement se match karke hi publish karein. Dates nikalne ke baad "open" ko "closed" karna na bhoolen.

## HPPSC 2026: posts and last dates

| Post | Vacancies | Last date | Preparation |
|---|---|---|---|
| Agriculture Development Officer (ADO) | 23 [VERIFY] | 22 October 2026 | [HPPSC ADO](/hppsc/ado) |
| H.P. Administrative Service Combined Exam (HPAS) | 22 [VERIFY] | 22 September 2026 (closed) | [HPAS mock tests](/hppsc/hpas) |
| Police Constable (Male and Female) | 734 [VERIFY] | 6 August 2026 (closed) | [Police Constable](/hp-police/constable) |
| Section Officer, HPF&AS | 26 [VERIFY] | 5 August 2026 (closed) | serving government employees only [VERIFY] |
| Assistant Professor (22 subjects) | 369 [VERIFY] | closed | [Assistant Professor](/hppsc/assistant-professor) |

## ADO kaise bane

ADO ke liye generally B.Sc. (Agriculture) chahiye [VERIFY]. Selection stages aur syllabus advertisement me hote hain. Taiyari ke liye agronomy, soil science, horticulture, plant protection aur extension revise karo, saath me Himachal ki fasal aur schemes. Practice: [HPPSC ADO free mock](/tests/hppsc-ado-free-mock-1).

## Assistant Professor ka scheme (2026)

Paper I screening (100 marks, qualifying) me Himachal GK, national/international affairs, Hindi aur English; Paper II subject test (120 marks); personality test (30 marks). Merit Paper II aur personality test se bani. [VERIFY]

## Aage ki taiyari

HPPSC ke har exam me **Himachal GK** common hai. [Free Himachal GK mock](${FREE_MOCK}) se shuru karo aur apni post ka hub [exams page](/exams) par dekho.`,
    faqs: [
      { q: "HPPSC ADO ki last date kya hai?", a: "Reports ke mutabiq 23 ADO posts ke liye last date 22 October 2026 hai. Official advertisement se confirm karein. [VERIFY]" },
      { q: "HPPSC kaun si exams conduct karta hai?", a: "HPAS combined exam, Assistant Professor, Agriculture Development Officer, Assistant Engineer, Medical Officer, Veterinary Officer, Food Safety Officer, Civil Judge aur anya Class I/II posts, aur 2026 ki Police Constable bharti bhi HPPSC ke zariye nikli. [VERIFY]" },
    ],
  },

  {
    slug: "hpas-2026-notification-22-posts-bdo-tehsildar-dto-eligibility-pattern",
    seoTitle: "HPAS 2026 Notification: 22 Posts, Eligibility, Fee, Selection",
    seoDescription: "HPPSC HPAS Combined Exam 2026: 22 posts including HPAS, BDO, Tehsildar and District Treasury Officer, with age limit, fee and selection stages.",
    title: "HPAS 2026 Notification: 22 Posts (HPAS, BDO, Tehsildar, DTO), Eligibility, Fee & Selection",
    titleHi: "एचपीएएस 2026 अधिसूचना: 22 पद, पात्रता और चयन प्रक्रिया",
    excerpt: "HPPSC H.P. Administrative Services Combined Competitive Examination 2026 — 22 posts including HPAS, BDO, Tehsildar and District Treasury Officer, with age, fee and selection stages.",
    category: "NOTIFICATION",
    exams: ["hppsc/hpas"],
    content: `**HPPSC** ne **H.P. Administrative Services Combined Competitive Examination 2026** ka notification jaari kiya hai. Is combined exam se HPAS ke saath BDO, Tehsildar aur anya allied posts bhi bhare jaate hain.

> ⚠ Yeh draft hai. **[VERIFY]** har figure ko HPPSC ke official advertisement (hppsc.hp.gov.in) se match karke hi publish karein.

## HPAS 2026: overview

| Detail | Information |
|---|---|
| Advertisement | No. 59/8-2026 [VERIFY] |
| Conducting body | HPPSC, Shimla |
| Total vacancies | 22 [VERIFY] |
| Application window | 26 August to 22 September 2026 (closed) [VERIFY] |
| Application fee | ₹600 [VERIFY] |
| Age limit | 21 to 35 years (as on 1 January 2026), relaxation as per rules [VERIFY] |
| Qualification | Bachelor's degree in any subject [VERIFY] |
| Exam dates | not announced [VERIFY] |

## Posts (vacancies)

- H.P. Administrative Services: 4
- Block Development Officer (BDO): 10
- District Controller, Food, Civil Supplies and Consumer Affairs: 1
- District Treasury Officer: 6
- Tehsildar: 1

[VERIFY] Posts aur numbers ko advertisement se match karein.

## Selection process

1. **Preliminary examination** (objective, screening)
2. **Main examination** (descriptive)
3. **Personality test (interview)**
4. Document verification

## Prelims ki taiyari

Prelims me General Studies aur Himachal GK ka bada weight hota hai. NCERT se basics banao, Himachal ke liye alag notes rakho aur har hafte ek timed mock do. [Free HPAS mock test](/tests/hpas-free-mock-1) se shuru karo, aur poora hub [HPAS mock tests](/hppsc/hpas) par dekho.`,
    faqs: [
      { q: "HPAS 2026 me kitni vacancies hain?", a: "Reports ke mutabiq 22 posts: HPAS 4, BDO 10, District Controller Food & Civil Supplies 1, District Treasury Officer 6 aur Tehsildar 1. [VERIFY]" },
      { q: "HPAS ke liye age limit kya hai?", a: "21 se 35 saal (1 January 2026 ko), reserved categories ko relaxation ke saath. Notification me confirm karein. [VERIFY]" },
      { q: "Do BDO and Tehsildar have a separate exam?", a: "In this notification, BDO, Tehsildar and the other allied posts are filled through the same HPAS Combined Competitive Examination, so they share the Prelims, Mains and interview. [VERIFY]" },
    ],
  },

  {
    slug: "hp-high-court-recruitment-2026-clerk-steno-process-server-388-posts",
    seoTitle: "HP High Court Recruitment 2026: 388 Posts, Clerk, Steno",
    seoDescription: "High Court of Himachal Pradesh recruitment 2026: 388 posts including Clerk, Stenographer, Process Server and Driver, with eligibility and the application window.",
    title: "HP High Court Recruitment 2026: 388 Posts — Clerk, Stenographer, Process Server, Driver & More",
    titleHi: "हिमाचल हाई कोर्ट भर्ती 2026: 388 पद",
    excerpt: "High Court of Himachal Pradesh recruitment 2026 — post-wise vacancies for Clerk, Stenographer Grade-III, Process Server, Driver, Court Manager and Peon, with eligibility and application window.",
    category: "NOTIFICATION",
    exams: ["hp-high-court/clerk", "hp-high-court/stenographer", "hp-high-court/process-server"],
    content: `**High Court of Himachal Pradesh, Shimla** ne 2026 me ek badi bharti nikali jisme Clerk, Stenographer aur Process Server jaise posts hain. Applications High Court ke apne portal par li gayi.

> ⚠ Yeh draft hai. Figures news sites se liye gaye hain, isliye **[VERIFY]** har row ko High Court ke official notification (hphcrecruitment.in) se match karke hi publish karein.

## HP High Court 2026: post-wise vacancies

| Post | Vacancies |
|---|---|
| Court Manager | 5 [VERIFY] |
| Clerk | 141 [VERIFY] |
| Stenographer Grade-III | 79 [VERIFY] |
| Driver | 9 [VERIFY] |
| Process Server | 65 [VERIFY] |
| Peon / Orderly / Chowkidar / Safai Karamchari | 89 [VERIFY] |
| **Total** | **388** |

## Application window and portal

- Online applications: **10 August to 10 September 2026** [VERIFY]
- Portal: hphcrecruitment.in (High Court's own recruitment portal) [VERIFY]
- A separate notification for a few Group C/D posts (Librarian, Peon, Mali, Cook-cum-Attendant) with applications from 27 September to 27 October 2026 was also reported [VERIFY]

## Clerk: eligibility

- Bachelor's degree with basic computer knowledge [VERIFY]
- Typing speed: 30 wpm in English and 25 wpm in Hindi, as stated in the notification [VERIFY]

## Taiyari

Selection stages aur syllabus notification me hote hain. English, Hindi, Himachal GK, reasoning, maths aur computer ki taiyari sab clerical posts ke liye kaam aati hai. Typing practice roz karo. Practice hubs: [High Court Clerk](/hp-high-court/clerk), [Stenographer](/hp-high-court/stenographer), [Process Server](/hp-high-court/process-server). [Free Himachal GK mock](${FREE_MOCK}) se CBT ka feel lo.`,
    faqs: [
      { q: "HP High Court 2026 me kitni posts hain?", a: "Reports ke mutabiq 388 posts: Clerk 141, Stenographer Grade-III 79, Process Server 65, Peon etc. 89, Driver 9 aur Court Manager 5. [VERIFY]" },
      { q: "HP High Court recruitment HPRCA se hoti hai?", a: "Nahi, High Court apni recruitment apne portal (hphcrecruitment.in) par karta hai. [VERIFY]" },
    ],
  },

  {
    slug: "hprca-assistant-staff-nurse-recruitment-2026-eligibility-exam-pattern",
    seoTitle: "HPRCA Staff Nurse Recruitment 2026: Eligibility & Pattern",
    seoDescription: "HPRCA Assistant Staff Nurse 2026: qualification, HPNRC registration, the 120-mark CBT pattern, qualifying marks and how to prepare.",
    title: "HPRCA Assistant Staff Nurse Recruitment 2026: Eligibility, Exam Pattern, Qualifying Marks",
    titleHi: "एचपीआरसीए असिस्टेंट स्टाफ नर्स भर्ती 2026",
    excerpt: "HPRCA Assistant Staff Nurse 2026 — qualification, HPNRC registration, 120-mark CBT pattern, qualifying marks, fee and how to prepare.",
    category: "NOTIFICATION",
    exams: ["hprca/staff-nurse"],
    content: `**HPRCA, Hamirpur** ne 2026 me **Assistant Staff Nurse** ki bharti nikali hai. Vacancies ke figures alag-alag sources me alag aa rahe hain, isliye number notification se confirm karna zaroori hai.

> ⚠ Yeh draft hai. **[VERIFY]** har point ko hprca.hp.gov.in ke official notification se match karke hi publish karein.

## Overview

| Detail | Information |
|---|---|
| Conducting body | HPRCA, Hamirpur |
| Post | Assistant Staff Nurse |
| Vacancies | see notification [VERIFY] |
| Application window | 30 July to 29 August 2026 [VERIFY] |
| Application fee | ₹800 [VERIFY] |

## Eligibility

- **B.Sc. Nursing or GNM** with the minimum percentage in the notification [VERIFY]
- Valid registration with the **Himachal Pradesh Nurses Registration Council (HPNRC)** at the time of applying [VERIFY]
- Age limit and relaxation as per the notification

## Exam pattern

- Computer-based test of **120 MCQs, 120 marks** [VERIFY]
- Minimum qualifying marks: **45%** for General/EWS and **40%** for SC/ST/OBC [VERIFY]
- Part A: nursing subjects. Part B: Himachal GK, current affairs, everyday science, reasoning, English and Hindi [VERIFY]

Pattern aur syllabus ka detail: [HPRCA Staff Nurse exam pattern](/hprca/staff-nurse/exam-pattern) aur [syllabus](/hprca/staff-nurse/syllabus).

## Taiyari

Nursing textbooks chapter-wise revise karo aur Part B ke aasaan marks (Himachal GK, English, Hindi) mat chhodo. [Free Staff Nurse mock test](/tests/hprca-staff-nurse-free-mock-1) se shuruaat karo, aur poora hub [HPRCA Staff Nurse](/hprca/staff-nurse) par dekho.`,
    faqs: [
      { q: "HPRCA Staff Nurse ke liye qualification kya hai?", a: "B.Sc. Nursing ya GNM aur HPNRC me valid registration. Percentage notification me dekhein. [VERIFY]" },
      { q: "What is the pass mark for HPRCA Staff Nurse?", a: "Reported minimum qualifying marks are 45% for General/EWS and 40% for SC/ST/OBC in the 120-mark CBT. [VERIFY]" },
    ],
  },
];
