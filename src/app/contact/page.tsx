import { Clock, Flag, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { biz, business } from "@/lib/business";
import { site } from "@/lib/site";

// Static; the footer lists exams from the DB.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.name} for help with tests, payments, refunds or your account.`,
  alternates: { canonical: "/contact" },
};

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <div className="text-muted">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const tel = business.phone.replace(/[^\d+]/g, "");
  return (
    <LegalPage title="Contact Us" intro="We usually reply within one working day." showUpdated={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <Row icon={<Mail className="size-5" />} label="Email">
          <a href={`mailto:${biz("email")}`}>{biz("email")}</a>
        </Row>
        <Row icon={<Phone className="size-5" />} label="Phone">
          {tel ? <a href={`tel:${tel}`}>{business.phone}</a> : biz("phone")}
        </Row>
        <Row icon={<Clock className="size-5" />} label="Support hours">
          {biz("supportHours")}
        </Row>
        <Row icon={<MapPin className="size-5" />} label="Address">
          {biz("legalName")}
          <br />
          {biz("address")}
        </Row>
      </div>

      <h2>Payment or access problem?</h2>
      <p>
        Include your registered mobile number and the order ID or payment ID so we can find your purchase quickly. See also our{" "}
        <Link href="/refund-policy">Refund Policy</Link> and <Link href="/shipping-policy">Delivery Policy</Link>.
      </p>

      <h2 className="flex items-center gap-2">
        <Flag className="size-5 text-primary" /> Found a wrong answer or typo?
      </h2>
      <p>
        Use the <strong>Report</strong> button under the question in your test solutions — it reaches our content team directly
        with the exact question, so it gets fixed fastest.
      </p>

      <h2 className="flex items-center gap-2">
        <ShieldCheck className="size-5 text-primary" /> Grievance Officer
      </h2>
      <p>
        {biz("grievanceOfficer")} · <a href={`mailto:${biz("email")}`}>{biz("email")}</a>. Complaints are acknowledged within 24
        hours and resolved within 15 days, as required under the IT Rules, 2021 and the DPDP Act, 2023.
      </p>
    </LegalPage>
  );
}
