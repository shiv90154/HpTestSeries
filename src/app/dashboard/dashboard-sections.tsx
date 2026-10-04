import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  Clock,
  Crown,
  Flag,
  Flame,
  Gift,
  NotebookPen,
  PlayCircle,
  Radio,
  Target,
  Trophy,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { LiveCountdown } from "@/components/live-countdown";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
import type { getDashboard } from "@/modules/analytics/dashboard";
import { daysLeftLabel, planUsedPercent } from "@/modules/commerce/plan-rules";
import type { Plan } from "@/modules/commerce/purchases";
import type { MyReport } from "@/modules/content/report-service";
import { ScoreTrend } from "./score-trend";

export type Dashboard = Awaited<ReturnType<typeof getDashboard>>;

const date = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const when = (d: Date) => d.toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

function greeting(): string {
  const h = Number(new Date().toLocaleString("en-IN", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" }));
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

/** One clear next step, with the numbers that matter underneath. */
export function Hero({ firstName, d }: { firstName: string; d: Dashboard }) {
  const { stats, inProgress } = d;
  const startHref = d.startSlug ? `/tests/${d.startSlug}/attempt` : "/tests";
  const message =
    stats.tests === 0
      ? "Take your first mock and see where you stand among Himachal aspirants."
      : stats.streak >= 2
        ? `${stats.streak} days in a row. Keep the streak alive today.`
        : stats.weekTests > 0
          ? `${stats.weekTests} test${stats.weekTests === 1 ? "" : "s"} this week. One more today?`
          : "A little practice every day beats a long session once a week.";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#133a9e] via-[#1e4fd8] to-[#3b6ef5] p-5 text-white sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" aria-hidden />
      <div className="relative space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-white/75">{greeting()},</p>
            <h1 className="text-2xl font-bold sm:text-3xl">{firstName} 👋</h1>
            <p className="max-w-md text-sm text-white/85 sm:text-base">{message}</p>
          </div>
          {inProgress ? (
            <Link href={`/tests/${inProgress.slug}/attempt`} className={btn("accent", "lg", "w-full sm:w-auto")}>
              <PlayCircle className="size-5" /> Resume test
            </Link>
          ) : (
            <Link href={startHref} className={btn("accent", "lg", "w-full sm:w-auto")}>
              <PlayCircle className="size-5" /> {stats.tests === 0 ? "Start first test" : "Take a mock test"}
            </Link>
          )}
        </div>

        {stats.tests > 0 && (
          <dl className="grid grid-cols-3 gap-2 sm:gap-3">
            <HeroStat icon={<Flame className="size-4" aria-hidden />} label="Day streak" value={`${stats.streak}`} />
            <HeroStat icon={<TrendingUp className="size-4" aria-hidden />} label="Avg score" value={`${stats.avgPercent}%`} />
            <HeroStat icon={<Target className="size-4" aria-hidden />} label="Accuracy" value={`${stats.accuracy}%`} />
          </dl>
        )}
      </div>
    </section>
  );
}

function HeroStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/12 px-3 py-2.5 backdrop-blur-sm">
      <dt className="flex items-center gap-1.5 text-xs text-white/75">
        {icon}
        {label}
      </dt>
      <dd className="mt-0.5 text-xl font-bold tabular-nums sm:text-2xl">{value}</dd>
    </div>
  );
}

/** A test the student started and has not finished. */
export function InProgressCard({ inProgress }: { inProgress: NonNullable<Dashboard["inProgress"]> }) {
  return (
    <section className={`${card} flex flex-col gap-4 border-accent bg-accent-soft p-5 sm:flex-row sm:items-center`}>
      <Clock className="size-8 shrink-0 text-accent-ink" aria-hidden />
      <div className="flex-1">
        <p className="font-semibold">Unfinished test: {inProgress.title}</p>
        <p className="text-sm text-muted">
          {inProgress.answered} answered · time left until{" "}
          {inProgress.deadlineAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })}
        </p>
      </div>
      <Link href={`/tests/${inProgress.slug}/attempt`} className={btn("primary")}>
        Resume test <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}

