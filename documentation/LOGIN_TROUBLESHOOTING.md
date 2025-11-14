# 🔧 LOGIN TROUBLESHOOTING GUIDE

## Issue: Cannot Login with Test Credentials

**Test Credentials:**
- Email: `admin@adcomsys.com`
- Password: `Test123!`

---

## ✅ STEP 1: Verify Database Has Been Seeded

### **MOST LIKELY ISSUE:** The seed script hasn't been run yet!

Run this check in your Supabase SQL Editor:

1. **Open Supabase Dashboard**: https://supabase.com/dashboard
2. **Go to**: SQL Editor
3. **Run**: `sql/check-database-status.sql`

```sql
-- Quick check - paste this in Supabase SQL Editor:
SELECT COUNT(*) as total_users FROM profiles;
```

### Expected Results:
- **If count = 0**: ❌ **Database is empty - you need to run the seed script!**
- **If count = 6**: ✅ Database has been seeded

---

## ✅ STEP 2: Run Seed Script (If Database is Empty)

If Step 1 showed 0 users, follow these steps:

### A. Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard
2. Select your project: `pacmuptvseskbjqzyxlc`
3. Click: **SQL Editor** in left sidebar
4. Click: **New query**

### B. Execute Seed Script
1. **Open file**: `sql/seed-comprehensive-test-data.sql`
2. **Copy entire contents** (all 637 lines)
3. **Paste into Supabase SQL Editor**
4. **Click**: Run (or press Ctrl+Enter)
5. **Wait**: Should complete in 2-3 seconds

### C. Verify Seeding Worked
Run this query:
```sql
SELECT email, full_name, role FROM profiles ORDER BY role;
```

You should see 6 users:
- admin@adcomsys.com (Admin)
- author@adcomsys.com (Author)
- reviewer@adcomsys.com (Reviewer)
- guest@adcomsys.com (Guest)
- student@adcomsys.com (Student)
- industry@adcomsys.com (Industry Professional)

---

## ✅ STEP 3: Test Login Again

After seeding, try logging in:

1. **Navigate to**: http://localhost:3000/login
2. **Enter**:
   - Email: `admin@adcomsys.com`
   - Password: `Test123!`
3. **Click**: Login

**Should redirect to**: `/dashboard`

---

## ✅ STEP 4: Check Environment Variables (If Still Failing)

Verify your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://pacmuptvseskbjqzyxlc.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=d893dea45c190059e96701c6aec8585e
```

✅ **Already verified** - your environment is correctly configured!

---

## ✅ STEP 5: Restart Development Server

After seeding, restart your Next.js dev server:

```powershell
# Stop current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

---

## 🔍 Advanced Troubleshooting

### Check Browser Console for Errors

1. **Open browser DevTools**: F12 or Right-click → Inspect
2. **Go to Console tab**
3. **Attempt login**
4. **Look for errors** - common issues:
   - `Failed to fetch` → Server not running
   - `401 Unauthorized` → Database not seeded
   - `500 Internal Server Error` → Check terminal logs

### Check Server Logs

Watch your terminal where `npm run dev` is running:
- Look for error messages when you attempt login
- Common errors will show database connection issues

### Verify Password Hash Format

If seeded but still can't login, check password hash in database:

```sql
SELECT 
  email,
  LEFT(password_hash, 10) as hash_start,
  LENGTH(password_hash) as hash_length
FROM profiles 
WHERE email = 'admin@adcomsys.com';
```

**Expected**:
- hash_start: `$2a$10$eS7`
- hash_length: 60

---

## 📋 Quick Reference - All Test User Credentials

After seeding, you can login with ANY of these:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@adcomsys.com | Test123! |
| Author | author@adcomsys.com | Test123! |
| Reviewer | reviewer@adcomsys.com | Test123! |
| Guest | guest@adcomsys.com | Test123! |
| Student | student@adcomsys.com | Test123! |
| Industry | industry@adcomsys.com | Test123! |

**All passwords are the same**: `Test123!`

---

## ✅ Authentication Flow Overview

Understanding how login works:

1. **User submits** email + password → `/api/auth/login`
2. **API queries** Supabase → `profiles` table by email
3. **Checks** if user exists and has `password_hash`
4. **Verifies** password using bcrypt comparison
5. **Generates** JWT token with user info
6. **Sets** HTTP-only cookie
7. **Returns** success → redirect to `/dashboard`

---

## 🎯 Most Likely Solution

**90% of the time, the issue is:**

> Database hasn't been seeded yet! Run `sql/seed-comprehensive-test-data.sql` in Supabase SQL Editor.

After seeding:
1. Refresh your browser
2. Try login again with `admin@adcomsys.com` / `Test123!`
3. Should work immediately ✅

---

## 📞 Still Having Issues?

If login still fails after:
1. ✅ Confirming database is seeded
2. ✅ Restarting dev server
3. ✅ Clearing browser cache

Check:
1. Browser console errors (F12)
2. Terminal server logs
3. Supabase dashboard → Logs → Check for errors

Let me know what error messages you see!
