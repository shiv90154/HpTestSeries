#!/usr/bin/env bash
# Deploy / update HP Test Series on the VPS. Run on the server:  bash /root/hptestseries/deploy/deploy.sh
# First run creates deploy/.env.db and deploy/.env.production with random secrets (never committed).
set -euo pipefail
cd "$(dirname "$0")"
export COMPOSE_PROJECT_NAME=hptestseries DOCKER_BUILDKIT=1

git -C .. pull --ff-only

if [ ! -f .env.production ]; then
  db_pw=$(openssl rand -hex 24)
  umask 077
  printf 'POSTGRES_USER=hpts\nPOSTGRES_PASSWORD=%s\nPOSTGRES_DB=hptestseries\n' "$db_pw" > .env.db
  cat > .env.production <<EOF
DATABASE_URL=postgresql://hpts:${db_pw}@127.0.0.1:5434/hptestseries
DATABASE_POOL_MAX=10
BETTER_AUTH_SECRET=$(openssl rand -hex 32)
BETTER_AUTH_URL=https://hptestseries.in
NEXT_PUBLIC_SITE_URL=https://hptestseries.in

# Login: fill these, then re-run this script.
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
RESEND_API_KEY=
EMAIL_FROM=
# Phone (SMS) login is off. To enable later: PHONE_LOGIN=on plus the two MSG91 lines.
# PHONE_LOGIN=on
# MSG91_AUTH_KEY=
# MSG91_OTP_TEMPLATE_ID=

# Payments. Test keys start rzp_test_, live keys rzp_live_. Webhook: https://hptestseries.in/api/razorpay/webhook
# with payment.captured, order.paid, payment.failed and the secret below.
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
CRON_SECRET=$(openssl rand -hex 24)

# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
EOF
  echo "Created deploy/.env.production and deploy/.env.db"
fi

docker compose up -d db
docker compose --profile tools build migrate
docker compose --profile tools run --rm migrate
docker compose build app
docker compose up -d app

for i in $(seq 1 30); do
  if curl -fsS -o /dev/null http://127.0.0.1:3030/; then
    echo "App is up on 127.0.0.1:3030"
    # Payment reconcile (every 15 min) and daily emails (7 pm IST); only adds lines that are missing.
    bash install-cron.sh || echo "Could not set the cron jobs; run: bash deploy/install-cron.sh" >&2
    exit 0
  fi
  sleep 2
done
echo "App did not respond; check: docker compose -p hptestseries logs app" >&2
exit 1
