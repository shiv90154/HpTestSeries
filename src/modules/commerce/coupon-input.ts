// Pure coupon rules (no DB), kept separate so they are unit-testable.
import { z } from "zod";

/** Razorpay's minimum order is ₹1, so a discount never brings a paid order below this. */
export const MIN_CHARGE_PAISE = 100;

const CODE_RE = /^[A-Z0-9][A-Z0-9_-]{2,23}$/;

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

export const couponSchema = z
  .object({
    code: z
      .string()
      .transform(normalizeCode)
      .refine((c) => CODE_RE.test(c), "Code must be 3–24 letters, digits, - or _"),
    type: z.enum(["PCT", "FLAT"]),
    /** percent (1–100) for PCT, rupees for FLAT */
    value: z.number().positive("Discount must be more than 0"),
    maxUses: z.number().int().min(1, "Max uses must be at least 1").nullable(),
    /** yyyy-mm-dd, valid through the end of that day (IST) */
    validTill: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a valid date").nullable(),
    affiliateTag: z.string().trim().max(40, "Partner tag is too long"),
    isActive: z.boolean(),
  })
  .superRefine((v, ctx) => {
    if (v.type === "PCT" && (v.value > 100 || !Number.isInteger(v.value))) {
      ctx.addIssue({ code: "custom", path: ["value"], message: "Percent must be a whole number from 1 to 100" });
    }
    if (v.type === "FLAT" && v.value > 100_000) {
      ctx.addIssue({ code: "custom", path: ["value"], message: "Flat discount is too high" });
    }
  });

export type CouponInput = z.infer<typeof couponSchema>;

type Result<T> = { ok: true; value: T } | { ok: false; errors: string[] };

export function validateCoupon(raw: unknown): Result<CouponInput> {
  const p = couponSchema.safeParse(raw);
  if (p.success) return { ok: true, value: p.data };
  return { ok: false, errors: p.error.issues.map((i) => i.message) };
}

/** End of the chosen day in IST, as a UTC instant. */
export function endOfDayIst(yyyyMmDd: string): Date {
  return new Date(`${yyyyMmDd}T23:59:59.999+05:30`);
}

export type CouponRules = {
  pctOff: number | null;
  flatOffPaise: number | null;
  maxUses: number | null;
  usedCount: number;
  validTill: Date | null;
  isActive: boolean;
};

/** Why a coupon can't be used right now, or null when it can. */
export function couponProblem(c: CouponRules, now: Date = new Date()): string | null {
  if (!c.isActive) return "This coupon is not active.";
  if (c.validTill && c.validTill < now) return "This coupon has expired.";
  if (c.maxUses !== null && c.usedCount >= c.maxUses) return "This coupon has been fully used.";
  return null;
}

/**
 * Price after a coupon. A 100% (or larger flat) discount makes the order free; any other discount is
 * capped so the student still pays at least ₹1, the smallest amount Razorpay accepts.
 */
export function applyCoupon(pricePaise: number, c: Pick<CouponRules, "pctOff" | "flatOffPaise">): { discountPaise: number; finalPaise: number } {
  const raw = c.pctOff ? Math.floor((pricePaise * c.pctOff) / 100) : Math.min(c.flatOffPaise ?? 0, pricePaise);
  let final = pricePaise - Math.min(raw, pricePaise);
  if (final > 0 && final < MIN_CHARGE_PAISE) final = Math.min(MIN_CHARGE_PAISE, pricePaise);
  return { discountPaise: pricePaise - final, finalPaise: final };
}
