// llms.txt — a machine-readable summary of the site for LLM crawlers/agents. Spec: https://llmstxt.org/
import { site } from "@/lib/site";
import { getCatalog, getPublishedPosts, getPublishedTests } from "@/modules/catalog/queries";
import { firstSentence } from "@/modules/content/exam-content";

const summary = (description: string | null) => (description ? ` — ${firstSentence(description)}` : "");

export const revalidate = 3600;

export async function GET() {
  const [catalog, tests, posts] = await Promise.all([getCatalog(), getPublishedTests(), getPublishedPosts({ take: 20 })]);
  const freeTests = tests.filter((t) => t.isFree);

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Exams",
    ...catalog.flatMap((body) =>
      body.exams.map((e) => `- [${e.name}](${site.url}${e.href}): mock tests, PYQs and topic tests for ${e.name}${summary(e.description)}`),
    ),
    "",
    "## Free tests (no login needed)",
    ...freeTests.map((t) => `- [${t.title}](${site.url}/tests/${t.slug}): ${t.questionCount} questions, ${t.durationMin} minutes`),
    "",
    ...(posts.items.length
      ? ["## Latest exam updates", ...posts.items.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.excerpt}`), ""]
      : []),
    "## Other",
    `- [All mock tests](${site.url}/tests)`,
    `- [All Himachal exams](${site.url}/exams)`,
    `- [Exam updates & notifications](${site.url}/blog)`,
    `- [Contact](${site.url}/contact)`,
  ];

  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
