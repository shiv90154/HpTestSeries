import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import { validateProduct, type ProductInput } from "./product-input";

type Fail = { ok: false; errors: string[] };

export type PublicProduct = {
  slug: string;
  title: string;
  titleHi: string | null;
  kind: string;
  priceInPaise: number;
  validityDays: number | null;
};

/** Active products for the public pricing section — no auth required. */
export const listActiveProducts = cache(async (): Promise<PublicProduct[]> => {
  const products = await db.product.findMany({
    where: { isActive: true },
    orderBy: { priceInPaise: "asc" },
    select: { slug: true, title: true, titleHi: true, kind: true, priceInPaise: true, validityDays: true },
  });
  return products;
});

/** An active product with what it unlocks, for the /buy page. Cached so metadata and page share one query. */
export const getProductForSale = cache(async (slug: string) => {
  const product = await db.product.findUnique({
    where: { slug },
    select: {
      slug: true,
      title: true,
      titleHi: true,
      kind: true,
      priceInPaise: true,
      validityDays: true,
      validUntil: true,
      isActive: true,
      items: {
        select: {
          series: {
            select: {
              title: true,
              exam: { select: { name: true, body: { select: { slug: true } } } },
              _count: { select: { tests: { where: { test: { status: "PUBLISHED" } } } } },
            },
          },
        },
      },
    },
  });
  if (!product || !product.isActive) return null;
  // A pass covers every paid test, so there are no ProductItem rows to list.
  const paidTestCount = product.kind === "PASS" ? await db.test.count({ where: { status: "PUBLISHED", isFree: false } }) : 0;
  return {
    ...product,
    paidTestCount,
    series: product.items.map(({ series: s }) => ({ title: s.title, examName: s.exam.name, bodySlug: s.exam.body.slug, testCount: s._count.tests })),
  };
});

export type ProductListItem = {
  id: string;
  slug: string;
  title: string;
  kind: string;
  priceInPaise: number;
  validityDays: number | null;
  isActive: boolean;
  orderCount: number;
  entitlementCount: number;
};

export async function listProducts(): Promise<ProductListItem[]> {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      kind: true,
      priceInPaise: true,
      validityDays: true,
      isActive: true,
      _count: { select: { orders: true, entitlements: true } },
    },
  });
  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    kind: p.kind,
    priceInPaise: p.priceInPaise,
    validityDays: p.validityDays,
    isActive: p.isActive,
    orderCount: p._count.orders,
    entitlementCount: p._count.entitlements,
  }));
}

export async function getProductForEdit(id: string) {
  const product = await db.product.findUnique({
    where: { id },
    include: { items: { select: { seriesId: true } } },
  });
  if (!product) return null;
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    titleHi: product.titleHi ?? "",
    kind: product.kind,
    priceRupees: product.priceInPaise / 100,
    validityDays: product.validityDays ?? 365,
    isActive: product.isActive,
    seriesIds: product.items.map((i) => i.seriesId),
  };
}

export async function listSeriesOptions(): Promise<{ id: string; title: string; examName: string }[]> {
  const series = await db.testSeries.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true, exam: { select: { name: true } } },
  });
  return series.map((s) => ({ id: s.id, title: s.title, examName: s.exam.name }));
}

async function checkSlugFree(slug: string, excludeId: string | null): Promise<boolean> {
  const existing = await db.product.findUnique({ where: { slug }, select: { id: true } });
  return !existing || existing.id === excludeId;
}

export async function createProduct(raw: unknown, actorId: string): Promise<{ ok: true; id: string } | Fail> {
  const v = validateProduct(raw);
  if (!v.ok) return v;
  if (!(await checkSlugFree(v.value.slug, null))) return { ok: false, errors: ["This URL is already used by another product"] };

  const product = await db.product.create({
    select: { id: true },
    data: {
      ...data(v.value),
      items: v.value.kind === "PASS" ? undefined : { create: v.value.seriesIds.map((seriesId) => ({ seriesId })) },
    },
  });
  await db.auditLog.create({ data: { actorId, entity: "product", entityId: product.id, action: "create" } });
  return { ok: true, id: product.id };
}

export async function updateProduct(id: string, raw: unknown, actorId: string): Promise<{ ok: true } | Fail> {
  const v = validateProduct(raw);
  if (!v.ok) return v;
  if (!(await checkSlugFree(v.value.slug, id))) return { ok: false, errors: ["This URL is already used by another product"] };

  await db.$transaction([
    db.productItem.deleteMany({ where: { productId: id } }),
    db.product.update({
      where: { id },
      data: {
        ...data(v.value),
        items: v.value.kind === "PASS" ? undefined : { create: v.value.seriesIds.map((seriesId) => ({ seriesId })) },
      },
    }),
  ]);
  await db.auditLog.create({ data: { actorId, entity: "product", entityId: id, action: "update" } });
  return { ok: true };
}

export async function setProductActive(id: string, isActive: boolean, actorId: string): Promise<{ ok: true } | Fail> {
  await db.product.update({ where: { id }, data: { isActive } });
  await db.auditLog.create({ data: { actorId, entity: "product", entityId: id, action: isActive ? "activate" : "deactivate" } });
  return { ok: true };
}

export async function deleteProduct(id: string, actorId: string): Promise<{ ok: true } | Fail> {
  const orderCount = await db.order.count({ where: { productId: id } });
  if (orderCount > 0) return { ok: false, errors: ["This product has orders and can't be deleted — deactivate it instead"] };
  await db.product.delete({ where: { id } });
  await db.auditLog.create({ data: { actorId, entity: "product", entityId: id, action: "delete" } });
  return { ok: true };
}

function data(v: ProductInput) {
  return {
    slug: v.slug,
    title: v.title,
    titleHi: v.titleHi || null,
    kind: v.kind,
    priceInPaise: Math.round(v.priceRupees * 100),
    validityDays: v.validityDays,
    isActive: v.isActive,
  };
}
