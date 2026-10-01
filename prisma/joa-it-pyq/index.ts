// HP JOA (IT) previous-year papers, in the order they are listed. Add a paper = add its file and one line here.

import type { PyqPaper } from "../seed-pyq-papers";
import { JOA_IT_PYQ_SECTIONS, y2021p903 } from "./y2021-p903";

export const JOA_IT_PYQ: PyqPaper[] = [
  {
    slug: "hp-joa-it-previous-paper-hpssc-2021-post-903",
    title: "HPSSC JOA (IT) Previous Year Paper 2021 (Post Code 903)",
    titleHi: "एचपीएसएससी जेओए (आईटी) पिछला वर्ष प्रश्न पत्र 2021 (पोस्ट कोड 903)",
    durationSec: 120 * 60,
    marksCorrect: 0.5,
    marksWrong: 0.125,
    instructions:
      "HPSSC Junior Office Assistant (IT) screening test of 2021: 170 questions, 85 marks, 2 hours. Each question carries half a mark; " +
      "a wrong answer deducts 0.125 marks. Answers follow the commission's final answer key. Questions with grace marks or an " +
      "unreadable text in the original are left out. You can switch between Hindi and English at any time.",
    sections: JOA_IT_PYQ_SECTIONS,
    questions: y2021p903,
  },
];
