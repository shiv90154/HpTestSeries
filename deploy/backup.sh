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
