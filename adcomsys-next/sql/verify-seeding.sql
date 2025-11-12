# ============================================================================
# Quick Database Verification Script
# ============================================================================
# Run this in Supabase SQL Editor to verify seeding was successful
# ============================================================================

-- 1. Count all users by role
SELECT 
  role,
  COUNT(*) as count,
  STRING_AGG(email, ', ') as emails
FROM profiles
GROUP BY role
ORDER BY role;

-- 2. Check if admin user exists
SELECT 
  '✅ Admin user exists' as status,
  email,
  full_name,
  role,
  created_at
FROM profiles 
WHERE role = 'admin'
LIMIT 1;

-- 3. Check password hash format (should start with $2a$ for bcrypt)
SELECT 
  email,
  role,
  CASE 
    WHEN password_hash LIKE '$2a$%' THEN '✅ Valid bcrypt hash'
    WHEN password_hash IS NULL THEN '❌ Missing password'
    ELSE '⚠️ Invalid hash format'
  END as password_status
FROM profiles
ORDER BY role;

-- 4. Count all entities
SELECT 
  'Total Users' as metric,
  COUNT(*)::TEXT as value
FROM profiles

UNION ALL

SELECT 
  'Admin Users' as metric,
  COUNT(*)::TEXT as value
FROM profiles WHERE role = 'admin'

UNION ALL

SELECT 
  'Paper Submissions' as metric,
  COUNT(*)::TEXT as value
FROM paper_submissions

UNION ALL

SELECT 
  'Payment Verifications' as metric,
  COUNT(*)::TEXT as value
FROM payment_verifications

UNION ALL

SELECT 
  'Pending Payments' as metric,
  COUNT(*)::TEXT as value
FROM payment_verifications WHERE status = 'pending'

UNION ALL

SELECT 
  'Verified Payments' as metric,
  COUNT(*)::TEXT as value
FROM payment_verifications WHERE status = 'verified'

UNION ALL

SELECT 
  'Contact Submissions' as metric,
  COUNT(*)::TEXT as value
FROM contact_submissions

UNION ALL

SELECT 
  'Speakers' as metric,
  COUNT(*)::TEXT as value
FROM speakers

UNION ALL

SELECT 
  'Events' as metric,
  COUNT(*)::TEXT as value
FROM events

UNION ALL

SELECT 
  'Committee Members' as metric,
  COUNT(*)::TEXT as value
FROM committee_members

UNION ALL

SELECT 
  'Important Dates' as metric,
  COUNT(*)::TEXT as value
FROM important_dates;

-- 5. List all test users with their details
SELECT 
  '📧 Test Users' as section,
  email as "Email",
  full_name as "Name",
  role as "Role",
  institution as "Institution"
FROM profiles
ORDER BY 
  CASE role
    WHEN 'admin' THEN 1
    WHEN 'reviewer' THEN 2
    WHEN 'author' THEN 3
    WHEN 'guest' THEN 4
  END;

-- 6. Check payment verification status
SELECT 
  '💰 Payment Status' as section,
  p.email,
  p.full_name,
  pv.category,
  pv.amount,
  pv.status,
  pv.transaction_id
FROM payment_verifications pv
JOIN profiles p ON pv.user_id = p.id
ORDER BY pv.created_at DESC;

-- 7. Check paper submissions
SELECT 
  '📄 Paper Submissions' as section,
  ps.cmt_paper_id,
  ps.title,
  ps.status,
  p.full_name as author
FROM paper_submissions ps
JOIN profiles p ON ps.user_id = p.id
ORDER BY ps.submission_date DESC;

-- 8. Expected Results Summary
SELECT '
============================================
✅ EXPECTED RESULTS
============================================
Total Users:           6
  - Admin:             1
  - Authors:           3
  - Reviewer:          1
  - Guest:             1

Paper Submissions:     3
Payment Verifications: 4
  - Pending:           3
  - Verified:          1
  
Contact Submissions:   3
Speakers:              3
Events:                5
Committee Members:     6
Important Dates:       5
============================================

🔐 TEST CREDENTIALS (Password: Test123!)
============================================
admin@adcomsys.com      (Admin)
author@adcomsys.com     (Author)
reviewer@adcomsys.com   (Reviewer)
guest@adcomsys.com      (Guest)
student@adcomsys.com    (Student)
industry@adcomsys.com   (Industry)
============================================
' as "Verification Summary";
