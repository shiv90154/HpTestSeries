import { describe, expect, it } from "vitest";
import { isReferralLinkCode, randomCode, referralCouponProblem, referralLink } from "./referral-rules";

const plain = { referrerId: null, ownerId: null };

describe("referralCouponProblem", () => {
  it("leaves plain coupons alone", () => {
    expect(referralCouponProblem(plain, "u1", true)).toBeNull();
  });

  it("blocks using your own referral code", () => {
    expect(referralCouponProblem({ referrerId: "u1", ownerId: null }, "u1", false)).toMatch(/own referral code/);
  });

  it("allows a friend's first purchase only", () => {
    const code = { referrerId: "u1", ownerId: null };
    expect(referralCouponProblem(code, "u2", false)).toBeNull();
    expect(referralCouponProblem(code, "u2", true)).toMatch(/first purchase/);
  });

  it("keeps a reward coupon to its owner, and lets the owner use it after buying before", () => {
    const reward = { referrerId: null, ownerId: "u1" };
    expect(referralCouponProblem(reward, "u1", true)).toBeNull();
    expect(referralCouponProblem(reward, "u2", false)).toMatch(/not valid/);
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
