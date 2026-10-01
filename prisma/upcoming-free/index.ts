// One free mock test for each exam that is "launching soon" on the home page (HPAS already has its own in prisma/hpas).
// Adding an exam = adding a file here and a card in src/modules/catalog/upcoming-exams.ts.

import { balanceAnswers, type PatwariQuestion } from "../patwari/types";
import { adoMock1 } from "./ado";
import { asstProfMock1 } from "./asst-prof";
import { clerkMock1 } from "./clerk";
import { nursingMock1 } from "./nursing";
import { subInspectorMock1 } from "./sub-inspector";
import { tetMock1 } from "./tet";
import { assistantEngineerMock1 } from "./assistant-engineer";
import { foodSafetyOfficerMock1 } from "./food-safety-officer";
import { forestGuardMock1 } from "./forest-guard";
import { hpseblAeMock1 } from "./hpsebl-ae";
import { hpseblJeElectricalMock1 } from "./hpsebl-je-electrical";
import { hpscbClerkMock1 } from "./hpscb-clerk";
import { jbtMock1 } from "./jbt";
import { judicialServicesMock1 } from "./judicial-services";
import { juniorEngineerMock1 } from "./junior-engineer";
import { languageTeacherMock1 } from "./language-teacher";
import { linemanMock1 } from "./lineman";
import { medicalOfficerMock1 } from "./medical-officer";
import { pharmacistMock1 } from "./pharmacist";
import { staffNurseMock1 } from "./staff-nurse";
import { tgtMock1 } from "./tgt";
import { veterinaryOfficerMock1 } from "./veterinary-officer";

type Section = { name: string; nameHi: string };

export type UpcomingFreeTest = {
  bodySlug: string;
  examSlug: string;
  slug: string;
  title: string;
  titleHi: string;
  durationSec: number;
  instructions: string;
  sections: Section[];
  questions: PatwariQuestion[];
};

const instructions = (exam: string, sections: string) =>
  `Free ${exam} sample mock: 15 questions, 15 marks, 15 minutes. Each correct answer gives 1 mark and each wrong answer ` +
  `deducts 0.25 marks. Sections: ${sections}. You can switch between Hindi and English at any time. ` +
  "The real exam pattern may differ; always check the official notification.";

