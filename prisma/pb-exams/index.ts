// Free mocks for the PSSSB Group D, PSSSB Clerk, PSSSB Junior Engineer (Civil, Electrical) and PPSC PCS (Prelims) exams on
// pbtestseries.in, so no Punjab exam page is empty. Nothing here is written fresh: the questions come from what the Punjab
// series already hold (Punjab GK, Punjabi, reasoning, quant, English, computer, general studies), from the HPAS GS paper
// (PCS), and from the HP engineering free mocks (JE). The seed matches questions by text hash and reuses the rows.
// The section splits are ours: PSSSB Group D, Clerk and JE do not publish a section-wise split, and PPSC does not for the
// prelims, so each test says so in its instructions. The qualifying Punjabi paper (Part A) is not covered.
// Reused Gurmukhi questions still need a Punjabi speaker to check them. A mock claims each question once, so the five
// tests below never repeat a question between them, and questions already in a free Punjab mock are left out.

import { HPAS_MOCKS } from "../hpas-series";
import { COURT_CLERK_TESTS } from "../pb-court-clerk";
import { PB_PATWARI_TESTS } from "../pb-patwari";
import { POLICE_PAID_TESTS, POLICE_FREE_TEST } from "../pb-police";
import { PB_PATWARI_SECTIONALS, PB_POLICE_SECTIONALS } from "../pb-reuse";
import type { Diff, PatwariQuestion, TestDef } from "../patwari/types";
import { assistantEngineerMock1 } from "../upcoming-free/assistant-engineer";
import { hpseblAeMock1 } from "../upcoming-free/hpsebl-ae";
import { hpseblJeElectricalMock1 } from "../upcoming-free/hpsebl-je-electrical";
import { juniorEngineerMock1 } from "../upcoming-free/junior-engineer";
import { linemanMock1 } from "../upcoming-free/lineman";
import { questionTextHash } from "../../src/modules/content/text-hash";

const hash = (x: PatwariQuestion) => questionTextHash(x.en[0]);
type Pick = (x: PatwariQuestion) => boolean;
const subject =
  (...subjects: string[]): Pick =>
  (x) =>
    subjects.includes(x.subject);
const topic =
  (subj: string, ...topics: string[]): Pick =>
  (x) =>
    x.subject === subj && topics.includes(x.topic);

const FREE_FIRST_PARTY = [...PB_PATWARI_TESTS.filter((t) => t.isFree), POLICE_FREE_TEST, ...COURT_CLERK_TESTS.filter((t) => t.isFree)];
const inFreeMock = new Set(FREE_FIRST_PARTY.flatMap((t) => t.questions.map(hash)));

function dedupe(qs: PatwariQuestion[], skip = inFreeMock): PatwariQuestion[] {
  const seen = new Set<string>();
  return qs.filter((x) => {
    const h = hash(x);
    if (seen.has(h) || skip.has(h)) return false;
    seen.add(h);
    return true;
  });
}

/** Everything the Punjab series hold, minus the questions of the free Punjab mocks. */
const PUNJAB_POOL = dedupe([
  ...COURT_CLERK_TESTS.flatMap((t) => t.questions),
  ...PB_PATWARI_SECTIONALS.flatMap((t) => t.questions),
  ...PB_POLICE_SECTIONALS.flatMap((t) => t.questions),
  ...POLICE_PAID_TESTS.flatMap((t) => t.questions),
]);
/** Indian general studies at exam level, from the HPAS GS paper; the Himachal-specific questions stay out. */
const HPAS_GS_POOL = dedupe(HPAS_MOCKS.flat().filter((x) => x.subject === "general-studies"));
const CIVIL_POOL = dedupe([juniorEngineerMock1, assistantEngineerMock1, hpseblAeMock1].flat().filter((x) => x.subject === "civil-engineering"), new Set());
const ELECTRICAL_POOL = dedupe(
  [hpseblJeElectricalMock1, hpseblAeMock1, linemanMock1, assistantEngineerMock1].flat().filter((x) => x.subject === "electrical-engineering"),
  new Set(),
);

const RANK: Record<"easy" | "exam" | "hard", Record<Diff, number>> = {
  easy: { M: 0, E: 1, H: 2 },
  exam: { M: 0, H: 1, E: 2 },
  hard: { H: 0, M: 1, E: 2 },
};

