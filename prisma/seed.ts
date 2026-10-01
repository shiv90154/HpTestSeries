// Seeds the launch catalogue (BLUEPRINT §5) and the shared subject/topic taxonomy.
// Idempotent: safe to re-run. Everything here is editable later from the admin panel.
//
// ⚠ Verify every body/exam/stage against the current official notifications before launch —
// recruiting bodies for some posts have changed (e.g. HPSSC → HPRCA).

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { seedContent } from "./seed-content";
import { DEMO_TEST_SLUG, seedDemoTest } from "./seed-demo";
import { seedHpasFree } from "./seed-hpas";
import { seedJoaIt } from "./seed-joa-it";
import { seedJoaItPyq } from "./seed-joa-it-pyq";
import { seedPatwari } from "./seed-patwari";
import { seedPatwariPyq } from "./seed-patwari-pyq";
import { seedPolice } from "./seed-police";
import { seedPoliceStandalonePyq } from "./seed-police-pyq";
import { taxonomy } from "./taxonomy";

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

type StageSeed = { slug: string; name: string; nameHi?: string };
type ExamSeed = { slug: string; name: string; nameHi?: string; stages?: StageSeed[] };
type BodySeed = { slug: string; name: string; nameHi: string; exams: ExamSeed[] };

const catalogue: BodySeed[] = [
  {
    slug: "hppsc",
    name: "Himachal Pradesh Public Service Commission",
    nameHi: "हिमाचल प्रदेश लोक सेवा आयोग",
    exams: [
      {
        slug: "hpas",
        name: "HPAS Combined Competitive Exam",
        nameHi: "एचपीएएस संयुक्त प्रतियोगी परीक्षा",
        stages: [
          { slug: "prelims", name: "Prelims", nameHi: "प्रारंभिक" },
          { slug: "mains", name: "Mains", nameHi: "मुख्य" },
        ],
      },
    ],
  },
  {
    slug: "hprca",
    name: "Himachal Pradesh Rajya Chayan Aayog",
    nameHi: "हिमाचल प्रदेश राज्य चयन आयोग",
    exams: [
      { slug: "joa-it", name: "JOA IT", nameHi: "जेओए आईटी" },
      { slug: "clerk", name: "Clerk", nameHi: "क्लर्क" },
    ],
  },
  {
    slug: "hp-police",
    name: "Himachal Pradesh Police",
    nameHi: "हिमाचल प्रदेश पुलिस",
    exams: [{ slug: "constable", name: "Police Constable", nameHi: "पुलिस कांस्टेबल" }],
  },
  {
    slug: "hpbose",
    name: "HP Board of School Education",
    nameHi: "हिमाचल प्रदेश स्कूल शिक्षा बोर्ड",
    exams: [
      {
        slug: "hp-tet",
        name: "HP TET",
        nameHi: "एचपी टेट",
        stages: [
          { slug: "jbt", name: "JBT TET" },
          { slug: "tgt-arts", name: "TGT Arts TET" },
          { slug: "tgt-medical", name: "TGT Medical TET" },
          { slug: "tgt-non-medical", name: "TGT Non-Medical TET" },
        ],
      },
    ],
  },
  {
    slug: "hp-revenue",
    name: "HP Revenue Department",
    nameHi: "राजस्व विभाग, हिमाचल प्रदेश",
    exams: [{ slug: "patwari", name: "Patwari", nameHi: "पटवारी" }],
  },
];

