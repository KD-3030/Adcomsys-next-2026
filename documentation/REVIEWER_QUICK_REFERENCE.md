# 🚀 Reviewer Dashboard - Quick Reference

## URLs
| Page | URL | Description |
|------|-----|-------------|
| Main Dashboard | `/reviewers/dashboard` | Statistics and quick actions |
| Review Papers | `/reviewers/dashboard/review-papers` | Papers pending review |
| Reviewed Papers | `/reviewers/dashboard/reviewed-papers` | Completed reviews |
| Profile | `/reviewers/dashboard/profile` | Profile settings |

## API Endpoints
```
GET  /api/reviewers/stats                    → Dashboard statistics
GET  /api/reviewers/papers/pending          → Papers to review
GET  /api/reviewers/papers/completed        → Reviewed papers
PUT  /api/reviewers/papers/[id]/review     → Submit review
GET  /api/reviewers/profile                 → Get profile
PUT  /api/reviewers/profile                 → Update profile
PUT  /api/reviewers/change-password        → Change password
```

## Quick Setup (5 minutes)

### 1. Database Migration
```sql
-- Run in Supabase SQL Editor
ALTER TABLE paper_submissions
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES profiles(id);

CREATE INDEX IF NOT EXISTS idx_paper_submissions_reviewed_by ON paper_submissions(reviewed_by);
```

### 2. Create Reviewer
```sql
INSERT INTO profiles (email, password_hash, full_name, role)
VALUES ('reviewer@test.com', '$2a$10$...', 'Test Reviewer', 'reviewer');
```

### 3. Assign Papers
```sql
UPDATE paper_submissions 
SET reviewer_id = 'reviewer-uuid',
    review_status = 'pending',
    status = 'under_review'
WHERE id IN (...);
```

### 4. Test
1. Login at `/login`
2. Navigate to `/reviewers/dashboard`
3. Click "Review Papers"
4. Submit a review

## Key Database Fields

### paper_submissions table
| Field | Type | Values |
|-------|------|--------|
| `reviewer_id` | UUID | Reviewer assigned to paper |
| `reviewed_by` | UUID | Reviewer who completed review |
| `review_status` | Text | 'pending', 'completed' |
| `review_comments` | Text | Reviewer feedback |
| `status` | Text | 'under_review', 'accepted', 'rejected' |
| `reviewed_at` | Timestamp | When review completed |

**Note:** `reviewer_id` = assigned reviewer, `reviewed_by` = who actually reviewed (useful for reassignments)

## Common Tasks

### Check Statistics
```sql
SELECT 
  COUNT(*) FILTER (WHERE review_status='pending') as pending,
  COUNT(*) FILTER (WHERE review_status='completed') as completed,
  COUNT(*) FILTER (WHERE status='accepted') as accepted,
  COUNT(*) FILTER (WHERE status='rejected') as rejected
FROM paper_submissions
WHERE reviewer_id = 'reviewer-uuid';
```

### View Pending Papers
```sql
SELECT cmt_paper_id, title, submission_date
FROM paper_submissions
WHERE reviewer_id = 'reviewer-uuid'
AND review_status = 'pending'
ORDER BY submission_date;
```

### Manually Submit Review
```sql
UPDATE paper_submissions
SET status = 'accepted',
    review_comments = 'Great work!',
    review_status = 'completed',
    reviewed_at = NOW()
WHERE id = 'paper-uuid';
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Dashboard shows 0 | Check papers assigned with correct reviewer_id |
| Can't login | Verify role='reviewer' in profiles table |
| Review submission fails | Run database migration for reviewed_at column |
| 404 on review | Verify paper.reviewer_id matches logged-in user |

## Test Credentials
```
Email: reviewer@test.com
Password: password123
Role: reviewer
```

## File Locations
```
Pages:     src/app/reviewers/dashboard/
API:       src/app/api/reviewers/
Migration: sql/add-reviewed-at-column.sql
Docs:      documentation/REVIEWER_*.md
```

## Features Checklist
- [x] Login as reviewer
- [x] View dashboard with statistics
- [x] List papers pending review
- [x] Submit review (accept/reject)
- [x] View reviewed papers
- [x] Update profile
- [x] Change password

## Quick bcrypt Hash
```bash
# Node.js
node -e "console.log(require('bcryptjs').hashSync('password123', 10))"

# Output example:
# $2a$10$rQB5pDPmXBbRQJ7z...
```

## Status Values Reference

### review_status
- `pending` - Awaiting review
- `completed` - Review submitted

### status (paper)
- `pending_approval` - Admin approval pending
- `submitted` - Approved, awaiting reviewer
- `under_review` - Assigned to reviewer
- `accepted` - Reviewer accepted
- `rejected` - Reviewer rejected

## Security Checks
✅ JWT authentication required  
✅ Role='reviewer' enforced  
✅ reviewer_id validated  
✅ Passwords bcrypt hashed  
✅ SQL injection prevented  

## Performance Tips
- Statistics are calculated on-demand
- Use indexes on reviewer_id and review_status
- Cache dashboard stats for 5 minutes
- Lazy load paper abstracts

## Need Help?
1. Check `/documentation/REVIEWER_DASHBOARD_COMPLETE.md`
2. Review `/documentation/REVIEWER_SETUP_GUIDE.md`
3. See `/documentation/REVIEWER_VS_AUTHOR_COMPARISON.md`

---

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Status:** Production Ready ✅
