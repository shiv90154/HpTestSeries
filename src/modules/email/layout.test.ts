import { describe, expect, it } from "vitest";
import { emailShell, otpRows } from "./layout";

describe("email layout", () => {
  it("shows each login digit in its own box and the expiry", () => {
    const html = emailShell({ preview: "p", siteUrl: "https://hptestseries.in", rows: otpRows("482916", 10), footer: "f" });
    for (const d of "482916") expect(html).toContain(`>${d}</td>`);
    expect(html).toContain("10 minutes");
  });

  it("escapes the site url and preview", () => {
    const html = emailShell({ preview: "<x>", siteUrl: "https://a.in/?a=1&b=2", rows: "", footer: "" });
    expect(html).toContain("&lt;x&gt;");
    expect(html).toContain("a=1&amp;b=2");
  });
});
