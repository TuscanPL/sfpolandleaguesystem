CREATE POLICY "Enable read access for all users" ON "public"."league_admins"
AS PERMISSIVE FOR SELECT
TO public
USING (true)