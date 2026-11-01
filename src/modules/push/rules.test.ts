import { describe, expect, it } from "vitest";
import { campaignSchema, chunk, isGoneStatus, isSitePath, payloadJson, subscriptionSchema } from "./rules";

describe("isSitePath", () => {
  it("accepts paths on the site", () => {
    expect(isSitePath("/")).toBe(true);
    expect(isSitePath("/tests/hp-police-full-mock-1")).toBe(true);
    expect(isSitePath("/blog/post?utm_source=push")).toBe(true);
  });
  it("refuses anything that could leave the site", () => {
    expect(isSitePath("https://evil.example")).toBe(false);
    expect(isSitePath("//evil.example")).toBe(false);
    expect(isSitePath("/\\evil.example")).toBe(false);
    expect(isSitePath("javascript:alert(1)")).toBe(false);
    expect(isSitePath("tests")).toBe(false);
    expect(isSitePath("/a b")).toBe(false);
    expect(isSitePath(`/${"a".repeat(300)}`)).toBe(false);
  });
});

describe("subscriptionSchema", () => {
  const keys = { p256dh: "B".repeat(87), auth: "a".repeat(22) };
  it("accepts an https endpoint", () => {
    expect(subscriptionSchema.safeParse({ endpoint: "https://fcm.googleapis.com/fcm/send/abc", keys }).success).toBe(true);
  });
  it("accepts the real push services of every browser", () => {
    for (const endpoint of [
      "https://updates.push.services.mozilla.com/wpush/v2/abc",
      "https://web.push.apple.com/QGx",
      "https://wns2-par02p.notify.windows.com/w/?token=abc",
    ])
      expect(subscriptionSchema.safeParse({ endpoint, keys }).success).toBe(true);
  });
  it("refuses http, junk and missing keys", () => {
    expect(subscriptionSchema.safeParse({ endpoint: "http://fcm.googleapis.com/x", keys }).success).toBe(false);
    expect(subscriptionSchema.safeParse({ endpoint: "not a url", keys }).success).toBe(false);
    expect(subscriptionSchema.safeParse({ endpoint: "https://fcm.googleapis.com/x", keys: { p256dh: "short", auth: "x" } }).success).toBe(false);
  });
  it("refuses any other server, so the subscribe route cannot make ours call internal addresses", () => {
    for (const endpoint of [
      "https://x.example/y",
      "https://127.0.0.1/push",
      "https://internal.local/push",
      "https://fcm.googleapis.com.evil.example/x",
      "https://evil.example/fcm.googleapis.com",
      "https://user:pw@fcm.googleapis.com/x",
      "https://fcm.googleapis.com:8443/x",
      "https://notpush.apple.com.evil.example/x",
    ])
      expect(subscriptionSchema.safeParse({ endpoint, keys }).success, endpoint).toBe(false);
  });
});

describe("campaignSchema", () => {
  const ok = { title: "New mock test", body: "Attempt it free today.", url: "/tests", site: "hp" };
  it("accepts a normal campaign and turns a blank exam into null", () => {
    expect(campaignSchema.parse({ ...ok, examId: "" }).examId).toBeNull();
  });
  it("enforces lock-screen length limits and the site list", () => {
    expect(campaignSchema.safeParse({ ...ok, title: "x".repeat(66) }).success).toBe(false);
    expect(campaignSchema.safeParse({ ...ok, body: "x".repeat(181) }).success).toBe(false);
    expect(campaignSchema.safeParse({ ...ok, site: "xx" }).success).toBe(false);
    expect(campaignSchema.safeParse({ ...ok, url: "https://other.example" }).success).toBe(false);
  });
});

describe("payloadJson", () => {
  it("falls back to the home page for an unsafe link", () => {
    expect(JSON.parse(payloadJson({ title: "t", body: "b", url: "https://evil.example" })).url).toBe("/");
    expect(JSON.parse(payloadJson({ title: "t", body: "b", url: "/tests" })).url).toBe("/tests");
  });
});

describe("helpers", () => {
  it("treats 404 and 410 as a device that is gone", () => {
    expect(isGoneStatus(410)).toBe(true);
    expect(isGoneStatus(404)).toBe(true);
    expect(isGoneStatus(500)).toBe(false);
    expect(isGoneStatus(undefined)).toBe(false);
  });
  it("splits into batches", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([], 3)).toEqual([]);
  });
});
