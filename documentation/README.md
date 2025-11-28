# AdComSys 2026 - Full-Stack Conference Website

> Third International Conference on Advanced Computing and Systems  
> University of Engineering & Management, Kolkata  
> June 26-27, 2026

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Email**: Resend
- **Storage**: Supabase Storage

## 📋 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase credentials
   - Add Resend API key

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── (public)/        # Public pages
│   ├── (auth)/          # Auth pages
│   ├── (dashboard)/     # User dashboard
│   ├── (admin)/         # Admin panel
│   └── api/             # API routes
├── components/          # React components
├── lib/                 # Utilities & configs
├── types/               # TypeScript types
├── hooks/               # Custom hooks
└── config/              # Configuration files
```

## 👥 User Roles

- **Guest**: View public content only
- **Author**: Submit papers, make payments
- **Reviewer**: Review assigned papers
- **Admin**: Full access to all features

## 🔑 Key Features

### Completed
- ✅ Project setup
- ✅ Database schema
- ✅ Supabase configuration
- ✅ Basic folder structure

### In Progress (Week 1)
- 🔄 Authentication system
- 🔄 Page migration from React to Next.js
- 🔄 API routes
- 🔄 Email notifications
- 🔄 File upload system

### Planned
- 📝 Payment verification workflow
- 📝 Reviewer dashboard
- 📝 Admin panel
- 📝 SEO optimization
- 📝 Production deployment

## 📖 Documentation

- **Setup Guide**: [`SETUP_GUIDE.md`](./SETUP_GUIDE.md) - Initial setup for team
- **Sprint Plan**: [`../WEEK_1_SPRINT.md`](../WEEK_1_SPRINT.md) - Week 1 detailed plan
- **Migration Roadmap**: [`../MIGRATION_ROADMAP.md`](../MIGRATION_ROADMAP.md) - Complete migration plan
- **Database Schema**: [`supabase-schema.sql`](./supabase-schema.sql) - SQL schema

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🌐 Environment Variables

Required environment variables (see `.env.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
```

## 🤝 Team Workflow

### Git Branches
- `main` - Production (protected)
- `dev` - Development (merge here)
- `feature/*` - Feature branches

### Daily Workflow
1. Pull latest `dev` branch
2. Work on your feature branch
3. Commit frequently
4. Push at end of day
5. Create PR to `dev` when complete

### Commit Convention
```
feat: add user authentication
fix: resolve login redirect issue
style: update header styling
refactor: simplify database queries
docs: update API documentation
```

## 📞 Contact

**Team Lead**: [Your Name]  
**Email**: adcomsys@uem.edu.in  
**Conference**: [https://adcomsys2026.uem.edu.in](https://adcomsys2026.uem.edu.in)

---

**Built with ❤️ by the AdComSys 2026 Development Team**
