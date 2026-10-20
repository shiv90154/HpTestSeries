"use client";

import Link from "next/link";
import { brandMarkInner } from "@/lib/brand-mark";
import { useSite } from "@/sites/provider";

/** The site's "answer bubble" mark (src/lib/brand-mark.ts). */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  const { logo } = useSite();
  return <svg viewBox="0 0 40 40" className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: brandMarkInner(logo) }} />;
}

export function Logo({ light = false, href = "/", tagline = true }: { light?: boolean; href?: string; tagline?: boolean }) {
  const site = useSite();
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <LogoMark className="size-9 shrink-0" />
      <span className="grid leading-none">
        <span className={`whitespace-nowrap text-lg font-bold tracking-tight ${light ? "text-white" : "text-foreground"}`}>
          {site.logo.initials} <span className={light ? "text-accent" : "text-primary"}>Test Series</span>
        </span>
        {tagline && (
          <span lang="hi" className={`mt-1 hidden whitespace-nowrap text-[11px] font-medium sm:block ${light ? "text-white/75" : "text-muted"}`}>
            {site.stateAdjHi} की परीक्षा तैयारी
          </span>
        )}
      </span>
    </Link>
  );
}
