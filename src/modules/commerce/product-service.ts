import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import { liveTestWhere } from "@/modules/catalog/visibility";
import { validateProduct, type ProductInput } from "./product-input";
import { cheapestBySeries, separateTotalPaise, type SeriesPrices } from "./value";

type Fail = { ok: false; errors: string[] };

export type PublicProduct = {
  slug: string;
  title: string;
  titleHi: string | null;
  kind: string;
  priceInPaise: number;
  validityDays: number | null;
  /** Live tests it unlocks: every paid test for a PASS, otherwise the tests in its series. */
  testCount: number;
  /** For a pack: what its series cost bought one by one today, when that is more than the pack. */
  separatePaise: number | null;
};

/** Cheapest active single-series price of each series, for the "bought separately" total of packs. */
const seriesPrices = cache(async (): Promise<SeriesPrices> => {
  const products = await db.product.findMany({
    where: { isActive: true, kind: "SERIES" },
    select: { priceInPaise: true, items: { select: { seriesId: true } } },
  });
  return cheapestBySeries(products.map((p) => ({ priceInPaise: p.priceInPaise, seriesIds: p.items.map((i) => i.seriesId) })));
});

/** Live tests in these series, each counted once (packs share tests such as the High Court sectionals). */
function distinctTestCount(seriesIds: string[]) {
  return db.test.count({ where: { ...liveTestWhere(), series: { some: { seriesId: { in: seriesIds } } } } });
}

async function separatePaise(kind: string, pricePaise: number, seriesIds: string[]): Promise<number | null> {
  return kind === "PACK" ? separateTotalPaise(pricePaise, seriesIds, await seriesPrices()) : null;
}

/** Active products for the public pricing section — no auth required. */
export const listActiveProducts = cache(async (): Promise<PublicProduct[]> => {
  const [products, paidTestCount] = await Promise.all([
    db.product.findMany({
      where: { isActive: true },
      orderBy: { priceInPaise: "asc" },
      select: {
        slug: true,
        title: true,
        titleHi: true,
        kind: true,
        priceInPaise: true,
        validityDays: true,
        items: { select: { seriesId: true, series: { select: { _count: { select: { tests: { where: { test: liveTestWhere() } } } } } } } },
      },
    }),
    db.test.count({ where: { ...liveTestWhere(), isFree: false } }),
  ]);
  return Promise.all(
    products.map(async ({ items, ...p }) => ({
      ...p,
      testCount:
        p.kind === "PASS" ? paidTestCount : p.kind === "PACK" ? await distinctTestCount(items.map((i) => i.seriesId)) : items.reduce((n, i) => n + i.series._count.tests, 0),
      separatePaise: await separatePaise(p.kind, p.priceInPaise, items.map((i) => i.seriesId)),
    })),
  );
});

export type PackOffer = { slug: string; title: string; priceInPaise: number; seriesCount: number; separatePaise: number };

/** The cheapest active pack that includes a series of this exam and really saves money, for the exam page's upsell. */
export async function getPackForExam(examId: string): Promise<PackOffer | null> {
  const packs = await db.product.findMany({
    where: { isActive: true, kind: "PACK", items: { some: { series: { examId } } } },
    orderBy: { priceInPaise: "asc" },
    select: { slug: true, title: true, priceInPaise: true, items: { select: { seriesId: true } } },
  });
  for (const p of packs) {
    const ids = p.items.map((i) => i.seriesId);
    const separate = await separatePaise("PACK", p.priceInPaise, ids);
    if (separate) return { slug: p.slug, title: p.title, priceInPaise: p.priceInPaise, seriesCount: ids.length, separatePaise: separate };
  }
  return null;
}

/**
 * The product a visitor should buy to unlock a paid test: the cheapest active product that covers one of
 * the test's series; if none does, the cheapest all-access pass. Null when nothing is on sale for it.
 */
export async function getBuyOptionForSeries(seriesIds: string[]) {
  const select = { slug: true, title: true, priceInPaise: true, validityDays: true } as const;
  const orderBy = { priceInPaise: "asc" } as const;
  const product =
    (seriesIds.length
      ? await db.product.findFirst({ where: { isActive: true, items: { some: { seriesId: { in: seriesIds } } } }, orderBy, select })
      : null) ?? (await db.product.findFirst({ where: { isActive: true, kind: "PASS" }, orderBy, select }));
  return product ? { href: `/buy/${product.slug}`, title: product.title, priceInPaise: product.priceInPaise, validityDays: product.validityDays } : null;
}

/** An active product with what it unlocks, for the /buy page. Cached so metadata and page share one query. */
export const getProductForSale = cache(async (slug: string) => {
  const product = await db.product.findUnique({
    where: { slug },
    select: {
      id: true,
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
          seriesId: true,
          series: {
            select: {
              title: true,
              exam: { select: { name: true, body: { select: { slug: true } } } },
              _count: { select: { tests: { where: { test: liveTestWhere() } } } },
            },
          },
        },
      },
    },
  });
  if (!product || !product.isActive) return null;
  // A pass covers every paid test, so there are no ProductItem rows to list.
  const paidTestCount = product.kind === "PASS" ? await db.test.count({ where: { ...liveTestWhere(), isFree: false } }) : 0;
  const seriesIds = product.items.map((i) => i.seriesId);
  return {
    ...product,
    paidTestCount,
    /** Live tests it unlocks, each counted once. */
    testCount: product.kind === "PASS" ? paidTestCount : await distinctTestCount(seriesIds),
    separatePaise: await separatePaise(product.kind, product.priceInPaise, seriesIds),
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
  /** What buying it opens, for the admin list: every paid test (PASS) or the included series with their test counts. */
  unlocks: { all: boolean; paidTestCount: number; series: { title: string; testCount: number }[] };
};

export async function listProducts(): Promise<ProductListItem[]> {
  const paidTestCount = await db.test.count({ where: { ...liveTestWhere(), isFree: false } });
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
      items: { select: { series: { select: { title: true, _count: { select: { tests: { where: { test: liveTestWhere() } } } } } } } },
    },
  });
  return products.map((p) => ({
    unlocks: {
      all: p.kind === "PASS",
      paidTestCount,
      series: p.items.map((i) => ({ title: i.series.title, testCount: i.series._count.tests })),
    },
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

export async function listSeriesOptions(): Promise<{ id: string; title: string; examName: string; testCount: number }[]> {
  const series = await db.testSeries.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true, exam: { select: { name: true } }, _count: { select: { tests: { where: { test: liveTestWhere() } } } } },
  });
  return series.map((s) => ({ id: s.id, title: s.title, examName: s.exam.name, testCount: s._count.tests }));
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
