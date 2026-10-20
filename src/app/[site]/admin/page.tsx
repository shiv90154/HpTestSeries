import { Suspense } from "react";
import { SkeletonCard, SkeletonStatTile } from "@/components/skeleton";
import { OverviewData } from "./overview-data";

function AdminOverviewSkeleton() {
  return (
    <>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonStatTile key={i} />
        ))}
      </dl>
      <SkeletonCard className="mt-6" />
    </>
  );
}

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Overview</h1>
        <p className="mt-1 text-sm text-muted">Live snapshot of content, learners, and revenue.</p>
      </div>

      <Suspense fallback={<AdminOverviewSkeleton />}>
        <OverviewData />
      </Suspense>
    </div>
  );
}
