import { db } from "@/lib/db";

const DAYS = 30;
const DAY_MS = 86_400_000;

function dayKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function bucketByDay(rows: { at: Date | null; value: number }[], days: Date[]) {
  const totals = new Map(days.map((d) => [dayKey(d), 0]));
  for (const r of rows) {
    if (!r.at) continue;
    const k = dayKey(r.at);
    if (totals.has(k)) totals.set(k, (totals.get(k) ?? 0) + r.value);
  }
  return days.map((d) => totals.get(dayKey(d)) ?? 0);
}

const dayLabel = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

function BarChart({
  title,
  total,
  days,
  values,
  format,
}: {
  title: string;
  total: string;
  days: Date[];
  values: number[];
  format: (n: number) => string;
}) {
  const W = 600;
  const TOP = 22; // headroom so value labels never touch the card edge
  const H = 140;
  const max = Math.max(...values, 1);
  const slot = W / values.length;
  const barW = slot * 0.7;
  const summary = `${title}, last ${DAYS} days: ${total}`;
  const bestIdx = values.indexOf(Math.max(...values));
  const hasData = values.some((v) => v > 0);
  // Label every bar only while the chart is sparse; otherwise it turns to noise.
  const labelAll = values.filter((v) => v > 0).length <= 10;
  const ticks = [0, 7, 14, 21, values.length - 1];

  return (
    <figure className="rounded-xl border border-border bg-surface p-4">
      <figcaption className="mb-3 flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-muted">{title}</span>
        <span className="text-xs text-muted">
          Total (30 days) <b className="text-base font-semibold tabular-nums text-foreground">{total}</b>
        </span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${TOP + H + 22}`} role="img" aria-label={summary} className="h-auto w-full">
        <line x1={0} x2={W} y1={TOP} y2={TOP} stroke="var(--border)" strokeDasharray="3 4" />
        <line x1={0} x2={W} y1={TOP + H / 2} y2={TOP + H / 2} stroke="var(--border)" strokeDasharray="3 4" />
        <line x1={0} x2={W} y1={TOP + H} y2={TOP + H} stroke="var(--border)" />
        {values.map((v, i) => {
          const h = v === 0 ? 0 : Math.max((v / max) * H, 2);
          const cx = i * slot + slot / 2;
          return (
            <g key={i}>
              <rect
                x={cx - barW / 2}
                y={TOP + H - h}
                width={barW}
                height={h}
                rx={2}
                fill="var(--primary)"
              >
                <title>{`${dayLabel(days[i])}: ${format(v)}`}</title>
              </rect>
              {v > 0 && (labelAll || i === bestIdx) && (
                <text
                  x={Math.min(Math.max(cx, 24), W - 24)}
                  y={TOP + H - h - 5}
                  fontSize={12}
                  fontWeight={600}
                  textAnchor="middle"
                  fill="var(--foreground)"
                >
                  {format(v)}
                </text>
              )}
            </g>
          );
        })}
        {ticks.map((i) => (
          <text
            key={i}
            x={i * slot + slot / 2}
            y={TOP + H + 16}
            fontSize={11}
            fill="var(--muted)"
            textAnchor={i === 0 ? "start" : i === values.length - 1 ? "end" : "middle"}
          >
            {dayLabel(days[i])}
          </text>
        ))}
        {!hasData && (
          <text x={W / 2} y={TOP + H / 2 + 4} fontSize={13} fill="var(--muted)" textAnchor="middle">
            No data in the last {DAYS} days
          </text>
        )}
      </svg>
      {hasData && (
        <p className="mt-1 text-xs text-muted">
          Best day: <b className="text-foreground">{dayLabel(days[bestIdx])}</b> · {format(values[bestIdx])}
        </p>
      )}
    </figure>
  );
}

export async function OverviewCharts() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: DAYS }, (_, i) => new Date(today.getTime() - (DAYS - 1 - i) * DAY_MS));
  const since = days[0];

  const [orders, attempts, signups, topGroups] = await Promise.all([
    db.order.findMany({ where: { status: "PAID", createdAt: { gte: since } }, select: { createdAt: true, amountPaise: true } }),
    db.attempt.findMany({ where: { status: "SUBMITTED", submittedAt: { gte: since } }, select: { submittedAt: true } }),
    db.user.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } }),
    db.attempt.groupBy({
      by: ["testId"],
      where: { status: "SUBMITTED", submittedAt: { gte: since } },
      _count: { _all: true },
      orderBy: { _count: { testId: "desc" } },
      take: 6,
    }),
  ]);

  const tests = await db.test.findMany({
    where: { id: { in: topGroups.map((g) => g.testId) } },
    select: { id: true, title: true },
  });
  const titleOf = new Map(tests.map((t) => [t.id, t.title]));
  const top = topGroups.map((g) => ({ title: titleOf.get(g.testId) ?? "Deleted test", count: g._count._all }));
  const topMax = Math.max(...top.map((t) => t.count), 1);

  const revenue = bucketByDay(orders.map((o) => ({ at: o.createdAt, value: o.amountPaise / 100 })), days);
  const attemptSeries = bucketByDay(attempts.map((a) => ({ at: a.submittedAt, value: 1 })), days);
  const signupSeries = bucketByDay(signups.map((u) => ({ at: u.createdAt, value: 1 })), days);
  const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  const num = (n: number) => n.toLocaleString("en-IN");

  return (
    <section aria-label="Analytics" className="space-y-3">
      <div className="grid gap-3 lg:grid-cols-2">
        <BarChart title="Revenue per day" total={inr(sum(revenue))} days={days} values={revenue} format={inr} />
        <BarChart title="Tests submitted per day" total={num(sum(attemptSeries))} days={days} values={attemptSeries} format={num} />
        <BarChart title="New signups per day" total={num(sum(signupSeries))} days={days} values={signupSeries} format={num} />

        <div className="rounded-xl border border-border bg-surface p-4">
          <h2 className="mb-3 flex items-baseline justify-between gap-2 text-sm font-semibold text-muted">
            <span>Most attempted tests</span>
            <span className="text-xs font-normal">Last {DAYS} days</span>
          </h2>
          {top.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">No submitted attempts yet.</p>
          ) : (
            <ol className="space-y-3">
              {top.map((t, i) => (
                <li key={i}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="truncate">{t.title}</span>
                    <span className="shrink-0 font-semibold tabular-nums">{num(t.count)}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-primary-soft">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${(t.count / topMax) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
