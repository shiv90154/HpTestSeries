import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { getResultUpsell } from "@/modules/commerce/product-service";
import { getCurrentUser } from "@/modules/identity/session";
import { GuestResult } from "./guest-result";
import { currentSite } from "@/sites/current";

export const metadata: Metadata = { title: "Your result", robots: { index: false, follow: false } };

export default async function GuestResultPage({ params }: PageProps<"/[site]/tests/[slug]/result">) {
  const site = await currentSite();
  const { slug } = await params;
  const [user, upsell] = await Promise.all([getCurrentUser(), getResultUpsell(site.code, slug)]);
  return (
    <>
      <SiteHeader />
      <GuestResult slug={slug} loggedIn={!!user} upsell={upsell} />
    </>
  );
}
