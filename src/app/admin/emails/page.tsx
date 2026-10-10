import type { Metadata } from "next";
import { connection } from "next/server";
import { getEmailPanel } from "@/modules/email/service";
import { requirePermission } from "@/modules/identity/session";
import { Table } from "../table";
import { panel } from "../ui";
import { CampaignForm } from "./campaign-form";
import { SendNowButton } from "./send-now-button";

export const metadata: Metadata = { title: "Emails" };

const KIND_LABEL: Record<string, string> = {
  expiry: "Access ending (7 days before)",
  "free-followup": "Free test follow-up (next day)",
  campaign: "Your emails to students",
};

const STATUS_STYLE: Record<string, string> = {
  SENT: "bg-success-soft text-success",
  QUEUED: "bg-accent-soft text-accent-ink",
  FAILED: "bg-danger-soft text-danger",
  SKIPPED: "bg-surface-muted text-muted",
};

const when = (d: Date) => d.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

export default async function EmailsAdminPage() {
  await requirePermission("commerce:manage");
  await connection();
  const p = await getEmailPanel();

  const stats = [
    { label: "Opted in to offers", value: `${p.optedIn}`, hint: `of ${p.users} students with an email` },
    { label: "Get purchase reminders", value: `${p.reminders}`, hint: "on unless they switch it off" },
    { label: "Sent today", value: `${p.sentToday} / ${p.limit}`, hint: "daily limit, resets at midnight" },
    { label: "Waiting to send", value: `${p.queued}`, hint: "goes out at 7 pm" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold">Emails</h1>
        <p className="text-sm text-muted">
          Reminders go out automatically every day at 7 pm. Offer emails reach a student at most once every 3 days and 4 times a month, and every
          email has an unsubscribe link.
        </p>
      </div>

      {!p.configured && (
        <p role="alert" className="rounded-xl border border-danger bg-danger-soft p-4 text-sm text-danger">
          Email sending is not set up on this server (RESEND_API_KEY and EMAIL_FROM). Nothing will actually be sent until they are added.
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={panel}>
            <p className="text-xs font-medium text-muted">{s.label}</p>
            <p className="mt-1 text-2xl font-bold tabular-nums">{s.value}</p>
            <p className="text-xs text-muted">{s.hint}</p>
          </div>
        ))}
      </div>
      <SendNowButton queued={p.queued} />

      <Table
        caption="Automatic emails, last 30 days"
        rows={p.kinds}
        rowKey={(k) => k.kind}
        columns={[
          { header: "Automatic emails (last 30 days)", render: (k) => KIND_LABEL[k.kind] ?? k.kind },
          { header: "Sent", align: "right", render: (k) => k.sent, cellClassName: "tabular-nums" },
          { header: "Waiting", align: "right", render: (k) => k.queued, cellClassName: "tabular-nums" },
          { header: "Skipped", align: "right", render: (k) => k.skipped, cellClassName: "tabular-nums text-muted" },
          { header: "Failed", align: "right", render: (k) => k.failed, cellClassName: "tabular-nums" },
        ]}
      />

      <CampaignForm exams={p.exams} />

      <section className="space-y-2">
        <h2 className="font-semibold">Past emails to students</h2>
        <Table
          caption="Past emails to students"
          rows={p.campaigns}
          rowKey={(c) => c.id}
          emptyMessage="No emails sent to students yet."
          columns={[
            { header: "Subject", render: (c) => c.subject },
            { header: "To", render: (c) => c.audience, cellClassName: "text-muted" },
            { header: "Date", render: (c) => when(c.createdAt), cellClassName: "text-muted whitespace-nowrap" },
            { header: "Sent", align: "right", render: (c) => c.sent, cellClassName: "tabular-nums" },
            { header: "Waiting", align: "right", render: (c) => c.queued, cellClassName: "tabular-nums" },
            { header: "Skipped", align: "right", render: (c) => c.skipped + c.failed, cellClassName: "tabular-nums text-muted" },
          ]}
        />
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">Latest activity</h2>
        <Table
          caption="Latest email activity"
          rows={p.recent}
          rowKey={(r) => r.id}
          emptyMessage="No emails yet."
          columns={[
            { header: "Student", render: (r) => <span title={r.user.email}>{r.user.name}</span> },
            { header: "Email", render: (r) => KIND_LABEL[r.kind] ?? r.kind, cellClassName: "text-muted" },
            {
              header: "Status",
              render: (r) => (
                <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[r.status] ?? ""}`}>
                  {r.status.toLowerCase()}
                  {r.error ? ` · ${r.error}` : ""}
                </span>
              ),
            },
            { header: "When", render: (r) => when(r.sentAt ?? r.createdAt), cellClassName: "text-muted whitespace-nowrap" },
          ]}
        />
      </section>
    </div>
  );
}
