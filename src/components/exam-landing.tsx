import { CheckCircle2, ChevronRight, Clock, Languages, MonitorCheck, ShieldCheck, Trophy } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { formatDate } from "@/components/post-card";
import { Mountains } from "@/components/mountains";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackedLink } from "@/components/tracked-link";
import { btn, card } from "@/components/ui";
import { T, Tx } from "@/components/ui-lang";
import { rupees } from "@/lib/money";
import { currentSite } from "@/sites/current";
import { faqPageJsonLd, type Faq } from "@/modules/content/exam-content";
import { SeparateSaving } from "@/components/pricing-plans";
import { perTestLabel } from "@/modules/commerce/value";
import type { ExamOffer } from "@/modules/catalog/queries";
import { startTest } from "@/modules/catalog/start-test";

/** Everything the exam hub and its SEO sub-pages (syllabus, pattern, previous papers) share. */
export type ExamCtx = {
  /** "hprca/clerk": sent with every tracked click. */
  key: string;
  /** SEO label, e.g. "HPRCA Clerk". */
  name: string;
  nameHi: string | null;
  bodyName: string;
  /** "/hprca/clerk" */
  base: string;
  /** Attempt URL of the best free test for this exam, if there is one. */
  startHref: string | null;
  /** Button text for startHref: names the exam only when the test really was made for it. */
  startLabel: string;
  offer: ExamOffer | null;
  /** Which sub-pages have content, so the tabs never link to a 404. */
  has: { syllabus: boolean; pattern: boolean; pyq: boolean };
};

type ExamData = {
  syllabus: string | null;
  pattern: unknown;
  tests: { slug: string; type: string; isFree: boolean; examName: string | null; hasDemo: boolean }[];
  offer: ExamOffer | null;
  nameHi: string | null;
  body: { slug: string; name: string };
  slug: string;
};

/** `stateGk`: the site's state GK test name ("Himachal GK"), offered when the exam has no free test of its own. */
export function buildExamCtx(data: ExamData, label: string, stateGk: string): ExamCtx {
  const start = startTest(data.tests, label, stateGk);
  return {
    key: `${data.body.slug}/${data.slug}`,
    name: label,
    nameHi: data.nameHi,
    bodyName: data.body.name,
    base: `/${data.body.slug}/${data.slug}`,
    startHref: start?.href ?? null,
    startLabel: start?.label ?? "Start free test",
    offer: data.offer,
    has: { syllabus: !!data.syllabus?.trim(), pattern: !!data.pattern, pyq: data.tests.some((t) => t.type === "PYQ" && t.examName) },
  };
}

const year = () => new Date().getFullYear();

/** Disclosure line shown next to the first call to action: this is a practice platform, not the recruiting body. */
export function Disclaimer({ bodyName, className = "text-white/70" }: { bodyName: string; className?: string }) {
  return (
    <p className={`text-xs ${className}`}>
      <T
        en={`Independent practice platform, not affiliated with ${bodyName}. Always read the official notification.`}
        pa={`ਸੁਤੰਤਰ ਅਭਿਆਸ ਪਲੇਟਫਾਰਮ, ${bodyName} ਨਾਲ ਸੰਬੰਧਿਤ ਨਹੀਂ। ਹਮੇਸ਼ਾ ਅਧਿਕਾਰਤ ਨੋਟੀਫਿਕੇਸ਼ਨ ਪੜ੍ਹੋ।`}
      />
    </p>
  );
}

