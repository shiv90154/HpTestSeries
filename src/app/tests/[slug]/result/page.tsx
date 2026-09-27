import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { GuestResult } from "./guest-result";

export const metadata: Metadata = { title: "Your result", robots: { index: false, follow: false } };

export default async function GuestResultPage({ params }: PageProps<"/tests/[slug]/result">) {
  const { slug } = await params;
  return (
    <>
      <SiteHeader />
      <GuestResult slug={slug} />
    </>
  );
}
