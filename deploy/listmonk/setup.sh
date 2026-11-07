#!/usr/bin/env bash
# Install / update Listmonk on the VPS. Run on the server:  bash /root/hptestseries/deploy/listmonk/setup.sh
# First run creates deploy/listmonk/.env with a random DB password and admin login (never committed) and prints
# the admin login once. Later runs pull the newer image and restart.
set -euo pipefail
cd "$(dirname "$0")"
export COMPOSE_PROJECT_NAME=listmonk

if [ ! -f .env ]; then
  db_pw=$(openssl rand -hex 24)
  admin_pw=$(openssl rand -base64 18 | tr -d '/+=')
  umask 077
  cat > .env <<EOF
POSTGRES_PASSWORD=${db_pw}
LISTMONK_db__password=${db_pw}
# Only used on the very first boot to create the admin; change it in the UI afterwards.
LISTMONK_ADMIN_USER=admin
LISTMONK_ADMIN_PASSWORD=${admin_pw}
EOF
  echo "Created deploy/listmonk/.env"
  echo "Listmonk admin login: admin / ${admin_pw}"
fi

docker compose pull
docker compose up -d

for i in $(seq 1 30); do
  if curl -fsS -o /dev/null http://127.0.0.1:9100/health; then
    echo "Listmonk is up on 127.0.0.1:9100"
    exit 0
  fi
  sleep 2
done
echo "Listmonk did not respond; check: docker compose -p listmonk logs app" >&2
exit 1
