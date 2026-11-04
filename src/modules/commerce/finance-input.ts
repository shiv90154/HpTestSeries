// Pure finance rules (no DB), kept separate so they are unit-testable.
import { z } from "zod";

export const PARTNERS = ["SHIV", "NIKHIL"] as const;
export type PartnerCode = (typeof PARTNERS)[number];
export const PARTNER_NAME: Record<PartnerCode, string> = { SHIV: "Shiv", NIKHIL: "Nikhil" };

export const EXPENSE_CATEGORIES = [
  "Claude Code / AI",
  "Server / VPS",
  "Domain",
  "Razorpay fees",
  "Ads / Marketing",
  "Content / Writers",
  "Software / Subscriptions",
  "Other",
] as const;

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a valid date");
const rupeesField = z.number().positive("Amount must be more than 0").max(10_000_000, "Amount is too large");

export const financeSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("EXPENSE"),
    title: z.string().trim().min(2, "Write what the money was spent on").max(80),
    category: z.enum(EXPENSE_CATEGORIES),
    /** rupees */
    amount: rupeesField,
    /** who paid it from their own pocket; null = paid from business money */
    partner: z.enum(PARTNERS).nullable(),
    date,
    note: z.string().trim().max(200),
  }),
  z.object({
    kind: z.literal("PAYOUT"),
    title: z.string().trim().max(80),
    amount: rupeesField,
    partner: z.enum(PARTNERS, "Pick who took the money"),
    date,
    note: z.string().trim().max(200),
  }),
]);
export type FinanceInput = z.infer<typeof financeSchema>;

export function validateFinance(raw: unknown): { ok: true; value: FinanceInput } | { ok: false; errors: string[] } {
  const r = financeSchema.safeParse(raw);
  return r.success ? { ok: true, value: r.data } : { ok: false, errors: r.error.issues.map((i) => i.message) };
}

/** A yyyy-mm-dd typed by the admin, as midnight IST of that day. */
export function startOfDayIst(ymd: string): Date {
  return new Date(`${ymd}T00:00:00+05:30`);
}

export type Entry = { kind: "EXPENSE" | "PAYOUT"; partner: PartnerCode | null; amountPaise: number };

export type PartnerBalance = {
  partner: PartnerCode;
  /** half of the profit */
  sharePaise: number;
  /** business expenses this partner paid from their own pocket (the business owes it back) */
  paidForBusinessPaise: number;
  /** money this partner already took out */
  takenPaise: number;
  /** what the business still owes this partner (negative = took more than their due) */
  owedPaise: number;
};

export type FinanceSummary = {
  revenuePaise: number;
  expensesPaise: number;
  profitPaise: number;
  takenPaise: number;
  /** money that should still be in the business: revenue − business-paid expenses − payouts */
  cashInHandPaise: number;
  partners: PartnerBalance[];
};

/** Profit is split 50/50; a partner who paid an expense personally is paid back on top of their share. */
export function summarize(revenuePaise: number, entries: Entry[]): FinanceSummary {
  const sum = (f: (e: Entry) => boolean) => entries.filter(f).reduce((n, e) => n + e.amountPaise, 0);
  const expensesPaise = sum((e) => e.kind === "EXPENSE");
  const takenPaise = sum((e) => e.kind === "PAYOUT");
  const profitPaise = revenuePaise - expensesPaise;
  const shiv = Math.floor(profitPaise / 2);
  const shares: Record<PartnerCode, number> = { SHIV: shiv, NIKHIL: profitPaise - shiv }; // odd paisa goes to Nikhil
  const partners = PARTNERS.map((partner): PartnerBalance => {
    const paidForBusinessPaise = sum((e) => e.kind === "EXPENSE" && e.partner === partner);
    const taken = sum((e) => e.kind === "PAYOUT" && e.partner === partner);
    return { partner, sharePaise: shares[partner], paidForBusinessPaise, takenPaise: taken, owedPaise: shares[partner] + paidForBusinessPaise - taken };
  });
  const cashInHandPaise = revenuePaise - sum((e) => e.kind === "EXPENSE" && e.partner === null) - takenPaise;
  return { revenuePaise, expensesPaise, profitPaise, takenPaise, cashInHandPaise, partners };
}
