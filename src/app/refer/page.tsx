import { Gift, Wallet } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { ShareButtons } from "@/components/share-buttons";
import { btn, card } from "@/components/ui";
import { rupees } from "@/lib/money";
import { site } from "@/lib/site";
import { getReferralSummary } from "@/modules/commerce/referral";
import { FRIEND_DISCOUNT_PAISE, MAX_REWARDS_PER_USER, REWARD_PAISE, referralLink } from "@/modules/commerce/referral-rules";
import { getWalletBalance, getWalletHistory } from "@/modules/commerce/wallet";
import { requireUser } from "@/modules/identity/session";

export const metadata: Metadata = { title: "Refer a friend", robots: { index: false } };

const TYPE_LABEL: Record<string, string> = {
  REFERRAL_REWARD: "Friend joined with your code",
  REFERRAL_REVERSAL: "Friend's order was refunded",
  PURCHASE: "Spent on a purchase",
  REFUND: "Refunded purchase",
  ADMIN: "Adjustment by support",
};

export default async function ReferPage() {
  const user = await requireUser("/refer");
  const [summary, balance, history] = await Promise.all([getReferralSummary(user.id), getWalletBalance(user.id), getWalletHistory(user.id)]);
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
            Your friend saves {rupees(FRIEND_DISCOUNT_PAISE)} on their first purchase. When they pay, {rupees(REWARD_PAISE)} is added to your HP wallet.
          </p>
        </div>

        <section className={`${card} flex items-center justify-between gap-4 p-5`}>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
              <Wallet className="size-4" /> HP wallet
            </p>
            <p className="mt-1 text-3xl font-bold tabular-nums">{rupees(balance)}</p>
            <p className="mt-1 text-xs text-muted">Use it to buy any test series or mock. It can&apos;t be withdrawn as cash.</p>
          </div>
          <Link href="/pricing" className={btn(balance > 0 ? "primary" : "outline", "md", "shrink-0")}>
            {balance > 0 ? "Spend it" : "See plans"}
          </Link>
        </section>

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
            <li>As soon as their payment goes through, {rupees(REWARD_PAISE)} is added to your wallet. On the buy page, tick &ldquo;Use my HP wallet&rdquo; to spend it.</li>
          </ol>
          <p className="mt-3 text-xs text-muted">
            You can&apos;t use your own code, a code works only on a friend&apos;s first purchase, and you can earn from up to {MAX_REWARDS_PER_USER} friends.
          </p>
        </section>

        <section className={`${card} p-5`}>
          <h2 className="mb-1 font-semibold">Wallet history</h2>
          <p className="mb-3 text-sm text-muted">
            {summary.friends} friend{summary.friends === 1 ? "" : "s"} joined with your code.
          </p>
          {history.length === 0 ? (
            <p className="text-sm text-muted">Nothing yet. Your first credit shows up here when a friend pays.</p>
          ) : (
            <ul className="divide-y divide-border">
              {history.map((h) => (
                <li key={h.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{TYPE_LABEL[h.type] ?? h.type}</p>
                    <p className="text-xs text-muted">{date(h.createdAt)}</p>
                  </div>
                  <span className={`font-semibold tabular-nums ${h.amountPaise > 0 ? "text-success" : "text-foreground"}`}>
                    {h.amountPaise > 0 ? "+" : "−"}
                    {rupees(Math.abs(h.amountPaise))}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
