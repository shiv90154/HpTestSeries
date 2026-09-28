import { CheckCircle2, ChevronRight, Clock, FileText, Languages, MinusCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn, card } from "@/components/ui";
import { site } from "@/lib/site";
import { getTestMeta } from "@/modules/assessment/service";
import { getPublishedTests } from "@/modules/catalog/queries";

export const revalidate = 600;

export async function generateStaticParams() {
  return (await getPublishedTests()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tests/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTestMeta(slug);
  if (!t) return {};
  return {
    title: `${t.title} — Online ${t.isFree ? "Free " : ""}Mock Test (Hindi & English)`,
    description: `${t.questionCount} questions, ${Math.round(t.durationSec / 60)} minutes. Attempt the ${t.title} online in a real CBT exam interface with instant result, rank and detailed solutions.`,
    alternates: { canonical: `/tests/${slug}` },
  };
}

export default async function TestDetailPage({ params }: PageProps<"/tests/[slug]">) {
  const { slug } = await params;
  const t = await getTestMeta(slug);
  if (!t) notFound();
  const negatives = [...new Set(t.sections.map((s) => s.marksWrong))];
  const negativeLabel = negatives.length > 1 ? "Varies" : negatives[0] ? `−${negatives[0]}` : "None";

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Mock Tests", item: `${site.url}/tests` },
              { "@type": "ListItem", position: 3, name: t.title, item: `${site.url}/tests/${slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: t.title,
            url: `${site.url}/tests/${slug}`,
            learningResourceType: "Mock test",
            educationalUse: "assessment",
            inLanguage: ["en-IN", "hi-IN"],
            timeRequired: `PT${Math.round(t.durationSec / 60)}M`,
            isAccessibleForFree: t.isFree,
            provider: { "@type": "Organization", name: site.name, url: site.url },
          },
        ]}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 space-y-8 px-4 py-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="size-4" />
          <Link href="/tests" className="hover:text-primary">
            Mock Tests
          </Link>
          <ChevronRight className="size-4" />
          <span className="truncate text-foreground">{t.title}</span>
        </nav>

        <header className="space-y-3">
          {t.isFree && <span className="rounded-md bg-success-soft px-2 py-1 text-xs font-bold text-success">FREE · NO LOGIN NEEDED</span>}
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          {t.titleHi && <p className="text-lg text-muted">{t.titleHi}</p>}
          {t.instructions && <p className="max-w-2xl text-foreground/85">{t.instructions}</p>}
          {t.exam && (
            <Link href={t.exam.href} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              {t.exam.name} exam — pattern, syllabus &amp; all tests <ChevronRight className="size-4" />
            </Link>
          )}
        </header>

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            [FileText, `${t.questionCount}`, "Questions"],
            [Clock, `${Math.round(t.durationSec / 60)} min`, "Duration"],
            [CheckCircle2, `${t.maxScore}`, "Total marks"],
            [MinusCircle, negativeLabel, "Negative marking"],
          ].map(([Icon, v, l]) => {
            const I = Icon as typeof FileText;
            return (
              <div key={l as string} className={`${card} p-4`}>
                <dt className="flex items-center gap-1.5 text-xs text-muted">
                  <I className="size-4" /> {l as string}
                </dt>
                <dd className="mt-1 text-xl font-semibold">{v as string}</dd>
              </div>
            );
          })}
        </dl>

        <section className={`${card} overflow-hidden`}>
          <h2 className="border-b border-border px-5 py-3 font-semibold">Sections</h2>
          <table className="w-full text-sm">
            <thead className="bg-surface-muted text-left text-xs text-muted">
              <tr>
                <th className="px-5 py-2">Section</th>
                <th className="px-3 py-2 text-right sm:px-5">Questions</th>
                <th className="px-3 py-2 text-right sm:px-5">Correct</th>
                <th className="px-3 py-2 text-right sm:px-5">Wrong</th>
              </tr>
            </thead>
            <tbody>
              {t.sections.map((s) => (
                <tr key={s.name} className="border-t border-border">
                  <td className="px-5 py-3">
                    {s.name}
                    {s.nameHi && <span className="block text-xs text-muted sm:ml-2 sm:inline sm:text-sm">{s.nameHi}</span>}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums sm:px-5">{s.count}</td>
                  <td className="px-3 py-3 text-right tabular-nums text-success sm:px-5">+{s.marksCorrect}</td>
                  <td className={`px-3 py-3 text-right tabular-nums sm:px-5 ${s.marksWrong ? "text-danger" : "text-muted"}`}>
                    {s.marksWrong ? `−${s.marksWrong}` : "0"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="flex flex-col items-start gap-4 rounded-2xl bg-primary-soft p-6 sm:flex-row sm:items-center">
          <Languages className="size-8 shrink-0 text-primary" />
          <p className="flex-1 text-sm">
            Real CBT interface with question palette, Mark for Review and a live timer. Switch between Hindi and English any time.
          </p>
          <Link href={`/tests/${slug}/attempt`} className={btn("primary", "lg")}>
            Start test now <ChevronRight className="size-5" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
