# 🚀 AdComSys 2026 - Setup Guide for Team

## ✅ Prerequisites Completed

- [x] Next.js project created
- [x] All dependencies installed
- [x] Folder structure created
- [x] Supabase client files created
- [x] Database schema SQL ready
- [x] Sprint plan documented

---

## 🎯 Next Steps for Team (Day 1 Afternoon)

### 1️⃣ **Setup Supabase Project (15 minutes)**

**Person 3 (Database Lead) - Do this first:**

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in / Create account
3. Click "New Project"
4. Fill in:
   - **Name**: `adcomsys-2026`
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Southeast Asia (Singapore) - closest to India
   - **Pricing Plan**: Free tier is perfect to start

5. Wait ~2 minutes for project to be created

6. Once ready, go to **Project Settings** > **API**
7. Copy these credentials:
   ```
   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbG...
   service_role key: eyJhbG... (KEEP SECRET!)
   ```

8. Create `.env.local` file in project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG... 
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=AdComSys 2026
   RESEND_API_KEY=re_xxxxx (get this later)
   NEXT_PUBLIC_CMT_URL=https://cmt3.research.microsoft.com/AdComSys2025
   ADMIN_EMAIL=adcomsys@uem.edu.in
   ```

9. In Supabase Dashboard, go to **SQL Editor**
10. Click "New Query"
11. Copy entire content of `supabase-schema.sql` file
12. Paste and click "Run"
13. Wait for success message ✅

14. Go to **Storage** in sidebar
15. Create two buckets:
    - `avatars` (for profile pictures)
    - `payment-screenshots` (for payment receipts)
16. For each bucket, set:
    - Public: No
    - File size limit: 5MB for avatars, 10MB for payment-screenshots

17. Generate TypeScript types:
    ```bash
    npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
    ```
    Replace `YOUR_PROJECT_ID` with your actual project ID from URL

---

### 2️⃣ **Setup Resend Email (10 minutes)**

**Person 4 (Email Lead) - Do this:**

1. Go to [https://resend.com](https://resend.com)
2. Sign up (free tier: 100 emails/day)
3. Verify your email
4. Go to **API Keys**
5. Create new API key
6. Copy the key (starts with `re_`)
7. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_key_here
   ```

8. In Resend dashboard:
   - Add domain (later when you have custom domain)
   - For now, you can send from `onboarding@resend.dev` (default)

---

### 3️⃣ **Copy Assets from Old Project (15 minutes)**

**Person 2 (Frontend Lead) - Do this:**

1. Locate your old project folder
2. Copy the entire `src/assets` folder
3. Paste into `adcomsys-next/public/` folder
4. Rename `assets` to match this structure:
   ```
   public/
   ├── images/
   ├── docs/
   ├── fonts/
   ├── icons/
   ├── events/
   └── logo.png
   ```

5. Also copy:
   - Header.css and Footer.css to `src/components/layout/`
   - Any global CSS to `src/app/globals.css`

---

### 4️⃣ **Initialize Git Repository (5 minutes)**

**Person 1 (Lead) - Do this:**

1. In project root:
   ```bash
   cd c:\Adcomsys-next-2026\adcomsys-next
   git init
   ```

2. Create `.gitignore` (should already exist, add these if missing):
   ```
   # dependencies
   /node_modules
   
   # next.js
   /.next/
   /out/
   
   # production
   /build
   
   # misc
   .DS_Store
   *.pem
   
   # debug
   npm-debug.log*
   
   # local env files
   .env*.local
   .env
   
   # vercel
   .vercel
   ```

3. Create branches:
   ```bash
   git checkout -b dev
   git checkout -b feature/auth-system
   git checkout dev
   git checkout -b feature/frontend-migration
   git checkout dev
   git checkout -b feature/database-setup
   git checkout dev
   git checkout -b feature/email-upload
   git checkout dev
   ```

