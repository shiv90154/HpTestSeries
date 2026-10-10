import { BadgeCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildExamCtx, ExamSubPage } from "@/components/exam-landing";
import { JsonLd } from "@/components/json-ld";
import { TestRow } from "@/components/test-card";
import { TrackedLink } from "@/components/tracked-link";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
import { site } from "@/lib/site";
import { clipDescription } from "@/lib/seo";
import { pyqFaqs } from "@/modules/content/subpage-faqs";
import { examLabel, examShortName, getExamPage, getExamSubPages } from "@/modules/catalog/queries";
import { getProductForSale } from "@/modules/commerce/product-service";

export const revalidate = 600;

/** The product that unlocks every previous year paper (see /previous-year-papers). */
const PYQ_PRODUCT = "previous-year-papers";

export async function generateStaticParams() {
  return (await getExamSubPages()).filter((e) => e.pyq).map(({ body, exam }) => ({ body, exam }));
}

export async function generateMetadata({ params }: PageProps<"/[body]/[exam]/previous-year-papers">): Promise<Metadata> {
  const { body, exam } = await params;
  const data = await getExamPage(body, exam);
  if (!data?.tests.some((t) => t.type === "PYQ" && t.examName)) return {};
  const name = examShortName(examLabel(data.body.slug, data.name), data.seo.title);
  const title = `${name} Previous Year Papers — Solve in CBT`;
  const description = clipDescription(`Solve ${name} previous year papers in real CBT format with Hindi and English questions, a solution for every question and your HP rank.`);
  return {
    title,
    description,
    alternates: { canonical: `/${body}/${exam}/previous-year-papers` },
    openGraph: { title, description, url: `/${body}/${exam}/previous-year-papers` },
  };
}

export default async function ExamPyqPage({ params }: PageProps<"/[body]/[exam]/previous-year-papers">) {
  const { body, exam } = await params;
  const [data, product] = await Promise.all([getExamPage(body, exam), getProductForSale(PYQ_PRODUCT)]);
  const papers = data?.tests.filter((t) => t.type === "PYQ" && t.examName) ?? [];
  if (!data || papers.length === 0) notFound();

  const name = examShortName(examLabel(data.body.slug, data.name), data.seo.title);
  const ctx = buildExamCtx(data, name);
  const years = [...new Set(papers.flatMap((t) => t.title.match(/\b(?:19|20)\d{2}\b/g) ?? []))].sort();
  const price = rupees(product?.priceInPaise ?? 29_00);

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
            { "@type": "ListItem", position: 4, name: "Previous year papers", item: `${site.url}${ctx.base}/previous-year-papers` },
          ],
        }}
      />
      <ExamSubPage
        ctx={ctx}
        active="pyq"
        crumb="Previous year papers"
        h1={`${name} Previous Year Papers`}
        intro={`Solve past ${name} papers in the real computer-based format, with Hindi and English questions and a solution for every question.`}
        faqs={pyqFaqs(name, papers.length, years)}
        updatedAt={data.updatedAt}
      >
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {papers.length} {name} previous year {papers.length === 1 ? "paper" : "papers"}
          </h2>
          {years.length > 0 && <p className="text-muted">Papers from: {years.join(", ")}.</p>}
          <div className={`${card} p-4 sm:p-5`}>
            <ul className="divide-y divide-border">
              {papers.map((t) => (
                <TestRow key={t.slug} test={t} />
              ))}
            </ul>
          </div>
        </section>

        {product && (
          <section className={`${card} space-y-3 p-5 sm:p-6`}>
            <h2 className="text-xl font-bold">All previous year papers for {price}</h2>
            <p className="text-sm text-muted">
              One payment unlocks every previous year paper on the platform for {product.validityDays ?? 365} days, including the papers we add later. No auto-renewal.
            </p>
            <TrackedLink
              href={`/buy/${product.slug}`}
              event="landing_buy_click"
              params={{ exam: ctx.key, placement: "pyq-pack", price: product.priceInPaise / 100 }}
              className={btn("primary", "lg", "w-full sm:w-auto")}
            >
              <BadgeCheck className="size-5" /> Get all papers for {price}
            </TrackedLink>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <ShieldCheck className="size-4 text-success" aria-hidden /> Secure payment via Razorpay (UPI, cards, netbanking)
            </p>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">How to use previous year papers</h2>
          <p className="text-muted">
            Solve the latest paper first with a timer to find your starting score, then work backwards year by year. After each paper, read the solution of every
            question you got wrong or guessed, and note the topic. Topics that repeat across years are the ones to revise first.
          </p>
          <p className="text-sm">
            Also see the <Link href={ctx.base} className="font-medium text-primary hover:underline">{name} mock tests</Link>
            {ctx.has.syllabus && (
              <>
                {" "}and the <Link href={`${ctx.base}/syllabus`} className="font-medium text-primary hover:underline">syllabus</Link>
              </>
            )}
            , or browse <Link href="/previous-year-papers" className="font-medium text-primary hover:underline">all Himachal previous year papers</Link>.
          </p>
        </section>
      </ExamSubPage>
    </>
  );
}
