import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildExamCtx, ExamSubPage } from "@/components/exam-landing";
import { JsonLd } from "@/components/json-ld";
import { SyllabusPdfButton } from "@/components/exam-email-form";
import { Markdown } from "@/components/markdown";
import { TestCard } from "@/components/test-card";
import { card } from "@/components/ui";
import { canonicalFor, PRIMARY_SITE } from "@/sites";
import { currentSite } from "@/sites/current";
import { canonicalSiteCode } from "@/modules/catalog/visibility";
import { clipDescription } from "@/lib/seo";
import { syllabusFaqs } from "@/modules/content/subpage-faqs";
import { syllabusSeo } from "@/modules/content/syllabus-seo";
import { examLabel, examShortName, getExamPage, getExamSubPages, syllabusOutline } from "@/modules/catalog/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  const site = await currentSite();
  return (await getExamSubPages(site.code)).filter((e) => e.syllabus).map(({ body, exam }) => ({ body, exam }));
}

const year = () => new Date().getFullYear();

export async function generateMetadata({ params }: PageProps<"/[site]/[body]/[exam]/syllabus">): Promise<Metadata> {
  const site = await currentSite();
  const { body, exam } = await params;
  const data = await getExamPage(site.code, body, exam);
  if (!data?.syllabus?.trim()) return {};
  const name = examShortName(examLabel(data.body.slug, data.name), data.seo.title);
  // Hand-written copy for pages that get impressions but few clicks; it is used as-is, without the site-name suffix.
  const custom = syllabusSeo(`${body}/${exam}`, year());
  const title = custom?.title ?? `${name} Syllabus ${year()} — Topic-wise`;
  const description =
    custom?.description ??
    clipDescription(`${name} syllabus ${year()}, topic-wise: every subject and topic, with free CBT mock tests to practise each part. Confirm changes in the official notification.`);
  return {
    title: custom ? { absolute: title } : title,
    description,
    alternates: { canonical: canonicalFor(site, canonicalSiteCode(data.body.sites, PRIMARY_SITE.code), `/${body}/${exam}/syllabus`) },
    openGraph: { title, description, url: `/${body}/${exam}/syllabus` },
  };
}

export default async function SyllabusPage({ params }: PageProps<"/[site]/[body]/[exam]/syllabus">) {
  const site = await currentSite();
  const { body, exam } = await params;
  const data = await getExamPage(site.code, body, exam);
  if (!data?.syllabus?.trim()) notFound();

  const name = examShortName(examLabel(data.body.slug, data.name), data.seo.title);
  const ctx = buildExamCtx(data, name, site.statePage.title);
  const areas = syllabusOutline(data.syllabus);
  const topicTests = data.tests.filter((t) => t.examName && (t.type === "SECTIONAL" || t.type === "TOPIC"));
  const freeTests = data.tests.filter((t) => t.isFree).slice(0, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Exams", item: `${site.url}/exams` },
            { "@type": "ListItem", position: 3, name: `${name} Mock Test`, item: `${site.url}${ctx.base}` },
            { "@type": "ListItem", position: 4, name: "Syllabus", item: `${site.url}${ctx.base}/syllabus` },
          ],
        }}
      />
      <ExamSubPage
        ctx={ctx}
        active="syllabus"
        crumb="Syllabus"
        h1={`${name} Syllabus ${year()}`}
        intro={`Every subject and topic of the ${name} exam in one place, with free mock tests to practise them in the real CBT format.`}
        faqs={syllabusFaqs(name, areas)}
        updatedAt={data.updatedAt}
      >
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold tracking-tight">{name} syllabus, topic-wise</h2>
            <span className="contents print:hidden">
              <SyllabusPdfButton examKey={ctx.key} examName={name} />
            </span>
          </div>
          <Markdown text={data.syllabus} />
          <p className="text-xs text-muted">The syllabus is a summary and can change with each notification. The official notification is final.</p>
        </section>

        {areas.length > 1 && (
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">How to cover the {name} syllabus</h2>
            <p className="text-muted">
              The {name} syllabus has {areas.length} main areas: {areas.join(", ")}. Finish the area that carries the most marks first, then revise the others in
              rotation, and take a timed mock test every week to see which topics still cost you marks.
            </p>
            <p className="text-sm">
              Also read the <Link href={ctx.base} className="font-medium text-primary hover:underline">{name} mock tests</Link>
              {ctx.has.pattern && (
                <>
                  {" "}and the <Link href={`${ctx.base}/exam-pattern`} className="font-medium text-primary hover:underline">exam pattern</Link>
                </>
              )}
              .
            </p>
          </section>
        )}

        {topicTests.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Practise {name} topic by topic</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {topicTests.slice(0, 6).map((t) => (
                <TestCard key={t.slug} test={t} />
              ))}
            </div>
            {topicTests.length > 6 && (
              <Link href={`${ctx.base}/tests`} className="inline-flex min-h-10 items-center text-sm font-semibold text-primary hover:underline">
                See all {topicTests.length} subject tests →
              </Link>
            )}
          </section>
        )}

        {freeTests.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Free {name} tests</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {freeTests.map((t) => (
                <TestCard key={t.slug} test={t} />
              ))}
            </div>
          </section>
        )}

        {topicTests.length === 0 && freeTests.length === 0 && (
          <p className={`${card} p-5 text-muted`}>Topic tests for {name} are being added. Check back soon.</p>
        )}
      </ExamSubPage>
    </>
  );
}
