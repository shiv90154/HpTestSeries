#!/usr/bin/env bash
# Daily database backup (run from root's crontab). Keeps the last 14 days in /root/backups/hptestseries.
set -euo pipefail
umask 077 # dumps contain personal data
dir=/root/backups/hptestseries
mkdir -p "$dir"
docker exec hptestseries-db-1 sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom' > "$dir/hptestseries-$(date +%F).dump"
find "$dir" -name 'hptestseries-*.dump' -mtime +14 -delete
# Uploaded images (question diagrams, blog covers) live in the app's volume, not the database.
docker exec hptestseries-app-1 tar -C /app -czf - uploads > "$dir/hptestseries-uploads-$(date +%F).tgz"
find "$dir" -name 'hptestseries-uploads-*.tgz' -mtime +14 -delete
# Listmonk (subscribers, campaigns), once deploy/listmonk/setup.sh has run.
if docker ps --format '{{.Names}}' | grep -qx listmonk-db-1; then
  docker exec listmonk-db-1 pg_dump -U listmonk -d listmonk --format=custom > "$dir/listmonk-$(date +%F).dump"
  find "$dir" -name 'listmonk-*.dump' -mtime +14 -delete
fi
