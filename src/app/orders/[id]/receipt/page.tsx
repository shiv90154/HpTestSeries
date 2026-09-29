import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/logo";
import { biz } from "@/lib/business";
import { rupees } from "@/lib/money";
import { site } from "@/lib/site";
import { getReceipt } from "@/modules/commerce/purchases";
import { requireUser } from "@/modules/identity/session";
import { PrintButton } from "./print-button";

export const metadata: Metadata = { title: "Payment receipt", robots: { index: false, follow: false } };

const IST = { timeZone: "Asia/Kolkata" } as const;
const day = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", ...IST });
const dayTime = (d: Date) => d.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", ...IST });

// A payment receipt, not a GST tax invoice: the seller has no GSTIN yet, so no GST is charged or shown.
export default async function ReceiptPage({ params }: PageProps<"/orders/[id]/receipt">) {
  const { id } = await params;
  const user = await requireUser(`/orders/${id}/receipt`);
  const r = await getReceipt(user.id, id);
  if (!r) notFound();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:py-10 print:max-w-none print:p-0">
      <div className="mb-4 flex items-center justify-between gap-3 print:hidden">
        <Link href="/profile#purchases" className="text-sm font-medium text-muted hover:text-primary">
          ← My purchases
        </Link>
        <PrintButton />
      </div>

      <article className="relative space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8 print:rounded-none print:border-0 print:p-0">
        {r.status === "REFUNDED" && (
          <p className="absolute right-6 top-6 rotate-6 rounded-lg border-2 border-danger px-3 py-1 text-lg font-bold uppercase text-danger">Refunded</p>
        )}
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
          <div className="space-y-2">
            <Logo />
            <div className="text-xs leading-relaxed text-muted">
              <p className="font-semibold text-foreground">{biz("legalName")}</p>
              <p>{biz("address")}</p>
              <p>
                {biz("email")} · {biz("phone")}
              </p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-xl font-bold">Payment receipt</h1>
            <p className="text-xs text-muted">Receipt no. {r.id}</p>
            <p className="text-xs text-muted">Date {day(r.paidAt)}</p>
          </div>
        </header>

        <section className="text-sm">
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">Billed to</h2>
          <p className="font-medium">{r.customer.name}</p>
          <p className="text-muted">{r.customer.email}</p>
          {r.customer.phoneNumber && <p className="text-muted">{r.customer.phoneNumber}</p>}
        </section>

        <table className="w-full text-sm">
          <thead className="border-y border-border text-left text-xs text-muted">
            <tr>
              <th className="py-2 font-medium">Item</th>
              <th className="py-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border align-top">
              <td className="py-3">
                <p className="font-medium">{r.product.title}</p>
                <p className="text-xs text-muted">
                  {site.name} online test access
                  {r.access && ` · ${day(r.access.startsAt)} – ${day(r.access.expiresAt)}`}
                </p>
              </td>
              <td className="py-3 text-right tabular-nums">{rupees(r.amountPaise + r.discountPaise)}</td>
            </tr>
            {r.discountPaise > 0 && (
              <tr className="border-b border-border">
                <td className="py-2 text-muted">Coupon{r.couponCode ? ` ${r.couponCode}` : ""}</td>
                <td className="py-2 text-right tabular-nums text-success">−{rupees(r.discountPaise)}</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="pt-3 text-right font-semibold">Total paid</td>
              <td className="pt-3 text-right text-lg font-bold tabular-nums">{rupees(r.amountPaise)}</td>
            </tr>
            <tr>
              <td colSpan={2} className="pt-1 text-right text-xs text-muted">
                No GST charged (seller not registered under GST)
              </td>
            </tr>
          </tfoot>
        </table>

        <section className="grid gap-1 rounded-xl bg-surface-muted p-4 text-xs text-muted sm:grid-cols-2 print:bg-transparent print:p-0">
          <p>
            Paid on: <span className="text-foreground">{dayTime(r.paidAt)}</span>
          </p>
          <p>
            Paid via: <span className="text-foreground">{r.amountPaise === 0 ? "100% coupon (nothing to pay)" : "Razorpay"}</span>
          </p>
          {r.razorpayPaymentId && (
            <p className="break-all">
              Payment ID: <span className="text-foreground">{r.razorpayPaymentId}</span>
            </p>
          )}
          {r.razorpayOrderId && (
            <p className="break-all">
              Order ID: <span className="text-foreground">{r.razorpayOrderId}</span>
            </p>
          )}
        </section>

        <p className="text-center text-xs text-muted">
          Computer-generated receipt; no signature required. Questions? Write to {biz("email")}.
        </p>
      </article>
    </main>
  );
}
