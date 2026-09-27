// Grant a staff role to an existing user (there is no UI for bootstrapping the first admin).
// Usage: npm run set-role -- +919876543210 ADMIN     (phone number or email)

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "../src/generated/prisma/client";

const [identifier, role] = process.argv.slice(2);
const roles = Object.values(Role);

if (!identifier || !role || !roles.includes(role as Role)) {
  console.error(`Usage: npm run set-role -- <phone|email> <${roles.join("|")}>`);
  process.exit(1);
}

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  const where = identifier.includes("@") ? { email: identifier } : { phoneNumber: identifier };
  const user = await db.user.findUnique({ where });
  if (!user) throw new Error(`No user found for ${identifier}. Sign in once first.`);

  await db.$transaction([
    db.user.update({ where: { id: user.id }, data: { role: role as Role } }),
    // Sessions cache the old role in the cookie cache; force a fresh sign-in.
    db.session.deleteMany({ where: { userId: user.id } }),
    db.auditLog.create({
      data: { entity: "user", entityId: user.id, action: "set-role", diff: { from: user.role, to: role } },
    }),
  ]);
  console.log(`${identifier}: ${user.role} → ${role}. Sign in again to pick up the new role.`);
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
