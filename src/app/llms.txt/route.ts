// llms.txt — a machine-readable summary of the site for LLM crawlers/agents. Spec: https://llmstxt.org/
import { site } from "@/lib/site";
import { getCatalog, getPublishedTests } from "@/modules/catalog/queries";

export const revalidate = 3600;

export async function GET() {
  const [catalog, tests] = await Promise.all([getCatalog(), getPublishedTests()]);
  const freeTests = tests.filter((t) => t.isFree);

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Exams",
    ...catalog.flatMap((body) =>
      body.exams.map((e) => `- [${e.name}](${site.url}${e.href}): mock tests, PYQs and topic tests for ${e.name}${e.description ? ` — ${e.description}` : ""}`),
    ),
    "",
    "## Free tests (no login needed)",
    ...freeTests.map((t) => `- [${t.title}](${site.url}/tests/${t.slug}): ${t.questionCount} questions, ${t.durationMin} minutes`),
    "",
    "## Other",
    `- [All mock tests](${site.url}/tests)`,
    `- [All Himachal exams](${site.url}/exams)`,
    `- [Contact](${site.url}/contact)`,
  ];

  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
