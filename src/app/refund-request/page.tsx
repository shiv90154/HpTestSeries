import { Mail, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { LegalPage } from "@/components/legal-page";
import { biz } from "@/lib/business";
import { rupees } from "@/lib/money";
import { getMyPurchases } from "@/modules/commerce/purchases";
import { getCurrentUser } from "@/modules/identity/session";

export const metadata: Metadata = {
  title: "Request a refund",
  description: "How to ask for a refund on a purchase. Refunds are handled personally by the owner.",
  robots: { index: false },
};

export default async function RefundRequestPage() {
  await connection(); // shows the signed-in student's own orders
  const user = await getCurrentUser();
  const orders = user ? (await getMyPurchases(user.id)).filter((o) => o.status === "PAID" && o.amountPaise > 0) : [];

  const email = biz("email");
  const digits = biz("phone").replace(/\D/g, "");
  const wa = digits.length === 10 ? `91${digits}` : digits;

  function message(orderId?: string, title?: string) {
    return [
      "Refund request",
      user ? `Name: ${user.name}` : null,
      user ? `Registered email: ${user.email}` : null,
      orderId ? `Order ID: ${orderId}` : "Order ID: ",
      title ? `Product: ${title}` : null,
      "Reason: ",
    ]
      .filter(Boolean)
      .join("\n");
  }
  const mail = (orderId?: string, title?: string) =>
    `mailto:${email}?subject=${encodeURIComponent("Refund request")}&body=${encodeURIComponent(message(orderId, title))}`;
  const whatsapp = (orderId?: string, title?: string) => `https://wa.me/${wa}?text=${encodeURIComponent(message(orderId, title))}`;

  const btn = "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium no-underline hover:border-primary";

  return (
    <LegalPage
      title="Request a refund"
      intro="Refunds are handled personally by the owner. Contact us with your order ID and we will sort it out — no forms, no bots."
      showUpdated={false}
    >
      <h2>Your orders</h2>
      {!user ? (
        <p>
          <Link href="/login?next=%2Frefund-request">Log in</Link> to see your orders and get a message with the details filled in. You
          can also contact us directly below.
        </p>
      ) : orders.length === 0 ? (
        <p>You have no paid orders.</p>
      ) : (
        <ul className="!list-none !pl-0">
          {orders.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{o.productTitle}</p>
                <p className="text-xs text-muted">
                  {o.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })} ·{" "}
                  {rupees(o.amountPaise)} · Order ID {o.id}
                </p>
              </div>
              <a className={btn} href={whatsapp(o.id, o.productTitle)} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <a className={btn} href={mail(o.id, o.productTitle)}>
                <Mail className="size-4" /> Email
              </a>
            </li>
          ))}
        </ul>
      )}

      <h2>Contact directly</h2>
      <ul className="!list-none !pl-0">
        <li className="flex items-center gap-2">
          <Mail className="size-4" /> <a href={mail()}>{email}</a>
        </li>
        <li className="flex items-center gap-2">
          <Phone className="size-4" /> <a href={`tel:+${wa}`}>{biz("phone")}</a> · {biz("supportHours")}
        </li>
      </ul>
      <p>
        Please read the <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link> first. We reply within 2 working days, and
        approved refunds reach your original payment method in 5–7 working days.
      </p>
    </LegalPage>
  );
}
