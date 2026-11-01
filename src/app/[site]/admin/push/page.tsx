import type { Metadata } from "next";
import { connection } from "next/server";
import { requirePermission } from "@/modules/identity/session";
import { getPushPanel } from "@/modules/push/service";
import { Table } from "../table";
import { panel } from "../ui";
import { PushForm } from "./push-form";

export const metadata: Metadata = { title: "Notifications" };

const when = (d: Date) => d.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

export default async function PushAdminPage() {
  await requirePermission("commerce:manage");
  await connection();
  const p = await getPushPanel();

  const stats = [
    { label: "Devices", value: `${p.total}`, hint: "phones and browsers that allowed notifications" },
    { label: "Signed in", value: `${p.signedIn}`, hint: "tied to a student account (can get access reminders)" },
    { label: "Himachal", value: `${p.bySite.hp ?? 0}`, hint: "hptestseries.in" },
    { label: "Punjab / Rajasthan", value: `${p.bySite.pb ?? 0} / ${p.bySite.rj ?? 0}`, hint: "pbtestseries.in / rjtestseries.in" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold">Notifications</h1>
        <p className="text-sm text-muted">
          Push messages to phones and browsers. A reminder goes out by itself 3 days before a student&apos;s access ends. New devices appear here as students
          tap &ldquo;Allow notifications&rdquo;. Keep it for real news (a new test, an exam date): too many and people switch it off.
        </p>
      </div>

      {!p.configured && (
        <p role="alert" className="rounded-xl border border-danger bg-danger-soft p-4 text-sm text-danger">
          Push is not set up on this server. Add VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY to the server&apos;s environment (make them with
          <code className="mx-1">npx web-push generate-vapid-keys</code>) and redeploy. Until then the notification prompt is never shown to students.
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

      <PushForm exams={p.exams} />

      <Table
        caption="Recent notifications"
        rows={p.campaigns}
        rowKey={(c) => c.id}
        emptyMessage="Nothing sent yet."
        columns={[
          { header: "Sent", render: (c) => when(c.createdAt) },
          {
            header: "Notification",
            render: (c) => (
              <>
                <b className="font-medium">{c.title}</b>
                <span className="block text-xs text-muted">{c.body}</span>
              </>
            ),
          },
          { header: "Site", render: (c) => c.site ?? "all" },
          { header: "Devices", align: "right", render: (c) => c.targeted, cellClassName: "tabular-nums" },
          { header: "Delivered", align: "right", render: (c) => c.sent, cellClassName: "tabular-nums" },
          { header: "Failed", align: "right", render: (c) => c.failed, cellClassName: "tabular-nums text-muted" },
          { header: "Status", render: (c) => (c.finishedAt ? "Done" : "Sending…") },
        ]}
      />
    </div>
  );
}
