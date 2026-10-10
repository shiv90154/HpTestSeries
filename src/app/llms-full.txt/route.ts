// llms-full.txt — the same site as /llms.txt, but with the content itself (description, pattern, syllabus, FAQs) inline,
// so an LLM can answer from one fetch. Everything here is already public on the exam pages.
import { site } from "@/lib/site";
import { examLabel, getCatalog, getExamPage } from "@/modules/catalog/queries";
import { stripMarkdown } from "@/modules/content/exam-content";

export const revalidate = 3600;

export async function GET() {
  const catalog = await getCatalog();
  const exams = catalog.flatMap((b) => b.exams.map((e) => ({ body: b, exam: e })));
  const pages = await Promise.all(exams.map(({ exam }) => getExamPage(exam.bodySlug, exam.slug)));

  const sections = pages.flatMap((data) => {
    if (!data) return [];
    const base = `${site.url}/${data.body.slug}/${data.slug}`;
    const p = data.pattern;
    const questions = p?.sections.reduce((n, s) => n + (s.questions ?? 0), 0) ?? 0;
    const marks = p?.sections.reduce((n, s) => n + (s.marks ?? 0), 0) ?? 0;
    const free = data.tests.filter((t) => t.isFree);
    return [
      [
        `## ${examLabel(data.body.slug, data.name)} (${data.body.name})`,
        `Page: ${base}`,
        `Last updated: ${data.updatedAt.toISOString().slice(0, 10)}`,
        "",
        ...(data.description ? [stripMarkdown(data.description), ""] : []),
        ...(p
          ? [
              "### Exam pattern",
              `Page: ${base}/exam-pattern`,
              ...p.sections.map((s) => `- ${s.name}: ${s.questions ?? "—"} questions, ${s.marks ?? "—"} marks`),
              ...(questions > 0 ? [`- Total: ${questions} questions${marks > 0 ? `, ${marks} marks` : ""}`] : []),
              ...(p.durationMin ? [`- Duration: ${p.durationMin} minutes`] : []),
              ...(p.negativeMarking ? [`- Negative marking: ${p.negativeMarking}`] : []),
              ...(p.note ? [`- Note: ${p.note}`] : []),
              "",
            ]
          : []),
        ...(data.syllabus?.trim() ? ["### Syllabus", `Page: ${base}/syllabus`, data.syllabus.trim(), ""] : []),
        ...(free.length ? ["### Free tests", ...free.map((t) => `- [${t.title}](${site.url}/tests/${t.slug}): ${t.questionCount} questions, ${t.durationMin} minutes`), ""] : []),
        ...(data.faqs.length ? ["### FAQs", ...data.faqs.flatMap((f) => [`**${f.q}**`, stripMarkdown(f.a), ""])] : []),
      ].join("\n"),
    ];
  });

  const text = [
    `# ${site.name}: full content`,
    "",
    `> ${site.description}`,
    "",
    "Independent practice platform, not affiliated with any recruiting body. Patterns and syllabi change with each notification; the official notification is final.",
    "Short index: " + `${site.url}/llms.txt`,
    "",
    ...sections,
  ].join("\n");

  return new Response(text + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
