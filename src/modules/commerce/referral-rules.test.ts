import { describe, expect, it } from "vitest";
import { isReferralLinkCode, randomCode, referralAllowedFor, referralCouponProblem, referralLink } from "./referral-rules";

const plain = { referrerId: null };

describe("referralCouponProblem", () => {
  it("leaves plain coupons alone", () => {
    expect(referralCouponProblem(plain, "u1", true, 4900)).toBeNull();
  });

  it("blocks using your own referral code", () => {
    expect(referralCouponProblem({ referrerId: "u1" }, "u1", false, 14900)).toMatch(/own referral code/);
  });

  it("allows a friend's first purchase only", () => {
    const code = { referrerId: "u1" };
    expect(referralCouponProblem(code, "u2", false, 14900)).toBeNull();
    expect(referralCouponProblem(code, "u2", true, 14900)).toMatch(/first purchase/);
  });

  it("works only on plans above Rs 99, with a friendly note below that", () => {
    const code = { referrerId: "u1" };
    expect(referralAllowedFor(9900)).toBe(false);
    expect(referralAllowedFor(9901)).toBe(true);
    expect(referralCouponProblem(code, "u2", false, 9900)).toMatch(/above ₹99/);
    expect(referralCouponProblem(code, "u2", false, 4900)).toMatch(/above ₹99/);
    expect(referralCouponProblem(code, "u2", false, 19900)).toBeNull();
  });
});

describe("codes and links", () => {
  it("generates coupon-shaped codes without look-alike characters", () => {
    for (let i = 0; i < 50; i++) {
      const code = randomCode("HP", 6);
      expect(code).toHaveLength(8);
      expect(isReferralLinkCode(code)).toBe(true);
      expect(code.slice(2)).not.toMatch(/[01OI]/);
    }
  });

  it("rejects junk link codes", () => {
    expect(isReferralLinkCode("hp abc")).toBe(false);
    expect(isReferralLinkCode("../../etc")).toBe(false);
    expect(isReferralLinkCode("AB")).toBe(false);
  });

  it("builds the share link without a double slash", () => {
    expect(referralLink("https://hptestseries.in/", "HPABC234")).toBe("https://hptestseries.in/r/HPABC234");
  });
});
