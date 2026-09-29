import "server-only";
import { headers } from "next/headers";
import { db } from "@/lib/db";
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
