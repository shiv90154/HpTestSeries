import { describe, expect, it } from "vitest";
import { daysLeftLabel, planUsedPercent } from "./plan-rules";

const d = (s: string) => new Date(`${s}T00:00:00Z`);

describe("planUsedPercent", () => {
  it("is the share of the window already used", () => {
    expect(planUsedPercent(d("2026-01-01"), d("2026-01-11"), d("2026-01-06"))).toBe(50);
  });

  it("stays within 0 and 100", () => {
    expect(planUsedPercent(d("2026-02-01"), d("2026-03-01"), d("2026-01-01"))).toBe(0);
    expect(planUsedPercent(d("2026-01-01"), d("2026-01-11"), d("2026-02-01"))).toBe(100);
  });

  it("treats an empty window as used up", () => {
    expect(planUsedPercent(d("2026-01-01"), d("2026-01-01"), d("2026-01-01"))).toBe(100);
  });
});

describe("daysLeftLabel", () => {
  it("counts whole days, rounding up", () => {
    expect(daysLeftLabel(new Date("2026-01-11T12:00:00Z"), d("2026-01-01"))).toBe("11 days left");
  });

  it("says last day instead of 1 or 0 days", () => {
    expect(daysLeftLabel(new Date("2026-01-01T10:00:00Z"), d("2026-01-01"))).toBe("Last day");
    expect(daysLeftLabel(d("2026-01-01"), d("2026-02-01"))).toBe("Last day");
  });
});
