import { CheckCircle2, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildExamCtx, Disclaimer } from "@/components/exam-landing";
import { JsonLd } from "@/components/json-ld";
import { Mountains } from "@/components/mountains";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestCard } from "@/components/test-card";
import { TrackedLink } from "@/components/tracked-link";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
import { clipDescription } from "@/lib/seo";
import { site } from "@/lib/site";
import { examLabel, examShortName, getExamPage, getExamsWithTests, type PublicTest } from "@/modules/catalog/queries";

export const revalidate = 600;

export async function generateStaticParams() {
  return (await getExamsWithTests()).map(({ body, exam }) => ({ body, exam }));
}

const year = () => new Date().getFullYear();

export async function generateMetadata({ params }: PageProps<"/[body]/[exam]/tests">): Promise<Metadata> {
  const { body, exam } = await params;
  const data = await getExamPage(body, exam);
  if (!data?.tests.some((t) => t.examName)) return {};
  const name = examShortName(examLabel(data.body.slug, data.name), data.seo.title);
  const title = `All ${name} Mock Tests ${year()} — Free & Paid, Hindi & English`;
  const description = clipDescription(`Every ${name} test in one place: free tests, subject tests, full mocks and previous year papers in a real CBT interface, with solutions in Hindi and English.`);
  return {
    title,
    description,
    alternates: { canonical: `/${body}/${exam}/tests` },
    openGraph: { title, description, url: `/${body}/${exam}/tests` },
  };
}

type Stage = { id: string; title: string; hint: string; dot: string; tests: PublicTest[] };

