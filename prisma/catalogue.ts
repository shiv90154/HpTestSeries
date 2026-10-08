// The launch catalogue: recruiting bodies and their exams. Kept apart from seed.ts (which runs on import) so tests can read it.
//
// ⚠ Verify every body/exam/stage against the current official notifications before launch —
// recruiting bodies for some posts have changed (e.g. HPSSC → HPRCA).

export type StageSeed = { slug: string; name: string; nameHi?: string };
export type ExamSeed = { slug: string; name: string; nameHi?: string; stages?: StageSeed[] };
export type BodySeed = { slug: string; name: string; nameHi: string; exams: ExamSeed[] };

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
    ],
  },
  {
    slug: "hp-police",
    name: "Himachal Pradesh Police",
    nameHi: "हिमाचल प्रदेश पुलिस",
    exams: [
      { slug: "constable", name: "Police Constable", nameHi: "पुलिस कांस्टेबल" },
      { slug: "sub-inspector", name: "Sub-Inspector", nameHi: "सब-इंस्पेक्टर" },
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
];
