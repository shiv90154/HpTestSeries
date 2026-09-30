import { ArrowRight, BadgeCheck, BarChart3, Clock, Flag, PlayCircle, Target, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { TestCard } from "@/components/test-card";
import { btn, card } from "@/components/ui";
import { getDashboard } from "@/modules/analytics/dashboard";
import { getMyPlans, type Plan } from "@/modules/commerce/purchases";
import { getMyReports, type MyReport } from "@/modules/content/report-service";
import type { requireUser } from "@/modules/identity/session";
import { ProfileCard } from "./profile-card";
import { ScoreTrend } from "./score-trend";

function greeting(): string {
  const h = Number(new Date().toLocaleString("en-IN", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" }));
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export async function DashboardData({ user, purchaseNotice }: { user: Awaited<ReturnType<typeof requireUser>>; purchaseNotice: "unlocked" | "pending" | null }) {
  const [d, plans, reports] = await Promise.all([getDashboard(user.id), getMyPlans(user.id), getMyReports(user.id)]);
  // Profile comes from the DB (not the 5-minute session cookie cache) so edits show immediately.
  const firstName = d.profile.name.split(" ")[0];
  const needsProfile = d.profile.name === "Aspirant" || !d.profile.district;

  return (
    <>
      <AppHeader user={{ ...user, name: d.profile.name }} />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-6 sm:py-8">
        {purchaseNotice && (
          <p role="status" className="flex items-start gap-2 rounded-2xl border border-success bg-success-soft p-4 text-sm font-medium">
            <BadgeCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
            {purchaseNotice === "unlocked"
              ? "Payment received — your purchase is now unlocked on this account."
              : "Payment received — it's being confirmed by the bank. Your access appears here automatically within a few minutes."}
          </p>
        )}
        {/* Welcome */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#133a9e] via-[#1e4fd8] to-[#3b6ef5] p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-1.5">
              <p className="text-sm text-white/75">{greeting()},</p>
              <h1 className="text-2xl font-bold sm:text-3xl">{firstName} 👋</h1>
              <p className="text-white/85">
                {d.stats.tests === 0
                  ? "Start your first mock test and see where you stand among Himachal aspirants."
                  : `You've taken ${d.stats.tests} test${d.stats.tests === 1 ? "" : "s"}. Every mock sharpens your speed and accuracy — keep practising!`}
              </p>
            </div>
            <Link href={d.suggested[0] ? `/tests/${d.suggested[0].slug}/attempt` : "/tests"} className={btn("accent", "lg")}>
              <PlayCircle className="size-5" /> {d.stats.tests === 0 ? "Start first test" : "Take a mock test"}
            </Link>
          </div>
        </section>

        {needsProfile && <ProfileCard name={d.profile.name} district={d.profile.district} />}

        {/* Continue */}
        {d.inProgress && (
          <section className={`${card} flex flex-col gap-4 border-accent bg-accent-soft p-5 sm:flex-row sm:items-center`}>
            <Clock className="size-8 shrink-0 text-accent-ink" />
            <div className="flex-1">
              <p className="font-semibold">Unfinished test: {d.inProgress.title}</p>
              <p className="text-sm text-muted">
                {d.inProgress.answered} answered · time left until{" "}
                {d.inProgress.deadlineAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })}
              </p>
            </div>
            <Link href={`/tests/${d.inProgress.slug}/attempt`} className={btn("primary")}>
              Resume test <ArrowRight className="size-4" />
            </Link>
          </section>
        )}

        {plans.length > 0 && <MyPlans plans={plans} />}

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat icon={<BarChart3 className="size-5 text-primary" />} label="Tests taken" value={`${d.stats.tests}`} />
          <Stat icon={<TrendingUp className="size-5 text-success" />} label="Average score" value={`${d.stats.avgPercent}%`} sub={`Best ${d.stats.bestPercent}%`} />
          <Stat icon={<Target className="size-5 text-accent-ink" />} label="Accuracy" value={`${d.stats.accuracy}%`} />
          <Stat icon={<Clock className="size-5 text-cbt-marked" />} label="Practice time" value={`${d.stats.totalMinutes} min`} />
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className={`${card} p-5`}>
            <h2 className="font-semibold">Score trend</h2>
            <p className="mb-6 text-xs text-muted">Score % per test, oldest to newest</p>
            <ScoreTrend points={d.trend} />
          </section>

          <section className={`${card} p-5`}>
            <h2 className="font-semibold">Focus areas</h2>
            <p className="mb-4 text-xs text-muted">Lowest accuracy (correct ÷ attempted) across your tests</p>
            {d.weakTopics.length === 0 ? (
              <p className="text-sm text-muted">Take a test to discover your weak topics.</p>
            ) : (
              <ul className="space-y-3.5">
                {d.weakTopics.map((t) => (
                  <li key={t.name} className="space-y-1">
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="truncate">{t.name}</span>
                      <span className={`font-semibold tabular-nums ${t.accuracy >= 70 ? "text-success" : t.accuracy >= 40 ? "text-accent-ink" : "text-danger"}`}>{t.accuracy}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
                      <div className={`h-full rounded-full ${t.accuracy >= 70 ? "bg-success" : t.accuracy >= 40 ? "bg-accent" : "bg-danger"}`} style={{ width: `${t.accuracy}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {d.strongTopics.length > 0 && (
              <p className="mt-5 text-xs text-muted">
                Strong: <span className="text-foreground">{d.strongTopics.map((t) => t.name.split(" · ")[1]).join(", ")}</span>
              </p>
            )}
          </section>
        </div>

        {/* Recent */}
        <section className={`${card} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-semibold">Recent tests</h2>
            <Link href="/tests" className="text-sm font-medium text-primary">
              All tests
            </Link>
          </div>
          {d.recent.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted">No tests yet — your attempts will show up here.</p>
          ) : (
            <>
              {/* Cards on mobile — a 5-column table with horizontal scroll is painful on a phone */}
              <ul className="divide-y divide-border sm:hidden">
                {d.recent.map((r) => (
                  <li key={r.id}>
                    <Link href={`/results/${r.id}`} className="flex flex-col gap-2 px-5 py-3.5 active:bg-surface-muted">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-medium">{r.title}</p>
                          <p className="text-xs text-muted">
                            {r.submittedAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            {!r.isFirst && " · re-attempt"}
                          </p>
                        </div>
                        <p className="shrink-0 text-right tabular-nums">
                          <b>{r.score}</b>
                          <span className="text-muted">/{r.maxScore}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-surface-muted px-2 py-1 font-medium tabular-nums">{r.accuracy}% accuracy</span>
                        {r.rank && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-1 font-medium tabular-nums text-accent-ink">
                            <Trophy className="size-3" /> #{r.rank.rank}/{r.rank.total}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Table on larger screens */}
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full min-w-[560px] text-sm">
                  <thead className="bg-surface-muted text-left text-xs text-muted">
                    <tr>
                      <th className="px-5 py-2.5 font-medium">Test</th>
                      <th className="px-5 py-2.5 text-right font-medium">Score</th>
                      <th className="px-5 py-2.5 text-right font-medium">Accuracy</th>
                      <th className="px-5 py-2.5 text-right font-medium">HP rank</th>
                      <th className="px-5 py-2.5 font-medium" />
                    </tr>
                  </thead>
                  <tbody>
                    {d.recent.map((r) => (
                      <tr key={r.id} className="border-t border-border">
                        <td className="px-5 py-3">
                          <p className="font-medium">{r.title}</p>
                          <p className="text-xs text-muted">
                            {r.submittedAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            {!r.isFirst && " · re-attempt"}
                          </p>
                        </td>
                        <td className="px-5 py-3 text-right tabular-nums">
                          <b>{r.score}</b>/{r.maxScore}
                        </td>
                        <td className="px-5 py-3 text-right tabular-nums">{r.accuracy}%</td>
                        <td className="px-5 py-3 text-right tabular-nums">
                          {r.rank ? (
                            <span className="inline-flex items-center gap-1">
                              <Trophy className="size-3.5 text-accent-ink" /> #{r.rank.rank}
                              <span className="text-muted">/{r.rank.total}</span>
                            </span>
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <Link href={`/results/${r.id}`} className="font-medium text-primary">
                            Analysis
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>

        {reports.length > 0 && <MyReports reports={reports} />}

        {d.suggested.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Recommended for you</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.suggested.map((t) => (
                <TestCard key={t.slug} test={t} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

const date = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

/** What the student has paid for, so a purchase is visible right after checkout. */
function MyPlans({ plans }: { plans: Plan[] }) {
  const renewed = new Set(plans.filter((p) => p.upcoming).map((p) => p.slug));
  return (
    <section className={`${card} p-5`}>
      <h2 className="mb-3 flex items-center gap-2 font-semibold">
        <BadgeCheck className="size-5 text-primary" /> My plan
      </h2>
      <ul className="divide-y divide-border">
        {plans.map((p) => (
          <li key={`${p.slug}-${p.startsAt.toISOString()}`} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0 flex-1">
              <p className="font-medium">{p.title}</p>
              <p className={`text-sm ${!p.upcoming && p.daysLeft <= 7 ? "text-danger" : "text-muted"}`}>
                {p.upcoming
                  ? `Starts ${date(p.startsAt)} · valid till ${date(p.expiresAt)}`
                  : `Valid till ${date(p.expiresAt)} · ${p.daysLeft} day${p.daysLeft === 1 ? "" : "s"} left`}
              </p>
            </div>
            {p.upcoming ? (
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">Renewal</span>
            ) : p.daysLeft <= 7 && !renewed.has(p.slug) ? (
              <Link href={`/buy/${p.slug}`} className={btn("accent", "sm")}>
                Renew
              </Link>
            ) : (
              <span className="rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success">Active</span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
        <Link href="/tests" className="text-primary hover:underline">
          Browse tests
        </Link>
        <Link href="/profile#purchases" className="text-muted hover:text-primary">
          Purchase history &amp; receipts
        </Link>
      </div>
    </section>
  );
}

const REPORT_STATUS: Record<MyReport["status"], { label: string; cls: string }> = {
  OPEN: { label: "Under review", cls: "bg-accent-soft text-accent-ink" },
  FIXED: { label: "Fixed — thank you!", cls: "bg-success-soft text-success" },
  REJECTED: { label: "Checked — no error found", cls: "bg-surface-muted text-muted" },
};

/** Closes the loop on "Report question": students see what happened to what they flagged. */
function MyReports({ reports }: { reports: MyReport[] }) {
  return (
    <section className={`${card} p-5`}>
      <h2 className="mb-3 flex items-center gap-2 font-semibold">
        <Flag className="size-5 text-primary" /> Your question reports
      </h2>
      <ul className="divide-y divide-border">
        {reports.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3 first:pt-0 last:pb-0">
            <p className="min-w-0 flex-1 text-sm">
              <span className="line-clamp-1">{r.preview || "Question"}</span>
              <span className="text-xs text-muted">Reported {date(r.createdAt)}</span>
            </p>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${REPORT_STATUS[r.status].cls}`}>{REPORT_STATUS[r.status].label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Stat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className={`${card} p-4`}>
      <div className="flex items-center gap-2 text-sm text-muted">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
      {sub && <p className="text-xs text-muted">{sub}</p>}
    </div>
  );
}
