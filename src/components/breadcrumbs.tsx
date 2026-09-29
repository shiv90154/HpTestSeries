import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

/**
 * Visible breadcrumb trail (the BreadcrumbList JSON-LD is separate). Links are 40px tall so they are easy to
 * tap on phones; `current` is the page itself and is not a link. `light` is for dark hero backgrounds.
 */
export function Breadcrumbs({ links, current, light = false }: { links: { href: string; label: string }[]; current?: string; light?: boolean }) {
  const chevron = <ChevronRight className="size-4 shrink-0" aria-hidden />;
  return (
    <nav aria-label="Breadcrumb" className={`flex min-w-0 items-center gap-1.5 text-sm ${light ? "text-white/70" : "text-muted"}`}>
      {links.map((l, i) => (
        <Fragment key={l.href}>
          {i > 0 && chevron}
          <Link href={l.href} className={`inline-flex min-h-10 items-center ${light ? "hover:text-white" : "hover:text-primary"}`}>
            {l.label}
          </Link>
        </Fragment>
      ))}
      {current && (
        <>
          {chevron}
          <span aria-current="page" className={`min-w-0 truncate ${light ? "text-white" : "text-foreground"}`}>
            {current}
          </span>
        </>
      )}
    </nav>
  );
}
