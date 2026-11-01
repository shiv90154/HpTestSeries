"use client";

import { BellRing, Download, RefreshCw, Share, SquarePlus, X, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { btn } from "@/components/ui";
import { useSite, useSitePathname } from "@/sites/provider";
import { isStandalone, promptInstall, startInstallCapture, useInstallOffer } from "./install-store";
import { currentSubscription, enablePush, pushSupport, syncPush } from "./push-client";
import { hideFor, isInAppBrowser, isIosDevice, nextPrompt, type PromptKind } from "./rules";

// Everything "app-like" in one place, mounted once in the site layout:
//  - registers the service worker (production only: in development its file cache would hide your own edits)
//  - tells the student when a newer version of the site is live ("Update now"), never during a test
//  - offers to install the app (Chrome's install dialog, or the Add to Home Screen steps on iPhone)
//  - asks for notification permission after the student has used the site for a while
// Only one card shows at a time (nextPrompt decides which), and none over a test or a checkout.

const BUILD = process.env.NEXT_PUBLIC_APP_VERSION;
const IS_PROD = process.env.NODE_ENV === "production";
const CHECK_EVERY = 10 * 60 * 1000;
const SNOOZE_UPDATE = 30 * 60 * 1000;

type Hidden = { until: number; count: number };

function readHidden(key: string): Hidden {
  try {
    const v = JSON.parse(localStorage.getItem(key) ?? "null") as Hidden | null;
    if (v && typeof v.until === "number" && typeof v.count === "number") return v;
  } catch {
    /* unreadable: treat as never hidden */
  }
  return { until: 0, count: 0 };
}

function writeHidden(key: string, value: Hidden) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode: the card may return next visit, which is acceptable */
  }
}

function countView(): number {
  try {
    const n = (Number(localStorage.getItem("pwa:views")) || 0) + 1;
    localStorage.setItem("pwa:views", String(n));
    return n;
  } catch {
    return 0;
  }
}

export function PwaManager() {
  const site = useSite();
  const path = useSitePathname();
  const { canPrompt: browserCanInstall, installed } = useInstallOffer();

  const [updateReady, setUpdateReady] = useState(false);
  const [snoozedUntil, setSnoozedUntil] = useState(0);
  const [views, setViews] = useState(0);
  const [warm, setWarm] = useState(false);
  const [now, setNow] = useState(0);
  const [ios, setIos] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [pushAsk, setPushAsk] = useState(false);
  const [installHidden, setInstallHidden] = useState<Hidden>({ until: 0, count: 0 });
  const [pushHidden, setPushHidden] = useState<Hidden>({ until: 0, count: 0 });
  const [busy, setBusy] = useState(false);
  const lastCheck = useRef(0);

  // One-time setup: device facts, saved choices, the service worker.
  useEffect(() => {
    startInstallCapture();
    const ua = navigator.userAgent;
    const onIos = isIosDevice(ua, navigator.maxTouchPoints) && !isInAppBrowser(ua);
    const stand = isStandalone();
    /* eslint-disable react-hooks/set-state-in-effect -- one-time read of device facts and saved choices, unavailable during server rendering */
    setIos(onIos);
    setStandalone(stand);
    setInstallHidden(readHidden("pwa:install"));
    setPushHidden(readHidden("pwa:push"));
    setNow(Date.now());
    /* eslint-enable react-hooks/set-state-in-effect */
    const t = setTimeout(() => setWarm(true), 15000);
    const clock = setInterval(() => setNow(Date.now()), 60_000); // lets a finished snooze or "not now" lapse without a click

    // Notifications can be asked for when supported, undecided, not yet subscribed, and the server has keys.
    (async () => {
      if (pushSupport({ ios: onIos, standalone: stand }) !== "ok") return;
      if (Notification.permission === "granted") return void (await syncPush());
      if (Notification.permission !== "default") return;
      if (await currentSubscription()) return;
      const res = await fetch("/api/push/key").catch(() => null);
      if (res?.ok) setPushAsk(true);
    })().catch(() => undefined);

    if (IS_PROD && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => undefined);
    }
    return () => {
      clearTimeout(t);
      clearInterval(clock);
    };
  }, []);

  // Count each page view (it decides when the install and notification cards are worth showing).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the counter lives in localStorage
    setViews(countView());
  }, [path]);

  // Is a newer version live? Asked shortly after load, every 10 minutes, and when the student comes back to the tab.
  const checkVersion = useCallback(async () => {
    if (!IS_PROD || !BUILD || Date.now() - lastCheck.current < 60_000) return;
    lastCheck.current = Date.now();
    try {
      const reg = await navigator.serviceWorker?.getRegistration();
      reg?.update().catch(() => undefined);
      const res = await fetch("/api/version", { cache: "no-store" });
      if (!res.ok) return;
      const { version } = (await res.json()) as { version?: string | null };
      if (version && version !== BUILD) setUpdateReady(true);
    } catch {
      /* offline or server restarting: ask again next time */
    }
  }, []);

  useEffect(() => {
    const first = setTimeout(checkVersion, 5000);
    const every = setInterval(checkVersion, CHECK_EVERY);
    const onVisible = () => document.visibilityState === "visible" && checkVersion();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", checkVersion);
    return () => {
      clearTimeout(first);
      clearInterval(every);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", checkVersion);
    };
  }, [checkVersion]);

  const canInstall = !standalone && !installed && (browserCanInstall || ios);
  const kind = nextPrompt({
    path,
    updateReady,
    updateSnoozedUntil: snoozedUntil,
    canInstall,
    canAskPush: pushAsk,
    installHiddenUntil: installHidden.until,
    pushHiddenUntil: pushHidden.until,
    views,
    secondsOnPage: warm ? 99 : 0,
    now,
  });

  const dismiss = (which: "install" | "push") => {
    const prev = which === "install" ? installHidden : pushHidden;
    const next = { count: prev.count + 1, until: Date.now() + hideFor(which, prev.count + 1) };
    writeHidden(`pwa:${which}`, next);
    (which === "install" ? setInstallHidden : setPushHidden)(next);
  };

  async function onInstall() {
    if (ios && !browserCanInstall) return dismiss("install"); // "Got it": the steps are on the card
    setBusy(true);
    const outcome = await promptInstall();
    setBusy(false);
    if (outcome === "dismissed") dismiss("install");
  }

  async function onAllowPush() {
    setBusy(true);
    const result = await enablePush();
    setBusy(false);
    setPushAsk(false);
    if (result === "enabled") toast.success("Notifications are on.");
    else if (result === "denied") toast.message("Notifications are blocked. You can allow them in your browser's site settings.");
    else if (result === "dismissed") dismiss("push");
    else toast.error("Could not turn on notifications. Please try again later.");
  }

  if (!kind) return null;
  return <PromptCard kind={kind} siteName={site.shortName} ios={ios && !browserCanInstall} busy={busy} onUpdate={() => window.location.reload()} onLater={() => setSnoozedUntil(Date.now() + SNOOZE_UPDATE)} onInstall={onInstall} onNotNow={() => dismiss(kind === "install" ? "install" : "push")} onAllow={onAllowPush} />;
}

