import { Skeleton, SkeletonText } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <div className="h-16 border-b border-border bg-surface" aria-hidden />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-6 sm:py-8" aria-busy="true" aria-label="Loading your profile">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <Skeleton className="mb-4 h-5 w-24" />
          <SkeletonText lines={3} />
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <Skeleton className="mb-4 h-5 w-28" />
          <div className="space-y-3">
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-32 rounded-xl" />
          </div>
        </div>
      </main>
    </>
  );
}
