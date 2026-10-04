// Pure referral rules (no DB), kept separate so they are unit-testable.
import { randomInt } from "node:crypto";

/** What a friend saves on their first purchase when they use a referral code. */
export const FRIEND_DISCOUNT_PAISE = 5000;
/** What the referrer earns, as a single-use coupon, for each friend whose paid order used their code. */
export const REWARD_PAISE = 5000;
export const REWARD_VALID_DAYS = 180;
/** Cap per referrer, so a fake-account ring can't farm unlimited coupons. */
export const MAX_REWARDS_PER_USER = 20;

export const REFERRAL_COOKIE = "hp_ref";
export const REFERRAL_COOKIE_MAX_AGE = 30 * 86_400;

// No 0/O/1/I: codes get read out and typed from phones.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function randomCode(prefix: string, length: number): string {
  let out = prefix;
  for (let i = 0; i < length; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

/** A referral code as it appears in a /r/<code> link: same shape as any coupon code. */
export function isReferralLinkCode(code: string): boolean {
  return /^[A-Z0-9][A-Z0-9_-]{2,23}$/.test(code);
}

/** Why `userId` can't use this coupon, or null. Plain coupons (no referrerId / ownerId) are open to everyone. */
export function referralCouponProblem(c: { referrerId: string | null; ownerId: string | null }, userId: string, hasPaidBefore: boolean): string | null {
  if (c.ownerId && c.ownerId !== userId) return "This coupon code is not valid.";
  if (c.referrerId) {
    if (c.referrerId === userId) return "You can't use your own referral code.";
    if (hasPaidBefore) return "Referral codes are for your first purchase only.";
  }
  return null;
}

/** The link a student shares. */
export function referralLink(siteUrl: string, code: string): string {
  return `${siteUrl.replace(/\/$/, "")}/r/${code}`;
}
