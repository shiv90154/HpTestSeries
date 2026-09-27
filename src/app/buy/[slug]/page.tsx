import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { card } from "@/components/ui";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/modules/identity/session";
import { BuyButton } from "./buy-button";

export default async function BuyPage({ params }: PageProps<"/buy/[slug]">) {
  const { slug } = await params;
  const [product, user] = await Promise.all([db.product.findUnique({ where: { slug } }), getCurrentUser()]);
  if (!product || !product.isActive) notFound();

  const rupees = (product.priceInPaise / 100).toLocaleString("en-IN");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-12">
        <div className={`${card} space-y-6 p-6`}>
          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            {product.titleHi && <p className="text-muted">{product.titleHi}</p>}
          </div>
          <div className="text-4xl font-bold tabular-nums">
            ₹{rupees}
            {product.validityDays && <span className="ml-2 text-sm font-normal text-muted">valid {product.validityDays} days</span>}
          </div>
          <BuyButton productSlug={product.slug} user={user} />
          <p className="text-xs text-muted">Secure payment via Razorpay (UPI, cards, netbanking).</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
