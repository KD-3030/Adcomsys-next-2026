-- Quick Database Status Check
-- Run this in Supabase SQL Editor to verify if seed data exists

-- Check if profiles table has any users
SELECT 
  'Total Users' as check_type,
  COUNT(*) as count
FROM profiles;

-- Check if admin user exists
SELECT 
  'Admin User Exists' as check_type,
  COUNT(*) as count
FROM profiles
WHERE email = 'admin@adcomsys.com';

-- Check if admin has password hash
SELECT 
  'Admin Has Password Hash' as check_type,
  CASE 
    WHEN password_hash IS NOT NULL THEN 'YES'
    ELSE 'NO'
  END as status,
  email,
  full_name,
  role
FROM profiles
WHERE email = 'admin@adcomsys.com';

-- List all users if they exist
SELECT 
  id,
  email,
  full_name,
  role,
  CASE 
    WHEN password_hash IS NOT NULL THEN 'Has Password'
    ELSE 'No Password'
  END as password_status,
  created_at
FROM profiles
ORDER BY role, email;
