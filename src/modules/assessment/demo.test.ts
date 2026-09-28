import { describe, expect, it } from "vitest";
import { demoCount, demoDurationSec, planDemo } from "./demo";

describe("demoCount", () => {
  it("gives the first half of a section, rounded up", () => {
    expect(demoCount(30)).toBe(15);
    expect(demoCount(15)).toBe(8);
    expect(demoCount(5)).toBe(3);
    expect(demoCount(2)).toBe(1);
  });

  it("makes a single-question section fully free and an empty one empty", () => {
    expect(demoCount(1)).toBe(1);
    expect(demoCount(0)).toBe(0);
  });
});

describe("planDemo", () => {
  it("splits the Patwari mock layout into about half free", () => {
    const plan = planDemo([30, 20, 15, 15, 15, 5]);
    expect(plan.free).toEqual([15, 10, 8, 8, 8, 3]);
    expect(plan.locked).toEqual([15, 10, 7, 7, 7, 2]);
    expect(plan.freeTotal).toBe(52);
    expect(plan.lockedTotal).toBe(48);
  });

  it("always keeps free + locked equal to the section size", () => {
    for (const n of [0, 1, 2, 3, 7, 10, 99, 100]) {
      const p = planDemo([n]);
      expect(p.free[0] + p.locked[0]).toBe(n);
    }
  });

  it("has nothing locked when every section has at most one question", () => {
    expect(planDemo([1, 1, 1]).lockedTotal).toBe(0);
  });
});

describe("demoDurationSec", () => {
  it("prorates the time by the share of questions, in whole minutes", () => {
    expect(demoDurationSec(5400, 52, 100)).toBe(2820); // 46.8 min → 47 min
    expect(demoDurationSec(1200, 12, 25)).toBe(600);
  });

  it("never drops below one minute and survives an empty test", () => {
    expect(demoDurationSec(600, 1, 500)).toBe(60);
    expect(demoDurationSec(600, 0, 0)).toBe(600);
  });
});
