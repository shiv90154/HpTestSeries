import Link from "next/link";
import { examLabel, getCatalog, getPublishedPosts } from "@/modules/catalog/queries";
import { FREE_MOCK_HREF, site, WHATSAPP_GROUP_URL } from "@/lib/site";
import { LEGAL_LINKS } from "@/lib/business";
import { INSTAGRAM_URL, YOUTUBE_URL } from "@/lib/schema";
import { AuthFooterLink } from "./auth-cta";
import { Logo } from "./logo";
import { PublicBottomNav } from "./public-bottom-nav";
import { TrackedLink } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-group";

/** Footer links are 40px tall so they are easy to tap on phones. */
const link = "inline-block py-2.5 hover:text-accent md:py-1.5";
const heading = "mb-2 text-sm font-semibold uppercase tracking-wider text-white";

export async function SiteFooter() {
  const [catalog, latest] = await Promise.all([getCatalog(), getPublishedPosts({ take: 4 })]);
  // Footer lists the best-stocked exams (a link from every page helps them rank); the rest live on /exams.
  const exams = catalog
    .flatMap((b) => b.exams)
    .sort((a, b) => b.testCount - a.testCount)
    .slice(0, 8);

  return (
    <footer className="mt-auto bg-[#0b1733] pb-[calc(4rem+env(safe-area-inset-bottom))] text-slate-300 md:pb-0">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.3fr] lg:gap-6 lg:py-12">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-slate-400">{site.description}</p>
          <p lang="hi" className="text-sm text-slate-400">
            {site.taglineHi}
          </p>
          <TrackedLink
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            event="whatsapp_group_click"
            params={{ place: "footer" }}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#118376] px-4 text-sm font-semibold text-white hover:bg-[#0d6b60]"
          >
            <WhatsAppIcon /> Join WhatsApp group
          </TrackedLink>
          <div className="flex gap-2">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`${site.name} on YouTube`}
              className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`${site.name} on Instagram`}
              className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
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
