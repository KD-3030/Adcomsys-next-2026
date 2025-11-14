# 🧪 Testing Your Authentication System

## ✅ Your Auth System is Now Live!

All authentication files have been created. Your dev server is running at:
**http://localhost:3000**

---

## 📋 Testing Checklist

### Test 1: Signup Flow (5 minutes)

1. **Open signup page**: http://localhost:3000/signup

2. **Create a test account**:
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Password: `Test1234`
   - Role: Select `Author`
   - Click "Create account"

3. **Expected Result**:
   - Green toast message: "Account created! Please check your email to verify."
   - Redirected to `/login` page

4. **Verify in Supabase**:
   - Go to https://supabase.com/dashboard/project/pacmuptvseskbjqzyxlc/auth/users
   - You should see your new user listed
   - Go to https://supabase.com/dashboard/project/pacmuptvseskbjqzyxlc/editor
   - Click on `profiles` table
   - You should see the profile entry

---

### Test 2: Login Flow (3 minutes)

1. **Go to login page**: http://localhost:3000/login

2. **Login with test account**:
   - Email: `test@example.com`
   - Password: `Test1234`
   - Click "Sign in"

3. **Expected Result**:
   - Green toast message: "Logged in successfully!"
   - Redirected to `/dashboard`
   - See welcome message with your name
   - See 4 cards: My Submissions, Payment Status, Profile, Submit to CMT

---

### Test 3: Protected Route (2 minutes)

1. **Open new incognito/private window**

2. **Try to access dashboard directly**: http://localhost:3000/dashboard

3. **Expected Result**:
   - Automatically redirected to `/login`
   - This proves the middleware is protecting routes ✅

---

### Test 4: Sign Out (1 minute)

1. **From dashboard**, click "Sign out" button (top right)

2. **Expected Result**:
   - Redirected to `/login` page
   - Try accessing `/dashboard` again
   - Should redirect to `/login` (you're logged out)

---

### Test 5: Role-Based Features (3 minutes)

1. **Create another account with Reviewer role**:
   - Go to `/signup`
   - Email: `reviewer@example.com`
   - Password: `Reviewer123`
   - Role: Select `Reviewer`

2. **Login as reviewer**

3. **Expected Result**:
   - Dashboard shows blue "Reviewer Dashboard" card
   - Regular author cards still visible

4. **Create admin account manually in Supabase**:
   - Go to Supabase → Table Editor → `profiles`
   - Find your first test user
   - Edit the `role` column to `admin`
   - Login with that account

5. **Expected Result**:
   - Dashboard shows purple "Admin Panel" card

---

## 🎯 If Everything Works

✅ **Congratulations!** Your authentication system is working perfectly!

**You now have**:
- ✅ User signup with role selection
- ✅ Email/password login
- ✅ Protected routes (middleware working)
- ✅ User dashboard with personalized content
- ✅ Role-based UI (Author, Reviewer, Admin)
- ✅ Sign out functionality
- ✅ Toast notifications
- ✅ Proper redirects

---

## 🐛 Troubleshooting

### Problem: "Invalid login credentials"
**Solution**: 
- Check Supabase Auth dashboard for the user
- User might need email verification (check Supabase Auth settings)
- Try resetting password in Supabase

### Problem: Dashboard shows error or blank
**Solution**:
- Check browser console (F12) for errors
- Verify `profiles` table has the user entry
- Check `.env.local` has correct Supabase keys

### Problem: Signup creates user but no profile
**Solution**:
- Check Supabase logs (Logs & Analytics)
- Verify RLS policies are correct
- Check if `profiles` table exists

### Problem: Sign out doesn't work
**Solution**:
- Check browser console for errors
- Try clearing cookies and cache
- Restart dev server

---

## 📝 Next Steps After Testing

Once all tests pass, you're ready to move to **Phase 2**:

### Phase 2: Migrate Homepage (Next 3 hours)

1. **Copy old React components**:
   - Find your old project's `Header.jsx` and `Footer.jsx`
   - Copy content from `Dashboard.jsx` (homepage)

2. **Create new Next.js components**:
   - `src/components/layout/Header.tsx`
   - `src/components/layout/Footer.tsx`
   - `src/app/(public)/page.tsx`

3. **Preserve the design**:
   - Keep same colors, fonts, spacing
   - Make sure it looks exactly like before
   - Test responsive design

Would you like me to help you with homepage migration next?

---

## 📊 Current Progress

**Completed** ✅:
- [x] Project setup
- [x] Supabase configuration
- [x] Database schema deployed
- [x] Auth pages (login/signup)
- [x] Dashboard page
- [x] Protected routes
- [x] Sign out functionality
- [x] Role-based UI

**Next** 🔄:
- [ ] Homepage migration
- [ ] Header/Footer components
- [ ] Public pages
- [ ] API routes
- [ ] Email notifications

---

**Test everything above, then let me know how it goes!** 🚀
