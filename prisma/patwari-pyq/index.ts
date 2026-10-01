// HP Patwari previous-year papers, in the order they are listed. Add a paper = add its file and one line here.

import type { PyqPaper } from "../seed-pyq-papers";
import { PATWARI_PYQ_SECTIONS, y2019 } from "./y2019";
import { y2016 } from "./y2016";
import { PATWARI_2015_SECTIONS, y2015 } from "./y2015";
import { PATWARI_2012_SECTIONS, y2012 } from "./y2012";
import { PATWARI_2013_SECTIONS, y2013 } from "./y2013";

const paper = (slug: string, label: string, labelHi: string, questions: PyqPaper["questions"]): PyqPaper => ({
  slug: `hp-patwari-previous-paper-${slug}`,
  title: `HP Patwari Previous Year Paper ${label}`,
  titleHi: `एचपी पटवारी पिछला वर्ष प्रश्न पत्र ${labelHi}`,
  durationSec: 90 * 60,
  sections: PATWARI_PYQ_SECTIONS,
  questions,
});

export const PATWARI_PYQ: PyqPaper[] = [
  paper("2019", "2019", "2019", y2019),
  paper("2016", "2016", "2016", y2016),
  { ...paper("2012", "2012", "2012", y2012), sections: PATWARI_2012_SECTIONS, durationSec: 180 * 60, marksCorrect: 0.8, marksWrong: 0.2 },
  { ...paper("2013", "2013", "2013", y2013), sections: PATWARI_2013_SECTIONS },
  { ...paper("2015", "2015", "2015", y2015), sections: PATWARI_2015_SECTIONS },
];
