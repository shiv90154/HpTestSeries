"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteCouponAction, setCouponActiveAction } from "./actions";

export function CouponRowActions({ id, isActive, code }: { id: string; isActive: boolean; code: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const run = (fn: () => Promise<{ ok: boolean; errors?: string[] }>) =>
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) alert(res.errors?.join("\n"));
      router.refresh();
    });
  return (
    <div className="flex gap-3 text-xs">
      <button disabled={pending} className="text-primary underline" onClick={() => run(() => setCouponActiveAction(id, !isActive))}>
        {isActive ? "Deactivate" : "Activate"}
      </button>
      <button disabled={pending} className="text-danger underline" onClick={() => confirm(`Delete coupon ${code}?`) && run(() => deleteCouponAction(id))}>
        Delete
      </button>
    </div>
  );
}
