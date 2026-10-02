import Link from "next/link";
import { AuthCta } from "./auth-cta";
import { FREE_MOCK_HREF } from "@/lib/site";
import { Logo } from "./logo";
import { ExploreButton } from "./explore-button";
import { MobileMenu } from "./mobile-menu";

/** Partner travel/culture guide for students who want to read more about Himachal. */
const EXPLORE_HREF = "https://knowyourhimachal.in/";

const nav = [
  { href: "/exams", label: "Exams" },
  { href: "/tests", label: "Mock Tests" },
  { href: "/previous-year-papers", label: "Previous Papers" },
  { href: "/blog", label: "Exam Updates" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 md:h-16 md:gap-6">
        <Logo />
        <nav className="ml-4 hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-primary">
              {n.label}
            </Link>
          ))}
          <ExploreButton href={EXPLORE_HREF} />
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href={FREE_MOCK_HREF}
            className="hidden h-11 items-center rounded-xl px-3 text-sm font-semibold text-accent-ink hover:bg-accent-soft sm:inline-flex"
          >
            Free Mock
          </Link>
          <AuthCta />
          <MobileMenu links={[...nav, { href: EXPLORE_HREF, label: "Explore" }]} />
        </div>
      </div>
    </header>
  );
}
