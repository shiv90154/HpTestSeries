import { BadgeIndianRupee, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { rupees } from "@/lib/money";
import type { PublicProduct } from "@/modules/commerce/product-service";
import { btn } from "./ui";

const PLAN_ITEMS: Record<string, string[]> = {
  SERIES: ["Full mock tests", "Previous-year style questions", "Sectional & topic tests", "Detailed analysis"],
  PACK: ["Multiple exam series", "Full mock tests & PYQs", "Sectional & topic tests", "Detailed analysis"],
  PASS: ["Every Himachal exam", "All mock tests & sectional tests", "All previous-year papers", "Best value for serious aspirants"],
};

/** Card for one product on sale (an exam series, a pack or the all-access pass). */
export function productPlan(p: PublicProduct) {
  // Only the total is shown, never a mocks/sectional split; older titles may still carry one after a dash
  const [name] = p.title.split(/\s+[—–]\s+/);
  const items = PLAN_ITEMS[p.kind] ?? PLAN_ITEMS.SERIES;
  const count = p.kind !== "PASS" && p.testCount > 0 ? `${p.testCount} ${p.testCount === 1 ? "test" : "tests"}` : null;
  return {
    name,
    price: rupees(p.priceInPaise),
    note: p.validityDays ? `valid ${p.validityDays} days` : "one-time",
    items: count ? [count, ...items] : items,
    cta: { href: `/buy/${p.slug}`, label: "Buy now" },
  };
}

/** A pricing card. `badge` highlights it (the plan we recommend); `children` go below the feature list. */
export function Plan(props: {
  name: string;
  price: string;
  note: string;
  items: string[];
  badge?: string;
  soon?: boolean;
  cta?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative flex flex-col rounded-2xl border bg-background p-5 md:p-6 ${props.badge ? "border-primary shadow-xl" : "border-border"}`}>
      {props.badge && <span className="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">{props.badge}</span>}
      {props.soon && <span className="absolute right-5 top-5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-ink">Launching soon</span>}
      <h3 className="flex items-center gap-2 font-semibold">
        <BadgeIndianRupee className="size-5 text-primary" /> {props.name}
      </h3>
      <p className="mt-4">
        <span className="text-4xl font-bold">{props.price}</span>
        <span className="ml-1 text-sm text-muted">{props.note}</span>
      </p>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm">
        {props.items.map((i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> {i}
          </li>
        ))}
      </ul>
      {props.children}
      {props.cta && (
        <Link href={props.cta.href} className={`${btn("primary")} mt-6`}>
          {props.cta.label}
        </Link>
      )}
    </div>
  );
}
