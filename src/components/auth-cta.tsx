"use client";

import Link from "next/link";
import { authClient } from "@/modules/identity/auth-client";
import { btn } from "./ui";

/** Keeps public pages static: the session is checked in the browser, not during render. */
export function AuthCta() {
  const { data, isPending } = authClient.useSession();
  if (isPending) return <span className="h-11 w-20" />;
  return data ? (
    // Phones reach the dashboard from the Account tab of the bottom bar, which leaves room for the menu button.
    <span className="hidden sm:block">
      <Link href="/dashboard" className={btn("primary", "md")}>
        Dashboard
      </Link>
    </span>
  ) : (
    <Link href="/login" className={btn("primary", "md")}>
      Login
    </Link>
  );
}

/** Footer account link: login for visitors, dashboard for signed-in students. */
export function AuthFooterLink({ className }: { className?: string }) {
  const { data } = authClient.useSession();
  return data ? (
    <Link href="/dashboard" className={className}>
      My Dashboard
    </Link>
  ) : (
    <Link href="/login" className={className}>
      Login / Sign up
    </Link>
  );
}
