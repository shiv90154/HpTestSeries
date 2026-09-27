import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { biz } from "@/lib/business";
import { site } from "@/lib/site";

// Static; the footer lists exams from the DB.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply when you use ${site.name} mock tests and test series.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" intro="Please read these terms before using the site or buying a test series.">
      <p>
        These terms are an agreement between you and <strong>{biz("legalName")}</strong>, which operates {site.name} (
        {site.url}). By using the site you accept these terms, our <Link href="/privacy">Privacy Policy</Link> and our{" "}
        <Link href="/refund-policy">Refund Policy</Link>.
      </p>

      <h2>1. What we offer</h2>
      <p>
        {site.name} provides online mock tests, previous-year papers, solutions and performance analysis for Himachal Pradesh
        government recruitment exams. Some tests are free; others are part of paid test series or passes.
      </p>
      <p>
        <strong>{site.name} is an independent practice platform.</strong> It is not affiliated with, endorsed by or connected to
        HPPSC, HPRCA, HPBOSE, HP Police or any government body. Exam patterns, syllabus and dates can change — always confirm
        official details from the official notification. Practising on this site does not guarantee selection in any exam.
      </p>

      <h2>2. Your account</h2>
      <ul>
        <li>You need a verified mobile number (or Google account) to save attempts, see ranks or buy a series.</li>
        <li>An account is for one person. Do not share your login or sell or transfer access.</li>
        <li>Keep your OTP private. You are responsible for activity on your account.</li>
        <li>Give accurate details. We may suspend accounts that use false information.</li>
      </ul>

      <h2>3. Purchases and access</h2>
      <ul>
        <li>Prices are in Indian Rupees and include applicable GST unless stated otherwise.</li>
        <li>
          Each series or pass shows its validity (a number of days, or until a fixed date). Access ends when the validity
          ends, and tests cannot be attempted after that.
        </li>
        <li>
          Tests in a series may be released on a schedule, as shown on the series page. The number of tests may be increased
          but will not be reduced below what was advertised at the time of purchase.
        </li>
        <li>
          Payments are processed by our payment partner. Refunds follow our <Link href="/refund-policy">Refund Policy</Link>.
        </li>
      </ul>

      <h2>4. Fair use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>copy, screenshot, record, download or share our questions, solutions or tests — including on Telegram, WhatsApp, YouTube or other sites — or sell them;</li>
        <li>use bots, scripts or scrapers, or try to access answers, other users’ data or admin areas;</li>
        <li>use multiple accounts or any other method to manipulate ranks or leaderboards;</li>
        <li>interfere with the site’s security or performance.</li>
      </ul>
      <p>
        Attempts that look suspicious may be excluded from rankings. We may suspend or close accounts that break these rules,
        without refund where the misuse is serious.
      </p>

      <h2>5. Content and accuracy</h2>
      <p>
        All questions, solutions, text, design and software on the site belong to us or our licensors and are protected by
        copyright. Previous-year questions are reproduced for educational practice. We check our content carefully, but errors
        can happen — please use the <strong>Report</strong> button on any question. When we correct an answer, scores are
        recalculated.
      </p>

      <h2>6. Availability</h2>
      <p>
        We aim to keep the site available at all times but cannot guarantee uninterrupted service. Your answers are saved as you
        go; if a problem on our side stops you from completing a paid test, contact us and we will reset the attempt or extend
        your access.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        The site is provided “as is”. To the extent allowed by law, we are not liable for indirect or consequential losses,
        including exam results. Our total liability for any claim is limited to the amount you paid us in the 12 months before
        the claim.
      </p>

      <h2>8. Changes and termination</h2>
      <p>
        We may update these terms; the date at the top shows the latest version. Continuing to use the site means you accept the
        updated terms. You may stop using the site and ask us to delete your account at any time.
      </p>

      <h2>9. Governing law and disputes</h2>
      <p>
        These terms are governed by the laws of India. Courts at {biz("jurisdictionCity")}, Himachal Pradesh have exclusive
        jurisdiction. Please contact us first — most issues are resolved quickly.
      </p>

      <h2>10. Contact</h2>
      <p>
        {biz("legalName")}, {biz("address")}. Email <a href={`mailto:${biz("email")}`}>{biz("email")}</a>, phone {biz("phone")}.
        Grievance Officer: {biz("grievanceOfficer")}.
      </p>
    </LegalPage>
  );
}
