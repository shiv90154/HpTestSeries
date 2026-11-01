import { describe, expect, it } from "vitest";
import { initialsOf, profileCompleteness } from "./profile-rules";

describe("profileCompleteness", () => {
  it("treats the Aspirant placeholder as no name", () => {
    const c = profileCompleteness({ name: "Aspirant", district: null, phoneNumber: null, emailVerified: false });
    expect(c.percent).toBe(0);
  });
  it("is 100 when everything is filled", () => {
    expect(profileCompleteness({ name: "Asha Devi", district: "Shimla", phoneNumber: "+919999999999", emailVerified: true }).percent).toBe(100);
  });
  it("counts each step as 25", () => {
    expect(profileCompleteness({ name: "Asha", district: "Shimla", phoneNumber: null, emailVerified: false }).percent).toBe(50);
  });
});

describe("initialsOf", () => {
  it("uses first and last word", () => expect(initialsOf("asha kumari devi")).toBe("AD"));
  it("handles one word", () => expect(initialsOf("Asha")).toBe("A"));
  it("shows ? for the placeholder", () => expect(initialsOf("Aspirant")).toBe("?"));
});