const claimed = new Set<string>();

/** Takes `n` questions nobody has claimed yet, in difficulty order (stable by hash), and puts them in section `s`. */
function claim(s: PatwariQuestion["s"], n: number, from: PatwariQuestion[], pick: Pick, level: keyof typeof RANK, label: string): PatwariQuestion[] {
  const out: PatwariQuestion[] = [];
  const order = [...from].sort((a, b) => RANK[level][a.d] - RANK[level][b.d] || (hash(a) < hash(b) ? -1 : 1));
  for (const x of order) {
    if (out.length === n) break;
    if (claimed.has(hash(x)) || !pick(x)) continue;
    claimed.add(hash(x));
    out.push({ ...x, s });
  }
  if (out.length < n) throw new Error(`pb-exams: only ${out.length} of ${n} questions left for ${label}`);
  return out;
}

const gkAndHistory = topic("punjab-gk", "history", "culture-religion");
const punjabGk = subject("punjab-gk");
const gs = subject("general-studies");
const reasoning = subject("reasoning");
const quant = subject("quant");
const english = subject("english");
const punjabi = subject("punjabi");
const computer = subject("computer");

type Sec = { name: string; nameHi: string; count: number };

const mock = (
  slug: string,
  title: string,
  titleHi: string,
  minutes: number,
  marksWrong: number,
  exam: string,
  secs: Sec[],
  questions: PatwariQuestion[],
  note: string,
): TestDef => ({
  slug,
  title,
  titleHi,
  type: "MOCK",
  durationSec: minutes * 60,
  isFree: true,
  marksWrong,
  instructions:
    `Practice paper for the ${exam}: ${questions.length} questions, ${questions.length} marks, ${minutes} minutes. ` +
    `${note} Sections: ${secs.map((x) => `${x.name} ${x.count}`).join(", ")}. ` +
    `Each correct answer gives 1 mark and ${marksWrong === 0 ? "there is no negative marking" : `each wrong answer deducts ${marksWrong} marks`}. ` +
    "You can switch between English and Hindi at any time.",
  sections: secs.map(({ name, nameHi }) => ({ name, nameHi })),
  questions,
});

// ───────── PSSSB Group D (Part B; matric level, so medium and easy questions first) ─────────
export const GROUP_D_SECTIONS: Sec[] = [
  { name: "Punjab GK", nameHi: "पंजाब सामान्य ज्ञान", count: 25 },
  { name: "General Knowledge", nameHi: "सामान्य ज्ञान", count: 25 },
  { name: "Reasoning", nameHi: "तर्कशक्ति", count: 20 },
  { name: "Basic Maths", nameHi: "बेसिक गणित", count: 20 },
  { name: "English", nameHi: "अंग्रेज़ी", count: 10 },
];
export const GROUP_D_FREE_MOCK_SLUG = "psssb-group-d-free-mock-1";
const groupDQuestions = [
  ...claim(0, 25, PUNJAB_POOL, punjabGk, "easy", "Group D Punjab GK"),
  ...claim(1, 25, PUNJAB_POOL, gs, "easy", "Group D General Knowledge"),
  ...claim(2, 20, PUNJAB_POOL, reasoning, "easy", "Group D Reasoning"),
  ...claim(3, 20, PUNJAB_POOL, quant, "easy", "Group D Maths"),
  ...claim(4, 10, PUNJAB_POOL, english, "easy", "Group D English"),
];
export const GROUP_D_FREE_TEST = mock(
  GROUP_D_FREE_MOCK_SLUG,
  "PSSSB Group D Free Mock Test 1",
  "पीएसएसएसबी ग्रुप डी फ़्री मॉक टेस्ट 1",
  100,
  0.25,
  "PSSSB Group D written exam (Part B)",
  GROUP_D_SECTIONS,
  groupDQuestions,
  "The 2026 Group D test has a qualifying Punjabi paper and a 100-mark merit paper on general knowledge, Punjab GK, reasoning, maths and English with a quarter-mark negative; the split between those subjects is ours. The qualifying Punjabi paper is not covered in this test.",
);

