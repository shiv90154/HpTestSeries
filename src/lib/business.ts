// Who runs the site — shown on the legal and contact pages. Razorpay's website review and the
// IT Rules / DPDP Act need a real name, postal address, email, phone and grievance officer.
// Fill every empty field before going live; the admin overview warns while any is missing.

export const business = {
  /** Legal name exactly as on PAN (proprietor's name, or the company/LLP name) */
  legalName: "Shiv Kumar",
  /** Support email, e.g. support@hptestseries.in */
  email: "hptestseries@gmail.com",
  /** Support phone in +91 format */
  phone: "+91 78768 35326",
  /** Second support phone — optional */
  phone2: "+91 90154 84696",
  /** Full postal address with PIN code — optional; left out of pages while empty */
  address: "",
  /** City whose courts have jurisdiction, e.g. "Shimla" */
  jurisdictionCity: "Hamirpur",
  /** Grievance Officer (IT Rules 2021 / DPDP Act 2023) — can be the owner */
  grievanceOfficer: "Sham",
  supportHours: "Monday to Saturday, 10:00 AM – 6:00 PM IST",
  /** Date the current policies took effect (YYYY-MM-DD) */
  policiesUpdated: "2026-09-27",
} as const;

const labels: Record<keyof typeof business, string> = {
  legalName: "legal name",
  email: "support email",
  phone: "support phone",
  phone2: "second support phone",
  address: "postal address",
  jurisdictionCity: "jurisdiction city",
  grievanceOfficer: "grievance officer",
  supportHours: "support hours",
  policiesUpdated: "policy date",
};

export function missingBusinessDetails(): string[] {
  return (Object.keys(business) as (keyof typeof business)[]).filter((k) => k !== "address" && k !== "phone2" && !business[k].trim()).map((k) => labels[k]);
}

/** Value for display, or a visible placeholder so a missing detail is obvious in review. */
export function biz(key: keyof typeof business): string {
  return business[key].trim() || `[${labels[key]} to be added]`;
}

/** Support numbers that are filled in, as written ("+91 78768 35326"). */
export function supportPhones(): string[] {
  return [business.phone, business.phone2].map((p) => p.trim()).filter(Boolean);
}

/** All support numbers for running text, e.g. "+91 78768 35326 / +91 90154 84696". */
export function bizPhones(): string {
  return supportPhones().join(" / ") || biz("phone");
}

/** tel: link target, e.g. "+917876835326". */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Policy pages, linked from the footer (Razorpay checks the site for these). */
export const LEGAL_LINKS = [
  { href: "/contact", label: "Contact us" },
  { href: "/terms", label: "Terms of use" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/refund-policy", label: "Refund & cancellation" },
  { href: "/shipping-policy", label: "Shipping & delivery" },
] as const;
