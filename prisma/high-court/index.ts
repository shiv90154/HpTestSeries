// HP High Court (Process Server, Stenographer, Clerk): GSC shows these posts bring most of the site's search traffic,
// so they get more than the two bank-built mocks every other exam series has (see prisma/exam-series).
// - Sectional tests are shared by all three series: the GK, English, Hindi and reasoning syllabus is the same.
// - Full mocks 3+ are written fresh here, because the shared bank has run short of English and hard questions.
// Question `s` in a mock is the index into that exam's sections in prisma/exam-series/index.ts.

import type { PatwariQuestion, TestDef } from "../patwari/types";
import { processServerMock3 } from "./process-server-mock3";
import { processServerMock4 } from "./process-server-mock4";
import { processServerMock5 } from "./process-server-mock5";
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
