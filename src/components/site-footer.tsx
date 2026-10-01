import Link from "next/link";
import { examLabel, getCatalog, getPublishedPosts } from "@/modules/catalog/queries";
import { FREE_MOCK_HREF, site } from "@/lib/site";
import { LEGAL_LINKS, business } from "@/lib/business";
import { AuthFooterLink } from "./auth-cta";
import { Logo } from "./logo";
import { PublicBottomNav } from "./public-bottom-nav";

/** Footer links are 40px tall so they are easy to tap on phones. */
const link = "inline-block py-2.5 hover:text-accent md:py-1.5";
const heading = "mb-2 text-sm font-semibold uppercase tracking-wider text-white";

export async function SiteFooter() {
  const [catalog, latest] = await Promise.all([getCatalog(), getPublishedPosts({ take: 4 })]);
  // Footer lists only the few best-stocked exams; the rest live on /exams.
  const exams = catalog
    .flatMap((b) => b.exams)
    .sort((a, b) => b.testCount - a.testCount)
    .slice(0, 4);

  return (
    <footer className="mt-auto bg-[#0b1733] pb-[calc(4rem+env(safe-area-inset-bottom))] text-slate-300 md:pb-0">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.3fr] lg:gap-6 lg:py-12">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-slate-400">{site.description}</p>
          <p lang="hi" className="text-sm text-slate-400">
            {site.taglineHi}
          </p>
        </div>
        <div>
          <h2 className={heading}>Practice</h2>
          <ul className="text-sm">
            <li>
              <Link href={FREE_MOCK_HREF} className={link}>
                Free HP GK Mock Test
              </Link>
            </li>
            <li>
              <Link href="/tests" className={link}>
                All Mock Tests
              </Link>
            </li>
            <li>
              <Link href="/exams" className={link}>
                All Himachal Exams
              </Link>
            </li>
            <li>
              <Link href="/blog" className={link}>
                Exam Updates &amp; Notifications
              </Link>
            </li>
            <li>
              <AuthFooterLink className={link} />
            </li>
          </ul>
        </div>
        {latest.items.length > 0 && (
          <div>
            <h2 className={heading}>Latest updates</h2>
            <ul className="text-sm">
              {latest.items.map((p) => (
                <li key={p.slug} className="py-2 md:py-1.5">
                  <Link href={`/blog/${p.slug}`} className="line-clamp-2 leading-snug hover:text-accent">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h2 className={heading}>Help</h2>
          <ul className="text-sm">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-3 text-sm text-slate-400">
            {business.email && (
              <li>
                <a href={`mailto:${business.email}`} className={`${link} break-all`}>
                  {business.email}
                </a>
              </li>
            )}
            {business.phone && (
              <li>
                <a href={`tel:${business.phone.replace(/[^\d+]/g, "")}`} className={link}>
                  {business.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
        {exams.length > 0 && (
          <div>
            <h2 className={heading}>Popular exams</h2>
            <ul className="text-sm">
              {exams.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className={link}>
                    {examLabel(e.bodySlug, e.name)} Mock Test
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/exams" className={`${link} font-medium text-accent`}>
                  View all exams →
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-4 py-5 text-xs text-slate-400">
          © {new Date().getFullYear()} {site.name}. An independent practice platform — not affiliated with HPPSC, HPRCA, HPBOSE,
          HP Police or any government body.
        </p>
      </div>
      <PublicBottomNav />
    </footer>
  );
}
