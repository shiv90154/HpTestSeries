import { describe, expect, it } from "vitest";
import { DELHI_POLICE_SECTIONS, DELHI_POLICE_SERIES, DELHI_POLICE_TESTS } from "../../../prisma/delhi-police";
import { balanceAnswers } from "../../../prisma/patwari/types";

// Shape, section counts and sums for the Delhi Police Constable series. Per-question checks (four options, answer spread,
// hard/easy mix, computed answers, taxonomy, no repeats) run for every exam series in exam-series-data.test.ts.

const mocks = DELHI_POLICE_TESTS.filter((t) => t.type === "MOCK");
const sectionals = DELHI_POLICE_TESTS.filter((t) => t.type === "SECTIONAL");

describe("Delhi Police Constable series", () => {
  it("has 5 full mocks (the first free), 5 subject tests and 2 previous-year-pattern papers", () => {
    expect(mocks.filter((t) => t.slug.includes("-full-mock-"))).toHaveLength(5);
    expect(mocks.filter((t) => t.slug.includes("-pyq-style-"))).toHaveLength(2);
    expect(sectionals).toHaveLength(5);
    expect(DELHI_POLICE_TESTS.map((t) => !!t.isFree)).toEqual(DELHI_POLICE_TESTS.map((_, i) => i === 0));
  });

  it("is one ₹299 product with 180 days of validity", () => {
    expect(DELHI_POLICE_SERIES).toHaveLength(1);
    expect(DELHI_POLICE_SERIES[0].product.priceInPaise).toBe(299_00);
    expect(DELHI_POLICE_SERIES[0].product.validityDays).toBe(180);
    expect(DELHI_POLICE_SERIES[0].tests).toBe(DELHI_POLICE_TESTS);
  });

  it("never calls a practice paper a past paper", () => {
    for (const t of DELHI_POLICE_TESTS.filter((x) => x.slug.includes("-pyq-style-"))) {
      expect(t.instructions, t.slug).toMatch(/not (reproductions|copies) of/i);
      expect(t.title, t.slug).not.toMatch(/previous year paper|\b20\d\d\b/i);
    }
  });
});

describe.each(DELHI_POLICE_TESTS.map((t) => [t.slug, t] as const))("%s", (_slug, def) => {
  const qs = balanceAnswers(def.questions);
  const full = def.type === "MOCK";

  it("has the right number of questions per section", () => {
    if (full) {
      expect(qs).toHaveLength(100);
      expect(def.durationSec).toBe(90 * 60);
      expect(def.sections).toHaveLength(DELHI_POLICE_SECTIONS.length);
      DELHI_POLICE_SECTIONS.forEach((sec, i) => expect(qs.filter((x) => x.s === i), sec.name).toHaveLength(sec.count));
    } else {
      expect(qs).toHaveLength(25);
      expect(def.sections).toHaveLength(1);
      expect(qs.every((x) => x.s === 0)).toBe(true);
    }
  });

  it("uses the Delhi Police marking: +1, −0.25", () => {
    expect(def.marksCorrect ?? 1).toBe(1);
    expect(def.marksWrong ?? 0.25).toBe(0.25);
  });
});
