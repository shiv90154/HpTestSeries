import { describe, expect, it } from "vitest";
import { CHSL_SECTIONS, CHSL_TESTS } from "../../../prisma/ssc/chsl";
import { balanceAnswers } from "../../../prisma/patwari/types";

// Shape and marking for the SSC CHSL Tier 1 series. Per-question checks (options, answer spread, computed answers,
// taxonomy, no repeats) run in exam-series-data.test.ts.

describe("SSC CHSL Tier 1 series", () => {
  it("makes only the first mock free", () => {
    expect(CHSL_TESTS.map((t) => !!t.isFree)).toEqual(CHSL_TESTS.map((_, i) => i === 0));
  });
});

describe.each(CHSL_TESTS.map((t) => [t.slug, t] as const))("%s", (_slug, def) => {
  const qs = balanceAnswers(def.questions);

  it("is 100 questions in four sections of 25, in 60 minutes", () => {
    expect(qs).toHaveLength(100);
    expect(def.durationSec).toBe(60 * 60);
    expect(def.sections).toHaveLength(CHSL_SECTIONS.length);
    CHSL_SECTIONS.forEach((sec, i) => expect(qs.filter((x) => x.s === i), sec.name).toHaveLength(sec.count));
  });

  it("uses the CHSL marking: +2, −0.50", () => {
    expect(def.marksCorrect).toBe(2);
    expect(def.marksWrong).toBe(0.5);
  });
});
