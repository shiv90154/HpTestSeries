#!/usr/bin/env bash
# Syncs the app's students into Listmonk, one list per site ("HP Students", "PB Students", "RJ Students", made on
# first need). Runs daily from root's crontab (deploy/install-cron.sh); safe to run by hand any time:
#   bash /root/hptestseries/deploy/listmonk/sync.sh
#
# Consent follows the app's rule (offersAllowed in src/modules/email/rules.ts): a student gets offer mail unless
# they switched offers off. Both sides keep a timestamp of the latest decision, and the newer one wins:
#   - allowed in the app, not on the list yet            → added as confirmed
#   - switched off in the app after the list status      → unsubscribed in Listmonk
#   - turned back on in the app after a Listmonk unsub   → confirmed again
#   - unsubscribed / blocklisted in Listmonk later       → emailOffers switched off in the app (so the app's own
#                                                          offer mails stop as well)
# Students are never deleted from Listmonk. People added in Listmonk by hand (CSV import) are left alone.
# Talks to both Postgres containers directly: Listmonk's tables are its v6 schema (image pinned in docker-compose.yml).
set -euo pipefail
here=$(cd "$(dirname "$0")" && pwd)
app_dir=$(cd "$here/../.." && pwd)

exec 9> /tmp/listmonk-sync.lock
flock -n 9 || { echo "$(date -Is) listmonk sync: already running" >&2; exit 0; }

app_psql() { (cd "$app_dir" && docker compose exec -T db sh -c 'psql -X -q -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" "$@"' psql "$@"); }
lm_psql() { (cd "$here" && docker compose -p listmonk exec -T db psql -X -q -v ON_ERROR_STOP=1 -U listmonk -d listmonk "$@"); }

# Students with a real address, plus their consent. offers_at is empty when they never decided.
students=$(app_psql -c "copy (
  select lower(email), name, \"signupSite\", coalesce(district, ''), \"preferredLang\"::text,
         \"emailOffers\", coalesce(to_char(\"emailOffersAt\" at time zone 'UTC', 'YYYY-MM-DD\"T\"HH24:MI:SS.US\"Z\"'), '')
  from \"user\"
  where role = 'STUDENT' and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' and email !~* '@phone\.invalid$'
) to stdout with csv")

# One Listmonk session: load the students, work out the changes, print the app-side opt-outs as "OPTOUT,<email>"
# and a "SUMMARY,..." line.
out=$({
  cat <<'SQL'
create temp table app_users (email text, name text, site text, district text, lang text, offers boolean, offers_at text);
copy app_users from stdin with csv;
SQL
  printf '%s\n' "$students"
  printf '\\.\n'
  cat <<'SQL'
begin;
alter table app_users add column decided timestamptz, add column allowed boolean, add column list_id int;
update app_users set decided = nullif(offers_at, '')::timestamptz;
update app_users set allowed = offers or decided is null;

-- A list per site that has students.
insert into lists (uuid, name, type, optin, tags, description)
select gen_random_uuid(), upper(s.site) || ' Students', 'private', 'single', array['students', s.site],
       'Students registered on the ' || upper(s.site) || ' site. Kept in sync by deploy/listmonk/sync.sh.'
from (select distinct site from app_users) s
where not exists (select 1 from lists l where l.name = upper(s.site) || ' Students');
update app_users u set list_id = (select min(id) from lists l where l.name = upper(u.site) || ' Students');

-- Current Listmonk state per student and their site's list.
create temp table state as
select u.*, s.id as sub_id, s.status as sub_status, s.updated_at as sub_at, sl.status as sl_status, sl.updated_at as sl_at
from app_users u
left join subscribers s on lower(s.email) = u.email
left join subscriber_lists sl on sl.subscriber_id = s.id and sl.list_id = u.list_id;

-- Listmonk → app: unsubscribed or blocklisted there after the student's last decision in the app.
create temp table optouts as
select email from state
where allowed and (
  (sl_status = 'unsubscribed' and sl_at > coalesce(decided, '-infinity'))
  or (sub_status = 'blocklisted' and sub_at > coalesce(decided, '-infinity'))
);

-- App → Listmonk.
insert into subscribers (uuid, email, name, attribs, status)
select gen_random_uuid(), email, name, jsonb_build_object('site', site, 'district', district, 'lang', lang), 'enabled'
from state where sub_id is null and allowed
on conflict do nothing;

update subscribers s
set name = u.name, attribs = s.attribs || jsonb_build_object('site', u.site, 'district', u.district, 'lang', u.lang)
from app_users u
where lower(s.email) = u.email
  and (s.name is distinct from u.name or not s.attribs @> jsonb_build_object('site', u.site, 'district', u.district, 'lang', u.lang));

create temp table added as
with ins as (
  insert into subscriber_lists (subscriber_id, list_id, status)
  select s.id, u.list_id, 'confirmed'
  from app_users u join subscribers s on lower(s.email) = u.email
  where u.allowed and u.email not in (select email from optouts)
  on conflict (subscriber_id, list_id) do nothing
  returning 1
) select count(*) n from ins;

create temp table reconfirmed as
with up as (
  update subscriber_lists sl set status = 'confirmed', updated_at = now()
  from state st
  where sl.subscriber_id = st.sub_id and sl.list_id = st.list_id
    and st.allowed and st.sl_status = 'unsubscribed' and st.decided > st.sl_at
  returning 1
) select count(*) n from up;

create temp table unsubscribed as
with up as (
  update subscriber_lists sl set status = 'unsubscribed', updated_at = now()
  from state st
  where sl.subscriber_id = st.sub_id and sl.list_id = st.list_id
    and not st.allowed and st.sl_status <> 'unsubscribed' and st.decided > st.sl_at
  returning 1
) select count(*) n from up;
commit;

\pset format unaligned
\pset tuples_only on
\pset fieldsep ','
select 'OPTOUT', email from optouts;
select 'SUMMARY', (select count(*) from app_users), (select n from added), (select n from reconfirmed),
       (select n from unsubscribed), (select count(*) from optouts);
SQL
} | lm_psql)

optouts=$(grep '^OPTOUT,' <<<"$out" | cut -d, -f2- || true)
if [ -n "$optouts" ]; then
  {
    echo "create temp table optouts (email text); copy optouts from stdin;"
    printf '%s\n' "$optouts"
    printf '\\.\n'
    echo "update \"user\" set \"emailOffers\" = false, \"emailOffersAt\" = now()
          where lower(email) in (select email from optouts) and (\"emailOffers\" or \"emailOffersAt\" is null);"
  } | app_psql
fi

IFS=, read -r _ total added reconfirmed unsubscribed optout_n <<<"$(grep '^SUMMARY,' <<<"$out")"
echo "$(date -Is) listmonk sync: ${total} students, ${added} added, ${reconfirmed} re-subscribed," \
  "${unsubscribed} unsubscribed, ${optout_n} opted out via Listmonk"
