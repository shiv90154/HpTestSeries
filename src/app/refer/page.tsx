import { Gift } from "lucide-react";
import type { Metadata } from "next";
import { AppHeader } from "@/components/app-header";
import { ShareButtons } from "@/components/share-buttons";
import { card } from "@/components/ui";
import { rupees } from "@/lib/money";
import { site } from "@/lib/site";
import { getReferralSummary } from "@/modules/commerce/referral";
import { FRIEND_DISCOUNT_PAISE, MAX_REWARDS_PER_USER, REWARD_PAISE, REWARD_VALID_DAYS, referralLink } from "@/modules/commerce/referral-rules";
import { requireUser } from "@/modules/identity/session";

export const metadata: Metadata = { title: "Refer a friend", robots: { index: false } };

export default async function ReferPage() {
  const user = await requireUser("/refer");
  const summary = await getReferralSummary(user.id);
  const link = referralLink(site.url, summary.code);
  const date = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

  return (
    <>
      <AppHeader user={user} />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-6 sm:py-8">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Gift className="size-6 text-primary" /> Refer a friend
          </h1>
          <p className="mt-1 text-sm text-muted">
            Your friend saves {rupees(FRIEND_DISCOUNT_PAISE)} on their first purchase. When they pay, you get a {rupees(REWARD_PAISE)} coupon.
          </p>
        </div>

        <section className={`${card} space-y-4 p-5`}>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Your referral code</p>
            <p className="mt-1 text-3xl font-bold tracking-wider tabular-nums">{summary.code}</p>
            <p className="mt-1 break-all text-sm text-muted">{link}</p>
          </div>
          <ShareButtons
            url={link}
            text={`Practice Himachal exam mock tests on ${site.name}. Use my code ${summary.code} and get ${rupees(FRIEND_DISCOUNT_PAISE)} off your first purchase.`}
            label="Send it to a friend"
          />
        </section>

        <section className={`${card} p-5`}>
          <h2 className="mb-3 font-semibold">How it works</h2>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm">
            <li>Share your link or code with a friend preparing for an HP exam.</li>
            <li>They enter the code on the buy page and pay {rupees(FRIEND_DISCOUNT_PAISE)} less on their first purchase.</li>
            <li>
              As soon as their payment goes through, a {rupees(REWARD_PAISE)} coupon appears below. It works on your next purchase and is valid{" "}
              {REWARD_VALID_DAYS} days.
            </li>
          </ol>
          <p className="mt-3 text-xs text-muted">
            You can&apos;t use your own code, a code works only on a friend&apos;s first purchase, and rewards are limited to {MAX_REWARDS_PER_USER} per student.
          </p>
        </section>

        <section className={`${card} p-5`}>
          <h2 className="mb-1 font-semibold">Your rewards</h2>
          <p className="mb-3 text-sm text-muted">
            {summary.friends} friend{summary.friends === 1 ? "" : "s"} joined with your code.
          </p>
          {summary.rewards.length === 0 ? (
            <p className="text-sm text-muted">No rewards yet. Your first one shows up here when a friend pays.</p>
          ) : (
            <ul className="divide-y divide-border">
              {summary.rewards.map((r) => (
                <li key={r.code} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-mono font-semibold tracking-wider">{r.code}</p>
                    <p className="text-xs text-muted">
                      {rupees(REWARD_PAISE)} off{r.validTill && ` · valid till ${date(r.validTill)}`}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${r.used ? "bg-surface-muted text-muted" : r.expired ? "bg-surface-muted text-danger" : "bg-success-soft text-success"}`}>
                    {r.used ? "Used" : r.expired ? "Expired" : "Ready to use"}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-muted">Enter a reward code in the coupon box on the buy page.</p>
        </section>
      </main>
    </>
  );
}
