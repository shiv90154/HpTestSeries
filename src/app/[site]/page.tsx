import {
  BarChart3,
  BadgeIndianRupee,
  CheckCircle2,
  ChevronRight,
  Clock,
  Languages,
  MonitorCheck,
  BookOpen,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { CbtPreview } from "@/components/cbt-preview";
import { JsonLd } from "@/components/json-ld";
import { Mountains } from "@/components/mountains";
import { Plan, productPlan } from "@/components/pricing-plans";
import { PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { T } from "@/components/ui-lang";
import { organizationNode } from "@/lib/schema";
import { freeMockHref } from "@/sites";
import { currentSite } from "@/sites/current";
import type { SiteConfig } from "@/sites/types";
import { getCatalog, getPublishedPosts } from "@/modules/catalog/queries";
import { faqPageJsonLd } from "@/modules/content/exam-content";
import { UPCOMING_EXAMS, type UpcomingExam } from "@/modules/catalog/upcoming-exams";
import { listActiveProducts } from "@/modules/commerce/product-service";

export const revalidate = 3600;


const features = (site: SiteConfig) => [
  {
    icon: MonitorCheck,
    title: "Real CBT exam interface",
    titlePa: "ਅਸਲ CBT ਪ੍ਰੀਖਿਆ ਵਰਗੀ ਸਕਰੀਨ",
    text: `Same screen as ${site.cbtBodies} computer-based tests: question palette, Mark for Review, Save & Next and a live timer. No surprises on exam day.`,
    textPa: `${site.cbtBodies} ਦੇ ਕੰਪਿਊਟਰ ਅਧਾਰਤ ਟੈਸਟਾਂ ਵਰਗੀ ਹੀ ਸਕਰੀਨ: ਪ੍ਰਸ਼ਨ ਪੈਲੇਟ, Mark for Review, Save & Next ਅਤੇ ਚੱਲਦਾ ਟਾਈਮਰ। ਪ੍ਰੀਖਿਆ ਵਾਲੇ ਦਿਨ ਕੋਈ ਹੈਰਾਨੀ ਨਹੀਂ।`,
  },
  {
    icon: Languages,
    title: "Hindi & English",
    titlePa: "ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ",
    text: "Every question in both languages. Switch any time during the test, exactly like the real exam.",
    textPa: "ਹਰ ਪ੍ਰਸ਼ਨ ਦੋਵਾਂ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ। ਟੈਸਟ ਦੌਰਾਨ ਕਿਸੇ ਵੀ ਸਮੇਂ ਭਾਸ਼ਾ ਬਦਲੋ, ਬਿਲਕੁਲ ਅਸਲ ਪ੍ਰੀਖਿਆ ਵਾਂਗ।",
  },
  {
    icon: Trophy,
    title: `Your rank in ${site.stateAdj}`,
    titlePa: "ਪੰਜਾਬ ਵਿੱਚ ਤੁਹਾਡਾ ਰੈਂਕ",
    text: `See where you stand among other ${site.stateAdj} aspirants on every test, with percentile and topper comparison.`,
    textPa: "ਹਰ ਟੈਸਟ ਵਿੱਚ ਵੇਖੋ ਕਿ ਤੁਸੀਂ ਪੰਜਾਬ ਦੇ ਹੋਰ ਉਮੀਦਵਾਰਾਂ ਵਿੱਚ ਕਿੱਥੇ ਖੜ੍ਹੇ ਹੋ, ਪਰਸੈਂਟਾਈਲ ਅਤੇ ਟਾਪਰ ਨਾਲ ਤੁਲਨਾ ਸਮੇਤ।",
  },
  {
    icon: BarChart3,
    title: "Solutions & weak topics",
    titlePa: "ਹੱਲ ਅਤੇ ਕਮਜ਼ੋਰ ਵਿਸ਼ੇ",
    text: "Detailed explanation for every question, section-wise analysis and the topics you need to revise next.",
    textPa: "ਹਰ ਪ੍ਰਸ਼ਨ ਦੀ ਵਿਸਥਾਰ ਨਾਲ ਵਿਆਖਿਆ, ਸੈਕਸ਼ਨ ਅਨੁਸਾਰ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਉਹ ਵਿਸ਼ੇ ਜਿਨ੍ਹਾਂ ਨੂੰ ਅੱਗੇ ਦੁਹਰਾਉਣਾ ਹੈ।",
  },
];

const faqs = (site: SiteConfig) => [
  {
    q: "Can I take a mock test without logging in?",
    qPa: "ਕੀ ਮੈਂ ਲੌਗ ਇਨ ਕੀਤੇ ਬਿਨਾਂ ਮੌਕ ਟੈਸਟ ਦੇ ਸਕਦਾ/ਸਕਦੀ ਹਾਂ?",
    a: `Yes. The free ${site.statePage.title} mock test can be taken without any login. Log in (free) when you want to save results and see your rank.`,
    aPa: `ਹਾਂ। ਮੁਫ਼ਤ ${site.statePage.title} ਮੌਕ ਟੈਸਟ ਬਿਨਾਂ ਲੌਗ ਇਨ ਦਿੱਤਾ ਜਾ ਸਕਦਾ ਹੈ। ਨਤੀਜੇ ਸੰਭਾਲਣ ਅਤੇ ਆਪਣਾ ਰੈਂਕ ਵੇਖਣ ਲਈ (ਮੁਫ਼ਤ) ਲੌਗ ਇਨ ਕਰੋ।`,
  },
  {
    q: `Is the test interface like the real ${site.cbtBodies.replace(" and ", " / ")} CBT exam?`,
    qPa: `ਕੀ ਟੈਸਟ ਦੀ ਸਕਰੀਨ ਅਸਲ ${site.cbtBodies.replace(" and ", " / ")} CBT ਪ੍ਰੀਖਿਆ ਵਰਗੀ ਹੈ?`,
    a: "Yes. The screen follows the standard government CBT layout: question palette with colour codes, Mark for Review & Next, Save & Next, Clear Response, section tabs, language switch and an auto-submitting timer.",
    aPa: "ਹਾਂ। ਸਕਰੀਨ ਸਰਕਾਰੀ CBT ਦੇ ਮਿਆਰੀ ਢਾਂਚੇ ਵਰਗੀ ਹੈ: ਰੰਗਾਂ ਵਾਲਾ ਪ੍ਰਸ਼ਨ ਪੈਲੇਟ, Mark for Review & Next, Save & Next, Clear Response, ਸੈਕਸ਼ਨ ਟੈਬ, ਭਾਸ਼ਾ ਬਦਲਣ ਦਾ ਵਿਕਲਪ ਅਤੇ ਆਪਣੇ ਆਪ ਜਮ੍ਹਾਂ ਹੋਣ ਵਾਲਾ ਟਾਈਮਰ।",
  },
  {
    q: "Are questions available in Hindi?",
    qPa: "ਕੀ ਪ੍ਰਸ਼ਨ ਹਿੰਦੀ ਵਿੱਚ ਵੀ ਹਨ?",
    a: "Yes. Questions, options and explanations are available in both Hindi and English, and you can switch language at any time.",
    aPa: "ਹਾਂ। ਪ੍ਰਸ਼ਨ, ਵਿਕਲਪ ਅਤੇ ਵਿਆਖਿਆ ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਦੋਵਾਂ ਵਿੱਚ ਹਨ, ਅਤੇ ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਸਮੇਂ ਭਾਸ਼ਾ ਬਦਲ ਸਕਦੇ ਹੋ।",
  },
  {
    q: "Which exams are covered?",
    qPa: "ਕਿਹੜੀਆਂ ਪ੍ਰੀਖਿਆਵਾਂ ਸ਼ਾਮਲ ਹਨ?",
    a: site.examsCoveredFaq,
    aPa: site.pa?.examsCoveredFaq ?? site.examsCoveredFaq,
  },
  {
    q: "How much does it cost?",
    qPa: "ਇਸਦੀ ਕੀਮਤ ਕਿੰਨੀ ਹੈ?",
    a: `Many tests are free. Paid test series are priced very low: each exam's price and validity are listed on the Pricing page, and an all-access pass covers all ${site.stateAdj} exams.`,
    aPa: "ਬਹੁਤ ਸਾਰੇ ਟੈਸਟ ਮੁਫ਼ਤ ਹਨ। ਪੇਡ ਟੈਸਟ ਸੀਰੀਜ਼ ਬਹੁਤ ਸਸਤੀ ਹੈ: ਹਰ ਪ੍ਰੀਖਿਆ ਦੀ ਕੀਮਤ ਅਤੇ ਮਿਆਦ ਕੀਮਤਾਂ ਵਾਲੇ ਪੰਨੇ ਉੱਤੇ ਦਿੱਤੀ ਹੈ, ਅਤੇ ਇੱਕ ਆਲ-ਐਕਸੈਸ ਪਾਸ ਪੰਜਾਬ ਦੀਆਂ ਸਾਰੀਆਂ ਪ੍ਰੀਖਿਆਵਾਂ ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ।",
  },
];

export default async function Home() {
  const site = await currentSite();
  const [catalog, products, latest] = await Promise.all([getCatalog(site.code), listActiveProducts(site.code), getPublishedPosts(site.code, { take: 3 })]);
  const examCount = catalog.reduce((n, b) => n + b.exams.length, 0);
  // Pricing: Free, then every exam series (one card, or a "from ₹X" card listing them all), then the
  // cheapest all-access pass. Products arrive sorted by price.
  const pass = products.find((p) => p.kind === "PASS");
  const series = products.filter((p) => p.kind !== "PASS");
  // A card follows its Exam row: hidden or deleted in the admin panel means no card, and a rename shows up here too.
  const liveExams = new Map(catalog.flatMap((b) => b.exams.map((e) => [`${b.slug}/${e.slug}`, e.name] as const)));
  const upcoming = UPCOMING_EXAMS.filter((e) => liveExams.has(`${e.bodySlug}/${e.examSlug}`) && !series.some((p) => e.match.test(p.title))).map((e) => ({
    ...e,
    name: liveExams.get(`${e.bodySlug}/${e.examSlug}`)!,
  }));
  const planCount = products.length === 0 ? 3 : 1 + series.length + (pass ? 1 : 0);

  return (
    <>
      <JsonLd
        data={[
          { "@context": "https://schema.org", ...organizationNode(site) },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.name,
            url: site.url,
            inLanguage: ["en-IN", "hi-IN"],
            publisher: { "@id": `${site.url}/#organization` },
          },
          faqPageJsonLd(faqs(site).map(({ q, a }) => ({ q, a }))),
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-linear-to-br from-hero-dark via-primary-strong to-primary text-white">
          <div className="pointer-events-none absolute -right-32 -top-32 size-[480px] rounded-full bg-hero-glow/40 blur-3xl" />
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-24 pt-7 sm:pb-36 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
            <div className="space-y-4 sm:space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium ring-1 ring-white/20 sm:px-3.5 sm:py-1.5 sm:text-xs">
                <Sparkles className="size-3.5 text-accent" /> <T en={`Made for ${site.stateName} aspirants`} pa="ਪੰਜਾਬ ਦੇ ਉਮੀਦਵਾਰਾਂ ਲਈ ਬਣਾਇਆ" />
              </p>
              <h1 className="text-[28px] font-bold leading-[1.2] tracking-tight sm:text-5xl sm:leading-[1.15]">
                {site.pa ? (
                  <T en={`Crack ${site.stateAdj} govt exams with real CBT mock tests`} pa="ਅਸਲ CBT ਮੌਕ ਟੈਸਟਾਂ ਨਾਲ ਪੰਜਾਬ ਦੀਆਂ ਸਰਕਾਰੀ ਪ੍ਰੀਖਿਆਵਾਂ ਪਾਸ ਕਰੋ" />
                ) : (
                  <>
                    Crack {site.stateAdj} govt exams with <span className="text-accent">real CBT</span> mock tests
                  </>
                )}
              </h1>
              {site.pa ? (
                <p className="text-[15px] text-white/85 sm:text-lg">
                  <T en={site.tagline} pa={site.pa.tagline} />
                </p>
              ) : (
                <p lang="hi" className="text-[15px] text-white/85 sm:text-lg">
                  {site.taglineHi}
                </p>
              )}
              {/* Phones: full-width, thumb-sized buttons stacked like an app; larger screens: inline */}
              <div className="grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                <Link href={freeMockHref(site)} className={btn("accent", "lg", "w-full sm:w-auto")}>
                  <T en="Start free mock test" pa="ਮੁਫ਼ਤ ਮੌਕ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ" /> <ChevronRight className="size-5" />
                </Link>
                <Link href="/exams" className={btn("white", "lg", "w-full sm:w-auto")}>
                  <T en="Explore exams" pa="ਪ੍ਰੀਖਿਆਵਾਂ ਵੇਖੋ" />
                </Link>
              </div>
              <ul className="flex flex-wrap gap-2 text-xs text-white/90 sm:gap-x-6 sm:gap-y-2 sm:text-sm">
                {[
                  ["No login needed", "ਲੌਗ ਇਨ ਦੀ ਲੋੜ ਨਹੀਂ"],
                  ["Hindi & English", "ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ"],
                  ["Instant solutions", "ਤੁਰੰਤ ਹੱਲ"],
                ].map(([en, pa]) => (
                  <li key={en} className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 sm:bg-transparent sm:p-0">
                    <CheckCircle2 className="size-3.5 text-accent sm:size-4" /> <T en={en} pa={pa} />
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
              [`${examCount}+`, "Exams", "ਪ੍ਰੀਖਿਆਵਾਂ"],
              ["2", "Languages", "ਭਾਸ਼ਾਵਾਂ"],
              ["₹0", "To start", "ਸ਼ੁਰੂ ਕਰਨ ਲਈ"],
              ["100%", "Real CBT", "ਅਸਲ CBT"],
            ].map(([v, l, pa]) => (
              <div key={l} className="px-1 py-3 text-center sm:p-4">
                <dt className="sr-only">
                  <T en={l} pa={pa} />
                </dt>
                <dd className="text-lg font-bold text-primary sm:text-2xl">{v}</dd>
                <dd className="text-[11px] text-muted sm:text-xs">
                  <T en={l} pa={pa} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Exams */}
        <section id="exams" className="mx-auto w-full max-w-6xl space-y-4 px-4 py-10 sm:space-y-8 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-2xl space-y-1 sm:space-y-2">
              <p className="hidden text-sm font-semibold uppercase tracking-wider text-primary sm:block">
                <T en="Exams we cover" pa="ਸਾਡੀਆਂ ਪ੍ਰੀਖਿਆਵਾਂ" />
              </p>
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
                <span className="sm:hidden">
                  <T en="Choose your exam" pa="ਆਪਣੀ ਪ੍ਰੀਖਿਆ ਚੁਣੋ" />
                </span>
                <span className="hidden sm:inline">
                  <T en={`All major ${site.stateName} exams, in one place`} pa="ਪੰਜਾਬ ਦੀਆਂ ਸਾਰੀਆਂ ਮੁੱਖ ਪ੍ਰੀਖਿਆਵਾਂ, ਇੱਕ ਥਾਂ ਉੱਤੇ" />
                </span>
              </h2>
              <p className="hidden text-muted sm:block">
                <T
                  en="Pick your exam to see free tests, previous-year style questions and the full test series."
                  pa="ਮੁਫ਼ਤ ਟੈਸਟ, ਪਿਛਲੇ ਸਾਲਾਂ ਵਰਗੇ ਪ੍ਰਸ਼ਨ ਅਤੇ ਪੂਰੀ ਟੈਸਟ ਸੀਰੀਜ਼ ਵੇਖਣ ਲਈ ਆਪਣੀ ਪ੍ਰੀਖਿਆ ਚੁਣੋ।"
                />
              </p>
            </div>
            <Link href="/exams" className="inline-flex min-h-10 shrink-0 items-center text-sm font-semibold text-primary sm:hidden">
              <T en="See all" pa="ਸਾਰੀਆਂ ਵੇਖੋ" />
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
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                <T en={`Why ${site.name}`} pa={`${site.name} ਕਿਉਂ`} />
              </p>
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
                <T en="Practise exactly the way you will be tested" pa="ਬਿਲਕੁਲ ਉਸੇ ਤਰ੍ਹਾਂ ਅਭਿਆਸ ਕਰੋ ਜਿਵੇਂ ਪ੍ਰੀਖਿਆ ਹੋਵੇਗੀ" />
              </h2>
              <p className="hidden text-muted sm:block">
                <T
                  en={`Most aspirants lose marks to exam-day nerves and an unfamiliar screen, not lack of knowledge. Every test here runs on the same CBT pattern used in ${site.stateAdj} recruitment exams, so the real exam feels like just another mock.`}
                  pa="ਜ਼ਿਆਦਾਤਰ ਉਮੀਦਵਾਰ ਗਿਆਨ ਦੀ ਕਮੀ ਕਰਕੇ ਨਹੀਂ, ਸਗੋਂ ਪ੍ਰੀਖਿਆ ਵਾਲੇ ਦਿਨ ਦੀ ਘਬਰਾਹਟ ਅਤੇ ਅਣਜਾਣ ਸਕਰੀਨ ਕਰਕੇ ਅੰਕ ਗੁਆਉਂਦੇ ਹਨ। ਇੱਥੇ ਹਰ ਟੈਸਟ ਪੰਜਾਬ ਦੀਆਂ ਭਰਤੀ ਪ੍ਰੀਖਿਆਵਾਂ ਵਾਲੇ CBT ਪੈਟਰਨ ਉੱਤੇ ਚੱਲਦਾ ਹੈ, ਇਸ ਲਈ ਅਸਲ ਪ੍ਰੀਖਿਆ ਵੀ ਇੱਕ ਹੋਰ ਮੌਕ ਵਰਗੀ ਲੱਗਦੀ ਹੈ।"
                />
              </p>
              <Link href={freeMockHref(site)} className={btn("primary", "md", "w-full sm:w-auto")}>
                <T en="Try the CBT interface" pa="CBT ਸਕਰੀਨ ਅਜ਼ਮਾਓ" /> <ChevronRight className="size-4" />
              </Link>
            </div>
            {/* Phones: one card per row with the icon beside the text, so every line is readable (no clipping) */}
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {features(site).map((f) => (
                <div key={f.title} className="flex gap-3.5 rounded-2xl border border-border bg-background p-4 sm:block sm:p-5">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-white sm:mb-3 sm:size-11">
                    <f.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold leading-snug sm:text-base">
                      <T en={f.title} pa={f.titlePa} />
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted sm:mt-1.5">
                      <T en={f.text} pa={f.textPa} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-20">
          <h2 className="mb-6 text-xl font-bold tracking-tight sm:mb-10 sm:text-center sm:text-3xl">
            <T en="Start in 30 seconds" pa="30 ਸਕਿੰਟਾਂ ਵਿੱਚ ਸ਼ੁਰੂ ਕਰੋ" />
          </h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {[
              ["Pick a test", "Choose a free mock or your exam's test series. No signup needed for free tests.", "ਟੈਸਟ ਚੁਣੋ", "ਮੁਫ਼ਤ ਮੌਕ ਜਾਂ ਆਪਣੀ ਪ੍ਰੀਖਿਆ ਦੀ ਟੈਸਟ ਸੀਰੀਜ਼ ਚੁਣੋ। ਮੁਫ਼ਤ ਟੈਸਟਾਂ ਲਈ ਸਾਈਨ ਅੱਪ ਦੀ ਲੋੜ ਨਹੀਂ।"],
              ["Attempt in real CBT mode", "Timer, palette, Mark for Review — the full exam experience, in Hindi or English.", "ਅਸਲ CBT ਮੋਡ ਵਿੱਚ ਟੈਸਟ ਦਿਓ", "ਟਾਈਮਰ, ਪੈਲੇਟ, Mark for Review — ਪ੍ਰੀਖਿਆ ਦਾ ਪੂਰਾ ਤਜਰਬਾ, ਹਿੰਦੀ ਜਾਂ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ।"],
              ["Analyse & improve", "Get your score, rank, detailed solutions and weak topics instantly.", "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ ਅਤੇ ਸੁਧਾਰੋ", "ਆਪਣਾ ਸਕੋਰ, ਰੈਂਕ, ਵਿਸਥਾਰ ਨਾਲ ਹੱਲ ਅਤੇ ਕਮਜ਼ੋਰ ਵਿਸ਼ੇ ਤੁਰੰਤ ਵੇਖੋ।"],
            ].map(([t, d, tPa, dPa], i) => (
              <li key={t} className={`${card} relative p-6`}>
                <span className="absolute -top-4 left-6 grid size-9 place-items-center rounded-full bg-accent font-bold text-[#1f1300] shadow">
                  {i + 1}
                </span>
                <h3 className="mt-2 font-semibold">
                  <T en={t} pa={tPa} />
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  <T en={d} pa={dPa} />
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Latest exam updates (blog) */}
        {latest.items.length > 0 && (
          <section className="mx-auto w-full max-w-6xl space-y-4 px-4 pb-10 sm:space-y-8 sm:pb-20">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
                  <T en="Latest exam updates" pa="ਤਾਜ਼ਾ ਪ੍ਰੀਖਿਆ ਅਪਡੇਟ" />
                </h2>
                {site.pa ? (
                  <p className="text-sm text-muted sm:text-base">
                    <T en="Notifications, syllabus, cutoff and exam dates — all in one place" pa="ਨੋਟੀਫਿਕੇਸ਼ਨ, ਸਿਲੇਬਸ, ਕੱਟ ਆਫ ਅਤੇ ਪ੍ਰੀਖਿਆ ਦੀਆਂ ਤਾਰੀਖਾਂ — ਸਭ ਇੱਕ ਥਾਂ" />
                  </p>
                ) : (
                  <p lang="hi" className="text-sm text-muted sm:text-base">
                    नोटिफिकेशन, सिलेबस, कट ऑफ और परीक्षा तिथि — सब एक जगह
                  </p>
                )}
              </div>
              <Link href="/blog" className="shrink-0 text-sm font-semibold text-primary hover:underline">
                <T en="All updates →" pa="ਸਾਰੇ ਅਪਡੇਟ →" />
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
              <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                <T en="Pricing" pa="ਕੀਮਤਾਂ" />
              </p>
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
                <T en="Cheaper than a single guide book" pa="ਇੱਕ ਗਾਈਡ ਕਿਤਾਬ ਤੋਂ ਵੀ ਸਸਤਾ" />
              </h2>
              <p className="text-sm text-muted sm:text-base">
                <T en="No expensive coaching. Pay only for what you need — or nothing at all." pa="ਮਹਿੰਗੀ ਕੋਚਿੰਗ ਦੀ ਲੋੜ ਨਹੀਂ। ਸਿਰਫ਼ ਉਸੇ ਲਈ ਭੁਗਤਾਨ ਕਰੋ ਜਿਸਦੀ ਲੋੜ ਹੈ — ਜਾਂ ਬਿਲਕੁਲ ਮੁਫ਼ਤ।" />
              </p>
            </div>
            {/* Stacked on phones: a sideways-scrolling row showed only the edge of the paid plan */}
            <div className={`grid gap-5 ${planCount >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : planCount === 3 ? "md:grid-cols-3" : "mx-auto max-w-4xl md:grid-cols-2"}`}>
              <Plan name="Free" price="₹0" note="forever" items={["Free mock tests", "Real CBT interface", "Solutions in Hindi & English", `${site.logo.initials} rank on free tests`]} cta={{ href: freeMockHref(site), label: "Start free test" }} />
              {series.map((p) => (
                <Plan key={p.slug} {...productPlan(p, site.stateAdj)} badge={series.length === 1 && !pass ? "Recommended" : undefined} />
              ))}
              {pass && <Plan {...productPlan(pass, site.stateAdj)} badge="Best value" />}
              {products.length === 0 && (
                <>
                  <Plan name="Exam Test Series" price="₹199" note="per exam" soon items={["20–40 full mock tests", "Previous-year papers", "Sectional & topic tests", "Detailed analysis"]} />
                  <Plan badge="Best value" name="All-Access Pass" price="₹299" note="per year" soon items={[`Every ${site.stateAdj} exam`, "All mock tests & PYQs", `${site.logo.initials} GK & current affairs tests`, "Best value for serious aspirants"]} />
                </>
              )}
            </div>
            <p className="text-center">
              <Link href="/pricing" className="inline-flex min-h-10 items-center font-semibold text-primary hover:underline">
                <T en="See full pricing, payment and refund details →" pa="ਪੂਰੀਆਂ ਕੀਮਤਾਂ, ਭੁਗਤਾਨ ਅਤੇ ਰਿਫੰਡ ਦੇ ਵੇਰਵੇ ਵੇਖੋ →" />
              </Link>
            </p>
            {upcoming.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold sm:text-center">More exams launching soon — try a free mock now</h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((e) => (
                    <UpcomingCard key={e.name} exam={e} />
                  ))}
                </div>
                <p className="text-center text-xs text-muted">
                  Eligibility and pattern are a summary and change with each notification. Always confirm on the official notification before applying.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Reading resource: the state GK guide */}
        <section className="mx-auto w-full max-w-6xl px-4 pt-10 sm:pt-16">
          <Link href={`/${site.statePage.slug}`} className={`${card} flex items-center gap-4 p-5 transition hover:border-primary sm:p-6`}>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
              <BookOpen className="size-6" />
            </span>
            <span className="flex-1 space-y-0.5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-primary">
                <T en="Read & learn" pa="ਪੜ੍ਹੋ ਅਤੇ ਸਿੱਖੋ" />
              </span>
              <span className="block font-semibold sm:text-lg">
                <T en={`Know Your ${site.stateAdj} — free district-wise guide`} pa="ਆਪਣਾ ਪੰਜਾਬ ਜਾਣੋ — ਮੁਫ਼ਤ ਜ਼ਿਲ੍ਹਾ-ਵਾਰ ਗਾਈਡ" />
              </span>
              <span className="block text-sm text-muted">
                <T
                  en={`All ${site.districts.length} districts, famous places, fairs and records, in simple language for exam revision.`}
                  pa={`ਸਾਰੇ ${site.districts.length} ਜ਼ਿਲ੍ਹੇ, ਪ੍ਰਸਿੱਧ ਥਾਵਾਂ, ਮੇਲੇ ਅਤੇ ਰਿਕਾਰਡ, ਪ੍ਰੀਖਿਆ ਦੀ ਦੁਹਰਾਈ ਲਈ ਸੌਖੀ ਭਾਸ਼ਾ ਵਿੱਚ।`}
                />
              </span>
            </span>
            <ChevronRight className="size-5 shrink-0 text-muted" aria-hidden />
          </Link>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-3xl space-y-5 px-4 py-10 sm:space-y-8 sm:py-20">
          <h2 className="text-xl font-bold tracking-tight sm:text-center sm:text-3xl">
            <T en="Frequently asked questions" pa="ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ" />
          </h2>
          <div className="space-y-2.5 sm:space-y-3">
            {faqs(site).map((f) => (
              <details key={f.q} className={`${card} group`}>
                {/* The padding sits on <summary> so the whole card row is the tap target, not just the text */}
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-[15px] font-semibold sm:p-5 sm:text-base">
                  <T en={f.q} pa={f.qPa} />
                  <ChevronRight className="size-5 shrink-0 text-muted transition group-open:rotate-90" />
                </summary>
                <p className="-mt-1 px-4 pb-4 text-sm leading-relaxed text-muted sm:px-5 sm:pb-5">
                  <T en={f.a} pa={f.aPa} />
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-10 sm:pb-20">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-5 overflow-hidden rounded-3xl bg-linear-to-r from-primary-strong to-primary p-6 text-white sm:flex-row sm:items-center sm:p-12">
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-bold sm:text-3xl">
                <T en={`Take your first ${site.stateAdj} mock test now`} pa="ਹੁਣੇ ਆਪਣਾ ਪਹਿਲਾ ਪੰਜਾਬ ਮੌਕ ਟੈਸਟ ਦਿਓ" />
              </h2>
              <p className="text-white/80">
                <T en="25 questions · 20 minutes · Hindi & English · No login" pa="25 ਪ੍ਰਸ਼ਨ · 20 ਮਿੰਟ · ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ · ਲੌਗ ਇਨ ਨਹੀਂ" />
              </p>
            </div>
            <Link href={freeMockHref(site)} className={btn("accent", "lg")}>
              <T en="Start free mock" pa="ਮੁਫ਼ਤ ਮੌਕ ਸ਼ੁਰੂ ਕਰੋ" /> <Clock className="size-5" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

/** Card for an exam whose paid series is still being built: free sample mock now, eligibility and syllabus summary. */
function UpcomingCard({ exam }: { exam: UpcomingExam }) {
  const rows = [
    ["Eligibility", exam.eligibility],
    ["Exam pattern", exam.pattern],
    ["Syllabus", exam.syllabus],
  ];
  return (
    <div className="relative flex flex-col rounded-2xl border border-border bg-background p-5 md:p-6">
      <span className="absolute right-5 top-5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-ink">Series soon</span>
      <h3 className="flex items-start gap-2 pr-24 font-semibold">
        <BadgeIndianRupee className="mt-0.5 size-5 shrink-0 text-primary" /> {exam.name}
      </h3>
      <p className="mt-4">
        <span className="text-4xl font-bold">₹0</span>
        <span className="ml-1 text-sm text-muted">free mock test</span>
      </p>
      <dl className="mt-5 flex-1 space-y-3 text-sm">
        {rows.map(([label, text]) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-primary">{label}</dt>
            <dd className="mt-0.5 leading-relaxed text-muted">{text}</dd>
          </div>
        ))}
      </dl>
      <Link href={`/tests/${exam.freeMockSlug}`} className={`${btn("primary")} mt-6`}>
        Start free mock
      </Link>
    </div>
  );
}
