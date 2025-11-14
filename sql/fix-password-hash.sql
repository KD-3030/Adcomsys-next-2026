-- ============================================================================
-- FIX PASSWORD HASH - Run this in Supabase SQL Editor
-- ============================================================================
-- This updates all test users with the correct password hash for "Test123!"
-- ============================================================================

-- Update all test users with correct password hash
UPDATE profiles
SET password_hash = '$2b$10$/djt08/8M97ksuY/eb9lf.F0yE1iufBv37hHTwzxCrGT9NuefZlBG', -- Test123!
    updated_at = NOW()
WHERE email IN (
  'admin@adcomsys.com',
  'author@adcomsys.com',
  'reviewer@adcomsys.com',
  'guest@adcomsys.com',
  'student@adcomsys.com',
  'industry@adcomsys.com'
);

-- Verify the update
SELECT 
  email,
  full_name,
  role,
  LEFT(password_hash, 10) as hash_start,
  updated_at
FROM profiles
WHERE email IN (
  'admin@adcomsys.com',
  'author@adcomsys.com',
  'reviewer@adcomsys.com',
  'guest@adcomsys.com',
  'student@adcomsys.com',
  'industry@adcomsys.com'
)
ORDER BY role;
