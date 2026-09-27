import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { Mountains } from "@/components/mountains";
import { safeNextPath } from "@/lib/site";
import { emailLoginEnabled, googleLoginEnabled, phoneLoginEnabled } from "@/modules/identity/login-methods";
import { getCurrentUser } from "@/modules/identity/session";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false },
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const sp = await searchParams;
  const next = safeNextPath(sp.next);
  const googleFailed = sp.error === "google";
  if (await getCurrentUser()) redirect(next);

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-linear-to-br from-[#0b1f5c] via-[#133a9e] to-[#1e4fd8] p-12 text-white lg:flex lg:flex-col">
        <Logo light />
        <div className="relative z-10 my-auto max-w-md space-y-6">
          <h2 className="text-4xl font-bold leading-tight">Your Himachal exam preparation, in one place</h2>
          <ul className="space-y-3 text-white/90">
            {["Real CBT exam interface", "Hindi & English questions", "Your rank among HP aspirants", "Detailed solutions & weak-topic analysis"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <CheckCircle2 className="size-5 text-accent" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <Mountains className="absolute inset-x-0 bottom-0 h-40 w-full opacity-60 [&>path:last-child]:hidden" />
      </aside>

      <main className="flex flex-col px-4 py-8 sm:px-10">
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="mx-auto my-auto w-full max-w-sm space-y-7 py-10">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold">Login or sign up</h1>
            <p className="text-sm text-muted">
              {emailLoginEnabled
                ? `${googleLoginEnabled ? "Continue with Google, or get" : "Get"} a 6-digit code by email.`
                : googleLoginEnabled
                  ? "Continue with your Google account."
                  : ""}{" "}
              New here? Your account is created automatically.
            </p>
          </div>
          {googleFailed && (
            <p role="alert" className="rounded-xl border border-danger bg-danger-soft p-3 text-sm text-danger">
              Google sign-in did not complete. Please try again, or use an email code.
            </p>
          )}
          {googleLoginEnabled || emailLoginEnabled || phoneLoginEnabled ? (
            <LoginForm next={next} googleEnabled={googleLoginEnabled} emailEnabled={emailLoginEnabled} phoneEnabled={phoneLoginEnabled} />
          ) : (
            <p className="rounded-xl border border-accent bg-accent-soft p-4 text-sm">
              Login is being set up and will open shortly. Meanwhile, free mock tests work without an account.
            </p>
          )}
          <p className="text-center text-sm text-muted">
            Just want to try?{" "}
            <Link href="/tests/hp-gk-free-mock-1" className="font-semibold text-primary">
              Take a free mock without login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
