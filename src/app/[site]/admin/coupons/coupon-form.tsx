"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { CouponInput } from "@/modules/commerce/coupon-input";
import { ErrorList, input as inputCls, label as labelCls, panel } from "../ui";
import { createCouponAction } from "./actions";

const empty: CouponInput = { code: "", type: "PCT", value: 20, maxUses: null, validTill: null, affiliateTag: "", isActive: true };

export function CouponForm() {
  const router = useRouter();
  const [m, setM] = useState<CouponInput>(empty);
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();
  const set = <K extends keyof CouponInput>(k: K, v: CouponInput[K]) => setM((p) => ({ ...p, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    startTransition(async () => {
      const res = await createCouponAction(m);
      if (res.ok) {
        setM(empty);
        router.refresh();
      } else setErrors(res.errors);
    });
  }

  return (
    <form onSubmit={submit} className={`${panel} space-y-4`}>
      <h2 className="font-semibold">New coupon</h2>
      <fieldset disabled={pending} className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="code">Code</label>
          <input id="code" className={`${inputCls} uppercase`} value={m.code} placeholder="YT20" onChange={(e) => set("code", e.target.value.toUpperCase())} />
        </div>
        <div>
          <label className={labelCls} htmlFor="type">Discount type</label>
          <select id="type" className={inputCls} value={m.type} onChange={(e) => set("type", e.target.value as CouponInput["type"])}>
            <option value="PCT">Percent off</option>
            <option value="FLAT">Flat ₹ off</option>
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="value">{m.type === "PCT" ? "Percent (100 = free)" : "Rupees off"}</label>
          <input id="value" type="number" min={1} className={inputCls} value={m.value || ""} onChange={(e) => set("value", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelCls} htmlFor="maxUses">Max uses (blank = unlimited)</label>
          <input id="maxUses" type="number" min={1} className={inputCls} value={m.maxUses ?? ""} onChange={(e) => set("maxUses", e.target.value ? Number(e.target.value) : null)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="validTill">Valid till (blank = no end)</label>
          <input id="validTill" type="date" className={inputCls} value={m.validTill ?? ""} onChange={(e) => set("validTill", e.target.value || null)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="tag">Partner tag (YouTube/Telegram channel)</label>
          <input id="tag" className={inputCls} value={m.affiliateTag} placeholder="e.g. hp-gk-yt" onChange={(e) => set("affiliateTag", e.target.value)} />
        </div>
      </fieldset>
      <ErrorList errors={errors} />
      <button disabled={pending} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
        {pending ? "Saving…" : "Create coupon"}
      </button>
    </form>
  );
}
