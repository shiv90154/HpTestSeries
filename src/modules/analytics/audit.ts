import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";

export const AUDIT_PAGE_SIZE = 50;

export type AuditRow = {
  id: string;
  at: Date;
  entity: string;
  entityId: string;
  action: string;
  diff: Prisma.JsonValue;
  actor: string | null;
};

/** The audit log, newest first, filtered by entity type and a free-text search (action, id, actor). */
export async function listAuditLog(f: { entity?: string; q?: string; page: number }) {
  const q = f.q?.trim();
  const where: Prisma.AuditLogWhereInput = {
    ...(f.entity && { entity: f.entity }),
    ...(q && {
      OR: [
        { action: { contains: q, mode: "insensitive" } },
        { entityId: q },
        { actor: { email: { contains: q, mode: "insensitive" } } },
        { actor: { name: { contains: q, mode: "insensitive" } } },
      ],
    }),
  };
  const [rows, total, entities] = await Promise.all([
    db.auditLog.findMany({
      where,
      orderBy: { at: "desc" },
      skip: (f.page - 1) * AUDIT_PAGE_SIZE,
      take: AUDIT_PAGE_SIZE,
      select: { id: true, at: true, entity: true, entityId: true, action: true, diff: true, actor: { select: { name: true, email: true } } },
    }),
    db.auditLog.count({ where }),
    db.auditLog.findMany({ distinct: ["entity"], orderBy: { entity: "asc" }, select: { entity: true } }),
  ]);
  return {
    rows: rows.map((r): AuditRow => ({ ...r, actor: r.actor ? `${r.actor.name} (${r.actor.email})` : null })),
    total,
    pages: Math.max(1, Math.ceil(total / AUDIT_PAGE_SIZE)),
    entities: entities.map((e) => e.entity),
  };
}

/** Admin page of an audited record, when it has one. */
export function auditEntityHref(entity: string, id: string): string | null {
  if (id === "bulk") return null;
  const base: Record<string, string> = {
    question: "/admin/questions",
    test: "/admin/tests",
    product: "/admin/products",
    post: "/admin/blog",
    exam: "/admin/exams",
  };
  return base[entity] ? `${base[entity]}/${id}` : null;
}