/** Pill links between the exam hub and its sub-pages; only pages that exist are shown. */
export function ExamTabs({ ctx, active }: { ctx: ExamCtx; active: "overview" | "syllabus" | "pattern" | "pyq" }) {
  const tabs = [
    { id: "overview", href: ctx.base, label: "Mock tests" },
    ...(ctx.has.syllabus ? [{ id: "syllabus", href: `${ctx.base}/syllabus`, label: "Syllabus" }] : []),
    ...(ctx.has.pattern ? [{ id: "pattern", href: `${ctx.base}/exam-pattern`, label: "Exam pattern" }] : []),
    ...(ctx.has.pyq ? [{ id: "pyq", href: `${ctx.base}/previous-year-papers`, label: "Previous papers" }] : []),
  ];
  if (tabs.length < 2) return null;
  return (
    <nav aria-label={`${ctx.name} sections`} className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <Link
          key={t.id}
          href={t.href}
          aria-current={t.id === active ? "page" : undefined}
          className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            t.id === active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface hover:border-primary hover:text-primary"
          }`}
        >
          <Tx>{t.label}</Tx>
        </Link>
      ))}
    </nav>
  );
}

/** Price card for the exam's paid series. `placement` tells GA4 which copy of the card was used. */
export async function OfferCard({ ctx, placement, className = "" }: { ctx: ExamCtx; placement: string; className?: string }) {
  const site = await currentSite();
  const offer = ctx.offer;
  if (!offer) return null;
  // Only the total is shown, never a mocks/sectional split; older titles may still carry one after a dash
  const [title] = offer.title.split(/\s+[—–]\s+/);
  const price = rupees(offer.priceInPaise);
  const perTest = perTestLabel(offer.priceInPaise, offer.testCount);
  const pack = offer.pack;
  const items = [
    [`${offer.testCount} ${offer.testCount === 1 ? "test" : "tests"}`, `${offer.testCount} ਟੈਸਟ`],
    ["Detailed solutions in Hindi & English", "ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਵਿਸਥਾਰ ਨਾਲ ਹੱਲ"],
    [`Rank among ${site.stateAdj} aspirants`, "ਪੰਜਾਬ ਦੇ ਉਮੀਦਵਾਰਾਂ ਵਿੱਚ ਰੈਂਕ"],
    ["Section and topic-wise analysis", "ਸੈਕਸ਼ਨ ਅਤੇ ਵਿਸ਼ਾ ਅਨੁਸਾਰ ਵਿਸ਼ਲੇਸ਼ਣ"],
  ];
  return (
    <div className={`relative space-y-4 rounded-2xl border border-primary bg-surface p-5 shadow-lg ${className}`}>
      <span className="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
        <T en="Full test series" pa="ਪੂਰੀ ਟੈਸਟ ਸੀਰੀਜ਼" />
      </span>
      <div className="pt-1">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <p>
        <span className="text-4xl font-bold">{price}</span>
        {perTest && (
          <span className="mt-1 block text-sm font-medium text-primary">
            <T en={`Just ${perTest}`} pa={`ਸਿਰਫ਼ ${perTest}`} />
          </span>
        )}
        <span className="mt-1 block text-sm text-muted">
          {offer.validityDays ? (
            <T en={`Valid ${offer.validityDays} days · no auto-renewal`} pa={`${offer.validityDays} ਦਿਨਾਂ ਲਈ ਵੈਧ · ਆਪਣੇ ਆਪ ਰੀਨਿਊ ਨਹੀਂ`} />
          ) : (
            <T en="One-time payment · no auto-renewal" pa="ਇੱਕ ਵਾਰ ਭੁਗਤਾਨ · ਆਪਣੇ ਆਪ ਰੀਨਿਊ ਨਹੀਂ" />
          )}
        </span>
      </p>
      <ul className="space-y-2 text-sm">
        {items.map(([en, pa]) => (
          <li key={en} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden /> <T en={en} pa={pa} />
          </li>
        ))}
      </ul>
      <TrackedLink
        href={`/buy/${offer.slug}`}
        event="landing_buy_click"
        params={{ exam: ctx.key, placement, price: offer.priceInPaise / 100 }}
        className={btn("primary", "lg", "w-full")}
      >
        <T en={`Buy now for ${price}`} pa={`${price} ਵਿੱਚ ਹੁਣੇ ਖਰੀਦੋ`} />
      </TrackedLink>
      {pack && (
        <div className="space-y-2 rounded-xl border border-border bg-background p-3">
          <p className="text-sm">
            Preparing for more than one post? <b>{pack.title.split(/\s+[—–(]\s*/)[0]}</b> has all {pack.seriesCount} series for{" "}
            <b>{rupees(pack.priceInPaise)}</b>.
          </p>
          <SeparateSaving was={pack.separatePaise} now={pack.priceInPaise} />
          <TrackedLink
            href={`/buy/${pack.slug}`}
            event="landing_buy_click"
            params={{ exam: ctx.key, placement: `${placement}-pack`, price: pack.priceInPaise / 100 }}
            className={btn("outline", "md", "w-full")}
          >
            <T en={`Get the pack for ${rupees(pack.priceInPaise)}`} pa={`${rupees(pack.priceInPaise)} ਵਿੱਚ ਪੈਕ ਲਓ`} />
          </TrackedLink>
        </div>
      )}
      <p className="flex items-center gap-1.5 text-xs text-muted">
        <ShieldCheck className="size-4 shrink-0 text-success" aria-hidden />{" "}
        <T en="Secure payment via Razorpay (UPI, cards, netbanking)" pa="Razorpay ਰਾਹੀਂ ਸੁਰੱਖਿਅਤ ਭੁਗਤਾਨ (UPI, ਕਾਰਡ, ਨੈੱਟਬੈਂਕਿੰਗ)" />
      </p>
    </div>
  );
}

const steps = (initials: string) => [
  ["Take a free test", "Start the free mock now. No signup is needed for free tests.", "ਮੁਫ਼ਤ ਟੈਸਟ ਦਿਓ", "ਹੁਣੇ ਮੁਫ਼ਤ ਮੌਕ ਸ਼ੁਰੂ ਕਰੋ। ਮੁਫ਼ਤ ਟੈਸਟਾਂ ਲਈ ਸਾਈਨ ਅੱਪ ਦੀ ਲੋੜ ਨਹੀਂ।"],
  ["Attempt in real CBT mode", "Timer, question palette, Mark for Review and Save & Next, in Hindi or English.", "ਅਸਲ CBT ਮੋਡ ਵਿੱਚ ਟੈਸਟ ਦਿਓ", "ਟਾਈਮਰ, ਪ੍ਰਸ਼ਨ ਪੈਲੇਟ, Mark for Review ਅਤੇ Save & Next, ਹਿੰਦੀ ਜਾਂ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ।"],
  ["Analyse and improve", `See your score, ${initials} rank, a solution for every question and your weak topics.`, "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ ਅਤੇ ਸੁਧਾਰੋ", "ਆਪਣਾ ਸਕੋਰ, ਪੰਜਾਬ ਰੈਂਕ, ਹਰ ਪ੍ਰਸ਼ਨ ਦਾ ਹੱਲ ਅਤੇ ਕਮਜ਼ੋਰ ਵਿਸ਼ੇ ਵੇਖੋ।"],
];

export async function HowItWorks() {
  const site = await currentSite();
  return (
    <ol className="grid gap-4 sm:grid-cols-3">
      {steps(site.logo.initials).map(([t, d, tPa, dPa], i) => (
        <li key={t} className={`${card} relative p-5 pt-6`}>
          <span className="absolute -top-3.5 left-5 grid size-8 place-items-center rounded-full bg-accent text-sm font-bold text-[#1f1300] shadow">{i + 1}</span>
          <h3 className="font-semibold">
            <T en={t} pa={tPa} />
          </h3>
          <p className="mt-1 text-sm text-muted">
            <T en={d} pa={dPa} />
          </p>
        </li>
      ))}
    </ol>
  );
}

const perks = (initials: string) => [
  { icon: MonitorCheck, label: "Real CBT interface", pa: "ਅਸਲ CBT ਸਕਰੀਨ" },
  { icon: Languages, label: "Hindi & English", pa: "ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ" },
  { icon: Trophy, label: `${initials} rank on every test`, pa: "ਹਰ ਟੈਸਟ ਵਿੱਚ ਪੰਜਾਬ ਰੈਂਕ" },
  { icon: Clock, label: "Instant solutions", pa: "ਤੁਰੰਤ ਹੱਲ" },
];

/** Closing call to action band, repeated at the end of every exam page. */
export async function ExamFinalCta({ ctx }: { ctx: ExamCtx }) {
  const site = await currentSite();
  return (
    <section className="rounded-3xl bg-linear-to-r from-primary-strong to-primary p-6 text-white sm:p-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-bold sm:text-3xl">
            <T en={`Start your ${ctx.name} preparation today`} pa={`ਅੱਜ ਹੀ ਆਪਣੀ ${ctx.name} ਤਿਆਰੀ ਸ਼ੁਰੂ ਕਰੋ`} />
          </h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/85">
            {perks(site.logo.initials).map((p) => (
              <li key={p.label} className="flex items-center gap-1.5">
                <p.icon className="size-4 text-accent" aria-hidden /> <T en={p.label} pa={p.pa} />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          {ctx.startHref && (
            <TrackedLink href={ctx.startHref} event="landing_cta_click" params={{ exam: ctx.key, placement: "final" }} className={btn("accent", "lg", "w-full sm:w-auto")}>
              <T en="Start free test" pa="ਮੁਫ਼ਤ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ" /> <ChevronRight className="size-5" />
            </TrackedLink>
          )}
          <Disclaimer bodyName={ctx.bodyName} />
        </div>
      </div>
    </section>
  );
}

/**
 * Frame for the SEO sub-pages (syllabus, exam pattern, previous papers): header, a short hero with the free-test button,
 * the section tabs, the page body, the closing call to action and the footer.
 */
export async function ExamSubPage({
  ctx,
  active,
  crumb,
  h1,
  intro,
  faqs = [],
  updatedAt,
  children,
}: {
  ctx: ExamCtx;
  active: "syllabus" | "pattern" | "pyq";
  crumb: string;
  h1: string;
  intro: string;
  faqs?: Faq[];
  /** When the exam's data last changed: shown to readers and sent to search engines as dateModified. */
  updatedAt?: Date;
  children: ReactNode;
}) {
  const site = await currentSite();
  const path = `${ctx.base}/${{ syllabus: "syllabus", pattern: "exam-pattern", pyq: "previous-year-papers" }[active]}`;
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: h1,
            url: `${site.url}${path}`,
            description: intro,
            inLanguage: ["en-IN", "hi-IN"],
            isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
            publisher: { "@id": `${site.url}/#organization` },
            ...(updatedAt && { dateModified: updatedAt.toISOString() }),
          },
          ...(faqs.length > 0 ? [faqPageJsonLd(faqs)] : []),
        ]}
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-br from-hero-dark via-primary-strong to-primary text-white">
          <div className="relative mx-auto w-full max-w-6xl space-y-4 px-4 pb-20 pt-6">
            <Breadcrumbs
              light
              links={[
                { href: "/", label: "Home" },
                { href: "/exams", label: "Exams" },
                { href: ctx.base, label: ctx.name },
              ]}
              current={crumb}
            />
            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{h1}</h1>
            {ctx.nameHi && (
              <p lang="hi" className="text-lg text-white/85">
                {ctx.nameHi}
              </p>
            )}
            <p className="max-w-2xl text-white/85">{intro}</p>
            {updatedAt && (
              <p className="text-xs text-white/70">
                <T en="Last updated" pa="ਆਖਰੀ ਅਪਡੇਟ" />: <time dateTime={updatedAt.toISOString()}>{formatDate(updatedAt)}</time>
              </p>
            )}
            <div className="space-y-2 pt-1">
              {ctx.startHref && (
                <TrackedLink
                  href={ctx.startHref}
                  event="landing_cta_click"
                  params={{ exam: ctx.key, placement: `hero-${active}` }}
                  className={btn("accent", "lg", "w-full sm:w-auto")}
                >
                  <Tx>{ctx.startLabel}</Tx> <ChevronRight className="size-5" />
                </TrackedLink>
              )}
              <Disclaimer bodyName={ctx.bodyName} />
            </div>
          </div>
          <Mountains className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-24" />
        </section>
        <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10">
          <ExamTabs ctx={ctx} active={active} />
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div className="min-w-0 space-y-10">
              {children}
              {faqs.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight">
                    <T en={`${ctx.name}: frequently asked questions`} pa={`${ctx.name}: ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ`} />
                  </h2>
                  <FaqList faqs={faqs} />
                </section>
              )}
            </div>
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <OfferCard ctx={ctx} placement={`aside-${active}`} />
              <div className={`${card} space-y-2 p-5 text-sm`}>
                <h2 className="font-semibold">{ctx.name} {year()}</h2>
                <p className="text-muted">
                  <T
                    en={`Free mock tests, solutions in Hindi and English and your rank among ${site.stateAdj} aspirants.`}
                    pa="ਮੁਫ਼ਤ ਮੌਕ ਟੈਸਟ, ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਹੱਲ ਅਤੇ ਪੰਜਾਬ ਦੇ ਉਮੀਦਵਾਰਾਂ ਵਿੱਚ ਤੁਹਾਡਾ ਰੈਂਕ।"
                  />
                </p>
                <Link href={ctx.base} className="font-medium text-primary hover:underline">
                  <T en={`All ${ctx.name} mock tests →`} pa={`ਸਾਰੇ ${ctx.name} ਮੌਕ ਟੈਸਟ →`} />
                </Link>
              </div>
            </aside>
          </div>
          <ExamFinalCta ctx={ctx} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