const TESTS: UpcomingFreeTest[] = [
  {
    bodySlug: "hprca",
    examSlug: "clerk",
    slug: "hprca-clerk-free-mock-1",
    title: "HPRCA Clerk Free Mock Test 1",
    titleHi: "एचपीआरसीए क्लर्क फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPRCA Clerk", "Himachal GK (4), General Studies (3), Reasoning (3), Maths (2), English (2), Hindi (1)"),
    sections: [
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
      { name: "General Studies", nameHi: "सामान्य अध्ययन" },
      { name: "Reasoning", nameHi: "तर्कशक्ति" },
      { name: "Mathematics", nameHi: "गणित" },
      { name: "English", nameHi: "अंग्रेज़ी" },
      { name: "Hindi", nameHi: "हिंदी" },
    ],
    questions: clerkMock1,
  },
  {
    bodySlug: "hpbose",
    examSlug: "hp-tet",
    slug: "hp-tet-free-mock-1",
    title: "HP TET Free Mock Test 1",
    titleHi: "एचपी टेट फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HP TET", "Child Development & Pedagogy (5), English (3), Hindi (3), Maths (2), General Awareness (2)"),
    sections: [
      { name: "Child Development & Pedagogy", nameHi: "बाल विकास एवं शिक्षाशास्त्र" },
      { name: "English", nameHi: "अंग्रेज़ी" },
      { name: "Hindi", nameHi: "हिंदी" },
      { name: "Mathematics", nameHi: "गणित" },
      { name: "General Awareness", nameHi: "सामान्य जागरूकता" },
    ],
    questions: tetMock1,
  },
  {
    bodySlug: "hppsc",
    examSlug: "assistant-professor",
    slug: "hppsc-assistant-professor-free-mock-1",
    title: "HPPSC Assistant Professor Free Mock Test 1",
    titleHi: "एचपीपीएससी असिस्टेंट प्रोफेसर फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPPSC Assistant Professor", "Teaching Aptitude (5), Research Aptitude (4), Himachal GK (3), General Studies (3)"),
    sections: [
      { name: "Teaching Aptitude", nameHi: "शिक्षण अभिक्षमता" },
      { name: "Research Aptitude", nameHi: "शोध अभिक्षमता" },
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
      { name: "General Studies", nameHi: "सामान्य अध्ययन" },
    ],
    questions: asstProfMock1,
  },
  {
    bodySlug: "hppsc",
    examSlug: "ado",
    slug: "hppsc-ado-free-mock-1",
    title: "HPPSC ADO Free Mock Test 1",
    titleHi: "एचपीपीएससी एडीओ फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPPSC Agriculture Development Officer", "Agronomy & Soil Science (6), Horticulture & Plant Protection (5), Extension & Economics (4)"),
    sections: [
      { name: "Agronomy & Soil Science", nameHi: "शस्य विज्ञान एवं मृदा विज्ञान" },
      { name: "Horticulture & Plant Protection", nameHi: "उद्यान विज्ञान एवं पादप सुरक्षा" },
      { name: "Extension & Agricultural Economics", nameHi: "कृषि प्रसार एवं अर्थशास्त्र" },
    ],
    questions: adoMock1,
  },
  {
    bodySlug: "pgimer",
    examSlug: "nursing-officer",
    slug: "pgimer-nursing-officer-free-mock-1",
    title: "PGIMER Nursing Officer Free Mock Test 1",
    titleHi: "पीजीआईएमईआर नर्सिंग ऑफिसर फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("PGIMER Nursing Officer", "Fundamentals & Anatomy (5), Medical-Surgical (4), Community, Child Health & Midwifery (4), General Awareness (2)"),
    sections: [
      { name: "Fundamentals & Anatomy", nameHi: "नर्सिंग के मूल सिद्धांत एवं शरीर रचना" },
      { name: "Medical-Surgical Nursing", nameHi: "मेडिकल-सर्जिकल नर्सिंग" },
      { name: "Community, Child Health & Midwifery", nameHi: "सामुदायिक, बाल स्वास्थ्य एवं प्रसूति" },
      { name: "General Awareness", nameHi: "सामान्य जागरूकता" },
    ],
    questions: nursingMock1,
  },
  {
    bodySlug: "hp-police",
    examSlug: "sub-inspector",
    slug: "hp-police-sub-inspector-free-mock-1",
    title: "HP Police Sub-Inspector Free Mock Test 1",
    titleHi: "एचपी पुलिस सब-इंस्पेक्टर फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HP Police Sub-Inspector", "Himachal GK (3), General Studies (3), Reasoning (3), Maths (2), English (2), Hindi (2)"),
    sections: [
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
      { name: "General Studies", nameHi: "सामान्य अध्ययन" },
      { name: "Reasoning", nameHi: "तर्कशक्ति" },
      { name: "Mathematics", nameHi: "गणित" },
      { name: "English", nameHi: "अंग्रेज़ी" },
      { name: "Hindi", nameHi: "हिंदी" },
    ],
    questions: subInspectorMock1,
  },
  {
    bodySlug: "hprca",
    examSlug: "forest-guard",
    slug: "hprca-forest-guard-free-mock-1",
    title: "HPRCA Forest Guard Free Mock Test 1",
    titleHi: "एचपीआरसीए फॉरेस्ट गार्ड फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPRCA Forest Guard", "Himachal GK (4), General Studies & Environment (4), Reasoning (3), Maths (2), English (1), Hindi (1)"),
    sections: [
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
      { name: "General Studies & Environment", nameHi: "सामान्य अध्ययन एवं पर्यावरण" },
      { name: "Reasoning", nameHi: "तर्कशक्ति" },
      { name: "Mathematics", nameHi: "गणित" },
      { name: "English", nameHi: "अंग्रेज़ी" },
      { name: "Hindi", nameHi: "हिंदी" },
    ],
    questions: forestGuardMock1,
  },
  {
    bodySlug: "hprca",
    examSlug: "jbt",
    slug: "hprca-jbt-free-mock-1",
    title: "HPRCA JBT Teacher Free Mock Test 1",
    titleHi: "एचपीआरसीए जेबीटी शिक्षक फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPRCA JBT Teacher", "Child Development & Pedagogy (5), Hindi (3), English (3), Maths (2), Himachal GK (2)"),
    sections: [
      { name: "Child Development & Pedagogy", nameHi: "बाल विकास एवं शिक्षाशास्त्र" },
      { name: "Hindi", nameHi: "हिंदी" },
      { name: "English", nameHi: "अंग्रेज़ी" },
      { name: "Mathematics", nameHi: "गणित" },
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
    ],
    questions: jbtMock1,
  },
  {
    bodySlug: "hprca",
    examSlug: "tgt",
    slug: "hprca-tgt-free-mock-1",
    title: "HPRCA TGT Teacher Free Mock Test 1",
    titleHi: "एचपीआरसीए टीजीटी शिक्षक फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPRCA TGT Teacher", "Pedagogy (5), Himachal GK (3), English (3), Hindi (2), Reasoning (2). The subject paper differs by discipline"),
    sections: [
      { name: "Pedagogy", nameHi: "शिक्षाशास्त्र" },
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
      { name: "English", nameHi: "अंग्रेज़ी" },
      { name: "Hindi", nameHi: "हिंदी" },
      { name: "Reasoning", nameHi: "तर्कशक्ति" },
    ],
    questions: tgtMock1,
  },
  {
    bodySlug: "hprca",
    examSlug: "language-teacher",
    slug: "hprca-language-teacher-free-mock-1",
    title: "HPRCA Language Teacher Free Mock Test 1",
    titleHi: "एचपीआरसीए भाषा अध्यापक फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPRCA Language Teacher", "Hindi (5), English (3), Pedagogy (4), Himachal GK (3)"),
    sections: [
      { name: "Hindi", nameHi: "हिंदी" },
      { name: "English", nameHi: "अंग्रेज़ी" },
      { name: "Pedagogy", nameHi: "शिक्षाशास्त्र" },
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
    ],
    questions: languageTeacherMock1,
  },
  {
    bodySlug: "hprca",
    examSlug: "junior-engineer",
    slug: "hprca-junior-engineer-free-mock-1",
    title: "HPRCA Junior Engineer (Civil) Free Mock Test 1",
    titleHi: "एचपीआरसीए कनिष्ठ अभियंता (सिविल) फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPRCA Junior Engineer (Civil)", "Building Materials & Construction (4), Structures (4), Soil, Fluids & Hydrology (3), Surveying & Estimation (2), Himachal GK (2). Real papers are discipline-specific"),
    sections: [
      { name: "Building Materials & Construction", nameHi: "निर्माण सामग्री एवं निर्माण कार्य" },
      { name: "Strength of Materials & Structures", nameHi: "पदार्थ सामर्थ्य एवं संरचनाएँ" },
      { name: "Soil, Fluids & Hydrology", nameHi: "मृदा, तरल एवं जल विज्ञान" },
      { name: "Surveying & Estimation", nameHi: "सर्वेक्षण एवं प्राक्कलन" },
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
    ],
    questions: juniorEngineerMock1,
  },
  {
    bodySlug: "hprca",
    examSlug: "staff-nurse",
    slug: "hprca-staff-nurse-free-mock-1",
    title: "HPRCA Staff Nurse Free Mock Test 1",
    titleHi: "एचपीआरसीए स्टाफ नर्स फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPRCA Staff Nurse", "Fundamentals & Anatomy (4), Medical-Surgical (4), Community, Child Health & Midwifery (4), General Awareness & Himachal GK (3)"),
    sections: [
      { name: "Fundamentals & Anatomy", nameHi: "नर्सिंग के मूल सिद्धांत एवं शरीर रचना" },
      { name: "Medical-Surgical Nursing", nameHi: "मेडिकल-सर्जिकल नर्सिंग" },
      { name: "Community, Child Health & Midwifery", nameHi: "सामुदायिक, बाल स्वास्थ्य एवं प्रसूति" },
      { name: "General Awareness & Himachal GK", nameHi: "सामान्य जागरूकता एवं हिमाचल GK" },
    ],
    questions: staffNurseMock1,
  },
  {
    bodySlug: "hprca",
    examSlug: "pharmacist",
    slug: "hprca-pharmacist-free-mock-1",
    title: "HPRCA Pharmacist Free Mock Test 1",
    titleHi: "एचपीआरसीए फार्मासिस्ट फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPRCA Pharmacist", "Pharmaceutics (4), Pharmacology (4), Pharmaceutical Chemistry & Pharmacognosy (3), Pharmacy Practice & Law (2), General Awareness (2)"),
    sections: [
      { name: "Pharmaceutics", nameHi: "फार्मास्यूटिक्स" },
      { name: "Pharmacology", nameHi: "फार्माकोलॉजी" },
      { name: "Pharmaceutical Chemistry & Pharmacognosy", nameHi: "फार्मास्युटिकल रसायन एवं भेषजगुण विज्ञान" },
      { name: "Pharmacy Practice & Law", nameHi: "फार्मेसी प्रैक्टिस एवं विधि" },
      { name: "General Awareness", nameHi: "सामान्य जागरूकता" },
    ],
    questions: pharmacistMock1,
  },
  {
    bodySlug: "hpscb",
    examSlug: "clerk",
    slug: "hpscb-clerk-free-mock-1",
    title: "HPSCB Clerk Free Mock Test 1",
    titleHi: "एचपीएससीबी क्लर्क फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPSCB Clerk", "Himachal GK (3), General Studies & Banking Awareness (3), Reasoning (3), Maths (3), English (2), Computer (1)"),
    sections: [
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
      { name: "General Studies & Banking Awareness", nameHi: "सामान्य अध्ययन एवं बैंकिंग जागरूकता" },
      { name: "Reasoning", nameHi: "तर्कशक्ति" },
      { name: "Mathematics", nameHi: "गणित" },
      { name: "English", nameHi: "अंग्रेज़ी" },
      { name: "Computer", nameHi: "कंप्यूटर" },
    ],
    questions: hpscbClerkMock1,
  },
  {
    bodySlug: "hppsc",
    examSlug: "assistant-engineer",
    slug: "hppsc-assistant-engineer-free-mock-1",
    title: "HPPSC Assistant Engineer (Civil) Free Mock Test 1",
    titleHi: "एचपीपीएससी सहायक अभियंता (सिविल) फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPPSC Assistant Engineer (Civil)", "Structures & Design (5), Soil, Water & Environment (4), Transportation & Estimation (3), Himachal GK (3). Real papers are discipline-specific"),
    sections: [
      { name: "Structures & Design", nameHi: "संरचनाएँ एवं डिज़ाइन" },
      { name: "Soil, Water & Environment", nameHi: "मृदा, जल एवं पर्यावरण" },
      { name: "Transportation & Estimation", nameHi: "परिवहन एवं प्राक्कलन" },
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
    ],
    questions: assistantEngineerMock1,
  },
  {
    bodySlug: "hppsc",
    examSlug: "medical-officer",
    slug: "hppsc-medical-officer-free-mock-1",
    title: "HPPSC Medical Officer Free Mock Test 1",
    titleHi: "एचपीपीएससी चिकित्सा अधिकारी फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPPSC Medical Officer", "General Medicine (4), Surgery (3), Community Medicine (3), Anatomy, Physiology & Pharmacology (3), Himachal GK (2)"),
    sections: [
      { name: "General Medicine", nameHi: "सामान्य चिकित्सा" },
      { name: "Surgery", nameHi: "शल्य चिकित्सा" },
      { name: "Community Medicine", nameHi: "सामुदायिक चिकित्सा" },
      { name: "Anatomy, Physiology & Pharmacology", nameHi: "शरीर रचना, शरीर क्रिया एवं औषध विज्ञान" },
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
    ],
    questions: medicalOfficerMock1,
  },
  {
    bodySlug: "hppsc",
    examSlug: "veterinary-officer",
    slug: "hppsc-veterinary-officer-free-mock-1",
    title: "HPPSC Veterinary Officer Free Mock Test 1",
    titleHi: "एचपीपीएससी पशु चिकित्सा अधिकारी फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPPSC Veterinary Officer", "Animal Husbandry & Nutrition (5), Veterinary Medicine & Pathology (4), Anatomy & Physiology (3), Himachal GK (3)"),
    sections: [
      { name: "Animal Husbandry & Nutrition", nameHi: "पशुपालन एवं पोषण" },
      { name: "Veterinary Medicine & Pathology", nameHi: "पशु चिकित्सा एवं रोग विज्ञान" },
      { name: "Anatomy & Physiology", nameHi: "शरीर रचना एवं शरीर क्रिया" },
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
    ],
    questions: veterinaryOfficerMock1,
  },
  {
    bodySlug: "hppsc",
    examSlug: "food-safety-officer",
    slug: "hppsc-food-safety-officer-free-mock-1",
    title: "HPPSC Food Safety Officer Free Mock Test 1",
    titleHi: "एचपीपीएससी खाद्य सुरक्षा अधिकारी फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPPSC Food Safety Officer", "Food Safety Law & Standards (5), Food Science & Chemistry (5), Food Microbiology & Nutrition (3), General Awareness (2)"),
    sections: [
      { name: "Food Safety Law & Standards", nameHi: "खाद्य सुरक्षा विधि एवं मानक" },
      { name: "Food Science & Chemistry", nameHi: "खाद्य विज्ञान एवं रसायन" },
      { name: "Food Microbiology & Nutrition", nameHi: "खाद्य सूक्ष्मजीव विज्ञान एवं पोषण" },
      { name: "General Awareness", nameHi: "सामान्य जागरूकता" },
    ],
    questions: foodSafetyOfficerMock1,
  },
  {
    bodySlug: "hppsc",
    examSlug: "judicial-services",
    slug: "hppsc-judicial-services-free-mock-1",
    title: "HP Judicial Services Free Mock Test 1",
    titleHi: "एचपी न्यायिक सेवा फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HP Judicial Services", "Constitution (4), Criminal Law (4), Civil Law, Contract & Evidence (4), General Knowledge & English (3)"),
    sections: [
      { name: "Constitutional Law", nameHi: "संवैधानिक विधि" },
      { name: "Criminal Law", nameHi: "आपराधिक विधि" },
      { name: "Civil Law, Contract & Evidence", nameHi: "सिविल विधि, संविदा एवं साक्ष्य" },
      { name: "General Knowledge & English", nameHi: "सामान्य ज्ञान एवं अंग्रेज़ी" },
    ],
    questions: judicialServicesMock1,
  },
  {
    bodySlug: "hpsebl",
    examSlug: "assistant-engineer",
    slug: "hpsebl-assistant-engineer-free-mock-1",
    title: "HPSEBL Assistant Engineer (Electrical) Free Mock Test 1",
    titleHi: "एचपीएसईबीएल सहायक अभियंता (विद्युत) फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPSEBL Assistant Engineer (Electrical)", "Power Systems (4), Electrical Machines (3), Control & Electronics (3), Circuits & Measurements (3), Himachal GK (2)"),
    sections: [
      { name: "Power Systems", nameHi: "विद्युत शक्ति प्रणाली" },
      { name: "Electrical Machines", nameHi: "विद्युत मशीनें" },
      { name: "Control & Electronics", nameHi: "नियंत्रण एवं इलेक्ट्रॉनिक्स" },
      { name: "Circuits & Measurements", nameHi: "परिपथ एवं मापन" },
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
    ],
    questions: hpseblAeMock1,
  },
  {
    bodySlug: "hpsebl",
    examSlug: "junior-engineer-electrical",
    slug: "hpsebl-junior-engineer-electrical-free-mock-1",
    title: "HPSEBL Junior Engineer (Electrical) Free Mock Test 1",
    titleHi: "एचपीएसईबीएल कनिष्ठ अभियंता (विद्युत) फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPSEBL Junior Engineer (Electrical)", "Circuit Theory (4), Electrical Machines (4), Power Systems (3), Measurements & Safety (2), Himachal GK (2)"),
    sections: [
      { name: "Circuit Theory", nameHi: "परिपथ सिद्धांत" },
      { name: "Electrical Machines", nameHi: "विद्युत मशीनें" },
      { name: "Power Systems", nameHi: "विद्युत शक्ति प्रणाली" },
      { name: "Measurements & Safety", nameHi: "मापन एवं सुरक्षा" },
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
    ],
    questions: hpseblJeElectricalMock1,
  },
  {
    bodySlug: "hpsebl",
    examSlug: "lineman",
    slug: "hpsebl-lineman-free-mock-1",
    title: "HPSEBL Lineman Free Mock Test 1",
    titleHi: "एचपीएसईबीएल लाइनमैन फ्री मॉक टेस्ट 1",
    durationSec: 15 * 60,
    instructions: instructions("HPSEBL Lineman", "Electrical Basics (5), Safety & Wiring (4), Equipment & Tools (2), Maths (2), Himachal GK (2)"),
    sections: [
      { name: "Electrical Basics", nameHi: "विद्युत की मूल बातें" },
      { name: "Safety & Wiring", nameHi: "सुरक्षा एवं वायरिंग" },
      { name: "Equipment & Tools", nameHi: "उपकरण एवं औज़ार" },
      { name: "Mathematics", nameHi: "गणित" },
      { name: "Himachal GK", nameHi: "हिमाचल सामान्य ज्ञान" },
    ],
    questions: linemanMock1,
  },
];

export const UPCOMING_FREE_TESTS: UpcomingFreeTest[] = TESTS.map((t) => ({ ...t, questions: balanceAnswers(t.questions) }));
