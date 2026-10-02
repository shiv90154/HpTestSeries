import { CheckCircle2, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildExamCtx, Disclaimer, ExamFinalCta, ExamTabs, HowItWorks, OfferCard } from "@/components/exam-landing";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { Markdown } from "@/components/markdown";
import { Mountains } from "@/components/mountains";
import { PostCard } from "@/components/post-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestCard } from "@/components/test-card";
import { TrackedLink } from "@/components/tracked-link";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
import { site } from "@/lib/site";
import { bodyShortName, examLabel, examShortName, getAllExamParams, getCatalog, getExamPage, syllabusOutline, type PublicTest } from "@/modules/catalog/queries";
import { faqPageJsonLd } from "@/modules/content/exam-content";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getAllExamParams()).map(({ body, exam }) => ({ body, exam }));
}

const year = () => new Date().getFullYear();

export async function generateMetadata({ params }: PageProps<"/[body]/[exam]">): Promise<Metadata> {
  const { body, exam } = await params;
  const data = await getExamPage(body, exam);
  if (!data) return {};
  const name = examLabel(data.body.slug, data.name);
  // Admin-set SEO copy wins; `{year}` in it is replaced so titles don't go stale every January.
  const title = data.seo.title.replaceAll("{year}", String(year())) || `${name} Mock Test ${year()} — Free Test Series in Hindi & English`;
  const description =
    data.seo.description.replaceAll("{year}", String(year())) ||
    `Free ${name} mock tests in a real CBT exam interface. Himachal GK, reasoning, maths and more in Hindi & English, with detailed solutions and your rank among HP aspirants.`;
  return {
    // An admin-written title is used as-is, without the "| HP Test Series" suffix.
    title: data.seo.title ? { absolute: title } : title,
    description,
    alternates: { canonical: `/${body}/${exam}` },
    openGraph: { title, description, url: `/${body}/${exam}` },
  };
}

const typeIs = (...types: string[]) => (t: PublicTest) => types.includes(t.type);

