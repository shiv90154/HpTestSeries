import "server-only";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { getMyPlans } from "@/modules/commerce/purchases";
import { getWalletBalance } from "@/modules/commerce/wallet";
import { auth } from "./auth";

/**
 * Saves the signed-in student's own details. The name is written through Better Auth, which also refreshes the
 * session cookie cache (5 minutes, see auth.ts), so every header shows the new name at once instead of "Aspirant".
 */
export async function saveOwnProfile(userId: string, data: { name: string; district?: string; preferredLang?: "en" | "hi" }) {
  const { name, ...rest } = data;
  await auth.api.updateUser({ body: { name }, headers: await headers() });
  if (rest.district !== undefined || rest.preferredLang !== undefined) await db.user.update({ where: { id: userId }, data: rest });
}

/** Numbers shown on the profile header: tests finished, plans running now, and the wallet balance. */
export async function getProfileStats(userId: string) {
  const [testsTaken, plans, walletPaise] = await Promise.all([
    db.attempt.count({ where: { userId, status: "SUBMITTED" } }),
    getMyPlans(userId),
    getWalletBalance(userId),
  ]);
  return { testsTaken, activePlans: plans.filter((p) => !p.upcoming), walletPaise };
}
