# HP Test Series

Himachal Pradesh-focused, mobile-first, low-cost test series platform for state government exams.
Product and technical plan: [docs/BLUEPRINT.md](docs/BLUEPRINT.md).

## Stack
Next.js 16 (App Router) · TypeScript · Tailwind · PostgreSQL · Prisma 7 (pg driver adapter) · Better Auth · Zod · Vitest

## Local setup
```bash
npm install                                  # also runs prisma generate
cp .env.example .env                         # fill BETTER_AUTH_SECRET (command in the file)

# Database — either Docker…
docker compose up -d                         # DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hp_test_series
# …or no Docker: Prisma's local Postgres
npx prisma dev --name hp-test-series --detach
npx prisma dev ls                            # use the TCP URL for DATABASE_URL, the :port+1 one for SHADOW_DATABASE_URL
                                             # and set DATABASE_POOL_MAX=1 + BUILD_WORKERS=1 (it serves one connection at a time)

npm run db:migrate                           # applies migrations + regenerates the client
npm run db:seed                              # exam catalogue + subject/topic taxonomy
npm run dev
```

### First admin
1. Sign in at `/login` with a phone number. Without MSG91 keys, the OTP is printed in the `npm run dev` terminal.
2. `npm run set-role -- +919876543210 ADMIN` (roles: STUDENT, SUPPORT, EDITOR, REVIEWER, ADMIN)
3. Sign in again and open `/admin`.

### Importing questions
`/admin/questions/import` → download the template → fill it in Google Sheets/Excel → export as CSV (UTF-8) → upload.
Rows are validated first; nothing is saved until you confirm. Imports land as **Draft**; questions already in the bank are skipped.

## Scripts
| Script | Purpose |
|---|---|
| `npm test` | Unit tests (grading, access control, permissions, CSV import, coupons) |
| `npm run test:integration` | Payment flow against the local DB + Razorpay **test** API (needs `rzp_test_` keys in `.env`; refuses live keys) |
| `npm run typecheck` | Generate Next route types, then `tsc` |
| `npm run db:migrate` / `db:seed` / `db:studio` | Prisma workflows |
| `npm run set-role -- <phone\|email> <ROLE>` | Grant a staff role |

## Layout
```
prisma/schema.prisma          data model (BLUEPRINT §13); partial unique indexes live in the init migration SQL
prisma/seed.ts                launch catalogue — verify against official notifications
src/proxy.ts                  optimistic login redirect for /dashboard and /admin (real checks are server-side)
src/lib/                      db client, rate limiter, site config
src/modules/identity/         Better Auth config, session guards, role → permission map, MSG91 SMS
src/modules/content/          CSV question import (pure validator + DB service)
src/modules/assessment/       grading + percentile
src/modules/commerce/         canAccessTest
src/app/admin/                admin panel (layout-guarded; every action re-checks permission)
```

## Free demo test
`npm run db:seed` also creates **Himachal GK Free Mock Test 1** (25 bilingual questions, 20 min) at `/tests/hp-gk-free-mock-1` — no login needed.

## Notes
- **Auth:** phone OTP (MSG91, DLT template with an `otp` variable) + optional Google. OTP limits: 3 sends / 10 min per
  phone, 20 / 10 min per IP (loose on purpose — mobile carriers share IPs via CGNAT). Max 2 sessions per user.
- **Prisma 7:** `migrate dev` no longer runs `generate`; use `npm run db:migrate`, which does both.
- **Payments:** Razorpay Checkout → client callback unlocks access instantly; the webhook (`/api/razorpay/webhook`) is the
  safety net; `POST /api/cron/reconcile` (Bearer `CRON_SECRET`) recovers payments both missed, every 15 minutes from root's crontab.
- **Cron:** `deploy.sh` runs `deploy/install-cron.sh`, which appends any missing job to root's crontab (tagged
  `# hptestseries`, other apps' lines untouched): reconcile every 15 min and emails at 7 pm IST, both through
  `deploy/cron-call.sh`, which reads `CRON_SECRET` from `deploy/.env.production`. Log: `/var/log/hptestseries-cron.log`.
- **Refunds are manual:** students use `/refund-request` (opens WhatsApp/email with the order filled in). The owner refunds from the
  Razorpay dashboard, then clicks *Mark refunded* on the user's admin page to end their access.
- **Emails:** `/admin/emails`. Reminders (access ending in 7 days; free-test follow-up for students who opted in) and admin
  campaigns go through Resend, capped at `EMAIL_DAILY_LIMIT` a day (default 60, leaving room for login codes in the free
  plan's 100/day), one offer per student every 3 days and 4 a month. Daily run at 7 pm IST.
- **Coupons:** `/admin/coupons` (percent or flat, max uses, expiry, partner tag). One use per student; 100% = free access.
- **Admin 2FA (optional):** each staff member can turn on an authenticator-app code at `/admin/security`.
- **Login:** Google + email code. Phone/SMS login is off unless `PHONE_LOGIN=on`.
- **No GST:** the seller is not GST-registered, so receipts are plain payment receipts.