/** The next live test: when it starts, what the top ranks win, and a way in. */
export function LiveCard({ live }: { live: NonNullable<Dashboard["liveNext"]> }) {
  const open = live.open;
  return (
    <section className={`${card} space-y-3 border-danger/40 p-5`}>
      <div className="flex flex-wrap items-center gap-3">
        <Radio className="size-6 shrink-0 text-danger" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-danger">{open ? "Live now" : "Next live test"}</p>
          <p className="font-semibold">{live.title}</p>
          <p className="text-sm text-muted">
            {open ? `Join before ${when(live.endsAt)} (IST)` : `${when(live.startsAt)} (IST)`}
            {live.prizes.length > 0 && ` · Win: ${live.prizes.map((p) => p.title).join(" · ")}`}
          </p>
        </div>
        <Link href={`/tests/${live.slug}`} className={btn(open ? "primary" : "outline")}>
          {open ? "Join now" : "Details"} <ArrowRight className="size-4" />
        </Link>
      </div>
      {!open && <LiveCountdown to={live.startsAt.toISOString()} />}
    </section>
  );
}

type Tile = { href: string; icon: LucideIcon; title: string; sub: string; chip: string };

/** The four places a student goes most, one tap each. */
export function QuickActions({ plans, walletPaise }: { plans: Plan[]; walletPaise: number }) {
  const active = plans.filter((p) => !p.upcoming).length;
  const tiles: Tile[] = [
    { href: "/tests", icon: NotebookPen, title: "Mock tests", sub: "Practise now", chip: "bg-primary-soft text-primary" },
    { href: "/previous-year-papers", icon: BookOpenCheck, title: "Past papers", sub: "Real exam papers", chip: "bg-success-soft text-success" },
    { href: "/plan", icon: Crown, title: "My plan", sub: active ? `${active} active` : "Get a plan", chip: "bg-accent-soft text-accent-ink" },
    { href: "/refer", icon: Gift, title: "Refer & earn", sub: walletPaise > 0 ? `Wallet ${rupees(walletPaise)}` : "Earn ₹50 a friend", chip: "bg-primary-soft text-primary" },
  ];
  return (
    <section aria-label="Quick links" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {tiles.map((t) => (
        <Link key={t.href} href={t.href} className={`${card} flex items-center gap-3 p-4 transition-colors hover:border-primary`}>
          <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${t.chip}`}>
            <t.icon className="size-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <b className="block truncate">{t.title}</b>
            <span className="block truncate text-xs text-muted">{t.sub}</span>
          </span>
        </Link>
      ))}
    </section>
  );
}

/** What the student has paid for, so a purchase is visible right after checkout. The full detail lives on /plan. */
export function MyPlans({ plans }: { plans: Plan[] }) {
  const renewed = new Set(plans.filter((p) => p.upcoming).map((p) => p.slug));
  const current = plans.filter((p) => !p.upcoming);
  if (current.length === 0) return null;
  return (
    <section className={`${card} overflow-hidden`}>
      <div className="flex items-center justify-between gap-3 border-b border-border bg-primary-soft px-5 py-3">
        <h2 className="flex items-center gap-2 font-semibold text-primary-strong">
          <BadgeCheck className="size-5 text-primary" aria-hidden /> My plan
        </h2>
        <Link href="/plan" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          View details <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <ul className="divide-y divide-border">
        {current.map((p) => {
          const ending = p.daysLeft <= 7;
          const used = planUsedPercent(p.startsAt, p.expiresAt);
          return (
            <li key={`${p.slug}-${p.startsAt.toISOString()}`} className="space-y-2 px-5 py-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="min-w-0 flex-1 font-medium">{p.title}</p>
                {ending && !renewed.has(p.slug) ? (
                  <Link href={`/buy/${p.slug}`} className={btn("accent", "sm")}>
                    Renew
                  </Link>
                ) : (
                  <span className="rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success">{renewed.has(p.slug) ? "Renewed" : "Active"}</span>
                )}
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted" role="progressbar" aria-label={`${p.title} validity used`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={used}>
                <div className={`h-full rounded-full ${ending ? "bg-accent" : "bg-primary"}`} style={{ width: `${used}%` }} />
              </div>
              <p className={`text-xs ${ending ? "font-medium text-danger" : "text-muted"}`}>
                {daysLeftLabel(p.expiresAt)} · till {date(p.expiresAt)}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** What a student with no attempts yet sees instead of empty charts. */
export function FirstTestGuide({ startHref }: { startHref: string }) {
  const steps = [
    ["1", "Take a test", "Start with a free one. It uses the same screen as the real exam."],
    ["2", "See your rank", "Your score is ranked against Himachal aspirants straight away."],
    ["3", "Fix weak topics", "We show the topics where you lose marks, so you know what to revise."],
  ];
  return (
    <section className={`${card} space-y-4 p-5`}>
      <h2 className="font-semibold">Your dashboard fills up after your first test</h2>
      <ol className="grid gap-3 sm:grid-cols-3">
        {steps.map(([n, t, text]) => (
          <li key={n} className="flex gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft font-bold text-primary">{n}</span>
            <span>
              <b className="block">{t}</b>
              <span className="text-sm text-muted">{text}</span>
            </span>
          </li>
        ))}
      </ol>
      <Link href={startHref} className={btn("primary")}>
        <PlayCircle className="size-5" aria-hidden /> Start your first test
      </Link>
    </section>
  );
}

function Stat({ icon, chip, label, value, sub }: { icon: React.ReactNode; chip: string; label: string; value: string; sub?: string }) {
  return (
    <div className={`${card} flex items-center gap-3 p-4`}>
      <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${chip}`}>{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="text-xl font-bold tabular-nums">{value}</p>
        {sub && <p className="text-xs text-muted">{sub}</p>}
      </div>
    </div>
  );
}

/** Numbers, score trend and focus areas: only shown once there is something to chart. */
export function Performance({ d }: { d: Dashboard }) {
  const { stats } = d;
  return (
    <section aria-labelledby="performance-h" className="space-y-3">
      <h2 id="performance-h" className="text-lg font-semibold">
        Your performance
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon={<BarChart3 className="size-5" aria-hidden />} chip="bg-primary-soft text-primary" label="Tests taken" value={`${stats.tests}`} sub={stats.weekTests ? `${stats.weekTests} this week` : undefined} />
        <Stat icon={<TrendingUp className="size-5" aria-hidden />} chip="bg-success-soft text-success" label="Average score" value={`${stats.avgPercent}%`} sub={`Best ${stats.bestPercent}%`} />
        <Stat icon={<Target className="size-5" aria-hidden />} chip="bg-accent-soft text-accent-ink" label="Accuracy" value={`${stats.accuracy}%`} />
        <Stat icon={<Clock className="size-5" aria-hidden />} chip="bg-primary-soft text-primary" label="Practice time" value={`${stats.totalMinutes} min`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className={`${card} p-5`}>
          <h3 className="font-semibold">Score trend</h3>
          <p className="mb-6 text-xs text-muted">Score % per test, oldest to newest</p>
          <ScoreTrend points={d.trend} />
        </div>

        <div className={`${card} p-5`}>
          <h3 className="font-semibold">Focus areas</h3>
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
        </div>
      </div>
    </section>
  );
}

/** Latest results: cards on a phone, a table from `sm` (a sideways-scrolling table is painful on a phone). */
export function RecentTests({ recent }: { recent: Dashboard["recent"] }) {
  return (
    <section className={`${card} overflow-hidden`}>
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="font-semibold">Recent tests</h2>
        <Link href="/tests" className="text-sm font-medium text-primary">
          All tests
        </Link>
      </div>
      {recent.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-muted">No tests yet — your attempts will show up here.</p>
      ) : (
        <>
          <ul className="divide-y divide-border sm:hidden">
            {recent.map((r) => (
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
                        <Trophy className="size-3" aria-hidden /> #{r.rank.rank}/{r.rank.total}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

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
                {recent.map((r) => (
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
                          <Trophy className="size-3.5 text-accent-ink" aria-hidden /> #{r.rank.rank}
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
  );
}

const REPORT_STATUS: Record<MyReport["status"], { label: string; cls: string }> = {
  OPEN: { label: "Under review", cls: "bg-accent-soft text-accent-ink" },
  FIXED: { label: "Fixed — thank you!", cls: "bg-success-soft text-success" },
  REJECTED: { label: "Checked — no error found", cls: "bg-surface-muted text-muted" },
};

/** Closes the loop on "Report question": students see what happened to what they flagged. */
export function MyReports({ reports }: { reports: MyReport[] }) {
  return (
    <section className={`${card} p-5`}>
      <h2 className="mb-3 flex items-center gap-2 font-semibold">
        <Flag className="size-5 text-primary" aria-hidden /> Your question reports
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
