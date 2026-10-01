// HP JOA (IT) previous-year papers, in the order they are listed. Add a paper = add its file and one line here.

import type { PyqPaper } from "../seed-pyq-papers";
import { JOA_IT_PYQ_SECTIONS, y2021p903 } from "./y2021-p903";
import { JOA_IT_2018_SECTIONS, y2018p626 } from "./y2018-p626";
import { JOA_IT_2017_SECTIONS, y2017p556 } from "./y2017-p556";

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
  {
    slug: "hp-joa-it-previous-paper-hpssc-2018-post-626",
    title: "HPSSC JOA (IT) Previous Year Paper 2018 (Post Code 626)",
    titleHi: "एचपीएसएससी जेओए (आईटी) पिछला वर्ष प्रश्न पत्र 2018 (पोस्ट कोड 626)",
    durationSec: 120 * 60,
    marksCorrect: 0.5,
    marksWrong: 0.125,
    instructions:
      "HPSSC Junior Office Assistant (IT) screening test held on 23 December 2018: 170 questions, 85 marks, 2 hours. Each question carries " +
      "half a mark; a wrong answer deducts 0.125 marks. Answers follow the commission's provisional answer key (Series A). " +
      "You can switch between Hindi and English at any time.",
    sections: JOA_IT_2018_SECTIONS,
    questions: y2018p626,
  },
  {
    slug: "hp-joa-it-previous-paper-hpssc-2017-post-556",
    title: "HPSSC JOA (IT) Previous Year Paper 2017 (Post Code 556)",
    titleHi: "एचपीएसएससी जेओए (आईटी) पिछला वर्ष प्रश्न पत्र 2017 (पोस्ट कोड 556)",
    durationSec: 120 * 60,
    marksCorrect: 1,
    marksWrong: 0,
    instructions:
      "HPSSC Junior Office Assistant (IT) screening test held on 28 April 2017: 200 questions, 200 marks, 2 hours. Each question carries one mark " +
      "and there is no negative marking. Answers follow the commission's provisional answer key (Series A). You can switch between Hindi and English at any time.",
    sections: JOA_IT_2017_SECTIONS,
    questions: y2017p556,
  },
];
