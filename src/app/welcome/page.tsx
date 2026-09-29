import { UserRound } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Logo } from "@/components/logo";
import { db } from "@/lib/db";
import { safeNextPath } from "@/lib/site";
import { PLACEHOLDER_NAME } from "@/modules/identity/permissions";
import { requireUser } from "@/modules/identity/session";
import { WelcomeForm } from "./welcome-form";

export const metadata: Metadata = { title: "Welcome", robots: { index: false } };

/** Right after the first email / SMS code sign-in: asks for the name (accounts start as "Aspirant"). */
export default async function WelcomePage({ searchParams }: PageProps<"/welcome">) {
  await connection();
  const next = safeNextPath((await searchParams).next);
  const user = await requireUser(`/welcome?next=${encodeURIComponent(next)}`);
  // From the DB, not the session: the session cookie caches the name for a few minutes.
  const { name } = await db.user.findUniqueOrThrow({ where: { id: user.id }, select: { name: true } });
  if (name !== PLACEHOLDER_NAME) redirect(next);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center gap-6 px-4 py-10">
      <Logo />
      <div className="space-y-1.5">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <UserRound className="size-6 shrink-0 text-primary" aria-hidden /> What should we call you?
        </h1>
        <p className="text-sm text-muted">
          Your name goes on your results. On leaderboards other students see only your first name and last initial, like
          &ldquo;Rahul S.&rdquo;
        </p>
      </div>
      <WelcomeForm next={next} />
    </main>
  );
}
