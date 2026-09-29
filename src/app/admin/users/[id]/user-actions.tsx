"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { grantAccessAction, markRefundedAction, revokeEntitlementAction } from "../actions";
import { input as inputCls } from "../../ui";

type Res = { ok: true } | { ok: false; error: string };

function useRun() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const run = (fn: () => Promise<Res>) =>
    startTransition(async () => {
      const res = await fn();
      setError(res.ok ? null : res.error);
      router.refresh();
    });
  return { pending, error, run };
}

export function GrantAccess({ userId, products }: { userId: string; products: { id: string; title: string }[] }) {
  const { pending, error, run } = useRun();
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  if (products.length === 0) return <p className="text-sm text-muted">No active products to grant.</p>;
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <select value={productId} onChange={(e) => setProductId(e.target.value)} className={`${inputCls} max-w-sm`} aria-label="Product">
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
        <button
          disabled={pending}
          onClick={() => confirm("Give this student free access to the selected product?") && run(() => grantAccessAction(userId, productId))}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          Grant access
        </button>
      </div>
      {error && <p role="alert" className="text-sm text-danger">{error}</p>}
    </div>
  );
}

export function RevokeButton({ userId, entitlementId }: { userId: string; entitlementId: string }) {
  const { pending, run } = useRun();
  return (
    <button disabled={pending} className="text-xs text-danger underline" onClick={() => confirm("End this access now?") && run(() => revokeEntitlementAction(userId, entitlementId))}>
      Revoke
    </button>
  );
}

export function RefundedButton({ userId, orderId }: { userId: string; orderId: string }) {
  const { pending, run } = useRun();
  return (
    <button
      disabled={pending}
      className="text-xs text-danger underline"
      onClick={() =>
        confirm("Mark as refunded? Do this AFTER you refunded the money from the Razorpay dashboard. It ends the student's access; it does not send any money.") &&
        run(() => markRefundedAction(userId, orderId))
      }
    >
      Mark refunded
    </button>
  );
}
