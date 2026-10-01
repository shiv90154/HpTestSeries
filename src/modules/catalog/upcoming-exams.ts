// Exams that have a free sample mock but no paid test series yet. Shown as cards in the home page pricing section;
// a card drops off once a series product whose title matches `match` goes on sale. The eligibility/pattern/syllabus
// lines are a summary: they change with every notification, so the card always points aspirants to the official one.

export type UpcomingExam = {
  name: string;
  /** The Exam row (body slug / exam slug) this card is for. The card only shows while that exam exists and is visible, so the admin panel controls it. */
  bodySlug: string;
  examSlug: string;
  /** Matched against paid product titles: once one matches, the series is on sale and this card is no longer needed. */
  match: RegExp;
  /** Slug of the free sample mock (seeded from prisma/upcoming-free or prisma/hpas). */
  freeMockSlug: string;
  eligibility: string;
  pattern: string;
  syllabus: string;
};

export const UPCOMING_EXAMS: UpcomingExam[] = [
  {
    name: "HPRCA Clerk",
    bodySlug: "hprca",
    examSlug: "clerk",
    match: /clerk/i,
    freeMockSlug: "hprca-clerk-free-mock-1",
    eligibility: "Bachelor's degree; typing 30 wpm (English) or 25 wpm (Hindi); age 18–45 with 5 years relaxation for reserved HP categories (2026 notification).",
    pattern: "Computer-based written test (120 marks), then a qualifying typing skill test.",
    syllabus: "Himachal GK, general studies, reasoning, maths, English and Hindi.",
  },
  {
    name: "HP TET",
    bodySlug: "hpbose",
    examSlug: "hp-tet",
    match: /tet/i,
    freeMockSlug: "hp-tet-free-mock-1",
    eligibility: "Senior secondary + D.El.Ed for JBT; graduation + B.Ed for TGT. Minimum marks and category rules are set in the HPBOSE notification.",
    pattern: "150 MCQs of 1 mark in 150 minutes, no negative marking, separate paper per category (JBT, TGT Arts, Medical, Non-Medical).",
    syllabus: "Child development & pedagogy, languages, maths/EVS or the TGT subject, and general awareness including Himachal.",
  },
  {
    name: "HPPSC HPAS",
    bodySlug: "hppsc",
    examSlug: "hpas",
    match: /hpas/i,
    freeMockSlug: "hpas-free-mock-1",
    eligibility: "Bachelor's degree in any subject; age 21–35 with 5 years relaxation for reserved HP categories.",
    pattern: "Preliminary (objective) → Mains (descriptive) → Interview.",
    syllabus: "General studies with a strong Himachal focus: history, polity, geography, economy, science and current affairs.",
  },
  {
    name: "HPPSC Assistant Professor",
    bodySlug: "hppsc",
    examSlug: "assistant-professor",
    match: /assistant professor/i,
    freeMockSlug: "hppsc-assistant-professor-free-mock-1",
    eligibility: "Master's degree with at least 55% in the subject plus NET/SET, or a PhD as per UGC rules.",
    pattern: "Written test and interview as specified in the HPPSC notification; the subject paper differs by discipline.",
    syllabus: "Subject paper, teaching & research aptitude, and Himachal GK.",
  },
  {
    name: "HPPSC ADO (Agriculture Development Officer)",
    bodySlug: "hppsc",
    examSlug: "ado",
    match: /\bado\b|agriculture/i,
    freeMockSlug: "hppsc-ado-free-mock-1",
    eligibility: "B.Sc. (Agriculture) or a degree notified in the recruitment rules; age limit and relaxation as per notification.",
    pattern: "Objective screening test followed by the further stages named in the notification.",
    syllabus: "Agronomy, soil science, horticulture, plant protection, agricultural extension and economics.",
  },
  {
    name: "PGIMER Nursing Officer",
    bodySlug: "pgimer",
    examSlug: "nursing-officer",
    match: /pgimer|nursing/i,
    freeMockSlug: "pgimer-nursing-officer-free-mock-1",
    eligibility: "B.Sc. Nursing (or GNM with experience as per notification) and registration with a Nursing Council; maximum age around 35 with category relaxation.",
    pattern: "Computer-based test of about 100 MCQs with 0.25 negative marking (check the latest PGIMER notification).",
    syllabus: "Nursing subjects (fundamentals, medical-surgical, community, child health, midwifery) plus general awareness.",
  },
];
