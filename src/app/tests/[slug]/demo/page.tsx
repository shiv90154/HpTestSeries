import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { canUserAccessTest, getDemoPaper, getTestMeta } from "@/modules/assessment/service";
import { getCurrentUser } from "@/modules/identity/session";
import { Cbt } from "../attempt/cbt";

export const metadata: Metadata = { title: "Free demo", robots: { index: false, follow: false } };

/** Free demo of a paid test: first half of every section, then a "Pay now" popup. Nothing is saved. */
export default async function DemoPage({ params }: PageProps<"/tests/[slug]/demo">) {
  const { slug } = await params;
  const [meta, user] = await Promise.all([getTestMeta(slug), getCurrentUser()]);
  if (!meta) notFound();

  // Free tests, and paid tests the user already owns, go straight to the real thing.
  if (meta.isFree || (await canUserAccessTest(user?.id ?? null, meta))) redirect(`/tests/${slug}/attempt`);

  const paper = await getDemoPaper(slug);
  if (!paper) redirect(`/tests/${slug}`);
  return <Cbt paper={paper} candidate={user ? { name: user.name } : null} />;
}
