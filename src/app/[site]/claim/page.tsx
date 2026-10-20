import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { claimGuestOrdersForUser } from "@/modules/commerce/guest-session";
import { requireUser } from "@/modules/identity/session";

export const metadata: Metadata = { title: "Unlock your purchase", robots: { index: false } };

/**
 * Where a guest buyer lands after paying: logging in (or signing up) attaches the purchase made in this browser,
 * or with this email, to the account, then the dashboard shows the unlocked plan.
 */
export default async function ClaimPage() {
  await connection();
  const user = await requireUser("/claim");
  const { claimed, unlocked } = await claimGuestOrdersForUser(user);
  redirect(unlocked > 0 ? "/dashboard?purchase=unlocked" : claimed > 0 ? "/dashboard?purchase=pending" : "/dashboard");
}
