import { describe, expect, it } from "vitest";
import { PB_PATWARI_TESTS } from "../../../prisma/pb-patwari";
import { PB_POLICE_SECTIONALS, PB_PATWARI_SECTIONALS } from "../../../prisma/pb-reuse";
import { POLICE_FREE_TEST, POLICE_PAID_TESTS } from "../../../prisma/pb-police";
import { questionTextHash } from "./text-hash";

const stems = (tests: { questions: { en: [string, ...unknown[]] }[] }[]) => new Set(tests.flatMap((t) => t.questions.map((x) => questionTextHash(x.en[0]))));

describe.each([
  ["Punjab Police sectionals", PB_POLICE_SECTIONALS, 0, [POLICE_FREE_TEST, ...POLICE_PAID_TESTS]],
  ["PSSSB Patwari sectionals", PB_PATWARI_SECTIONALS, 0.25, PB_PATWARI_TESTS],
] as const)("%s", (_name, tests, marksWrong, mocks) => {
  it("are 8 unique 25-question, 20-minute sectionals with the series' marking", () => {
    expect(tests).toHaveLength(8);
    expect(new Set(tests.map((t) => t.slug)).size).toBe(8);
    for (const t of tests) {
      expect(t.type).toBe("SECTIONAL");
      expect(t.isFree ?? false).toBe(false);
      expect(t.marksWrong).toBe(marksWrong);
      expect(t.durationSec).toBe(20 * 60);
      expect(t.sections).toHaveLength(1);
      expect(t.questions).toHaveLength(25);
      expect(t.questions.every((x) => x.s === 0)).toBe(true);
    }
  });

  it("share no question with each other or with the series' mocks", () => {
    const seen = new Set<string>();
    for (const x of tests.flatMap((t) => t.questions)) {
      const h = questionTextHash(x.en[0]);
      expect(seen.has(h), x.en[0].slice(0, 60)).toBe(false);
      seen.add(h);
    }
    const mockStems = stems([...mocks]);
    for (const h of seen) expect(mockStems.has(h)).toBe(false);
  });
});
