import { BadgeCheck, Calendar, CheckCircle2, Circle, Crown, Mail, Pencil, Receipt, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { btn, card } from "@/components/ui";
import { WhatsAppGroupCard } from "@/components/whatsapp-group";
import { db } from "@/lib/db";
import { rupees } from "@/lib/money";
import { getMyPurchases } from "@/modules/commerce/purchases";
import { isRealEmail, offersAllowed } from "@/modules/email/rules";
import { getProfileStats } from "@/modules/identity/profile";
import { initialsOf, profileCompleteness } from "@/modules/identity/profile-rules";
import { requireUser } from "@/modules/identity/session";
import { currentSite } from "@/sites/current";
import { AppSettings } from "@/components/pwa/app-settings";
import { EmailPrefsForm } from "./email-prefs-form";
import { phoneLoginEnabled } from "@/modules/identity/login-methods";
import { PhoneEditor } from "./phone-editor";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "My Profile", robots: { index: false } };

const verified = (
  <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success">
    <BadgeCheck className="size-3.5" /> Verified
  </span>
);

export default async function ProfilePage() {
  const site = await currentSite();
  const user = await requireUser("/profile");
  const purchasesPromise = getMyPurchases(user.id);
  const statsPromise = getProfileStats(user.id);
  const profile = await db.user.findUniqueOrThrow({
    where: { id: user.id },
    select: {
      name: true,
      email: true,
      emailVerified: true,
      phoneNumber: true,
      phoneNumberVerified: true,
      district: true,
      preferredLang: true,
      createdAt: true,
      emailOffers: true,
      emailOffersAt: true,
      emailReminders: true,
    },
  });

  const [purchases, stats] = await Promise.all([purchasesPromise, statsPromise]);
  const completeness = profileCompleteness(profile);
  const memberSince = profile.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  const topPlan = stats.activePlans[0];

  return (
    <>
      <AppHeader user={{ ...user, name: profile.name }} />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-6 sm:py-8">
        <section className={`${card} overflow-hidden`}>
          <div className="h-20 bg-linear-to-r from-primary to-primary-strong" aria-hidden />
          <div className="px-5 pb-5">
            <div className="-mt-10 flex items-end justify-between gap-4">
              <span className="grid size-20 shrink-0 place-items-center rounded-full border-4 border-surface bg-primary-soft text-2xl font-bold text-primary" aria-hidden>
                {initialsOf(profile.name)}
              </span>
              <a href="#edit" className={btn("outline", "sm", "mb-1 shrink-0")}>
                <Pencil className="size-3.5" /> Edit profile
              </a>
            </div>
            <div className="mt-3 min-w-0">
              <h1 className="truncate text-xl font-bold sm:text-2xl">{profile.name}</h1>
              <p className="flex items-center gap-1.5 text-sm text-muted">
                <Calendar className="size-3.5 shrink-0" /> Member since {memberSince}
              </p>
            </div>

            {topPlan && (
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold">
                <Crown className="size-3.5" /> {topPlan.title}
                {stats.activePlans.length > 1 && ` +${stats.activePlans.length - 1} more`}
              </p>
            )}

            <dl className="mt-4 grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-surface-muted text-center">
              <Link href="/results" className="rounded-l-xl px-2 py-3 hover:bg-primary-soft">
                <dd className="text-lg font-bold">{stats.testsTaken}</dd>
                <dt className="text-xs text-muted">Tests taken</dt>
              </Link>
              <Link href="/plan" className="px-2 py-3 hover:bg-primary-soft">
                <dd className="text-lg font-bold">{stats.activePlans.length}</dd>
                <dt className="text-xs text-muted">Active plans</dt>
              </Link>
              <Link href="/refer" className="rounded-r-xl px-2 py-3 hover:bg-primary-soft">
                <dd className="text-lg font-bold">{rupees(stats.walletPaise)}</dd>
                <dt className="text-xs text-muted">Wallet</dt>
              </Link>
            </dl>
          </div>
        </section>

        {completeness.percent < 100 && (
          <section className={`${card} p-5`} aria-label="Profile completeness">
            <div className="mb-2 flex items-center justify-between text-sm">
              <h2 className="font-semibold">Complete your profile</h2>
              <span className="font-semibold text-primary">{completeness.percent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-muted" role="progressbar" aria-label="Profile completeness" aria-valuenow={completeness.percent} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${completeness.percent}%` }} />
            </div>
            <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
              {[...completeness.steps].sort((x, y) => Number(x.done) - Number(y.done)).map((s) => (
                <li key={s.key} className={`flex items-center gap-2 ${s.done ? "text-muted" : "font-medium"}`}>
                  {s.done ? <CheckCircle2 className="size-4 text-success" /> : <Circle className="size-4 text-muted" />}
                  {s.label}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section id="edit" className={`${card} scroll-mt-24 p-5`}>
          <ProfileForm name={profile.name} district={profile.district} preferredLang={profile.preferredLang} />
        </section>

        <section id="account" className={`${card} scroll-mt-24 p-5`}>
          <h2 className="mb-4 font-semibold">Sign-in details</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-muted" />
              <span className="sr-only">Email</span>
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                {isRealEmail(profile.email) ? <span className="truncate">{profile.email}</span> : <span className="text-muted">Not added</span>}
                {isRealEmail(profile.email) && profile.emailVerified && verified}
              </div>
            </div>
            <PhoneEditor phone={profile.phoneNumber} verified={profile.phoneNumberVerified} enabled={phoneLoginEnabled} />
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-4 shrink-0 text-muted" />
              <p className="flex-1 text-muted">You sign in with a one-time code, so there is no password to remember.</p>
            </div>
          </div>
        </section>

        {isRealEmail(profile.email) && (
          <section id="email" className={`${card} scroll-mt-24 p-5`}>
            <h2 className="mb-4 font-semibold">Email settings</h2>
            <EmailPrefsForm offers={offersAllowed(profile)} reminders={profile.emailReminders} />
          </section>
        )}

        <section id="app" className={`${card} scroll-mt-24 p-5`}>
          <h2 className="mb-4 font-semibold">App and notifications</h2>
          <AppSettings />
        </section>

        <section className={`${card} flex items-center justify-between gap-3 p-5`}>
          <div>
            <h2 className="font-semibold">Refer a friend</h2>
            <p className="text-sm text-muted">Your friend saves ₹50, and ₹50 goes into your {site.logo.initials} wallet when they pay.</p>
          </div>
          <Link href="/refer" className={btn("outline", "md", "shrink-0")}>
            Get my code
          </Link>
        </section>

        <WhatsAppGroupCard place="profile" />

        <section id="purchases" className={`${card} scroll-mt-24 p-5`}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-semibold">Purchases</h2>
            <Link href="/plan" className="text-sm font-medium text-primary hover:underline">
              My plan →
            </Link>
          </div>
          {purchases.length === 0 ? (
            <p className="text-sm text-muted">
              No purchases yet.{" "}
              <Link href="/pricing" className="font-medium text-primary hover:underline">
                See plans
              </Link>
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {purchases.map((o) => (
                <li key={o.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{o.productTitle}</p>
                    <p className="text-xs text-muted">
                      {o.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })} ·{" "}
                      {rupees(o.amountPaise)}
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
