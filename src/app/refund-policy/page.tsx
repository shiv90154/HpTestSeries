import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { biz, bizPhones } from "@/lib/business";
import { site } from "@/lib/site";

// Static; the footer lists exams from the DB.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: `When and how you can get a refund for a ${site.name} test series or pass.`,
  alternates: { canonical: "/refund-policy" },
};

const REFUND_WINDOW_DAYS = 7;

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      intro="Our test series are digital products that you can use immediately, so refunds are limited to the cases below."
    >
      <h2>1. Try before you buy</h2>
      <p>
        Every exam has free mock tests in the same CBT format as the paid series. Please attempt a free test first to make sure
        the platform suits you.
      </p>

      <h2>2. When you get a full refund</h2>
      <ul>
        <li>
          <strong>Change of mind within {REFUND_WINDOW_DAYS} days:</strong> you ask for a refund within {REFUND_WINDOW_DAYS} days of
          purchase <strong>and</strong> you have not started any test in that series or pass.
        </li>
        <li>
          <strong>Payment debited but purchase failed:</strong> money was deducted but the series was not activated. Such payments
          are usually reversed automatically by the bank/payment gateway; if not, we refund them in full.
        </li>
        <li>
          <strong>Duplicate payment:</strong> you were charged twice for the same product — the extra payment is refunded in full.
        </li>
        <li>
          <strong>Our fault:</strong> the series cannot be delivered as advertised (for example, it is withdrawn) and we cannot
          offer an equivalent replacement.
        </li>
      </ul>

      <h2>3. When refunds are not given</h2>
      <ul>
        <li>After any test in the series or pass has been started, or after {REFUND_WINDOW_DAYS} days from purchase.</li>
        <li>If the exam is postponed or cancelled, or its pattern changes — your access stays valid and we update the tests to the new pattern where needed.</li>
        <li>If the account was suspended for breaking our <Link href="/terms">Terms of Use</Link> (for example, sharing content or logins).</li>
        <li>For partial periods of validity, or because of problems with your own device or internet connection.</li>
      </ul>

      <h2>4. Cancellation</h2>
      <p>
        Purchases are one-time payments — there is no subscription or auto-renewal to cancel. If you do not want to use a series,
        you can request a refund under section 2.
      </p>

      <h2>5. How to request a refund</h2>
      <p>
        The quickest way is the <Link href="/refund-request">refund request page</Link>: it shows your orders and opens WhatsApp or
        email with the order details already filled in. Or do it by hand:
      </p>
      <ol>
        <li>
          Email <a href={`mailto:${biz("email")}`}>{biz("email")}</a> from your registered email, or mention your registered mobile
          number.
        </li>
        <li>Include the order ID or payment ID and the reason for the request.</li>
        <li>We reply within 2 working days.</li>
      </ol>
      <p>
        Approved refunds are made to the original payment method (UPI, card, net banking or wallet) within{" "}
        <strong>5–7 working days</strong> of approval. The exact time your bank takes to show the credit may vary. Access to the
        refunded product ends when the refund is approved.
      </p>

      <h2>6. Contact</h2>
      <p>
        {biz("legalName")} · <a href={`mailto:${biz("email")}`}>{biz("email")}</a> · {bizPhones()} · {biz("supportHours")}
      </p>
    </LegalPage>
  );
}
