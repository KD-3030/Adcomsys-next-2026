-- ============================================================================
-- Create Admin User
-- ============================================================================
-- Run this script in Supabase SQL Editor to promote a user to admin role
-- ============================================================================

-- Method 1: Promote existing user by email
UPDATE profiles 
SET role = 'admin', updated_at = NOW()
WHERE email = 'your-email@example.com';

-- Method 2: Promote existing user by ID
UPDATE profiles 
SET role = 'admin', updated_at = NOW()
WHERE id = 'user-uuid-here';

-- Method 3: Check current admin users
SELECT id, name, email, role, created_at
FROM profiles
WHERE role = 'admin'
ORDER BY created_at DESC;

-- Method 4: Create a new admin user directly (if needed)
-- Note: You still need to hash the password, so it's better to sign up first, then promote
-- INSERT INTO profiles (id, name, email, role, password_hash, created_at, updated_at)
-- VALUES (
--   gen_random_uuid(),
--   'Admin Name',
--   'admin@example.com',
--   'admin',
--   'hashed-password-here', -- Use bcrypt to hash password first
--   NOW(),
--   NOW()
-- );

-- Verify the change
SELECT id, name, email, role 
FROM profiles 
WHERE role = 'admin';

-- ============================================================================
-- Notes:
-- 1. Replace 'your-email@example.com' with your actual email
-- 2. The user must exist in the profiles table first (sign up through the app)
-- 3. After running this, the user will have access to /admin routes
-- 4. Keep admin credentials secure
-- ============================================================================
