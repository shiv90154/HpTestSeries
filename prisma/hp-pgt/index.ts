// HP PGT (Lecturer School New): subject-wise mocks written fresh (100 questions, 100 marks, 120 minutes, 0.25 negative
// marking; the official pattern is not published, so the section split is ours). Every subject has the same first two
// sections (pedagogy, Himachal GK & general studies) and two subject sections. Question `s` is the index into the
// subject's sections. Each subject becomes one series in prisma/exam-series/index.ts: mocks 1–2 go through the
// sections, mocks 3+ are extra mocks. A subject's `slug` is its exam stage (prisma/catalogue.ts) and series slug stem.

import type { PatwariQuestion } from "../patwari/types";
import { pgtEnglishMock1 } from "./english-mock1";
import { pgtEnglishMock2 } from "./english-mock2";
import { pgtMathsMock1 } from "./maths-mock1";
import { pgtMathsMock2 } from "./maths-mock2";
import { pgtPhysicsMock1 } from "./physics-mock1";
import { pgtPhysicsMock2 } from "./physics-mock2";
import { pgtChemistryMock1 } from "./chemistry-mock1";
import { pgtChemistryMock2 } from "./chemistry-mock2";
import { pgtBiologyMock1 } from "./biology-mock1";
import { pgtBiologyMock2 } from "./biology-mock2";
import { pgtHindiMock1 } from "./hindi-mock1";
import { pgtHindiMock2 } from "./hindi-mock2";
import { pgtHistoryMock1 } from "./history-mock1";
import { pgtHistoryMock2 } from "./history-mock2";
import { pgtPolSciMock1 } from "./polsci-mock1";
import { pgtPolSciMock2 } from "./polsci-mock2";
import { pgtEconomicsMock1 } from "./economics-mock1";
import { pgtEconomicsMock2 } from "./economics-mock2";
import { pgtCommerceMock1 } from "./commerce-mock1";
import { pgtCommerceMock2 } from "./commerce-mock2";

type Sec = { name: string; nameHi: string };

export type PgtSubject = {
  slug: string;
  name: string;
  nameHi: string;
  /** What the two subject sections cover, for the series description. */
  covers: string;
  sections: Sec[];
  mocks: PatwariQuestion[][];
};

const COMMON: Sec[] = [
  { name: "Pedagogy & Teaching Aptitude", nameHi: "शिक्षाशास्त्र एवं शिक्षण अभिक्षमता" },
  { name: "Himachal GK & General Studies", nameHi: "हिमाचल सामान्य ज्ञान एवं सामान्य अध्ययन" },
];

const subject = (slug: string, name: string, nameHi: string, covers: string, a: Sec, b: Sec, mocks: PatwariQuestion[][]): PgtSubject => ({
  slug,
  name,
  nameHi,
  covers,
  sections: [...COMMON, a, b],
  mocks,
});

export const PGT_SUBJECTS: PgtSubject[] = [
  subject(
    "english", "English", "अंग्रेज़ी", "English language and teaching, and English literature",
    { name: "English Language & Teaching", nameHi: "अंग्रेज़ी भाषा एवं शिक्षण" },
    { name: "English Literature", nameHi: "अंग्रेज़ी साहित्य" },
    [pgtEnglishMock1, pgtEnglishMock2],
  ),
  subject(
    "mathematics", "Mathematics", "गणित", "algebra and real analysis, and calculus, geometry and statistics",
    { name: "Algebra & Real Analysis", nameHi: "बीजगणित एवं वास्तविक विश्लेषण" },
    { name: "Calculus, Geometry & Statistics", nameHi: "कलन, ज्यामिति एवं सांख्यिकी" },
    [pgtMathsMock1, pgtMathsMock2],
  ),
  subject(
    "physics", "Physics", "भौतिक विज्ञान", "mechanics, thermal physics and waves, and electromagnetism, optics and modern physics",
    { name: "Mechanics, Thermal Physics & Waves", nameHi: "यांत्रिकी, ऊष्मीय भौतिकी एवं तरंगें" },
    { name: "Electromagnetism, Optics & Modern Physics", nameHi: "विद्युत-चुंबकत्व, प्रकाशिकी एवं आधुनिक भौतिकी" },
    [pgtPhysicsMock1, pgtPhysicsMock2],
  ),
  subject(
    "chemistry", "Chemistry", "रसायन विज्ञान", "physical and inorganic chemistry, and organic and analytical chemistry",
    { name: "Physical & Inorganic Chemistry", nameHi: "भौतिक एवं अकार्बनिक रसायन" },
    { name: "Organic & Analytical Chemistry", nameHi: "कार्बनिक एवं विश्लेषणात्मक रसायन" },
    [pgtChemistryMock1, pgtChemistryMock2],
  ),
  subject(
    "biology", "Biology", "जीव विज्ञान", "cell biology, genetics and plant biology, and animal physiology, ecology and biotechnology",
    { name: "Cell Biology, Genetics & Plant Biology", nameHi: "कोशिका जीव विज्ञान, आनुवंशिकी एवं पादप जीव विज्ञान" },
    { name: "Animal Physiology, Ecology & Biotechnology", nameHi: "प्राणी शरीर क्रिया विज्ञान, पारिस्थितिकी एवं जैव प्रौद्योगिकी" },
    [pgtBiologyMock1, pgtBiologyMock2],
  ),
  subject(
    "hindi", "Hindi", "हिंदी", "Hindi language and grammar, and Hindi literature",
    { name: "Hindi Language & Grammar", nameHi: "हिंदी भाषा एवं व्याकरण" },
    { name: "Hindi Literature", nameHi: "हिंदी साहित्य" },
    [pgtHindiMock1, pgtHindiMock2],
  ),
  subject(
    "history", "History", "इतिहास", "ancient and medieval India, and modern India and world history",
    { name: "Ancient & Medieval India", nameHi: "प्राचीन एवं मध्यकालीन भारत" },
    { name: "Modern India & World History", nameHi: "आधुनिक भारत एवं विश्व इतिहास" },
    [pgtHistoryMock1, pgtHistoryMock2],
  ),
  subject(
    "political-science", "Political Science", "राजनीति विज्ञान", "political theory and thought, and Indian government, comparative politics and international relations",
    { name: "Political Theory & Thought", nameHi: "राजनीतिक सिद्धांत एवं चिंतन" },
    { name: "Indian Government, Comparative Politics & IR", nameHi: "भारतीय शासन, तुलनात्मक राजनीति एवं अंतरराष्ट्रीय संबंध" },
    [pgtPolSciMock1, pgtPolSciMock2],
  ),
  subject(
    "economics", "Economics", "अर्थशास्त्र", "micro and macro economics, and Indian economy, development and statistics",
    { name: "Micro & Macro Economics", nameHi: "व्यष्टि एवं समष्टि अर्थशास्त्र" },
    { name: "Indian Economy, Development & Statistics", nameHi: "भारतीय अर्थव्यवस्था, विकास एवं सांख्यिकी" },
    [pgtEconomicsMock1, pgtEconomicsMock2],
  ),
  subject(
    "commerce", "Commerce", "वाणिज्य", "accountancy and cost accounting, and business studies, finance and business law",
    { name: "Accountancy & Cost Accounting", nameHi: "लेखाशास्त्र एवं लागत लेखांकन" },
    { name: "Business Studies, Finance & Business Law", nameHi: "व्यवसाय अध्ययन, वित्त एवं व्यापारिक सन्नियम" },
    [pgtCommerceMock1, pgtCommerceMock2],
  ),
];
