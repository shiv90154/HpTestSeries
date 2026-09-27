#!/usr/bin/env bash
# Daily database backup (run from root's crontab). Keeps the last 14 days in /root/backups/hptestseries.
set -euo pipefail
dir=/root/backups/hptestseries
mkdir -p "$dir"
docker exec hptestseries-db-1 sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom' > "$dir/hptestseries-$(date +%F).dump"
find "$dir" -name 'hptestseries-*.dump' -mtime +14 -delete
