import { describe, expect, it } from "vitest";
import { cheapestBySeries, perTestLabel, saving, separateTotalPaise } from "./value";

describe("pack value", () => {
  const prices = cheapestBySeries([
    { priceInPaise: 99_00, seriesIds: ["ps"] },
    { priceInPaise: 99_00, seriesIds: ["steno"] },
    { priceInPaise: 149_00, seriesIds: ["clerk"] },
    { priceInPaise: 99_00, seriesIds: ["clerk"] },
  ]);

  it("keeps the cheapest price per series", () => {
    expect(prices.get("clerk")).toBe(99_00);
  });

  it("sums the series bought one by one", () => {
    expect(separateTotalPaise(199_00, ["ps", "steno", "clerk"], prices)).toBe(297_00);
  });

  it("shows nothing when a series has no price of its own, or there is no saving", () => {
    expect(separateTotalPaise(199_00, ["ps", "other"], prices)).toBeNull();
    expect(separateTotalPaise(198_00, ["ps", "steno"], prices)).toBeNull();
    expect(separateTotalPaise(99_00, ["ps"], prices)).toBeNull();
  });

  it("rounds the saving percentage down", () => {
    expect(saving(199_00, 297_00)).toEqual({ paise: 98_00, pct: 32 });
  });
});

describe("per-test price", () => {
  it("rounds up to the rupee", () => {
    expect(perTestLabel(99_00, 13)).toBe("₹8 per test");
    expect(perTestLabel(199_00, 39)).toBe("₹6 per test");
  });

  it("is skipped for a single test", () => {
    expect(perTestLabel(99_00, 1)).toBeNull();
    expect(perTestLabel(99_00, 0)).toBeNull();
  });
});
