import "server-only";
import { db } from "@/lib/db";

export type Taxonomy = {
  subjects: { id: string; slug: string; name: string; topics: { id: string; name: string }[] }[];
  exams: { id: string; name: string; body: string }[];
};

/** Subjects/topics and exams for admin dropdowns. */
export async function getTaxonomy(): Promise<Taxonomy> {
  const [subjects, exams] = await Promise.all([
    db.subject.findMany({
      orderBy: { order: "asc" },
      select: { id: true, slug: true, name: true, topics: { orderBy: { order: "asc" }, select: { id: true, name: true } } },
    }),
    db.exam.findMany({
      orderBy: [{ body: { order: "asc" } }, { order: "asc" }],
      select: { id: true, name: true, body: { select: { name: true } } },
    }),
  ]);
  return { subjects, exams: exams.map((e) => ({ id: e.id, name: e.name, body: e.body.name })) };
}
