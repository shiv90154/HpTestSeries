import { ChevronRight, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { card } from "@/components/ui";
import { db } from "@/lib/db";
import { liveState } from "@/modules/assessment/live";
import { liveTestWhere } from "@/modules/catalog/visibility";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Live Tests — compete with students across Himachal",
  description: "Join a live mock test at a fixed time, compete on a live leaderboard and win prizes. Free for every student.",
  alternates: { canonical: "/live" },
};

const when = (d: Date) =>
  d.toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

export default async function LivePage() {
  const tests = await db.test.findMany({
    where: { ...liveTestWhere(), liveStartsAt: { not: null } },
    orderBy: { liveStartsAt: "desc" },
    take: 30,
    select: { slug: true, title: true, liveStartsAt: true, liveEndsAt: true, prizes: { orderBy: { rank: "asc" }, select: { rank: true, title: true } } },
  });
  const rows = tests.map((t) => ({ ...t, state: liveState(t) }));
  const current = rows.filter((t) => t.state !== "ended").sort((a, b) => a.liveStartsAt!.getTime() - b.liveStartsAt!.getTime());
  const past = rows.filter((t) => t.state === "ended");

  const list = (items: typeof rows) => (
    <ul className="grid gap-3">
      {items.map((t) => (
        <li key={t.slug}>
          <Link href={`/tests/${t.slug}`} className={`${card} flex items-center gap-4 p-4 hover:border-primary`}>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="flex items-center gap-2 font-semibold">
                {t.state === "open" && <span className="rounded bg-danger-soft px-1.5 py-0.5 text-xs font-bold text-danger">LIVE NOW</span>}
                <span className="truncate">{t.title}</span>
              </p>
              <p className="text-sm text-muted">{when(t.liveStartsAt!)} IST</p>
              {t.prizes.length > 0 && (
                <p className="flex items-center gap-1 text-sm text-accent-ink">
                  <Trophy className="size-4" aria-hidden /> {t.prizes.map((p) => p.title).join(" · ")}
                </p>
              )}
            </div>
            <ChevronRight className="size-5 shrink-0 text-muted" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-8 px-4 pb-10 pt-7">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Live tests</h1>
          <p className="text-muted">Everyone takes the test at the same time. Results and the leaderboard open when it ends, and the top ranks win prizes.</p>
        </header>
        <section className="space-y-3">
          <h2 className="font-semibold">Upcoming &amp; live</h2>
          {current.length ? list(current) : <p className="text-sm text-muted">No live test is scheduled right now. Check back soon.</p>}
        </section>
        {past.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-semibold">Past live tests</h2>
            {list(past)}
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
