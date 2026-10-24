// "Which site" filter for admin screens. Admin lives on the primary domain only and sees every site's data;
// ?site=pb narrows a screen to one domain. The request's own site plays no part here.
import Link from "next/link";
import { SITES, getSite, isSiteCode, type SiteCode } from "@/sites";

/** The site picked with ?site=, or null for all sites. */
export function siteParam(sp: Record<string, string | string[] | undefined>): SiteCode | null {
  return typeof sp.site === "string" && isSiteCode(sp.site) ? sp.site : null;
}

/** Bare canonical domain of a stored site code: "pbtestseries.in". */
export const siteDomain = (code: string) => getSite(code).domains[0];

export function SiteBadge({ code }: { code: string }) {
  return (
    <span className="inline-block whitespace-nowrap rounded-md bg-surface-muted px-2 py-0.5 text-xs font-medium text-muted" title={siteDomain(code)}>
      {getSite(code).logo.initials}
    </span>
  );
}

/** Links to the same screen per site; other query params (search, status) are kept, the page number is dropped. */
export function SiteFilter({
  path,
  current,
  params = {},
}: {
  path: string;
  current: SiteCode | null;
  params?: Record<string, string>;
}) {
  const href = (site: SiteCode | null) => {
    const qs = new URLSearchParams({ ...params, ...(site ? { site } : {}) }).toString();
    return qs ? `${path}?${qs}` : path;
  };
  const options: { site: SiteCode | null; label: string }[] = [
    { site: null, label: "All sites" },
    ...Object.values(SITES).map((s) => ({ site: s.code, label: s.domains[0] })),
  ];

  return (
    <nav aria-label="Site" className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.site === current;
        return (
          <Link
            key={o.label}
            href={href(o.site)}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
              active ? "border-primary bg-primary-soft text-primary" : "border-border bg-surface hover:border-primary hover:text-primary"
            }`}
          >
            {o.label}
          </Link>
        );
      })}
    </nav>
  );
}
