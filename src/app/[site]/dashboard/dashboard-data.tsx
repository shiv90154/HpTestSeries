import { BadgeCheck } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { TestCard } from "@/components/test-card";
import { WhatsAppGroupCard } from "@/components/whatsapp-group";
import { getDashboard } from "@/modules/analytics/dashboard";
import { currentSite } from "@/sites/current";
import { getFreshPurchase, getMyPlans } from "@/modules/commerce/purchases";
import { getWalletBalance } from "@/modules/commerce/wallet";
import { getMyReports } from "@/modules/content/report-service";
import type { requireUser } from "@/modules/identity/session";
import { FirstTestGuide, Hero, InProgressCard, LiveCard, MyPlans, MyReports, Performance, PlanExpiryBanner, PurchaseSuccess, QuickActions, RecentTests } from "./dashboard-sections";
import { ProfileCard } from "./profile-card";

export async function DashboardData({ user, purchaseNotice }: { user: Awaited<ReturnType<typeof requireUser>>; purchaseNotice: "unlocked" | "pending" | null }) {
  const site = await currentSite();
  const [d, plans, reports, walletPaise, fresh] = await Promise.all([
    getDashboard(site.code, user.id),
    getMyPlans(user.id),
    getMyReports(user.id),
    getWalletBalance(user.id),
    purchaseNotice === "unlocked" ? getFreshPurchase(user.id) : null,
  ]);
  // Profile comes from the DB (not the 5-minute session cookie cache) so edits show immediately.
  const firstName = d.profile.name.split(" ")[0];
  const needsProfile = d.profile.name === "Aspirant" || !d.profile.district;
  const hasTests = d.stats.tests > 0;

  return (
    <>
      <AppHeader user={{ ...user, name: d.profile.name }} />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-6 sm:py-8">
        {fresh ? (
          <PurchaseSuccess purchase={fresh} />
        ) : (
          purchaseNotice && (
            <p role="status" className="flex items-start gap-2 rounded-2xl border border-success bg-success-soft p-4 text-sm font-medium">
              <BadgeCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
              {purchaseNotice === "unlocked"
                ? "Payment received — your purchase is now unlocked on this account."
                : "Payment received — it's being confirmed by the bank. Your access appears here automatically within a few minutes."}
            </p>
          )
        )}
        {/* Right after paying is when a student is keenest to join; otherwise the invite sits lower down. */}
        {purchaseNotice && <WhatsAppGroupCard place="after_purchase" />}

        <PlanExpiryBanner plans={plans} />
        <Hero firstName={firstName} d={d} />

        {needsProfile && <ProfileCard name={d.profile.name} district={d.profile.district} />}
        {d.inProgress && <InProgressCard inProgress={d.inProgress} />}
        {d.liveNext && <LiveCard live={d.liveNext} />}

        <QuickActions plans={plans} walletPaise={walletPaise} />

        {/* Before the first test there is nothing to chart: a short guide is more useful than four zeros. */}
        {hasTests ? (
          <Performance d={d} aside={<MyPlans plans={plans} />} />
        ) : (
          <>
            <FirstTestGuide startHref={d.startSlug ? `/tests/${d.startSlug}/attempt` : "/tests"} />
            <MyPlans plans={plans} />
          </>
        )}

        {hasTests && <RecentTests recent={d.recent} total={d.stats.tests} />}

        {d.suggested.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">{hasTests ? "Next up for you" : "Recommended for you"}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.suggested.map((t) => (
                <TestCard key={t.slug} test={t} />
              ))}
            </div>
          </section>
        )}

        {reports.length > 0 && <MyReports reports={reports} />}
        {!purchaseNotice && <WhatsAppGroupCard place="dashboard" />}
      </main>
    </>
  );
}
