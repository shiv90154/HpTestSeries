import { describe, expect, it } from "vitest";
import { hideFor, isInAppBrowser, isIosDevice, isQuietPage, isTestScreen, nextPrompt, urlBase64ToUint8Array, type PromptState } from "./rules";

const DAY = 24 * 60 * 60 * 1000;
const base: PromptState = {
  path: "/tests",
  updateReady: false,
  updateSnoozedUntil: 0,
  canInstall: true,
  canAskPush: true,
  installHiddenUntil: 0,
  pushHiddenUntil: 0,
  views: 10,
  secondsOnPage: 60,
  now: 1_000_000,
};

describe("nextPrompt", () => {
  it("never shows anything on a timed test screen, not even an update", () => {
    expect(nextPrompt({ ...base, path: "/tests/hp-police-full-mock-1/attempt", updateReady: true })).toBeNull();
    expect(nextPrompt({ ...base, path: "/tests/free/demo", updateReady: true })).toBeNull();
  });
  it("shows an update first, anywhere else, even on a first visit", () => {
    expect(nextPrompt({ ...base, updateReady: true, views: 1, secondsOnPage: 1 })).toBe("update");
    expect(nextPrompt({ ...base, path: "/buy/x", updateReady: true })).toBe("update");
  });
  it("hides a snoozed update until the snooze ends", () => {
    const snoozed = { ...base, updateReady: true, updateSnoozedUntil: base.now + 1000, canInstall: false, canAskPush: false };
    expect(nextPrompt(snoozed)).toBeNull();
    expect(nextPrompt({ ...snoozed, now: base.now + 2000 })).toBe("update");
  });
  it("lets a new visitor look around before asking to install", () => {
    expect(nextPrompt({ ...base, views: 1 })).toBeNull();
    expect(nextPrompt({ ...base, secondsOnPage: 3 })).toBeNull();
    expect(nextPrompt({ ...base, views: 3 })).toBe("install");
  });
  it("asks for notifications only after install was handled and enough visits", () => {
    expect(nextPrompt({ ...base, installHiddenUntil: base.now + DAY })).toBe("push");
    expect(nextPrompt({ ...base, canInstall: false, views: 4 })).toBeNull();
    expect(nextPrompt({ ...base, canInstall: false, views: 5 })).toBe("push");
  });
  it("stays quiet at checkout, login and in admin", () => {
    for (const path of ["/buy/plan", "/login", "/verify-2fa", "/admin/push", "/welcome"]) expect(nextPrompt({ ...base, path })).toBeNull();
  });
  it("respects hidden-until times", () => {
    expect(nextPrompt({ ...base, installHiddenUntil: base.now + 1, pushHiddenUntil: base.now + 1 })).toBeNull();
  });
});

describe("page matching", () => {
  it("recognises test screens and quiet pages", () => {
    expect(isTestScreen("/tests/abc/attempt")).toBe(true);
    expect(isTestScreen("/tests/abc/result")).toBe(false);
    expect(isTestScreen("/tests/abc")).toBe(false);
    expect(isQuietPage("/buy/x")).toBe(true);
    expect(isQuietPage("/blog")).toBe(false);
  });
});

describe("hideFor", () => {
  it("waits longer after repeated refusals", () => {
    expect(hideFor("install", 1)).toBe(14 * DAY);
    expect(hideFor("install", 2)).toBe(56 * DAY);
    expect(hideFor("push", 1)).toBe(7 * DAY);
    expect(hideFor("push", 3)).toBe(28 * DAY);
  });
});

describe("device detection", () => {
  it("finds iPhones and iPads (including iPadOS posing as a Mac)", () => {
    expect(isIosDevice("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)", 5)).toBe(true);
    expect(isIosDevice("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", 5)).toBe(true);
    expect(isIosDevice("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", 0)).toBe(false);
    expect(isIosDevice("Mozilla/5.0 (Linux; Android 14)", 5)).toBe(false);
  });
  it("finds in-app browsers", () => {
    expect(isInAppBrowser("Mozilla/5.0 (iPhone) [FBAN/FBIOS;FBAV/400]")).toBe(true);
    expect(isInAppBrowser("Mozilla/5.0 (Linux; Android 14; wv) Chrome/120")).toBe(true);
    expect(isInAppBrowser("Mozilla/5.0 (iPhone) Safari/604.1")).toBe(false);
  });
});

describe("urlBase64ToUint8Array", () => {
  it("decodes base64url with and without padding", () => {
    expect(Array.from(urlBase64ToUint8Array("AQID"))).toEqual([1, 2, 3]);
    expect(Array.from(urlBase64ToUint8Array("-_8"))).toEqual([251, 255]);
  });
});
