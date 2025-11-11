-- ============================================================================
-- Create Profile Records for Manually Created Users
-- ============================================================================
-- Run this AFTER creating users in Supabase Dashboard
-- This will create profile records for users that don't have them yet
-- ============================================================================

-- Insert profile for author@test.com
INSERT INTO profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  'Test Author',
  'author'
FROM auth.users 
WHERE email = 'author@test.com'
  AND NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.users.id)
ON CONFLICT (id) DO UPDATE
SET role = 'author', full_name = 'Test Author';

-- Insert profile for reviewer@test.com  
INSERT INTO profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  'Test Reviewer',
  'reviewer'
FROM auth.users 
WHERE email = 'reviewer@test.com'
  AND NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.users.id)
ON CONFLICT (id) DO UPDATE
SET role = 'reviewer', full_name = 'Test Reviewer';

-- Insert profile for admin@test.com
INSERT INTO profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  'Test Admin',
  'admin'
FROM auth.users 
WHERE email = 'admin@test.com'
  AND NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.users.id)
ON CONFLICT (id) DO UPDATE
SET role = 'admin', full_name = 'Test Admin';

-- Verify users and profiles were created
SELECT 
  u.email,
  u.email_confirmed_at,
  p.full_name,
  p.role,
  p.created_at as profile_created
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE u.email IN ('author@test.com', 'reviewer@test.com', 'admin@test.com')
ORDER BY u.email;
