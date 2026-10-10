import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildExamCtx, ExamSubPage } from "@/components/exam-landing";
import { JsonLd } from "@/components/json-ld";
import { TestCard } from "@/components/test-card";
import { card } from "@/components/ui";
import { site } from "@/lib/site";
import { clipDescription } from "@/lib/seo";
import { patternFaqs } from "@/modules/content/subpage-faqs";
import { examLabel, examShortName, getExamPage, getExamSubPages } from "@/modules/catalog/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getExamSubPages()).filter((e) => e.pattern).map(({ body, exam }) => ({ body, exam }));
}

const year = () => new Date().getFullYear();

export async function generateMetadata({ params }: PageProps<"/[body]/[exam]/exam-pattern">): Promise<Metadata> {
  const { body, exam } = await params;
  const data = await getExamPage(body, exam);
  if (!data?.pattern) return {};
  const name = examShortName(examLabel(data.body.slug, data.name), data.seo.title);
  const title = `${name} Exam Pattern ${year()} — Marks & Duration`;
  const description = clipDescription(`${name} exam pattern ${year()}: sections, questions, marks, duration and negative marking, with free mock tests in the same CBT format.`);
  return {
    title,
    description,
    alternates: { canonical: `/${body}/${exam}/exam-pattern` },
    openGraph: { title, description, url: `/${body}/${exam}/exam-pattern` },
  };
}

export default async function ExamPatternPage({ params }: PageProps<"/[body]/[exam]/exam-pattern">) {
  const { body, exam } = await params;
  const data = await getExamPage(body, exam);
  if (!data?.pattern) notFound();

  const name = examShortName(examLabel(data.body.slug, data.name), data.seo.title);
  const ctx = buildExamCtx(data, name);
  const p = data.pattern;
  const totalQuestions = p.sections.reduce((n, s) => n + (s.questions ?? 0), 0);
  const totalMarks = p.sections.reduce((n, s) => n + (s.marks ?? 0), 0);
  const mocks = data.tests.filter((t) => t.type === "MOCK").slice(0, 4);

  // One sentence built only from the figures that are actually known, so it never states something the table does not.
  const summary = [
    totalQuestions > 0 ? `${totalQuestions} questions` : null,
    totalMarks > 0 ? `${totalMarks} marks` : null,
    p.durationMin ? `${p.durationMin} minutes` : null,
    p.negativeMarking ? `negative marking: ${p.negativeMarking.toLowerCase()}` : null,
  ].filter(Boolean);

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
            { "@type": "ListItem", position: 4, name: "Exam pattern", item: `${site.url}${ctx.base}/exam-pattern` },
          ],
        }}
      />
      <ExamSubPage
        ctx={ctx}
        active="pattern"
        crumb="Exam pattern"
        h1={`${name} Exam Pattern ${year()}`}
        intro={`Sections, marks, duration and marking scheme of the ${name} exam, and mock tests that let you practise in the same computer-based format.`}
        faqs={patternFaqs(name, { totalQuestions, totalMarks, durationMin: p.durationMin, negativeMarking: p.negativeMarking, sections: p.sections.map((s) => s.name) })}
        updatedAt={data.updatedAt}
      >
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">{name} exam pattern</h2>
          {summary.length > 0 && <p className="text-muted">As per the latest information we have, the {name} written test has {summary.join(", ")}.</p>}
          {p.sections.length > 0 && (
            <div className={`${card} overflow-x-auto`}>
              <table className="w-full text-sm">
                <thead className="bg-surface-muted text-left">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Subject / Section</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Questions</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {p.sections.map((s) => (
                    <tr key={s.name} className="border-t border-border">
                      <td className="px-4 py-2.5">{s.name}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{s.questions ?? "—"}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{s.marks ?? "—"}</td>
                    </tr>
                  ))}
                  {p.sections.length > 1 && (
                    <tr className="border-t border-border font-semibold">
                      <td className="px-4 py-2.5">Total</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{totalQuestions || "—"}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{totalMarks || "—"}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <ul className="flex flex-wrap gap-2 text-sm">
            {p.durationMin ? <li className="rounded-full border border-border bg-surface px-3 py-1">Time: {p.durationMin} minutes</li> : null}
            {p.negativeMarking && <li className="rounded-full border border-border bg-surface px-3 py-1">Negative marking: {p.negativeMarking}</li>}
          </ul>
          {p.note && <p className="text-sm text-muted">{p.note}</p>}
          <p className="text-xs text-muted">
            The pattern changes with each notification, so confirm it in the official notification before you plan your preparation. Our mock tests copy the
            computer-based layout, but section sizes in a mock can differ from the real paper.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">How to use the pattern in your preparation</h2>
          <p className="text-muted">
            Divide your time by marks, not by interest: the section that carries the most marks needs the most revision. Practise with a timer from the start
            so the clock is never a surprise, and use the question palette and Mark for Review exactly as you will on exam day.
          </p>
          <p className="text-sm">
            See the full <Link href={`${ctx.base}/syllabus`} className="font-medium text-primary hover:underline">{name} syllabus</Link> and all{" "}
            <Link href={ctx.base} className="font-medium text-primary hover:underline">{name} mock tests</Link>.
          </p>
        </section>

        {mocks.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Practise in the exam format</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {mocks.map((t) => (
                <TestCard key={t.slug} test={t} />
              ))}
            </div>
          </section>
        )}
      </ExamSubPage>
    </>
  );
}
