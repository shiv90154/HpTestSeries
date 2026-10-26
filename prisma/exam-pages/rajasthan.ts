import { rj } from "../../src/sites/rj";
import type { ExamPages } from "./types";

const FREE_MOCK = `/tests/${rj.freeMockSlug}`;

// Rajasthan exams, shown on rjtestseries.in only. Dates come from the RSSB calendar revised on 28 September 2026 and the
// RPSC schedule of October 2026, checked by the owner on 26 October 2026.

export const RAJASTHAN_PAGES: ExamPages = {
  "rssb/cet-senior-secondary": {
    seo: {
      title: "Rajasthan CET 12th Level Mock Test {year} — Rajasthan GK & More",
      description:
        "Rajasthan CET Senior Secondary (12th level) mock tests in the real exam format: Rajasthan GK, reasoning, maths, Hindi, English and computer. Free test, no login.",
    },
    description: `The **Common Eligibility Test (CET) — Senior Secondary level** is the first step to most 12th-pass jobs in Rajasthan. The **Rajasthan Staff Selection Board (RSSB)** holds it once for many posts, and only those with a valid CET score can sit the separate main exam of a post such as **Junior Assistant / Clerk Grade-II**, Forester or Forest Guard when it is advertised.

The 2026 CET Senior Secondary exam is scheduled for **1 to 3 December 2026** in two shifts a day. It was earlier fixed for 23 to 25 October 2026 and moved in RSSB's revised calendar of 28 September 2026 because of the local body and Panchayati Raj elections. About **24.5 lakh candidates** have applied, which makes it one of the largest exams in the state.

The paper is objective: **150 questions for 300 marks in 3 hours**. RSSB papers carry five options per question, where the fifth option is for a question you do not want to attempt; a wrong answer costs a third of the question's marks, and leaving more than 10% of the questions without any option marked can make you ineligible.

**How to prepare:** Rajasthan GK (history, art and culture, geography) carries the most weight, so revise it district by district (our [Rajasthan GK](/rajasthan) page is a quick start), keep maths and reasoning in daily practice and take a timed mock every few days. Begin with the free [Rajasthan GK mock test](${FREE_MOCK}) to see the exam interface and your starting score.`,
    syllabus: `The detailed syllabus is in the RSSB notification. The usual areas are:

### Rajasthan GK
- History, art, culture, literature, traditions and heritage of Rajasthan
- Geography of Rajasthan: physical regions, rivers, lakes, climate, soils, minerals, wildlife
- Polity and economy of Rajasthan, state schemes

### General knowledge
- Indian history and the freedom struggle
- Geography of India and the world
- Indian polity and constitution, economy
- General science and current affairs

### Reasoning and mathematics
- Series, analogy, coding-decoding, blood relations, direction sense
- Percentage, ratio, profit and loss, simple and compound interest, time and work, mensuration

### Language and computer
- General Hindi and General English: grammar, vocabulary and comprehension
- Basic computer knowledge`,
    faqs: [
      {
        q: "When is the Rajasthan CET Senior Secondary exam in 2026?",
        a: "RSSB's revised calendar of 28 September 2026 puts it on 1 to 3 December 2026, in two shifts a day. It was earlier scheduled for 23 to 25 October 2026. The admit card shows your shift.",
      },
      {
        q: "Does a CET score give me a job?",
        a: "No. CET is an eligibility test. A valid score lets you apply for and sit the main exam of a post when RSSB advertises it; selection is decided by that main exam.",
      },
      {
        q: "Is there negative marking in Rajasthan CET?",
        a: "RSSB papers deduct a third of the question's marks for a wrong answer, and each question has a fifth option for not attempting it. Leaving more than 10% of the questions unmarked can make you ineligible, so mark an option for every question.",
      },
      {
        q: "Who can take the CET Senior Secondary level?",
        a: "Candidates who have passed Class 12 (Senior Secondary) can apply. The 2026 application window closed in July 2026, so the next chance is the next CET notification.",
      },
    ],
  },

  "rssb/cet-graduation": {
    seo: {
      title: "Rajasthan CET Graduation Level Mock Test {year} — Full Pattern",
      description:
        "Rajasthan CET graduation level mock tests: Rajasthan GK, India GK, reasoning, maths, Hindi, English and computer in the real CBT format. Free Rajasthan GK test.",
    },
    description: `The **Common Eligibility Test (CET) — Graduation level** is the gateway to graduate-level jobs under the **Rajasthan Staff Selection Board (RSSB)**. A valid score is needed to sit the main exam of posts such as **Patwari** when they are advertised, so lakhs of graduates take it every cycle.

The 2026 CET Graduation exam is now scheduled for **16 to 18 January 2027**, with two shifts on 16 and 17 January and one morning shift on 18 January. It was earlier fixed for 1 to 3 December 2026 and moved in RSSB's revised calendar of 28 September 2026. About **17 lakh candidates** have applied.

The paper is objective: **150 questions for 300 marks in 3 hours**. Each question has five options, the fifth being for a question you do not want to attempt; a wrong answer costs a third of the marks, and leaving more than 10% of the questions without any option marked can make you ineligible.

**How to prepare:** the extra weeks from the date change are best spent on Rajasthan GK, which carries the most weight, and on a mock every few days with negative marking on. Our [Rajasthan GK](/rajasthan) page is a quick district-wise revision, and the free [Rajasthan GK mock test](${FREE_MOCK}) shows the exam interface with no login.`,
    syllabus: `The detailed syllabus is in the RSSB notification. The usual areas are:

### Rajasthan GK
- History, art, culture, literature, traditions and heritage of Rajasthan
- Geography, polity and economy of Rajasthan
- Rajasthan government schemes and current affairs

### General knowledge
- Indian and world history, geography of India and the world
- Indian constitution and polity, Indian economy
- General science and current affairs

### Reasoning and mathematics
- Verbal and non-verbal reasoning, logical deduction
- Arithmetic: percentage, ratio, averages, profit and loss, interest, time and distance; data interpretation

### Language and computer
- General Hindi and General English
- Computer fundamentals, MS Office and internet basics`,
    faqs: [
      {
        q: "When is the Rajasthan CET Graduation exam in 2026-27?",
        a: "RSSB's revised calendar of 28 September 2026 moved it from 1 to 3 December 2026 to 16 to 18 January 2027. Admit cards are issued online through the SSO portal before the exam.",
      },
      {
        q: "Which posts need the CET graduation level score?",
        a: "Graduate-level RSSB posts such as Patwari need a valid CET graduation score. Each post's own advertisement says whether it uses the graduation or senior secondary level score.",
      },
      {
        q: "How many questions are in the Rajasthan CET graduation paper?",
        a: "150 objective questions for 300 marks in 3 hours. A wrong answer costs a third of the question's marks, so do not guess blindly.",
      },
    ],
  },

  "rssb/teaching-associate": {
    seo: {
      title: "RSSB Teaching Associate Mock Test {year} — Paper I Rajasthan GK",
      description:
        "RSSB Teaching Associate exam practice: Paper I on General Studies of Rajasthan plus subject Paper II. Real exam format, Hindi and English. Free Rajasthan GK mock.",
    },
    description: `**RSSB Teaching Associate** posts are contractual teaching posts in government colleges under the **Rajasthan College Education Society (Raj-CES)**. The **Rajasthan Staff Selection Board (RSSB)** advertised **3,540 posts** in 2026 (Advertisement No. 06/2026), in 32 subjects from Physics and Hindi to Agriculture and Law. It is a non-CET exam, so no CET score is needed.

The written exam has two papers. **Paper I is common to all subjects: General Studies of Rajasthan, 1 hour.** It is scheduled for **17 November 2026, 11:00 AM to 12:00 noon**. **Paper II is on your own subject, 2 hours**, held subject-wise between **7 and 21 December 2026** in morning (10 AM–12 noon) and afternoon (3 PM–5 PM) shifts.

As in other RSSB papers, each question has five options, the fifth being for a question you do not want to attempt, and leaving more than 10% of the questions without any option marked can make you ineligible.

**How to prepare:** Paper I comes first and is the same for everyone, so a strong Rajasthan GK score gives you an edge before Paper II starts. Revise with our [Rajasthan GK](/rajasthan) page and take the free [Rajasthan GK mock test](${FREE_MOCK}) to practise speed in a one-hour paper.`,
    syllabus: `The detailed syllabus for each subject is in the RSSB notification. In outline:

### Paper I — General Studies of Rajasthan
- History, art, culture, literature, traditions and heritage of Rajasthan
- Geography of Rajasthan: physical features, rivers, climate, natural resources
- Polity and administration of Rajasthan
- Economy of Rajasthan and state government schemes
- Current affairs of Rajasthan

### Paper II — Subject concerned
- The subject of the post you applied for, at postgraduate level
- Subjects include Physics, Chemistry, Botany, Zoology, Mathematics, English, Hindi, Sanskrit, Urdu, History, Geography, Political Science, Economics, Sociology, Public Administration, Law, Computer Science, Home Science, Drawing, ABST, Business Administration and agriculture subjects`,
    faqs: [
      {
        q: "When is the RSSB Teaching Associate exam?",
        a: "Paper I (General Studies of Rajasthan) is on 17 November 2026 from 11 AM to 12 noon. Paper II is held subject-wise from 7 to 21 December 2026 in morning and afternoon shifts.",
      },
      {
        q: "How many Teaching Associate posts are there?",
        a: "3,540 contractual posts under the Rajasthan College Education Society, advertised by RSSB in Advertisement No. 06/2026.",
      },
      {
        q: "Is a CET score needed for Teaching Associate?",
        a: "No. It is a non-CET exam: you need only the qualification the advertisement asks for in your subject.",
      },
    ],
  },

  "rpsc/ras": {
    seo: {
      title: "RAS Prelims Mock Test {year} — RPSC Pattern, Rajasthan GK & GS",
      description:
        "RPSC RAS Prelims mock tests: 150 questions, 200 marks, one-third negative marking, Rajasthan GK and General Science in the real exam format. Free Rajasthan GK test.",
    },
    description: `The **RAS/RTS Combined Competitive Exam** of the **Rajasthan Public Service Commission (RPSC)** fills the Rajasthan Administrative Service and other state and subordinate services. The 2026 notification has **607 vacancies: 192 in State Services and 415 in Subordinate Services**. Applications ran from 4 June to 3 July 2026.

The **RAS Prelims 2026 is scheduled for 6 December 2026 (Sunday)**. It is a screening test: you need a graduation degree to apply, and prelims marks only decide who goes on to the Mains; they are not added to the final merit.

**Prelims pattern:** one objective paper on General Knowledge and General Science, **150 questions for 200 marks in 3 hours**. Each question has five options, the fifth being for a question you do not want to attempt. A wrong answer costs **one-third** of the question's marks, and a candidate who leaves more than 10% of the questions without any option marked is disqualified. The **Mains** has four descriptive papers (General Studies I, II and III, and General Hindi and General English) for 800 marks, followed by an interview.

**How to prepare:** Rajasthan history, art and culture and Rajasthan geography carry a large share of the prelims, so revise them alongside Indian polity, economy and science. Our [Rajasthan GK](/rajasthan) page is a quick district-wise refresher, and the free [Rajasthan GK mock test](${FREE_MOCK}) shows the exam interface with no login.`,
    syllabus: `The full syllabus is on the RPSC website. The prelims covers:

### History, art and culture of Rajasthan
- Major landmarks and dynasties, freedom movement and integration of Rajasthan
- Architecture, paintings, handicrafts, fairs, festivals, folk music and dance, language and literature, saints and folk deities

### Indian history
- Ancient, medieval and modern India, the national movement

### Geography
- World and India: physical features, climate, resources
- Rajasthan: physical regions, climate, rivers and lakes, natural vegetation, minerals, population, agriculture

### Indian constitution and polity
- Constitution, Parliament, executive, judiciary, federalism
- Political and administrative system of Rajasthan: Governor, Chief Minister, State Assembly, panchayati raj

### Economy
- Indian economy, budgeting, banking, schemes
- Economy of Rajasthan: agriculture, industry, infrastructure, welfare schemes

### Science, reasoning and current affairs
- General science and technology, environment
- Logical reasoning, mental ability and basic numeracy
- Current events of Rajasthan, India and the world`,
    faqs: [
      {
        q: "When is the RAS Prelims exam in 2026?",
        a: "RPSC has scheduled the RAS Prelims 2026 for 6 December 2026 (Sunday). The admit card is released online at rpsc.rajasthan.gov.in a few days before the exam.",
      },
      {
        q: "How many vacancies are in RAS 2026?",
        a: "607 in total: 192 in State Services and 415 in Subordinate Services.",
      },
      {
        q: "Is there negative marking in RAS Prelims?",
        a: "Yes. A wrong answer costs one-third of the question's marks. Each question also has a fifth option for not attempting it, and leaving more than 10% of the questions without any option marked leads to disqualification.",
      },
      {
        q: "Do RAS Prelims marks count in the final merit?",
        a: "No. The prelims is a screening test. The final merit is made from the Mains and the interview.",
      },
    ],
  },
};
