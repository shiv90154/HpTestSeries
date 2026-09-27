// Seeds the launch catalogue (BLUEPRINT §5) and the shared subject/topic taxonomy.
// Idempotent: safe to re-run. Everything here is editable later from the admin panel.
//
// ⚠ Verify every body/exam/stage against the current official notifications before launch —
// recruiting bodies for some posts have changed (e.g. HPSSC → HPRCA).

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { DEMO_TEST_SLUG, seedDemoTest } from "./seed-demo";

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

type SubjectSeed = { slug: string; name: string; nameHi: string; topics: [slug: string, name: string][] };

const taxonomy: SubjectSeed[] = [
  {
    slug: "hp-gk",
    name: "Himachal GK",
    nameHi: "हिमाचल सामान्य ज्ञान",
    topics: [
      ["history", "History of Himachal"],
      ["geography", "Geography of Himachal"],
      ["rivers-lakes", "Rivers & Lakes"],
      ["districts", "Districts"],
      ["culture-festivals", "Culture, Fairs & Festivals"],
      ["economy", "Economy of Himachal"],
      ["polity-administration", "Polity & Administration"],
      ["personalities", "Famous Personalities"],
    ],
  },
  { slug: "hp-current-affairs", name: "HP Current Affairs", nameHi: "हिमाचल समसामयिकी", topics: [] },
  {
    slug: "general-studies",
    name: "General Studies",
    nameHi: "सामान्य अध्ययन",
    topics: [
      ["indian-history", "Indian History"],
      ["indian-polity", "Indian Polity"],
      ["indian-geography", "Indian Geography"],
      ["indian-economy", "Indian Economy"],
      ["general-science", "General Science"],
    ],
  },
  {
    slug: "reasoning",
    name: "Reasoning",
    nameHi: "तर्कशक्ति",
    topics: [
      ["series", "Series"],
      ["coding-decoding", "Coding-Decoding"],
      ["blood-relations", "Blood Relations"],
      ["syllogism", "Syllogism"],
      ["puzzles", "Puzzles & Seating"],
    ],
  },
  {
    slug: "quant",
    name: "Quantitative Aptitude",
    nameHi: "गणित",
    topics: [
      ["number-system", "Number System"],
      ["percentage", "Percentage"],
      ["ratio-proportion", "Ratio & Proportion"],
      ["profit-loss", "Profit & Loss"],
      ["time-work", "Time & Work"],
      ["interest", "Simple & Compound Interest"],
    ],
  },
  {
    slug: "english",
    name: "English",
    nameHi: "अंग्रेज़ी",
    topics: [
      ["grammar", "Grammar"],
      ["vocabulary", "Vocabulary"],
      ["comprehension", "Comprehension"],
    ],
  },
  {
    slug: "hindi",
    name: "Hindi",
    nameHi: "हिंदी",
    topics: [
      ["vyakaran", "Vyakaran (Grammar)"],
      ["shabdavali", "Shabdavali (Vocabulary)"],
    ],
  },
  {
    slug: "computer",
    name: "Computer",
    nameHi: "कंप्यूटर",
    topics: [
      ["fundamentals", "Computer Fundamentals"],
      ["ms-office", "MS Office"],
      ["internet-networking", "Internet & Networking"],
      ["operating-systems", "Operating Systems"],
      ["dbms", "DBMS"],
      ["programming-basics", "Programming Basics"],
    ],
  },
  {
    slug: "pedagogy",
    name: "Child Development & Pedagogy",
    nameHi: "बाल विकास एवं शिक्षाशास्त्र",
    topics: [
      ["child-development", "Child Development"],
      ["learning-theories", "Learning Theories"],
      ["inclusive-education", "Inclusive Education"],
    ],
  },
];

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
      const examData = { ...rest, description: descriptions[`${body.slug}/${exam.slug}`] ?? null };
      const e = await db.exam.upsert({
        where: { bodyId_slug: { bodyId: b.id, slug: exam.slug } },
        update: { ...examData, order: ei },
        create: { ...examData, order: ei, bodyId: b.id },
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
  console.log(`Seeded ${catalogue.length} bodies, ${taxonomy.length} subjects and the demo test "${DEMO_TEST_SLUG}".`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
