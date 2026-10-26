import { CheckCircle2, ChevronRight, Clock, FileText, Languages, Lock, MinusCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OwnedGate } from "@/components/my-access";
import { btn, card } from "@/components/ui";
import { T, Tx } from "@/components/ui-lang";
import { rupees } from "@/lib/money";
import { canonicalFor, PRIMARY_SITE } from "@/sites";
import { currentSite } from "@/sites/current";
import { canonicalSiteCode } from "@/modules/catalog/visibility";
import { getTestMeta } from "@/modules/assessment/service";
import { getPublishedTests } from "@/modules/catalog/queries";
import { getBuyOptionForSeries } from "@/modules/commerce/product-service";
import { LiveBanner } from "./live-banner";
import { MyResults } from "./my-results";

export const revalidate = 600;

export async function generateStaticParams() {
  const site = await currentSite();
  return (await getPublishedTests(site.code)).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[site]/tests/[slug]">): Promise<Metadata> {
  const site = await currentSite();
  const { slug } = await params;
  const t = await getTestMeta(slug, site.code);
  if (!t) return {};
  return {
    title: `${t.title} — Online ${t.isFree ? "Free " : ""}Mock Test (Hindi & English)`,
    description: `${t.questionCount} questions, ${Math.round(t.durationSec / 60)} minutes. Attempt the ${t.title} online in a real CBT exam interface with instant result, rank and detailed solutions.`,
    // A test of a national or shared exam has one canonical copy, on the primary site (docs/MULTI-SITE-PLAN.md, D2).
    alternates: { canonical: canonicalFor(site, canonicalSiteCode(t.sites, PRIMARY_SITE.code), `/tests/${slug}`) },
  };
}

