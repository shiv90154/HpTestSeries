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
# MSG91_AUTH_KEY=
# MSG91_OTP_TEMPLATE_ID=
EOF
  echo "Created deploy/.env.production and deploy/.env.db"
fi

docker compose up -d db
docker compose --profile tools build migrate
docker compose --profile tools run --rm migrate
docker compose build app
docker compose up -d app

for i in $(seq 1 30); do
  if curl -fsS -o /dev/null http://127.0.0.1:3030/; then echo "App is up on 127.0.0.1:3030"; exit 0; fi
  sleep 2
done
echo "App did not respond; check: docker compose -p hptestseries logs app" >&2
exit 1
