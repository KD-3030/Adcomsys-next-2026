// Site configuration
export const siteConfig = {
  name: 'AdComSys 2026',
  title: 'AdComSys 2026 - International Conference on Advanced Computing and Systems',
  description:
    'Third International Conference on Advanced Computing and Systems organized by Department of CST & CSIT, University of Engineering and Management, Kolkata. June 25-26, 2026. Submit your research on AI, IoT, Cloud Computing, Cybersecurity, and more. Papers published in Springer LNNS.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://adcomsys.uemkcstcsit.in',
  ogImage: '/og-image.png',
  links: {
    cmt: process.env.NEXT_PUBLIC_CMT_URL || 'https://cmt3.research.microsoft.com/AdComSys2025',
    email: 'adcomsys@uem.edu.in',
  },
  keywords: [
    'AdComSys',
    'AdComSys 2026',
    'International Conference',
    'Advanced Computing',
    'Computer Systems',
    'UEM Kolkata',
    'Academic Conference',
    'Research Conference',
    'Springer LNNS',
    'Springer Conference',
    'AI Conference',
    'Machine Learning',
    'IoT Conference',
    'Cloud Computing',
    'Cybersecurity',
    'Data Science',
    'Computer Science Conference',
    'Engineering Conference',
    'India Conference',
    'Kolkata Conference',
    'June 2026',
  ],
}

// User roles
export const USER_ROLES = {
  GUEST: 'guest',
  AUTHOR: 'author',
  REVIEWER: 'reviewer',
  ADMIN: 'admin',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

// Payment categories
export const PAYMENT_CATEGORIES = {
  STUDENT: 'student',
  ACADEMICIAN: 'academician',
  INDUSTRY: 'industry',
  ATTENDEE: 'attendee',
} as const

export type PaymentCategory = (typeof PAYMENT_CATEGORIES)[keyof typeof PAYMENT_CATEGORIES]

// Paper status
export const PAPER_STATUS = {
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const

export type PaperStatus = (typeof PAPER_STATUS)[keyof typeof PAPER_STATUS]
