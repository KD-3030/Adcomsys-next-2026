-- ============================================================================
-- Complete Migration for Custom JWT Auth
-- ============================================================================
-- Run this entire script in Supabase SQL Editor
-- ============================================================================

-- Step 1: Add password_hash column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Step 2: Remove foreign key constraint to auth.users
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Step 3: Disable Row Level Security (RLS)
-- Since we're not using Supabase Auth, we can't use auth.uid() in policies
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE paper_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE payment_verifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE speakers DISABLE ROW LEVEL SECURITY;
ALTER TABLE committee_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE important_dates DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs DISABLE ROW LEVEL SECURITY;

-- Verify changes
SELECT 'Password column added' as status
WHERE EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'password_hash'
);

SELECT 'Foreign key removed' as status
WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'profiles' 
    AND constraint_name = 'profiles_id_fkey'
);

SELECT 'RLS disabled on ' || tablename as status
FROM pg_tables
WHERE schemaname = 'public' 
AND rowsecurity = false
ORDER BY tablename;

-- Done! Your database is now ready for custom JWT authentication
