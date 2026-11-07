import type { PostCategory } from "@/modules/content/post-input";

export type ExamNews = { href: string; title: string; updatedAt: Date };

/** Exam date and admit card posts go stale fast: after this many days they no longer top the exam page. */
const FRESH_DAYS = 60;

/**
 * The exam's newest exam-date or admit-card post, if it changed in the last 60 days. The exam hub and its sub-pages
 * show it above the fold, because "exam date" searches land on the syllabus page as often as on the post itself.
 */
export function latestExamNews(
  posts: { slug: string; title: string; category: PostCategory; updatedAt: Date }[],
  now = new Date(),
): ExamNews | null {
  const cutoff = now.getTime() - FRESH_DAYS * 86_400_000;
  const p = posts
    .filter((p) => (p.category === "EXAM_DATE" || p.category === "ADMIT_CARD") && p.updatedAt.getTime() >= cutoff)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
  return p ? { href: `/blog/${p.slug}`, title: p.title, updatedAt: p.updatedAt } : null;
}
