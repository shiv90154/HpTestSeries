// HP TET (JBT) sectional tests: 25 questions, 25 marks, 25 minutes each. No negative marking, as in the TET itself.

import type { PatwariQuestion, TestDef } from "../patwari/types";
import { jbtPedagogySectionals } from "./jbt-sectional-pedagogy";
import { jbtEnglishSectional, jbtEvsSectional, jbtHindiSectional, jbtMathsSectional } from "./jbt-sectional-subjects";

const level = (qs: PatwariQuestion[]) => (qs.filter((x) => x.d === "H").length >= qs.length * 0.3 ? "slightly above exam level" : "at exam level");

const SUBJECTS: { slug: string; name: string; nameHi: string; tests: PatwariQuestion[][] }[] = [
  { slug: "child-development-pedagogy", name: "Child Development & Pedagogy", nameHi: "बाल विकास एवं शिक्षाशास्त्र", tests: jbtPedagogySectionals },
  { slug: "english", name: "English", nameHi: "अंग्रेज़ी", tests: [jbtEnglishSectional] },
  { slug: "hindi", name: "Hindi", nameHi: "हिंदी", tests: [jbtHindiSectional] },
  { slug: "mathematics", name: "Mathematics", nameHi: "गणित", tests: [jbtMathsSectional] },
  { slug: "evs", name: "EVS & General Awareness", nameHi: "पर्यावरण अध्ययन एवं सामान्य जागरूकता", tests: [jbtEvsSectional] },
];

export const HP_TET_JBT_SECTIONALS: TestDef[] = SUBJECTS.flatMap((sub) =>
  sub.tests.map((questions, i) => ({
    slug: `hp-tet-jbt-${sub.slug}-sectional-${i + 1}`,
    title: `HP TET (JBT) ${sub.name} Sectional Test ${i + 1}`,
    titleHi: `एचपी टेट (जेबीटी) ${sub.nameHi} सेक्शनल टेस्ट ${i + 1}`,
    type: "SECTIONAL" as const,
    durationSec: 25 * 60,
    marksWrong: 0,
    instructions:
      `Sectional test for HP TET (JBT): ${questions.length} questions on ${sub.name}, ${questions.length} marks, 25 minutes. ` +
      `Each correct answer gives 1 mark and there is no negative marking. The paper is set ${level(questions)}. ` +
      "You can switch between Hindi and English at any time.",
    sections: [{ name: sub.name, nameHi: sub.nameHi }],
    questions,
  })),
);
