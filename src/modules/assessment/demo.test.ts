import { describe, expect, it } from "vitest";
import { MAX_DEMO_PERCENT, demoCount, demoDurationSec, planDemo } from "./demo";

describe("demoCount", () => {
  it("gives the first share of a section, rounded up", () => {
    expect(demoCount(30, 50)).toBe(15);
    expect(demoCount(15, 50)).toBe(8);
    expect(demoCount(5, 50)).toBe(3);
    expect(demoCount(25, 30)).toBe(8);
    expect(demoCount(25, 20)).toBe(5);
  });

  it("is zero when the demo is off", () => {
    expect(demoCount(30, 0)).toBe(0);
    expect(demoCount(30, -5)).toBe(0);
  });

  it("never exceeds the section, and never gives away more than the maximum share", () => {
    expect(demoCount(1, 50)).toBe(1);
    expect(demoCount(0, 50)).toBe(0);
    expect(demoCount(10, 100)).toBe(demoCount(10, MAX_DEMO_PERCENT));
    expect(demoCount(10, MAX_DEMO_PERCENT)).toBe(9);
  });
});

describe("planDemo", () => {
  it("splits the Patwari mock layout into about half free at 50%", () => {
    const plan = planDemo([30, 20, 15, 15, 15, 5], 50);
    expect(plan.free).toEqual([15, 10, 8, 8, 8, 3]);
    expect(plan.locked).toEqual([15, 10, 7, 7, 7, 2]);
    expect(plan.freeTotal).toBe(52);
    expect(plan.lockedTotal).toBe(48);
    expect(plan.available).toBe(true);
  });

  it("scales with the admin's percentage", () => {
    expect(planDemo([25], 30).freeTotal).toBe(8);
    expect(planDemo([25], 70).freeTotal).toBe(18);
  });

  it("is unavailable when the demo is off", () => {
    const plan = planDemo([30, 20], 0);
    expect(plan.available).toBe(false);
    expect(plan.freeTotal).toBe(0);
    expect(plan.lockedTotal).toBe(50);
  });

  it("is unavailable when nothing would stay locked", () => {
    expect(planDemo([1, 1, 1], 50).available).toBe(false);
  });

  it("always keeps free + locked equal to the section size", () => {
    for (const percent of [10, 33, 50, 90]) {
      for (const n of [0, 1, 2, 3, 7, 10, 25, 99, 100]) {
        const p = planDemo([n], percent);
        expect(p.free[0] + p.locked[0]).toBe(n);
      }
    }
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
