"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { EXPENSE_CATEGORIES, PARTNERS, PARTNER_NAME, type PartnerCode } from "@/modules/commerce/finance-input";
import { ErrorList, input as inputCls, label as labelCls, panel } from "../ui";
import { addFinanceEntryAction } from "./actions";

const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

type Kind = "EXPENSE" | "PAYOUT";

export function FinanceEntryForm() {
  const router = useRouter();
  const [kind, setKind] = useState<Kind>("EXPENSE");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState("");
  const [partner, setPartner] = useState<PartnerCode | "">("");
  const [date, setDate] = useState(today);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    startTransition(async () => {
      const res = await addFinanceEntryAction({ kind, title, category, amount: Number(amount), partner: partner || null, date, note });
      if (res.ok) {
        setTitle("");
        setAmount("");
        setNote("");
        router.refresh();
      } else setErrors(res.errors);
    });
  }

  const tab = (k: Kind, text: string) => (
    <button
      type="button"
      onClick={() => setKind(k)}
      aria-pressed={kind === k}
      className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${kind === k ? "border-primary bg-primary-soft text-primary" : "border-border hover:border-primary"}`}
    >
      {text}
    </button>
  );

  return (
    <form onSubmit={submit} className={`${panel} space-y-4`}>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="mr-2 font-semibold">Add entry</h2>
        {tab("EXPENSE", "Kharcha (expense)")}
        {tab("PAYOUT", "Paisa liya (withdrawal)")}
      </div>
      <fieldset disabled={pending} className="grid gap-4 sm:grid-cols-3">
        {kind === "EXPENSE" ? (
          <>
            <div>
              <label className={labelCls} htmlFor="f-title">Kis cheez ka kharcha</label>
              <input id="f-title" className={inputCls} value={title} placeholder="e.g. Claude Code Max plan" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="f-cat">Category</label>
              <select id="f-cat" className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="f-partner">Kisne diya</label>
              <select id="f-partner" className={inputCls} value={partner} onChange={(e) => setPartner(e.target.value as PartnerCode | "")}>
                <option value="">Business ke paise se</option>
                {PARTNERS.map((p) => (
                  <option key={p} value={p}>{PARTNER_NAME[p]} ne apni jeb se diya</option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <div>
            <label className={labelCls} htmlFor="f-partner">Kisne liya</label>
            <select id="f-partner" className={inputCls} value={partner} onChange={(e) => setPartner(e.target.value as PartnerCode | "")}>
              <option value="">Select…</option>
              {PARTNERS.map((p) => (
                <option key={p} value={p}>{PARTNER_NAME[p]}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className={labelCls} htmlFor="f-amount">Amount (₹)</label>
          <input id="f-amount" type="number" min={1} step="0.01" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="f-date">Date</label>
          <input id="f-date" type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="f-note">Note (optional)</label>
          <input id="f-note" className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      </fieldset>
      <ErrorList errors={errors} />
      <button disabled={pending} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
        {pending ? "Saving…" : kind === "EXPENSE" ? "Add kharcha" : "Add withdrawal"}
      </button>
    </form>
  );
}
