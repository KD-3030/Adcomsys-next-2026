-- ============================================================================
-- AdComSys 2026 - Comprehensive Test Data Seeding
-- ============================================================================
-- Run this in Supabase SQL Editor to populate test data
-- Includes 1 user for each role + sample data for testing admin panel
-- ============================================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- STEP 1: Create Test Users (One for Each Role)
-- ============================================================================
-- Password for all test users: "Test123!"
-- Hash generated using bcrypt with 10 rounds
-- You can use this to login and test different role permissions

-- 1. ADMIN USER
INSERT INTO profiles (id, email, full_name, password_hash, role, institution, designation, country, phone, is_active, created_at)
VALUES (
  uuid_generate_v4(),
  'admin@adcomsys.com',
  'Admin User',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye/IHEqCGwTPXqAVJQ0K5YEqzWZ.8rJFu', -- Test123!
  'admin',
  'UEM Kolkata',
  'System Administrator',
  'India',
  '+91-9876543210',
  true,
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  updated_at = NOW();

-- 2. AUTHOR USER (Regular Conference Attendee)
INSERT INTO profiles (id, email, full_name, password_hash, role, institution, designation, country, phone, cmt_profile_url, is_active, created_at)
VALUES (
  uuid_generate_v4(),
  'author@adcomsys.com',
  'Dr. Rajesh Kumar',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye/IHEqCGwTPXqAVJQ0K5YEqzWZ.8rJFu', -- Test123!
  'author',
  'IIT Delhi',
  'Assistant Professor',
  'India',
  '+91-9876543211',
  'https://cmt3.research.microsoft.com/AdComSys2025/Profile/12345',
  true,
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  updated_at = NOW();

-- 3. REVIEWER USER
INSERT INTO profiles (id, email, full_name, password_hash, role, institution, designation, country, phone, is_active, created_at)
VALUES (
  uuid_generate_v4(),
  'reviewer@adcomsys.com',
  'Prof. Anita Sharma',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye/IHEqCGwTPXqAVJQ0K5YEqzWZ.8rJFu', -- Test123!
  'reviewer',
  'NIT Trichy',
  'Professor',
  'India',
  '+91-9876543212',
  true,
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  updated_at = NOW();

-- 4. GUEST USER (Non-author attendee)
INSERT INTO profiles (id, email, full_name, password_hash, role, institution, designation, country, phone, is_active, created_at)
VALUES (
  uuid_generate_v4(),
  'guest@adcomsys.com',
  'John Doe',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye/IHEqCGwTPXqAVJQ0K5YEqzWZ.8rJFu', -- Test123!
  'guest',
  'XYZ Corporation',
  'Software Engineer',
  'USA',
  '+1-555-0123',
  true,
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  updated_at = NOW();

-- 5. Additional Test Users for Variety
INSERT INTO profiles (id, email, full_name, password_hash, role, institution, designation, country, phone, is_active, created_at)
VALUES 
(
  uuid_generate_v4(),
  'student@adcomsys.com',
  'Priya Patel',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye/IHEqCGwTPXqAVJQ0K5YEqzWZ.8rJFu',
  'author',
  'Jadavpur University',
  'PhD Student',
  'India',
  '+91-9876543213',
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'industry@adcomsys.com',
  'Michael Chen',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye/IHEqCGwTPXqAVJQ0K5YEqzWZ.8rJFu',
  'author',
  'Google Research',
  'Senior Research Scientist',
  'USA',
  '+1-555-0124',
  true,
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- STEP 2: Create Sample Paper Submissions
-- ============================================================================

INSERT INTO paper_submissions (id, user_id, cmt_paper_id, title, abstract, status, submission_date, created_at)
SELECT 
  uuid_generate_v4(),
  p.id,
  'CMT-2026-' || LPAD(ROW_NUMBER() OVER ()::TEXT, 4, '0'),
  CASE ROW_NUMBER() OVER ()
    WHEN 1 THEN 'Deep Learning Approaches for Network Security'
    WHEN 2 THEN 'IoT-Based Smart City Infrastructure'
    WHEN 3 THEN 'Blockchain Applications in Healthcare Systems'
  END,
  CASE ROW_NUMBER() OVER ()
    WHEN 1 THEN 'This paper presents novel deep learning techniques for detecting network intrusions in real-time systems...'
    WHEN 2 THEN 'We propose an IoT-based framework for smart city infrastructure management using edge computing...'
    WHEN 3 THEN 'This research explores the application of blockchain technology in securing healthcare data...'
  END,
  CASE ROW_NUMBER() OVER ()
    WHEN 1 THEN 'under_review'
    WHEN 2 THEN 'submitted'
    WHEN 3 THEN 'accepted'
  END,
  NOW() - (ROW_NUMBER() OVER () || ' days')::INTERVAL,
  NOW()
FROM (
  SELECT id FROM profiles WHERE email IN ('author@adcomsys.com', 'student@adcomsys.com', 'industry@adcomsys.com')
) p;

-- ============================================================================
-- STEP 3: Create Sample Payment Verifications
-- ============================================================================

INSERT INTO payment_verifications (
  id, 
  user_id, 
  amount, 
  currency, 
  category, 
  screenshot_url, 
  transaction_id, 
  status, 
  created_at
)
SELECT 
  uuid_generate_v4(),
  p.id,
  CASE 
    WHEN p.email = 'student@adcomsys.com' THEN 2000.00
    WHEN p.email = 'author@adcomsys.com' THEN 3000.00
    WHEN p.email = 'industry@adcomsys.com' THEN 5000.00
    ELSE 1500.00
  END,
  'INR',
  CASE 
    WHEN p.email = 'student@adcomsys.com' THEN 'student'
    WHEN p.email = 'author@adcomsys.com' THEN 'academician'
    WHEN p.email = 'industry@adcomsys.com' THEN 'industry'
    ELSE 'attendee'
  END,
  '/uploads/payment-screenshots/sample-' || p.id || '.jpg',
  'TXN' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 10)),
  CASE 
    WHEN p.email = 'student@adcomsys.com' THEN 'pending'
    WHEN p.email = 'author@adcomsys.com' THEN 'verified'
    WHEN p.email = 'industry@adcomsys.com' THEN 'pending'
    ELSE 'pending'
  END,
  NOW() - (ROW_NUMBER() OVER () || ' days')::INTERVAL
FROM profiles p
WHERE p.email IN ('student@adcomsys.com', 'author@adcomsys.com', 'industry@adcomsys.com', 'guest@adcomsys.com');

-- ============================================================================
-- STEP 4: Create Sample Contact Submissions
-- ============================================================================

INSERT INTO contact_submissions (id, name, email, subject, message, status, created_at)
VALUES 
(
  uuid_generate_v4(),
  'Sarah Johnson',
  'sarah.j@university.edu',
  'Question about Registration Deadline',
  'I would like to know if there is any possibility to extend the registration deadline as I am facing some issues with the payment gateway.',
  'new',
  NOW() - INTERVAL '2 days'
),
(
  uuid_generate_v4(),
  'David Wilson',
  'david.w@company.com',
  'Sponsorship Inquiry',
  'Our company is interested in becoming a sponsor for AdComSys 2026. Could you please share the sponsorship packages and benefits?',
  'new',
  NOW() - INTERVAL '1 day'
),
(
  uuid_generate_v4(),
  'Maria Garcia',
  'maria.g@tech.org',
  'Paper Submission Format',
  'I need clarification on the paper submission format. Should we use IEEE format or ACM format?',
  'replied',
  NOW() - INTERVAL '5 days'
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 5: Create Sample Keynote Speakers
-- ============================================================================

INSERT INTO speakers (id, name, designation, affiliation, bio, topic, session_date, display_order, is_active, created_at)
VALUES 
(
  uuid_generate_v4(),
  'Dr. Sunita Sarawagi',
  'Professor',
  'IIT Bombay, India',
  'Professor Sunita Sarawagi is a renowned expert in Machine Learning and Data Mining with over 20 years of research experience.',
  'The Future of AI in Communication Systems',
  '2026-05-05 10:00:00+05:30',
  1,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Prof. Andrew Ng',
  'Founder & CEO',
  'DeepLearning.AI, USA',
  'Andrew Ng is a global leader in AI education and research, founder of Coursera and deeplearning.ai.',
  'Machine Learning: Trends and Innovations',
  '2026-05-05 14:00:00+05:30',
  2,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Dr. Fei-Fei Li',
  'Professor',
  'Stanford University, USA',
  'Dr. Fei-Fei Li is a leading researcher in computer vision and AI ethics.',
  'Computer Vision and Human-Centered AI',
  '2026-05-06 10:00:00+05:30',
  3,
  true,
  NOW()
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 6: Create Sample Conference Events
-- ============================================================================

INSERT INTO events (id, title, description, event_date, event_time, venue, display_order, is_active, created_at)
VALUES 
(
  uuid_generate_v4(),
  'Inauguration Ceremony',
  'Grand opening of AdComSys 2026 with keynote address by distinguished guests',
  '2026-05-05 09:00:00+05:30',
  '09:00 AM - 10:00 AM',
  'Main Auditorium, UEM Kolkata',
  1,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Welcome Reception',
  'Networking dinner for all conference attendees and speakers',
  '2026-05-05 19:00:00+05:30',
  '07:00 PM - 09:00 PM',
  'Conference Hall',
  2,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Technical Paper Sessions',
  'Parallel tracks for research paper presentations',
  '2026-05-06 11:00:00+05:30',
  '11:00 AM - 05:00 PM',
  'Seminar Halls A, B, C',
  3,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Workshop on Emerging Technologies',
  'Hands-on workshop covering AI, IoT, and Cloud Computing',
  '2026-05-06 14:00:00+05:30',
  '02:00 PM - 05:00 PM',
  'Lab Complex',
  4,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Gala Banquet Dinner',
  'Formal dinner with cultural performances and networking',
  '2026-05-06 19:30:00+05:30',
  '07:30 PM - 10:00 PM',
  'Grand Ballroom',
  5,
  true,
  NOW()
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 7: Create Sample Committee Members
-- ============================================================================

INSERT INTO committee_members (id, name, designation, affiliation, email, committee_type, display_order, is_active, created_at)
VALUES 
-- Organizing Committee
(
  uuid_generate_v4(),
  'Prof. Biswajit Sarkar',
  'General Chair',
  'UEM Kolkata',
  'biswajit.sarkar@uem.edu.in',
  'organizing',
  1,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Dr. Amit Kumar Jain',
  'Program Chair',
  'UEM Kolkata',
  'amit.jain@uem.edu.in',
  'organizing',
  2,
  true,
  NOW()
),
-- Technical Committee
(
  uuid_generate_v4(),
  'Prof. Rajesh Bose',
  'Technical Chair',
  'IIT Kharagpur',
  'rajesh.bose@iitkgp.ac.in',
  'technical',
  1,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Dr. Sneha Chatterjee',
  'Technical Co-Chair',
  'Jadavpur University',
  'sneha.c@jadavpuruniversity.in',
  'technical',
  2,
  true,
  NOW()
),
-- Advisory Committee
(
  uuid_generate_v4(),
  'Prof. Manindra Agrawal',
  'Chief Advisor',
  'IIT Kanpur',
  'manindra@iitk.ac.in',
  'advisory',
  1,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Prof. Sanghamitra Bandyopadhyay',
  'Advisor',
  'ISI Kolkata',
  'sanghamitra@isical.ac.in',
  'advisory',
  2,
  true,
  NOW()
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 8: Create Important Dates
-- ============================================================================

INSERT INTO important_dates (id, title, date_value, description, display_order, is_active, created_at)
VALUES 
(
  uuid_generate_v4(),
  'Paper Submission Deadline',
  '2026-02-15 23:59:59+05:30',
  'Last date to submit full papers through CMT portal',
  1,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Notification of Acceptance',
  '2026-03-20 17:00:00+05:30',
  'Authors will be notified about paper acceptance',
  2,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Camera-Ready Submission',
  '2026-04-10 23:59:59+05:30',
  'Final camera-ready papers must be submitted',
  3,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Early Bird Registration',
  '2026-04-15 23:59:59+05:30',
  'Last date for early bird registration rates',
  4,
  true,
  NOW()
),
(
  uuid_generate_v4(),
  'Conference Dates',
  '2026-05-05 09:00:00+05:30',
  'Main conference (May 5-7, 2026)',
  5,
  true,
  NOW()
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 9: Create Sample Admin Logs
-- ============================================================================

DO $$
DECLARE
  admin_user_id UUID;
  author_user_id UUID;
BEGIN
  -- Get admin user ID
  SELECT id INTO admin_user_id FROM profiles WHERE email = 'admin@adcomsys.com' LIMIT 1;
  
  -- Get author user ID
  SELECT id INTO author_user_id FROM profiles WHERE email = 'author@adcomsys.com' LIMIT 1;
  
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO admin_logs (id, admin_id, action, entity_type, entity_id, details, created_at)
    VALUES 
    (
      uuid_generate_v4(),
      admin_user_id,
      'verified_payment',
      'payment_verification',
      (SELECT id FROM payment_verifications WHERE status = 'verified' LIMIT 1),
      jsonb_build_object(
        'message', 'Verified payment for Dr. Rajesh Kumar',
        'amount', '₹3000',
        'user', 'Dr. Rajesh Kumar'
      ),
      NOW() - INTERVAL '1 day'
    ),
    (
      uuid_generate_v4(),
      admin_user_id,
      'updated_user',
      'profile',
      author_user_id,
      jsonb_build_object(
        'message', 'Updated user role from author to reviewer',
        'old_role', 'author',
        'new_role', 'reviewer'
      ),
      NOW() - INTERVAL '3 days'
    );
  END IF;
END $$;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check all created users
SELECT 
  email,
  full_name,
  role,
  institution,
  is_active,
  created_at
FROM profiles
ORDER BY 
  CASE role
    WHEN 'admin' THEN 1
    WHEN 'reviewer' THEN 2
    WHEN 'author' THEN 3
    WHEN 'guest' THEN 4
  END,
  created_at;

-- Check paper submissions
SELECT 
  ps.cmt_paper_id,
  ps.title,
  ps.status,
  p.full_name as author_name,
  p.email as author_email,
  ps.submission_date
FROM paper_submissions ps
JOIN profiles p ON ps.user_id = p.id
ORDER BY ps.submission_date DESC;

-- Check payment verifications
SELECT 
  pv.transaction_id,
  p.full_name,
  p.email,
  pv.category,
  pv.amount,
  pv.status,
  pv.created_at
FROM payment_verifications pv
JOIN profiles p ON pv.user_id = p.id
ORDER BY pv.created_at DESC;

-- Check contact submissions
SELECT 
  name,
  email,
  subject,
  status,
  created_at
FROM contact_submissions
ORDER BY created_at DESC;

-- Summary Statistics
SELECT 
  'Users' as entity,
  COUNT(*) as total
FROM profiles
UNION ALL
SELECT 
  'Papers' as entity,
  COUNT(*) as total
FROM paper_submissions
UNION ALL
SELECT 
  'Payments' as entity,
  COUNT(*) as total
FROM payment_verifications
UNION ALL
SELECT 
  'Contact Submissions' as entity,
  COUNT(*) as total
FROM contact_submissions
UNION ALL
SELECT 
  'Speakers' as entity,
  COUNT(*) as total
FROM speakers
UNION ALL
SELECT 
  'Events' as entity,
  COUNT(*) as total
FROM events
UNION ALL
SELECT 
  'Committee Members' as entity,
  COUNT(*) as total
FROM committee_members
UNION ALL
SELECT 
  'Important Dates' as entity,
  COUNT(*) as total
FROM important_dates;

-- ============================================================================
-- TEST LOGIN CREDENTIALS
-- ============================================================================
-- Use these credentials to test different role access:
--
-- ADMIN:
--   Email: admin@adcomsys.com
--   Password: Test123!
--
-- AUTHOR:
--   Email: author@adcomsys.com
--   Password: Test123!
--
-- REVIEWER:
--   Email: reviewer@adcomsys.com
--   Password: Test123!
--
-- GUEST:
--   Email: guest@adcomsys.com
--   Password: Test123!
--
-- STUDENT:
--   Email: student@adcomsys.com
--   Password: Test123!
--
-- INDUSTRY:
--   Email: industry@adcomsys.com
--   Password: Test123!
-- ============================================================================
