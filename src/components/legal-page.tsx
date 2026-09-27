import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { LEGAL_LINKS, business } from "@/lib/business";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { card } from "./ui";

// Long-form text styling without a typography plugin.
const prose =
  "space-y-4 text-[15px] leading-relaxed text-foreground/90 [&_a]:text-primary [&_a]:underline [&_h2]:pt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:pt-2 [&_h3]:font-semibold [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-6 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6";

export function LegalPage({ title, intro, children, showUpdated = true }: { title: string; intro?: string; children: React.ReactNode; showUpdated?: boolean }) {
  const updated = new Date(`${business.policiesUpdated}T00:00:00+05:30`).toLocaleDateString("en-IN", { dateStyle: "long", timeZone: "Asia/Kolkata" });
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-foreground">{title}</span>
        </nav>
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {showUpdated && <p className="text-sm text-muted">Last updated: {updated}</p>}
          {intro && <p className="text-muted">{intro}</p>}
        </header>
        <article className={`${card} ${prose} p-6 sm:p-8`}>{children}</article>
        <nav aria-label="Policies" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted hover:text-primary">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
