// HP Police Constable previous-year papers, in the order they are listed. Add a paper = add its file and one line here.

import { SECTIONS, type PoliceQuestion } from "../police/types";
import type { PyqPaper } from "../seed-pyq-papers";
import { y2016 } from "./y2016";
import { y2017 } from "./y2017";
import { y2019 } from "./y2019";
import { y2022jul } from "./y2022-jul";
import { y2022mar } from "./y2022-mar";
import { y2025 } from "./y2025";

const paper = (slug: string, label: string, labelHi: string, questions: PoliceQuestion[]): PyqPaper => ({
  slug: `hp-police-constable-previous-paper-${slug}`,
  title: `HP Police Constable Previous Year Paper ${label}`,
  titleHi: `एचपी पुलिस कांस्टेबल पिछला वर्ष प्रश्न पत्र ${labelHi}`,
  durationSec: 90 * 60,
  sections: SECTIONS.map((x) => ({ name: x.name, nameHi: x.nameHi })),
  questions,
});

export const POLICE_PYQ: PyqPaper[] = [
  paper("2019", "2019", "2019", y2019),
  paper("2017", "2017", "2017", y2017),
  paper("2016", "2016", "2016", y2016),
  paper("march-2022", "March 2022", "मार्च 2022", y2022mar),
  paper("july-2022", "July 2022", "जुलाई 2022", y2022jul),
  paper("june-2025", "June 2025", "जून 2025", y2025),
];
