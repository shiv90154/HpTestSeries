import { Skeleton, SkeletonCard, SkeletonStatTile } from "@/components/skeleton";

// Grading + rank queries take a moment; show the result layout instead of a frozen screen.
// Kept off public SEO pages on purpose: streaming turns their 404s into soft 404s (HTTP 200).
export default function Loading() {
  return (
    <>
      <div className="h-16 border-b border-border bg-surface" aria-hidden />
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:py-10" aria-busy="true" aria-label="Loading your result">
        <Skeleton className="h-52 rounded-3xl" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonStatTile key={i} />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <SkeletonCard className="h-56" />
          <SkeletonCard className="h-56" />
        </div>
      </div>
    </>
  );
}
