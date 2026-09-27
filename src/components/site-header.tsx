import Link from "next/link";
import { AuthCta } from "./auth-cta";
import { Logo } from "./logo";

const nav = [
  { href: "/exams", label: "Exams" },
  { href: "/tests", label: "Mock Tests" },
  { href: "/#pricing", label: "Pricing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4">
        <Logo />
        <nav className="ml-4 hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-primary">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/tests/hp-gk-free-mock-1"
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-accent-strong hover:bg-accent-soft sm:inline-flex"
          >
            Free Mock
          </Link>
          <AuthCta />
        </div>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-border/70 px-4 py-2 text-sm font-medium text-muted md:hidden">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="whitespace-nowrap hover:text-primary">
            {n.label}
          </Link>
        ))}
        <Link href="/tests/hp-gk-free-mock-1" className="whitespace-nowrap text-accent-strong">
          Free Mock
        </Link>
      </nav>
    </header>
  );
}
