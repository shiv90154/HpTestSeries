import { z } from "zod";

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const PRODUCT_KINDS = ["SERIES", "PACK", "PASS"] as const;

export const KIND_LABEL: Record<(typeof PRODUCT_KINDS)[number], string> = {
  SERIES: "Series (one test series)",
  PACK: "Pack (a few series)",
  PASS: "All-Access Pass (everything)",
};

export const productSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(2, "URL is required")
      .max(80, "URL is too long")
      .regex(SLUG_RE, "URL may only use lowercase letters, digits and single hyphens"),
    title: z.string().trim().min(3, "Title is required").max(160, "Title is too long"),
    titleHi: z.string().trim().max(160, "Hindi title is too long"),
    kind: z.enum(PRODUCT_KINDS),
    priceRupees: z.number().min(1, "Price must be at least ₹1").max(100_000, "Price is too high"),
    validityDays: z.number().int().min(1, "Validity must be at least 1 day").max(3650, "Validity is too long"),
    isActive: z.boolean(),
    seriesIds: z.array(z.string()).max(200),
  })
  .refine((v) => v.kind === "PASS" || v.seriesIds.length > 0, {
    message: "Pick at least one series for a Series/Pack product",
    path: ["seriesIds"],
  });

export type ProductInput = z.infer<typeof productSchema>;

type Result<T> = { ok: true; value: T } | { ok: false; errors: string[] };

export function validateProduct(raw: unknown): Result<ProductInput> {
  const p = productSchema.safeParse(raw);
  if (p.success) return { ok: true, value: p.data };
  return { ok: false, errors: p.error.issues.map((i) => i.message) };
}

export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}
