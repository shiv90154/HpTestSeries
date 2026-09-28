import Link from "next/link";
import { SignOutButton } from "@/app/dashboard/sign-out-button";
import { can, type Role } from "@/modules/identity/permissions";
import { BottomNav } from "./bottom-nav";
import { Logo } from "./logo";

export function AppHeader({ user }: { user: { name: string; role: Role } }) {
  const isAdmin = can(user.role, "admin:access");
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4">
          <Logo href="/dashboard" />
          <nav className="hidden gap-5 text-sm font-medium text-muted md:flex">
            <Link href="/dashboard" className="text-primary">Dashboard</Link>
            <Link href="/tests" className="hover:text-primary">Mock Tests</Link>
            <Link href="/exams" className="hover:text-primary">Exams</Link>
            {isAdmin && <Link href="/admin" className="hover:text-primary">Admin</Link>}
          </nav>
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
      {/* Spacer so page content doesn't sit under the fixed bottom bar */}
      <div className="h-14 shrink-0 md:hidden" aria-hidden />
    </>
  );
}
