import Link from "next/link";
import { examLabel, getCatalog } from "@/modules/catalog/queries";
import { site } from "@/lib/site";
import { LEGAL_LINKS, business } from "@/lib/business";
import { Logo } from "./logo";
import { PublicBottomNav } from "./public-bottom-nav";

export async function SiteFooter() {
  const catalog = await getCatalog();
  const exams = catalog.flatMap((b) => b.exams);

  return (
    <footer className="mt-auto bg-[#0b1733] pb-[calc(4rem+env(safe-area-inset-bottom))] text-slate-300 md:pb-0">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:gap-10 md:py-14 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">{site.description}</p>
          <p className="text-sm text-slate-400">{site.taglineHi}</p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Exams</h2>
          <ul className="space-y-2.5 text-sm">
            {exams.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="hover:text-accent">
                  {examLabel(e.bodySlug, e.name)} Mock Test
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Practice</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/tests/hp-gk-free-mock-1" className="hover:text-accent">
                Free HP GK Mock Test
              </Link>
            </li>
            <li>
              <Link href="/tests" className="hover:text-accent">
                All Mock Tests
              </Link>
            </li>
            <li>
              <Link href="/exams" className="hover:text-accent">
                All Himachal Exams
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-accent">
                Login / Sign up
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Help</h2>
          <ul className="space-y-2.5 text-sm">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-5 space-y-2 text-sm text-slate-400">
            {business.email && (
              <li>
                <a href={`mailto:${business.email}`} className="break-all hover:text-accent">
                  {business.email}
                </a>
              </li>
            )}
            {business.phone && (
              <li>
                <a href={`tel:${business.phone.replace(/[^\d+]/g, "")}`} className="hover:text-accent">
                  {business.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-4 py-5 text-xs text-slate-500">
          © {new Date().getFullYear()} {site.name}. An independent practice platform — not affiliated with HPPSC, HPRCA, HPBOSE,
          HP Police or any government body.
        </p>
      </div>
      <PublicBottomNav />
    </footer>
  );
}
