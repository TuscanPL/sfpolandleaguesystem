CREATE POLICY "Admins can do anything" ON "public"."leagues"
AS PERMISSIVE FOR ALL
TO public
USING ((auth.uid() in (select admin_userid from league_admins)))
WITH CHECK ((auth.uid() in (select admin_userid from league_admins)))