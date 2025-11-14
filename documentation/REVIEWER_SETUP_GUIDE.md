# Reviewer Dashboard Quick Setup Guide

## Prerequisites
- Database migration for `reviewed_at` column must be applied
- At least one user account with `role='reviewer'` must exist
- Papers must be assigned to reviewers

## Step 1: Apply Database Migration

Run this SQL in your Supabase SQL Editor:

```sql
-- Add reviewed_at and reviewed_by columns to paper_submissions table
ALTER TABLE paper_submissions
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES profiles(id);

COMMENT ON COLUMN paper_submissions.reviewed_at IS 'Timestamp when the paper was reviewed by the reviewer';
COMMENT ON COLUMN paper_submissions.reviewed_by IS 'ID of the reviewer who completed the review (may differ from reviewer_id if reassigned)';

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_paper_submissions_reviewed_by ON paper_submissions(reviewed_by);
```

## Step 2: Create Test Reviewer Account

If you don't have a reviewer account yet:

```sql
-- Create a reviewer user
INSERT INTO profiles (
  id,
  email,
  password_hash,
  full_name,
  role,
  institution,
  designation,
  country,
  created_at
) VALUES (
  gen_random_uuid(),
  'reviewer@test.com',
  '$2a$10$YourHashedPasswordHere',  -- Replace with actual bcrypt hash
  'Test Reviewer',
  'reviewer',
  'Test University',
  'Professor',
  'USA',
  NOW()
);
```

Or use bcrypt to hash a password:
```bash
# Using Node.js
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('password123', 10));"
```

## Step 3: Assign Papers to Reviewer

```sql
-- Get reviewer ID
SELECT id, email FROM profiles WHERE role = 'reviewer';

-- Assign papers to reviewer (replace UUIDs with actual values)
UPDATE paper_submissions 
SET 
  reviewer_id = 'reviewer-uuid-here',
  review_status = 'pending',
  status = 'under_review'
WHERE id IN (
  SELECT id FROM paper_submissions 
  WHERE reviewer_id IS NULL 
  LIMIT 5
);
```

## Step 4: Test the System

### 1. Login as Reviewer
- Navigate to `/login`
- Email: `reviewer@test.com`
- Password: `password123` (or whatever you set)

### 2. View Dashboard
- You should see statistics on the main dashboard
- Navigate to `/reviewers/dashboard`

### 3. Review a Paper
1. Click "Review Papers" or go to `/reviewers/dashboard/review-papers`
2. Click "Review Paper" on any assigned paper
3. Select "Accept" or "Reject"
4. Add review comments
5. Click "Submit Review"

### 4. View Reviewed Papers
- Navigate to `/reviewers/dashboard/reviewed-papers`
- You should see papers you've reviewed
- Click "View Details" to see full review

### 5. Update Profile
- Navigate to `/reviewers/dashboard/profile`
- Update your information
- Change password if needed

## Step 5: Verify Author Can See Status

### Login as Author
```sql
-- Get the author's email for a paper you reviewed
SELECT u.email, p.title, p.status 
FROM paper_submissions p
JOIN profiles u ON p.user_id = u.id
WHERE p.reviewer_id = 'reviewer-uuid';
```

### Check Author Dashboard
- Login with the author's credentials
- Go to `/authors/dashboard/submissions`
- The paper status should show "Accepted" or "Rejected"

## Verification Queries

### Check Reviewer Statistics
```sql
SELECT 
  COUNT(*) as total_assigned,
  COUNT(*) FILTER (WHERE review_status = 'completed') as completed,
  COUNT(*) FILTER (WHERE review_status = 'pending') as pending,
  COUNT(*) FILTER (WHERE status = 'accepted') as accepted,
  COUNT(*) FILTER (WHERE status = 'rejected') as rejected
FROM paper_submissions
WHERE reviewer_id = 'reviewer-uuid-here';
```

### Check Papers Pending Review
```sql
SELECT 
  id, 
  cmt_paper_id, 
  title, 
  status, 
  review_status,
  submission_date
FROM paper_submissions
WHERE reviewer_id = 'reviewer-uuid-here'
AND review_status = 'pending'
ORDER BY submission_date DESC;
```

### Check Completed Reviews
```sql
SELECT 
  id, 
  cmt_paper_id, 
  title, 
  status, 
  review_status,
  review_comments,
  reviewed_at
FROM paper_submissions
WHERE reviewer_id = 'reviewer-uuid-here'
AND review_status = 'completed'
ORDER BY reviewed_at DESC;
```

