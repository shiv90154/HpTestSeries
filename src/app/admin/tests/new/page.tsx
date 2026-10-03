import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { getTaxonomy } from "@/modules/content/taxonomy";
import { requirePermission } from "@/modules/identity/session";
import { listGrantableProducts } from "@/modules/identity/user-service";
import { TestMetaForm } from "../test-meta-form";

export const metadata: Metadata = { title: "New test" };

export default async function NewTestPage() {
  await requirePermission("content:edit");
  await connection();
  const [{ exams }, products] = await Promise.all([getTaxonomy(), listGrantableProducts()]);

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <Link href="/admin/tests" className="text-sm text-muted">
          ← Tests
        </Link>
        <h1 className="text-xl font-semibold">New test</h1>
        <p className="text-sm text-muted">Fill in the details first. Sections and questions come next.</p>
      </div>
      <TestMetaForm
        id={null}
        exams={exams}
        products={products}
        slugLocked={false}
        initial={{ title: "", titleHi: "", slug: "", type: "MOCK", examId: null, durationMin: 60, isFree: false, demoPercent: 0, instructions: "", liveStartsAt: "", liveEndsAt: "", prizes: [] }}
      />
    </div>
  );
}
