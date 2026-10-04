import { BadgeCheck, Calendar, Mail, Phone, Receipt } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { btn, card } from "@/components/ui";
import { db } from "@/lib/db";
import { rupees } from "@/lib/money";
import { getMyPurchases } from "@/modules/commerce/purchases";
import { requireUser } from "@/modules/identity/session";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "My Profile", robots: { index: false } };

export default async function ProfilePage() {
  const user = await requireUser("/profile");
  const purchasesPromise = getMyPurchases(user.id);
  const profile = await db.user.findUniqueOrThrow({
    where: { id: user.id },
    select: { name: true, email: true, emailVerified: true, phoneNumber: true, phoneNumberVerified: true, district: true, preferredLang: true, createdAt: true },
  });

  const purchases = await purchasesPromise;

  return (
    <>
      <AppHeader user={{ ...user, name: profile.name }} />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-6 sm:py-8">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="mt-1 text-sm text-muted">Manage your details and preferences.</p>
        </div>

        <section className={`${card} p-5`}>
          <h2 className="mb-4 font-semibold">Account</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-muted" />
              <dt className="sr-only">Email</dt>
              <dd className="flex flex-1 items-center gap-2">
                {profile.email}
                {profile.emailVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success">
                    <BadgeCheck className="size-3.5" /> Verified
                  </span>
                )}
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-muted" />
              <dt className="sr-only">Phone</dt>
              <dd className="flex flex-1 items-center gap-2">
                {profile.phoneNumber ?? <span className="text-muted">Not linked</span>}
                {profile.phoneNumber && profile.phoneNumberVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success">
                    <BadgeCheck className="size-3.5" /> Verified
                  </span>
                )}
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="size-4 shrink-0 text-muted" />
              <dt className="sr-only">Member since</dt>
              <dd className="flex-1">
                Member since {profile.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </dd>
            </div>
          </dl>
        </section>

        <section className={`${card} p-5`}>
          <h2 className="mb-4 font-semibold">Edit details</h2>
          <ProfileForm name={profile.name} district={profile.district} preferredLang={profile.preferredLang} />
        </section>

        <section className={`${card} flex items-center justify-between gap-3 p-5`}>
          <div>
            <h2 className="font-semibold">Refer a friend</h2>
            <p className="text-sm text-muted">Your friend saves ₹50, and you get a ₹50 coupon when they pay.</p>
          </div>
          <Link href="/refer" className={btn("outline", "md", "shrink-0")}>
            Get my code
          </Link>
        </section>

        <section id="purchases" className={`${card} scroll-mt-24 p-5`}>
          <h2 className="mb-3 font-semibold">Purchases</h2>
          {purchases.length === 0 ? (
            <p className="text-sm text-muted">
              No purchases yet.{" "}
              <Link href="/pricing" className="font-medium text-primary hover:underline">
                See plans
              </Link>
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {purchases.map((o) => (
                <li key={o.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{o.productTitle}</p>
                    <p className="text-xs text-muted">
                      {o.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })} ·{" "}
                      {rupees(o.amountPaise)}
                      {o.status === "REFUNDED" && <span className="font-semibold text-danger"> · Refunded</span>}
                    </p>
                  </div>
                  <Link href="/refund-request" className="shrink-0 text-xs text-muted hover:text-primary hover:underline">
                    Refund?
                  </Link>
                  <Link href={`/orders/${o.id}/receipt`} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                    <Receipt className="size-4" /> Receipt
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
