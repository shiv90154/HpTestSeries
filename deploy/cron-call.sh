#!/usr/bin/env bash
# Calls one of the app's cron endpoints with CRON_SECRET from deploy/.env.production. Used from root's crontab
# (see install-cron.sh). Usage: bash deploy/cron-call.sh emails|reconcile
set -euo pipefail
cd "$(dirname "$0")"

case "${1:-}" in
  emails | reconcile) ;;
  *) echo "Usage: $0 emails|reconcile" >&2; exit 2 ;;
esac

secret=$(grep '^CRON_SECRET=' .env.production | cut -d= -f2-)
if [ -z "$secret" ]; then
  echo "$(date -Is) CRON_SECRET is missing in deploy/.env.production" >&2
  exit 1
fi

# Straight to the app container's port, so it works even if DNS or nginx has a problem.
echo "$(date -Is) $1: $(curl -fsS -X POST -H "Authorization: Bearer $secret" "http://127.0.0.1:3030/api/cron/$1")"
