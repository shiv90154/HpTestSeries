// Composable loading placeholders built on the surface-muted token + Tailwind's animate-pulse.

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-surface-muted ${className}`} />;
}

export function SkeletonText({ lines = 1, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3.5 ${i === lines - 1 && lines > 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-surface p-4 ${className}`}>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="mt-3 h-6 w-1/2" />
    </div>
  );
}

export function SkeletonStatTile() {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <Skeleton className="h-3.5 w-2/3" />
      <Skeleton className="mt-3 h-7 w-1/2" />
    </div>
  );
}

export function SkeletonTableRow({ cols = 4 }: { cols?: number }) {
  return (
    <tr className="border-t border-border">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonListRow() {
  return (
    <li className="flex gap-3 p-4">
      <Skeleton className="h-4 w-4 shrink-0 rounded" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </li>
  );
}