export default async function ExamTestsPage({ params }: PageProps<"/[body]/[exam]/tests">) {
  const { body, exam } = await params;
  const data = await getExamPage(body, exam);
  // "Own" tests were made for this exam; the generic Himachal GK mock is offered too but is not counted.
  const own = data?.tests.filter((t) => t.examName !== null) ?? [];
  if (!data || own.length === 0) notFound();

  const name = examShortName(examLabel(data.body.slug, data.name), data.seo.title);
  const ctx = buildExamCtx(data, name);
  const free = data.tests.filter((t) => t.isFree);
  const paid = own.filter((t) => !t.isFree);
  // Tests with a free demo come first: they are the paid product's shop window.
  const demoFirst = (tests: PublicTest[]) => [...tests].sort((a, b) => Number(b.hasDemo) - Number(a.hasDemo));
  const stages: Stage[] = [
    { id: "free", title: "Start here", hint: "Free tests. No payment, no login.", dot: "bg-success", tests: free },
    { id: "subject", title: "Subject tests", hint: "Practise one subject at a time.", dot: "bg-cbt-marked", tests: demoFirst(paid.filter((t) => t.type === "SECTIONAL" || t.type === "TOPIC")) },
    { id: "mocks", title: "Full mock tests", hint: "A complete paper in the real exam screen.", dot: "bg-primary", tests: demoFirst(paid.filter((t) => t.type === "MOCK")) },
    { id: "pyq", title: "Previous year papers", hint: "Solve papers that were actually asked.", dot: "bg-accent text-[#1f1300]", tests: demoFirst(paid.filter((t) => t.type === "PYQ")) },
  ].filter((s) => s.tests.length > 0);

  const pattern = data.pattern;
  const sumOf = (pick: (s: NonNullable<typeof pattern>["sections"][number]) => number | null | undefined) => pattern?.sections.reduce((n, s) => n + (pick(s) ?? 0), 0) ?? 0;
  const patternFacts = pattern
    ? [
        sumOf((s) => s.questions) > 0 && ["Questions", String(sumOf((s) => s.questions))],
        sumOf((s) => s.marks) > 0 && ["Marks", String(sumOf((s) => s.marks))],
        pattern.durationMin ? ["Time", `${pattern.durationMin} min`] : false,
        pattern.negativeMarking ? ["Negative marking", pattern.negativeMarking] : false,
      ].filter((r): r is string[] => Array.isArray(r))
    : [];

  const offer = data.offer;
  const price = offer ? rupees(offer.priceInPaise) : null;
  const unlockLabel = paid.length > 0 && price ? `Unlock all ${paid.length} for ${price}` : null;
  const paperCount = own.filter((t) => t.type === "PYQ").length;
  const stats = [`${own.length - paperCount} tests`, ...(paperCount > 0 ? [`${paperCount} previous year ${paperCount === 1 ? "paper" : "papers"}`] : []), ...(free.length > 0 ? [`${free.length} free`] : []), "Real CBT screen", "Solutions in Hindi & English"];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Mock tests", item: `${site.url}/tests` },
            { "@type": "ListItem", position: 3, name: `${name} tests`, item: `${site.url}${ctx.base}/tests` },
          ],
        }}
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-br from-[#0b1f5c] via-[#133a9e] to-[#1e4fd8] text-white">
          <div className="relative mx-auto w-full max-w-6xl space-y-4 px-4 pb-24 pt-6">
            <Breadcrumbs
              light
              links={[
                { href: "/", label: "Home" },
                { href: "/tests", label: "Mock tests" },
              ]}
              current={name}
            />
            <h1 className="max-w-3xl text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">{name} mock tests</h1>
            {data.nameHi && (
              <p lang="hi" className="text-[15px] text-white/85 sm:text-lg">
                {data.nameHi} · हिंदी और अंग्रेज़ी में
              </p>
            )}
            <ul className="flex flex-wrap gap-2 text-sm">
              {stats.map((s) => (
                <li key={s} className="rounded-full bg-white/15 px-3.5 py-1 font-medium">
                  {s}
                </li>
              ))}
            </ul>
            <div className="grid gap-2.5 pt-1 sm:flex sm:flex-wrap sm:gap-3">
              {ctx.startHref && (
                <TrackedLink href={ctx.startHref} event="landing_cta_click" params={{ exam: ctx.key, placement: "tests-hero" }} className={btn("accent", "lg", "w-full sm:w-auto")}>
                  {ctx.startLabel} <ChevronRight className="size-5" />
                </TrackedLink>
              )}
              {offer && unlockLabel && (
                <TrackedLink
                  href={`/buy/${offer.slug}`}
                  event="landing_buy_click"
                  params={{ exam: ctx.key, placement: "tests-hero", price: offer.priceInPaise / 100 }}
                  className="inline-flex h-13 w-full items-center justify-center rounded-xl border-2 border-white/60 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                >
                  {unlockLabel}
                </TrackedLink>
              )}
            </div>
            <Disclaimer bodyName={data.body.name} />
          </div>
          <Mountains className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-24" />
        </section>

        <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8">
          {patternFacts.length > 0 && (
            <dl aria-label={`${name} exam pattern`} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {patternFacts.map(([k, v]) => (
                <div key={k} className={`${card} px-4 py-3`}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {stages.length > 1 && (
            <nav aria-label="Jump to a kind of test" className="sticky top-0 z-10 -mx-4 flex gap-2 overflow-x-auto bg-background px-4 py-2">
              {stages.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface px-4 text-sm font-medium transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {s.title} <span className="text-muted">{s.tests.length}</span>
                </a>
              ))}
            </nav>
          )}

          {/* A trail: each stage hangs off a dotted line, in the order a student should work through them. */}
          <div className="space-y-8">
            {stages.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="grid scroll-mt-16 grid-cols-[2.25rem_1fr] gap-x-3 sm:grid-cols-[2.75rem_1fr] sm:gap-x-4">
                <div className="flex flex-col items-center" aria-hidden>
                  <span className={`grid size-9 place-items-center rounded-full text-sm font-bold text-white sm:size-11 sm:text-base ${s.dot}`}>{i + 1}</span>
                  {i < stages.length - 1 && <span className="mt-1.5 w-0.5 flex-1 border-l-2 border-dashed border-border" />}
                </div>
                <div className="min-w-0 space-y-3">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h2 id={`${s.id}-h`} className="text-xl font-bold">
                      {s.title}
                    </h2>
                    <p className="text-sm text-muted">{s.hint}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {s.tests.map((t) => (
                      <TestCard key={t.slug} test={t} />
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {offer && price && paid.length > 0 && (
            <section className="flex flex-col gap-4 rounded-2xl border border-accent bg-accent-soft p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-bold">
                  Unlock all {paid.length} paid {name} tests for {price}
                </h2>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <CheckCircle2 className="size-4 text-success" aria-hidden /> One payment, every test and solution. No auto-renewal.
                </p>
              </div>
              <TrackedLink
                href={`/buy/${offer.slug}`}
                event="landing_buy_click"
                params={{ exam: ctx.key, placement: "tests-bar", price: offer.priceInPaise / 100 }}
                className={btn("accent", "lg", "w-full shrink-0 sm:w-auto")}
              >
                Unlock for {price}
              </TrackedLink>
            </section>
          )}

          <p className="text-sm text-muted">
            About the exam: <Link href={ctx.base} className="font-medium text-primary hover:underline">{name} syllabus, pattern and FAQs</Link>. Looking for another exam?{" "}
            <Link href="/tests" className="font-medium text-primary hover:underline">
              See all exams
            </Link>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
