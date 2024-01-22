create type "public"."league_status" as enum ('draft', 'started', 'completed');

alter table "public"."league_sign_ups" drop constraint "league_sign_ups_discord_name_key";

alter table "public"."league_sign_ups" drop constraint "league_sign_ups_user_id_key";

drop index if exists "public"."league_sign_ups_discord_name_key";

drop index if exists "public"."league_sign_ups_user_id_key";

alter table "public"."league_admins" enable row level security;

alter table "public"."leagues" add column "status" league_status not null default 'draft'::league_status;