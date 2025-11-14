# 🚀 Week 1 Sprint Plan - AdComSys 2026

**Team Size**: 4 developers  
**Timeline**: 7 days  
**Goal**: Functional Next.js app with auth, content migration, and basic features

---

## 📋 Day 1: Setup & Foundation

### Morning (All Team - 2-3 hours)

**Setup Checklist:**
- [ ] Initialize Next.js project
- [ ] Setup Supabase project
- [ ] Configure environment variables
- [ ] Install all dependencies
- [ ] Create folder structure
- [ ] Setup Git repository and branches

**Commands to Run:**
```bash
# Create Next.js project
npx create-next-app@latest adcomsys-2026-fullstack --typescript --tailwind --app --src-dir --import-alias "@/*"

cd adcomsys-2026-fullstack

# Install core dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install react-hook-form @hookform/resolvers zod
npm install resend react-email @react-email/components
npm install axios date-fns clsx tailwind-merge
npm install next-seo next-sitemap
npm install framer-motion
npm install sonner
npm install @vercel/analytics

# Install shadcn/ui
npx shadcn-ui@latest init

# Add shadcn components (run these one by one)
npx shadcn-ui@latest add button card input label form table dialog alert badge avatar dropdown-menu select textarea toast

# Dev tools
npm install -D prettier eslint-config-prettier
npm install -D @types/node
```

### Afternoon: Parallel Work Begins

---

## 👤 Person 1 (Lead): Authentication System

### Day 1 Afternoon
- [ ] Create Supabase Auth configuration
- [ ] Setup middleware for protected routes
- [ ] Create auth utility functions
- [ ] Setup rate limiting (using Upstash Redis or simple in-memory)

### Day 2
- [ ] Build Login page (minimalistic)
- [ ] Build Signup page (with role selection)
- [ ] Implement rate limiting on auth endpoints
- [ ] Test authentication flow

### Day 3
- [ ] Create password reset flow
- [ ] Email verification setup
- [ ] Session management
- [ ] Auth error handling

### Day 4
- [ ] Role-based access control middleware
- [ ] Protected route components
- [ ] Auth context provider
- [ ] Documentation

### Day 5-7
- [ ] Help team with integration
- [ ] Code review
- [ ] Testing auth flows
- [ ] Bug fixes

**Files to Create:**
```
src/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── auth/
│   │   ├── config.ts
│   │   ├── rate-limit.ts
│   │   └── utils.ts
├── middleware.ts
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forgot-password/page.tsx
```

---

## 🎨 Person 2: Frontend Migration

### Day 1 Afternoon
- [ ] Copy assets from old project to `/public`
- [ ] Copy shadcn/ui components
- [ ] Create layout components (Header, Footer)
- [ ] Setup global styles

### Day 2
- [ ] Migrate Homepage (Dashboard.jsx → page.tsx)
- [ ] Migrate About UEM page
- [ ] Create basic navigation

### Day 3
- [ ] Migrate Committee pages (3 pages)
- [ ] Migrate Important Dates page
- [ ] Migrate Call for Papers page

### Day 4
- [ ] Migrate Keynote Speakers page
- [ ] Migrate Events page
- [ ] Migrate Contact page

### Day 5
- [ ] Create user dashboard pages
- [ ] Create admin dashboard layout
- [ ] Create reviewer dashboard layout

### Day 6-7
- [ ] Responsive testing
- [ ] Cross-browser testing
- [ ] Fix styling issues
- [ ] Add loading states

**Files to Create:**
```
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx (homepage)
│   │   ├── about-uem/page.tsx
│   │   ├── committee/
│   │   │   ├── organizing/page.tsx
│   │   │   ├── technical/page.tsx
│   │   │   └── advisory/page.tsx
│   │   ├── authors/
│   │   │   ├── call-for-papers/page.tsx
│   │   │   ├── important-dates/page.tsx
│   │   │   └── submission/page.tsx
│   │   ├── keynote-speakers/page.tsx
│   │   ├── events/page.tsx
│   │   └── contact/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── profile/page.tsx
│   │   └── submissions/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
```

---

## 🗄️ Person 3: Database & Backend

### Day 1 Afternoon
- [ ] Design simplified database schema
- [ ] Create profiles table
- [ ] Create submissions tracking table
- [ ] Create payment verification table

### Day 2
- [ ] Create all database tables in Supabase
- [ ] Setup Row Level Security policies
- [ ] Create database functions
- [ ] Generate TypeScript types

### Day 3
- [ ] Create content tables (events, speakers, committee, dates)
- [ ] Migrate existing content to database
- [ ] Setup storage buckets for files
- [ ] Test database queries

### Day 4
- [ ] Create API routes for public content
- [ ] Create API routes for user profile
- [ ] Create API route for payment screenshot upload
- [ ] Create API route for CMT profile linking

### Day 5
- [ ] Create admin API routes
- [ ] Create reviewer API routes
- [ ] API documentation
- [ ] Testing

### Day 6-7
- [ ] Optimize queries
- [ ] Add indexes
- [ ] Security audit
- [ ] Performance testing

**Database Schema (Simplified):**
```sql
-- profiles (extends auth.users)
-- paper_submissions (tracking only, not full submission)
-- payment_verifications (screenshot + admin verification)
-- events (from database)
-- speakers (from database)
-- committee_members (from database)
-- important_dates (from database)
-- contact_submissions
-- admin_logs
```

