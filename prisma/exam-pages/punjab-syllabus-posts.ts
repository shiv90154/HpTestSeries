import { pb } from "../../src/sites/pb";
import { CLERK_FREE_MOCK_SLUG, GROUP_D_FREE_MOCK_SLUG, PCS_FREE_MOCK_SLUG } from "../pb-exams";
import type { PostSeed } from "./types";

const FREE_MOCK = `/tests/${pb.freeMockSlug}`;
const CLERK_MOCK = `/tests/${CLERK_FREE_MOCK_SLUG}`;
const GROUP_D_MOCK = `/tests/${GROUP_D_FREE_MOCK_SLUG}`;
const PCS_MOCK = `/tests/${PCS_FREE_MOCK_SLUG}`;

// pbtestseries.in syllabus and pattern posts, written from queries that already show up in Search Console (psssb clerk
// syllabus, psssb group d exam pattern, punjab pcs syllabus 2026 pdf). Every figure comes from the exam pages in
// punjab.ts, which were read from the official PSSSB and PPSC notices; each post tells the reader to confirm on the
// official site. The owner read them before they were seeded as published.

export const PUNJAB_SYLLABUS_POSTS: PostSeed[] = [
  {
    slug: "psssb-clerk-syllabus-exam-pattern-2026",
    site: "pb",
    seoTitle: "PSSSB Clerk Syllabus & Exam Pattern 2026: Part A, Part B",
    seoDescription:
      "PSSSB Clerk 2026 syllabus and exam pattern: qualifying Punjabi paper, 100-mark Part B, 0.25 negative marking, typing test and a topic-wise study plan.",
    title: "PSSSB Clerk Syllabus and Exam Pattern 2026: Punjabi Qualifying Paper, Part B Topics and Study Plan",
    excerpt:
      "PSSSB Clerk (Advt. No. 02 of 2026) has a qualifying Punjabi paper and a 100-mark Part B on GK, Punjab history, reasoning, English and ICT. Topic-wise syllabus, negative marking, typing test and how to plan.",
    publish: true,
    category: "SYLLABUS",
    exams: ["psssb/clerk"],
    content: `The **Subordinate Services Selection Board, Punjab (PSSSB)** fills Clerk posts in the common cadre of many state departments. The 2026 drive (**Advertisement No. 02 of 2026**) held its written exam on **11 October 2026**. The Clerk is a Group C post starting at **Level 2 (₹19,900)** of the Punjab pay matrix.

The scheme below is the one reported for the 2026 drive. **Confirm it against the official advertisement on sssb.punjab.gov.in** before you finalise your plan, because boards can change it from one drive to the next.

## Exam pattern at a glance

| Part | Questions | Marks | Nature |
|---|---|---|---|
| Part A: Punjabi language | 50 | 50 | Qualifying, 50% to pass |
| Part B: GK, Punjab history and culture, reasoning, Punjabi, English, ICT | 100 | 100 | Decides merit |
| **Total time** | | | **150 minutes** |

- **Negative marking:** 0.25 mark for each wrong answer in Part B.
- **Part A gates Part B.** If you do not reach the minimum marks in Punjabi, your Part B is not checked, however well you did.
- **After the written test:** a **typing test in Punjabi and English**, then document verification.

## Part A: Punjabi (qualifying)

- ਵਿਆਕਰਨ: ਸ਼ਬਦ ਜੋੜ, ਸ਼ਬਦ ਭੇਦ, ਲਿੰਗ, ਵਚਨ, ਵਿਰੋਧੀ ਸ਼ਬਦ, ਸਮਾਨਾਰਥੀ ਸ਼ਬਦ
- ਮੁਹਾਵਰੇ ਅਤੇ ਅਖਾਣ, ਅਸ਼ੁੱਧ-ਸ਼ੁੱਧ ਵਾਕ
- Reading comprehension (ਪੈਰਾ ਪੜ੍ਹ ਕੇ ਪ੍ਰਸ਼ਨ)

Do not leave this for the last week. Fifteen minutes of Punjabi grammar every day is enough to clear 50% for most candidates.

## Part B: topic-wise syllabus

### General knowledge and current affairs
Indian history, polity, geography and economy, general science and environment, and national and international current affairs, awards, sports and books.

### Punjab history and culture
The Sikh Gurus, Maharaja Ranjit Singh, the freedom movement in Punjab, the rivers, the regions (Majha, Doaba, Malwa) and districts, fairs, festivals, folk dances, literature and the Punjab economy. The [Know Your Punjab](/punjab) page is a quick revision sheet.

### Reasoning and mental ability
Series, analogy, classification, coding-decoding, blood relations, directions, ranking, syllogism and puzzles.

### English
Grammar, vocabulary, synonyms and antonyms, sentence correction and comprehension.

### ICT
Computer fundamentals, MS Office, the internet, e-mail and cyber safety.

## A simple study plan

1. **Weeks 1 to 2:** finish Punjab GK district by district and start daily Punjabi grammar.
2. **Weeks 3 to 4:** reasoning and English practice every day, ICT notes once a week.
3. **Last two weeks:** a full timed mock every two or three days with negative marking on, then fix the topics where you lost marks.

Start with the free [PSSSB Clerk mock test](${CLERK_MOCK}), which has 100 questions on the Part B subjects, or the [Punjab GK mock](${FREE_MOCK}) for a quick first score. All exam details are on the [PSSSB Clerk page](/psssb/clerk).`,
    faqs: [
      {
        q: "Is there negative marking in the PSSSB Clerk exam?",
        a: "Yes. In the 2026 drive 0.25 mark is deducted for each wrong answer in Part B. Part A, the Punjabi paper, only decides whether Part B is checked. Confirm the rule in the advertisement for your drive.",
      },
      {
        q: "What happens if I do not pass the Punjabi paper?",
        a: "Part A is qualifying. If you miss the minimum marks (50% in the 2026 drive), Part B is not evaluated and you are out of the merit list.",
      },
      {
        q: "Is there a typing test for PSSSB Clerk?",
        a: "Yes. Candidates shortlisted from the written test take a typing test in Punjabi and English at the speed the advertisement states. Practise both scripts before the result.",
      },
    ],
  },
  {
    slug: "psssb-group-d-syllabus-exam-pattern-2026",
    site: "pb",
    seoTitle: "PSSSB Group D Syllabus & Exam Pattern 2026: Topics, Marks",
    seoDescription:
      "PSSSB Group D 2026 exam pattern and syllabus: qualifying Punjabi, 100-mark main section on GK, Punjab GK, reasoning, maths and English, 0.25 negative marking.",
    title: "PSSSB Group D Syllabus and Exam Pattern 2026: Sewadar, Chowkidar and Other Posts",
    excerpt:
      "PSSSB Group D (Advt. No. 04 of 2026) has 2,098 posts and an OMR test with a qualifying Punjabi section. Exam pattern, negative marking, topic-wise syllabus and how to prepare.",
    publish: true,
    category: "SYLLABUS",
    exams: ["psssb/group-d"],
    content: `**PSSSB Group D** recruitment fills posts such as **Sewadar, Chowkidar, Safai Sewak, Mali, Water Carrier and Cattle Attendant** in Punjab government departments. The 2026 drive (**Advertisement No. 04 of 2026**) grew to **2,098 posts**, 739 of them for women, after a corrigendum in September 2026, and its written exam was held on **25 October 2026**.

The pattern below is as reported for that drive. **Confirm the exact sections in the official advertisement on sssb.punjab.gov.in.**

## Exam pattern at a glance

| Part | Questions | Marks | Nature |
|---|---|---|---|
| Part A: Punjabi language | 50 | 50 | Qualifying |
| Part B: GK, Punjab GK, reasoning, maths, English | 100 | 100 | Decides merit |
| **Total time** | | | **150 minutes, OMR paper** |

- **Negative marking:** 0.25 mark for each wrong answer in Part B, so attempt only what you are reasonably sure of.
- Only candidates who pass the Punjabi section are ranked on Part B.
- Posts are reserved category-wise for General, SC, BC, EWS, ex-servicemen, sportspersons and persons with disabilities.

## Syllabus, topic by topic

### Punjabi (qualifying)
- ਗੁਰਮੁਖੀ ਲਿਪੀ, ਸ਼ਬਦ ਜੋੜ, ਵਿਆਕਰਨ ਦੇ ਮੁੱਢਲੇ ਨਿਯਮ
- ਵਿਰੋਧੀ ਅਤੇ ਸਮਾਨਾਰਥੀ ਸ਼ਬਦ, ਮੁਹਾਵਰੇ

### General knowledge
Basic Indian history, geography and polity, everyday science, health and hygiene, and current affairs of Punjab and India.

### Punjab GK
Districts and their headquarters, rivers, important places, the Sikh Gurus, Punjab's history, fairs, festivals and folk culture.

### Reasoning and basic maths
Number series, analogy, coding-decoding, directions, simplification, percentage, ratio, profit and loss, and time and work.

### English
Basic grammar, vocabulary and sentence usage.

## How to prepare

The questions are at a basic level, so **speed and accuracy decide the merit**. Revise Punjab GK first (start with [Know Your Punjab](/punjab)), practise Punjabi grammar daily and take timed tests with negative marking on. The free [PSSSB Group D mock test](${GROUP_D_MOCK}) is a good first check and the [Punjab GK mock](${FREE_MOCK}) is a quick warm-up. More on the [PSSSB Group D page](/psssb/group-d).`,
    faqs: [
      {
        q: "How many posts are in PSSSB Group D 2026?",
        a: "After the corrigendum of 17 September 2026, Advertisement No. 04 of 2026 has 2,098 Group D posts, of which 739 are for women.",
      },
      {
        q: "Is Punjabi compulsory for PSSSB Group D?",
        a: "Yes. The paper has a qualifying Punjabi section, and you must pass it for the rest of your paper to count.",
      },
      {
        q: "Is there negative marking in the Group D exam?",
        a: "Yes, 0.25 mark per wrong answer in the main section as reported for the 2026 drive. Check the advertisement for your drive.",
      },
    ],
  },
  {
    slug: "punjab-pcs-syllabus-2026-prelims-mains",
    site: "pb",
    seoTitle: "Punjab PCS Syllabus 2026: Prelims GS, CSAT & Mains Topics",
    seoDescription:
      "Punjab PCS (PPSC) syllabus 2026: prelims General Studies, qualifying CSAT, mains papers, qualifying Punjabi paper and Punjab history and culture topics.",
    title: "Punjab PCS Syllabus 2026: Prelims General Studies, CSAT and Mains, Topic by Topic",
    excerpt:
      "The Punjab PCS (PPSC Combined Competitive Exam) has a prelims with General Studies and a qualifying CSAT, a descriptive mains and an interview. Full topic list, what is qualifying and where Punjab GK counts.",
    publish: true,
    category: "SYLLABUS",
    exams: ["ppsc/pcs"],
    content: `The **Punjab State Civil Services Combined Competitive Examination** is conducted by the **Punjab Public Service Commission (PPSC), Patiala** for PCS (Executive Branch), DSP, Tehsildar, Excise and Taxation Officer, Food and Supplies Officer, Block Development and Panchayat Officer and other Group A and B services.

PPSC publishes the full syllabus with every notification, so **download the PDF from ppsc.gov.in and check it against this list** before you finalise your plan. The topic list below is the usual scope.

## Stages at a glance

| Stage | What it is | Counts for merit? |
|---|---|---|
| Prelims: General Studies | Objective paper | Yes, decides who moves to mains |
| Prelims: CSAT | Objective aptitude paper | No, qualifying only |
| Mains | Descriptive, including a qualifying Punjabi paper and an essay | Yes |
| Personality test | Interview | Yes |

## Prelims: General Studies

- History of India and Punjab, the Indian national movement
- Indian and world geography, the geography of Punjab
- Indian polity and governance, economy and planning
- Environment, ecology and general science
- Current events of national and state importance

## Prelims: CSAT (qualifying)

- Comprehension, logical reasoning and analytical ability
- Decision making and problem solving
- Basic numeracy and data interpretation

Because CSAT only qualifies, many candidates ignore it and are then surprised. Keep a little practice going every week so it never becomes the hurdle.

## Mains

- A **qualifying Punjabi language paper** and an **essay**
- General Studies papers on history, geography, polity, economy, science and technology and ethics
- Punjab's history, culture, economy and society throughout

## Where Punjab GK counts

Punjab is in every stage: the Gurus and the freedom movement, rivers and regions, agriculture and the economy, art and culture. Strong Punjab GK and daily Punjab current affairs separate toppers from the rest. Start with [Know Your Punjab](/punjab), the free [PCS Prelims General Studies mock](${PCS_MOCK}) and the [Punjab GK mock test](${FREE_MOCK}). The exam hub is at [Punjab PCS](/ppsc/pcs).`,
    faqs: [
      {
        q: "Is the CSAT paper counted in Punjab PCS prelims merit?",
        a: "No. CSAT is qualifying; the merit for mains is drawn from the General Studies paper. Check the notification for the qualifying percentage.",
      },
      {
        q: "Is Punjabi compulsory in Punjab PCS?",
        a: "The main exam includes a qualifying Punjabi paper, and Punjab rules require knowledge of Punjabi up to matriculation level for state government posts.",
      },
      {
        q: "Where can I download the official Punjab PCS syllabus PDF?",
        a: "From the PPSC website, ppsc.gov.in, where the syllabus is published with each notification.",
      },
    ],
  },
];
