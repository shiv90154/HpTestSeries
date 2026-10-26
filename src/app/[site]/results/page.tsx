import { ChevronLeft, ChevronRight, ClipboardList } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { AttemptList } from "@/components/attempt-list";
import { btn, card } from "@/components/ui";
import { getResultHistory } from "@/modules/analytics/history";
import { requireUser } from "@/modules/identity/session";
import { currentSite } from "@/sites/current";
import { parsePage } from "../blog/post-list";
import { TestFilter } from "./test-filter";

export const metadata: Metadata = { title: "My results", robots: { index: false, follow: false } };

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div className={`${card} p-4`}>
      <p className="text-xs text-muted">{label}</p>
      <p className="text-xl font-bold tabular-nums">{value}</p>
    </div>
  );
}

/** Every test the student has submitted, newest first, each opening its full analysis and solutions. */
export default async function ResultsPage({ searchParams }: PageProps<"/[site]/results">) {
  const sp = await searchParams;
  const testSlug = typeof sp.test === "string" && sp.test ? sp.test : undefined;
  const user = await requireUser(testSlug ? `/results?test=${encodeURIComponent(testSlug)}` : "/results");
  const site = await currentSite();
  const h = await getResultHistory(user.id, { page: parsePage(sp.page), testSlug });

  const activeTest = testSlug ? h.tests.find((t) => t.slug === testSlug) : undefined;
  const pageHref = (n: number) => {
    const q = new URLSearchParams({ ...(testSlug && { test: testSlug }), ...(n > 1 && { page: String(n) }) }).toString();
    return q ? `/results?${q}` : "/results";
  };
  const totalMinutes = h.summary.totalMinutes;

  return (
    <>
      <AppHeader user={user} />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">My results</h1>
            <p className="text-sm text-muted">
              {activeTest ? activeTest.title : "Every test you have submitted"} — open any one for the full analysis and solutions.
            </p>
          </div>
          {h.tests.length > 1 && <TestFilter tests={h.tests} active={activeTest?.slug} />}
        </div>

        {h.total === 0 ? (
          <section className={`${card} flex flex-col items-center gap-4 px-5 py-12 text-center`}>
            <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary">
              <ClipboardList className="size-6" aria-hidden />
            </span>
            <div>
              <p className="font-semibold">{testSlug ? "No results for this test yet" : "No tests yet"}</p>
              <p className="text-sm text-muted">Submit a test and its score, rank and solutions stay here for you to revisit.</p>
            </div>
            <Link href={testSlug ? `/tests/${testSlug}` : "/tests"} className={btn("primary")}>
              {testSlug ? "Go to the test" : "Browse mock tests"}
            </Link>
          </section>
        ) : (
          <>
            <section aria-label="Summary" className="grid grid-cols-2 gap-3 lg:grid-cols-5">
              <Figure label={activeTest ? "Attempts" : "Tests taken"} value={`${h.total}`} />
              <Figure label="Average score" value={`${h.summary.avgPercent}%`} />
              <Figure label="Best score" value={`${h.summary.bestPercent}%`} />
              <Figure label="Accuracy" value={`${h.summary.accuracy}%`} />
              <Figure label="Time practised" value={totalMinutes >= 60 ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m` : `${totalMinutes}m`} />
            </section>

            <section className={`${card} overflow-hidden`}>
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
                <h2 className="font-semibold">
                  {h.total} {h.total === 1 ? "result" : "results"}
                </h2>
                {activeTest && (
                  <Link href={`/tests/${activeTest.slug}`} className="text-sm font-medium text-primary">
                    Re-attempt this test
                  </Link>
                )}
              </div>
              <AttemptList rows={h.rows} rankLabel={site.logo.initials} />
            </section>
            <p className="text-xs text-muted">Rank is shown for your first attempt of each test, so every candidate is compared fairly.</p>

            {h.pages > 1 && (
              <nav aria-label="Pagination" className="flex items-center justify-center gap-3 text-sm">
                {h.page > 1 && (
                  <Link href={pageHref(h.page - 1)} rel="prev" className="flex h-10 items-center gap-1 rounded-lg border border-border px-3.5 hover:border-primary">
                    <ChevronLeft className="size-4" /> Newer
                  </Link>
                )}
                <span className="text-muted">
                  Page {h.page} of {h.pages}
                </span>
                {h.page < h.pages && (
                  <Link href={pageHref(h.page + 1)} rel="next" className="flex h-10 items-center gap-1 rounded-lg border border-border px-3.5 hover:border-primary">
                    Older <ChevronRight className="size-4" />
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </main>
    </>
  );
}
