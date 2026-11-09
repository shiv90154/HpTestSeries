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
    eligibility: "2026 advertisement: wards of Himachal ex-servicemen only; B.Sc. (Agriculture) plus second-class M.Sc. (Agriculture); age 18–45 on 1 January 2026.",
    pattern: "Computer-based Paper I screening test followed by a personality test, as reported; confirm in the advertisement.",
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
  {
    name: "HPPSC Naib Tehsildar",
    bodySlug: "hppsc",
    examSlug: "naib-tehsildar",
    match: /naib tehsildar/i,
    freeMockSlug: "hppsc-naib-tehsildar-free-mock-1",
    eligibility: "Qualification, age limit and recruiting agency are fixed by the advertisement; no 2026 notification confirmed yet.",
    pattern: "Objective written test followed by later stages as notified; confirm in the advertisement.",
    syllabus: "Revenue terms and land records, Himachal GK, general studies, reasoning, maths and English.",
  },
  {
    name: "HP SET",
    bodySlug: "hpu",
    examSlug: "hp-set",
    match: /\bset\b/i,
    freeMockSlug: "hpu-hp-set-free-mock-1",
    eligibility: "Master's degree with the minimum marks set in the Himachal Pradesh University brochure; category relaxation applies.",
    pattern: "Paper I (common) and Paper II (subject), both objective; check the HPU brochure for marks and duration.",
    syllabus: "Paper I: teaching aptitude, research aptitude, reasoning, comprehension and general awareness.",
  },
  {
    name: "HPRCA Lab Assistant",
    bodySlug: "hprca",
    examSlug: "lab-assistant",
    match: /lab assistant/i,
    freeMockSlug: "hprca-lab-assistant-free-mock-1",
    eligibility: "Usually 10+2 with science; the exact qualification and age limit are in the advertisement.",
    pattern: "Objective written test; sections and negative marking as notified.",
    syllabus: "Physics, chemistry and biology (school level), lab apparatus and safety, maths and Himachal GK.",
  },
  {
    name: "HP Anganwadi Supervisor",
    bodySlug: "hp-wcd",
    examSlug: "anganwadi-supervisor",
    match: /anganwadi/i,
    freeMockSlug: "hp-wcd-anganwadi-supervisor-free-mock-1",
    eligibility: "Qualification, age limit and any quota for experienced Anganwadi workers are in the department notification.",
    pattern: "Written test as notified by the Women and Child Development Department.",
    syllabus: "ICDS, child development and nutrition, Himachal GK, general studies, reasoning, Hindi and English.",
  },
  {
    name: "KCCB / JCCB Clerk",
    bodySlug: "kccb-jccb",
    examSlug: "clerk",
    match: /kccb|jccb/i,
    freeMockSlug: "kccb-jccb-clerk-free-mock-1",
    eligibility: "Graduation and age limit as set in each bank's notification; check the bank's website.",
    pattern: "Banking-style objective test; sections and marks are in the bank's notification.",
    syllabus: "Banking and cooperative awareness, quantitative aptitude, reasoning, English and Himachal GK.",
  },
  {
    name: "HP Current Affairs",
    bodySlug: "hp-gk-ca",
    examSlug: "current-affairs",
    match: /current affairs/i,
    freeMockSlug: "hp-current-affairs-free-mock-1",
    eligibility: "No eligibility: a practice test open to every aspirant of Himachal exams.",
    pattern: "15 questions in 15 minutes, 0.25 negative marking.",
    syllabus: "Himachal landmarks and recognitions, plus national and international events.",
  },
  {
    name: "HP Police Head Constable",
    bodySlug: "hp-police",
    examSlug: "head-constable",
    match: /head constable/i,
    freeMockSlug: "hp-police-head-constable-free-mock-1",
    eligibility: "Qualification, age limit and physical standards are fixed by the advertisement.",
    pattern: "Written test, then physical and other stages as notified.",
    syllabus: "Himachal GK, general studies, reasoning, maths, English and computer basics.",
  },
  {
    name: "HP Police Driver Constable",
    bodySlug: "hp-police",
    examSlug: "driver-constable",
    match: /driver constable/i,
    freeMockSlug: "hp-police-driver-constable-free-mock-1",
    eligibility: "Valid driving licence plus the qualification and physical standards in the advertisement.",
    pattern: "Written test, then driving test and physical stages as notified.",
    syllabus: "Himachal GK, reasoning, maths, road signs, Motor Vehicles Act and vehicle knowledge.",
  },
];