export default async function TestDetailPage({ params }: PageProps<"/[site]/tests/[slug]">) {
  const site = await currentSite();
  const { slug } = await params;
  const t = await getTestMeta(slug, site.code);
  if (!t) notFound();
  const negatives = [...new Set(t.sections.map((s) => s.marksWrong))];
  const negativeLabel = negatives.length > 1 ? "Varies" : negatives[0] ? `−${negatives[0]}` : "None";
  // Paid tests lead to the product that unlocks them. A free demo is offered only when the admin switched it on for this test.
  const demo = t.demo;
  const hasDemo = !!demo;
  const buy = t.isFree ? null : await getBuyOptionForSeries(site.code, t.series.map((s) => s.seriesId));
  const more = t.exam ? (await getPublishedTests(site.code, { examId: t.exam.id })).filter((x) => x.slug !== slug && x.examName).slice(0, 6) : [];
  const intro = testIntro(t);

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
      <main className="mx-auto w-full max-w-4xl flex-1 space-y-8 px-4 pb-10 pt-7">
        <Breadcrumbs
          links={[
            { href: "/", label: "Home" },
            { href: "/tests", label: "Mock Tests" },
          ]}
          current={t.title}
        />

        <header className="space-y-3">
          {t.live && <span className="rounded-md bg-danger-soft px-2 py-1 text-xs font-bold text-danger">LIVE TEST · LOGIN NEEDED</span>}
          {t.isFree && !t.live && <span className="rounded-md bg-success-soft px-2 py-1 text-xs font-bold text-success">FREE · NO LOGIN NEEDED</span>}
          {!t.isFree && (
            <span className="inline-flex items-center gap-1 rounded-md bg-accent-soft px-2 py-1 text-xs font-bold text-accent-ink">
              <Lock className="size-3" aria-hidden /> {hasDemo ? "PAID · FREE DEMO AVAILABLE" : "PAID"}
            </span>
          )}
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          {t.titleHi && (
            <p lang="hi" className="text-lg text-muted">
              {t.titleHi}
            </p>
          )}
          {t.instructions && <p className="max-w-2xl text-foreground/85">{t.instructions}</p>}
          {t.exam && (
            <Link href={t.exam.href} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              <T en={`${t.exam.name} exam — pattern, syllabus & all tests`} pa={`${t.exam.name} ਪ੍ਰੀਖਿਆ — ਪੈਟਰਨ, ਸਿਲੇਬਸ ਅਤੇ ਸਾਰੇ ਟੈਸਟ`} /> <ChevronRight className="size-4" />
            </Link>
          )}
        </header>

        <section className="space-y-2">
          <h2 className="font-semibold">
            <T en="About this test" pa="ਇਸ ਟੈਸਟ ਬਾਰੇ" />
          </h2>
          <p className="max-w-2xl text-foreground/85">{intro}</p>
        </section>

        {t.live && <LiveBanner live={t.live} prizes={t.prizes} slug={slug} />}
        <MyResults slug={slug} />

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
                  <I className="size-4" /> <Tx>{l as string}</Tx>
                </dt>
                <dd className="mt-1 text-xl font-semibold">{v as string}</dd>
              </div>
            );
          })}
        </dl>

        <section className={`${card} overflow-hidden`}>
          <h2 className="border-b border-border px-5 py-3 font-semibold">
            <Tx>Sections</Tx>
          </h2>
          <table className="w-full text-sm">
            <thead className="bg-surface-muted text-left text-xs text-muted">
              <tr>
                <th className="px-4 py-2 sm:px-5">
                  <Tx>Section</Tx>
                </th>
                <th className="px-3 py-2 text-right sm:px-5">
                  <Tx>Questions</Tx>
                </th>
                {/* Phones: Correct and Wrong share one column, or the table is wider than the screen */}
                <th className="px-3 py-2 text-right sm:hidden">
                  <Tx>Marks</Tx>
                </th>
                <th className="hidden px-5 py-2 text-right sm:table-cell">
                  <Tx>Correct</Tx>
                </th>
                <th className="hidden px-5 py-2 text-right sm:table-cell">
                  <Tx>Wrong</Tx>
                </th>
              </tr>
            </thead>
            <tbody>
              {t.sections.map((s) => (
                <tr key={s.name} className="border-t border-border">
                  <td className="px-4 py-3 sm:px-5">
                    {s.name}
                    {s.nameHi && (
                      <span lang="hi" className="block text-xs text-muted sm:ml-2 sm:inline sm:text-sm">
                        {s.nameHi}
                      </span>
                    )}
                    {s.topics.length > 0 && <span className="mt-0.5 block text-xs text-muted">Topics: {s.topics.join(", ")}</span>}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums sm:px-5">{s.count}</td>
                  <td className="px-3 py-3 text-right tabular-nums sm:hidden">
                    <span className="block text-success">
                      <span className="sr-only">Correct </span>+{s.marksCorrect}
                    </span>
                    <span className={`block ${s.marksWrong ? "text-danger" : "text-muted"}`}>
                      <span className="sr-only">Wrong </span>
                      {s.marksWrong ? `−${s.marksWrong}` : "0"}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3 text-right tabular-nums text-success sm:table-cell">+{s.marksCorrect}</td>
                  <td className={`hidden px-5 py-3 text-right tabular-nums sm:table-cell ${s.marksWrong ? "text-danger" : "text-muted"}`}>
                    {s.marksWrong ? `−${s.marksWrong}` : "0"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {!t.live && (
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-primary-soft p-6 sm:flex-row sm:items-center">
          <Languages className="size-8 shrink-0 text-primary" />
          <p className="flex-1 text-sm">
            <T
              en="Real CBT interface with question palette, Mark for Review and a live timer. Switch between Hindi and English any time."
              pa="ਪ੍ਰਸ਼ਨ ਪੈਲੇਟ, Mark for Review ਅਤੇ ਚੱਲਦੇ ਟਾਈਮਰ ਨਾਲ ਅਸਲ CBT ਸਕਰੀਨ। ਕਿਸੇ ਵੀ ਸਮੇਂ ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਬਦਲੋ।"
            />
          </p>
          {/* Cached page: a student who already bought this test gets "Start" instead of the buy prompt. */}
          <OwnedGate
            slug={slug}
            owned={
              <Link href={`/tests/${slug}/attempt`} className={btn("primary", "lg")}>
                <T en="Start test now" pa="ਹੁਣੇ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ" /> <ChevronRight className="size-5" />
              </Link>
            }
          >
            {hasDemo ? (
              <div className="flex w-full flex-col gap-2 sm:w-auto">
                <Link href={`/tests/${slug}/demo`} className={btn("primary", "lg")}>
                  <T en="Try free demo" pa="ਮੁਫ਼ਤ ਡੈਮੋ ਅਜ਼ਮਾਓ" /> <ChevronRight className="size-5" />
                </Link>
                {buy && (
                  <Link href={buy.href} className={btn("accent", "lg")}>
                    <T en={`Unlock full test — ${rupees(buy.priceInPaise)}`} pa={`ਪੂਰਾ ਟੈਸਟ ਖੋਲ੍ਹੋ — ${rupees(buy.priceInPaise)}`} />
                  </Link>
                )}
                <Link href={`/tests/${slug}/attempt`} className="flex min-h-10 items-center justify-center text-center text-sm font-medium text-primary hover:underline">
                  <T en="Already purchased? Start the full test" pa="ਪਹਿਲਾਂ ਹੀ ਖਰੀਦਿਆ ਹੈ? ਪੂਰਾ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ" />
                </Link>
              </div>
            ) : buy ? (
              <div className="flex w-full flex-col gap-2 sm:w-auto">
                <Link href={buy.href} className={btn("accent", "lg")}>
                  <T en={`Unlock full test — ${rupees(buy.priceInPaise)}`} pa={`ਪੂਰਾ ਟੈਸਟ ਖੋਲ੍ਹੋ — ${rupees(buy.priceInPaise)}`} />
                </Link>
                <Link href={`/tests/${slug}/attempt`} className="flex min-h-10 items-center justify-center text-center text-sm font-medium text-primary hover:underline">
                  <T en="Already purchased? Start the test" pa="ਪਹਿਲਾਂ ਹੀ ਖਰੀਦਿਆ ਹੈ? ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ" />
                </Link>
              </div>
            ) : (
              <Link href={`/tests/${slug}/attempt`} className={btn("primary", "lg")}>
                <T en="Start test now" pa="ਹੁਣੇ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ" /> <ChevronRight className="size-5" />
              </Link>
            )}
          </OwnedGate>
        </div>
        )}
        {demo && (
          <p className="-mt-4 text-sm text-muted">
            The free demo has the first {demo.percent}% of every section ({demo.freeTotal} of {demo.freeTotal + demo.lockedTotal} questions). It is not saved and does not affect your rank.
          </p>
        )}

        {t.exam && (
          <section className="space-y-3">
            <h2 className="font-semibold">
              <T en={`Prepare for ${t.exam.name}`} pa={`${t.exam.name} ਦੀ ਤਿਆਰੀ ਕਰੋ`} />
            </h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <li>
                <Link href={t.exam.href} className="font-medium text-primary hover:underline">
                  {t.exam.name} exam pattern &amp; all tests
                </Link>
              </li>
              {t.exam.syllabusHref && (
                <li>
                  <Link href={t.exam.syllabusHref} className="font-medium text-primary hover:underline">
                    {t.exam.name} syllabus
                  </Link>
                </li>
              )}
            </ul>
            {more.length > 0 && (
              <ul className="divide-y divide-border rounded-xl border border-border text-sm">
                {more.map((x) => (
                  <li key={x.slug}>
                    <Link href={`/tests/${x.slug}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-muted">
                      <span className="font-medium">{x.title}</span>
                      <span className="shrink-0 text-xs text-muted">
                        {x.questionCount} Q · {x.durationMin} min · {x.isFree ? "Free" : "Paid"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

type TestMeta = NonNullable<Awaited<ReturnType<typeof getTestMeta>>>;

/** A short, test-specific description so each test page has its own text, not just a table. */
function testIntro(t: TestMeta) {
  const kind = { MOCK: "full-length mock test", PYQ: "previous year paper", SECTIONAL: "sectional test", TOPIC: "topic test", DAILY: "daily quiz" }[t.type];
  const forExam = t.exam ? ` for the ${t.exam.name} exam` : "";
  const sections = t.sections.map((s) => `${s.name} (${s.count})`).join(", ");
  const neg = t.sections.some((s) => s.marksWrong) ? "Wrong answers carry negative marks as shown below." : "There is no negative marking.";
  const access = t.isFree ? "It is free and needs no login." : t.demo ? "It is part of a paid series, with a free demo of the first questions in every section." : "It is part of a paid series.";
  return `${t.title} is a ${kind}${forExam} with ${t.questionCount} questions in ${t.sections.length} section${t.sections.length === 1 ? "" : "s"}: ${sections}. You get ${Math.round(t.durationSec / 60)} minutes for ${t.maxScore} marks. ${neg} ${access} After submitting you get your score, rank and detailed solutions.`;
}
