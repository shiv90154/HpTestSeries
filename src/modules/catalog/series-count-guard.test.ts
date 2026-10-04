import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// TestSeries.tests is the SeriesTest join table, which has no `status`/`publishedAt`: the live filter must go
// through `test: liveTestWhere()`. Passing liveTestWhere() straight to it type-checks (the filters share AND/OR)
// but Prisma rejects the query at runtime, which broke /admin/products and the plan page in production.
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (name === "generated" || name === "node_modules") return [];
    return statSync(p).isDirectory() ? sourceFiles(p) : /\.tsx?$/.test(name) && !name.endsWith(".test.ts") ? [p] : [];
  });
}

describe("series test counts", () => {
  it("never filter a series' tests relation with liveTestWhere() directly", () => {
    const offenders = sourceFiles("src").filter((f) => /tests:\s*\{\s*where:\s*liveTestWhere\(\)\s*\}/.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});
