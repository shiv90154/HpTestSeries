import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { card } from "@/components/ui";
import { site } from "@/lib/site";
import { hasBodyPage } from "@/modules/catalog/body-info";
import { bodyShortName, getCatalog } from "@/modules/catalog/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Himachal Pradesh Govt Exams — Mock Tests & Test Series",
  description:
    "Mock tests for Himachal govt exams: Patwari, Police, JOA IT, Clerk, HP TET, JBT, TGT, Staff Nurse, HPAS, High Court. Real CBT in Hindi & English.",
  alternates: { canonical: "/exams" },
};

/** Short badge text: a leading acronym (JOA, HPAS) as is, otherwise the initials of the first two words. */
function badge(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0] ?? "";
  if (first.length >= 3 && first === first.toUpperCase()) return first.slice(0, 4);
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default async function ExamsPage() {
  const catalog = await getCatalog();
  const totalExams = catalog.reduce((n, b) => n + b.exams.length, 0);
  const totalTests = catalog.reduce((n, b) => n + b.exams.reduce((m, e) => m + e.testCount, 0), 0);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Exams", item: `${site.url}/exams` },
          ],
        }}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-4 py-12">
        <header className="space-y-5">
          <div className="max-w-2xl space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Himachal Pradesh government exams</h1>
            <p className="text-muted">Choose your exam for free mock tests, exam information and the complete test series.</p>
          </div>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            <span>
              <strong className="text-foreground">{totalExams}</strong> exams
            </span>
            <span>
              <strong className="text-foreground">{catalog.length}</strong> recruitment bodies
            </span>
            <span>
              <strong className="text-foreground">{totalTests}</strong> mock tests
            </span>
          </p>
          <nav aria-label="Jump to a recruitment body" className="flex flex-wrap gap-2">
            {catalog.map((b) => (
              <a
                key={b.slug}
                href={`#${b.slug}`}
                className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {b.name}
              </a>
            ))}
          </nav>
        </header>
        {catalog.map((b) => (
          <section key={b.slug} id={b.slug} aria-labelledby={`${b.slug}-h`} className="scroll-mt-24 space-y-4">
            <div className="flex items-end justify-between gap-3 border-b border-border pb-3">
              <div>
                <h2 id={`${b.slug}-h`} className="text-xl font-semibold">
                  {b.name}
                </h2>
                {b.nameHi && (
                  <p lang="hi" className="text-sm text-muted">
                    {b.nameHi}
                  </p>
                )}
              </div>
              <span className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-3">
                {hasBodyPage(b) && (
                  <Link href={`/${b.slug}`} className="inline-flex min-h-10 items-center text-sm font-semibold text-primary hover:underline">
                    All {bodyShortName(b.slug)} mock tests →
                  </Link>
                )}
                <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-muted">
                  {b.exams.length} {b.exams.length === 1 ? "exam" : "exams"}
                </span>
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {b.exams.map((e) => (
                <Link key={e.href} href={e.href} className={`${card} group flex items-center gap-4 p-5 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0`}>
                  <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-sm font-bold text-primary">
                    {badge(e.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{e.name} Mock Test</span>
                    <span lang="hi" className="block text-sm text-muted">
                      {e.nameHi}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-primary">
                      {e.testCount > 0 ? `${e.testCount} ${e.testCount === 1 ? "test" : "tests"} available` : "Tests launching soon"}
                    </span>
                  </span>
                  <ChevronRight className="size-5 text-muted transition duration-200 group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transition-none" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
