"use client";

import Link from "next/link";
import { authClient } from "@/modules/identity/auth-client";
import { btn } from "./ui";

/** Keeps public pages static: the session is checked in the browser, not during render. */
export function AuthCta() {
  const { data, isPending } = authClient.useSession();
  if (isPending) return <span className="h-9 w-24" />;
  return data ? (
    <Link href="/dashboard" className={btn("primary", "sm")}>
      Dashboard
    </Link>
  ) : (
    <Link href="/login" className={btn("primary", "sm")}>
      Login
    </Link>
  );
}
