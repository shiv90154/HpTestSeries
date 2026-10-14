// HP TET (Shastri) and HP TET (Language Teacher) sectional tests: 25 questions, 25 marks, 25 minutes each, no negative
// marking. The CDP and Hindi Grammar sectionals sit in both series (a test is seeded once, by slug).

import type { PatwariQuestion, TestDef } from "../patwari/types";
import { languageCdpSectional1 } from "./sectional-cdp";
import { hindiGrammarSectional1, hindiLiteratureSectional1, poeticsTeachingSectional1 } from "./sectional-hindi";
import { sanskritGrammarSectional1, sanskritGrammarSectional2, sanskritLiteratureSectional1 } from "./sectional-sanskrit";

const level = (qs: PatwariQuestion[]) => (qs.filter((x) => x.d === "H").length >= qs.length * 0.3 ? "slightly above exam level" : "at exam level");

type Sub = { slug: string; name: string; nameHi: string; label: string; labelHi: string; tests: PatwariQuestion[][] };

function sectionals(sub: Sub): TestDef[] {
  return sub.tests.map((questions, i) => ({
    slug: `${sub.slug}-sectional-${i + 1}`,
    title: `${sub.label} ${sub.name} Sectional Test ${i + 1}`,
    titleHi: `${sub.labelHi} ${sub.nameHi} सेक्शनल टेस्ट ${i + 1}`,
    type: "SECTIONAL" as const,
    durationSec: 25 * 60,
    marksWrong: 0,
    instructions:
      `Sectional test for ${sub.label}: ${questions.length} questions on ${sub.name}, ${questions.length} marks, 25 minutes. ` +
      `Each correct answer gives 1 mark and there is no negative marking. The paper is set ${level(questions)}. ` +
      "You can switch between Hindi and English at any time.",
    sections: [{ name: sub.name, nameHi: sub.nameHi }],
    questions,
  }));
}

const shared = { label: "HP TET (Shastri / Language Teacher)", labelHi: "एचपी टेट (शास्त्री / भाषा अध्यापक)" };
const shastri = { label: "HP TET (Shastri)", labelHi: "एचपी टेट (शास्त्री)" };
const lt = { label: "HP TET (Language Teacher)", labelHi: "एचपी टेट (भाषा अध्यापक)" };

const CDP = sectionals({ ...shared, slug: "hp-tet-language-cdp", name: "Child Development & Pedagogy", nameHi: "बाल विकास एवं शिक्षाशास्त्र", tests: [languageCdpSectional1] });
const HINDI_GRAMMAR = sectionals({ ...shared, slug: "hp-tet-hindi-grammar", name: "Hindi Grammar", nameHi: "हिंदी व्याकरण", tests: [hindiGrammarSectional1] });

export const SHASTRI_SECTIONALS: TestDef[] = [
  ...sectionals({ ...shastri, slug: "hp-tet-shastri-sanskrit-grammar", name: "Sanskrit Grammar", nameHi: "संस्कृत व्याकरण", tests: [sanskritGrammarSectional1, sanskritGrammarSectional2] }),
  ...sectionals({ ...shastri, slug: "hp-tet-shastri-sanskrit-literature", name: "Sanskrit Literature & Teaching", nameHi: "संस्कृत साहित्य एवं शिक्षण", tests: [sanskritLiteratureSectional1] }),
  ...HINDI_GRAMMAR,
  ...CDP,
];

export const LT_SECTIONALS: TestDef[] = [
  ...HINDI_GRAMMAR,
  ...sectionals({ ...lt, slug: "hp-tet-language-teacher-hindi-literature", name: "Hindi Literature", nameHi: "हिंदी साहित्य", tests: [hindiLiteratureSectional1] }),
  ...sectionals({ ...lt, slug: "hp-tet-language-teacher-poetics-teaching", name: "Poetics & Hindi Teaching", nameHi: "काव्यशास्त्र एवं हिंदी शिक्षण", tests: [poeticsTeachingSectional1] }),
  ...CDP,
];
