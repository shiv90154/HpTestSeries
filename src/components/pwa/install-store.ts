import { useSyncExternalStore } from "react";

// Holds the browser's "install this app" offer (the beforeinstallprompt event) so the install card, the profile page and
// the footer can all use it. Chrome and Edge on Android and desktop send it; Safari and Firefox do not (iOS: see rules.ts).

type InstallEvent = Event & { prompt(): Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };

let offer: InstallEvent | null = null;
let installed = false;
let started = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const INSTALLED_KEY = "pwa:installed";

/** Starts listening. Safe to call many times; call it as early as possible, the event fires soon after load. */
export function startInstallCapture(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  try {
    installed = localStorage.getItem(INSTALLED_KEY) === "1";
  } catch {
    /* private mode */
  }
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // we show our own card instead of the browser's small bar
    offer = e as InstallEvent;
    emit();
  });
  window.addEventListener("appinstalled", () => {
    offer = null;
    installed = true;
    try {
      localStorage.setItem(INSTALLED_KEY, "1");
    } catch {
      /* private mode */
    }
    emit();
  });
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** True when the app is open as an installed app rather than a browser tab. */
export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
}

/** Shows the browser's install dialog. Must be called from a tap. */
export async function promptInstall(): Promise<"accepted" | "dismissed" | "unavailable"> {
  const current = offer;
  if (!current) return "unavailable";
  offer = null; // an offer can be used once
  emit();
  try {
    await current.prompt();
    return (await current.userChoice).outcome;
  } catch {
    return "unavailable";
  }
}

/** { canPrompt: the browser has an install offer ready, installed: this device already installed the app }. */
export function useInstallOffer(): { canPrompt: boolean; installed: boolean } {
  const canPrompt = useSyncExternalStore(subscribe, () => offer !== null, () => false);
  const done = useSyncExternalStore(subscribe, () => installed, () => false);
  return { canPrompt, installed: done };
}
