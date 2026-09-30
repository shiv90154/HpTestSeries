import {
  BarChart3,
  BadgeIndianRupee,
  CheckCircle2,
  ChevronRight,
  Clock,
  Languages,
  MonitorCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { CbtPreview } from "@/components/cbt-preview";
import { JsonLd } from "@/components/json-ld";
import { Mountains } from "@/components/mountains";
import { PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
import { organizationNode } from "@/lib/schema";
import { FREE_MOCK_HREF, site } from "@/lib/site";
import { getCatalog, getPublishedPosts } from "@/modules/catalog/queries";
import { faqPageJsonLd } from "@/modules/content/exam-content";
import { listActiveProducts, type PublicProduct } from "@/modules/commerce/product-service";

export const revalidate = 3600;


const features = [
  {
    icon: MonitorCheck,
    title: "Real CBT exam interface",
    text: "Same screen as HPRCA and HPPSC computer-based tests: question palette, Mark for Review, Save & Next and a live timer. No surprises on exam day.",
  },
  {
    icon: Languages,
    title: "Hindi & English",
    text: "Every question in both languages. Switch any time during the test, exactly like the real exam.",
  },
  {
    icon: Trophy,
    title: "Your rank in Himachal",
    text: "See where you stand among other Himachal aspirants on every test, with percentile and topper comparison.",
  },
  {
    icon: BarChart3,
    title: "Solutions & weak topics",
    text: "Detailed explanation for every question, section-wise analysis and the topics you need to revise next.",
  },
];

const PLAN_ITEMS: Record<string, string[]> = {
  SERIES: ["Full mock tests", "Previous-year style questions", "Sectional & topic tests", "Detailed analysis"],
  PACK: ["Multiple exam series", "Full mock tests & PYQs", "Sectional & topic tests", "Detailed analysis"],
  PASS: ["Every Himachal exam", "All mock tests & PYQs", "HP GK & current affairs tests", "Best value for serious aspirants"],
};

/** Exams from the notification feed that have no test series yet; shown as "launching soon" once a series for them exists this drops off. */
const UPCOMING_EXAMS = [
  { name: "HPRCA Clerk", match: /clerk/i },
  { name: "HP TET", match: /tet/i },
  { name: "HPPSC HPAS", match: /hpas/i },
  { name: "HPPSC Assistant Professor", match: /assistant professor/i },
  { name: "HPPSC ADO (Agriculture Development Officer)", match: /ado|agriculture/i },
  { name: "PGIMER Nursing Officer", match: /pgimer|nursing/i },
];

const faqs = [
  {
    q: "Can I take a mock test without logging in?",
    a: "Yes. The free Himachal GK mock test can be taken without any login. Log in (free) when you want to save results and see your rank.",
  },
  {
    q: "Is the test interface like the real HPRCA / HPPSC CBT exam?",
    a: "Yes. The screen follows the standard government CBT layout: question palette with colour codes, Mark for Review & Next, Save & Next, Clear Response, section tabs, language switch and an auto-submitting timer.",
  },
  {
    q: "Are questions available in Hindi?",
    a: "Yes. Questions, options and explanations are available in both Hindi and English, and you can switch language at any time.",
  },
  {
    q: "Which exams are covered?",
    a: "HPRCA (JOA IT, Clerk and other posts), HPPSC HPAS, HP Police Constable, HP TET and Patwari, with Himachal GK tests that help in every exam. More exams are being added.",
  },
  {
    q: "How much does it cost?",
    a: "Many tests are free. Paid test series are planned at very low prices, starting from ₹49, with an all-access pass for all Himachal exams.",
  },
];

export default async function Home() {
  const [catalog, products, latest] = await Promise.all([getCatalog(), listActiveProducts(), getPublishedPosts({ take: 3 })]);
  const examCount = catalog.reduce((n, b) => n + b.exams.length, 0);
  // Pricing: Free, then every exam series (one card, or a "from ₹X" card listing them all), then the
  // cheapest all-access pass. Products arrive sorted by price.
  const pass = products.find((p) => p.kind === "PASS");
  const series = products.filter((p) => p.kind !== "PASS");
  const upcoming = UPCOMING_EXAMS.filter((e) => !series.some((p) => e.match.test(p.title)));
  const planCount = products.length === 0 ? 3 : 1 + series.length + (pass ? 1 : 0);

  return (
    <>
      <JsonLd
        data={[
          { "@context": "https://schema.org", ...organizationNode() },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.name,
            url: site.url,
            inLanguage: ["en-IN", "hi-IN"],
            publisher: { "@id": `${site.url}/#organization` },
          },
          faqPageJsonLd(faqs),
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-linear-to-br from-[#0b1f5c] via-[#133a9e] to-[#1e4fd8] text-white">
          <div className="pointer-events-none absolute -right-32 -top-32 size-[480px] rounded-full bg-[#3b6ef5]/40 blur-3xl" />
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-24 pt-7 sm:pb-36 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
            <div className="space-y-4 sm:space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium ring-1 ring-white/20 sm:px-3.5 sm:py-1.5 sm:text-xs">
                <Sparkles className="size-3.5 text-accent" /> Made for Himachal Pradesh aspirants
              </p>
              <h1 className="text-[28px] font-bold leading-[1.2] tracking-tight sm:text-5xl sm:leading-[1.15]">
                Crack Himachal govt exams with <span className="text-accent">real CBT</span> mock tests
              </h1>
              <p lang="hi" className="text-[15px] text-white/85 sm:text-lg">
                {site.taglineHi}
              </p>
              {/* Phones: full-width, thumb-sized buttons stacked like an app; larger screens: inline */}
              <div className="grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                <Link href={FREE_MOCK_HREF} className={btn("accent", "lg", "w-full sm:w-auto")}>
                  Start free mock test <ChevronRight className="size-5" />
                </Link>
                <Link href="/exams" className={btn("white", "lg", "w-full sm:w-auto")}>
                  Explore exams
                </Link>
              </div>
              <ul className="flex flex-wrap gap-2 text-xs text-white/90 sm:gap-x-6 sm:gap-y-2 sm:text-sm">
                {["No login needed", "Hindi & English", "Instant solutions"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 sm:bg-transparent sm:p-0">
                    <CheckCircle2 className="size-3.5 text-accent sm:size-4" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <CbtPreview />
          </div>
          <Mountains className="absolute inset-x-0 bottom-0 h-28 w-full sm:h-36" />
        </section>

        {/* Trust strip */}
        <section className="relative z-10 mx-auto -mt-10 w-full max-w-5xl px-4">
          <dl className={`${card} grid grid-cols-4 divide-x divide-border p-1 shadow-lg sm:p-2`}>
            {[
              [`${examCount}+`, "Exams"],
              ["2", "Languages"],
              ["₹0", "To start"],
              ["100%", "Real CBT"],
            ].map(([v, l]) => (
              <div key={l} className="px-1 py-3 text-center sm:p-4">
                <dt className="sr-only">{l}</dt>
                <dd className="text-lg font-bold text-primary sm:text-2xl">{v}</dd>
                <dd className="text-[11px] text-muted sm:text-xs">{l}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Exams */}
        <section id="exams" className="mx-auto w-full max-w-6xl space-y-4 px-4 py-10 sm:space-y-8 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-2xl space-y-1 sm:space-y-2">
              <p className="hidden text-sm font-semibold uppercase tracking-wider text-primary sm:block">Exams we cover</p>
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
                <span className="sm:hidden">Choose your exam</span>
                <span className="hidden sm:inline">All major Himachal Pradesh exams, in one place</span>
              </h2>
              <p className="hidden text-muted sm:block">Pick your exam to see free tests, previous-year style questions and the full test series.</p>
            </div>
            <Link href="/exams" className="inline-flex min-h-10 shrink-0 items-center text-sm font-semibold text-primary sm:hidden">
              See all
            </Link>
          </div>
          {/* Phones: swipeable row of cards; larger screens: grid */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {catalog.flatMap((b) =>
              b.exams.map((e) => (
                <Link key={e.href} href={e.href} className={`${card} group flex w-[72%] shrink-0 snap-start flex-col gap-3 p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:w-auto sm:p-5`}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">{b.slug.toUpperCase()}</span>
                    <ChevronRight className="size-5 text-muted transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{e.name}</h3>
                    {e.nameHi && (
                      <p lang="hi" className="text-sm text-muted">
                        {e.nameHi}
                      </p>
                    )}
                  </div>
                  <p className="mt-auto text-xs text-muted">{b.name}</p>
                </Link>
              )),
            )}
          </div>
        </section>

        {/* Features */}
        <section className="bg-surface py-10 sm:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 sm:gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div className="space-y-2 sm:space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">Why {site.name}</p>
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">Practise exactly the way you will be tested</h2>
              <p className="hidden text-muted sm:block">
                Most aspirants lose marks to exam-day nerves and an unfamiliar screen, not lack of knowledge. Every test here runs
                on the same CBT pattern used in Himachal recruitment exams, so the real exam feels like just another mock.
              </p>
              <Link href={FREE_MOCK_HREF} className={btn("primary", "md", "w-full sm:w-auto")}>
                Try the CBT interface <ChevronRight className="size-4" />
              </Link>
            </div>
            {/* Phones: one card per row with the icon beside the text, so every line is readable (no clipping) */}
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3.5 rounded-2xl border border-border bg-background p-4 sm:block sm:p-5">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-white sm:mb-3 sm:size-11">
                    <f.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold leading-snug sm:text-base">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted sm:mt-1.5">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-20">
          <h2 className="mb-6 text-xl font-bold tracking-tight sm:mb-10 sm:text-center sm:text-3xl">Start in 30 seconds</h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {[
              ["Pick a test", "Choose a free mock or your exam's test series. No signup needed for free tests."],
              ["Attempt in real CBT mode", "Timer, palette, Mark for Review — the full exam experience, in Hindi or English."],
              ["Analyse & improve", "Get your score, rank, detailed solutions and weak topics instantly."],
            ].map(([t, d], i) => (
              <li key={t} className={`${card} relative p-6`}>
                <span className="absolute -top-4 left-6 grid size-9 place-items-center rounded-full bg-accent font-bold text-[#1f1300] shadow">
                  {i + 1}
                </span>
                <h3 className="mt-2 font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Latest exam updates (blog) */}
        {latest.items.length > 0 && (
          <section className="mx-auto w-full max-w-6xl space-y-4 px-4 pb-10 sm:space-y-8 sm:pb-20">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight sm:text-3xl">Latest exam updates</h2>
                <p lang="hi" className="text-sm text-muted sm:text-base">
                  नोटिफिकेशन, सिलेबस, कट ऑफ और परीक्षा तिथि — सब एक जगह
                </p>
              </div>
              <Link href="/blog" className="shrink-0 text-sm font-semibold text-primary hover:underline">
                All updates →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {latest.items.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-14 bg-surface py-10 sm:py-20 md:scroll-mt-16">
          <div className="mx-auto w-full max-w-6xl space-y-5 px-4 sm:space-y-10">
            <div className="mx-auto max-w-2xl space-y-1 sm:space-y-2 sm:text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">Pricing</p>
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">Cheaper than a single guide book</h2>
              <p className="text-sm text-muted sm:text-base">No expensive coaching. Pay only for what you need — or nothing at all.</p>
            </div>
            {/* Stacked on phones: a sideways-scrolling row showed only the edge of the paid plan */}
            <div className={`grid gap-5 ${planCount >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : planCount === 3 ? "md:grid-cols-3" : "mx-auto max-w-4xl md:grid-cols-2"}`}>
              <Plan name="Free" price="₹0" note="forever" items={["Free mock tests", "Real CBT interface", "Solutions in Hindi & English", "HP rank on free tests"]} cta={{ href: FREE_MOCK_HREF, label: "Start free test" }} />
              {series.map((p) => (
                <Plan key={p.slug} {...productPlan(p)} badge={series.length === 1 && !pass ? "Recommended" : undefined} />
              ))}
              {pass && <Plan {...productPlan(pass)} badge="Best value" />}
              {products.length === 0 && (
                <>
                  <Plan name="Exam Test Series" price="₹49–99" note="per exam" soon items={["20–40 full mock tests", "Previous-year papers", "Sectional & topic tests", "Detailed analysis"]} />
                  <Plan badge="Best value" name="All-Access Pass" price="₹299" note="per year" soon items={["Every Himachal exam", "All mock tests & PYQs", "HP GK & current affairs tests", "Best value for serious aspirants"]} />
                </>
              )}
            </div>
            {upcoming.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold sm:text-center">More exams launching soon</h3>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((e) => (
                    <li key={e.name} className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-border bg-background px-3.5 py-2 text-sm font-medium">
                      {e.name}
                      <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-ink">Soon</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-3xl space-y-5 px-4 py-10 sm:space-y-8 sm:py-20">
          <h2 className="text-xl font-bold tracking-tight sm:text-center sm:text-3xl">Frequently asked questions</h2>
          <div className="space-y-2.5 sm:space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className={`${card} group`}>
                {/* The padding sits on <summary> so the whole card row is the tap target, not just the text */}
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-[15px] font-semibold sm:p-5 sm:text-base">
                  {f.q}
                  <ChevronRight className="size-5 shrink-0 text-muted transition group-open:rotate-90" />
                </summary>
                <p className="-mt-1 px-4 pb-4 text-sm leading-relaxed text-muted sm:px-5 sm:pb-5">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-10 sm:pb-20">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-5 overflow-hidden rounded-3xl bg-linear-to-r from-[#133a9e] to-[#1e4fd8] p-6 text-white sm:flex-row sm:items-center sm:p-12">
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-bold sm:text-3xl">Take your first Himachal mock test now</h2>
              <p className="text-white/80">25 questions · 20 minutes · Hindi & English · No login</p>
            </div>
            <Link href={FREE_MOCK_HREF} className={btn("accent", "lg")}>
              Start free mock <Clock className="size-5" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

/** Card for one product on sale (an exam series, a pack or the all-access pass). */
function productPlan(p: PublicProduct) {
  // "HP Patwari Mock Test Series — 3 Full Mocks + 14 Subject Tests": the part after the dash becomes the first bullet
  const [name, detail] = p.title.split(/\s+[—–]\s+/);
  const items = PLAN_ITEMS[p.kind] ?? PLAN_ITEMS.SERIES;
  return {
    name,
    price: rupees(p.priceInPaise),
    note: p.validityDays ? `valid ${p.validityDays} days` : "one-time",
    items: detail ? [detail, ...items.filter((i) => i !== "Full mock tests")] : items,
    cta: { href: `/buy/${p.slug}`, label: "Buy now" },
  };
}

/** A pricing card. `badge` highlights it (the plan we recommend); `children` go below the feature list. */
function Plan(props: {
  name: string;
  price: string;
  note: string;
  items: string[];
  badge?: string;
  soon?: boolean;
  cta?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative flex flex-col rounded-2xl border bg-background p-5 md:p-6 ${props.badge ? "border-primary shadow-xl" : "border-border"}`}>
      {props.badge && (
        <span className="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">{props.badge}</span>
      )}
      {props.soon && (
        <span className="absolute right-5 top-5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-ink">Launching soon</span>
      )}
      <h3 className="flex items-center gap-2 font-semibold">
        <BadgeIndianRupee className="size-5 text-primary" /> {props.name}
      </h3>
      <p className="mt-4">
        <span className="text-4xl font-bold">{props.price}</span>
        <span className="ml-1 text-sm text-muted">{props.note}</span>
      </p>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm">
        {props.items.map((i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> {i}
          </li>
        ))}
      </ul>
      {props.children}
      {props.cta && (
        <Link href={props.cta.href} className={`${btn("primary")} mt-6`}>
          {props.cta.label}
        </Link>
      )}
    </div>
  );
}
