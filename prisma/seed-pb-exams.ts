// Free mocks and hidden series for the PSSSB Group D, Clerk, Junior Engineer (Civil, Electrical) and PPSC PCS exams on
// pbtestseries.in (pbtestseries.in exam pages were empty). Each product is created hidden until there are paid mocks to
// sell; switch it on in /admin/products. Adding a new test = adding it to prisma/pb-exams/index.ts.

import type { PrismaClient } from "../src/generated/prisma/client";
import { PB_EXAM_TESTS } from "./pb-exams";
import { seedSeries, type SeriesSeed } from "./seed-series";

const VALIDITY_DAYS = 180;
const PRICE_IN_PAISE = 149_00; // proposed in docs/PB-TEST-SERIES-PLAN.md §4.4; not yet confirmed by the owner, editable in admin

type Cfg = { key: string; bodySlug: string; examSlug: string; stageSlug?: string; name: string; nameHi: string; description: string; tests: SeriesSeed["tests"] };

const CONFIGS: Cfg[] = [
  {
    key: "psssb-group-d",
    bodySlug: "psssb",
    examSlug: "group-d",
    name: "PSSSB Group D",
    nameHi: "पीएसएसएसबी ग्रुप डी",
    description: "Mocks for the PSSSB Group D written exam: Punjab GK, General Knowledge, Reasoning, Maths and English with a quarter-mark negative.",
    tests: PB_EXAM_TESTS.groupD,
  },
  {
    key: "psssb-clerk",
    bodySlug: "psssb",
    examSlug: "clerk",
    name: "PSSSB Clerk",
    nameHi: "पीएसएसएसबी क्लर्क",
    description: "Mocks for the PSSSB Clerk written exam (Part B): Punjab history & culture, General Knowledge, Reasoning, English, Punjabi and ICT with a quarter-mark negative.",
    tests: PB_EXAM_TESTS.clerk,
  },
  {
    key: "psssb-je-civil",
    bodySlug: "psssb",
    examSlug: "junior-engineer",
    name: "PSSSB JE Civil",
    nameHi: "पीएसएसएसबी जेई सिविल",
    description: "Mocks for the PSSSB Junior Engineer (Civil) written exam: civil technical questions plus Punjab GK, General Knowledge, Reasoning and English.",
    tests: PB_EXAM_TESTS.jeCivil,
  },
  {
    key: "psssb-je-electrical",
    bodySlug: "psssb",
    examSlug: "junior-engineer",
    name: "PSSSB JE Electrical",
    nameHi: "पीएसएसएसबी जेई इलेक्ट्रिकल",
    description: "Mocks for the PSSSB Junior Engineer (Electrical) written exam: electrical technical questions plus Punjab GK, General Knowledge, Reasoning and English.",
    tests: PB_EXAM_TESTS.jeElectrical,
  },
  {
    key: "ppsc-pcs-prelims",
    bodySlug: "ppsc",
    examSlug: "pcs",
    stageSlug: "prelims",
    name: "PPSC PCS Prelims",
    nameHi: "पीपीएससी पीसीएस प्रीलिम्स",
    description: "Mocks for the PPSC PCS Preliminary exam (General Studies): Punjab GK, History & Polity, Geography & Economy, Science & Current Affairs at exam level.",
    tests: PB_EXAM_TESTS.pcs,
  },
];

export async function seedPbExams(db: PrismaClient) {
  let createdTests = 0;
  for (const c of CONFIGS) {
    const title = `${c.name} Mock Test Series`;
    const titleHi = `${c.nameHi} मॉक टेस्ट सीरीज़`;
    const r = await seedSeries(db, {
      label: `${c.name} seed`,
      bodySlug: c.bodySlug,
      examSlug: c.examSlug,
      stageSlug: c.stageSlug,
      tests: c.tests,
      series: { slug: `${c.key}-mock-test-series`, title, titleHi, description: `${c.description} Every question has a detailed solution in English and Hindi.` },
      product: { slug: `${c.key}-mock-series`, title, titleHi, priceInPaise: PRICE_IN_PAISE, validityDays: VALIDITY_DAYS, isActive: false },
    });
    createdTests += r.createdTests;
  }
  return { createdTests };
}
