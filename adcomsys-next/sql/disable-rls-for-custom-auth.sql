-- ============================================================================
-- Update RLS Policies for Custom JWT Auth
-- ============================================================================
-- Since we're no longer using Supabase auth, we need to disable RLS
-- or update policies to work without auth.uid()
-- ============================================================================

-- OPTION 1: Disable RLS on profiles table (simpler for custom auth)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- OPTION 2: If you want to keep RLS, you'll need to implement custom policies
-- that don't rely on auth.uid(). This is more complex and requires
-- passing user IDs through your application layer.

-- For now, let's disable RLS on all tables to make custom auth work:
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE paper_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE payment_verifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE speakers DISABLE ROW LEVEL SECURITY;
ALTER TABLE committee_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE important_dates DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Note: With RLS disabled, you MUST handle authorization in your application code
-- The middleware and API routes should check user permissions
