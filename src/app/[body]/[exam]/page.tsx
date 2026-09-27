import { CheckCircle2, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Mountains } from "@/components/mountains";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestCard } from "@/components/test-card";
import { btn, card } from "@/components/ui";
import { site } from "@/lib/site";
import { examLabel, getAllExamParams, getCatalog, getExamPage } from "@/modules/catalog/queries";

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
  return {
    title: `${name} Mock Test ${year()} — Free Test Series in Hindi & English`,
    description: `Free ${name} mock tests in a real CBT exam interface. Himachal GK, reasoning, maths and more in Hindi & English, with detailed solutions and your rank among HP aspirants.`,
    alternates: { canonical: `/${body}/${exam}` },
    openGraph: { title: `${name} Mock Test ${year()}`, url: `/${body}/${exam}` },
  };
}

export default async function ExamPage({ params }: PageProps<"/[body]/[exam]">) {
  const { body, exam } = await params;
  const [data, catalog] = await Promise.all([getExamPage(body, exam), getCatalog()]);
  if (!data) notFound();

  const name = examLabel(data.body.slug, data.name);
  const firstFree = data.tests.find((t) => t.isFree);
  const related = catalog.flatMap((b) => b.exams).filter((e) => e.href !== `/${body}/${exam}`).slice(0, 6);

  const faqs = [
    {
      q: `Is the ${name} mock test available for free?`,
      a: `Yes. You can start with free ${name} mock tests without logging in. Log in for free to save your results and see your rank among Himachal aspirants.`,
    },
    {
      q: `Is the ${name} mock test available in Hindi?`,
      a: "Yes. Every question, option and explanation is available in both Hindi and English, and you can switch language at any time during the test.",
    },
    {
      q: `Is the test interface similar to the real ${data.body.slug.toUpperCase()} exam?`,
      a: "Yes. Tests run in a CBT interface with a question palette, Mark for Review & Next, Save & Next, section tabs and an auto-submitting timer, just like government computer-based exams.",
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Exams", item: `${site.url}/exams` },
            { "@type": "ListItem", position: 3, name: `${name} Mock Test`, item: `${site.url}/${body}/${exam}` },
          ],
        }}
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-br from-[#0b1f5c] via-[#133a9e] to-[#1e4fd8] text-white">
          <div className="relative mx-auto w-full max-w-6xl space-y-5 px-4 pb-28 pt-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="size-4" />
              <Link href="/exams" className="hover:text-white">
                Exams
              </Link>
              <ChevronRight className="size-4" />
              <span className="text-white">{name}</span>
            </nav>
            <p className="inline-block rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20">{data.body.name}</p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {name} Mock Test {year()}
            </h1>
            {data.nameHi && <p className="text-lg text-white/85">{data.nameHi} मॉक टेस्ट — हिंदी और अंग्रेज़ी में, असली CBT परीक्षा जैसा</p>}
            <div className="flex flex-wrap gap-3 pt-2">
              {firstFree && (
                <Link href={`/tests/${firstFree.slug}/attempt`} className={btn("accent", "lg")}>
                  Start free mock test <ChevronRight className="size-5" />
                </Link>
              )}
              <a href="#tests" className={btn("white", "lg")}>
                View all tests
              </a>
            </div>
          </div>
          <Mountains className="absolute inset-x-0 bottom-0 h-24 w-full" />
        </section>

        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-12">
            {data.description && (
              <section className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight">About the {name} exam</h2>
                <p className="leading-relaxed text-foreground/85">{data.description}</p>
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

            <section id="tests" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">{name} mock tests</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.tests.map((t) => (
                  <TestCard key={t.slug} test={t} />
                ))}
              </div>
              {data.tests.length === 0 && (
                <p className={`${card} p-5 text-muted`}>Full {name} mock tests are being added. Start with the free Himachal GK mock meanwhile.</p>
              )}
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">{name} mock test — FAQs</h2>
              <div className="space-y-3">
                {faqs.map((f) => (
                  <details key={f.q} className={`${card} group p-5`}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                      {f.q}
                      <ChevronRight className="size-5 shrink-0 text-muted transition group-open:rotate-90" />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className={`${card} space-y-4 p-5 lg:sticky lg:top-24`}>
              <h2 className="font-semibold">What you get</h2>
              <ul className="space-y-2.5 text-sm">
                {["Real CBT exam interface", "Hindi & English questions", "Detailed solutions", "Rank among HP aspirants", "Section & topic analysis"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success" /> {t}
                  </li>
                ))}
              </ul>
              {firstFree && (
                <Link href={`/tests/${firstFree.slug}/attempt`} className={btn("primary", "md", "w-full")}>
                  Take free test
                </Link>
              )}
            </div>
            {related.length > 0 && (
              <div className={`${card} p-5`}>
                <h2 className="mb-3 font-semibold">Other Himachal exams</h2>
                <ul className="space-y-2 text-sm">
                  {related.map((e) => (
                    <li key={e.href}>
                      <Link href={e.href} className="text-muted hover:text-primary">
                        {examLabel(e.bodySlug, e.name)} Mock Test
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
