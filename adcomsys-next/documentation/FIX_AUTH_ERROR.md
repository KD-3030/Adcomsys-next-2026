# 🔧 Fix Authentication Error - Database Migration Required

## ❌ Current Error:
```
insert or update on table "profiles" violates foreign key constraint "profiles_id_fkey"
```

## 🔍 Root Cause:
The `profiles` table has a foreign key constraint to `auth.users` table, but we're using custom JWT auth now (not Supabase Auth). We're creating users directly in `profiles` table without creating entries in `auth.users`.

## ✅ Solution:
Run the migration SQL to:
1. Add `password_hash` column
2. Remove foreign key constraint 
3. Disable Row Level Security (RLS)

---

## 📋 Migration Steps:

### **Step 1: Open Supabase SQL Editor**
Go to: https://supabase.com/dashboard/project/pacmuptvseskbjqzyxlc/editor

### **Step 2: Copy This SQL** 
(Located in `migrate-to-custom-auth.sql`):

```sql
-- ============================================================================
-- Complete Migration for Custom JWT Auth
-- ============================================================================

-- Step 1: Add password_hash column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Step 2: Remove foreign key constraint to auth.users
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Step 3: Disable Row Level Security (RLS)
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
```

### **Step 3: Run the SQL**
- Paste all of it into SQL Editor
- Click **"Run"** button
- Wait for success message

### **Step 4: Verify Results**
You should see output like:
```
✓ Password column added
✓ Foreign key removed  
✓ RLS disabled on admin_logs
✓ RLS disabled on committee_members
✓ RLS disabled on contact_submissions
✓ RLS disabled on events
✓ RLS disabled on important_dates
✓ RLS disabled on paper_submissions
✓ RLS disabled on payment_verifications
✓ RLS disabled on profiles
✓ RLS disabled on speakers
```

---

## 🧪 Test Signup After Migration:

1. **Refresh the page**: http://localhost:3000/signup
2. **Create account**:
   - Email: `test@example.com`
   - Password: `password123`
   - Full Name: `Test User`
   - Role: `Author`
3. **Click "Create Account"**
4. **Should work now!** ✅

---

## 📝 What Changed:

### Before (Supabase Auth):
- `profiles.id` referenced `auth.users.id` (foreign key)
- Row Level Security used `auth.uid()` function
- Users created in `auth.users`, then `profiles`

### After (Custom JWT Auth):
- `profiles.id` is standalone UUID (no foreign key)
- Row Level Security disabled
- Users created directly in `profiles` table
- Authorization handled in application code (middleware/API routes)

---

## 🔒 Security Note:

**RLS is disabled** because custom JWT auth doesn't use `auth.uid()`. 

Authorization is now handled by:
- ✅ Middleware checks JWT token
- ✅ API routes verify user permissions
- ✅ Database queries filtered by user ID from JWT

This is still secure as long as you:
- ✅ Always verify JWT tokens
- ✅ Check user roles before operations
- ✅ Never trust client-side data

---

## 🚀 Once Migration Complete:

Your authentication will work perfectly:
- ✅ No rate limiting
- ✅ Instant account creation
- ✅ No email verification
- ✅ Full control over auth flow

**Run the migration now and test!** 🎉