export default async function ExamPage({ params }: PageProps<"/[body]/[exam]">) {
  const { body, exam } = await params;
  const [data, catalog] = await Promise.all([getExamPage(body, exam), getCatalog()]);
  if (!data) notFound();

  const name = examShortName(examLabel(data.body.slug, data.name), data.seo.title);
  const ctx = buildExamCtx(data, name);
  const outline = syllabusOutline(data.syllabus);
  const related = catalog
    .flatMap((b) => b.exams)
    .filter((e) => e.href !== ctx.base)
    .sort((a, b) => Number(b.bodySlug === body) - Number(a.bodySlug === body) || b.testCount - a.testCount)
    .slice(0, 8);

  // "Own" tests were made for this exam; the generic Himachal GK mock is also offered here but is not counted.
  const own = data.tests.filter((t) => t.examName !== null);
  const free = data.tests.filter((t) => t.isFree);
  const questions = own.reduce((n, t) => n + t.questionCount, 0);
  // Tests with a free demo come first: they are the paid product's shop window.
  const demoFirst = (tests: PublicTest[]) => [...tests].sort((a, b) => Number(b.hasDemo) - Number(a.hasDemo));
  const groups = [
    { id: "free", title: "Free tests", tests: free, max: 6 },
    { id: "mocks", title: "Full-length mock tests", tests: demoFirst(own.filter((t) => !t.isFree && t.type === "MOCK")), max: 4 },
    { id: "subject", title: "Subject and topic tests", tests: demoFirst(own.filter((t) => !t.isFree && typeIs("SECTIONAL", "TOPIC")(t))), max: 4 },
    { id: "pyq", title: "Previous year papers", tests: demoFirst(own.filter((t) => !t.isFree && t.type === "PYQ")), max: 2 },
  ].filter((g) => g.tests.length > 0);

  // Only real numbers: an exam with no tests of its own does not claim "0 mock tests".
  const stats: string[][] = [
    ...(own.length > 0 ? [[String(own.length), own.length === 1 ? "Mock test" : "Mock tests"]] : []),
    ...(free.length > 0 ? [[String(free.length), free.length === 1 ? "Free test" : "Free tests"]] : []),
    ...(questions > 0 ? [[questions.toLocaleString("en-IN"), "Questions"]] : []),
    data.offer ? [rupees(data.offer.priceInPaise), "Full series"] : ["₹0", "To start"],
  ];
  if (stats.length < 4) stats.splice(stats.length - 1, 0, ["2", "Languages"]);

  const faqs = [
    ...data.faqs,
    {
      q: `Is the ${name} mock test available for free?`,
      a: `Yes. You can start with free ${name} mock tests without logging in. Log in for free to save your results and see your rank among Himachal aspirants.`,
    },
    {
      q: `Is the ${name} mock test available in Hindi?`,
      a: "Yes. Every question, option and explanation is available in both Hindi and English, and you can switch language at any time during the test.",
    },
    {
      q: `Is the test interface similar to the real ${bodyShortName(data.body.slug)} exam?`,
      a: "Yes. Tests run in a CBT interface with a question palette, Mark for Review & Next, Save & Next, section tabs and an auto-submitting timer, just like government computer-based exams.",
    },
  ];

  const patternFacts = data.pattern
    ? [
        data.pattern.sections.length > 0 && ["Total questions", String(data.pattern.sections.reduce((n, s) => n + (s.questions ?? 0), 0) || "—")],
        data.pattern.sections.length > 0 && ["Total marks", String(data.pattern.sections.reduce((n, s) => n + (s.marks ?? 0), 0) || "—")],
        data.pattern.durationMin ? ["Duration", `${data.pattern.durationMin} minutes`] : false,
        data.pattern.negativeMarking ? ["Negative marking", data.pattern.negativeMarking] : false,
      ].filter((r): r is string[] => Array.isArray(r) && r[1] !== "—" && r[1] !== "0")
    : [];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Exams", item: `${site.url}/exams` },
              { "@type": "ListItem", position: 3, name: `${name} Mock Test`, item: `${site.url}${ctx.base}` },
            ],
          },
          faqPageJsonLd(faqs),
          ...(data.offer
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "Course",
                  name: `${name} Mock Test Series`,
                  description: `Full-length and subject-wise ${name} mock tests in a real CBT interface, with solutions in Hindi and English and a rank among Himachal aspirants.`,
                  provider: { "@type": "Organization", name: site.name, url: site.url },
                  inLanguage: ["en", "hi"],
                  offers: {
                    "@type": "Offer",
                    category: "Paid",
                    price: String(data.offer.priceInPaise / 100),
                    priceCurrency: "INR",
                    url: `${site.url}/buy/${data.offer.slug}`,
                  },
                },
              ]
            : []),
        ]}
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-br from-[#0b1f5c] via-[#133a9e] to-[#1e4fd8] text-white">
          <div className="pointer-events-none absolute -right-32 -top-32 size-105 rounded-full bg-[#3b6ef5]/40 blur-3xl" />
          <div className="relative mx-auto w-full max-w-6xl space-y-4 px-4 pb-28 pt-7 sm:space-y-5">
            <Breadcrumbs
              light
              links={[
                { href: "/", label: "Home" },
                { href: "/exams", label: "Exams" },
              ]}
              current={name}
            />
            <p className="inline-block rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20">{data.body.name}</p>
            <h1 className="max-w-3xl text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
              {name} Mock Test {year()}
            </h1>
            {data.nameHi && (
              <p lang="hi" className="text-[15px] text-white/85 sm:text-lg">
                {data.nameHi} मॉक टेस्ट — हिंदी और अंग्रेज़ी में, असली CBT परीक्षा जैसा
              </p>
            )}
            <p className="max-w-2xl text-white/85">
              Practise {name} in the real computer-based format: Hindi and English questions, a solution for every question and your rank among Himachal aspirants.
            </p>
            <div className="grid gap-2.5 pt-1 sm:flex sm:flex-wrap sm:gap-3">
              {ctx.startHref && (
                <TrackedLink href={ctx.startHref} event="landing_cta_click" params={{ exam: ctx.key, placement: "hero" }} className={btn("accent", "lg", "w-full sm:w-auto")}>
                  {ctx.startLabel} <ChevronRight className="size-5" />
                </TrackedLink>
              )}
              <a href="#tests" className={btn("white", "lg", "w-full sm:w-auto")}>
                View all tests
              </a>
            </div>
            <ul className="flex flex-wrap gap-2 text-xs text-white/90 sm:gap-x-6 sm:text-sm">
              {["No login for free tests", "Hindi & English", "Instant solutions"].map((t) => (
                <li key={t} className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 sm:bg-transparent sm:p-0">
                  <CheckCircle2 className="size-3.5 text-accent sm:size-4" aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <Disclaimer bodyName={data.body.name} />
          </div>
          <Mountains className="absolute inset-x-0 bottom-0 h-24 w-full" />
        </section>

        <section aria-label={`${name} at a glance`} className="relative z-10 mx-auto -mt-10 w-full max-w-5xl px-4">
          <dl className={`${card} grid divide-x divide-border p-1 shadow-lg sm:p-2`} style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
            {stats.map(([v, l]) => (
              // dt first in the DOM (screen readers read "Mock tests, 26"); flex-col-reverse puts the figure on top.
              <div key={l} className="flex flex-col-reverse px-1 py-3 text-center sm:p-4">
                <dt className="text-[11px] text-muted sm:text-xs">{l}</dt>
                <dd className="text-base font-bold text-primary sm:text-2xl">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-12">
            <ExamTabs ctx={ctx} active="overview" />
            <OfferCard ctx={ctx} placement="inline" className="lg:hidden" />

            {data.description && (
              <section className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight">About the {name} exam</h2>
                <Markdown text={data.description} />
                {data.stages.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {data.stages.map((s) => (
                      <span key={s.name} className="rounded-full border border-border bg-surface px-3 py-1 text-sm">
                        {s.name}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted">Always check the latest official notification for the current exam pattern, syllabus and eligibility.</p>
              </section>
            )}

            {data.pattern && (
              <section className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight">
                  {name} exam pattern {year()}
                </h2>
                {patternFacts.length > 0 && (
                  <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {patternFacts.map(([k, v]) => (
                      <div key={k} className={`${card} p-4`}>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-primary">{k}</dt>
                        <dd className="mt-1 font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {data.pattern.note && <p className="text-sm text-muted">{data.pattern.note}</p>}
                {ctx.has.pattern && (
                  <Link href={`${ctx.base}/exam-pattern`} className="inline-flex min-h-10 items-center text-sm font-semibold text-primary hover:underline">
                    Full {name} exam pattern →
                  </Link>
                )}
              </section>
            )}

            {outline.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight">{name} syllabus at a glance</h2>
                <ul className="flex flex-wrap gap-2">
                  {outline.slice(0, 10).map((h) => (
                    <li key={h} className="rounded-full border border-border bg-surface px-3 py-1 text-sm">
                      {h}
                    </li>
                  ))}
                </ul>
                <Link href={`${ctx.base}/syllabus`} className="inline-flex min-h-10 items-center text-sm font-semibold text-primary hover:underline">
                  Read the full {name} syllabus {year()} →
                </Link>
              </section>
            )}

            <section id="tests" className="scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">{name} mock tests</h2>
              {groups.map((g) => (
                <div key={g.id} className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    {g.title} <span className="text-sm font-normal text-muted">({g.tests.length})</span>
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {g.tests.slice(0, g.max).map((t) => (
                      <TestCard key={t.slug} test={t} />
                    ))}
                  </div>
                </div>
              ))}
              {own.length > 0 && (
                <Link
                  href={`/tests?exam=${encodeURIComponent(data.name)}`}
                  className="inline-flex min-h-10 items-center text-sm font-semibold text-primary hover:underline"
                >
                  See all {own.length} {name} tests →
                </Link>
              )}
              {own.length === 0 && (
                <p className={`${card} p-5 text-muted`}>
                  Full {name} mock tests are being added. Start with the free test above meanwhile, and check back for the complete series.
                </p>
              )}
            </section>

            <section className="space-y-5">
              <h2 className="text-2xl font-bold tracking-tight">How to practise for {name}</h2>
              <HowItWorks />
            </section>

            {data.posts.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="text-2xl font-bold tracking-tight">Latest {name} updates</h2>
                  <Link href="/blog" className="shrink-0 text-sm font-medium text-primary hover:underline">
                    All exam updates →
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {data.posts.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              </section>
            )}

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">{name} — FAQs</h2>
              <FaqList faqs={faqs} />
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <OfferCard ctx={ctx} placement="aside" className="hidden lg:block" />
            <div className={`${card} space-y-4 p-5`}>
              <h2 className="font-semibold">What you get</h2>
              <ul className="space-y-2.5 text-sm">
                {["Real CBT exam interface", "Hindi & English questions", "Detailed solutions", "Rank among HP aspirants", "Section & topic analysis"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success" aria-hidden /> {t}
                  </li>
                ))}
              </ul>
              {ctx.startHref && (
                <TrackedLink href={ctx.startHref} event="landing_cta_click" params={{ exam: ctx.key, placement: "aside" }} className={btn("primary", "md", "w-full")}>
                  Take free test
                </TrackedLink>
              )}
            </div>
            {related.length > 0 && (
              <div className={`${card} p-5`}>
                <h2 className="mb-3 font-semibold">Other Himachal exams</h2>
                <ul className="space-y-1 text-sm">
                  {related.map((e) => (
                    <li key={e.href}>
                      <Link href={e.href} className="block py-1.5 text-muted hover:text-primary">
                        {examLabel(e.bodySlug, e.name)} Mock Test
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/exams" className="mt-2 inline-flex min-h-10 items-center text-sm font-semibold text-primary hover:underline">
                  All Himachal exams →
                </Link>
              </div>
            )}
          </aside>
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 pb-14">
          <ExamFinalCta ctx={ctx} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
