import type { Metadata } from "next";
import Link from "next/link";
import { ExamTile } from "@/components/exam-tile";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn } from "@/components/ui";
import { examLabel, getCatalog, getPublishedTests } from "@/modules/catalog/queries";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Free Himachal Mock Tests Online (Hindi & English)",
  description:
    "Take free online mock tests for Himachal Pradesh government exams in a real CBT interface. Himachal GK, reasoning, maths and computer questions with detailed solutions.",
  alternates: { canonical: "/tests" },
};

export default async function TestsPage() {
  const [tests, catalog] = await Promise.all([getPublishedTests(), getCatalog()]);
  const exams = catalog.flatMap((b) =>
    b.exams.map((e) => {
      const own = tests.filter((t) => t.examName === e.name);
      // Previous year papers are sold as their own pack, so they are counted apart from the series' mocks and subject tests.
      const papers = own.filter((t) => t.type === "PYQ").length;
      return { ...e, label: examLabel(b.slug, e.name), tests: own.length - papers, papers, free: own.filter((t) => t.isFree).length };
    }),
  );
  // Exams with tests lead, biggest first; the rest are listed small underneath so the page is not a wall of empty cards.
  const ready = exams.filter((e) => e.tests + e.papers > 0).sort((a, b) => b.tests + b.papers - (a.tests + a.papers));
  const soon = exams.filter((e) => e.tests + e.papers === 0);
  // The generic Himachal GK tests belong to no exam; they stay one tap away.
  const general = tests.filter((t) => t.examName === null);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-4 py-10 sm:py-12">
        <header className="max-w-2xl space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Which exam are you preparing for?</h1>
          <p lang="hi" className="text-muted">
            आप किस परीक्षा की तैयारी कर रहे हैं? अपनी परीक्षा चुनें और उसके सारे टेस्ट एक ही पेज पर देखें।
          </p>
        </header>

        {ready.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ready.map((e) => (
              <li key={e.href}>
                <ExamTile href={`${e.href}/tests`} name={e.name} label={e.label} nameHi={e.nameHi} count={e.tests || e.papers} noun={e.tests ? "test" : "paper"} free={e.free} extra={e.tests && e.papers ? `${e.papers} ${e.papers === 1 ? "paper" : "papers"}` : undefined} />
              </li>
            ))}
          </ul>
        )}
        {ready.length === 0 && <p className="text-muted">New tests are being added. Check back soon.</p>}

        <div className="flex flex-col gap-3 rounded-2xl border border-primary/30 bg-primary-soft p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="font-semibold">All previous year papers for just ₹29</p>
            <p className="text-sm text-muted">Solve past Himachal exam papers in real CBT, with solutions in Hindi &amp; English.</p>
          </div>
          <Link href="/previous-year-papers" className={btn("primary", "md", "shrink-0")}>
            View papers
          </Link>
        </div>

        {soon.length > 0 && (
          <section aria-labelledby="soon-h" className="space-y-3">
            <h2 id="soon-h" className="font-semibold">
              More exams <span className="font-normal text-muted">· tests launching soon</span>
            </h2>
            <ul className="flex flex-wrap gap-2">
              {soon.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="inline-flex min-h-10 items-center rounded-full border border-border bg-surface px-4 text-sm transition-colors hover:border-primary hover:text-primary">
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {general.length > 0 && (
          <p className="text-sm text-muted">
            Not sure yet? Try a free general test:{" "}
            {general
              .filter((t) => t.isFree)
              .slice(0, 2)
              .map((t, i) => (
                <span key={t.slug}>
                  {i > 0 && ", "}
                  <Link href={`/tests/${t.slug}`} className="font-medium text-primary hover:underline">
                    {t.title}
                  </Link>
                </span>
              ))}
            .
          </p>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
