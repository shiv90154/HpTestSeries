import { describe, expect, it } from "vitest";
import { bodyParagraphs, istDayStart, isRealEmail, offerAllowed, renderEmail, unsubscribeToken, verifyUnsubscribeToken, withUtm } from "./rules";

const DAY = 24 * 60 * 60 * 1000;
const now = new Date("2026-10-10T13:30:00Z"); // 7 pm IST

describe("who can be mailed", () => {
  it("skips the placeholder address of SMS-login accounts", () => {
    expect(isRealEmail("rahul@gmail.com")).toBe(true);
    expect(isRealEmail("919876543210@phone.invalid")).toBe(false);
    expect(isRealEmail("not-an-email")).toBe(false);
  });

  it("allows one offer every 3 days and 4 in 30 days", () => {
    expect(offerAllowed([], now)).toBe(true);
    expect(offerAllowed([new Date(now.getTime() - 2 * DAY)], now)).toBe(false);
    expect(offerAllowed([new Date(now.getTime() - 4 * DAY)], now)).toBe(true);
    const four = [4, 10, 16, 22].map((d) => new Date(now.getTime() - d * DAY));
    expect(offerAllowed(four, now)).toBe(false);
    expect(offerAllowed([...four.slice(0, 3), new Date(now.getTime() - 40 * DAY)], now)).toBe(true);
  });

  it("resets the daily quota at midnight in India", () => {
    expect(istDayStart(now).toISOString()).toBe("2026-10-09T18:30:00.000Z");
    expect(istDayStart(new Date("2026-10-09T19:00:00Z")).toISOString()).toBe("2026-10-09T18:30:00.000Z");
  });
});

describe("unsubscribe token", () => {
  const t = unsubscribeToken("secret", "user1", "offers");

  it("verifies only for the same user, category and secret", () => {
    expect(verifyUnsubscribeToken("secret", "user1", "offers", t)).toBe(true);
    expect(verifyUnsubscribeToken("secret", "user2", "offers", t)).toBe(false);
    expect(verifyUnsubscribeToken("secret", "user1", "reminders", t)).toBe(false);
    expect(verifyUnsubscribeToken("other", "user1", "offers", t)).toBe(false);
    expect(verifyUnsubscribeToken("secret", "user1", "everything", t)).toBe(false);
    expect(verifyUnsubscribeToken("secret", "user1", "offers", "short")).toBe(false);
  });
});

describe("links and template", () => {
  it("tags our own links with UTM and leaves others alone", () => {
    expect(withUtm("/buy/x", "https://hptestseries.in", "expiry")).toBe(
      "https://hptestseries.in/buy/x?utm_source=email&utm_medium=email&utm_campaign=expiry",
    );
    expect(withUtm("https://youtube.com/watch?v=1", "https://hptestseries.in", "c")).toBe("https://youtube.com/watch?v=1");
  });

  it("escapes every value and includes the unsubscribe link", () => {
    const e = renderEmail({
      subject: "s",
      heading: "<b>Hi</b>",
      paragraphs: ["Score 5 & more"],
      cta: { label: "Go", url: "https://hptestseries.in/x?a=1&b=2" },
      why: "Because.",
      unsubscribeUrl: "https://hptestseries.in/unsubscribe?x=1",
    });
    expect(e.html).toContain("&lt;b&gt;Hi&lt;/b&gt;");
    expect(e.html).toContain("Score 5 &amp; more");
    expect(e.html).toContain("a=1&amp;b=2");
    expect(e.html).toContain("Unsubscribe</a>");
    expect(e.text).toContain("Unsubscribe: https://hptestseries.in/unsubscribe?x=1");
  });

  it("splits a campaign body into paragraphs on blank lines", () => {
    expect(bodyParagraphs("Line one\ncontinues\n\n\n  Second  \n\n")).toEqual(["Line one continues", "Second"]);
  });
});
