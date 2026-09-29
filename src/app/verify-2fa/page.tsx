import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Logo } from "@/components/logo";
import { safeNextPath } from "@/lib/site";
import { requireUser } from "@/modules/identity/session";
import { hasPassedTwoFactor, isTwoFactorEnabled } from "@/modules/identity/two-factor";
import { VerifyForm } from "./verify-form";

export const metadata: Metadata = { title: "Two-factor check", robots: { index: false } };

export default async function VerifyTwoFactorPage({ searchParams }: PageProps<"/verify-2fa">) {
  await connection();
  const next = safeNextPath((await searchParams).next, "/admin");
  const user = await requireUser("/verify-2fa");
  if (!(await isTwoFactorEnabled(user.id)) || (await hasPassedTwoFactor(user.id))) redirect(next);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center gap-6 px-4 py-10">
      <Logo />
      <div className="space-y-1.5">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <ShieldCheck className="size-6 text-primary" /> Two-factor check
        </h1>
        <p className="text-sm text-muted">Open your authenticator app and enter the 6-digit code for HP Test Series. Lost your phone? Use a backup code.</p>
      </div>
      <VerifyForm next={next} />
    </main>
  );
}
