import { BadgeCheck, CalendarClock, CheckCircle2, Crown, PlayCircle, Receipt, Wallet } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
import { daysLeftLabel, planUsedPercent } from "@/modules/commerce/plan-rules";
import { getMyPlanDetails, getMyPurchases, type PlanDetail } from "@/modules/commerce/purchases";
import { getWalletBalance } from "@/modules/commerce/wallet";
import { requireUser } from "@/modules/identity/session";

export const metadata: Metadata = { title: "My plan", robots: { index: false } };

const date = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const KIND_LABEL = { SERIES: "Test series", PACK: "Pack", PASS: "All-access pass" } as const;

export default async function PlanPage() {
  const user = await requireUser("/plan");
  const [plans, purchases, wallet] = await Promise.all([getMyPlanDetails(user.id), getMyPurchases(user.id), getWalletBalance(user.id)]);
  const renewed = new Set(plans.filter((p) => p.upcoming).map((p) => p.slug));
  const active = plans.filter((p) => !p.upcoming);
  const upcoming = plans.filter((p) => p.upcoming);

  return (
    <>
      <AppHeader user={user} />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-6 sm:py-8">
        <div>
          <h1 className="text-2xl font-bold">My plan</h1>
          <p className="mt-1 text-sm text-muted">What you&apos;ve bought, how long it lasts, and your receipts.</p>
        </div>

        {active.length === 0 && upcoming.length === 0 ? (
          <section className={`${card} space-y-3 p-6 text-center`}>
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary-soft text-primary">
              <Crown className="size-6" />
            </span>
            <h2 className="text-lg font-semibold">You don&apos;t have an active plan</h2>
            <p className="mx-auto max-w-sm text-sm text-muted">
              A plan unlocks every paid mock and subject test of an exam, with solutions and your HP rank.
            </p>
            <Link href="/pricing" className={btn("primary", "md")}>
              See plans
            </Link>
          </section>
        ) : (
          <>
            {active.map((p) => (
              <PlanCard key={`${p.slug}-${p.startsAt.toISOString()}`} plan={p} hasRenewal={renewed.has(p.slug)} />
            ))}
            {upcoming.length > 0 && (
              <section className={`${card} p-5`}>
                <h2 className="mb-3 flex items-center gap-2 font-semibold">
                  <CalendarClock className="size-5 text-primary" /> Starts later
                </h2>
                <ul className="divide-y divide-border">
                  {upcoming.map((p) => (
                    <li key={`${p.slug}-${p.startsAt.toISOString()}`} className="py-3 first:pt-0 last:pb-0">
                      <p className="font-medium">{p.title}</p>
                      <p className="text-sm text-muted">
                        Renewal: starts {date(p.startsAt)} · valid till {date(p.expiresAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        {wallet > 0 && (
          <Link href="/refer" className={`${card} flex items-center gap-3 p-4 hover:border-primary`}>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-ink">
              <Wallet className="size-5" />
            </span>
            <span className="flex-1 text-sm">
              <b>{rupees(wallet)}</b> in your HP wallet
              <span className="block text-xs text-muted">Use it on your next purchase.</span>
            </span>
          </Link>
        )}

        <section id="purchases" className={`${card} scroll-mt-24 p-5`}>
          <h2 className="mb-3 font-semibold">Purchase history</h2>
          {purchases.length === 0 ? (
            <p className="text-sm text-muted">No purchases yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {purchases.map((o) => (
                <li key={o.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{o.productTitle}</p>
                    <p className="text-xs text-muted">
                      {date(o.createdAt)} · {rupees(o.amountPaise)}
                      {o.status === "REFUNDED" && <span className="font-semibold text-danger"> · Refunded</span>}
                    </p>
                  </div>
                  <Link href="/refund-request" className="shrink-0 text-xs text-muted hover:text-primary hover:underline">
                    Refund?
                  </Link>
                  <Link href={`/orders/${o.id}/receipt`} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                    <Receipt className="size-4" /> Receipt
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

function PlanCard({ plan: p, hasRenewal }: { plan: PlanDetail; hasRenewal: boolean }) {
  const used = planUsedPercent(p.startsAt, p.expiresAt);
  const ending = p.daysLeft <= 7;
  return (
    <section className={`${card} overflow-hidden`}>
      <div className="bg-linear-to-br from-[#133a9e] via-[#1e4fd8] to-[#3b6ef5] p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-white/75">{KIND_LABEL[p.kind]}</p>
            <h2 className="mt-1 text-xl font-bold">{p.title}</h2>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">
            <BadgeCheck className="size-4" /> Active
          </span>
        </div>
        <div className="mt-5">
          <div className="flex items-end justify-between text-sm">
            <span className="font-semibold">{daysLeftLabel(p.expiresAt)}</span>
            <span className="text-white/75">till {date(p.expiresAt)}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20" role="progressbar" aria-label="Plan validity used" aria-valuemin={0} aria-valuemax={100} aria-valuenow={used}>
            <div className={`h-full rounded-full ${ending ? "bg-accent" : "bg-white"}`} style={{ width: `${used}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="mb-2 text-sm font-semibold">What you get</h3>
          <ul className="space-y-1.5 text-sm">
            {p.kind === "PASS" ? (
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                <span>
                  Every paid test on the platform{p.paidTestCount > 0 && ` (${p.paidTestCount} today)`}, plus new ones added while it&apos;s valid
                </span>
              </li>
            ) : p.included.length ? (
              p.included.map((s) => (
                <li key={s.title} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  <span>
                    {s.title}
                    {s.testCount > 0 && <span className="text-muted"> · {s.testCount} test{s.testCount === 1 ? "" : "s"}</span>}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-muted">Mock tests, solutions and HP rank.</li>
            )}
          </ul>
        </div>

        {ending && !hasRenewal && (
          <p className="rounded-xl bg-accent-soft p-3 text-sm">
            Ending soon. Renew now and the new period starts right after this one, so you don&apos;t lose a single day.
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Link href="/tests" className={btn("primary", "md")}>
            <PlayCircle className="size-5" /> Start practising
          </Link>
          {ending && !hasRenewal && (
            <Link href={`/buy/${p.slug}`} className={btn("accent", "md")}>
              Renew
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
