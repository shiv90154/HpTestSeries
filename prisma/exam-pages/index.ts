import { HPPSC_PAGES } from "./hppsc";
import { HPRCA_PAGES } from "./hprca";
import { OTHER_PAGES } from "./others";
import type { ExamPages } from "./types";

export type { ExamPage, ExamPages, PostSeed } from "./types";
export { NOTIFICATION_POSTS } from "./posts";

/** Public copy for every exam page, keyed "bodySlug/examSlug". Seeded by prisma/seed-content.ts. */
export const EXAM_PAGES: ExamPages = { ...HPRCA_PAGES, ...HPPSC_PAGES, ...OTHER_PAGES };
