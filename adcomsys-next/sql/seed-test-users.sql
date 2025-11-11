-- ============================================================================
-- IMPORTANT: Cannot directly insert into auth.users via SQL
-- ============================================================================
-- Supabase protects the auth.users table from direct SQL inserts.
-- You have TWO options to create test users:
--
-- OPTION 1: Use the signup page (after waiting for rate limit to reset)
-- OPTION 2: Use Supabase Dashboard to manually create users
--
-- ============================================================================

-- After creating users via signup or dashboard, run this to verify:
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- Check if profiles were created
SELECT 
  p.email,
  p.full_name,
  p.role,
  p.created_at
FROM profiles p
ORDER BY p.created_at DESC
LIMIT 10;
