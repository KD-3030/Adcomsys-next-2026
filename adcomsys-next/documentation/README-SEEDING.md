# 🌱 Database Seeding Guide

## Quick Start

### Step 1: Run the Seed Script

1. Open your Supabase Dashboard
2. Go to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Open the file: `sql/seed-comprehensive-test-data.sql`
5. Copy the entire content
6. Paste into the SQL Editor
7. Click **Run** (or press `Ctrl+Enter`)
8. Wait for "Success" message

### Step 2: Verify Data

The script automatically runs verification queries at the end. You should see:

- ✅ 6 test users created (1 admin, 2 authors, 1 reviewer, 1 guest, 1 industry)
- ✅ 3 paper submissions
- ✅ 4 payment verifications (mixed statuses: pending/verified)
- ✅ 3 contact form submissions
- ✅ 3 keynote speakers
- ✅ 5 conference events
- ✅ 6 committee members
- ✅ 5 important dates

---

## 🔐 Test Login Credentials

Use these credentials to test different role permissions:

### Admin Account
```
Email: admin@adcomsys.com
Password: Test123!
```
**Access**: Full admin panel access, can manage all users, payments, etc.

### Author Account  
```
Email: author@adcomsys.com
Password: Test123!
```
**Access**: Submit papers, view own submissions, register for conference

### Reviewer Account
```
Email: reviewer@adcomsys.com
Password: Test123!
```
**Access**: Review assigned papers, view paper details

### Guest Account
```
Email: guest@adcomsys.com
Password: Test123!
```
**Access**: Register for conference, view public pages

### Student Account
```
Email: student@adcomsys.com
Password: Test123!
```
**Access**: Submit papers, student registration rates

### Industry Account
```
Email: industry@adcomsys.com
Password: Test123!
```
**Access**: Submit papers, industry registration rates

---

## 📊 What Gets Created

### Users (6 total)
- 1 Admin (full access)
- 2 Authors (Dr. Rajesh Kumar, Priya Patel)
- 1 Reviewer (Prof. Anita Sharma)
- 1 Guest (John Doe)
- 1 Industry (Michael Chen)

### Paper Submissions (3 total)
- **CMT-2026-0001**: Deep Learning for Network Security (under review)
- **CMT-2026-0002**: IoT Smart City Infrastructure (submitted)
- **CMT-2026-0003**: Blockchain in Healthcare (accepted)

### Payment Verifications (4 total)
- Student payment: ₹2,000 (pending)
- Academician payment: ₹3,000 (verified) ✅
- Industry payment: ₹5,000 (pending)
- Attendee payment: ₹1,500 (pending)

### Contact Submissions (3 total)
- Registration deadline inquiry (new)
- Sponsorship inquiry (new)
- Paper format question (responded)

### Speakers (3 total)
- Dr. Sunita Sarawagi (IIT Bombay)
- Prof. Andrew Ng (DeepLearning.AI)
- Dr. Fei-Fei Li (Stanford)

### Events (5 total)
- Inauguration Ceremony
- Welcome Reception
- Technical Paper Sessions
- Workshop on Emerging Technologies
- Gala Banquet Dinner

### Committee Members (6 total)
- 2 Organizing Committee members
- 2 Technical Committee members
- 2 Advisory Committee members

### Important Dates (5 total)
- Paper submission deadline
- Notification of acceptance
- Camera-ready submission
- Early bird registration
- Conference dates

---

## 🧪 Testing Admin Panel

After seeding, you can test:

### 1. Login as Admin
```
http://localhost:3000/login
Email: admin@adcomsys.com
Password: Test123!
```

### 2. Access Admin Panel
```
http://localhost:3000/admin
```

### 3. Test Features
- **Dashboard**: View statistics (6 users, 4 payments, 3 papers, 3 contacts)
- **Users**: See all 6 users, edit roles, search/filter
- **Payments**: 1 verified, 3 pending (test approve/reject)
- **Contacts**: 3 submissions (2 new, 1 responded)
- **Speakers**: Manage 3 keynote speakers
- **Events**: View/edit 5 conference events

---

## 🔄 Re-seeding

If you need to re-run the seed script:

The script uses `ON CONFLICT` and `DO UPDATE` for users, so it's **safe to run multiple times**. It will:
- ✅ Update existing users instead of creating duplicates
- ✅ Skip duplicate entries for other tables
- ✅ Not break foreign key constraints

---

## 🐛 Troubleshooting

### Error: "relation does not exist"
**Solution**: Run the main schema first:
```sql
-- Run this first:
sql/supabase-schema.sql

-- Then run:
sql/migrate-to-custom-auth.sql

-- Finally run:
sql/seed-comprehensive-test-data.sql
```

### Error: "password_hash column missing"
**Solution**: Run the migration script:
```sql
sql/migrate-to-custom-auth.sql
```

### Can't login with test credentials
**Verify**:
1. Password hash is correct (should be bcrypt with 10 rounds)
2. Check if user exists:
   ```sql
   SELECT email, name, role FROM profiles WHERE email = 'admin@adcomsys.com';
   ```

---

## 📝 Next Steps

After seeding:

1. ✅ Test login with all 6 accounts
2. ✅ Verify admin panel shows correct statistics
3. ✅ Test payment verification workflow
4. ✅ Test user management (edit/delete)
5. ✅ Test role-based access control
6. ⬜ Build remaining admin API routes
7. ⬜ Build remaining admin panel pages

---

## 🔐 Security Note

**IMPORTANT**: These are test credentials with a known password (`Test123!`).

Before deploying to production:
- ❌ Delete all test users
- ✅ Create real admin account with strong password
- ✅ Enable proper authentication middleware
- ✅ Implement rate limiting
- ✅ Add CSRF protection

---

## 📞 Support

If you encounter issues:
1. Check Supabase logs for errors
2. Verify all tables exist in Table Editor
3. Check that RLS is disabled (for custom JWT auth)
4. Ensure `password_hash` column exists in `profiles` table
