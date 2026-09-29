import "server-only";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "./auth";
import { hasPassedTwoFactor, isTwoFactorEnabled } from "./two-factor";
import { can, type Permission, type Role } from "./permissions";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  role: Role;
};

/** Session for the current request, deduplicated across a single render. */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  const u = session.user as typeof session.user & { role?: Role; phoneNumber?: string | null };
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    phoneNumber: u.phoneNumber ?? null,
    role: u.role ?? "STUDENT",
  };
});

/**
 * The student's question language from their profile. Read from the DB, not the session: the session
 * cookie caches user fields for minutes, and a just-changed preference should apply to the next test.
 */
export const getPreferredLang = cache(async (userId: string): Promise<"en" | "hi"> => {
  const u = await db.user.findUnique({ where: { id: userId }, select: { preferredLang: true } });
  return u?.preferredLang ?? "en";
});

/** Use in pages/actions that need a signed-in student. */
export async function requireUser(returnTo?: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect(returnTo ? `/login?next=${encodeURIComponent(returnTo)}` : "/login");
  return user;
}

/** Authoritative permission guard for admin pages, server actions, and route handlers. */
export async function requirePermission(permission: Permission, returnTo?: string): Promise<CurrentUser> {
  const user = await requireUser(returnTo);
  // 404 rather than 403: do not reveal that admin routes exist.
  if (!can(user.role, permission)) notFound();
  // Staff who turned on 2FA must pass it (once per 12 hours) before any admin page or action works.
  if ((await isTwoFactorEnabled(user.id)) && !(await hasPassedTwoFactor(user.id))) {
    redirect(`/verify-2fa?next=${encodeURIComponent(returnTo ?? "/admin")}`);
  }
  return user;
}
