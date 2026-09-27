import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { btn } from "@/components/ui";
import { canUserAccessTest, getPaper, getTestMeta } from "@/modules/assessment/service";
import { getCurrentUser } from "@/modules/identity/session";
import { Cbt } from "./cbt";

export const metadata: Metadata = { title: "Test in progress", robots: { index: false, follow: false } };

export default async function AttemptPage({ params }: PageProps<"/tests/[slug]/attempt">) {
  const { slug } = await params;
  const [meta, user] = await Promise.all([getTestMeta(slug), getCurrentUser()]);
  if (!meta) notFound();

  if (!(await canUserAccessTest(user?.id ?? null, meta))) {
    return (
      <main className="mx-auto grid min-h-dvh max-w-md place-items-center px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">{meta.title}</h1>
          <p className="text-muted">
            {user ? "This test is part of a paid test series." : "Log in to take this test."}
          </p>
          <Link href={user ? "/tests" : `/login?next=/tests/${slug}/attempt`} className={btn("primary")}>
            {user ? "See free tests" : "Log in"}
          </Link>
        </div>
      </main>
    );
  }

  const paper = await getPaper(slug);
  if (!paper) notFound();
  return <Cbt paper={paper} candidate={user ? { name: user.name } : null} />;
}
