// HPRCA Clerk (Job Trainee) paid series on the 2026 pattern (Advertisement 13/2026, Post Code 26045, Department of
// Personnel): a 120-question, 120-mark, 90-minute screening test on general knowledge incl. Himachal GK and current
// affairs, everyday science, logical reasoning, social science, General English, General Hindi (matric standard) and
// word processing on computer, followed by a qualifying typing test. The section split is not published; the one
// below is ours. All mocks are written fresh. Question `s` is the index into HPRCA_CLERK_SECTIONS.

import type { PatwariQuestion } from "../patwari/types";
import { hprcaClerkMock1 } from "./mock1";
import { hprcaClerkMock2 } from "./mock2";
import { hprcaClerkMock3 } from "./mock3";
import { hprcaClerkMock4 } from "./mock4";
import { hprcaClerkMock5 } from "./mock5";

export const HPRCA_CLERK_SECTIONS = [
  { name: "Himachal GK & Current Affairs", nameHi: "हिमाचल सामान्य ज्ञान एवं समसामयिकी" },
  { name: "General Knowledge & Social Science", nameHi: "सामान्य ज्ञान एवं सामाजिक विज्ञान" },
  { name: "Everyday Science", nameHi: "दैनिक विज्ञान" },
  { name: "Logical Reasoning", nameHi: "तार्किक विवेचन" },
  { name: "General English & Hindi", nameHi: "सामान्य अंग्रेज़ी एवं हिंदी" },
  { name: "Computer & Word Processing", nameHi: "कंप्यूटर एवं वर्ड प्रोसेसिंग" },
];

/** Full mocks 1, 2, 3, … in order. */
export const HPRCA_CLERK_MOCKS: PatwariQuestion[][] = [hprcaClerkMock1, hprcaClerkMock2, hprcaClerkMock3, hprcaClerkMock4, hprcaClerkMock5];
