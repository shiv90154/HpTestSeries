import Link from "next/link";
import { SignOutButton } from "@/app/dashboard/sign-out-button";
import { can, type Role } from "@/modules/identity/permissions";
import { Logo } from "./logo";

export function AppHeader({ user }: { user: { name: string; role: Role } }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4">
        <Logo href="/dashboard" />
        <nav className="hidden gap-5 text-sm font-medium text-muted md:flex">
          <Link href="/dashboard" className="text-primary">Dashboard</Link>
          <Link href="/tests" className="hover:text-primary">Mock Tests</Link>
          <Link href="/exams" className="hover:text-primary">Exams</Link>
          {can(user.role, "admin:access") && (
            <Link href="/admin" className="hover:text-primary">Admin</Link>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
          <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-white">
            {user.name.slice(0, 1).toUpperCase()}
          </span>
          <SignOutButton />
        </div>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-border/70 px-4 py-2 text-sm font-medium text-muted md:hidden">
        <Link href="/dashboard" className="text-primary">Dashboard</Link>
        <Link href="/tests" className="whitespace-nowrap">Mock Tests</Link>
        <Link href="/exams">Exams</Link>
        {can(user.role, "admin:access") && <Link href="/admin">Admin</Link>}
      </nav>
    </header>
  );
}
