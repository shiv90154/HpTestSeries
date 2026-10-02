import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Disclaimer } from "@/components/exam-landing";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { Markdown } from "@/components/markdown";
import { Mountains } from "@/components/mountains";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackedLink } from "@/components/tracked-link";
import { btn, card } from "@/components/ui";
import { clipDescription } from "@/lib/seo";
import { FREE_MOCK_HREF, site } from "@/lib/site";
import { BODY_INFO, hasBodyPage } from "@/modules/catalog/body-info";
import { bodyShortName, examLabel, getCatalog } from "@/modules/catalog/queries";
import { faqPageJsonLd, firstSentence } from "@/modules/content/exam-content";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getCatalog()).filter(hasBodyPage).map((b) => ({ body: b.slug }));
}

const year = () => new Date().getFullYear();

/** The body, if it has a page; a single-exam body sends visitors on to its exam, anything else is a 404. */
async function loadBody(slug: string) {
  const body = (await getCatalog()).find((b) => b.slug === slug);
  if (!body) notFound();
  if (!hasBodyPage(body)) {
    if (body.exams.length === 1) redirect(body.exams[0].href);
    notFound();
  }
  return body;
}

export async function generateMetadata({ params }: PageProps<"/[body]">): Promise<Metadata> {
  const { body: slug } = await params;
  const body = (await getCatalog()).find((b) => b.slug === slug);
  if (!body || !hasBodyPage(body)) return {};
  const short = bodyShortName(body.slug);
  const title = `${short} Mock Test ${year()} — Free Test Series`;
  const description = clipDescription(
    `Free ${short} mock tests: ${body.exams.slice(0, 5).map((e) => e.name).join(", ")} and more. Real CBT format, Hindi & English solutions and your HP rank.`,
  );
  return { title, description, alternates: { canonical: `/${slug}` }, openGraph: { title, description, url: `/${slug}` } };
}

export default async function BodyPage({ params }: PageProps<"/[body]">) {
  const { body: slug } = await params;
  const body = await loadBody(slug);
  const info = BODY_INFO[body.slug];
  const short = bodyShortName(body.slug);
  const names = body.exams.map((e) => examLabel(body.slug, e.name));

  const faqs = [
    { q: `Which exams does ${short} conduct?`, a: `On this site: ${names.join(", ")}. Open any exam for its free mock tests, syllabus and FAQs.` },
    ...info.faqs,
    { q: `Are there free ${short} mock tests?`, a: `Yes. Every exam above has a free mock test that you can start without logging in, with questions and solutions in Hindi and English.` },
  ];

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
              { "@type": "ListItem", position: 3, name: `${short} Mock Test`, item: `${site.url}/${body.slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${short} exams`,
            itemListElement: body.exams.map((e, i) => ({ "@type": "ListItem", position: i + 1, name: names[i], url: `${site.url}${e.href}` })),
          },
          faqPageJsonLd(faqs),
        ]}
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-br from-[#0b1f5c] via-[#133a9e] to-[#1e4fd8] text-white">
          <div className="relative mx-auto w-full max-w-6xl space-y-4 px-4 pb-24 pt-7 sm:space-y-5">
            <Breadcrumbs
              light
              links={[
                { href: "/", label: "Home" },
                { href: "/exams", label: "Exams" },
              ]}
              current={short}
            />
            <p className="inline-block rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20">{body.name}</p>
            <h1 className="max-w-3xl text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">
              {short} Mock Test {year()}
            </h1>
            {body.nameHi && (
              <p lang="hi" className="text-[15px] text-white/85 sm:text-lg">
                {body.nameHi} की सभी परीक्षाओं के मॉक टेस्ट
              </p>
            )}
            <p className="max-w-2xl text-white/85">
              Free mock tests for all {body.exams.length} {short} exams on this site, in the real computer-based format with Hindi and English questions and a solution for every question.
            </p>
            <div className="grid gap-2.5 pt-1 sm:flex sm:flex-wrap sm:gap-3">
              <TrackedLink href={FREE_MOCK_HREF} event="landing_cta_click" params={{ exam: body.slug, placement: "body-hero" }} className={btn("accent", "lg", "w-full sm:w-auto")}>
                Start free Himachal GK test <ChevronRight className="size-5" />
              </TrackedLink>
              <a href="#exams" className={btn("white", "lg", "w-full sm:w-auto")}>
                Choose your exam
              </a>
            </div>
            <Disclaimer bodyName={body.name} />
          </div>
          <Mountains className="absolute inset-x-0 bottom-0 h-20 w-full sm:h-24" />
        </section>

        <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-10">
          <section className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">About {short} recruitment</h2>
            <Markdown text={info.about} />
          </section>

          <section id="exams" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">{short} exams and mock tests</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {body.exams.map((e, i) => (
                <Link
                  key={e.href}
                  href={e.href}
                  className={`${card} group flex flex-col gap-2 p-5 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="font-semibold leading-snug">{names[i]} Mock Test</span>
                    <ChevronRight className="mt-0.5 size-5 shrink-0 text-muted transition group-hover:text-primary" aria-hidden />
                  </span>
                  {e.nameHi && (
                    <span lang="hi" className="text-sm text-muted">
                      {e.nameHi}
                    </span>
                  )}
                  {e.description && <span className="line-clamp-3 text-sm text-muted">{firstSentence(e.description, 180)}</span>}
                  <span className="mt-auto pt-1 text-xs font-medium text-primary">
                    {e.testCount > 0 ? `${e.testCount} ${e.testCount === 1 ? "test" : "tests"} available` : "Tests launching soon"}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">{short} — FAQs</h2>
            <FaqList faqs={faqs} />
          </section>

          <section className="rounded-3xl bg-linear-to-r from-[#133a9e] to-[#1e4fd8] p-6 text-white sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1 space-y-1">
                <h2 className="text-xl font-bold sm:text-3xl">Start your {short} preparation today</h2>
                <p className="text-white/80">Free tests · Hindi & English · Instant solutions · HP rank</p>
              </div>
              <TrackedLink href={FREE_MOCK_HREF} event="landing_cta_click" params={{ exam: body.slug, placement: "body-final" }} className={btn("accent", "lg", "w-full sm:w-auto")}>
                Start free test <ChevronRight className="size-5" />
              </TrackedLink>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
