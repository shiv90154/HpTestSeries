import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { biz } from "@/lib/business";
import { site } from "@/lib/site";

// Static; the footer lists exams from the DB.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal data.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" intro={`This policy explains what personal data ${site.name} collects, why, and the choices you have.`}>
      <p>
        {site.name} ({site.url}) is operated by <strong>{biz("legalName")}</strong> (“we”, “us”). We process personal data in
        line with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000 and its rules. By
        creating an account or using the site, you agree to this policy.
      </p>

      <h2>1. What we collect</h2>
      <ul>
        <li>
          <strong>Account details:</strong> your mobile number (for OTP login), your name, and — if you sign in with Google —
          your email address and profile photo.
        </li>
        <li>
          <strong>Profile choices:</strong> your district and preferred language, if you provide them.
        </li>
        <li>
          <strong>Test activity:</strong> the tests you start, your answers, time spent per question, scores, ranks and any
          question errors you report.
        </li>
        <li>
          <strong>Payments:</strong> what you bought, the amount, and order/payment IDs. Card, UPI and bank details are entered
          on our payment partner’s secure page and are <strong>never stored by us</strong>.
        </li>
        <li>
          <strong>Technical data:</strong> IP address, browser and device type, kept with your login session and used for
          security (for example, to limit repeated OTP requests).
        </li>
      </ul>
      <p>
        You can take free tests without an account. Answers from a free test taken without logging in stay in your browser and
        are only sent to us to calculate your score; they are not stored against you.
      </p>

      <h2>2. Why we use it</h2>
      <ul>
        <li>To create and secure your account and log you in.</li>
        <li>To run tests, save your progress, calculate scores, ranks and percentiles, and show your performance analysis.</li>
        <li>To process payments, give you access to what you bought, issue invoices and handle refunds.</li>
        <li>To answer your support requests and fix questions you report.</li>
        <li>To prevent fraud, cheating and abuse, and to meet legal and tax obligations.</li>
      </ul>
      <p>
        We do not sell your personal data, and we do not use it for third-party advertising. We will ask for your consent
        before sending promotional messages.
      </p>

      <h2>3. Who we share it with</h2>
      <p>Only with service providers who help us run the site, and only what they need:</p>
      <ul>
        <li>SMS/OTP provider (MSG91) — your mobile number, to send login codes.</li>
        <li>Google — if you choose Google sign-in.</li>
        <li>Payment gateway (Razorpay) — to process your payment.</li>
        <li>Hosting and database providers — to store and serve the site and your data securely.</li>
      </ul>
      <p>
        We may also disclose data when required by law or a valid order of a court or government authority. Other students
        never see your phone number or email; rank lists show only your rank and score.
      </p>

      <h2>4. Cookies</h2>
      <p>
        We use only essential cookies that keep you logged in and protect your session. We do not use advertising cookies. If
        we add privacy-friendly analytics in future, we will update this policy first.
      </p>

      <h2>5. How long we keep it</h2>
      <p>
        We keep your account and test history while your account is active. If you ask us to delete your account, we delete or
        anonymise your personal data within 30 days, except payment and invoice records, which tax laws require us to keep
        (currently up to 8 years).
      </p>

      <h2>6. Your rights</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>give you a summary of the personal data we hold about you;</li>
        <li>correct or update inaccurate data;</li>
        <li>delete your account and personal data (subject to section 5);</li>
        <li>withdraw consent you gave earlier — this does not affect processing already done;</li>
        <li>nominate another person to exercise these rights on your behalf in case of death or incapacity.</li>
      </ul>
      <p>
        Write to <a href={`mailto:${biz("email")}`}>{biz("email")}</a> from your registered email, or from any email mentioning
        your registered mobile number. We may verify your identity before acting on a request.
      </p>

      <h2>7. Children</h2>
      <p>
        {site.name} is meant for candidates preparing for government recruitment exams, who are generally 18 or older. If you
        are under 18, use the site only with the consent and supervision of a parent or guardian.
      </p>

      <h2>8. Security</h2>
      <p>
        Data is sent over HTTPS, stored with access controls, and staff access is limited to what their role needs. No method
        of storage or transfer is completely secure, but we work to protect your data and will notify you and the authorities
        of a breach as the law requires.
      </p>

      <h2>9. Changes</h2>
      <p>
        We may update this policy. The date at the top shows the latest version; for significant changes we will notify you on
        the site or by SMS/email.
      </p>

      <h2>10. Grievance Officer</h2>
      <p>
        For any complaint about your personal data, contact our Grievance Officer: <strong>{biz("grievanceOfficer")}</strong>,{" "}
        <a href={`mailto:${biz("email")}`}>{biz("email")}</a>. We acknowledge complaints within 24 hours and
        resolve them within 15 days. If you are not satisfied, you may approach the Data Protection Board of India. See also our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
