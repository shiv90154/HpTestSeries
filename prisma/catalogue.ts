// The launch catalogue: recruiting bodies and their exams. Kept apart from seed.ts (which runs on import) so tests can read it.
//
// ⚠ Verify every body/exam/stage against the current official notifications before launch —
// recruiting bodies for some posts have changed (e.g. HPSSC → HPRCA).

export type StageSeed = { slug: string; name: string; nameHi?: string };
/** `isActive: false` seeds the exam hidden on every site until its pattern and first mocks exist (publish it in /admin/exams). */
export type ExamSeed = { slug: string; name: string; nameHi?: string; isActive?: boolean; stages?: StageSeed[] };
/** `sites`: site codes that show the body (src/sites); "*" = national, every site. Default ["hp"]. `passExcluded`: state Passes don't open its tests. */
export type BodySeed = { slug: string; name: string; nameHi: string; sites?: string[]; passExcluded?: boolean; exams: ExamSeed[] };

export const catalogue: BodySeed[] = [
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
      { slug: "assistant-professor", name: "Assistant Professor", nameHi: "असिस्टेंट प्रोफेसर" },
      { slug: "ado", name: "Agriculture Development Officer", nameHi: "कृषि विकास अधिकारी" },
      { slug: "assistant-engineer", name: "Assistant Engineer", nameHi: "सहायक अभियंता" },
      { slug: "medical-officer", name: "Medical Officer", nameHi: "चिकित्सा अधिकारी" },
      { slug: "veterinary-officer", name: "Veterinary Officer", nameHi: "पशु चिकित्सा अधिकारी" },
      { slug: "food-safety-officer", name: "Food Safety Officer", nameHi: "खाद्य सुरक्षा अधिकारी" },
      { slug: "judicial-services", name: "HP Judicial Services", nameHi: "हिमाचल प्रदेश न्यायिक सेवा" },
      { slug: "naib-tehsildar", name: "Naib Tehsildar", nameHi: "नायब तहसीलदार" },
    ],
  },
  {
    slug: "hprca",
    name: "Himachal Pradesh Rajya Chayan Aayog",
    nameHi: "हिमाचल प्रदेश राज्य चयन आयोग",
    exams: [
      { slug: "joa-it", name: "JOA IT", nameHi: "जेओए आईटी" },
      { slug: "clerk", name: "Clerk", nameHi: "क्लर्क" },
      { slug: "jbt", name: "JBT Teacher", nameHi: "जेबीटी शिक्षक" },
      { slug: "tgt", name: "TGT Teacher", nameHi: "टीजीटी शिक्षक" },
      {
        slug: "pgt-lecturer",
        name: "PGT / Lecturer (School New)",
        nameHi: "पीजीटी / प्रवक्ता (स्कूल न्यू)",
        stages: [
          { slug: "english", name: "PGT English", nameHi: "पीजीटी अंग्रेज़ी" },
          { slug: "mathematics", name: "PGT Mathematics", nameHi: "पीजीटी गणित" },
          { slug: "physics", name: "PGT Physics", nameHi: "पीजीटी भौतिक विज्ञान" },
          { slug: "chemistry", name: "PGT Chemistry", nameHi: "पीजीटी रसायन विज्ञान" },
          { slug: "biology", name: "PGT Biology", nameHi: "पीजीटी जीव विज्ञान" },
          { slug: "hindi", name: "PGT Hindi", nameHi: "पीजीटी हिंदी" },
          { slug: "history", name: "PGT History", nameHi: "पीजीटी इतिहास" },
          { slug: "political-science", name: "PGT Political Science", nameHi: "पीजीटी राजनीति विज्ञान" },
          { slug: "economics", name: "PGT Economics", nameHi: "पीजीटी अर्थशास्त्र" },
          { slug: "commerce", name: "PGT Commerce", nameHi: "पीजीटी वाणिज्य" },
        ],
      },
      { slug: "language-teacher", name: "Language Teacher", nameHi: "भाषा अध्यापक" },
      { slug: "junior-engineer", name: "Junior Engineer", nameHi: "कनिष्ठ अभियंता" },
      { slug: "staff-nurse", name: "Staff Nurse", nameHi: "स्टाफ नर्स" },
      { slug: "pharmacist", name: "Pharmacist", nameHi: "फार्मासिस्ट" },
      { slug: "forest-guard", name: "Forest Guard", nameHi: "वन रक्षक" },
      { slug: "joa-library", name: "JOA Library", nameHi: "जेओए लाइब्रेरी" },
      { slug: "steno-typist", name: "Steno Typist", nameHi: "स्टेनो टाइपिस्ट" },
      { slug: "special-educator", name: "Special Educator", nameHi: "विशेष शिक्षक" },
      { slug: "radiographer", name: "Radiographer", nameHi: "रेडियोग्राफर" },
      { slug: "panchayat-secretary", name: "Panchayat Secretary", nameHi: "पंचायत सचिव" },
      { slug: "lab-assistant", name: "Lab Assistant", nameHi: "लैब असिस्टेंट" },
    ],
  },
  {
    slug: "hp-police",
    name: "Himachal Pradesh Police",
    nameHi: "हिमाचल प्रदेश पुलिस",
    exams: [
      { slug: "constable", name: "Police Constable", nameHi: "पुलिस कांस्टेबल" },
      { slug: "sub-inspector", name: "Sub-Inspector", nameHi: "सब-इंस्पेक्टर" },
      { slug: "head-constable", name: "Head Constable", nameHi: "हेड कांस्टेबल" },
      { slug: "driver-constable", name: "Driver Constable", nameHi: "ड्राइवर कांस्टेबल" },
    ],
  },
  {
    slug: "hp-high-court",
    name: "High Court of Himachal Pradesh",
    nameHi: "हिमाचल प्रदेश उच्च न्यायालय",
    exams: [
      { slug: "clerk", name: "High Court Clerk", nameHi: "हाई कोर्ट क्लर्क" },
      { slug: "stenographer", name: "High Court Stenographer", nameHi: "हाई कोर्ट आशुलिपिक" },
      { slug: "process-server", name: "High Court Process Server", nameHi: "हाई कोर्ट प्रोसेस सर्वर" },
    ],
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
          { slug: "tgt-sanskrit", name: "TGT Sanskrit TET" },
          { slug: "language-teacher", name: "Language Teacher TET" },
          { slug: "special-educator", name: "Special Educator TET" },
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
  {
    slug: "pgimer",
    name: "Postgraduate Institute of Medical Education and Research",
    nameHi: "स्नातकोत्तर चिकित्सा शिक्षा एवं अनुसंधान संस्थान",
    sites: ["hp", "pb"],
    exams: [{ slug: "nursing-officer", name: "Nursing Officer", nameHi: "नर्सिंग ऑफिसर" }],
  },
  {
    slug: "hpsebl",
    name: "Himachal Pradesh State Electricity Board Limited",
    nameHi: "हिमाचल प्रदेश राज्य विद्युत बोर्ड लिमिटेड",
    exams: [
      { slug: "junior-engineer-electrical", name: "Junior Engineer (Electrical)", nameHi: "कनिष्ठ अभियंता (विद्युत)" },
      { slug: "assistant-engineer", name: "Assistant Engineer", nameHi: "सहायक अभियंता" },
      { slug: "lineman", name: "Lineman", nameHi: "लाइनमैन" },
    ],
  },
  {
    slug: "hpscb",
    name: "Himachal Pradesh State Cooperative Bank",
    nameHi: "हिमाचल प्रदेश राज्य सहकारी बैंक",
    exams: [{ slug: "clerk", name: "Clerk", nameHi: "क्लर्क" }],
  },
  {
    slug: "hpu",
    name: "Himachal Pradesh University",
    nameHi: "हिमाचल प्रदेश विश्वविद्यालय",
    exams: [{ slug: "hp-set", name: "HP SET", nameHi: "एचपी सेट" }],
  },
  {
    slug: "hp-wcd",
    name: "HP Women and Child Development Department",
    nameHi: "महिला एवं बाल विकास विभाग, हिमाचल प्रदेश",
    exams: [{ slug: "anganwadi-supervisor", name: "Anganwadi Supervisor", nameHi: "आंगनवाड़ी पर्यवेक्षक" }],
  },
  {
    slug: "kccb-jccb",
    name: "Kangra Central Co-operative Bank and Jogindra Central Co-operative Bank",
    nameHi: "कांगड़ा केंद्रीय सहकारी बैंक एवं जोगिंद्रा केंद्रीय सहकारी बैंक",
    exams: [{ slug: "clerk", name: "KCCB / JCCB Clerk", nameHi: "केसीसीबी / जेसीसीबी क्लर्क" }],
  },
  {
    slug: "hp-gk-ca",
    name: "Himachal GK and Current Affairs",
    nameHi: "हिमाचल सामान्य ज्ञान एवं समसामयिकी",
    exams: [{ slug: "current-affairs", name: "HP Current Affairs", nameHi: "हिमाचल समसामयिकी" }],
  },
  // Punjab (pbtestseries.in only). Exam names carry the body so they stay unique in the /tests filter.
  {
    slug: "psssb",
    name: "Subordinate Services Selection Board, Punjab",
    nameHi: "अधीनस्थ सेवा चयन बोर्ड, पंजाब",
    sites: ["pb"],
    exams: [
      { slug: "clerk", name: "PSSSB Clerk", nameHi: "पीएसएसएसबी क्लर्क" },
      { slug: "group-d", name: "PSSSB Group D", nameHi: "पीएसएसएसबी ग्रुप डी" },
      { slug: "junior-engineer", name: "PSSSB Junior Engineer", nameHi: "पीएसएसएसबी जूनियर इंजीनियर" },
      { slug: "patwari", name: "PSSSB Patwari", nameHi: "पीएसएसएसबी पटवारी" },
    ],
  },
  {
    slug: "punjab-police",
    name: "Punjab Police",
    nameHi: "पंजाब पुलिस",
    sites: ["pb"],
    exams: [{ slug: "constable", name: "Constable", nameHi: "कांस्टेबल" }],
  },
  {
    slug: "ppsc",
    name: "Punjab Public Service Commission",
    nameHi: "पंजाब लोक सेवा आयोग",
    sites: ["pb"],
    exams: [
      {
        slug: "pcs",
        name: "PCS Combined Competitive Exam",
        nameHi: "पीसीएस संयुक्त प्रतियोगी परीक्षा",
        stages: [
          { slug: "prelims", name: "Prelims", nameHi: "प्रारंभिक" },
          { slug: "mains", name: "Mains", nameHi: "मुख्य" },
        ],
      },
    ],
  },
  {
    // District court staff are hired by the Society for Centralized Recruitment of Staff in Subordinate Courts (sssc.gov.in)
    // under the Punjab and Haryana High Court.
    slug: "punjab-courts",
    name: "District Courts of Punjab (SSSC)",
    nameHi: "पंजाब ज़िला न्यायालय (SSSC)",
    sites: ["pb"],
    exams: [{ slug: "clerk", name: "Punjab District Court Clerk", nameHi: "पंजाब ज़िला न्यायालय क्लर्क" }],
  },
  // Haryana (hrtestseries.in only). Exam names carry the body so they stay unique in the /tests filter.
  {
    slug: "hssc",
    name: "Haryana Staff Selection Commission",
    nameHi: "हरियाणा कर्मचारी चयन आयोग",
    sites: ["hr"],
    exams: [{ slug: "cet-group-c", name: "HSSC CET Group C", nameHi: "एचएसएससी सीईटी ग्रुप सी" }],
  },
  // Rajasthan (rjtestseries.in only). Exam names carry the body so they stay unique in the /tests filter.
  {
    slug: "rssb",
    name: "Rajasthan Staff Selection Board",
    nameHi: "राजस्थान कर्मचारी चयन बोर्ड",
    sites: ["rj"],
    exams: [
      { slug: "cet-senior-secondary", name: "Rajasthan CET (12th Level)", nameHi: "राजस्थान सीईटी (12वीं स्तर)" },
      { slug: "cet-graduation", name: "Rajasthan CET (Graduation Level)", nameHi: "राजस्थान सीईटी (स्नातक स्तर)" },
      { slug: "teaching-associate", name: "RSSB Teaching Associate", nameHi: "आरएसएसबी टीचिंग एसोसिएट" },
    ],
  },
  {
    slug: "rpsc",
    name: "Rajasthan Public Service Commission",
    nameHi: "राजस्थान लोक सेवा आयोग",
    sites: ["rj"],
    exams: [
      {
        slug: "ras",
        name: "RAS/RTS Combined Competitive Exam",
        nameHi: "आरएएस/आरटीएस संयुक्त प्रतियोगी परीक्षा",
        stages: [
          { slug: "prelims", name: "Prelims", nameHi: "प्रारंभिक" },
          { slug: "mains", name: "Mains", nameHi: "मुख्य" },
        ],
      },
    ],
  },
  // National defence entries that many Himachal aspirants sit; not Himachal recruitments.
  {
    slug: "upsc",
    name: "Union Public Service Commission",
    nameHi: "संघ लोक सेवा आयोग",
    sites: ["*"],
    exams: [
      { slug: "nda", name: "NDA & NA", nameHi: "एनडीए एवं एनए" },
      { slug: "cds", name: "CDS", nameHi: "सीडीएस" },
    ],
  },
  {
    slug: "iaf",
    name: "Indian Air Force",
    nameHi: "भारतीय वायु सेना",
    sites: ["*"],
    exams: [{ slug: "afcat", name: "AFCAT", nameHi: "एफ़कैट" }],
  },
  // IIT JAM is the national M.Sc. entrance; one exam per test paper, shown on every site like UPSC and SSC.
  {
    slug: "iit-jam",
    name: "IIT JAM (Joint Admission Test for M.Sc.)",
    nameHi: "आईआईटी जैम (एम.एससी. संयुक्त प्रवेश परीक्षा)",
    sites: ["*"],
    passExcluded: true,
    exams: [
      { slug: "physics", name: "Physics (PH)", nameHi: "भौतिकी (PH)" },
      { slug: "chemistry", name: "Chemistry (CY)", nameHi: "रसायन विज्ञान (CY)" },
      { slug: "mathematics", name: "Mathematics (MA)", nameHi: "गणित (MA)" },
      { slug: "mathematical-statistics", name: "Mathematical Statistics (MS)", nameHi: "गणितीय सांख्यिकी (MS)" },
      { slug: "biotechnology", name: "Biotechnology (BT)", nameHi: "जैव प्रौद्योगिकी (BT)" },
      { slug: "biological-sciences", name: "Biological Sciences (BL)", nameHi: "जीव विज्ञान (BL)" },
      { slug: "geology", name: "Geology (GG)", nameHi: "भूविज्ञान (GG)" },
    ],
  },
  // Delhi Police recruits through the Staff Selection Commission; the written test is a computer-based test.
  {
    slug: "delhi-police",
    name: "Delhi Police",
    nameHi: "दिल्ली पुलिस",
    sites: ["*"],
    exams: [{ slug: "constable", name: "Constable (Executive)", nameHi: "कांस्टेबल (एग्ज़ीक्यूटिव)" }],
  },
  // SSC is national like UPSC (docs/SSC-TEST-SERIES-PLAN.md): every site shows it, the canonical is on hp, and state Passes
  // don't cover it (it has its own SSC Pass). Every exam is seeded hidden and published in its phase.
  {
    slug: "ssc",
    name: "Staff Selection Commission (SSC)",
    nameHi: "कर्मचारी चयन आयोग (SSC)",
    sites: ["*"],
    passExcluded: true,
    exams: [
      { slug: "gd-constable", name: "GD Constable", nameHi: "जीडी कांस्टेबल", isActive: false },
      { slug: "chsl", name: "CHSL (10+2)", nameHi: "सीएचएसएल" },
      { slug: "cpo", name: "CPO (SI in Delhi Police & CAPF)", nameHi: "सीपीओ (दिल्ली पुलिस एवं CAPF में SI)", isActive: false },
      { slug: "cgl", name: "CGL", nameHi: "सीजीएल", isActive: false },
      { slug: "mts", name: "MTS & Havaldar", nameHi: "एमटीएस एवं हवलदार", isActive: false },
      { slug: "selection-post", name: "Selection Post", nameHi: "सिलेक्शन पोस्ट", isActive: false },
      { slug: "stenographer", name: "Stenographer Grade C & D", nameHi: "स्टेनोग्राफर ग्रेड C एवं D", isActive: false },
      { slug: "je", name: "Junior Engineer (Civil, Electrical, Mechanical)", nameHi: "जूनियर इंजीनियर", isActive: false },
    ],
  },
];
