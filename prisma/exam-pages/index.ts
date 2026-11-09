import { DEFENCE_PAGES } from "./defence";
import { DELHI_POLICE_PAGES } from "./delhi-police";
import { HARYANA_PAGES } from "./haryana";
import { HP_MORE_PAGES } from "./hp-more";
import { HPPSC_PAGES } from "./hppsc";
import { HPRCA_PAGES } from "./hprca";
import { JAM_PAGES } from "./jam";
import { OTHER_PAGES } from "./others";
import { PUNJAB_PAGES } from "./punjab";
import { RAJASTHAN_PAGES } from "./rajasthan";
import { SSC_PAGES } from "./ssc";
import type { ExamPages } from "./types";

export type { ExamPage, ExamPages, PostSeed } from "./types";
export { NOTIFICATION_POSTS } from "./posts";
export { HP_MORE_POSTS } from "./hp-more-posts";
export { HARYANA_POSTS } from "./haryana-posts";
export { PUNJAB_POSTS } from "./punjab-posts";
export { RAJASTHAN_POSTS } from "./rajasthan-posts";

/** Public copy for every exam page, keyed "bodySlug/examSlug". Seeded by prisma/seed-content.ts. */
export const EXAM_PAGES: ExamPages = { ...HPRCA_PAGES, ...HPPSC_PAGES, ...OTHER_PAGES, ...HP_MORE_PAGES, ...DEFENCE_PAGES, ...DELHI_POLICE_PAGES, ...JAM_PAGES, ...PUNJAB_PAGES, ...HARYANA_PAGES, ...RAJASTHAN_PAGES, ...SSC_PAGES };