**Files to Create:**
```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.ts
│   │   │   └── login/route.ts
│   │   ├── profile/route.ts
│   │   ├── submissions/
│   │   │   ├── route.ts (GET, POST)
│   │   │   └── [id]/route.ts
│   │   ├── payments/
│   │   │   ├── upload/route.ts
│   │   │   └── verify/route.ts
│   │   ├── public/
│   │   │   ├── events/route.ts
│   │   │   ├── speakers/route.ts
│   │   │   └── dates/route.ts
│   │   └── admin/
│   │       ├── users/route.ts
│   │       └── verifications/route.ts
├── types/
│   └── database.types.ts
```

---

## 📧 Person 4: Email & File Upload

### Day 1 Afternoon
- [ ] Setup Resend account
- [ ] Create email templates (React Email)
- [ ] Test email sending

### Day 2
- [ ] Create welcome email template
- [ ] Create submission confirmation email
- [ ] Create payment verification email
- [ ] Test all templates

### Day 3
- [ ] Integrate email with signup flow
- [ ] Create email sending utilities
- [ ] Add email to submission tracking
- [ ] Error handling

### Day 4
- [ ] Setup Supabase Storage for payment screenshots
- [ ] Create file upload component
- [ ] Create image preview component
- [ ] File validation (size, type)

### Day 5
- [ ] Create payment verification admin page
- [ ] Image viewer for admins
- [ ] Approve/reject workflow
- [ ] Email notifications on verification

### Day 6-7
- [ ] Test file uploads
- [ ] Test email deliverability
- [ ] Edge case handling
- [ ] Documentation

**Files to Create:**
```
src/
├── lib/
│   ├── email/
│   │   ├── resend.ts
│   │   ├── templates/
│   │   │   ├── welcome.tsx
│   │   │   ├── submission-confirmation.tsx
│   │   │   └── payment-verified.tsx
│   │   └── send.ts
│   ├── storage/
│   │   └── upload.ts
├── components/
│   ├── forms/
│   │   └── PaymentUploadForm.tsx
│   └── admin/
│       └── PaymentVerification.tsx
```

---

## 📊 Daily Standup Schedule

**Time**: 9:00 AM (15 mins)
- What did you complete yesterday?
- What will you work on today?
- Any blockers?

**Time**: 5:00 PM (15 mins)
- What did you complete today?
- Push code to Git
- Plan for tomorrow

---

## 🔀 Git Branch Strategy

```
main
├── dev
│   ├── feature/auth-system (Person 1)
│   ├── feature/frontend-migration (Person 2)
│   ├── feature/database-setup (Person 3)
│   └── feature/email-upload (Person 4)
```

**Daily Workflow:**
1. Pull latest `dev` branch
2. Work on your feature branch
3. Commit frequently with clear messages
4. Push at end of day
5. Create PR to `dev` when feature complete

---

## ✅ End of Week Goals

By Day 7 (Sunday), we should have:

### ✅ **Completed Features**
- [x] User authentication (login/signup) with rate limiting
- [x] 4 user roles (Guest, Author, Reviewer, Admin)
- [x] All public pages migrated to Next.js
- [x] Content moved to Supabase database
- [x] Payment screenshot upload system
- [x] Email notifications (onboarding, submission)
- [x] Basic admin verification panel
- [x] CMT profile linking (manual field)
- [x] Responsive design preserved
- [x] SEO basics (meta tags, sitemap)

### 🚀 **Ready for Next Sprint**
- [ ] Advanced admin dashboard
- [ ] Reviewer workflow
- [ ] Enhanced SEO
- [ ] Performance optimization
- [ ] Deployment preparation

---

## 🛠️ Essential Environment Variables

Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=AdComSys 2026

# Resend
RESEND_API_KEY=re_xxxx

# CMT (just URL for linking)
NEXT_PUBLIC_CMT_URL=https://cmt3.research.microsoft.com/AdComSys2025

# Admin
ADMIN_EMAIL=adcomsys@uem.edu.in

# Rate Limiting (optional - use Upstash Redis)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## 📝 Code Standards

### Naming Conventions
- **Files**: PascalCase for components (`Header.tsx`), kebab-case for pages (`about-uem/page.tsx`)
- **Components**: PascalCase (`UserProfile`)
- **Functions**: camelCase (`getUserProfile`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)

### Commit Messages
```
feat: add user authentication
fix: resolve login redirect issue
style: update header styling
refactor: simplify database queries
docs: update API documentation
```

### Code Review Checklist
- [ ] TypeScript types defined
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Responsive design checked
- [ ] Console logs removed
- [ ] Comments for complex logic
- [ ] Security considerations addressed

---

## 🚨 Common Issues & Solutions

### Issue 1: Supabase Auth Not Working
**Solution**: Check middleware.ts and ensure cookies are handled correctly

### Issue 2: TypeScript Errors
**Solution**: Run `npx supabase gen types typescript` to regenerate types

### Issue 3: Styling Conflicts
**Solution**: Ensure Tailwind classes don't conflict, use `cn()` utility

### Issue 4: Email Not Sending
**Solution**: Check Resend API key and verify domain in Resend dashboard

### Issue 5: File Upload Fails
**Solution**: Check Supabase storage bucket policies and CORS settings

---

## 📞 Communication Channels

- **Daily Updates**: Slack/Discord
- **Code Issues**: GitHub Issues
- **Quick Questions**: Team chat
- **Blockers**: Immediately notify team lead

---

## 🎯 Success Metrics

### By End of Week
- ✅ All team members can login/signup
- ✅ All public pages viewable
- ✅ Content loads from database
- ✅ Payment upload works
- ✅ Emails send successfully
- ✅ Zero critical bugs
- ✅ Mobile responsive
- ✅ Lighthouse score > 80

---

**Let's build something amazing! 🚀**
