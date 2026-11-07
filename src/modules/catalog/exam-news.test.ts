import { describe, expect, it } from "vitest";
import { latestExamNews } from "./exam-news";

const now = new Date("2026-11-07T12:00:00Z");
const daysAgo = (n: number) => new Date(now.getTime() - n * 86_400_000);

describe("latestExamNews", () => {
  it("picks the most recently updated exam-date or admit-card post", () => {
    const news = latestExamNews(
      [
        { slug: "old-date", title: "Old date", category: "EXAM_DATE", updatedAt: daysAgo(20) },
        { slug: "admit", title: "Admit card out", category: "ADMIT_CARD", updatedAt: daysAgo(2) },
        { slug: "syllabus", title: "Syllabus", category: "SYLLABUS", updatedAt: daysAgo(0) },
      ],
      now,
    );
    expect(news).toEqual({ href: "/blog/admit", title: "Admit card out", updatedAt: daysAgo(2) });
  });

  it("ignores posts not updated in the last 60 days", () => {
    expect(latestExamNews([{ slug: "stale", title: "Stale", category: "EXAM_DATE", updatedAt: daysAgo(61) }], now)).toBeNull();
  });

  it("returns null when the exam has no date news", () => {
    expect(latestExamNews([{ slug: "n", title: "Notification", category: "NOTIFICATION", updatedAt: daysAgo(1) }], now)).toBeNull();
  });
});
