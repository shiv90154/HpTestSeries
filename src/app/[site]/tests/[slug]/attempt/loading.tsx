import { Skeleton, SkeletonText } from "@/components/skeleton";

// The whole paper loads in one request; on slow 4G this can take a few seconds.
export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col bg-white" aria-busy="true">
      <div className="h-12 bg-cbt-header" aria-hidden />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-6">
        <p className="text-center text-sm font-medium text-muted">Loading your test… / <span lang="hi">आपका टेस्ट लोड हो रहा है…</span></p>
        <Skeleton className="h-6 w-2/3" />
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
        <SkeletonText lines={6} />
      </main>
    </div>
  );
}
