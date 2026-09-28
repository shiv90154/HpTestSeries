import { BadgeCheck, Calendar, Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import { AppHeader } from "@/components/app-header";
import { card } from "@/components/ui";
import { db } from "@/lib/db";
import { requireUser } from "@/modules/identity/session";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "My Profile", robots: { index: false } };

export default async function ProfilePage() {
  const user = await requireUser("/profile");
  const profile = await db.user.findUniqueOrThrow({
    where: { id: user.id },
    select: { name: true, email: true, emailVerified: true, phoneNumber: true, phoneNumberVerified: true, district: true, preferredLang: true, createdAt: true },
  });

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
      </main>
    </>
  );
}
