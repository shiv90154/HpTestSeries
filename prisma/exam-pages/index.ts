import { DEFENCE_PAGES } from "./defence";
import { DELHI_POLICE_PAGES } from "./delhi-police";
import { HPPSC_PAGES } from "./hppsc";
import { HPRCA_PAGES } from "./hprca";
import { OTHER_PAGES } from "./others";
import { PUNJAB_PAGES } from "./punjab";
import { RAJASTHAN_PAGES } from "./rajasthan";
import type { ExamPages } from "./types";

export type { ExamPage, ExamPages, PostSeed } from "./types";
export { NOTIFICATION_POSTS } from "./posts";
export { PUNJAB_POSTS } from "./punjab-posts";
export { RAJASTHAN_POSTS } from "./rajasthan-posts";

/** Public copy for every exam page, keyed "bodySlug/examSlug". Seeded by prisma/seed-content.ts. */
export const EXAM_PAGES: ExamPages = { ...HPRCA_PAGES, ...HPPSC_PAGES, ...OTHER_PAGES, ...DEFENCE_PAGES, ...DELHI_POLICE_PAGES, ...PUNJAB_PAGES, ...RAJASTHAN_PAGES };
