// Subject sectionals for the Punjab series, built from the HP Police Constable and HP Patwari sectional banks. General
// Knowledge (Indian history, polity, geography, science, economy), Reasoning, Quantitative Aptitude and English are not
// state specific, so the same questions serve both states: the seed matches questions by text hash and reuses the rows.
// They are new tests (not links to the HP ones) because the title, the exam and the marking differ: Punjab Police has no
// negative marking, Punjab Patwari 0.25. Himachal GK and Hindi sectionals are not reused. A Punjab pass or series buyer
// sees these only on pbtestseries.in, so they never repeat next to the HP copies for one buyer.

import { english1 as patwariEnglish1, english2 as patwariEnglish2 } from "./patwari/sectional/english";
import { gk1 as patwariGk1, gk2 as patwariGk2 } from "./patwari/sectional/gk";
import { maths1 as patwariMaths1, maths2 as patwariMaths2 } from "./patwari/sectional/maths";
import { reasoning1 as patwariReasoning1, reasoning2 as patwariReasoning2 } from "./patwari/sectional/reasoning";
import type { PatwariQuestion, TestDef } from "./patwari/types";
import { english1 as policeEnglish1, english2 as policeEnglish2 } from "./police/sectional/english";
import { gk1 as policeGk1, gk2 as policeGk2 } from "./police/sectional/gk";
import { maths1 as policeMaths1, maths2 as policeMaths2 } from "./police/sectional/maths";
import { reasoning1 as policeReasoning1, reasoning2 as policeReasoning2 } from "./police/sectional/reasoning";

// Two questions name Himachal places; on the Punjab site they say the same thing with Punjab places. The rewrite is a new
// question (new text hash), so the HP tests that hold the original are untouched.
const LOCAL: Record<string, Pick<PatwariQuestion, "en" | "hi">> = {
  "Choose the correct article: 'He is ___ MLA from Shimla.'": {
    en: ["Choose the correct article: 'He is ___ MLA from Amritsar.'", ["a", "an", "the", "no article"], "'MLA' is read 'em-el-ay', beginning with a vowel sound, so 'an' is used: 'an MLA'."],
    hi: ["सही article चुनिए: 'He is ___ MLA from Amritsar.'", ["a", "an", "the", "no article"], "'MLA' का उच्चारण 'एम-एल-ए' है, जो स्वर ध्वनि से शुरू होता है, अतः 'an' आता है: 'an MLA'।"],
  },
  "Find the odd one out: Shimla, Kullu, Manali, Dehradun": {
    en: ["Find the odd one out: Amritsar, Ludhiana, Dehradun, Jalandhar", ["Amritsar", "Ludhiana", "Dehradun", "Jalandhar"], "Amritsar, Ludhiana and Jalandhar are in Punjab. Dehradun is in Uttarakhand."],
    hi: ["असंगत (बेमेल) शब्द ज्ञात कीजिए: अमृतसर, लुधियाना, देहरादून, जालंधर", ["अमृतसर", "लुधियाना", "देहरादून", "जालंधर"], "अमृतसर, लुधियाना और जालंधर पंजाब में हैं। देहरादून उत्तराखंड में है।"],
  },
};
const localise = (qs: PatwariQuestion[]): PatwariQuestion[] => qs.map((x) => ({ ...x, ...LOCAL[x.en[0]] }));

type Subject = { key: string; name: string; nameHi: string; tests: [PatwariQuestion[], PatwariQuestion[]] };

function build(prefix: string, label: string, labelHi: string, exam: string, marksWrong: number, subjects: Subject[]): TestDef[] {
  const marking = marksWrong === 0 ? "There is no negative marking" : `Each wrong answer deducts ${marksWrong} marks`;
  return subjects.flatMap((sub) =>
    sub.tests.map((raw, i) => {
      const questions = localise(raw);
      return {
        slug: `${prefix}-${sub.key}-sectional-${i + 1}`,
        title: `${label} ${sub.name} Sectional Test ${i + 1}`,
        titleHi: `${labelHi} ${sub.nameHi} सेक्शनल टेस्ट ${i + 1}`,
        type: "SECTIONAL" as const,
        durationSec: 20 * 60,
        marksWrong,
        instructions:
          `${sub.name} sectional for the ${exam}: ${questions.length} questions, ${questions.length} marks, 20 minutes. Each correct answer gives 1 mark. ` +
          `${marking}. You can switch between English and Hindi at any time.`,
        sections: [{ name: sub.name, nameHi: sub.nameHi }],
        questions,
      };
    }),
  );
}

/** Punjab Police Constable: 8 sectionals from the HP Police bank, no negative marking. */
export const PB_POLICE_SECTIONALS: TestDef[] = build("punjab-police-constable", "Punjab Police Constable", "पंजाब पुलिस कांस्टेबल", "Punjab Police Constable CBT", 0, [
  { key: "general-awareness", name: "General Awareness", nameHi: "सामान्य जागरूकता", tests: [policeGk1, policeGk2] },
  { key: "quant", name: "Quantitative Aptitude", nameHi: "संख्यात्मक योग्यता", tests: [policeMaths1, policeMaths2] },
  { key: "reasoning", name: "Reasoning", nameHi: "तर्कशक्ति", tests: [policeReasoning1, policeReasoning2] },
  { key: "english", name: "English", nameHi: "अंग्रेज़ी", tests: [policeEnglish1, policeEnglish2] },
]);

/** PSSSB Patwari: 8 sectionals from the HP Patwari bank, quarter-mark negative. */
export const PB_PATWARI_SECTIONALS: TestDef[] = build("psssb-patwari", "PSSSB Patwari", "पीएसएसएसबी पटवारी", "PSSSB Patwari written exam", 0.25, [
  { key: "general-knowledge", name: "General Knowledge", nameHi: "सामान्य ज्ञान", tests: [patwariGk1, patwariGk2] },
  { key: "reasoning", name: "Reasoning", nameHi: "तर्कशक्ति", tests: [patwariReasoning1, patwariReasoning2] },
  { key: "maths", name: "Maths", nameHi: "गणित", tests: [patwariMaths1, patwariMaths2] },
  { key: "english", name: "English", nameHi: "अंग्रेज़ी", tests: [patwariEnglish1, patwariEnglish2] },
]);
