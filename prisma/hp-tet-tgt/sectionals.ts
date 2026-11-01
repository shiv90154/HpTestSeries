// HP TET TGT subject sectional tests: 25 questions, 25 marks, 25 minutes each, no negative marking. Each stream's series
// carries the sectionals for its own stream subjects (the pedagogy and general-awareness sections are common to all).

import type { PatwariQuestion, TestDef } from "../patwari/types";
import { tgtGeographyEconomicsSectional1, tgtHistorySectional1 } from "./sectional-arts";
import { tgtBiologySectional1 } from "./sectional-biology";
import { tgtChemistrySectional1 } from "./sectional-chemistry";
import { tgtMathsSectional1 } from "./sectional-maths";
import { tgtPhysicsSectional1 } from "./sectional-physics";

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

const arts = { label: "HP TET (TGT Arts)", labelHi: "एचपी टेट (टीजीटी कला)" };
const nonMedical = { label: "HP TET (TGT Non-Medical)", labelHi: "एचपी टेट (टीजीटी नॉन-मेडिकल)" };
const medical = { label: "HP TET (TGT Medical)", labelHi: "एचपी टेट (टीजीटी मेडिकल)" };
const science = { label: "HP TET (TGT Non-Medical / Medical)", labelHi: "एचपी टेट (टीजीटी नॉन-मेडिकल / मेडिकल)" };

// Chemistry is a section of both science papers, so one test sits in both series (a test is seeded once, by slug).
const CHEMISTRY = sectionals({ ...science, slug: "hp-tet-tgt-chemistry", name: "Chemistry", nameHi: "रसायन विज्ञान", tests: [tgtChemistrySectional1] });

export const TGT_ARTS_SECTIONALS: TestDef[] = [
  ...sectionals({ ...arts, slug: "hp-tet-tgt-arts-history-civics", name: "History & Civics", nameHi: "इतिहास एवं नागरिक शास्त्र", tests: [tgtHistorySectional1] }),
  ...sectionals({ ...arts, slug: "hp-tet-tgt-arts-geography-economics", name: "Geography & Economics", nameHi: "भूगोल एवं अर्थशास्त्र", tests: [tgtGeographyEconomicsSectional1] }),
];

export const TGT_NON_MEDICAL_SECTIONALS: TestDef[] = [
  ...sectionals({ ...nonMedical, slug: "hp-tet-tgt-non-medical-maths", name: "Mathematics", nameHi: "गणित", tests: [tgtMathsSectional1] }),
  ...sectionals({ ...nonMedical, slug: "hp-tet-tgt-non-medical-physics", name: "Physics", nameHi: "भौतिक विज्ञान", tests: [tgtPhysicsSectional1] }),
  ...CHEMISTRY,
];

export const TGT_MEDICAL_SECTIONALS: TestDef[] = [
  ...sectionals({ ...medical, slug: "hp-tet-tgt-medical-biology", name: "Botany & Zoology", nameHi: "वनस्पति विज्ञान एवं प्राणि विज्ञान", tests: [tgtBiologySectional1] }),
  ...CHEMISTRY,
];
