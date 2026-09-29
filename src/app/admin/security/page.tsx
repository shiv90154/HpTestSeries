import type { Metadata } from "next";
import { connection } from "next/server";
import { requirePermission } from "@/modules/identity/session";
import { isTwoFactorEnabled } from "@/modules/identity/two-factor";
import { panel } from "../ui";
import { SecurityPanel } from "./security-panel";

export const metadata: Metadata = { title: "My security" };

export default async function SecurityPage() {
  const user = await requirePermission("admin:access", "/admin/security");
  await connection();
  const enabled = await isTwoFactorEnabled(user.id);

  return (
    <div className="max-w-xl space-y-5">
      <h1 className="text-xl font-semibold">My security</h1>
      <div className={`${panel} space-y-2 text-sm`}>
        <p className="font-medium">Two-factor login (optional)</p>
        <p className="text-muted">
          When on, opening the admin panel also needs a 6-digit code from an authenticator app (Google Authenticator, Microsoft
          Authenticator, Authy…). It is asked once every 12 hours. Students are not affected.
        </p>
      </div>
      <SecurityPanel enabled={enabled} />
    </div>
  );
}
