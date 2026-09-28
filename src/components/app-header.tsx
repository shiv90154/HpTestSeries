import Link from "next/link";
import { SignOutButton } from "@/app/dashboard/sign-out-button";
import { can, type Role } from "@/modules/identity/permissions";
import { AppDesktopNav, BottomNav } from "./bottom-nav";
import { Logo } from "./logo";

export function AppHeader({ user }: { user: { name: string; role: Role } }) {
  const isAdmin = can(user.role, "admin:access");
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4">
          <Logo href="/dashboard" />
          <AppDesktopNav showAdmin={isAdmin} />
          <div className="ml-auto flex items-center gap-3">
            <Link href="/profile" className="flex items-center gap-2 rounded-full hover:opacity-80" aria-label="My profile">
              <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
              <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-white">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <BottomNav showAdmin={isAdmin} />
      {/* Spacer so the end of the page doesn't sit under the fixed bottom bar. The root layout's body is a
          flex column, so order-last moves it below <main> even though it is rendered up here. */}
      <div className="order-last h-[calc(4rem+env(safe-area-inset-bottom))] shrink-0 md:hidden" aria-hidden />
    </>
  );
}
