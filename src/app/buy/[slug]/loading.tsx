import { SiteHeader } from "@/components/site-header";
import { Skeleton, SkeletonText } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-12" aria-busy="true" aria-label="Loading">
        <div className="space-y-6 rounded-2xl border border-border bg-surface p-6">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-10 w-1/3" />
          <SkeletonText lines={5} />
          <Skeleton className="h-13 w-full rounded-xl" />
        </div>
      </main>
    </>
  );
}
