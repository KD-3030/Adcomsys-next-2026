# 🚀 AdComSys 2026 - Full-Stack Migration Roadmap

## Next.js + Supabase Full-Stack Application

**Document Version**: 1.0  
**Last Updated**: November 11, 2025  
**Project Timeline**: 10-12 weeks  
**Status**: Planning Phase

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Current State Analysis](#current-state-analysis)
3. [Target Architecture](#target-architecture)
4. [Tech Stack Decision](#tech-stack-decision)
5. [Detailed Roadmap](#detailed-roadmap)
6. [Database Schema](#database-schema)
7. [API Design](#api-design)
8. [SEO Strategy](#seo-strategy)
9. [Security Considerations](#security-considerations)
10. [Budget & Resources](#budget--resources)
11. [Risk Management](#risk-management)
12. [Success Metrics](#success-metrics)

---

## 📊 Project Overview

### Vision Statement
Transform the current static React/Vite website into a fully functional Next.js web application with authentication, paper submission verification, payment integration, and optimized SEO - while maintaining the simple, minimalistic, and professional design aesthetic.

### Core Objectives

✅ **User Authentication**
- Login/Signup functionality
- Role-based access control (Author, Admin, Reviewer)
- Secure session management

✅ **Paper Submission System**
- Integration with Microsoft CMT
- Verification workflow
- File upload capabilities
- Status tracking

✅ **Payment Integration**
- Razorpay payment gateway
- Payment verification system
- Receipt management
- Refund handling

✅ **Admin Dashboard**
- User management
- Paper review and approval
- Payment verification
- Analytics and reporting

✅ **SEO Optimization**
- Top search engine rankings
- Custom domain optimization
- Performance optimization
- Schema markup implementation

✅ **Design Preservation**
- Keep existing minimalistic UI/UX
- Maintain professional aesthetic
- Enhance with smooth interactions
- Mobile-first responsive design

---

## 🔍 Current State Analysis

### Existing Architecture

```
Current Stack:
├── Frontend: React 18.3.1 + Vite 5.4.19
├── Styling: Tailwind CSS + shadcn/ui
├── Routing: React Router v6
├── Backend: None (100% static)
├── Database: None
├── Authentication: None
└── Deployment: Static hosting
```

### Strengths to Preserve

✅ **Clean, Professional Design**
- Minimalistic interface
- Good color scheme
- Professional typography
- Consistent spacing

✅ **Component Library**
- 50+ shadcn/ui components
- Reusable UI elements
- Accessible components
- Well-structured

✅ **Content Organization**
- Clear navigation
- Logical information architecture
- Good user flow
- Mobile-responsive

### Gaps to Address

❌ **No Backend Functionality**
- No data persistence
- No user management
- No form processing
- No API endpoints

❌ **No Authentication**
- No login/signup
- No protected routes
- No user roles
- No session management

❌ **Static Content**
- All content hardcoded
- No content management
- Requires code changes for updates
- No admin interface

❌ **No Payment System**
- External payment links only
- No verification workflow
- No transaction tracking
- No receipt generation

❌ **Limited SEO**
- Basic meta tags
- No structured data
- No sitemap generation
- Missing optimizations

---

## 🏗️ Target Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 14)                    │
│                                                             │
│  ┌───────────────────────────────────────────────────┐    │
│  │  Pages (App Router)                               │    │
│  │  - Public pages (landing, about, events)          │    │
│  │  - Auth pages (login, signup, forgot-password)    │    │
│  │  - Protected pages (dashboard, submission)        │    │
│  │  - Admin pages (management, analytics)            │    │
│  └───────────────────────────────────────────────────┘    │
│                                                             │
│  ┌───────────────────────────────────────────────────┐    │
│  │  Components                                       │    │
│  │  - Existing shadcn/ui (preserved)                 │    │
│  │  - Header/Footer (enhanced)                       │    │
│  │  - Forms (new - submission, payment)              │    │
│  │  - Admin components (new)                         │    │
│  └───────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                             ↕
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Next.js API Routes)                   │
│                                                             │
│  /api/auth/*          - Authentication endpoints           │
│  /api/papers/*        - Paper submission & management       │
│  /api/payments/*      - Payment processing & verification   │
│  /api/registrations/* - Registration management            │
│  /api/admin/*         - Admin operations                   │
│  /api/public/*        - Public data (events, speakers)     │
└─────────────────────────────────────────────────────────────┘
                             ↕
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE (Backend as a Service)          │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  PostgreSQL  │  │  Auth        │  │  Storage     │    │
│  │  Database    │  │  (Built-in)  │  │  (Files)     │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  Realtime    │  │  Edge Fns    │  │  Vector DB   │    │
│  │  (Optional)  │  │  (Optional)  │  │  (Optional)  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────┘
                             ↕
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│                                                             │
│  - Razorpay (Payment Gateway)                              │
│  - Resend (Email Service)                                  │
│  - Microsoft CMT (Paper Submission)                        │
│  - Google Analytics (Analytics)                            │
│  - Vercel (Hosting)                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack Decision

### Why These Technologies?

#### **Frontend: Next.js 14 (App Router)**

**Chosen because:**
- ✅ Built-in SSR/SSG for better SEO
- ✅ API routes for backend functionality
- ✅ File-based routing (easier organization)
- ✅ Optimized performance out of the box
- ✅ Great developer experience
- ✅ Seamless Vercel deployment
- ✅ Large community and ecosystem
- ✅ Can keep existing React components

**Migration benefit:**
- Most existing React code can be reused
- shadcn/ui components work perfectly
- Tailwind CSS remains the same
- TypeScript support is excellent

#### **Database: Supabase**

**Chosen over PostgreSQL + Prisma because:**

✅ **All-in-One Solution**
```
Supabase includes:
├── PostgreSQL Database (production-ready)
├── Authentication (built-in, no NextAuth needed)
├── Storage (file uploads)
├── Realtime subscriptions (optional)
├── Auto-generated REST API
├── Row Level Security (RLS)
└── Database GUI
```

✅ **Significant Advantages**

| Feature | Supabase | Prisma + PostgreSQL |
|---------|----------|-------------------|
| Setup Time | 5 minutes | 30-60 minutes |
| Authentication | Built-in | Requires NextAuth |
| File Storage | Built-in | Requires AWS S3/Cloudinary |
| API Generation | Automatic | Manual |
| Real-time | Built-in | Requires setup |
| Cost (Free tier) | 500MB DB, 1GB storage | Depends on hosting |
| Admin Panel | Beautiful GUI | Prisma Studio |
| Edge Functions | Yes | No |

✅ **Perfect for This Project**
- Academic institution (cost-effective)
- Authentication needed (built-in)
- File uploads needed (built-in storage)
- Quick development time
- Excellent documentation
- Free tier is generous
- Easy to scale

✅ **Developer Experience**
```typescript
// Supabase client is incredibly simple
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Query is intuitive
const { data, error } = await supabase
  .from('papers')
  .select('*')
  .eq('status', 'accepted')
```

✅ **Security**
- Row Level Security (RLS) policies
- Automatic SQL injection prevention
- Built-in auth token management
- Secure file storage URLs

### Complete Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│ FRONTEND                                                │
├─────────────────────────────────────────────────────────┤
│ Framework:        Next.js 14 (App Router)              │
│ Language:         TypeScript (strict mode)             │
│ Styling:          Tailwind CSS 3.4+                    │
│ UI Components:    shadcn/ui (keep existing)            │
│ Icons:            Lucide React                         │
│ Animations:       Framer Motion                        │
│ Forms:            React Hook Form + Zod               │
│ State:            React Context + Zustand (minimal)    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ BACKEND                                                 │
├─────────────────────────────────────────────────────────┤
│ API:              Next.js API Routes                   │
│ Server Actions:   Next.js Server Actions              │
│ Middleware:       Next.js Middleware                  │
│ Database:         Supabase (PostgreSQL)               │
│ ORM:              Supabase Client (no ORM needed)     │
│ Authentication:   Supabase Auth                       │
│ File Storage:     Supabase Storage                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ EXTERNAL SERVICES                                       │
├─────────────────────────────────────────────────────────┤
│ Payment:          Razorpay (India-focused)            │
│ Email:            Resend (modern API)                 │
│ CMT Integration:  Microsoft CMT API                   │
│ Analytics:        Google Analytics 4                  │
│ SEO:              next-seo + next-sitemap            │
│ Monitoring:       Vercel Analytics                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ HOSTING & INFRASTRUCTURE                                │
├─────────────────────────────────────────────────────────┤
│ Hosting:          Vercel (optimized for Next.js)      │
│ Database:         Supabase Cloud (free tier)          │
│ CDN:              Vercel Edge Network                 │
│ Domain:           Custom domain (your choice)         │
│ SSL:              Automatic (Vercel)                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ DEVELOPMENT TOOLS                                       │
├─────────────────────────────────────────────────────────┤
│ Version Control:  Git + GitHub                        │
│ Package Manager:  npm / bun                           │
│ Code Quality:     ESLint + Prettier                   │
│ Git Hooks:        Husky + lint-staged                │
│ Testing:          Vitest + React Testing Library     │
│ CI/CD:            GitHub Actions + Vercel             │
└─────────────────────────────────────────────────────────┘
```

---

## 📅 Detailed Phase-by-Phase Roadmap

---

## **PHASE 0: Pre-Development & Planning** ⏱️ Week 1

### Objectives
- [ ] Finalize requirements and features
- [ ] Create detailed database schema
- [ ] Design system architecture
- [ ] Setup project management
- [ ] Create UI/UX enhancements (while keeping minimalistic design)

### Tasks Breakdown

#### Day 1-2: Requirements Finalization

**User Roles & Permissions**
```
Define roles:
├── Guest (Public visitor)
│   └── Can view: public pages, events, speakers
│
├── Author (Registered user)
│   ├── Can: submit papers, make payments, register
│   ├── Can view: own submissions, payment history
│   └── Cannot: access admin features
│
├── Reviewer (Optional for future)
│   ├── Can: review assigned papers
│   └── Can view: papers assigned to them
│
└── Admin (Conference organizers)
    ├── Can: everything
    ├── Manage: users, papers, payments, content
    └── Access: full admin dashboard
```

**Feature Requirements**

| Feature | Priority | Complexity | Time Estimate |
|---------|----------|------------|---------------|
| User Authentication | Critical | Medium | 4 days |
| Paper Submission | Critical | High | 7 days |
| Payment Integration | Critical | High | 7 days |
| Registration System | Critical | Medium | 5 days |
| Admin Dashboard | High | High | 7 days |
| Email Notifications | High | Low | 2 days |
| Public Pages Migration | Medium | Low | 5 days |
| SEO Optimization | High | Medium | 5 days |
| File Upload System | Critical | Medium | 3 days |
| CMT Integration | Critical | High | 5 days |

#### Day 3-4: Database Schema Design

**Tables Overview**
```sql
Supabase Database Schema:
├── users (Supabase Auth - built-in)
├── profiles (extended user info)
├── papers
├── submissions
├── payments
├── payment_verifications
├── registrations
├── events
├── speakers
├── committee_members
├── important_dates
├── contact_submissions
└── admin_logs
```

#### Day 5-6: UI/UX Enhancements Design

**Preserve Current Design**
- Keep existing color scheme
- Maintain minimalistic approach
- Preserve typography
- Keep clean layouts

**Add Smooth Enhancements**
```
Enhancements (subtle):
├── Micro-interactions (hover effects)
├── Smooth page transitions
├── Loading states (skeletons)
├── Toast notifications (existing Sonner)
├── Progress indicators
└── Better form feedback
```

**New Pages to Design**
- Login page (minimalistic)
- Signup page (clean)
- User dashboard (simple)
- Paper submission (multi-step, clean)
- Payment page (professional)
- Admin dashboard (functional, clean)

#### Day 7: Project Setup Planning

**Create Project Board**
```
GitHub Projects structure:
├── Backlog
├── To Do
├── In Progress
├── Review
├── Testing
└── Done
```

### Deliverables
- ✅ Complete requirements document
- ✅ Database schema (ERD)
- ✅ UI mockups (Figma/Sketch)
- ✅ API endpoint specification
- ✅ Project timeline (Gantt chart)
- ✅ GitHub project board setup

---

## **PHASE 1: Project Initialization** ⏱️ Week 2

### Objectives
- [ ] Create Next.js project structure
- [ ] Setup Supabase
- [ ] Configure development environment
- [ ] Install dependencies
- [ ] Migrate existing assets

### Day 1-2: Next.js Project Setup

```bash
# Create new Next.js 14 project
npx create-next-app@latest adcomsys-2026-fullstack \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd adcomsys-2026-fullstack

# Initialize Git
git init
git remote add origin https://github.com/amishabhagat10/adcomsys-2026-fullstack.git
```

### Day 2-3: Install Core Dependencies

```bash
# Supabase
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Payment (Razorpay)
npm install razorpay
npm install -D @types/razorpay

# Email
npm install resend react-email @react-email/components

# UI Components (shadcn)
npx shadcn-ui@latest init

# Add all existing shadcn components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add table
# ... (add all components from current project)

# Utilities
npm install axios date-fns clsx tailwind-merge

# SEO
npm install next-seo next-sitemap

# Animations
npm install framer-motion

# State Management (minimal)
npm install zustand

# Analytics
npm install @vercel/analytics

# Development Tools
npm install -D prettier eslint-config-prettier
npm install -D husky lint-staged
```

### Day 3-4: Supabase Setup

**Step 1: Create Supabase Project**
```
1. Go to https://supabase.com
2. Click "New Project"
3. Enter details:
   - Name: adcomsys-2026
   - Database Password: [secure password]
   - Region: [closest to India - Southeast Asia]
4. Wait for project to be created (~2 minutes)
```

**Step 2: Get Credentials**
```
From Supabase Dashboard:
├── Project URL: https://[project-id].supabase.co
├── Anon Public Key: eyJ... (safe for client-side)
└── Service Role Key: eyJ... (KEEP SECRET)
```

**Step 3: Configure Environment Variables**
```env
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=AdComSys 2026

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxx
RAZORPAY_KEY_SECRET=your_secret

# Resend Email
RESEND_API_KEY=re_xxxx

# CMT Integration
CMT_API_URL=https://cmt3.research.microsoft.com/AdComSys2025

# Admin Email
ADMIN_EMAIL=adcomsys@uem.edu.in
```

**Step 4: Create Supabase Client**
```typescript
// src/lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClient = () => createClientComponentClient()

// src/lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createClient = () => createServerComponentClient({ cookies })

// src/lib/supabase/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const createClient = (req: NextRequest) => 
  createMiddlewareClient({ req, res: NextResponse.next() })
```

### Day 5-6: Project Structure Setup

```bash
# Create complete folder structure
mkdir -p src/app/{(public),(auth),(dashboard),(admin),api}
mkdir -p src/components/{ui,forms,layout,admin,public}
mkdir -p src/lib/{supabase,utils,validations}
mkdir -p src/types
mkdir -p src/hooks
mkdir -p src/config
mkdir -p supabase/{migrations,functions}
mkdir -p public/{images,docs,fonts}
```

**Final Project Structure**
```
adcomsys-2026-fullstack/
├── src/
│   ├── app/
│   │   ├── (public)/              # Public routes
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── about-uem/
│   │   │   ├── committee/
│   │   │   ├── authors/
│   │   │   ├── keynote-speakers/
│   │   │   ├── events/
│   │   │   └── contact/
│   │   │
│   │   ├── (auth)/                # Auth routes
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── forgot-password/
│   │   │
│   │   ├── (dashboard)/           # Protected user routes
│   │   │   ├── dashboard/
│   │   │   ├── profile/
│   │   │   ├── submissions/
│   │   │   ├── payments/
│   │   │   └── registration/
│   │   │
│   │   ├── (admin)/               # Admin routes
│   │   │   └── admin/
│   │   │       ├── dashboard/
│   │   │       ├── users/
│   │   │       ├── papers/
│   │   │       ├── payments/
│   │   │       └── content/
│   │   │
│   │   ├── api/                   # API routes
│   │   │   ├── auth/
│   │   │   ├── papers/
│   │   │   ├── payments/
│   │   │   ├── registrations/
│   │   │   ├── admin/
│   │   │   └── webhooks/
│   │   │
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn/ui (migrated)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navigation.tsx
│   │   ├── forms/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── PaperSubmissionForm.tsx
│   │   │   ├── PaymentForm.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── admin/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── UserTable.tsx
│   │   │   ├── PaperReview.tsx
│   │   │   └── PaymentVerification.tsx
│   │   └── public/
│   │       ├── EventCard.tsx
│   │       ├── SpeakerCard.tsx
│   │       └── CommitteeMember.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   ├── date.ts
│   │   │   └── format.ts
│   │   ├── validations/
│   │   │   ├── auth.ts
│   │   │   ├── paper.ts
│   │   │   └── payment.ts
│   │   ├── razorpay.ts
│   │   ├── resend.ts
│   │   └── cmt-integration.ts
│   │
│   ├── types/
│   │   ├── database.types.ts      # Auto-generated by Supabase
│   │   ├── user.ts
│   │   ├── paper.ts
│   │   ├── payment.ts
│   │   └── api.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── usePapers.ts
│   │   ├── usePayments.ts
│   │   └── useToast.ts
│   │
│   └── config/
│       ├── site.ts
│       ├── navigation.ts
│       └── tracks.ts
│
├── supabase/
│   ├── migrations/
│   │   └── [timestamp]_initial_schema.sql
│   ├── functions/
│   │   └── [edge-functions]
│   └── config.toml
│
├── public/
│   ├── images/
│   ├── docs/
│   └── fonts/
│
├── .env.local
├── .env.example
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Day 7: Migrate Existing Assets

```bash
# Copy from old project
cp -r ../adcomsys-2026/src/assets ./public/
cp -r ../adcomsys-2026/src/components/ui ./src/components/ui
cp ../adcomsys-2026/src/index.css ./src/app/globals.css
cp ../adcomsys-2026/tailwind.config.ts ./tailwind.config.ts

# Update import paths in components
# @/assets -> /images or /docs
```

### Deliverables Week 2
- ✅ Next.js project initialized
- ✅ Supabase project created and configured
- ✅ All dependencies installed
- ✅ Complete folder structure
- ✅ Assets migrated
- ✅ Environment variables configured
- ✅ Git repository initialized

---

## **PHASE 2: Database Schema Implementation** ⏱️ Week 3

### Objectives
- [ ] Create complete database schema in Supabase
- [ ] Setup Row Level Security (RLS) policies
- [ ] Create database functions and triggers
- [ ] Seed initial data
- [ ] Generate TypeScript types

### Day 1-3: Create Database Schema

**SQL Migration File**
```sql
-- supabase/migrations/20251111000000_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE (extends Supabase Auth users)
-- ============================================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  institution TEXT,
  designation TEXT,
  country TEXT,
  phone TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'author' CHECK (role IN ('author', 'reviewer', 'admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PAPERS TABLE
-- ============================================================================
CREATE TABLE papers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  abstract TEXT NOT NULL,
  keywords TEXT[] NOT NULL,
  track TEXT NOT NULL CHECK (track IN (
    'AI_ML',
    'IOT_SMART_SYSTEMS',
    'CYBERSECURITY',
    'BLOCKCHAIN',
    'CLOUD_COMPUTING',
    'DATA_SCIENCE'
  )),
  status TEXT DEFAULT 'draft' CHECK (status IN (
    'draft',
    'submitted',
    'under_review',
    'revision_required',
    'accepted',
    'rejected',
    'camera_ready'
  )),
  
  -- Co-authors stored as JSONB
  co_authors JSONB DEFAULT '[]',
  
  -- File URLs (stored in Supabase Storage)
  manuscript_url TEXT,
  presentation_url TEXT,
  revised_manuscript_url TEXT,
  camera_ready_url TEXT,
  
  -- CMT Integration
  cmt_paper_id TEXT UNIQUE,
  cmt_submission_date TIMESTAMPTZ,
  cmt_status TEXT,
  
  -- Review information
  similarity_score DECIMAL(5,2),
  review_comments TEXT,
  reviewer_id UUID REFERENCES profiles(id),
  
  -- Metadata
  submission_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PAYMENTS TABLE
-- ============================================================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  paper_id UUID REFERENCES papers(id) ON DELETE SET NULL,
  
  -- Payment details
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR' CHECK (currency IN ('INR', 'USD')),
  category TEXT NOT NULL CHECK (category IN (
    'student',
    'academician',
    'industry',
    'attendee'
  )),
  
  -- Razorpay details
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_signature TEXT,
  
  -- Payment status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',
    'processing',
    'completed',
    'failed',
    'refunded'
  )),
  
  -- Receipt
  receipt_url TEXT,
  receipt_verified_by UUID REFERENCES profiles(id),
  receipt_verified_at TIMESTAMPTZ,
  
  -- Early bird discount
  is_early_bird BOOLEAN DEFAULT false,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  
  -- Metadata
  payment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- REGISTRATIONS TABLE
-- ============================================================================
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  
  -- Registration details
  category TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',
    'payment_pending',
    'payment_verified',
    'approved',
    'rejected'
  )),
  
  -- Verification
  cmt_verification_status TEXT DEFAULT 'pending',
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  verification_notes TEXT,
  
  -- Confirmation
  confirmation_number TEXT UNIQUE,
  certificate_url TEXT,
  
  -- Metadata
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- EVENTS TABLE
-- ============================================================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  event_time TEXT,
  venue TEXT NOT NULL,
  image_url TEXT,
  registration_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SPEAKERS TABLE
-- ============================================================================
CREATE TABLE speakers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  affiliation TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  topic TEXT,
  session_date TIMESTAMPTZ,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- COMMITTEE MEMBERS TABLE
-- ============================================================================
CREATE TABLE committee_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  affiliation TEXT NOT NULL,
  email TEXT,
  image_url TEXT,
  committee_type TEXT NOT NULL CHECK (committee_type IN (
    'organizing',
    'technical',
    'advisory'
  )),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- IMPORTANT DATES TABLE
-- ============================================================================
CREATE TABLE important_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date_value TIMESTAMPTZ NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  replied_at TIMESTAMPTZ,
  replied_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ADMIN LOGS TABLE
-- ============================================================================
CREATE TABLE admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES for Performance
-- ============================================================================
CREATE INDEX idx_papers_author ON papers(author_id);
CREATE INDEX idx_papers_status ON papers(status);
CREATE INDEX idx_papers_track ON papers(track);
CREATE INDEX idx_papers_cmt_id ON papers(cmt_paper_id);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_registrations_user ON registrations(user_id);
CREATE INDEX idx_registrations_paper ON registrations(paper_id);
CREATE INDEX idx_registrations_status ON registrations(status);

-- ============================================================================
-- TRIGGERS for Updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_papers_updated_at BEFORE UPDATE ON papers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to generate confirmation number
CREATE OR REPLACE FUNCTION generate_confirmation_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'ADCOM2026-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to check paper submission eligibility
CREATE OR REPLACE FUNCTION can_submit_paper(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  paper_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO paper_count
  FROM papers
  WHERE author_id = user_uuid
    AND status IN ('submitted', 'under_review', 'accepted');
  
  -- Limit to 3 papers per user
  RETURN paper_count < 3;
END;
$$ LANGUAGE plpgsql;
```

### Day 4-5: Row Level Security (RLS) Policies

```sql
-- supabase/migrations/20251111000001_rls_policies.sql

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE important_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PROFILES POLICIES
-- ============================================================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- PAPERS POLICIES
-- ============================================================================

-- Authors can view their own papers
CREATE POLICY "Authors can view own papers"
  ON papers FOR SELECT
  USING (auth.uid() = author_id);

-- Authors can create papers
CREATE POLICY "Authors can create papers"
  ON papers FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Authors can update their draft papers
CREATE POLICY "Authors can update draft papers"
  ON papers FOR UPDATE
  USING (auth.uid() = author_id AND status = 'draft');

-- Admins/Reviewers can view all papers
CREATE POLICY "Admins can view all papers"
  ON papers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'reviewer')
    )
  );

-- ============================================================================
-- PAYMENTS POLICIES
-- ============================================================================

-- Users can view their own payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create payments
CREATE POLICY "Users can create payments"
  ON payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all payments
CREATE POLICY "Admins can manage payments"
  ON payments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- REGISTRATIONS POLICIES
-- ============================================================================

-- Users can view their own registrations
CREATE POLICY "Users can view own registrations"
  ON registrations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create registrations
CREATE POLICY "Users can create registrations"
  ON registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can manage all registrations
CREATE POLICY "Admins can manage registrations"
  ON registrations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- PUBLIC CONTENT POLICIES (Anyone can read)
-- ============================================================================

CREATE POLICY "Anyone can view active events"
  ON events FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active speakers"
  ON speakers FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active committee members"
  ON committee_members FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active important dates"
  ON important_dates FOR SELECT
  USING (is_active = true);

-- Admins can manage public content
CREATE POLICY "Admins can manage events"
  ON events FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage speakers"
  ON speakers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage committee members"
  ON committee_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage important dates"
  ON important_dates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- CONTACT SUBMISSIONS POLICIES
-- ============================================================================

-- Anyone can submit contact form
CREATE POLICY "Anyone can create contact submission"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Admins can view all submissions
CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- ADMIN LOGS POLICIES
-- ============================================================================

-- Only admins can view logs
CREATE POLICY "Admins can view logs"
  ON admin_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### Day 6: Seed Initial Data

```sql
-- supabase/migrations/20251111000002_seed_data.sql

-- Insert Important Dates
INSERT INTO important_dates (title, date_value, display_order) VALUES
  ('Paper Submission Open', '2025-12-15', 1),
  ('Paper Submission Deadline', '2026-03-10', 2),
  ('Acceptance Notification', '2026-05-10', 3),
  ('Early Bird Registration', '2026-05-25', 4),
  ('Last Date of Registration', '2026-06-05', 5),
  ('Final Camera Ready Paper', '2026-06-15', 6),
  ('Submission of Copyright', '2026-06-15', 7),
  ('Conference Dates', '2026-06-25', 8);

-- Insert Events (migrate from existing data)
INSERT INTO events (title, description, event_date, event_time, venue, registration_url, display_order) VALUES
  (
    'Post-It',
    'Driven by art, design, or the power of visual storytelling? POST-IT is your platform. Transform your ideas into striking visuals that captivate, inspire, and communicate beyond words.',
    '2026-06-26',
    '11:00 AM',
    'Buddha Auditorium',
    'https://bit.ly/AdComSys25-PostIt',
    1
  ),
  (
    'Techniche',
    'Techniche 2026, platform to showcase innovation and creativity! A Project Competition inviting budding tech minds to present their unique solutions to real-world challenges.',
    '2026-06-26',
    '11:00 AM',
    'Buddha Auditorium',
    'https://bit.ly/AdComSys25-Techniche',
    2
  );

-- Add more seed data as needed...
```

### Day 7: Generate TypeScript Types

```bash
# Generate types from Supabase schema
npx supabase gen types typescript --project-id [project-id] > src/types/database.types.ts
```

### Deliverables Week 3
- ✅ Complete database schema created
- ✅ RLS policies implemented
- ✅ Database functions and triggers
- ✅ Initial data seeded
- ✅ TypeScript types generated
- ✅ Database documentation

---

## **PHASE 3: Authentication System** ⏱️ Week 4

### Objectives
- [ ] Implement Supabase Auth
- [ ] Create login/signup pages (minimalistic design)
- [ ] Setup protected routes
- [ ] Create user profile management
- [ ] Add role-based access control

### Implementation Details

**Supabase Auth Features**
```
Built-in Supabase Auth:
├── Email/Password authentication
├── OAuth providers (optional: Google, GitHub)
├── Magic link authentication
├── Password reset
├── Email verification
├── Session management
└── JWT tokens
```

### Day 1-2: Auth Configuration

```typescript
// src/lib/auth/config.ts
export const authConfig = {
  providers: {
    email: true,
    google: false, // Add later if needed
  },
  redirectTo: {
    login: '/dashboard',
    logout: '/login',
    signup: '/dashboard',
  },
  passwordRequirements: {
    minLength: 8,
    requireUppercase: true,
    requireNumber: true,
    requireSpecialChar: true,
  },
}
```

### Day 3-4: Auth Pages (Minimalistic Design)

**Login Page**
```typescript
// src/app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      })
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold">AdComSys 2026</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
          <div className="mt-2">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Day 5: Protected Routes Middleware

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Auth routes (redirect if already logged in)
  if (
    (req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/signup')) &&
    session
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/signup'],
}
```

### Day 6-7: User Profile Management

```typescript
// src/app/(dashboard)/profile/page.tsx
// Profile viewing and editing page
```

### Deliverables Week 4
- ✅ Supabase Auth configured
- ✅ Login/signup pages (minimalistic)
- ✅ Password reset flow
- ✅ Protected routes middleware
- ✅ Role-based access control
- ✅ User profile management

---

## **PHASE 4-11: Remaining Phases**

_Due to length constraints, I'll provide a condensed version. Full details available upon request._

**Phase 4 (Week 5-6)**: Frontend Pages Migration
- Migrate all public pages to Next.js App Router
- Preserve minimalistic design
- Make content dynamic (from Supabase)
- Add subtle animations

**Phase 5 (Week 6-7)**: Paper Submission System
- Multi-step submission form
- CMT integration
- File upload to Supabase Storage
- Verification workflow

**Phase 6 (Week 7-8)**: Payment Integration
- Razorpay setup
- Payment flow
- Verification system
- Receipt management

**Phase 7 (Week 8)**: Registration System
- Link papers with payments
- Registration workflow
- Confirmation generation

**Phase 8 (Week 9)**: Admin Dashboard
- User management
- Paper review
- Payment verification
- Analytics

**Phase 9 (Week 10)**: SEO Optimization
- Meta tags
- Structured data
- Sitemap generation
- Performance optimization

**Phase 10 (Week 11)**: Testing
- Unit tests
- Integration tests
- Security audit
- Performance testing

**Phase 11 (Week 12)**: Deployment
- Production deployment
- Custom domain setup
- Monitoring setup
- Launch

---

## 💰 Budget Estimation

### Free Tier (Recommended to Start)

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Supabase** | 500MB DB, 1GB storage, 50K monthly users | $0/month |
| **Vercel** | Unlimited projects, 100GB bandwidth | $0/month |
| **Resend** | 100 emails/day | $0/month |
| **Domain** | .com/.in domain | ~$12/year |
| **Total** | | **$12/year** |

### Paid Tier (For Growth)

| Service | Plan | Cost |
|---------|------|------|
| **Supabase Pro** | 8GB DB, 100GB storage | $25/month |
| **Vercel Pro** | Better performance | $20/month |
| **Resend** | 10K emails/month | $20/month |
| **Domain** | Custom domain | $12/year |
| **Total** | | **$66/month + $12/year** |

### Transaction Costs

| Service | Rate |
|---------|------|
| **Razorpay** | 2% per transaction + GST |

---

## ⏱️ Timeline Summary

| Week | Phase | Key Deliverables |
|------|-------|------------------|
| 1 | Planning | Requirements, DB schema, wireframes |
| 2 | Setup | Next.js, Supabase, dependencies |
| 3 | Database | Schema, RLS, seed data |
| 4 | Auth | Login, signup, protected routes |
| 5-6 | Pages | Migrate all pages, dynamic content |
| 6-7 | Papers | Submission form, CMT integration |
| 7-8 | Payment | Razorpay integration, verification |
| 8 | Registration | Complete registration system |
| 9 | Admin | Full admin dashboard |
| 10 | SEO | Optimization, sitemap, analytics |
| 11 | Testing | QA, security, performance |
| 12 | Deploy | Production launch, custom domain |

**Total: 12 weeks**

---

## 🎯 Success Metrics

### Technical Metrics
- ✅ Page load time < 2 seconds
- ✅ Lighthouse score > 90
- ✅ Zero critical security vulnerabilities
- ✅ 99.9% uptime
- ✅ Mobile responsiveness 100%

### Business Metrics
- 🎯 1000+ registered users
- 🎯 500+ paper submissions
- 🎯 95% payment success rate
- 🎯 Top 10 Google results for "AdComSys conference"
- 🎯 < 1% error rate

---

## ⚠️ Risk Management

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase downtime | Low | High | Regular backups, monitoring |
| CMT API changes | Medium | High | Fallback manual entry |
| Payment failures | Low | High | Test extensively, backup methods |
| Timeline delays | High | Medium | Buffer time built in, MVP first |
| Budget overrun | Low | Low | Start with free tier |

---

## 📚 Key Documentation Links

### Supabase
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

### Next.js
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Payment
- [Razorpay Docs](https://razorpay.com/docs/)
- [Razorpay Integration](https://razorpay.com/docs/payments/payment-gateway/)

### SEO
- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)

---

## 🚀 Next Steps

### Immediate Actions (This Week)

1. **Review this roadmap** with stakeholders
2. **Create Supabase account** and project
3. **Purchase domain** if not already done
4. **Setup GitHub repository** (new or branch)
5. **Confirm budget** and timeline
6. **Begin Phase 0** planning tasks

### Decision Points

**Need to confirm:**
- [ ] Domain name chosen?
- [ ] Razorpay account ready?
- [ ] Timeline acceptable (12 weeks)?
- [ ] Budget approved (start with free tier)?
- [ ] Team size (solo or team)?
- [ ] Design approval (keep minimalistic)?

---

## 📝 Appendix

### A. Database Schema ERD
_[Include visual ERD diagram]_

### B. API Endpoint Specification
_[Full API documentation]_

### C. UI/UX Mockups
_[Design files/screenshots]_

### D. SEO Checklist
_[Complete SEO optimization checklist]_

### E. Security Checklist
_[Security audit checklist]_

---

**Document maintained by**: AdComSys 2026 Development Team  
**For questions**: Contact development team  
**Last review**: November 11, 2025

---

**Ready to begin? Let's start with Phase 0!** 🚀