// ───────── PSSSB Clerk (Part B of the 2026 paper) ─────────
export const CLERK_SECTIONS: Sec[] = [
  { name: "Punjab History & Culture", nameHi: "पंजाब इतिहास एवं संस्कृति", count: 25 },
  { name: "General Knowledge", nameHi: "सामान्य ज्ञान", count: 20 },
  { name: "Reasoning", nameHi: "तर्कशक्ति", count: 20 },
  { name: "English", nameHi: "अंग्रेज़ी", count: 15 },
  { name: "Punjabi", nameHi: "पंजाबी", count: 10 },
  { name: "ICT", nameHi: "आईसीटी", count: 10 },
];
export const CLERK_FREE_MOCK_SLUG = "psssb-clerk-free-mock-1";
const clerkQuestions = [
  ...claim(0, 25, PUNJAB_POOL, gkAndHistory, "exam", "Clerk Punjab history & culture"),
  ...claim(1, 20, PUNJAB_POOL, gs, "exam", "Clerk General Knowledge"),
  ...claim(2, 20, PUNJAB_POOL, reasoning, "exam", "Clerk Reasoning"),
  ...claim(3, 15, PUNJAB_POOL, english, "exam", "Clerk English"),
  ...claim(4, 10, PUNJAB_POOL, punjabi, "exam", "Clerk Punjabi"),
  ...claim(5, 10, PUNJAB_POOL, computer, "exam", "Clerk ICT"),
];
export const CLERK_FREE_TEST = mock(
  CLERK_FREE_MOCK_SLUG,
  "PSSSB Clerk Free Mock Test 1",
  "पीएसएसएसबी क्लर्क फ़्री मॉक टेस्ट 1",
  100,
  0.25,
  "PSSSB Clerk written exam (Part B)",
  CLERK_SECTIONS,
  clerkQuestions,
  "Part B of the 2026 Clerk paper covers general knowledge, Punjab history and culture, reasoning, Punjabi, English and ICT with a quarter-mark negative; the exact split is ours. Part A, the qualifying Punjabi paper, is not covered in this test.",
);

// ───────── PPSC PCS Prelims (General Studies, hardest questions first) ─────────
export const PCS_SECTIONS: Sec[] = [
  { name: "Punjab GK", nameHi: "पंजाब सामान्य ज्ञान", count: 25 },
  { name: "History & Polity", nameHi: "इतिहास एवं राजव्यवस्था", count: 30 },
  { name: "Geography & Economy", nameHi: "भूगोल एवं अर्थव्यवस्था", count: 25 },
  { name: "Science & Current Affairs", nameHi: "विज्ञान एवं समसामयिकी", count: 20 },
];
export const PCS_FREE_MOCK_SLUG = "ppsc-pcs-prelims-free-mock-1";
const pcsPool = [...HPAS_GS_POOL, ...PUNJAB_POOL.filter(gs)];
const pcsQuestions = [
  ...claim(0, 25, PUNJAB_POOL, punjabGk, "hard", "PCS Punjab GK"),
  ...claim(1, 30, pcsPool, topic("general-studies", "indian-history", "indian-polity"), "hard", "PCS History & Polity"),
  ...claim(2, 25, pcsPool, topic("general-studies", "indian-geography", "indian-economy"), "hard", "PCS Geography & Economy"),
  ...claim(3, 20, pcsPool, topic("general-studies", "general-science", "current-affairs", "static-gk"), "hard", "PCS Science & Current Affairs"),
];
export const PCS_FREE_TEST = mock(
  PCS_FREE_MOCK_SLUG,
  "PPSC PCS Prelims Free Mock Test 1 (General Studies)",
  "पीपीएससी पीसीएस प्रीलिम्स फ़्री मॉक टेस्ट 1 (सामान्य अध्ययन)",
  120,
  0.25,
  "PPSC PCS Preliminary exam (General Studies)",
  PCS_SECTIONS,
  pcsQuestions,
  "The General Studies paper decides the prelims result; the subject split and the quarter-mark negative are our assumption, so check them against the PPSC notification. Questions are set at a hard level on purpose. CSAT is not covered in this test.",
);