function Shell({ icon: Icon, title, onClose, children }: { icon: LucideIcon; title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div
      role="region"
      aria-label={title}
      className="fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-50 rounded-2xl border border-border bg-surface p-4 shadow-xl md:inset-x-auto md:bottom-4 md:right-4 md:w-96"
    >
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-2 top-2 grid size-8 place-items-center rounded-lg text-muted hover:bg-surface-muted">
        <X className="size-4" />
      </button>
      <div className="flex gap-3 pr-6">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0 flex-1 space-y-3">{children}</div>
      </div>
    </div>
  );
}

function PromptCard(p: {
  kind: PromptKind;
  siteName: string;
  ios: boolean;
  busy: boolean;
  onUpdate: () => void;
  onLater: () => void;
  onInstall: () => void;
  onNotNow: () => void;
  onAllow: () => void;
}) {
  if (p.kind === "update") {
    return (
      <Shell icon={RefreshCw} title="Update available" onClose={p.onLater}>
        <div>
          <p className="font-semibold">A new version is available</p>
          <p className="text-sm text-muted">Update now to get the latest tests and fixes. It takes a second.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className={btn("primary", "sm")} onClick={p.onUpdate}>
            Update now
          </button>
          <button type="button" className={btn("ghost", "sm")} onClick={p.onLater}>
            Later
          </button>
        </div>
      </Shell>
    );
  }
  if (p.kind === "install") {
    return (
      <Shell icon={Download} title="Install app" onClose={p.onNotNow}>
        <div>
          <p className="font-semibold">Install {p.siteName}</p>
          <p className="text-sm text-muted">Open your tests straight from the home screen, with no browser bar.</p>
        </div>
        {p.ios && (
          <ol className="space-y-1.5 text-sm">
            <li className="flex items-center gap-2">
              1. Tap <Share className="size-4 text-primary" aria-label="Share" /> at the bottom of Safari
            </li>
            <li className="flex items-center gap-2">
              2. Choose <b className="font-medium">Add to Home Screen</b> <SquarePlus className="size-4 text-primary" aria-hidden />
            </li>
          </ol>
        )}
        <div className="flex gap-2">
          <button type="button" className={btn("primary", "sm")} onClick={p.onInstall} disabled={p.busy}>
            {p.ios ? "Got it" : "Install app"}
          </button>
          {!p.ios && (
            <button type="button" className={btn("ghost", "sm")} onClick={p.onNotNow}>
              Not now
            </button>
          )}
        </div>
      </Shell>
    );
  }
  return (
    <Shell icon={BellRing} title="Notifications" onClose={p.onNotNow}>
      <div>
        <p className="font-semibold">Get exam alerts</p>
        <p className="text-sm text-muted">New mock tests, exam dates, and a reminder before your access ends. You can turn them off any time.</p>
      </div>
      <div className="flex gap-2">
        <button type="button" className={btn("primary", "sm")} onClick={p.onAllow} disabled={p.busy}>
          Allow notifications
        </button>
        <button type="button" className={btn("ghost", "sm")} onClick={p.onNotNow}>
          Not now
        </button>
      </div>
    </Shell>
  );
}
