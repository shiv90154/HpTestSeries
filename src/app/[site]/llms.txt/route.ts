// llms.txt — a machine-readable summary of the site for LLM crawlers/agents. Spec: https://llmstxt.org/
import { getSite } from "@/sites";
import { getCatalog, getPublishedPosts, getPublishedTests } from "@/modules/catalog/queries";
import { firstSentence } from "@/modules/content/exam-content";
import { siteStaticParams } from "@/sites";

const summary = (description: string | null) => (description ? ` — ${firstSentence(description)}` : "");

export const revalidate = 3600;

// Route handlers do not inherit the layout's site list, so each prerenders every site itself.
export const generateStaticParams = siteStaticParams;

export async function GET(_req: Request, ctx: RouteContext<"/[site]/llms.txt">) {
  const site = getSite((await ctx.params).site);
  const [catalog, tests, posts] = await Promise.all([getCatalog(site.code), getPublishedTests(site.code), getPublishedPosts(site.code, { take: 20 })]);
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
    `- [All ${site.stateAdj} exams](${site.url}/exams)`,
    `- [Exam updates & notifications](${site.url}/blog)`,
    `- [Full content in one file](${site.url}/llms-full.txt)`,
    `- [Contact](${site.url}/contact)`,
  ];

  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
