"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { btn } from "@/components/ui";
import { isStandalone, promptInstall, startInstallCapture, useInstallOffer } from "./install-store";
import { currentSubscription, disablePush, enablePush, pushSupport } from "./push-client";
import { isInAppBrowser, isIosDevice } from "./rules";

// The "App and notifications" block on the profile page: the only place a student can turn notifications off again, or
// turn them on after saying "Not now" to the card.

type Push = "loading" | "on" | "off" | "blocked" | "needs-install" | "unsupported";

export function AppSettings() {
  const { canPrompt, installed } = useInstallOffer();
  const [push, setPush] = useState<Push>("loading");
  const [ios, setIos] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    startInstallCapture();
    const ua = navigator.userAgent;
    const onIos = isIosDevice(ua, navigator.maxTouchPoints) && !isInAppBrowser(ua);
    const stand = isStandalone();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- device facts are unavailable during server rendering
    setIos(onIos);
    setStandalone(stand);
    (async () => {
      const support = pushSupport({ ios: onIos, standalone: stand });
      if (support !== "ok") return setPush(support);
      if (Notification.permission === "denied") return setPush("blocked");
      setPush(Notification.permission === "granted" && (await currentSubscription()) ? "on" : "off");
    })().catch(() => setPush("unsupported"));
  }, []);

  async function toggle() {
    setBusy(true);
    if (push === "on") {
      await disablePush();
      setPush("off");
      toast.success("Notifications are off.");
    } else {
      const r = await enablePush();
      if (r === "enabled") {
        setPush("on");
        toast.success("Notifications are on.");
      } else if (r === "denied") {
        setPush("blocked");
      } else if (r !== "dismissed") {
        toast.error("Could not turn on notifications. Please try again later.");
      }
    }
    setBusy(false);
  }

  const note: Record<Push, string> = {
    loading: "",
    on: "On. We tell you about new mock tests and when your access is ending.",
    off: "Off. Turn on to hear about new mock tests and when your access is ending.",
    blocked: "Blocked in your browser. Allow notifications for this site in the browser's site settings, then come back.",
    "needs-install": "On iPhone, add this site to your Home Screen first (Share, then Add to Home Screen), then open it from there to turn on notifications.",
    unsupported: "This browser does not support notifications.",
  };

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-medium">Notifications on this device</p>
          <p className="text-muted">{note[push]}</p>
        </div>
        {(push === "on" || push === "off") && (
          <button type="button" className={btn(push === "on" ? "outline" : "primary", "md", "shrink-0")} onClick={toggle} disabled={busy}>
            {push === "on" ? "Turn off" : "Turn on"}
          </button>
        )}
      </div>

      {!standalone && !installed && (canPrompt || ios) && (
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="font-medium">Install the app</p>
            <p className="text-muted">{canPrompt ? "Open your tests from the home screen." : "Tap Share in Safari, then Add to Home Screen."}</p>
          </div>
          {canPrompt && (
            <button type="button" className={btn("outline", "md", "shrink-0")} onClick={() => void promptInstall()}>
              Install
            </button>
          )}
        </div>
      )}
    </div>
  );
}
