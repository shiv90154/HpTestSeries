import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { biz } from "@/lib/business";
import { site } from "@/lib/site";

// Static; the footer lists exams from the DB.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: `How and when you get access to a ${site.name} test series after payment.`,
  alternates: { canonical: "/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping & Delivery Policy">
      <h2>Digital delivery only</h2>
      <p>
        {site.name} sells online test series and passes. <strong>Nothing is shipped physically</strong>, and there are no
        delivery charges.
      </p>

      <h2>When you get access</h2>
      <ul>
        <li>
          Access is activated on your account <strong>immediately after your payment is confirmed</strong> — usually within a
          few minutes.
        </li>
        <li>Open your dashboard or the series page while logged in with the same account you paid from to start the tests.</li>
        <li>Tests that are scheduled for later release become available on the dates shown on the series page.</li>
        <li>Access lasts for the validity shown at the time of purchase.</li>
      </ul>

      <h2>If access is not activated</h2>
      <p>
        If your payment succeeded but the series is not active within 2 hours, email{" "}
        <a href={`mailto:${biz("email")}`}>{biz("email")}</a> or call {biz("phone")} with your order ID or payment ID. We will
        activate it or refund you as per our <Link href="/refund-policy">Refund Policy</Link>.
      </p>
    </LegalPage>
  );
}
