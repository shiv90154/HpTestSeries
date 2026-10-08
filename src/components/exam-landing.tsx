import { CheckCircle2, ChevronRight, Clock, Languages, MonitorCheck, ShieldCheck, Trophy } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Mountains } from "@/components/mountains";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackedLink } from "@/components/tracked-link";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
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

export function buildExamCtx(data: ExamData, label: string): ExamCtx {
  const start = startTest(data.tests, label);
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
  return <p className={`text-xs ${className}`}>Independent practice platform, not affiliated with {bodyName}. Always read the official notification.</p>;
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
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

/** Price card for the exam's paid series. `placement` tells GA4 which copy of the card was used. */
export function OfferCard({ ctx, placement, className = "" }: { ctx: ExamCtx; placement: string; className?: string }) {
  const offer = ctx.offer;
  if (!offer) return null;
  // Only the total is shown, never a mocks/sectional split; older titles may still carry one after a dash
  const [title] = offer.title.split(/\s+[—–]\s+/);
  const price = rupees(offer.priceInPaise);
  const items = [
    `${offer.testCount} ${offer.testCount === 1 ? "test" : "tests"}`,
    "Detailed solutions in Hindi & English",
    "Rank among Himachal aspirants",
    "Section and topic-wise analysis",
  ];
  return (
    <div className={`relative space-y-4 rounded-2xl border border-primary bg-surface p-5 shadow-lg ${className}`}>
      <span className="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">Full test series</span>
      <div className="pt-1">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <p>
        <span className="text-4xl font-bold">{price}</span>
        <span className="mt-1 block text-sm text-muted">{offer.validityDays ? `Valid ${offer.validityDays} days` : "One-time payment"} · no auto-renewal</span>
      </p>
      <ul className="space-y-2 text-sm">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden /> {i}
          </li>
        ))}
      </ul>
      <TrackedLink
        href={`/buy/${offer.slug}`}
        event="landing_buy_click"
        params={{ exam: ctx.key, placement, price: offer.priceInPaise / 100 }}
        className={btn("primary", "lg", "w-full")}
      >
        Buy now for {price}
      </TrackedLink>
      <p className="flex items-center gap-1.5 text-xs text-muted">
        <ShieldCheck className="size-4 shrink-0 text-success" aria-hidden /> Secure payment via Razorpay (UPI, cards, netbanking)
      </p>
    </div>
  );
}

const STEPS = [
  ["Take a free test", "Start the free mock now. No signup is needed for free tests."],
  ["Attempt in real CBT mode", "Timer, question palette, Mark for Review and Save & Next, in Hindi or English."],
  ["Analyse and improve", "See your score, HP rank, a solution for every question and your weak topics."],
];

export function HowItWorks() {
  return (
    <ol className="grid gap-4 sm:grid-cols-3">
      {STEPS.map(([t, d], i) => (
        <li key={t} className={`${card} relative p-5 pt-6`}>
          <span className="absolute -top-3.5 left-5 grid size-8 place-items-center rounded-full bg-accent text-sm font-bold text-[#1f1300] shadow">{i + 1}</span>
          <h3 className="font-semibold">{t}</h3>
          <p className="mt-1 text-sm text-muted">{d}</p>
        </li>
      ))}
    </ol>
  );
}

const PERKS = [
  { icon: MonitorCheck, label: "Real CBT interface" },
  { icon: Languages, label: "Hindi & English" },
  { icon: Trophy, label: "HP rank on every test" },
  { icon: Clock, label: "Instant solutions" },
];

/** Closing call to action band, repeated at the end of every exam page. */
export function ExamFinalCta({ ctx }: { ctx: ExamCtx }) {
  return (
    <section className="rounded-3xl bg-linear-to-r from-[#133a9e] to-[#1e4fd8] p-6 text-white sm:p-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-bold sm:text-3xl">Start your {ctx.name} preparation today</h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/85">
            {PERKS.map((p) => (
              <li key={p.label} className="flex items-center gap-1.5">
                <p.icon className="size-4 text-accent" aria-hidden /> {p.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          {ctx.startHref && (
            <TrackedLink href={ctx.startHref} event="landing_cta_click" params={{ exam: ctx.key, placement: "final" }} className={btn("accent", "lg", "w-full sm:w-auto")}>
              Start free test <ChevronRight className="size-5" />
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
export function ExamSubPage({
  ctx,
  active,
  crumb,
  h1,
  intro,
  children,
}: {
  ctx: ExamCtx;
  active: "syllabus" | "pattern" | "pyq";
  crumb: string;
  h1: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-br from-[#0b1f5c] via-[#133a9e] to-[#1e4fd8] text-white">
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
            <div className="space-y-2 pt-1">
              {ctx.startHref && (
                <TrackedLink
                  href={ctx.startHref}
                  event="landing_cta_click"
                  params={{ exam: ctx.key, placement: `hero-${active}` }}
                  className={btn("accent", "lg", "w-full sm:w-auto")}
                >
                  {ctx.startLabel} <ChevronRight className="size-5" />
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
            <div className="min-w-0 space-y-10">{children}</div>
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <OfferCard ctx={ctx} placement={`aside-${active}`} />
              <div className={`${card} space-y-2 p-5 text-sm`}>
                <h2 className="font-semibold">{ctx.name} {year()}</h2>
                <p className="text-muted">Free mock tests, solutions in Hindi and English and your rank among Himachal aspirants.</p>
                <Link href={ctx.base} className="font-medium text-primary hover:underline">
                  All {ctx.name} mock tests →
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
