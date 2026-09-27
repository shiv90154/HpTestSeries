import type { Prisma } from "@/generated/prisma/client";
import { ContentStatus } from "@/generated/prisma/enums";

export type QuestionListFilters = { status?: ContentStatus; subject?: string; q?: string };

type Params = Record<string, string | string[] | undefined> | FormData;

function one(params: Params, key: string): string | undefined {
  const v = params instanceof FormData ? params.get(key) : params[key];
  const s = Array.isArray(v) ? v[0] : typeof v === "string" ? v : undefined;
  return s || undefined;
}

/** Parses list filters from search params (page) or a submitted form (bulk actions) the same way. */
export function parseQuestionFilters(params: Params): QuestionListFilters {
  return {
    status: Object.values(ContentStatus).find((s) => s === one(params, "status")),
    subject: one(params, "subject"),
    q: one(params, "q")?.trim().slice(0, 200) || undefined,
  };
}

export function questionListWhere(f: QuestionListFilters): Prisma.QuestionWhereInput {
  return {
    ...(f.status && { status: f.status }),
    ...(f.subject && { topics: { some: { topic: { subject: { slug: f.subject } } } } }),
    ...(f.q && { contents: { some: { stem: { contains: f.q, mode: "insensitive" } } } }),
  };
}

export function filterParams(f: QuestionListFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.status) p.set("status", f.status);
  if (f.subject) p.set("subject", f.subject);
  if (f.q) p.set("q", f.q);
  return p;
}
