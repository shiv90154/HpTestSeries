import { pb } from "../../src/sites/pb";
import type { PostSeed } from "./types";

const FREE_MOCK = `/tests/${pb.freeMockSlug}`;

// pbtestseries.in posts for the Punjab drives that were live in October 2026. Dates, numbers and advertisement details
// were read from the official PSSSB, PPSC and Punjab Police notices (sssb.punjab.gov.in, ppsc.gov.in, punjabpolice.gov.in)
// on 23 October 2026; where only news reports had a date, the post says so and points to the official site.

export const PUNJAB_POSTS: PostSeed[] = [
  {
    slug: "psssb-group-d-exam-date-2026-admit-card",
    site: "pb",
    seoTitle: "PSSSB Group D Exam 25 October 2026: Admit Card, Fake Notice",
    seoDescription:
      "PSSSB Group D exam for 2,098 posts is on 25 October 2026 as scheduled. Admit card link, the fake postponement notice, post-wise vacancies and exam pattern.",
    title: "PSSSB Group D Exam 2026 on 25 October: Admit Card Out, Postponement Notice Is Fake",
    titleHi: "PSSSB ग्रुप डी परीक्षा 25 अक्टूबर 2026: एडमिट कार्ड जारी, स्थगन का नोटिस फर्जी",
    excerpt:
      "PSSSB has confirmed the Group D written exam (Advt. No. 04 of 2026, 2,098 posts) on 25 October 2026 and warned that a postponement notice on WhatsApp is fake. Admit card, vacancies and pattern.",
    category: "ADMIT_CARD",
    exams: ["psssb/group-d"],
    content: `The **Subordinate Services Selection Board, Punjab (PSSSB)** will hold the written exam for **Group D posts (Advertisement No. 04 of 2026)** on **25 October 2026**, as scheduled. Roll numbers and admit cards are out.

## Postponement notice on WhatsApp is fake

On **22 October 2026** PSSSB issued a public notice saying that some mischievous elements were circulating a **fake public notice** on WhatsApp and other media claiming the exam had been postponed. The Board has made it clear that the exam for the 2,098 Group D posts **will be held on the fixed date and time**. Some job websites have also reported a new date of 15 November 2026; that is the fake notice. Rely only on [sssb.punjab.gov.in](https://sssb.punjab.gov.in).

## PSSSB Group D 2026 at a glance

| Item | Detail |
|---|---|
| Advertisement | No. 04 of 2026 |
| Posts | 2,098 (739 for women) |
| Last date to apply | 21 September 2026 (extended) |
| Written exam | 25 October 2026 |
| Mode | OMR-based written test |
| Official website | sssb.punjab.gov.in |

The number of posts went up to **2,098** through a corrigendum dated 17 September 2026, which added posts requested by the Deputy Commissioners of Fatehgarh Sahib and SAS Nagar and extended the last date from 17 to 21 September 2026.

## Where the posts are

| Department / office | Post | Posts |
|---|---|---|
| Excise and Taxation | Sewadar (field office) | 452 |
| Animal Husbandry | Water Carrier-cum-Sweeper | 409 |
| Animal Husbandry | Sweeper-cum-Attendant | 350 |
| Animal Husbandry | Sweeper | 134 |
| Deputy Commissioner, Roopnagar | Sewadar | 54 |
| Deputy Commissioner, SAS Nagar | Sewadar | 43 |
| Deputy Commissioner, Sangrur | Sewadar | 42 |
| Deputy Commissioner, Fatehgarh Sahib | Sewadar | 40 |
| Animal Husbandry | Pig Attendant | 40 |

The rest are smaller numbers of Sewadar, Chowkidar, Safai Sewak, Mali, Cook, Fisherman and attendant posts across other departments and districts. Category-wise, 711 posts are General, 230 SC (M&B), 181 SC (R&O), 186 BC and 166 EWS, with the remaining posts for ex-servicemen, sportspersons, persons with disabilities and freedom fighters' dependents.

## How to download the admit card

1. Go to [sssb.punjab.gov.in](https://sssb.punjab.gov.in) and open the Group D (Advt. No. 04 of 2026) admit card link on the home page.
2. The link opens the exam agency's portal. Log in with your registration details.
3. Download and print the e-admit card. Check your name, photo, roll number and exam centre.

Carry the printed admit card and an original photo ID to the centre, and reach well before the reporting time printed on it. PSSSB has also issued a separate notice for candidates who need a **scribe**.

## Exam pattern

The paper starts with a **qualifying Punjabi section**; only those who pass it are ranked on the main section of general knowledge, Punjab GK, reasoning, basic maths and English. A wrong answer in the main section costs a quarter mark. See the full [PSSSB Group D exam pattern](/psssb/group-d/exam-pattern) and [syllabus](/psssb/group-d/syllabus).

## Last-minute tips

- Revise Punjab GK: districts, rivers, Sikh Gurus, fairs and festivals ([Know Your Punjab](/punjab) is a quick refresher).
- Do one timed paper today to settle your speed. The free [Punjab GK mock test](${FREE_MOCK}) takes no login.
- Do not guess blindly in the main section; negative marking applies there.`,
    faqs: [
      {
        q: "Is the PSSSB Group D exam on 25 October 2026 postponed?",
        a: "No. PSSSB's public notice of 22 October 2026 says the postponement notice circulating on WhatsApp is fake and the exam will be held on 25 October 2026 as scheduled.",
      },
      {
        q: "How many posts are in PSSSB Group D 2026?",
        a: "2,098 posts under Advertisement No. 04 of 2026, of which 739 are for women.",
      },
      {
        q: "Where can I download the PSSSB Group D admit card?",
        a: "From the admit card link for Advt. No. 04 of 2026 on the home page of sssb.punjab.gov.in, which opens the exam agency's login page.",
      },
    ],
  },

  {
    slug: "psssb-clerk-answer-key-2026",
    site: "pb",
    seoTitle: "PSSSB Clerk Answer Key 2026 (Exam 11 Oct): Sets A–D, Next Steps",
    seoDescription:
      "PSSSB Clerk Advt. 02/2026 provisional answer keys for Sets A, B, C and D, OMR sheet, objection process and what comes after the final key.",
    title: "PSSSB Clerk Answer Key 2026: Provisional Keys for Sets A–D, OMR Sheet and Objections",
    titleHi: "PSSSB क्लर्क आंसर की 2026: सेट A–D की प्रोविजनल की, OMR शीट और आपत्तियां",
    excerpt:
      "PSSSB has released the provisional answer keys (Sets A to D) and OMR sheets for the Clerk exam held on 11 October 2026 under Advt. No. 02 of 2026. Objection dates, how to check your score and what comes next.",
    category: "RESULT",
    exams: ["psssb/clerk"],
    content: `The **PSSSB Clerk** written exam under **Advertisement No. 02 of 2026** was held on **11 October 2026**. The Subordinate Services Selection Board, Punjab has since published the **provisional answer keys for Sets A, B, C and D** and opened the **OMR sheet** download.

## Key dates

| Event | Date |
|---|---|
| Written exam | 11 October 2026 |
| Objection notice | 12 October 2026 |
| Online objections | 13 October to 15 October 2026, 5:00 PM |
| Hard copy of objections to reach PSSSB | 20 October 2026 |
| Final answer key and result | To be announced on sssb.punjab.gov.in |

The objection window has closed. Objections had to be sent through the Google Form named in the notice, one grievance form per question, with documentary proof, and the original by speed post or by hand to the Board's office in Sector-68, SAS Nagar. An expert committee decides on them, its decision is final, and **no objections are taken after the final key**.

## How to check your answer key

1. Open [sssb.punjab.gov.in](https://sssb.punjab.gov.in) and find "Provisional Answer Key" for the written exam dated 11.10.2026 (Clerk, Advt. No. 02/2026).
2. Download the key for **your booklet series** (A, B, C or D). Using another set's key will give a wrong score.
3. Download your **OMR sheet** from the link on the home page and match each answer.

## Calculating your expected score

- First check **Part A (Punjabi)**. It is qualifying: in the 2026 pattern you need 50% (25 of 50). If you are below that, Part B is not evaluated.
- For **Part B**, add 1 mark for every correct answer and subtract 0.25 for every wrong answer. Unattempted questions score zero.
- Compare your Part B score with previous PSSSB Clerk cutoffs for your category to judge your chances.

See the full [PSSSB Clerk exam pattern](/psssb/clerk/exam-pattern).

## What comes next

After the final answer key, PSSSB publishes the result and calls shortlisted candidates for the **typing test in Punjabi and English**, followed by document verification and counselling. Start typing practice now in both scripts, because the gap between the result and the typing test can be short.

Applications that were incomplete were rejected through PSSSB notices of 7 and 9 October 2026, so check those lists if you did not receive a roll number.

Preparing for the next PSSSB exam? Keep your Punjab GK fresh with the free [Punjab GK mock test](${FREE_MOCK}).`,
    faqs: [
      {
        q: "Can I still raise objections to the PSSSB Clerk answer key?",
        a: "No. The online window ran from 13 to 15 October 2026 (5 PM), and hard copies had to reach PSSSB by 20 October 2026. Objections are not accepted after the final key.",
      },
      {
        q: "Is there negative marking in the PSSSB Clerk exam?",
        a: "Yes, a quarter mark per wrong answer in Part B. Part A, the Punjabi paper, is qualifying.",
      },
      {
        q: "What is after the PSSSB Clerk written exam?",
        a: "The final answer key and result, then a Punjabi and English typing test for shortlisted candidates, document verification and counselling.",
      },
    ],
  },

  {
    slug: "psssb-je-recruitment-2026-applications-reopened",
    site: "pb",
    seoTitle: "PSSSB JE 2026: Applications Reopened Till 27 Oct, Exam Postponed",
    seoDescription:
      "PSSSB Junior Engineer (Civil, Mechanical, Electrical) Advt. 07/2026: applications reopened 12–27 October 2026 on a High Court order; 18 October exam postponed.",
    title: "PSSSB JE Recruitment 2026: Applications Reopened Till 27 October, 18 October Exam Postponed",
    titleHi: "PSSSB जेई भर्ती 2026: 27 अक्टूबर तक फिर से आवेदन, 18 अक्टूबर की परीक्षा स्थगित",
    excerpt:
      "After a Punjab and Haryana High Court order, PSSSB has reopened applications for Junior Engineer (Civil, Mechanical, Electrical) posts under Advt. No. 07 of 2026 from 12 to 27 October 2026 and postponed the 18 October exam.",
    category: "NOTIFICATION",
    exams: ["psssb/junior-engineer"],
    content: `There is a second chance to apply for **PSSSB Junior Engineer** posts. Through a public notice dated **9 October 2026**, the Subordinate Services Selection Board, Punjab has **reopened online applications** for **Junior Engineer (Civil, Mechanical, Electrical) under Advertisement No. 07 of 2026**, and **postponed the written exam** that was fixed for 18 October 2026.

## Why the applications were reopened

The Board took the step to comply with an **interim order of the Punjab and Haryana High Court dated 8 October 2026** in **CWP No. 32342 of 2026 (Manveer Singh vs State of Punjab and others)**.

## Important dates

| Event | Date |
|---|---|
| Reopened online applications | 12 October to 27 October 2026 |
| Last date for fee payment | 27 October 2026 |
| Written exam (earlier fixed) | 18 October 2026 — postponed |
| New exam date | To be announced on sssb.punjab.gov.in |

**Already applied?** You do not need to apply again. Candidates who applied earlier under Advt. No. 07 of 2026 stay in the process.

## Posts covered

| Post | Department |
|---|---|
| Junior Engineer (Civil) | Various departments |
| Junior Engineer (Electrical) | Various departments |
| Junior Engineer (Mechanical) | Water Resources Department |

All three are Group B posts. Read the advertisement for the qualification in your branch, the age limit and the category-wise vacancies.

## How to apply

1. Visit [sssb.punjab.gov.in](https://sssb.punjab.gov.in) and open the application link for Advertisement No. 07 of 2026.
2. Register, fill in the form and upload the documents asked for.
3. Pay the fee by **27 October 2026** and keep a copy of the submitted form.

## What the exam looks like

PSSSB technical papers have a **qualifying Punjabi section** and a merit section that is mostly **questions from your branch**, with some general knowledge, Punjab GK, reasoning and English. Use the extra weeks to revise your core subjects and solve old JE papers. See the [PSSSB JE syllabus](/psssb/junior-engineer/syllabus), and warm up the general section with the free [Punjab GK mock test](${FREE_MOCK}).`,
    faqs: [
      {
        q: "Till when can I apply for PSSSB JE 2026?",
        a: "Until 27 October 2026, including fee payment, through the reopened application link for Advt. No. 07 of 2026 on sssb.punjab.gov.in.",
      },
      {
        q: "Do I need to apply again if I applied earlier?",
        a: "No. PSSSB's notice says candidates who already applied under Advt. No. 07 of 2026 do not need to apply again.",
      },
      {
        q: "What is the new PSSSB JE exam date?",
        a: "Not announced yet. The 18 October 2026 exam was postponed until further notice; the new date will be published on sssb.punjab.gov.in.",
      },
    ],
  },

  {
    slug: "punjab-police-constable-2026-cbt-result-physical-test",
    site: "pb",
    seoTitle: "Punjab Police Constable 2026: 3,298 Posts, CBT, PST & PMT Guide",
    seoDescription:
      "Punjab Police Constable 2026 (Advt. 01/2026): 2,522 District and 776 Armed Cadre posts, the CBT pattern, the physical tests and how the final merit is made.",
    title: "Punjab Police Constable 2026: Vacancies, CBT Pattern, Physical Test (PST/PMT) and Final Merit",
    titleHi: "पंजाब पुलिस कांस्टेबल 2026: पद, CBT पैटर्न, फिजिकल टेस्ट (PST/PMT) और मेरिट",
    excerpt:
      "Everything about Punjab Police Constable 2026 in one place: 3,298 posts in the District and Armed Cadres, the CBT and its qualifying Punjabi paper, the PST and PMT, and how the merit list is drawn.",
    category: "NOTIFICATION",
    exams: ["punjab-police/constable"],
    content: `Punjab Police advertised **3,298 Constable posts** in 2026 under **Advertisement No. 01 of 2026**, published on **6 March 2026**: **2,522 in the District Cadre** and **776 in the Armed Cadre**. This guide covers each stage and what to check now.

## Key facts

| Item | Detail |
|---|---|
| Advertisement | No. 01 of 2026 (6 March 2026) |
| Posts | 3,298 (District Cadre 2,522, Armed Cadre 776) |
| Written exam | Computer-based test from 1 July 2026 |
| Next stages | Physical Screening Test (PST) and Physical Measurement Test (PMT) |
| Official website | punjabpolice.gov.in |

## Stage 1: the CBT

The CBT has two papers:

- **Paper I** — 100 questions, 120 minutes: general awareness (the biggest section), quantitative aptitude, mental ability and reasoning, English, Punjabi and digital literacy. **Paper I marks make the merit list.**
- **Paper II** — a **qualifying Punjabi paper** of 50 questions. You must reach the qualifying marks, but they are not added to your score.

See the section-wise [Punjab Police Constable exam pattern](/punjab-police/constable/exam-pattern).

## Stage 2: PST and PMT

Candidates shortlisted on the CBT score are called for the **Physical Screening Test** (running and other events) and the **Physical Measurement Test** (height, and chest for men). Both are **qualifying**: they decide whether you stay in the race, not your rank. News reports put the physical tests for the 2026 drive in the second half of October 2026, with admit cards on the recruitment portal; **confirm your own date, time and venue on punjabpolice.gov.in** before you travel.

What to carry: the physical-test admit card, an original photo ID and the documents listed on the admit card. Reach early, because events run batch by batch.

## Final merit and documents

The final merit list follows the CBT score of candidates who clear Paper II, the PST and the PMT, cadre-wise and category-wise. Document verification and medical examination come next. Keep your certificates ready, especially the **Punjabi (matriculation level)**, category, domicile and any NCC or sports certificates claimed in the form.

## Preparing for the next drive

Punjab Police recruits constables almost every year. If you missed this one, start with general awareness and Punjab GK, which carry the most marks. Our [Know Your Punjab](/punjab) page and the free [Punjab GK mock test](${FREE_MOCK}) are a good first step, and the full [Punjab Police Constable syllabus](/punjab-police/constable/syllabus) is here.`,
    faqs: [
      {
        q: "How many posts are in Punjab Police Constable 2026?",
        a: "3,298: 2,522 in the District Cadre and 776 in the Armed Cadre, under Advertisement No. 01 of 2026.",
      },
      {
        q: "Are PST and PMT marks added to the merit?",
        a: "No. The PST and PMT are qualifying. The merit list is based on the CBT Paper I score of candidates who clear Paper II and the physical tests.",
      },
      {
        q: "Where do I check my Punjab Police PST/PMT date?",
        a: "On your admit card from the Punjab Police recruitment portal linked from punjabpolice.gov.in. Dates in news reports can differ, so trust the admit card and the official site.",
      },
    ],
  },

  {
    slug: "punjab-govt-jobs-october-2026",
    site: "pb",
    seoTitle: "Punjab Govt Jobs October 2026: PSSSB & PPSC Exams, Results",
    seoDescription:
      "All Punjab government recruitment updates of October 2026: PSSSB Group D, Clerk, JE, Advt. 12 and 13 of 2026, and PPSC exams, notices and results.",
    title: "Punjab Govt Jobs October 2026: PSSSB and PPSC Exams, New Posts and Results",
    titleHi: "पंजाब सरकारी नौकरी अक्टूबर 2026: PSSSB और PPSC परीक्षाएं, नए पद और रिजल्ट",
    excerpt:
      "One page for every Punjab government recruitment update in October 2026 — PSSSB Group D, Clerk and JE, the new Advt. 12 and 13 of 2026, and PPSC exam schedules and results.",
    category: "NOTIFICATION",
    exams: ["psssb/clerk", "psssb/group-d", "psssb/junior-engineer", "ppsc/pcs"],
    content: `Here is every Punjab government recruitment update that matters this month, from the official PSSSB and PPSC websites. Bookmark it; we update it as new notices come out.

## PSSSB (Subordinate Services Selection Board, Punjab)

| Recruitment | Status (October 2026) |
|---|---|
| Group D, Advt. 04/2026 (2,098 posts) | Written exam on **25 October 2026**; postponement notice on WhatsApp is fake. [Details](/blog/psssb-group-d-exam-date-2026-admit-card) |
| Clerk, Advt. 02/2026 | Exam held on 11 October; provisional keys (Sets A–D) and OMR sheets out. [Details](/blog/psssb-clerk-answer-key-2026) |
| Junior Engineer, Advt. 07/2026 | Applications reopened **12–27 October**; 18 October exam postponed. [Details](/blog/psssb-je-recruitment-2026-applications-reopened) |
| Advt. 12/2026 (70 posts) | Driver, Clerk (Legal), Clerk (Accounts), Clerk (IT), Translator, Field Artist; applied 25 September to 19 October 2026; one more Clerk (Legal) post added on 6 October |
| Advt. 13/2026 (10 posts) | Head Draftsman (2), Law Officer (1), Legal Assistant (2), Accountant (5); applied 1 to 22 October 2026 |
| Line Superintendent, Advt. 11/2026 | Result-cum-common merit list out; withheld candidates to submit pending documents by 3 November 2026 |
| Stenotypist, Advt. 14/2025 | Result-cum-common merit list out; department preferences and counselling notices issued |
| Clerk IT, Advt. 11/2025 | Final result / common merit list out |

The Clerk posts of Advt. 12/2026 start at Level 2 (₹19,900) and need a graduation degree, Punjabi at matriculation level and a Punjabi and English typing test, along with the subject degree the post asks for (law, commerce or IT).

## PPSC (Punjab Public Service Commission)

| Update | Date |
|---|---|
| Public notice on recruitment to 75 posts of Junior Auditor (Group B), Department of Finance | 1 October 2026 |
| Rescheduled competitive exam for Senior Assistant (Group B) | Notice of 9 October 2026 |
| Public notice on the PCS Combined Competitive (Mains) Examination 2025 | 14 October 2026 |
| Exam time slots for Research Officer (Group A), 11 posts and 5 posts | Notices of 19 and 25 September 2026 |
| Final result: 101 posts of Horticulture Development Officer | 28 September 2026 |

Read each notice on [ppsc.gov.in](https://ppsc.gov.in) for the exam date, time slot and centre.

## How to stay ahead

- PSSSB papers start with a **qualifying Punjabi section**, so practise Punjabi every day.
- **Punjab GK** appears in almost every paper. Revise it with [Know Your Punjab](/punjab) and test yourself on the free [Punjab GK mock test](${FREE_MOCK}).
- Read the exam pages for [PSSSB Clerk](/psssb/clerk), [PSSSB Group D](/psssb/group-d), [PSSSB JE](/psssb/junior-engineer), [Punjab Police Constable](/punjab-police/constable) and [Punjab PCS](/ppsc/pcs).
- Trust only sssb.punjab.gov.in, ppsc.gov.in and punjabpolice.gov.in. Fake notices do the rounds before big exams.`,
    faqs: [
      {
        q: "Which Punjab government exams are in October 2026?",
        a: "The PSSSB Group D written exam on 25 October 2026 is the main one. The PSSSB JE exam of 18 October was postponed, and the PSSSB Clerk exam was held on 11 October.",
      },
      {
        q: "Which Punjab recruitments are open to apply in late October 2026?",
        a: "PSSSB Junior Engineer (Advt. No. 07 of 2026) until 27 October 2026, after applications were reopened on a High Court order.",
      },
      {
        q: "Where are PSSSB and PPSC notices published?",
        a: "PSSSB on sssb.punjab.gov.in and PPSC on ppsc.gov.in. Results, answer keys and admit card links appear there first.",
      },
    ],
  },
];
