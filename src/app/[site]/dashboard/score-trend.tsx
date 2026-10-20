// Single-series bar chart of score % per attempt (oldest → newest).
// One hue, no legend (the heading names the series), hover/focus tooltip per bar, recessive grid.

type Point = { id: string; title: string; percent: number; score: number; maxScore: number; date: Date };

const fmtDate = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

export function ScoreTrend({ points }: { points: Point[] }) {
  if (points.length === 0) {
    return <p className="grid h-48 place-items-center text-sm text-muted">Your score trend will appear after your first test.</p>;
  }
  return (
    <figure>
      <div className="relative h-48">
        {[100, 50, 0].map((g) => (
          <div key={g} className="absolute inset-x-0 flex items-center gap-2" style={{ bottom: `${g}%` }} aria-hidden>
            <span className="w-8 -translate-y-1/2 text-right text-[10px] tabular-nums text-muted">{g}%</span>
            <span className="h-px flex-1 -translate-y-1/2 bg-border" />
          </div>
        ))}
        <div className="absolute inset-y-0 left-10 right-0 flex items-end gap-[2px]">
          {points.map((p) => (
            <div key={p.id} className="group relative flex h-full flex-1 items-end justify-center" tabIndex={0} aria-label={`${p.title}, ${fmtDate(p.date)}: ${p.percent}%`}>
              <div className="w-full max-w-7 rounded-t bg-primary transition-colors group-hover:bg-primary-strong group-focus:bg-primary-strong" style={{ height: `${Math.max(p.percent, 1.5)}%` }} />
              <div className="pointer-events-none absolute bottom-full z-10 mb-1 hidden w-max max-w-48 rounded-lg bg-foreground px-2.5 py-1.5 text-xs text-white shadow-lg group-hover:block group-focus:block">
                <p className="font-semibold">{p.percent}% · {p.score}/{p.maxScore}</p>
                <p className="truncate text-white/75">{p.title}</p>
                <p className="text-white/60">{fmtDate(p.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 flex justify-between pl-10 text-[10px] text-muted">
        <span>{fmtDate(points[0].date)}</span>
        <span>{fmtDate(points[points.length - 1].date)}</span>
      </figcaption>
    </figure>
  );
}
