import { Suspense } from "react";
import { SkeletonCard, SkeletonStatTile } from "@/components/skeleton";
import { OverviewData } from "./overview-data";
import { SiteFilter, siteParam } from "./site-filter";

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

export default async function AdminOverviewPage({ searchParams }: PageProps<"/[site]/admin">) {
  const site = siteParam(await searchParams);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Overview</h1>
        <p className="mt-1 text-sm text-muted">Live snapshot of content, learners, and revenue.</p>
      </div>

      <SiteFilter path="/admin" current={site} />

      <Suspense key={site ?? "all"} fallback={<AdminOverviewSkeleton />}>
        <OverviewData site={site} />
      </Suspense>
    </div>
  );
}