// ───────── PSSSB Junior Engineer: Civil and Electrical streams ─────────
const jeGeneral = (technical: number, secs: Sec[]): Sec[] => [
  { name: "Technical (Civil)", nameHi: "तकनीकी (सिविल)", count: technical },
  ...secs,
];
export const JE_CIVIL_SECTIONS: Sec[] = jeGeneral(25, [
  { name: "Punjab GK", nameHi: "पंजाब सामान्य ज्ञान", count: 10 },
  { name: "General Knowledge", nameHi: "सामान्य ज्ञान", count: 5 },
  { name: "Reasoning", nameHi: "तर्कशक्ति", count: 5 },
  { name: "English", nameHi: "अंग्रेज़ी", count: 5 },
]);
export const JE_ELECTRICAL_SECTIONS: Sec[] = [
  { name: "Technical (Electrical)", nameHi: "तकनीकी (विद्युत)", count: 30 },
  { name: "Punjab GK", nameHi: "पंजाब सामान्य ज्ञान", count: 8 },
  { name: "General Knowledge", nameHi: "सामान्य ज्ञान", count: 4 },
  { name: "Reasoning", nameHi: "तर्कशक्ति", count: 4 },
  { name: "English", nameHi: "अंग्रेज़ी", count: 4 },
];
export const JE_CIVIL_FREE_MOCK_SLUG = "psssb-je-civil-free-mock-1";
export const JE_ELECTRICAL_FREE_MOCK_SLUG = "psssb-je-electrical-free-mock-1";
const jeNote = (stream: string) =>
  `PSSSB does not publish a section-wise split of the Junior Engineer paper; this one is ours, with the ${stream} technical questions carrying the most marks, as in the real paper, plus a short general part. ` +
  "The qualifying Punjabi paper is not covered in this test. Mechanical engineering is not covered.";
const jeCivilQuestions = [
  ...claim(0, 25, CIVIL_POOL, subject("civil-engineering"), "exam", "JE Civil technical"),
  ...claim(1, 10, PUNJAB_POOL, punjabGk, "exam", "JE Civil Punjab GK"),
  ...claim(2, 5, PUNJAB_POOL, gs, "exam", "JE Civil GK"),
  ...claim(3, 5, PUNJAB_POOL, reasoning, "exam", "JE Civil Reasoning"),
  ...claim(4, 5, PUNJAB_POOL, english, "exam", "JE Civil English"),
];
const jeElectricalQuestions = [
  ...claim(0, 30, ELECTRICAL_POOL, subject("electrical-engineering"), "exam", "JE Electrical technical"),
  ...claim(1, 8, PUNJAB_POOL, punjabGk, "exam", "JE Electrical Punjab GK"),
  ...claim(2, 4, PUNJAB_POOL, gs, "exam", "JE Electrical GK"),
  ...claim(3, 4, PUNJAB_POOL, reasoning, "exam", "JE Electrical Reasoning"),
  ...claim(4, 4, PUNJAB_POOL, english, "exam", "JE Electrical English"),
];
export const JE_CIVIL_FREE_TEST = mock(
  JE_CIVIL_FREE_MOCK_SLUG,
  "PSSSB JE Civil Free Mock Test 1",
  "पीएसएसएसबी जेई सिविल फ़्री मॉक टेस्ट 1",
  60,
  0.25,
  "PSSSB Junior Engineer (Civil) written exam",
  JE_CIVIL_SECTIONS,
  jeCivilQuestions,
  jeNote("civil"),
);
export const JE_ELECTRICAL_FREE_TEST = mock(
  JE_ELECTRICAL_FREE_MOCK_SLUG,
  "PSSSB JE Electrical Free Mock Test 1",
  "पीएसएसएसबी जेई इलेक्ट्रिकल फ़्री मॉक टेस्ट 1",
  60,
  0.25,
  "PSSSB Junior Engineer (Electrical) written exam",
  JE_ELECTRICAL_SECTIONS,
  jeElectricalQuestions,
  jeNote("electrical"),
);

export const PB_EXAM_TESTS = {
  groupD: [GROUP_D_FREE_TEST],
  clerk: [CLERK_FREE_TEST],
  pcs: [PCS_FREE_TEST],
  jeCivil: [JE_CIVIL_FREE_TEST],
  jeElectrical: [JE_ELECTRICAL_FREE_TEST],
};
export const ALL_PB_EXAM_TESTS: TestDef[] = Object.values(PB_EXAM_TESTS).flat();
