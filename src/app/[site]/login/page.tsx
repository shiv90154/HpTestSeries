import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { Mountains } from "@/components/mountains";
import { T } from "@/components/ui-lang";
import { safeNextPath } from "@/lib/safe-next";
import { freeMockHref } from "@/sites";
import { currentSite } from "@/sites/current";
import { emailLoginEnabled, googleLoginEnabled, phoneLoginEnabled } from "@/modules/identity/login-methods";
import { getCurrentUser } from "@/modules/identity/session";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false },
};

export default async function LoginPage({ searchParams }: PageProps<"/[site]/login">) {
  const site = await currentSite();
  const sp = await searchParams;
  const next = safeNextPath(sp.next);
  const googleFailed = sp.error === "google";
  const paidAsGuest = next === "/claim"; // came straight from paying without an account
  if (await getCurrentUser()) redirect(next);

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-linear-to-br from-hero-dark via-primary-strong to-primary p-12 text-white lg:flex lg:flex-col">
        <Logo light />
        <div className="relative z-10 my-auto max-w-md space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            <T en={`Your ${site.stateAdj} exam preparation, in one place`} pa="ਤੁਹਾਡੀ ਪੰਜਾਬ ਪ੍ਰੀਖਿਆ ਦੀ ਤਿਆਰੀ, ਇੱਕ ਥਾਂ ਉੱਤੇ" />
          </h2>
          <ul className="space-y-3 text-white/90">
            {[
              ["Real CBT exam interface", "ਅਸਲ CBT ਪ੍ਰੀਖਿਆ ਸਕਰੀਨ"],
              ["Hindi & English questions", "ਹਿੰਦੀ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਪ੍ਰਸ਼ਨ"],
              [`Your rank among ${site.logo.initials} aspirants`, "ਪੰਜਾਬ ਦੇ ਉਮੀਦਵਾਰਾਂ ਵਿੱਚ ਤੁਹਾਡਾ ਰੈਂਕ"],
              ["Detailed solutions & weak-topic analysis", "ਵਿਸਥਾਰ ਨਾਲ ਹੱਲ ਅਤੇ ਕਮਜ਼ੋਰ ਵਿਸ਼ਿਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ"],
            ].map(([en, pa]) => (
              <li key={en} className="flex items-center gap-2.5">
                <CheckCircle2 className="size-5 text-accent" /> <T en={en} pa={pa} />
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
            <h1 className="text-2xl font-bold">
              <T en="Login or sign up" pa="ਲੌਗ ਇਨ ਜਾਂ ਸਾਈਨ ਅੱਪ" />
            </h1>
            <p className="text-sm text-muted">
              <T
                en={`${emailLoginEnabled ? `${googleLoginEnabled ? "Continue with Google, or get" : "Get"} a 6-digit code by email.` : googleLoginEnabled ? "Continue with your Google account." : ""} New here? Your account is created automatically.`}
                pa={`${emailLoginEnabled ? `${googleLoginEnabled ? "Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ, ਜਾਂ" : ""} ਈਮੇਲ ਰਾਹੀਂ 6 ਅੰਕਾਂ ਦਾ ਕੋਡ ਲਓ।` : googleLoginEnabled ? "ਆਪਣੇ Google ਖਾਤੇ ਨਾਲ ਜਾਰੀ ਰੱਖੋ।" : ""} ਨਵੇਂ ਹੋ? ਤੁਹਾਡਾ ਖਾਤਾ ਆਪਣੇ ਆਪ ਬਣ ਜਾਂਦਾ ਹੈ।`}
              />
            </p>
          </div>
          {paidAsGuest && (
            <p role="status" className="rounded-xl border border-success bg-success-soft p-3 text-sm">
              <b>Payment received.</b> Log in or sign up now and your purchase is added to your account automatically. Use the
              email you paid with, if you can.
            </p>
          )}
          {googleFailed && (
            <p role="alert" className="rounded-xl border border-danger bg-danger-soft p-3 text-sm text-danger">
              <T en="Google sign-in did not complete. Please try again, or use an email code." pa="Google ਲੌਗ ਇਨ ਪੂਰਾ ਨਹੀਂ ਹੋਇਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ, ਜਾਂ ਈਮੇਲ ਕੋਡ ਵਰਤੋ।" />
            </p>
          )}
          {googleLoginEnabled || emailLoginEnabled || phoneLoginEnabled ? (
            <>
              <LoginForm next={next} googleEnabled={googleLoginEnabled} emailEnabled={emailLoginEnabled} phoneEnabled={phoneLoginEnabled} />
              <p className="-mt-4 text-center text-xs leading-relaxed text-muted">
                <T en="By continuing, you agree to our" pa="ਜਾਰੀ ਰੱਖ ਕੇ, ਤੁਸੀਂ ਸਾਡੀਆਂ" />{" "}
                <Link href="/terms" className="font-medium text-foreground underline underline-offset-2 hover:text-primary">
                  <T en="Terms of use" pa="ਵਰਤੋਂ ਦੀਆਂ ਸ਼ਰਤਾਂ" />
                </Link>{" "}
                <T en="and" pa="ਅਤੇ" />{" "}
                <Link href="/privacy" className="font-medium text-foreground underline underline-offset-2 hover:text-primary">
                  <T en="Privacy policy" pa="ਪਰਦੇਦਾਰੀ ਨੀਤੀ" />
                </Link>
                <T en="." pa=" ਨਾਲ ਸਹਿਮਤ ਹੋ।" />
              </p>
            </>
          ) : (
            <p className="rounded-xl border border-accent bg-accent-soft p-4 text-sm">
              Login is being set up and will open shortly. Meanwhile, free mock tests work without an account.
            </p>
          )}
          <p className="text-center text-sm text-muted">
            <T en="Just want to try?" pa="ਸਿਰਫ਼ ਅਜ਼ਮਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?" />{" "}
            <Link href={freeMockHref(site)} className="font-semibold text-primary">
              <T en="Take a free mock without login" pa="ਬਿਨਾਂ ਲੌਗ ਇਨ ਮੁਫ਼ਤ ਮੌਕ ਦਿਓ" />
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
