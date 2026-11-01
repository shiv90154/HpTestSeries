// Pure rules for the app prompts (update, install, notifications). No browser APIs here, so they can be unit-tested.

const DAY = 24 * 60 * 60 * 1000;

/** The timed test screens. Nothing may pop up over a student who is answering questions. */
export const isTestScreen = (path: string) => /^\/tests\/[^/]+\/(attempt|demo)(\/|$)/.test(path);

/** Pages where an install or notification card would be in the way: checkout, login steps and staff screens. */
export const isQuietPage = (path: string) => /^\/(login|verify-2fa|welcome|buy|claim|admin|offline)(\/|$)/.test(path);

export type PromptKind = "update" | "install" | "push";

export type PromptState = {
  path: string;
  /** A newer version of the site is live than the one this page loaded. */
  updateReady: boolean;
  /** The student chose "Later" on the update card, until this time (ms since epoch). */
  updateSnoozedUntil: number;
  /** The install card can be shown: the browser offered an install, or this is iOS Safari where we explain how. */
  canInstall: boolean;
  /** Notifications can be asked for: supported, permission not yet decided, and not already subscribed. */
  canAskPush: boolean;
  installHiddenUntil: number;
  pushHiddenUntil: number;
  /** Pages viewed on this device, over all visits. */
  views: number;
  /** Seconds since the page opened. */
  secondsOnPage: number;
  now: number;
};

/** An update prompt beats install, which beats notifications; at most one card is ever shown. */
export function nextPrompt(s: PromptState): PromptKind | null {
  if (isTestScreen(s.path)) return null;
  if (s.updateReady && s.now >= s.updateSnoozedUntil) return "update";
  if (isQuietPage(s.path)) return null;
  // Let the student look around first: a card in the first seconds of a first visit just gets dismissed.
  if (s.secondsOnPage < 15 || s.views < 3) return null;
  if (s.canInstall && s.now >= s.installHiddenUntil) return "install";
  if (s.canAskPush && s.views >= 5 && s.now >= s.pushHiddenUntil) return "push";
  return null;
}

/** How long a card stays hidden after the student closes it. A second "no" in a row waits four times as long. */
export function hideFor(kind: "install" | "push", dismissals: number): number {
  const base = kind === "install" ? 14 * DAY : 7 * DAY;
  return dismissals >= 2 ? base * 4 : base;
}

/** iPhone and iPad (iPadOS reports itself as a Mac with a touch screen). */
export function isIosDevice(ua: string, maxTouchPoints: number): boolean {
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && maxTouchPoints > 1);
}

/** In-app browsers (Facebook, Instagram, Telegram...) cannot install anything, so we do not nag there. */
export function isInAppBrowser(ua: string): boolean {
  return /FBAN|FBAV|Instagram|Line\/|Telegram|WhatsApp|; wv\)/i.test(ua);
}

/** Base64url public key from the server → the bytes pushManager.subscribe needs. */
export function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
