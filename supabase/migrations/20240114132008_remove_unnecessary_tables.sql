-- This migration removes unnecessary tables
-- Drop tables if they exist
DROP TABLE IF EXISTS public.characters CASCADE;
DROP TABLE IF EXISTS public.matchdetails CASCADE;
DROP TABLE IF EXISTS public.matches CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;