// Shown on the public exam pages. Keep to facts that do not change between notifications.
const descriptions: Record<string, string> = {
  "hppsc/hpas":
    "The HPAS Combined Competitive Examination is conducted by the Himachal Pradesh Public Service Commission (HPPSC), Shimla, to recruit officers for the HP Administrative Service and allied services. Selection is made through a Preliminary exam, a Main exam and a Personality Test. The Preliminary exam is objective and tests General Studies, including a strong focus on Himachal Pradesh.",
  "hprca/joa-it":
    "Junior Office Assistant (IT) posts in Himachal Pradesh government departments are filled by the Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur. The written test checks general knowledge, Himachal GK, reasoning, mathematics, English, Hindi and computer knowledge, and is followed by a skill test as specified in the notification.",
  "hprca/clerk":
    "Clerk posts in Himachal Pradesh government departments are filled by the Himachal Pradesh Rajya Chayan Aayog (HPRCA), Hamirpur, through a written objective test and a typing skill test as specified in the notification. Himachal GK, general studies, reasoning, maths, English and Hindi form the core of the written test.",
  "hp-police/constable":
    "Himachal Pradesh Police Constable recruitment includes physical standards and efficiency tests and a written objective examination. The written test covers general knowledge, Himachal GK, reasoning and numerical ability.",
  "hpbose/hp-tet":
    "The Himachal Pradesh Teacher Eligibility Test (HP TET) is conducted by the HP Board of School Education (HPBOSE), Dharamshala, for categories such as JBT, TGT (Arts, Medical, Non-Medical), Shastri and Language Teacher. Child development and pedagogy is common to all categories, along with subject-specific sections.",
  "hp-revenue/patwari":
    "Patwari posts in Himachal Pradesh are filled through a written objective examination as per the recruitment notification. General knowledge, Himachal GK, reasoning, mathematics and language form the core of the syllabus.",
};

async function main() {
  for (const [bi, body] of catalogue.entries()) {
    const { exams, ...bodyData } = body;
    const b = await db.examBody.upsert({
      where: { slug: body.slug },
      update: { ...bodyData, order: bi },
      create: { ...bodyData, order: bi },
    });

    for (const [ei, exam] of exams.entries()) {
      const { stages = [], ...rest } = exam;
      // Description only on create: after that it's edited in /admin/exams (seedContent fills empty fields).
      const e = await db.exam.upsert({
        where: { bodyId_slug: { bodyId: b.id, slug: exam.slug } },
        update: { ...rest, order: ei },
        create: { ...rest, description: descriptions[`${body.slug}/${exam.slug}`] ?? null, order: ei, bodyId: b.id },
      });

      for (const [si, stage] of stages.entries()) {
        await db.examStage.upsert({
          where: { examId_slug: { examId: e.id, slug: stage.slug } },
          update: { ...stage, order: si },
          create: { ...stage, order: si, examId: e.id },
        });
      }
    }
  }

  for (const [si, subject] of taxonomy.entries()) {
    const { topics, ...subjectData } = subject;
    const s = await db.subject.upsert({
      where: { slug: subject.slug },
      update: { ...subjectData, order: si },
      create: { ...subjectData, order: si },
    });

    for (const [ti, [slug, name]] of topics.entries()) {
      await db.topic.upsert({
        where: { subjectId_slug: { subjectId: s.id, slug } },
        update: { name, order: ti },
        create: { slug, name, order: ti, subjectId: s.id },
      });
    }
  }

  await seedDemoTest(db);
  const patwari = await seedPatwari(db);
  const police = await seedPolice(db);
  const joaIt = await seedJoaIt(db);
  const hpas = await seedHpasFree(db);
  const pyq = [await seedPatwariPyq(db), await seedPoliceStandalonePyq(db), await seedJoaItPyq(db)];
  const content = await seedContent(db);
  console.log(
    `Seeded ${catalogue.length} bodies, ${taxonomy.length} subjects, the demo test "${DEMO_TEST_SLUG}", ` +
      `${patwari.createdTests} new Patwari tests, ${police.createdTests} new Police Constable tests, ` +
      `${joaIt.createdTests} new JOA IT tests, ${hpas.createdTests} new free HPAS tests, ` +
      `${pyq.reduce((n, r) => n + r.created, 0)} new previous-year papers, ` +
      `content for ${content.filled} exams and ${content.created} new draft posts.`,
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
