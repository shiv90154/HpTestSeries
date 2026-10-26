import { rj } from "../../src/sites/rj";
import type { PostSeed } from "./types";

const FREE_MOCK = `/tests/${rj.freeMockSlug}`;

// rjtestseries.in posts for the Rajasthan exams coming up from November 2026 to February 2027. Dates are from RSSB's
// revised calendar of 28 September 2026 and RPSC's schedule of October 2026, checked by the owner on 26 October 2026.

export const RAJASTHAN_POSTS: PostSeed[] = [
  {
    slug: "rssb-exam-calendar-2026-revised-november-february",
    site: "rj",
    seoTitle: "RSSB Exam Calendar 2026 Revised: CET, Teaching Associate, JE Dates",
    seoDescription:
      "RSSB's revised exam calendar: Teaching Associate from 17 Nov, CET 12th level 1-3 Dec 2026, CET Graduation 16-18 Jan 2027, Lab Attendant and JE dates.",
    title: "RSSB Exam Calendar 2026 Revised: CET 12th Level on 1-3 December, CET Graduation in January 2027",
    titleHi: "RSSB परीक्षा कैलेंडर 2026 संशोधित: CET 12वीं स्तर 1-3 दिसंबर, CET स्नातक जनवरी 2027 में",
    excerpt:
      "RSSB has revised its exam calendar because of the local body and Panchayati Raj elections. Here are the new dates for Teaching Associate, CET Senior Secondary, CET Graduation, Lab Attendant and JE, plus RPSC's RAS date.",
    category: "EXAM_DATE",
    exams: ["rssb/cet-senior-secondary", "rssb/cet-graduation", "rssb/teaching-associate", "rpsc/ras"],
    content: `The **Rajasthan Staff Selection Board (RSSB)** issued a **revised exam calendar on 28 September 2026**. Five exams between November 2026 and February 2027 have new dates, because the Board's resources are needed for the **local body and Panchayati Raj elections**. The biggest change: both levels of the **Common Eligibility Test (CET)** have moved.

## RSSB revised exam calendar (November 2026 – February 2027)

| Exam | Type | New date | Shifts |
|---|---|---|---|
| Teaching Associate (contract) 2026, 32 subjects | Non-CET | 17 Nov 2026; 7–21 Dec 2026 | One or two a day |
| CET (Senior Secondary) 2026 | CET | 1–3 Dec 2026 | Two a day |
| CET (Graduation) 2026 | CET | 16–18 Jan 2027 | Two on 16–17 Jan, one on 18 Jan |
| Laboratory Attendant 2025 | Non-CET | 25 Jan 2027 | One |
| Junior Engineer (joint) 2026 | Non-CET | 3–5 Feb 2027 | One a day |

**What moved:** the CET Senior Secondary exam was earlier fixed for 23–25 October 2026, and the CET Graduation exam for 1–3 December 2026.

## RPSC exams in the same months

The **Rajasthan Public Service Commission (RPSC)** runs its own calendar:

| Exam | Date |
|---|---|
| Protection Officer | 15 Nov 2026 |
| **RAS Prelims 2026 (607 posts)** | **6 Dec 2026 (Sunday)** |
| Lecturer (Special Education) | 8 Dec 2026 |
| APO Mains | 27 Dec 2026 |

Read our full guide to the [RAS Prelims 2026](/blog/rpsc-ras-prelims-2026-exam-date-admit-card-pattern) for the pattern and syllabus.

## What the new dates mean for you

- **CET 12th level candidates** get about five more weeks. See the [CET Senior Secondary 2026 guide](/blog/rajasthan-cet-12th-level-2026-exam-date-admit-card-pattern).
- **CET Graduation candidates** get about seven more weeks. See the [CET Graduation 2026 guide](/blog/rajasthan-cet-graduation-2026-exam-date-pattern-syllabus).
- **Teaching Associate candidates** sit Paper I first, on 17 November. See the [Teaching Associate exam schedule](/blog/rssb-teaching-associate-exam-date-2026-paper-1-schedule).
- If you applied for both CET levels, the dates no longer clash with each other or with RAS Prelims on 6 December.

Official websites: [rssb.rajasthan.gov.in](https://rssb.rajasthan.gov.in) and [rpsc.rajasthan.gov.in](https://rpsc.rajasthan.gov.in).

## Start practising

Rajasthan GK is common to almost every one of these exams. Revise with the [Rajasthan GK](/rajasthan) page and take the free [Rajasthan GK mock test](${FREE_MOCK}) — no login, real exam interface.`,
    faqs: [
      {
        q: "Why did RSSB change its exam calendar in 2026?",
        a: "RSSB revised the calendar on 28 September 2026 because of the local body and Panchayati Raj elections, which need the same staff and exam centres.",
      },
      {
        q: "What is the new Rajasthan CET exam date?",
        a: "CET Senior Secondary (12th level) is on 1 to 3 December 2026 and CET Graduation is on 16 to 18 January 2027.",
      },
      {
        q: "Where can I see the official RSSB exam calendar?",
        a: "On rssb.rajasthan.gov.in, under the news and exam schedule section. Admit cards are issued through the SSO Rajasthan portal.",
      },
    ],
  },

  {
    slug: "rajasthan-cet-12th-level-2026-exam-date-admit-card-pattern",
    site: "rj",
    seoTitle: "Rajasthan CET 12th Level 2026: New Exam Date 1-3 Dec, Admit Card",
    seoDescription:
      "Rajasthan CET Senior Secondary 2026 is now on 1-3 December 2026. New date, admit card steps, exam pattern, negative marking and a five-week study plan.",
    title: "Rajasthan CET 12th Level 2026: New Exam Date 1-3 December, Admit Card and Exam Pattern",
    titleHi: "राजस्थान CET 12वीं स्तर 2026: नई परीक्षा तिथि 1-3 दिसंबर, एडमिट कार्ड और परीक्षा पैटर्न",
    excerpt:
      "RSSB has moved the CET Senior Secondary exam from 23-25 October to 1-3 December 2026. About 24.5 lakh candidates have applied. New date, admit card steps, pattern and a study plan.",
    category: "EXAM_DATE",
    exams: ["rssb/cet-senior-secondary"],
    content: `The **Rajasthan CET Senior Secondary (12th level) exam 2026** will now be held on **1, 2 and 3 December 2026**, in **two shifts a day**. The **Rajasthan Staff Selection Board (RSSB)** moved it from 23–25 October 2026 in its [revised calendar of 28 September 2026](/blog/rssb-exam-calendar-2026-revised-november-february), because of the local body and Panchayati Raj elections.

About **24.5 lakh candidates** have applied, which makes it one of the largest exams in Rajasthan.

## Rajasthan CET 12th level 2026 at a glance

| Item | Detail |
|---|---|
| Conducting body | Rajasthan Staff Selection Board (RSSB) |
| Exam | CET (Senior Secondary level) 2026 |
| Application window | 24 June – 23 July 2026 (closed) |
| Old exam date | 23–25 October 2026 |
| **New exam date** | **1–3 December 2026, two shifts a day** |
| Applicants | About 24.5 lakh |
| Official website | rssb.rajasthan.gov.in |

## Why CET 12th level matters

CET is an **eligibility test**, not a recruitment. A valid score lets you sit the separate main exam of 12th-level RSSB posts when they are advertised. Posts such as **Junior Assistant / Clerk Grade-II**, Forester and Forest Guard have used the senior secondary CET score in recent drives. Each post's advertisement says which CET level it accepts.

## Exam pattern

| Item | Detail |
|---|---|
| Questions | 150 objective questions |
| Marks | 300 |
| Time | 3 hours |
| Options | Five per question; the fifth is for not attempting |
| Negative marking | One-third of the question's marks per wrong answer |

Leaving more than **10% of the questions without any option marked** can make you ineligible, so mark an option, even the fifth one, for every question.

The paper covers Rajasthan GK (history, art and culture, geography), India and world GK, general science, reasoning, mathematics, General Hindi, General English and basic computer. See the full [CET 12th level syllabus](/rssb/cet-senior-secondary/syllabus).

## How to download the admit card

1. Open [sso.rajasthan.gov.in](https://sso.rajasthan.gov.in) and log in with your SSO ID.
2. Go to **Recruitment Portal** and open your CET Senior Secondary 2026 application.
3. Download the e-admit card when the link is active; RSSB usually releases it a few days before the exam.
4. Check your name, photo, shift and exam centre. Carry a printout and an original photo ID.

RSSB usually puts out an **exam city slip** before the admit card, so watch the website through November.

## A five-week plan for the extra time

- **Weeks 1–2:** Rajasthan GK, district by district. The [Rajasthan GK](/rajasthan) page is a quick start.
- **Week 3:** maths and reasoning every day, plus Hindi grammar.
- **Weeks 4–5:** a full mock every two days with negative marking on, and revision of your weak topics.

Start today with the free [Rajasthan GK mock test](${FREE_MOCK}) — no login, real CBT interface, Hindi and English.`,
    faqs: [
      {
        q: "Is the Rajasthan CET 12th level exam postponed?",
        a: "Yes. RSSB's revised calendar of 28 September 2026 moved it from 23 to 25 October 2026 to 1 to 3 December 2026.",
      },
      {
        q: "When will the CET 12th level admit card come?",
        a: "RSSB usually releases the admit card a few days before the exam, with an exam city slip before that. Download it from the SSO Rajasthan recruitment portal.",
      },
      {
        q: "How many questions are in the CET 12th level paper?",
        a: "150 objective questions for 300 marks in 3 hours, with one-third negative marking for a wrong answer.",
      },
    ],
  },

  {
    slug: "rajasthan-cet-graduation-2026-exam-date-pattern-syllabus",
    site: "rj",
    seoTitle: "Rajasthan CET Graduation 2026: Exam on 16-18 January 2027, Pattern",
    seoDescription:
      "Rajasthan CET Graduation level 2026 exam moved to 16-18 January 2027. Shift schedule, exam pattern, syllabus, which posts need it and a seven-week study plan.",
    title: "Rajasthan CET Graduation Level 2026: Exam Moved to 16-18 January 2027, Pattern and Syllabus",
    titleHi: "राजस्थान CET स्नातक स्तर 2026: परीक्षा अब 16-18 जनवरी 2027 को, पैटर्न और सिलेबस",
    excerpt:
      "The Rajasthan CET Graduation exam is no longer in December. RSSB has moved it to 16-18 January 2027. About 17 lakh candidates have applied. Shifts, pattern, syllabus and a study plan.",
    category: "EXAM_DATE",
    exams: ["rssb/cet-graduation"],
    content: `The **Rajasthan CET Graduation level exam 2026** will now be held on **16, 17 and 18 January 2027**. It was earlier scheduled for 1–3 December 2026; the **Rajasthan Staff Selection Board (RSSB)** moved it in its [revised calendar of 28 September 2026](/blog/rssb-exam-calendar-2026-revised-november-february).

About **17 lakh candidates** have applied.

## Shift schedule

| Date | Shifts |
|---|---|
| 16 January 2027 | Two shifts |
| 17 January 2027 | Two shifts |
| 18 January 2027 | One shift (morning) |

Your shift is printed on the admit card. RSSB releases it on the SSO Rajasthan recruitment portal a few days before the exam.

## Why the graduation CET matters

CET is an **eligibility test**. A valid graduation-level score is what lets you sit the main exam of graduate-level RSSB posts such as **Patwari** when they are advertised. Without it, you cannot apply for those posts at all, so the CET is the real first round.

## Exam pattern

| Item | Detail |
|---|---|
| Questions | 150 objective questions |
| Marks | 300 |
| Time | 3 hours |
| Options | Five per question; the fifth is for not attempting |
| Negative marking | One-third of the question's marks per wrong answer |

Leaving more than 10% of the questions without any option marked can make you ineligible.

## Syllabus in brief

- **Rajasthan GK:** history, art, culture, literature, heritage, geography, polity and economy of Rajasthan
- **General knowledge:** Indian and world history and geography, polity, economy, general science, current affairs
- **Reasoning and maths:** logical reasoning, arithmetic and data interpretation
- **Language and computer:** General Hindi, General English and computer basics

See the full [CET Graduation syllabus](/rssb/cet-graduation/syllabus).

## A seven-week plan for the extra time

- **Weeks 1–3:** Rajasthan GK, one area a week — history and culture, then geography, then polity, economy and schemes. Use the [Rajasthan GK](/rajasthan) page for a quick district-wise refresher.
- **Weeks 4–5:** Indian polity, economy and science, with 30 minutes of maths and reasoning every day.
- **Weeks 6–7:** a full mock every two days with negative marking on, and revision of your mistakes.

If you also applied for the [CET 12th level on 1–3 December](/blog/rajasthan-cet-12th-level-2026-exam-date-admit-card-pattern), that exam is now well clear of this one, so you can prepare for both in order.

Take the free [Rajasthan GK mock test](${FREE_MOCK}) today to see where you stand — no login, real exam interface.`,
    faqs: [
      {
        q: "What is the new Rajasthan CET graduation exam date?",
        a: "16 to 18 January 2027, as per RSSB's revised calendar of 28 September 2026. It was earlier scheduled for 1 to 3 December 2026.",
      },
      {
        q: "Is the Rajasthan CET graduation score needed for Patwari?",
        a: "Yes. Patwari is a graduate-level RSSB post, and only candidates with a valid CET graduation score can sit its main exam when it is advertised.",
      },
      {
        q: "Can I take both CET levels?",
        a: "Yes, if you applied for both. The 12th level is on 1 to 3 December 2026 and the graduation level on 16 to 18 January 2027, so the dates do not clash.",
      },
    ],
  },

  {
    slug: "rpsc-ras-prelims-2026-exam-date-admit-card-pattern",
    site: "rj",
    seoTitle: "RAS Prelims 2026 on 6 December: Admit Card, Pattern, Syllabus",
    seoDescription:
      "RPSC RAS Prelims 2026 for 607 posts is on 6 December 2026. Admit card, exam pattern, one-third negative marking, the 10% blank rule and a six-week revision plan.",
    title: "RPSC RAS Prelims 2026 on 6 December: Admit Card, Exam Pattern, Syllabus and Last-Six-Weeks Plan",
    titleHi: "RPSC RAS प्रारंभिक परीक्षा 2026 6 दिसंबर को: एडमिट कार्ड, परीक्षा पैटर्न और सिलेबस",
    excerpt:
      "The RAS Prelims 2026 for 607 posts is scheduled for 6 December 2026. Admit card steps, the 150-question pattern with one-third negative marking, the 10% blank rule, syllabus and a six-week plan.",
    category: "EXAM_DATE",
    exams: ["rpsc/ras"],
    content: `The **Rajasthan Public Service Commission (RPSC)** will hold the **RAS/RTS Combined Competitive (Preliminary) Exam 2026** on **6 December 2026 (Sunday)**. The 2026 notification has **607 vacancies**, and with about six weeks left, this is the time to switch from reading to revision and mocks.

## RAS 2026 at a glance

| Item | Detail |
|---|---|
| Conducting body | Rajasthan Public Service Commission (RPSC) |
| Vacancies | 607 (192 State Services, 415 Subordinate Services) |
| Application window | 4 June – 3 July 2026 (closed) |
| **Prelims** | **6 December 2026 (Sunday)** |
| Eligibility | Graduation from a recognised university |
| Official website | rpsc.rajasthan.gov.in |

## Admit card

RPSC releases the RAS Prelims admit card online a few days before the exam.

1. Go to [rpsc.rajasthan.gov.in](https://rpsc.rajasthan.gov.in) or log in at [sso.rajasthan.gov.in](https://sso.rajasthan.gov.in) and open the Recruitment Portal.
2. Open the RAS/RTS 2026 admit card link and enter your details.
3. Download and print it; check your name, photo, roll number and centre.

Carry the printout and an original photo ID, and read the instructions on the admit card about reporting time.

## Prelims pattern

| Item | Detail |
|---|---|
| Paper | General Knowledge and General Science |
| Questions | 150 objective questions |
| Marks | 200 |
| Time | 3 hours |
| Options | Five per question; the fifth is for not attempting |
| Negative marking | One-third of the question's marks per wrong answer |

**The 10% rule:** a candidate who leaves more than 10% of the questions without any of the five options marked is **disqualified**. If you do not know an answer and do not want to risk a guess, mark the fifth option; do not leave the row blank.

The prelims is only a **screening test**: its marks decide who reaches the Mains but are not added to the final merit. The Mains has four descriptive papers for 800 marks, followed by an interview.

## Syllabus in brief

- History, art, culture, literature and heritage of Rajasthan
- Indian history and the national movement
- Geography of the world, India and Rajasthan
- Indian constitution, polity and the political and administrative system of Rajasthan
- Indian and Rajasthan economy
- General science and technology, reasoning and mental ability
- Current affairs of Rajasthan, India and the world

See the full [RAS syllabus](/rpsc/ras/syllabus).

## A six-week plan to 6 December

- **Weeks 1–2:** Rajasthan history, art and culture, and Rajasthan geography. These carry a large share of the paper. The [Rajasthan GK](/rajasthan) page is a quick district-wise refresher.
- **Weeks 3–4:** polity, economy and science; 12 months of current affairs, with Rajasthan schemes and budget announcements.
- **Weeks 5–6:** a full 150-question mock every two days in 3 hours, with negative marking on. Analyse every wrong answer.

Start with the free [Rajasthan GK mock test](${FREE_MOCK}) to check your Rajasthan GK in the real exam interface — no login needed.

If you also sit RSSB exams, see the [revised RSSB exam calendar](/blog/rssb-exam-calendar-2026-revised-november-february): CET 12th level ends on 3 December, three days before RAS.`,
    faqs: [
      {
        q: "When is the RAS Prelims 2026?",
        a: "RPSC has scheduled the RAS Prelims 2026 for 6 December 2026, a Sunday. It was earlier listed for 29 November 2026.",
      },
      {
        q: "What happens if I leave questions blank in RAS Prelims?",
        a: "Each question has a fifth option for not attempting it. A candidate who leaves more than 10% of the questions without any option marked is disqualified.",
      },
      {
        q: "How many vacancies are in RAS 2026?",
        a: "607: 192 in State Services and 415 in Subordinate Services.",
      },
    ],
  },

  {
    slug: "rssb-teaching-associate-exam-date-2026-paper-1-schedule",
    site: "rj",
    seoTitle: "RSSB Teaching Associate Exam Date 2026: Paper I on 17 November",
    seoDescription:
      "RSSB Teaching Associate exam for 3,540 posts: Paper I on 17 November 2026, subject-wise Paper II from 7 to 21 December. Full schedule, pattern and admit card.",
    title: "RSSB Teaching Associate Exam Date 2026: Paper I on 17 November, Subject-wise Paper II Schedule",
    titleHi: "RSSB टीचिंग एसोसिएट परीक्षा तिथि 2026: पेपर I 17 नवंबर को, विषयवार पेपर II शेड्यूल",
    excerpt:
      "RSSB will hold Paper I of the Teaching Associate exam (3,540 posts, Advt. No. 06/2026) on 17 November 2026 and subject-wise Paper II from 7 to 21 December. Full schedule, pattern and admit card steps.",
    category: "EXAM_DATE",
    exams: ["rssb/teaching-associate"],
    content: `The **Rajasthan Staff Selection Board (RSSB)** will hold the **Teaching Associate (contract basis) direct recruitment exam 2026** in two parts: **Paper I on 17 November 2026** and **subject-wise Paper II from 7 to 21 December 2026**. The exam is for **3,540 posts** under the **Rajasthan College Education Society (Raj-CES)**, advertised in **Advertisement No. 06/2026**.

## Teaching Associate 2026 at a glance

| Item | Detail |
|---|---|
| Advertisement | No. 06/2026 |
| Posts | 3,540 (contractual) |
| Employer | Rajasthan College Education Society |
| Subjects | 32 |
| CET needed? | No, it is a non-CET exam |
| **Paper I** | **17 November 2026, 11:00 AM – 12:00 noon** |
| **Paper II** | **7 – 21 December 2026, subject-wise** |
| Official website | rssb.rajasthan.gov.in |

## Paper II subject-wise schedule

Morning shift is 10 AM – 12 noon, afternoon shift 3 PM – 5 PM.

| Date | Morning | Afternoon |
|---|---|---|
| 7 Dec | Physics | Botany |
| 9 Dec | English | Chemistry |
| 10 Dec | Entomology; Genetics and Plant Breeding; Soil Science and Agriculture Chemistry | Drawing; Economics; Agronomy |
| 11 Dec | Public Administration; Business Administration; Sociology | Agricultural Economics; Computer Science; Home Science; Mathematics |
| 14 Dec | Plant Pathology; Urdu; Horticulture; Agriculture Engineering; Agriculture Extension and Communication; Animal Science; EAFM | — |
| 15 Dec | Zoology | History |
| 16 Dec | Law | Geography |
| 17 Dec | Political Science | — |
| 18 Dec | Hindi | — |
| 21 Dec | Sanskrit; ABST | — |

## Exam pattern

- **Paper I — General Studies of Rajasthan, 1 hour.** Common to all 32 subjects.
- **Paper II — your subject, 2 hours.**
- Each question has **five options (A to E)**; E is for a question you do not want to attempt. Leaving more than 10% of the questions without any option marked can make you ineligible.

## Admit card

RSSB releases the e-admit card on the SSO Rajasthan recruitment portal a few days before the exam. Log in at [sso.rajasthan.gov.in](https://sso.rajasthan.gov.in), open the Recruitment Portal and download it from your Teaching Associate application. Paper I and Paper II may have separate admit cards, so check for both.

## Three weeks to Paper I

Paper I is the same for everyone, so a good score here is an easy edge before Paper II. In the next three weeks:

- Revise Rajasthan history, art and culture, geography, polity and economy. The [Rajasthan GK](/rajasthan) page is a quick district-wise start.
- Read Rajasthan current affairs and state schemes of the last year.
- Practise one-hour timed papers. The free [Rajasthan GK mock test](${FREE_MOCK}) runs in the real exam interface with no login.

See the full [Teaching Associate syllabus](/rssb/teaching-associate/syllabus), and the [revised RSSB exam calendar](/blog/rssb-exam-calendar-2026-revised-november-february) for the other exams in the same weeks.`,
    faqs: [
      {
        q: "When is the RSSB Teaching Associate Paper I?",
        a: "On 17 November 2026, from 11 AM to 12 noon. It is the General Studies of Rajasthan paper, common to all subjects.",
      },
      {
        q: "When is my subject's Paper II?",
        a: "Paper II runs subject-wise from 7 to 21 December 2026. Physics is on 7 December, Hindi on 18 December and Sanskrit on 21 December, for example; see the full table above.",
      },
      {
        q: "Is RSSB Teaching Associate a permanent post?",
        a: "No. The 3,540 posts are on a contract basis under the Rajasthan College Education Society.",
      },
    ],
  },
];
