import Link from "next/link";
import { site } from "@/lib/site";

/**
 * "Answer bubble" mark: a selected CBT/OMR option with Himachal peaks and a sun inside.
 * The peaks' base is an arc of the inner circle (no clipPath), so several marks on one page
 * never share SVG ids. Keep in sync with src/app/icon.svg and src/app/apple-icon.tsx.
 */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#1e4fd8" />
      <circle cx="20" cy="20" r="14.5" fill="none" stroke="#ffffff" strokeWidth="2.6" />
      <circle cx="20" cy="20" r="11" fill="#ffffff" />
      <circle cx="25.5" cy="14.5" r="2.6" fill="#f59e0b" />
      <path d="M10.74 25.93 L15 19 L19.5 25 L23.5 20 L28.76 26.65 A11 11 0 0 1 10.74 25.93 Z" fill="#1e4fd8" />
    </svg>
  );
}

export function Logo({ light = false, href = "/", tagline = true }: { light?: boolean; href?: string; tagline?: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <LogoMark className="size-9 shrink-0" />
      <span className="grid leading-none">
        <span className={`whitespace-nowrap text-lg font-bold tracking-tight ${light ? "text-white" : "text-foreground"}`}>
          HP <span className={light ? "text-accent" : "text-primary"}>Test Series</span>
        </span>
        {tagline && (
          <span lang="hi" className={`mt-1 hidden whitespace-nowrap text-[11px] font-medium sm:block ${light ? "text-white/75" : "text-muted"}`}>
            हिमाचल की परीक्षा तैयारी
          </span>
        )}
      </span>
    </Link>
  );
}
