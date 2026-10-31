import { describe, expect, it } from "vitest";
import { EXAM_SERIES } from "../../../prisma/exam-series";
import { CHSL_TESTS } from "../../../prisma/ssc/chsl";

// Not a data check, only a helper while writing SSC mocks: when the shared-bank no-repeat test fails it names one
// question at a time, and this lists every CHSL question that repeats a question in another series at once.
// It always passes unless something collides, in which case the failure message is the full list.
describe("SSC CHSL stems that are already in another series", () => {
  it("has none", () => {
    const stem = (x: { en: [string, ...unknown[]] }) => x.en[0].normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}\p{M}]+/gu, "");
    const chsl = new Set(CHSL_TESTS.map((t) => t.slug));
    const others = new Set(EXAM_SERIES.filter((s) => !s.tests.every((t) => chsl.has(t.slug))).flatMap((s) => s.tests.filter((t) => !chsl.has(t.slug)).flatMap((t) => t.questions.map(stem))));
    const seen = new Set<string>();
    const clashes: string[] = [];
    for (const t of CHSL_TESTS)
      for (const x of t.questions) {
        const h = stem(x);
        if (others.has(h) || seen.has(h)) clashes.push(`${t.slug}: ${x.en[0].slice(0, 80)}`);
        seen.add(h);
      }
    expect(clashes).toEqual([]);
  });
});