## Expected Results

✅ **Dashboard shows correct statistics:**
- Total Assigned Papers: 5 (or however many you assigned)
- Completed Reviews: Increases after submitting reviews
- Pending Reviews: Decreases after submitting reviews
- Accepted/Rejected: Matches your decisions

✅ **Review Papers page shows:**
- Only papers with `review_status='pending'`
- Full paper details (title, abstract, authors, subject area)
- Review dialog opens when clicking "Review Paper"

✅ **Reviewed Papers page shows:**
- Only papers with `review_status='completed'`
- Statistics cards with correct counts
- Review comments displayed correctly

✅ **Profile page shows:**
- Current profile information
- Email is read-only
- Password change form works

✅ **Author dashboard shows:**
- Updated paper status (accepted/rejected)
- Status visible in submissions list

## Troubleshooting

### Problem: Dashboard shows 0 for all statistics
**Solution:** Check that papers are assigned to the correct reviewer_id:
```sql
SELECT reviewer_id FROM paper_submissions WHERE id = 'paper-uuid';
```

### Problem: "Paper not found or not assigned to you"
**Solution:** Verify the paper has the correct reviewer_id:
```sql
UPDATE paper_submissions 
SET reviewer_id = 'correct-reviewer-uuid'
WHERE id = 'paper-uuid';
```

### Problem: Review submission returns 500 error
**Solution:** Check the server logs and ensure `reviewed_at` column exists:
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'paper_submissions' AND column_name = 'reviewed_at';
```

### Problem: Can't login as reviewer
**Solution:** Verify the reviewer account exists and has correct role:
```sql
SELECT id, email, role FROM profiles WHERE email = 'reviewer@test.com';
```

### Problem: Author doesn't see updated status
**Solution:** Refresh the author's dashboard or check the paper was actually updated:
```sql
SELECT id, cmt_paper_id, status, user_id 
FROM paper_submissions 
WHERE reviewer_id = 'reviewer-uuid';
```

## Quick Test Script

You can use this SQL script to quickly set up test data:

```sql
-- 1. Create reviewer (if doesn't exist)
INSERT INTO profiles (id, email, password_hash, full_name, role)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'reviewer@test.com',
  '$2a$10$XYZ...',  -- bcrypt hash of 'password123'
  'Test Reviewer',
  'reviewer'
) ON CONFLICT (email) DO NOTHING;

-- 2. Create author (if doesn't exist)
INSERT INTO profiles (id, email, password_hash, full_name, role)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'author@test.com',
  '$2a$10$XYZ...',  -- bcrypt hash of 'password123'
  'Test Author',
  'author'
) ON CONFLICT (email) DO NOTHING;

-- 3. Create test papers
INSERT INTO paper_submissions (
  id, cmt_paper_id, title, abstract, user_id, 
  reviewer_id, status, review_status, authors, subject_area
) VALUES
(
  gen_random_uuid(),
  'CMT001',
  'AI in Healthcare',
  'This paper discusses the application of AI in healthcare...',
  '00000000-0000-0000-0000-000000000002',  -- author
  '00000000-0000-0000-0000-000000000001',  -- reviewer
  'under_review',
  'pending',
  'John Doe, Jane Smith',
  'Artificial Intelligence'
),
(
  gen_random_uuid(),
  'CMT002',
  'Machine Learning Algorithms',
  'An analysis of modern machine learning algorithms...',
  '00000000-0000-0000-0000-000000000002',  -- author
  '00000000-0000-0000-0000-000000000001',  -- reviewer
  'under_review',
  'pending',
  'Jane Smith',
  'Machine Learning'
);

-- 4. Verify setup
SELECT 
  'Papers assigned:' as status,
  COUNT(*) as count 
FROM paper_submissions 
WHERE reviewer_id = '00000000-0000-0000-0000-000000000001';
```

## Next Steps

After successful testing:
1. ✅ Test all reviewer workflows
2. ✅ Verify security (try accessing with wrong role)
3. ✅ Test on mobile devices
4. ✅ Implement email notifications (optional)
5. ✅ Add paper PDF upload/viewing (optional)
6. ✅ Deploy to production

## Support

For detailed documentation, see: `documentation/REVIEWER_DASHBOARD_COMPLETE.md`

---

**Setup Time:** ~10 minutes  
**Prerequisites:** Database access, basic SQL knowledge  
**Difficulty:** Easy
