import Link from "next/link";
import { site } from "@/lib/site";

export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#1e4fd8" />
      <path d="M6 30 L15 15 L20 22 L25 13 L34 30 Z" fill="#ffffff" />
      <path d="M22.4 17.4 L25 13 L27.7 17.8 L25.6 16.7 L24.2 18.1 Z" fill="#f59e0b" />
      <path d="M12.6 19.4 L15 15 L17.3 18.6 L15.9 18 L14.4 19.6 Z" fill="#f59e0b" />
    </svg>
  );
}

export function Logo({ light = false, href = "/" }: { light?: boolean; href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <LogoMark />
      <span className={`text-lg font-bold tracking-tight ${light ? "text-white" : "text-foreground"}`}>
        HP<span className={light ? "text-accent" : "text-primary"}>Test</span>Series
      </span>
    </Link>
  );
}
