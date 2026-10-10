#!/usr/bin/env bash
# Adds this app's cron jobs to root's crontab if they are missing. Run by deploy.sh; safe to run again.
# The VPS is shared with other apps: every existing crontab line is kept exactly as it is, and ours are only appended.
set -euo pipefail
dir=$(cd "$(dirname "$0")" && pwd)
log=/var/log/hptestseries-cron.log

# 7 pm India time is 13:30 UTC; shift it by the server's own UTC offset (date +%z, e.g. +0000 or +0530).
off=$(date +%z)
sign=1
if [ "${off:0:1}" = "-" ]; then sign=-1; fi
off_min=$((sign * (10#${off:1:2} * 60 + 10#${off:3:2})))
local_min=$(((13 * 60 + 30 + off_min + 1440) % 1440))
email_time="$((local_min % 60)) $((local_min / 60))"

current=$(crontab -l 2>/dev/null || true)
add=""
if ! grep -qE 'api/cron/reconcile|cron-call\.sh"? reconcile' <<<"$current"; then
  # Every 15 minutes: recovers payments that both the browser callback and the webhook missed. Only errors are logged.
  add+="*/15 * * * * bash \"$dir/cron-call.sh\" reconcile > /dev/null 2>> $log # hptestseries"$'\n'
fi
if ! grep -qE 'api/cron/emails|cron-call\.sh"? emails' <<<"$current"; then
  # Daily reminder and offer emails (see /admin/emails).
  add+="$email_time * * * bash \"$dir/cron-call.sh\" emails >> $log 2>&1 # hptestseries"$'\n'
fi

if [ -z "$add" ]; then
  echo "Cron jobs already set."
  exit 0
fi
{
  if [ -n "$current" ]; then printf '%s\n' "$current"; fi
  printf '%s' "$add"
} | crontab -
echo "Added to root's crontab (log: $log):"
printf '%s' "$add"
