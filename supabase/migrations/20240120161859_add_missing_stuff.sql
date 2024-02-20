alter table "public"."league_matches" alter column "match_status" drop default;

alter type "public"."match_status" rename to "match_status__old_version_to_be_dropped";

create type "public"."match_status" as enum ('upcoming', 'completed', 'canceled', 'in_progress');

alter table "public"."league_matches" alter column match_status type "public"."match_status" using match_status::text::"public"."match_status";

drop type "public"."match_status__old_version_to_be_dropped";

alter table "public"."league_matches" alter column "match_status" set default 'upcoming'::match_status;

create policy "Admins can do anything"
on "public"."league_matches"
as permissive
for all
to public
using ((auth.uid() IN ( SELECT league_admins.admin_userid
   FROM league_admins)))
with check ((auth.uid() IN ( SELECT league_admins.admin_userid
   FROM league_admins)));