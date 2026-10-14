// HP High Court (Process Server, Stenographer, Clerk): GSC shows these posts bring most of the site's search traffic,
// so they get more than the two bank-built mocks every other exam series has (see prisma/exam-series).
// - Sectional tests are shared by all three series: the GK, English, Hindi and reasoning syllabus is the same.
// - Full mocks 3+ are written fresh here, because the shared bank has run short of English and hard questions.
// Question `s` in a mock is the index into that exam's sections in prisma/exam-series/index.ts.

import type { PatwariQuestion, TestDef } from "../patwari/types";
import { processServerMock3 } from "./process-server-mock3";
import { processServerMock4 } from "./process-server-mock4";
import { processServerMock5 } from "./process-server-mock5";
import { processServerScreening1 } from "./process-server-screening1";
import { processServerScreening2 } from "./process-server-screening2";
import { clerkMock3 } from "./clerk-mock3";
import { clerkMock4 } from "./clerk-mock4";
import { clerkMock5 } from "./clerk-mock5";
import { englishTests } from "./sectional-english";
import { stenoMock3 } from "./steno-mock3";
import { stenoMock4 } from "./steno-mock4";
import { stenoMock5 } from "./steno-mock5";
import { gkTests } from "./sectional-gk";
import { hindiTests } from "./sectional-hindi";
import { reasoningTests } from "./sectional-reasoning";

const SUBJECTS = [
  { slug: "gk", name: "General Knowledge & Himachal GK", nameHi: "सामान्य ज्ञान एवं हिमाचल सामान्य ज्ञान", tests: gkTests },
  { slug: "english", name: "General English", nameHi: "सामान्य अंग्रेज़ी", tests: englishTests },
  { slug: "hindi", name: "General Hindi", nameHi: "सामान्य हिंदी", tests: hindiTests },
  { slug: "reasoning", name: "Reasoning", nameHi: "तर्कशक्ति", tests: reasoningTests },
];

const level = (qs: PatwariQuestion[]) => (qs.filter((x) => x.d === "H").length >= qs.length * 0.3 ? "slightly above exam level" : "at exam level");

export const HC_SECTIONALS: TestDef[] = SUBJECTS.flatMap((sub) =>
  sub.tests.map((questions, i) => ({
    slug: `hp-high-court-${sub.slug}-sectional-${i + 1}`,
    title: `HP High Court ${sub.name} Sectional Test ${i + 1}`,
    titleHi: `एचपी हाई कोर्ट ${sub.nameHi} सेक्शनल टेस्ट ${i + 1}`,
    type: "SECTIONAL" as const,
    durationSec: 25 * 60,
    instructions:
      `Sectional test for HP High Court Process Server, Stenographer and Clerk: 25 questions on ${sub.name}, 25 marks, 25 minutes. ` +
      `Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks. The paper is set ${level(questions)}. ` +
      "You can switch between Hindi and English at any time.",
    sections: [{ name: sub.name, nameHi: sub.nameHi }],
    questions,
  })),
);

/** Fresh full mocks 3, 4, … for each post (sections as in prisma/exam-series/index.ts). */
export const PROCESS_SERVER_MOCKS: PatwariQuestion[][] = [processServerMock3, processServerMock4, processServerMock5];
export const STENO_MOCKS: PatwariQuestion[][] = [stenoMock3, stenoMock4, stenoMock5];
export const CLERK_MOCKS: PatwariQuestion[][] = [clerkMock3, clerkMock4, clerkMock5];

// The 2022–23 Process Server drive opened with a 50-mark, one-hour objective screening test (1:5 shortlist) before the
// descriptive paper, so these mocks copy that shape. The descriptive Hindi essay and English letter cannot be marked in
// the CBT; the blog post on them carries the formats and model answers.
const SCREENING_SECTIONS = [
  { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
  { name: "General Studies", nameHi: "सामान्य अध्ययन" },
  { name: "Reasoning", nameHi: "तर्कशक्ति" },
  { name: "Mathematics", nameHi: "गणित" },
  { name: "Hindi & English", nameHi: "हिंदी एवं अंग्रेज़ी" },
];

export const PROCESS_SERVER_SCREENING_MOCKS: PatwariQuestion[][] = [processServerScreening1, processServerScreening2];

export const PROCESS_SERVER_SCREENING_TESTS: TestDef[] = PROCESS_SERVER_SCREENING_MOCKS.map((questions, i) => ({
  slug: `hp-high-court-process-server-screening-mock-${i + 1}`,
  title: `HP High Court Process Server Screening Mock ${i + 1}`,
  titleHi: `एचपी हाई कोर्ट प्रोसेस सर्वर स्क्रीनिंग मॉक ${i + 1}`,
  type: "MOCK" as const,
  durationSec: 60 * 60,
  instructions:
    `Screening-pattern mock for HP High Court Process Server: ${questions.length} questions, ${questions.length} marks, 60 minutes, ` +
    "the shape of the High Court's 2022 screening test (check the 2026 notification for this drive's scheme). " +
    "Sections: Himachal GK 15, General Studies 15, Reasoning 7, Mathematics 7, Hindi & English 6; the split is ours, not official. " +
    `Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks. The paper is set ${level(questions)}. ` +
    "You can switch between Hindi and English at any time.",
  sections: SCREENING_SECTIONS,
  questions,
}));
