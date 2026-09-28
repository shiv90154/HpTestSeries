import { describe, expect, it } from "vitest";
import { sniffImage } from "./image-sniff";

const bytes = (...parts: (number[] | string)[]) =>
  new Uint8Array(parts.flatMap((p) => (typeof p === "string" ? [...p].map((c) => c.charCodeAt(0)) : p)));

describe("sniffImage", () => {
  it("recognises PNG, JPEG, WebP and GIF by their magic bytes", () => {
    expect(sniffImage(bytes([0x89], "PNG", [0x0d, 0x0a, 0x1a, 0x0a, 0, 0]))?.ext).toBe("png");
    expect(sniffImage(bytes([0xff, 0xd8, 0xff, 0xe0]))?.ext).toBe("jpg");
    expect(sniffImage(bytes("RIFF", [1, 2, 3, 4], "WEBPVP8 "))?.ext).toBe("webp");
    expect(sniffImage(bytes("GIF89a", [1, 0]))?.ext).toBe("gif");
  });

  it("rejects SVG, HTML and anything else, whatever the file is called", () => {
    expect(sniffImage(bytes('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'))).toBeNull();
    expect(sniffImage(bytes("<!doctype html><html>"))).toBeNull();
    expect(sniffImage(bytes([0x25, 0x50, 0x44, 0x46]))).toBeNull(); // %PDF
    expect(sniffImage(new Uint8Array())).toBeNull();
  });
});
