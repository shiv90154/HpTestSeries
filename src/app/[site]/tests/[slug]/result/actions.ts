"use server";

import { z } from "zod";
import { claimGuestAttempt } from "@/modules/assessment/service";
import { guestClaimSchema } from "@/modules/assessment/types";
import { getCurrentUser } from "@/modules/identity/session";

/** Saves the guest result kept in this tab to the (now logged-in) student's account. */
export async function claimGuestResultAction(slug: string, claim: unknown): Promise<{ attemptId: string } | { error: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Please log in first." };
  const parsed = guestClaimSchema.safeParse(claim);
  if (!parsed.success) return { error: "This result could not be verified." };
  return claimGuestAttempt(user.id, z.string().min(1).max(64).parse(slug), parsed.data);
}