4. Push to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/adcomsys-2026-fullstack.git
   git add .
   git commit -m "Initial project setup"
   git push -u origin dev
   ```

5. Each team member:
   ```bash
   git checkout feature/your-feature-name
   ```

---

### 5️⃣ **Verify Everything Works (10 minutes)**

**All team members:**

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)
3. You should see the default Next.js page
4. Check terminal for any errors
5. If errors, fix them before proceeding

---

## 📂 Project Structure Overview

```
adcomsys-next/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Public pages (no auth)
│   │   ├── (auth)/            # Auth pages (login, signup)
│   │   ├── (dashboard)/       # User dashboard (auth required)
│   │   ├── (admin)/           # Admin panel (admin only)
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   │
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Header, Footer, Nav
│   │   ├── forms/             # Form components
│   │   ├── admin/             # Admin components
│   │   └── public/            # Public components
│   │
│   ├── lib/
│   │   ├── supabase/          # Supabase clients
│   │   ├── auth/              # Auth utilities
│   │   ├── email/             # Email functions
│   │   ├── storage/           # File upload
│   │   └── validations/       # Zod schemas
│   │
│   ├── types/                 # TypeScript types
│   ├── hooks/                 # Custom hooks
│   └── config/                # Configuration
│
├── public/                    # Static files
│   ├── images/
│   ├── docs/
│   └── fonts/
│
├── .env.local                 # Environment variables (DO NOT COMMIT)
├── .env.example               # Example env file
├── middleware.ts              # Route protection
├── supabase-schema.sql        # Database schema
└── package.json               # Dependencies
```

---

## 👥 Team Member Tasks (Start Now!)

### **Person 1 (Lead): Authentication System**

**Files to create today:**

1. `src/lib/auth/config.ts` - Auth configuration
2. `src/lib/auth/rate-limit.ts` - Rate limiting (simple in-memory for now)
3. `src/lib/auth/utils.ts` - Auth helper functions
4. `src/app/(auth)/login/page.tsx` - Login page
5. `src/app/(auth)/signup/page.tsx` - Signup page

**Start with:**
```typescript
// src/lib/auth/config.ts
export const authConfig = {
  rateLimit: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  passwordRequirements: {
    minLength: 8,
    requireUppercase: true,
    requireNumber: true,
    requireSpecialChar: false,
  },
  sessionDuration: 7 * 24 * 60 * 60, // 7 days
}
```

---

### **Person 2 (Frontend): Page Migration**

**Files to create today:**

1. `src/components/layout/Header.tsx` - Migrate from old Header.jsx
2. `src/components/layout/Footer.tsx` - Migrate from old Footer.jsx
3. `src/app/(public)/page.tsx` - Homepage (migrate from Dashboard.jsx)
4. `src/app/(public)/layout.tsx` - Public layout with Header/Footer

**Start with:**
```typescript
// src/app/(public)/layout.tsx
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

---

### **Person 3 (Database): API Routes**

**Files to create today:**

1. `src/app/api/profile/route.ts` - Get/update user profile
2. `src/app/api/submissions/route.ts` - Get user submissions
3. `src/app/api/public/events/route.ts` - Get events from DB
4. `src/app/api/public/speakers/route.ts` - Get speakers from DB

**Start with:**
```typescript
// src/app/api/profile/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(profile)
}
```

---

### **Person 4 (Email/Upload): Email Setup**

**Files to create today:**

1. `src/lib/email/resend.ts` - Resend client
2. `src/lib/email/templates/welcome.tsx` - Welcome email
3. `src/lib/email/send.ts` - Email sending function
4. `src/lib/storage/upload.ts` - File upload utility

**Start with:**
```typescript
// src/lib/email/resend.ts
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

// src/lib/email/send.ts
import { resend } from './resend'

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AdComSys 2026 <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to AdComSys 2026!',
      html: `<h1>Welcome ${name}!</h1><p>Your account has been created successfully.</p>`,
    })
    
    if (error) {
      console.error('Email error:', error)
      return { success: false, error }
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}
```

---

## 🚨 Common Issues & Solutions

### Issue: Supabase client not working
**Solution**: Make sure `.env.local` exists and has correct credentials

### Issue: TypeScript errors
**Solution**: Run `npm install` again, restart VS Code

### Issue: Port 3000 already in use
**Solution**: Run on different port: `npm run dev -- -p 3001`

### Issue: Can't connect to Supabase
**Solution**: Check firewall, try different network

---

## 📞 Communication

- **Daily standup**: 9:00 AM and 5:00 PM
- **Quick questions**: Team chat
- **Blockers**: Immediately notify team lead
- **Code review**: Before merging to `dev`

---

## ✅ End of Day 1 Goals

By end of today, we should have:

- [x] Supabase project created and configured
- [x] Database schema deployed
- [x] Environment variables set
- [x] Git repository initialized
- [x] Assets migrated
- [x] Each team member started on their tasks
- [x] Dev server running for everyone
- [x] First commits pushed

---

## 🎯 Day 2 Preview

Tomorrow each person will:

- **Person 1**: Complete login/signup pages
- **Person 2**: Finish homepage and About page
- **Person 3**: Complete 3-4 API routes
- **Person 4**: Complete email templates and test sending

---

**Questions? Ask in team chat. Let's build this! 🚀**
