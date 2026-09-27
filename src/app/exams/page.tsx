import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { card } from "@/components/ui";
import { site } from "@/lib/site";
import { getCatalog } from "@/modules/catalog/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Himachal Pradesh Govt Exams — Mock Tests & Test Series",
  description:
    "Mock tests for every major Himachal Pradesh government exam: HPRCA JOA IT & Clerk, HPPSC HPAS, HP Police Constable, HP TET and Patwari. Real CBT interface in Hindi & English.",
  alternates: { canonical: "/exams" },
};

export default async function ExamsPage() {
  const catalog = await getCatalog();
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
        <div className="max-w-2xl space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Himachal Pradesh government exams</h1>
          <p className="text-muted">Choose your exam for free mock tests, exam information and the complete test series.</p>
        </div>
        {catalog.map((b) => (
          <section key={b.slug} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{b.name}</h2>
              {b.nameHi && <p className="text-sm text-muted">{b.nameHi}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {b.exams.map((e) => (
                <Link key={e.href} href={e.href} className={`${card} group flex items-center gap-4 p-5 hover:border-primary`}>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-sm font-bold text-primary">
                    {e.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{e.name} Mock Test</span>
                    <span className="block text-sm text-muted">{e.nameHi}</span>
                  </span>
                  <ChevronRight className="size-5 text-muted group-hover:text-primary" />
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
