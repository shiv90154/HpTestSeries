"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { btn } from "@/components/ui";
import { BODY_MAX, TITLE_MAX } from "@/modules/push/rules";
import { ErrorList, input as inputCls, label as labelCls, panel } from "../ui";
import { countPushDevicesAction, sendPushTestAction, startPushCampaignAction } from "./actions";

type Draft = { title: string; body: string; url: string; site: string; examId: string };
const empty: Draft = { title: "", body: "", url: "/tests", site: "all", examId: "" };

export function PushForm({ exams }: { exams: { id: string; name: string }[] }) {
  const router = useRouter();
  const [m, setM] = useState<Draft>(empty);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [devices, setDevices] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setM((p) => ({ ...p, [k]: v }));
    setConfirming(false);
  };

  useEffect(() => {
    let live = true;
    countPushDevicesAction(m.site, m.examId || null).then((n) => {
      if (live) setDevices(n);
    });
    return () => {
      live = false;
    };
  }, [m.site, m.examId]);

  const test = () =>
    startTransition(async () => {
      setErrors([]);
      setNotice("");
      const r = await sendPushTestAction(m);
      if (!r.ok) return setErrors(r.errors);
      setNotice(`Test sent to ${r.sent} of your ${r.devices} device${r.devices === 1 ? "" : "s"}.`);
    });

  const send = () =>
    startTransition(async () => {
      setErrors([]);
      setNotice("");
      const r = await startPushCampaignAction(m);
      setConfirming(false);
      if (!r.ok) return setErrors(r.errors);
      setNotice(`Sending to ${r.targeted} device${r.targeted === 1 ? "" : "s"}. Refresh in a minute to see the count.`);
      setM(empty);
      router.refresh();
    });

  return (
    <section className={`${panel} space-y-4`} aria-label="New notification">
      <h2 className="font-semibold">Send a notification</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div>
            <label className={labelCls} htmlFor="push-title">
              Title ({m.title.length}/{TITLE_MAX})
            </label>
            <input id="push-title" className={inputCls} value={m.title} maxLength={TITLE_MAX} onChange={(e) => set("title", e.target.value)} placeholder="New: HP Police Mock 4 is live" />
          </div>
          <div>
            <label className={labelCls} htmlFor="push-body">
              Message ({m.body.length}/{BODY_MAX})
            </label>
            <textarea id="push-body" className={inputCls} rows={3} value={m.body} maxLength={BODY_MAX} onChange={(e) => set("body", e.target.value)} placeholder="Full-length test on the real pattern. Attempt it free today." />
          </div>
          <div>
            <label className={labelCls} htmlFor="push-url">
              Opens this page (a path on the site)
            </label>
            <input id="push-url" className={inputCls} value={m.url} onChange={(e) => set("url", e.target.value)} placeholder="/tests/hp-police-full-mock-4" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="push-site">
                Site
              </label>
              <select id="push-site" className={inputCls} value={m.site} onChange={(e) => set("site", e.target.value)}>
                <option value="all">All sites</option>
                <option value="hp">Himachal (hptestseries.in)</option>
                <option value="pb">Punjab (pbtestseries.in)</option>
                <option value="rj">Rajasthan (rjtestseries.in)</option>
                <option value="hr">Haryana (hrtestseries.in)</option>
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="push-exam">
                Students of
              </label>
              <select id="push-exam" className={inputCls} value={m.examId} onChange={(e) => set("examId", e.target.value)}>
                <option value="">Everyone who allowed notifications</option>
                {exams.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className={labelCls}>How it looks on a phone</p>
          <div className="rounded-2xl border border-border bg-surface-muted p-3 text-sm">
            <p className="font-semibold">{m.title || "Title"}</p>
            <p className="text-muted">{m.body || "Your message appears here."}</p>
          </div>
        </div>
      </div>

      <ErrorList errors={errors} />
      {notice && (
        <p role="status" className="text-sm text-success">
          {notice}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={btn("outline")} onClick={test} disabled={pending}>
          Send a test to my devices
        </button>
        {!confirming ? (
          <button type="button" className={btn("primary")} onClick={() => setConfirming(true)} disabled={pending || !m.title || !m.body || !devices}>
            Send to {devices ?? "…"} device{devices === 1 ? "" : "s"}
          </button>
        ) : (
          <>
            <button type="button" className={btn("accent")} onClick={send} disabled={pending}>
              {pending ? "Sending…" : `Yes, send to ${devices} now`}
            </button>
            <button type="button" className={btn("ghost")} onClick={() => setConfirming(false)}>
              Cancel
            </button>
          </>
        )}
      </div>
    </section>
  );
}
