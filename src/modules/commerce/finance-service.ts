import "server-only";
import { db } from "@/lib/db";
import { PARTNER_NAME, startOfDayIst, summarize, validateFinance, type FinanceSummary, type PartnerCode } from "./finance-input";

type Fail = { ok: false; errors: string[] };

export type FinanceRange = "all" | "month" | "last";

/** Date window for a range in IST (the server clock may be UTC). `to` is exclusive. */
export function rangeWindow(range: FinanceRange, now = new Date()): { from?: Date; to?: Date } {
  if (range === "all") return {};
  const ist = new Date(now.getTime() + 5.5 * 3600_000);
  const y = ist.getUTCFullYear();
  const m = ist.getUTCMonth();
  const at = (year: number, month: number) => new Date(Date.UTC(year, month, 1) - 5.5 * 3600_000);
  return range === "month" ? { from: at(y, m), to: at(y, m + 1) } : { from: at(y, m - 1), to: at(y, m) };
}

export type FinanceRow = {
  id: string;
  kind: "EXPENSE" | "PAYOUT";
  partner: PartnerCode | null;
  category: string | null;
  title: string;
  amountPaise: number;
  entryDate: Date;
  note: string | null;
};

export async function getFinance(range: FinanceRange): Promise<{ summary: FinanceSummary; rows: FinanceRow[]; orders: number }> {
  const { from, to } = rangeWindow(range);
  const window = from && to ? { gte: from, lt: to } : undefined;
  const [revenue, rows] = await Promise.all([
    // Paid orders on every site; the cash Razorpay charged (the wallet-paid part is not new money).
    db.order.aggregate({ where: { status: "PAID", ...(window && { createdAt: window }) }, _sum: { amountPaise: true }, _count: true }),
    db.financeEntry.findMany({
      where: window ? { entryDate: window } : {},
      orderBy: [{ entryDate: "desc" }, { createdAt: "desc" }],
      select: { id: true, kind: true, partner: true, category: true, title: true, amountPaise: true, entryDate: true, note: true },
    }),
  ]);
  return { summary: summarize(revenue._sum.amountPaise ?? 0, rows), rows, orders: revenue._count };
}

export async function addFinanceEntry(raw: unknown, actorId: string): Promise<{ ok: true } | Fail> {
  const v = validateFinance(raw);
  if (!v.ok) return v;
  const e = v.value;
  const row = await db.financeEntry.create({
    data: {
      kind: e.kind,
      partner: e.partner,
      category: e.kind === "EXPENSE" ? e.category : null,
      title: e.title || `${PARTNER_NAME[e.partner as PartnerCode]} withdrawal`,
      amountPaise: Math.round(e.amount * 100),
      entryDate: startOfDayIst(e.date),
      note: e.note || null,
      createdById: actorId,
    },
    select: { id: true },
  });
  await db.auditLog.create({ data: { actorId, entity: "finance", entityId: row.id, action: `create ${e.kind.toLowerCase()}` } });
  return { ok: true };
}

export async function deleteFinanceEntry(id: string, actorId: string): Promise<{ ok: true }> {
  await db.financeEntry.deleteMany({ where: { id } });
  await db.auditLog.create({ data: { actorId, entity: "finance", entityId: id, action: "delete" } });
  return { ok: true };
}
