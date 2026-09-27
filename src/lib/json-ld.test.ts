import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "./json-ld";

describe("serializeJsonLd", () => {
  it("escapes < so content cannot close the script tag", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(out).toContain("\\u003c/script>");
  });

  it("still round-trips to the same data", () => {
    const data = { name: "a < b </script>", nested: [{ x: "<!--" }] };
    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });
});
