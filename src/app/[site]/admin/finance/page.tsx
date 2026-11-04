import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { rupees } from "@/lib/money";
import { PARTNER_NAME } from "@/modules/commerce/finance-input";
import { getFinance, type FinanceRange } from "@/modules/commerce/finance-service";
import { requirePermission } from "@/modules/identity/session";
import { Table } from "../table";
import { panel } from "../ui";
import { DeleteEntryButton } from "./delete-button";
import { FinanceEntryForm } from "./entry-form";

export const metadata: Metadata = { title: "Finance" };

const RANGES: { value: FinanceRange; label: string }[] = [
  { value: "month", label: "This month" },
  { value: "last", label: "Last month" },
  { value: "all", label: "All time" },
];

const fmtDate = (d: Date) => d.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" });

export default async function FinancePage({ searchParams }: PageProps<"/[site]/admin/finance">) {
  await requirePermission("commerce:manage");
  await connection();
  const sp = await searchParams;
  const range: FinanceRange = sp.range === "month" || sp.range === "last" ? sp.range : "all";
  const { summary, rows, orders } = await getFinance(range);

  const stats = [
    { label: "Revenue (kamai)", value: rupees(summary.revenuePaise), hint: `${orders} paid orders`, tone: "text-success" },
    { label: "Total kharcha", value: rupees(summary.expensesPaise), hint: "servers, Claude Code, ads…", tone: "text-danger" },
    { label: "Profit", value: rupees(summary.profitPaise), hint: "revenue − kharcha", tone: summary.profitPaise < 0 ? "text-danger" : "text-foreground" },
    { label: "Business ke paas cash", value: rupees(summary.cashInHandPaise), hint: "abhi bacha hua paisa", tone: "text-foreground" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Finance</h1>
        <p className="mt-1 text-sm text-muted">
          Kitni kamai hui, kitna kharcha hua, aur Shiv / Nikhil ne kitna paisa liya. Profit 50-50 baanta jata hai.
        </p>
      </div>

      <nav aria-label="Period" className="flex flex-wrap gap-2">
        {RANGES.map((r) => (
          <Link
            key={r.value}
            href={r.value === "all" ? "/admin/finance" : `/admin/finance?range=${r.value}`}
            aria-current={r.value === range ? "page" : undefined}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
              r.value === range ? "border-primary bg-primary-soft text-primary" : "border-border bg-surface hover:border-primary hover:text-primary"
            }`}
          >
            {r.label}
          </Link>
        ))}
      </nav>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className={`mt-1 text-2xl font-semibold tabular-nums ${s.tone}`}>{s.value}</dd>
            <div className="mt-0.5 text-xs text-muted">{s.hint}</div>
          </div>
        ))}
      </dl>

      <section aria-label="Partners" className="grid gap-3 md:grid-cols-2">
        {summary.partners.map((p) => (
          <div key={p.partner} className={`${panel} space-y-3`}>
            <h2 className="font-semibold">{PARTNER_NAME[p.partner]}</h2>
            <dl className="space-y-1.5 text-sm">
              <Line label="Profit ka hissa (50%)" value={rupees(p.sharePaise)} />
              {p.paidForBusinessPaise > 0 && <Line label="+ Apni jeb se kharcha diya" value={rupees(p.paidForBusinessPaise)} />}
              <Line label="− Ab tak paisa liya" value={rupees(p.takenPaise)} />
            </dl>
            <div className="flex items-baseline justify-between border-t border-border pt-3">
              <span className="text-sm font-medium">{p.owedPaise >= 0 ? "Abhi lena baaki" : "Zyada le liya"}</span>
              <span className={`text-xl font-semibold tabular-nums ${p.owedPaise < 0 ? "text-danger" : "text-success"}`}>{rupees(Math.abs(p.owedPaise))}</span>
            </div>
          </div>
        ))}
      </section>
      {range !== "all" && (
        <p className="text-xs text-muted">Ye sirf chune hue mahine ka hisaab hai. Poora baaki hisaab dekhne ke liye &ldquo;All time&rdquo; chuno.</p>
      )}

      <FinanceEntryForm />

      <section className="space-y-2">
        <h2 className="font-semibold">Entries</h2>
        <Table
          caption="Expenses and withdrawals"
          rows={rows}
          rowKey={(r) => r.id}
          emptyMessage="Koi entry nahi hai. Upar se kharcha ya withdrawal add karo."
          columns={[
            { header: "Date", render: (r) => fmtDate(r.entryDate), cellClassName: "whitespace-nowrap text-muted" },
            {
              header: "Type",
              render: (r) =>
                r.kind === "EXPENSE" ? (
                  <span className="rounded-md bg-danger-soft px-2 py-0.5 text-xs font-semibold text-danger">Kharcha</span>
                ) : (
                  <span className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-ink">Withdrawal</span>
                ),
            },
            {
              header: "Detail",
              render: (r) => (
                <div>
                  <div className="font-medium">{r.title}</div>
                  {r.note && <div className="text-xs text-muted">{r.note}</div>}
                </div>
              ),
            },
            { header: "Category", render: (r) => r.category ?? "—", cellClassName: "text-muted" },
            {
              header: "Partner",
              render: (r) => (r.partner ? `${PARTNER_NAME[r.partner]}${r.kind === "EXPENSE" ? " (apni jeb se)" : ""}` : "Business"),
              cellClassName: "text-muted",
            },
            { header: "Amount", align: "right", render: (r) => rupees(r.amountPaise), cellClassName: "tabular-nums font-medium" },
            { header: "", render: (r) => <DeleteEntryButton id={r.id} title={r.title} /> },
          ]}
        />
      </section>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
