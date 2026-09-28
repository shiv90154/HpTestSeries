import type { Metadata } from "next";
import { Suspense } from "react";
import { SkeletonCard, SkeletonStatTile } from "@/components/skeleton";
import { requireUser } from "@/modules/identity/session";
import { DashboardData } from "./dashboard-data";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

function DashboardSkeleton() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-6 sm:py-8">
      <SkeletonCard className="h-40" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatTile key={i} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <SkeletonCard className="h-56" />
        <SkeletonCard className="h-56" />
      </div>
      <SkeletonCard className="h-40" />
    </main>
  );
}

export default async function DashboardPage() {
  const user = await requireUser("/dashboard");

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardData user={user} />
    </Suspense>
  );
}
