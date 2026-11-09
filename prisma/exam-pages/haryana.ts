import type { ExamPages } from "./types";

// Haryana exams, shown on hrtestseries.in only. The facts come from aggregator sites found on 9 November 2026 and are NOT
// yet checked against hssc.gov.in (docs/HR-TEST-SERIES-PLAN.md §1): they are worded as "reported", and no exam pattern is
// given until the 2026 advertisement is confirmed, so the exam has no /exam-pattern page yet.

export const HARYANA_PAGES: ExamPages = {
  "hssc/cet-group-c": {
    seo: {
      title: "HSSC CET Group C Mock Test {year} — Haryana GK & Practice Papers",
      description:
        "HSSC CET Group C mock tests for the Haryana Common Eligibility Test: Haryana GK sectionals with solutions in English and Hindi, in the real online exam format.",
    },
    description: `The **Haryana Staff Selection Commission (HSSC)** fills Group C posts in Haryana through the **Common Eligibility Test (CET)**. The CET score decides eligibility for a large share of state recruitments, including Police, Patwari, Clerk and many other Group C posts, which is why this one exam matters to most Haryana job seekers.

In the 2026 drive (Advertisement No. 02/2026) about **7,300 Group C vacancies** were reported by exam-prep sites, with the Mains date still to be announced. These figures are not yet checked against the official notice on hssc.gov.in, so confirm the posts, dates and eligibility there before you apply.

The CET is an **online objective test**. Reports describe about 100 questions in roughly 105 minutes, covering Haryana GK, general awareness and current affairs, reasoning, maths, English, Hindi and computer. Reports also disagree on negative marking, so read the marking scheme in the official advertisement before relying on any figure.

**How to prepare:** Haryana GK is the part that students from other states lack and that local students can score fully in, so start there: history, geography and districts, rivers and wildlife, culture and fairs, economy, polity and sports personalities. Then build general awareness, reasoning and maths, and practise Hindi and English grammar. Take a sectional test each day and a full mock every few days.

**Our mocks:** we are adding the CET series in stages. The Haryana GK sectionals are first, each with 25 questions, 20 minutes and a detailed solution in English and Hindi for every question. The Haryana GK facts are written in-house and are being spot-checked, so tell us if you find an error.`,
    syllabus: `The 2026 notice gives the scheme; the topics below are what the CET usually covers.

### Haryana GK
- History of Haryana: Indus Valley sites, Panipat and Tarain, the 1857 revolt, formation in 1966
- Geography: hills, plains, rivers, canals, soils, wildlife
- Districts, towns and places of interest
- Culture: folk theatre, dances, dialects, fairs and festivals
- Economy: agriculture, industry, institutions and transport
- Polity and administration; sports and personalities

### General Awareness
- Indian history, polity, geography and economy
- General science and environment
- Current affairs, awards, books and sports

### Reasoning and Maths
- Series, analogy, coding-decoding, blood relations, direction sense
- Arithmetic: percentage, ratio, profit and loss, time and work, average

### Languages and Computer
- English grammar, vocabulary and comprehension
- Hindi grammar, vocabulary and comprehension
- Computer basics, MS Office and internet`,
    faqs: [
      {
        q: "What is the HSSC CET and who needs it?",
        a: "The Common Eligibility Test is the first screening exam the Haryana Staff Selection Commission holds for Group C and D posts. Its score is used by most Haryana recruitments, so most applicants for Group C posts have to take it.",
      },
      {
        q: "How many posts are in the HSSC CET Group C 2026 drive?",
        a: "Exam-prep sites report about 7,300 Group C vacancies under Advertisement No. 02/2026. This has not been checked against the official notice yet, so confirm on hssc.gov.in.",
      },
      {
        q: "Is there negative marking in the HSSC CET?",
        a: "Sources disagree. Some reports say there is no negative marking for wrong answers, while an advertisement PDF mentions a deduction for unattempted questions. Read the 2026 advertisement. Our sectionals apply no negative marking.",
      },
      {
        q: "Are the Haryana GK sectionals enough for the CET?",
        a: "They cover the Haryana part, which is the most state-specific. You also need general awareness, reasoning, maths, English, Hindi and computer; more sectionals and full mocks are being added to this series.",
      },
    ],
  },
};
