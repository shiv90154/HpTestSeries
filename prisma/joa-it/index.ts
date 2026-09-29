// Every HP JOA IT test that is seeded: the full mock(s) followed by computer subject tests, one per syllabus area.

import { mock1 } from "./mock1";
import { dataWeb1 } from "./sectional/data-web";
import { excel1 } from "./sectional/excel";
import { fundamentalsHardware1 } from "./sectional/fundamentals-hardware";
import { networkingSecurity1 } from "./sectional/networking-security";
import { softwareOs1 } from "./sectional/software-os";
import { wordPowerpoint1 } from "./sectional/word-powerpoint";
import { SECTIONS, type JoaItQuestion, type TestDef } from "./types";

const MOCK_INSTRUCTIONS =
  "Full-length HP JOA IT mock on the new HPRCA pattern: 120 questions, 120 marks, 90 minutes. Each correct answer gives 1 mark and " +
  "each wrong answer deducts 0.25 marks. Sections: Computer (65), Mathematics (20), Himachal GK (8), General Knowledge & Science (9), " +
  "Reasoning (8) and Hindi & English (10). The paper is set at a level slightly above the real exam, so treat it as tough practice. " +
  "You can switch between Hindi and English at any time.";

const SUBJECT_INSTRUCTIONS = (area: string) =>
  `Computer subject test: 25 questions, 25 marks, 25 minutes. Each correct answer gives 1 mark and each wrong answer deducts 0.25 marks. ` +
  `This test covers ${area} from the JOA IT computer syllabus, set slightly above the real exam level. You can switch between Hindi and English at any time.`;

const mocks: TestDef[] = [mock1].map((questions, i) => ({
  slug: `hp-joa-it-full-mock-${i + 1}`,
  title: `HP JOA IT Full Mock Test ${i + 1}`,
  titleHi: `एचपी जेओए आईटी फुल मॉक टेस्ट ${i + 1}`,
  type: "MOCK",
  durationSec: 90 * 60,
  // Only the first mock is a free taste of the series; everything else must be bought.
  demoPercent: i === 0 ? 50 : 0,
  instructions: MOCK_INSTRUCTIONS,
  sections: SECTIONS.map((s) => ({ name: s.name, nameHi: s.nameHi })),
  questions,
}));

// Computer carries 65 of the 120 marks, so its subject tests are split by syllabus area rather than one "Computer" test.
const AREAS: { slug: string; name: string; nameHi: string; tests: JoaItQuestion[][] }[] = [
  { slug: "computer-fundamentals", name: "Computer Fundamentals & Hardware", nameHi: "कंप्यूटर मूल सिद्धांत एवं हार्डवेयर", tests: [fundamentalsHardware1] },
  { slug: "software-os", name: "Software & Operating System", nameHi: "सॉफ़्टवेयर एवं ऑपरेटिंग सिस्टम", tests: [softwareOs1] },
  { slug: "ms-word-powerpoint", name: "MS Word & PowerPoint", nameHi: "एमएस वर्ड एवं पावरपॉइंट", tests: [wordPowerpoint1] },
  { slug: "ms-excel", name: "MS Excel", nameHi: "एमएस एक्सेल", tests: [excel1] },
  { slug: "networking-security", name: "Internet, Networking & Cyber Security", nameHi: "इंटरनेट, नेटवर्किंग एवं साइबर सुरक्षा", tests: [networkingSecurity1] },
  { slug: "number-system-dbms-web", name: "Number System, DBMS & Web Technologies", nameHi: "संख्या पद्धति, DBMS एवं वेब तकनीक", tests: [dataWeb1] },
];

const subjectTests: TestDef[] = AREAS.flatMap((a) =>
  a.tests.map((questions, i) => ({
    slug: `hp-joa-it-${a.slug}-${i + 1}`,
    title: `HP JOA IT ${a.name} Test ${i + 1}`,
    titleHi: `एचपी जेओए आईटी ${a.nameHi} टेस्ट ${i + 1}`,
    type: "SECTIONAL" as const,
    durationSec: 25 * 60,
    instructions: SUBJECT_INSTRUCTIONS(a.name),
    sections: [{ name: a.name, nameHi: a.nameHi }],
    questions,
  })),
);

export const JOA_IT_TESTS: TestDef[] = [...mocks, ...subjectTests];
