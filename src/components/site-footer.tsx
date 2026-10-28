import Link from "next/link";
import { examLabel, getCatalog, getPublishedPosts } from "@/modules/catalog/queries";
import { SITES, freeMockHref } from "@/sites";
import { currentSite } from "@/sites/current";
import { LEGAL_LINKS } from "@/lib/business";
import { AuthFooterLink } from "./auth-cta";
import { Logo } from "./logo";
import { PublicBottomNav } from "./public-bottom-nav";
import { TrackedLink } from "./tracked-link";
import { T } from "./ui-lang";
import { TelegramIcon, WhatsAppIcon } from "./whatsapp-group";

/** Footer links are 40px tall so they are easy to tap on phones. */
const link = "inline-block py-2.5 hover:text-accent md:py-1.5";
const heading = "mb-2 text-sm font-semibold uppercase tracking-wider text-white";

export async function SiteFooter() {
  const site = await currentSite();
  const [catalog, latest] = await Promise.all([getCatalog(site.code), getPublishedPosts(site.code, { take: 4 })]);
  // Footer lists the best-stocked exams (a link from every page helps them rank); the rest live on /exams.
  const exams = catalog
    .flatMap((b) => b.exams)
    .sort((a, b) => b.testCount - a.testCount)
    .slice(0, 8);

  return (
    <footer className="mt-auto bg-footer pb-[calc(4rem+env(safe-area-inset-bottom))] text-slate-300 md:pb-0">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.3fr] lg:gap-6 lg:py-12">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-slate-400">{site.pa ? <T en={site.description} pa={site.pa.description} /> : site.description}</p>
          <p lang="hi" className="text-sm text-slate-400">
            {site.taglineHi}
          </p>
          {site.whatsappGroupUrl && (
            <TrackedLink
              href={site.whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              event="whatsapp_group_click"
              params={{ place: "footer" }}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#118376] px-4 text-sm font-semibold text-white hover:bg-[#0d6b60]"
            >
              <WhatsAppIcon /> <T en="Join WhatsApp group" pa="WhatsApp ਗਰੁੱਪ ਨਾਲ ਜੁੜੋ" />
            </TrackedLink>
          )}
          <div className="flex gap-2">
            {site.social.youtube && (
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={`${site.name} on YouTube`}
                className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                </svg>
              </a>
            )}
            {site.social.instagram && (
              <a
                href={site.social.instagram}
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
            )}
            {site.social.telegram && (
              <a
                href={site.social.telegram}
                target="_blank"
                rel="noopener noreferrer me"
                aria-label={`${site.name} on Telegram`}
                className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 hover:text-white"
              >
                <TelegramIcon className="size-5" />
              </a>
            )}
          </div>
        </div>
        <div>
          <h2 className={heading}>
            <T en="Practice" pa="ਅਭਿਆਸ" />
          </h2>
          <ul className="text-sm">
            <li>
              <Link href={freeMockHref(site)} className={link}>
                <T en={`Free ${site.statePage.title} Mock Test`} pa={`ਮੁਫ਼ਤ ${site.statePage.title} ਮੌਕ ਟੈਸਟ`} />
              </Link>
            </li>
            <li>
              <Link href="/tests" className={link}>
                <T en="All Mock Tests" pa="ਸਾਰੇ ਮੌਕ ਟੈਸਟ" />
              </Link>
            </li>
            <li>
              <Link href="/exams" className={link}>
                <T en={`All ${site.stateAdj} Exams`} pa="ਪੰਜਾਬ ਦੀਆਂ ਸਾਰੀਆਂ ਪ੍ਰੀਖਿਆਵਾਂ" />
              </Link>
            </li>
            <li>
              <Link href="/blog" className={link}>
                <T en="Exam Updates & Notifications" pa="ਪ੍ਰੀਖਿਆ ਅਪਡੇਟ ਅਤੇ ਨੋਟੀਫਿਕੇਸ਼ਨ" />
              </Link>
            </li>
            <li>
              <AuthFooterLink className={link} />
            </li>
          </ul>
        </div>
        {latest.items.length > 0 && (
          <div>
            <h2 className={heading}>
              <T en="Latest updates" pa="ਤਾਜ਼ਾ ਅਪਡੇਟ" />
            </h2>
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
          <h2 className={heading}>
            <T en="Help" pa="ਮਦਦ" />
          </h2>
          <ul className="text-sm">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  <T en={l.label} pa={l.labelPa} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {exams.length > 0 && (
          <div>
            <h2 className={heading}>
              <T en="Popular exams" pa="ਪ੍ਰਸਿੱਧ ਪ੍ਰੀਖਿਆਵਾਂ" />
            </h2>
            <ul className="text-sm">
              {exams.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className={link}>
                    <T en={`${examLabel(e.bodySlug, e.name)} Mock Test`} pa={`${examLabel(e.bodySlug, e.name)} ਮੌਕ ਟੈਸਟ`} />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/exams" className={`${link} font-medium text-accent`}>
                  <T en="View all exams →" pa="ਸਾਰੀਆਂ ਪ੍ਰੀਖਿਆਵਾਂ ਵੇਖੋ →" />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-white/10">
        {/* The sister sites, linked from every page of each other so a new one is found and crawled. */}
        <nav aria-label="Other states" className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-5 px-4 pt-5 text-sm">
          <span className="font-semibold text-white">
            <T en="Other states:" pa="ਹੋਰ ਰਾਜ:" />
          </span>
          {Object.values(SITES)
            .filter((s) => s.code !== site.code)
            .map((s) => (
              <a key={s.code} href={s.url} className={link}>
                {s.stateName} Mock Tests ({s.name})
              </a>
            ))}
        </nav>
        <p className="mx-auto w-full max-w-6xl px-4 py-5 text-xs text-slate-400">
          © {new Date().getFullYear()} {site.name}.{" "}
          <T
            en={`An independent practice platform — not affiliated with ${site.disclaimerBodies} or any government body.`}
            pa={`ਇੱਕ ਸੁਤੰਤਰ ਅਭਿਆਸ ਪਲੇਟਫਾਰਮ — ${site.disclaimerBodies} ਜਾਂ ਕਿਸੇ ਵੀ ਸਰਕਾਰੀ ਸੰਸਥਾ ਨਾਲ ਸੰਬੰਧਿਤ ਨਹੀਂ।`}
          />
        </p>
      </div>
      <PublicBottomNav />
    </footer>
  );
}
