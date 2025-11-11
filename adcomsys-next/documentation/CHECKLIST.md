# ✅ Solo Developer Checklist

## Pre-Development Setup

- [x] Next.js project created
- [x] Dependencies installed
- [x] Folder structure created
- [x] Supabase project created
- [x] Supabase URL added to .env.local
- [x] Supabase ANON_KEY added to .env.local
- [ ] **TODO: Add SUPABASE_SERVICE_ROLE_KEY to .env.local**
- [x] Resend API key added
- [ ] **TODO: Deploy database schema to Supabase**
- [ ] **TODO: Create storage buckets in Supabase**

## How to Get SERVICE_ROLE_KEY

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: adcomsys-2026
3. Go to Settings (gear icon) → API
4. Scroll down to "Project API keys"
5. Find "service_role" key (marked as secret)
6. Click "Reveal" and copy it
7. Add to .env.local:
   ```
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (paste here)
   ```

## How to Deploy Database Schema

1. Go to Supabase dashboard
2. Click "SQL Editor" in left sidebar
3. Click "New query"
4. Open file: `supabase-schema.sql`
5. Copy entire content
6. Paste in SQL Editor
7. Click "Run" (or press Ctrl+Enter)
8. Wait for "Success" message
9. Verify tables created: Go to "Table Editor" and see all tables

## How to Create Storage Buckets

1. Go to Supabase dashboard
2. Click "Storage" in left sidebar
3. Click "Create new bucket"
4. Bucket 1:
   - Name: `avatars`
   - Public: No
   - Click "Create bucket"
5. Bucket 2:
   - Name: `payment-screenshots`
   - Public: No
   - Click "Create bucket"

---

## Phase 1: Authentication (Today - 3 hours)

- [ ] Add service role key to .env.local
- [ ] Deploy database schema
- [ ] Create storage buckets
- [ ] Create login page (`src/app/(auth)/login/page.tsx`)
- [ ] Create signup page (`src/app/(auth)/signup/page.tsx`)
- [ ] Create auth layout (`src/app/(auth)/layout.tsx`)
- [ ] Update root layout with Toaster (`src/app/layout.tsx`)
- [ ] Create dashboard page (`src/app/(dashboard)/dashboard/page.tsx`)
- [ ] Create dashboard layout (`src/app/(dashboard)/layout.tsx`)
- [ ] Create signout API route (`src/app/api/auth/signout/route.ts`)
- [ ] Test signup flow
- [ ] Test login flow
- [ ] Test dashboard access
- [ ] Test signout

---

## Phase 2: Homepage Migration (Tomorrow - 3 hours)

- [ ] Create public layout (`src/app/(public)/layout.tsx`)
- [ ] Create Header component (`src/components/layout/Header.tsx`)
- [ ] Create Footer component (`src/components/layout/Footer.tsx`)
- [ ] Migrate homepage content (`src/app/(public)/page.tsx`)
- [ ] Copy old CSS styles
- [ ] Test responsive design
- [ ] Verify navigation works

---

## Phase 3: Public Pages (Day 3 - 4 hours)

- [ ] About UEM page
- [ ] Committee pages (Organizing, Technical, Advisory)
- [ ] Call for Papers page
- [ ] Important Dates page
- [ ] Keynote Speakers page
- [ ] Events page
- [ ] Contact page

---

## Phase 4: Database Content (Day 4 - 3 hours)

- [ ] Seed important dates
- [ ] Add speakers to database
- [ ] Add events to database
- [ ] Add committee members
- [ ] Create API routes for public content
- [ ] Update pages to fetch from database

---

## Phase 5: User Features (Day 5 - 4 hours)

- [ ] Profile page
- [ ] Paper submission tracking page
- [ ] Payment upload page
- [ ] Email notification on signup
- [ ] Email notification on submission

---

## Phase 6: Admin Panel (Day 6 - 4 hours)

- [ ] Admin dashboard
- [ ] User management
- [ ] Payment verification page
- [ ] Paper review assignment
- [ ] Admin authentication check

---

## Phase 7: Polish & Deploy (Day 7 - 3 hours)

- [ ] SEO optimization (meta tags)
- [ ] Add sitemap
- [ ] Add robots.txt
- [ ] Performance testing
- [ ] Mobile responsive check
- [ ] Deploy to Vercel
- [ ] Setup custom domain

---

## 🎯 Current Priority

**START HERE**: Complete all items in "Pre-Development Setup" section above, then move to Phase 1.

---

## 📝 Notes

- Work in focused 45-minute sessions with 15-min breaks
- Commit code every time you complete a checkbox item
- Test each feature before moving to the next
- Keep dev server running while working

---

**Last Updated**: [Current time]
**Status**: Pre-Development Setup
