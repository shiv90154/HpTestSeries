import { describe, expect, it } from "vitest";
import { applyCoupon, couponProblem, endOfDayIst, normalizeCode, validateCoupon } from "./coupon-input";

const base = { code: "yt50", type: "PCT" as const, value: 50, maxUses: null, validTill: null, affiliateTag: "", isActive: true };

describe("validateCoupon", () => {
  it("uppercases the code", () => {
    const r = validateCoupon(base);
    expect(r.ok && r.value.code).toBe("YT50");
  });
  it("rejects bad codes, percents and flat amounts", () => {
    expect(validateCoupon({ ...base, code: "a b" }).ok).toBe(false);
    expect(validateCoupon({ ...base, value: 101 }).ok).toBe(false);
    expect(validateCoupon({ ...base, value: 12.5 }).ok).toBe(false);
    expect(validateCoupon({ ...base, type: "FLAT", value: 20.5 }).ok).toBe(true);
    expect(validateCoupon({ ...base, maxUses: 0 }).ok).toBe(false);
  });
});

describe("applyCoupon", () => {
  it("percent discount rounds down", () => {
    expect(applyCoupon(14900, { pctOff: 10, flatOffPaise: null })).toEqual({ discountPaise: 1490, finalPaise: 13410 });
    expect(applyCoupon(9900, { pctOff: 33, flatOffPaise: null })).toEqual({ discountPaise: 3267, finalPaise: 6633 });
  });
  it("flat discount is capped at the price", () => {
    expect(applyCoupon(14900, { pctOff: null, flatOffPaise: 5000 })).toEqual({ discountPaise: 5000, finalPaise: 9900 });
    expect(applyCoupon(4900, { pctOff: null, flatOffPaise: 999900 })).toEqual({ discountPaise: 4900, finalPaise: 0 });
  });
  it("100% makes it free", () => {
    expect(applyCoupon(14900, { pctOff: 100, flatOffPaise: null }).finalPaise).toBe(0);
  });
  it("never leaves a paid order under ₹1", () => {
    expect(applyCoupon(5000, { pctOff: 99, flatOffPaise: null })).toEqual({ discountPaise: 4900, finalPaise: 100 });
    expect(applyCoupon(14900, { pctOff: null, flatOffPaise: 14850 })).toEqual({ discountPaise: 14800, finalPaise: 100 });
  });
});

describe("couponProblem", () => {
  const ok = { pctOff: 10, flatOffPaise: null, maxUses: 5, usedCount: 2, validTill: null, isActive: true };
  const now = new Date("2026-09-29T10:00:00Z");
  it("accepts a live coupon", () => expect(couponProblem(ok, now)).toBeNull());
  it("flags inactive, expired and used-up coupons", () => {
    expect(couponProblem({ ...ok, isActive: false }, now)).toMatch(/not active/);
    expect(couponProblem({ ...ok, validTill: endOfDayIst("2026-09-28") }, now)).toMatch(/expired/);
    expect(couponProblem({ ...ok, validTill: endOfDayIst("2026-09-29") }, now)).toBeNull();
    expect(couponProblem({ ...ok, usedCount: 5 }, now)).toMatch(/fully used/);
  });
});

describe("normalizeCode", () => {
  it("trims and uppercases", () => expect(normalizeCode("  yt50 ")).toBe("YT50"));
});
