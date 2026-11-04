import { describe, expect, it } from "vitest";
import { summarize, validateFinance } from "./finance-input";

describe("summarize", () => {
  it("splits profit 50/50 and tracks what each partner already took", () => {
    const s = summarize(100_000, [
      { kind: "EXPENSE", partner: null, amountPaise: 20_000 },
      { kind: "PAYOUT", partner: "SHIV", amountPaise: 10_000 },
    ]);
    expect(s.profitPaise).toBe(80_000);
    expect(s.partners.map((p) => p.owedPaise)).toEqual([30_000, 40_000]);
    expect(s.cashInHandPaise).toBe(70_000);
    expect(s.partners.reduce((n, p) => n + p.owedPaise, 0)).toBe(s.cashInHandPaise);
  });

  it("pays back a partner who covered an expense personally", () => {
    const s = summarize(100_000, [{ kind: "EXPENSE", partner: "NIKHIL", amountPaise: 20_000 }]);
    expect(s.partners.map((p) => p.owedPaise)).toEqual([40_000, 60_000]);
    expect(s.cashInHandPaise).toBe(100_000);
    expect(s.partners.reduce((n, p) => n + p.owedPaise, 0)).toBe(s.cashInHandPaise);
  });

  it("gives the odd paisa to Nikhil", () => {
    expect(summarize(101, []).partners.map((p) => p.sharePaise)).toEqual([50, 51]);
  });
});

describe("validateFinance", () => {
  it("needs a partner for a payout", () => {
    expect(validateFinance({ kind: "PAYOUT", title: "", amount: 500, partner: null, date: "2026-11-04", note: "" }).ok).toBe(false);
  });
  it("accepts an expense paid from business money", () => {
    expect(validateFinance({ kind: "EXPENSE", title: "VPS", category: "Server / VPS", amount: 999, partner: null, date: "2026-11-04", note: "" }).ok).toBe(true);
  });
});
