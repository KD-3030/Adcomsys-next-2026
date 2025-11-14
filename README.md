# AdComSys 2026 - Conference Management System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern, full-stack conference management system for academic conferences**

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Documentation](#documentation) • [License](#license)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
- [Project Structure](#project-structure)
- [Key Features](#key-features-in-detail)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Documentation](#documentation)

---

## 🎯 Overview

AdComSys 2026 is a comprehensive conference management system built with Next.js 16 and Supabase. It provides a complete solution for managing academic conferences, including paper submissions, payment verification, user management, and more.

**Conference Details:**
- **Name:** AdComSys 2026
- **Full Name:** International Conference on Advanced Communication Systems
- **Focus:** Wireless Networks, IoT, Cloud Computing, Network Security, and more

---

## ✨ Features

### For Authors
- 📝 **Paper Submission Management** - Submit papers with CMT integration
- 💳 **Payment Proof Upload** - Upload payment screenshots (JPG/PNG/PDF)
- 📊 **Real-time Dashboard** - Track submission and payment status
- 🔔 **Status Notifications** - Get updates on paper approval and payment verification
- 📄 **Submission History** - View all submitted papers with details
- 👤 **Profile Management** - Update personal and institutional information

### For Admins
- ✅ **Paper Approval System** - Review and approve/reject paper submissions
- 💰 **Payment Verification** - Verify payment proofs with notes
- 👥 **User Management** - Manage authors, reviewers, and admins
- 📧 **Contact Management** - Handle contact form submissions
- 📈 **Analytics Dashboard** - View statistics and recent activities
- 🎤 **Speaker Management** - Manage keynote speakers and sessions
- 👔 **Committee Management** - Organize committee members
- 📅 **Event Management** - Schedule and manage conference events

### For Reviewers
- 📝 **Paper Review System** - Review assigned papers
- 💬 **Feedback Submission** - Provide detailed review comments
- 📊 **Review Dashboard** - Track review assignments

### General Features
- 🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing
- 🎨 **Modern UI/UX** - Responsive design with Tailwind CSS and Radix UI
- 🌐 **Public Pages** - Home, About, Call for Papers, Contact, etc.
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized with Next.js 16 and Turbopack
- 🔍 **SEO Optimized** - Meta tags and sitemap generation
- 🎨 **Animated UI** - Smooth animations with Framer Motion

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16.0.1 with App Router
- **Language:** TypeScript
- **UI Library:** React 19.2.0
- **Styling:** Tailwind CSS 4
- **Components:** Radix UI (Dialog, Select, Dropdown, etc.)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Notifications:** Sonner (toast notifications)

### Backend
- **Runtime:** Node.js
- **API:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Custom JWT + bcrypt
- **File Storage:** Supabase Storage
- **Email:** Resend + React Email

### Development Tools
- **Package Manager:** npm
- **Linting:** ESLint
- **Type Checking:** TypeScript
- **Build Tool:** Turbopack (Next.js)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git**
- **Supabase account** (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KD-3030/Adcomsys-next-2026.git
   cd adcomsys-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Edit `.env.local` with your credentials**
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # JWT
   JWT_SECRET=your_secret_key_change_in_production

   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and API keys

### 2. Run Database Migrations

Execute the SQL files in the `sql/` directory in this order:

```bash
sql/
├── supabase-schema.sql              # Main database schema
├── add-subject-area-to-papers.sql   # Paper submission updates
├── create-admin-user.sql            # Create initial admin
└── seed-test-users.sql              # Optional: Test users
```

**To run migrations:**
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste each SQL file
3. Run them in order

### 3. Configure Storage

Create storage buckets in Supabase:

1. **payment-screenshots**
   - Public: No
   - Allowed MIME types: `image/jpeg`, `image/png`, `application/pdf`
   - Max file size: 10MB

2. **paper-submissions** (optional)
   - Public: No
   - Allowed MIME types: `application/pdf`
   - Max file size: 50MB

### 4. Set Up Row Level Security (RLS)

The schema includes RLS policies. Ensure they are enabled in Supabase Dashboard.

---

## 📁 Project Structure

```
adcomsys-next/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth pages (login, signup)
│   │   ├── (dashboard)/         # Dashboard layout
│   │   ├── (public)/            # Public pages
│   │   ├── admin/               # Admin panel
│   │   ├── authors/             # Author dashboard
│   │   ├── api/                 # API routes
│   │   │   ├── auth/           # Authentication
│   │   │   ├── admin/          # Admin APIs
│   │   │   └── authors/        # Author APIs
│   │   ├── globals.css         # Global styles
│   │   └── layout.tsx          # Root layout
│   ├── components/              # React components
│   │   ├── admin/              # Admin components
│   │   ├── authors/            # Author components
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Layout components
│   │   ├── public/             # Public page components
│   │   └── ui/                 # UI components (Radix)
│   ├── lib/                    # Utility libraries
│   │   ├── auth/              # Auth utilities (JWT, password)
│   │   ├── db/                # Database utilities
│   │   ├── email/             # Email utilities
│   │   ├── storage/           # Storage utilities
│   │   └── supabase/          # Supabase client
│   ├── types/                 # TypeScript types
│   └── config/                # Configuration files
├── public/                    # Static assets
│   └── assets/               # Images, fonts, etc.
├── sql/                      # Database migrations
├── documentation/            # Project documentation
├── middleware.ts            # Next.js middleware
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

---

## 🎨 Key Features in Detail

### 1. Authentication System

**Features:**
- Custom JWT-based authentication
- Bcrypt password hashing
- HTTP-only cookies for security
- Role-based access control (Guest, Author, Reviewer, Admin)
- Email validation
- Password strength requirements

**Endpoints:**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### 2. Paper Submission System

**Author Workflow:**
1. Submit paper through CMT portal (Microsoft)
2. Receive CMT Paper ID
3. Submit paper details in system for admin approval
4. Track submission status (Pending → Approved → Under Review → Accepted/Rejected)

**Fields:**
- CMT Paper ID (required)
- Paper Title
- Authors (comma-separated)
- Subject Area (15 tracks available)
- Abstract

**Admin Workflow:**
1. Review submitted paper details
2. Approve or reject submission
3. Add approval notes
4. Track all submissions with filters

### 3. Payment Verification System

**Author Workflow:**
1. Upload payment proof (JPG/PNG/PDF up to 10MB)
2. Enter payment details (amount, currency, category, transaction ID)
3. Link payment to paper (optional)
4. Track payment status

**Admin Workflow:**
1. View all payment submissions
2. Preview/download payment proofs
3. Verify or reject payments
4. Add verification notes
5. Filter by status (Pending/Verified/Rejected)

**Categories:**
- Student
- Academician
- Industry
- Attendee

### 4. Dashboard Analytics

**Author Dashboard:**
- Total submissions count
- Accepted papers count
- Papers under review
- Payment records (verified/pending)
- Quick links to submission and payment pages

**Admin Dashboard:**
- Total users
- Pending payments count
- Total paper submissions
- Unread contact messages
- Recent activity log
- Quick action buttons

### 5. Conference Information Pages

**Public Pages:**
- `/` - Home page with conference overview
- `/about` - About the conference
- `/call-for-papers` - CFP with important dates
- `/committee` - Organizing and technical committees
- `/speakers` - Keynote speakers
- `/technical-program` - Conference schedule
- `/events` - Conference events
- `/registration` - Registration information
- `/contact` - Contact form

---

## 📚 API Documentation

### Authentication APIs

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "full_name": "John Doe",
  "role": "author"
}
```

**Response (201):**
```json
{
  "message": "Account created successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "author"
  }
}
```

#### POST `/api/auth/login`
Authenticate user and create session.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "message": "Logged in successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "author"
  }
}
```

### Paper Submission APIs

#### POST `/api/authors/papers/submit`
Submit a new paper for admin approval.

**Request Body:**
```json
{
  "cmtPaperId": "12345",
  "title": "Paper Title",
  "authors": "Author 1, Author 2",
  "subjectArea": "Wireless Networks and Mobile Computing",
  "abstract": "Paper abstract..."
}
```

#### GET `/api/authors/papers`
Get user's paper submissions.

**Response (200):**
```json
{
  "papers": [
    {
      "id": "uuid",
      "cmt_paper_id": "12345",
      "title": "Paper Title",
      "authors": "Author 1, Author 2",
      "subject_area": "Wireless Networks",
      "status": "pending_approval",
      "created_at": "2025-11-15T10:00:00Z"
    }
  ]
}
```

### Payment APIs

#### POST `/api/authors/payments`
Submit payment proof for verification.

**Request Body:**
```json
{
  "amount": 350,
  "currency": "USD",
  "category": "student",
  "transactionId": "TXN123456",
  "screenshot_url": "https://storage.url/file.jpg",
  "paperId": "optional-paper-id"
}
```

#### GET `/api/authors/payments`
Get user's payment records.

### Admin APIs

#### GET `/api/admin/submissions`
Get all paper submissions (admin only).

#### PUT `/api/admin/submissions/[id]`
Approve or reject paper submission.

#### GET `/api/admin/payments`
Get all payment verifications (admin only).

#### PUT `/api/admin/payments/[id]`
Verify or reject payment.

---

## 🧪 Testing

### Run Automated Tests

```bash
# Authentication flow tests
node test-auth-flow.mjs
```

**Test Coverage:**
- ✅ User signup
- ✅ Valid login
- ✅ Invalid login
- ✅ Duplicate email prevention
- ✅ Email validation
- ✅ Password strength

### Manual Testing

1. Follow the `BROWSER_TEST_CHECKLIST.md` for UI testing
2. Test all user flows (author, admin, reviewer)
3. Verify responsive design on different devices
4. Check browser console for errors

### Test Results

See `AUTH_TEST_REPORT.md` for comprehensive test results.

**Latest Results:**
- ✅ 6/6 tests passed
- ✅ 100% success rate
- ✅ All security features working

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Set Environment Variables**
   Add all variables from `.env.local` in Vercel dashboard

### Deploy to Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Google Cloud Run
- Self-hosted

### Build for Production

```bash
npm run build
npm start
```

---

## 🔒 Security

### Implemented Security Features

- ✅ JWT-based authentication with 7-day expiration
- ✅ bcrypt password hashing (10 salt rounds)
- ✅ HTTP-only cookies (XSS protection)
- ✅ CSRF protection via Next.js
- ✅ Input validation (Zod schemas)
- ✅ SQL injection prevention (Supabase/PostgreSQL)
- ✅ Rate limiting on sensitive endpoints
- ✅ Role-based access control (RBAC)
- ✅ Secure file upload (type/size validation)
- ✅ Row Level Security (RLS) on database

### Security Best Practices

1. **Never commit `.env.local`** - Use `.env.example` as template
2. **Rotate JWT secrets regularly** in production
3. **Use HTTPS** in production
4. **Enable Supabase RLS** for all tables
5. **Implement rate limiting** on all public endpoints
6. **Regular security audits** and dependency updates

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint rules
- Write descriptive commit messages
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting PR

---

## 📖 Documentation

Additional documentation available in the `documentation/` folder:

- `SETUP_GUIDE.md` - Detailed setup instructions
- `TESTING_GUIDE.md` - Testing procedures
- `CUSTOM_AUTH_SETUP.md` - Authentication setup
- `UI_COLOR_SCHEME.md` - Design system and colors
- `MIGRATION_PROGRESS.md` - Migration status
- `PROJECT_STATUS.md` - Current project status
- `AUTH_TEST_REPORT.md` - Authentication test results
- `BROWSER_TEST_CHECKLIST.md` - Manual testing checklist

---

## 📄 License

This project is proprietary software for AdComSys 2026 conference.

**Copyright © 2025 AdComSys 2026. All rights reserved.**

---

## 👥 Authors

**Development Team:**
- KD-3030 - Lead Developer

---

## 📞 Support

For support and questions:

- **Email:** support@adcomsys2026.org
- **Website:** [adcomsys2026.org](https://adcomsys2026.org)
- **GitHub Issues:** [Report an issue](https://github.com/KD-3030/Adcomsys-next-2026/issues)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for backend infrastructure
- Radix UI for accessible components
- All contributors and testers

---

<div align="center">

**Built with ❤️ for AdComSys 2026**

[⬆ Back to Top](#adcomsys-2026---conference-management-system)

</div>
