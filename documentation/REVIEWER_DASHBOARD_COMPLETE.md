# Reviewer Dashboard System - Complete Implementation

## Overview
A complete reviewer dashboard system has been implemented, mirroring the author dashboard functionality. The system allows reviewers to view assigned papers, submit reviews with accept/reject decisions, view their review history, and manage their profiles.

## System Architecture

### Database Schema
The `paper_submissions` table supports the reviewer workflow with these key fields:
- `reviewer_id` - Foreign key to profiles table (reviewer assigned to the paper)
- `reviewed_by` - Foreign key to profiles table (reviewer who completed the review)
- `review_status` - Enum: 'pending' | 'completed'
- `review_comments` - Text field for reviewer feedback
- `status` - Paper status: 'pending_approval' | 'submitted' | 'under_review' | 'accepted' | 'rejected'
- `reviewed_at` - Timestamp when review was completed
- `cmt_paper_id` - Unique identifier for the paper

**Note:** `reviewer_id` indicates who is assigned, while `reviewed_by` records who actually completed the review. This distinction is useful for tracking reassignments or review history.

### Relationships
- **One Reviewer → Many Papers**: One reviewer can review multiple papers
- **One Author → Many Papers**: One author can submit multiple papers
- **Paper Status Flow**: When a reviewer marks a paper as 'accepted' or 'rejected', it becomes visible to the author in their dashboard

## File Structure

### Frontend Pages
```
src/app/reviewers/dashboard/
├── layout.tsx                    # Dashboard layout wrapper
├── page.tsx                      # Main dashboard with statistics
├── review-papers/
│   └── page.tsx                 # View and review assigned papers
├── reviewed-papers/
│   └── page.tsx                 # View completed reviews
└── profile/
    └── page.tsx                 # Profile management and password change
```

### API Routes
```
src/app/api/reviewers/
├── stats/
│   └── route.ts                 # GET: Dashboard statistics
├── papers/
│   ├── pending/
│   │   └── route.ts            # GET: Papers pending review
│   ├── completed/
│   │   └── route.ts            # GET: Reviewed papers
│   └── [id]/
│       └── review/
│           └── route.ts        # PUT: Submit review
├── profile/
│   └── route.ts                # GET/PUT: Profile management
└── change-password/
    └── route.ts                # PUT: Change password
```

### Database Migration
```
sql/
└── add-reviewed-at-column.sql   # Adds reviewed_at timestamp column
```

## Features Implemented

### 1. Main Dashboard (`/reviewers/dashboard`)
**Statistics Cards:**
- Total Assigned Papers
- Completed Reviews
- Pending Reviews
- Accepted Papers
- Rejected Papers

**Quick Actions:**
- Review Papers (link to pending papers)
- View Reviewed Papers (link to completed reviews)
- Manage Profile (link to profile page)

**Authentication:**
- JWT-based authentication with role check
- Automatic redirect to login if unauthorized

### 2. Review Papers Page (`/reviewers/dashboard/review-papers`)
**Features:**
- Lists all papers assigned to the reviewer with `review_status='pending'`
- Displays paper details: CMT ID, title, abstract, authors, subject area, submission date
- Status badges for paper status and review status
- Modal dialog for submitting reviews

**Review Submission:**
- Decision dropdown: Accept or Reject
- Required review comments (minimum validation)
- Updates paper status ('accepted' or 'rejected')
- Updates review_status to 'completed'
- Records reviewed_at timestamp
- Real-time UI updates after submission

**Validation:**
- Ensures paper is assigned to the logged-in reviewer
- Requires both decision and comments
- Server-side validation of status values

### 3. Reviewed Papers Page (`/reviewers/dashboard/reviewed-papers`)
**Features:**
- Lists all papers with `review_status='completed'`
- Summary statistics: Total Reviewed, Accepted, Rejected
- Displays review history with timestamps
- Visual indicators (green checkmark for accepted, red X for rejected)

**Detail View:**
- Full paper information
- Complete review comments
- Decision status with colored badges
- Submission and review dates

### 4. Profile Page (`/reviewers/dashboard/profile`)
**Profile Management:**
- Full Name (editable)
- Email (read-only)
- Phone Number
- Institution
- Designation
- Country
- Bio

**Password Change:**
- Current password verification
- New password with confirmation
- Minimum 8 characters validation
- bcrypt hashing for security

## API Endpoints

### GET `/api/reviewers/stats`
Returns dashboard statistics for the logged-in reviewer.

**Response:**
```json
{
  "totalAssignedPapers": 10,
  "completedReviews": 7,
  "pendingReviews": 3,
  "acceptedPapers": 5,
  "rejectedPapers": 2
}
```

### GET `/api/reviewers/papers/pending`
Returns papers assigned to the reviewer with pending review status.

**Response:**
```json
{
  "papers": [
    {
      "id": "uuid",
      "cmt_paper_id": "CMT001",
      "title": "Paper Title",
      "abstract": "Abstract text...",
      "authors": "Author names",
      "subject_area": "Computer Science",
      "status": "under_review",
      "review_status": "pending",
      "submission_date": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### GET `/api/reviewers/papers/completed`
Returns papers that have been reviewed by the reviewer.

**Response:**
```json
{
  "papers": [
    {
      "id": "uuid",
      "cmt_paper_id": "CMT002",
      "title": "Paper Title",
      "status": "accepted",
      "review_status": "completed",
      "review_comments": "Review text...",
      "reviewed_at": "2024-01-20T14:30:00Z"
    }
  ]
}
```

### PUT `/api/reviewers/papers/[id]/review`
Submits a review for a paper.

**Request Body:**
```json
{
  "status": "accepted",
  "review_comments": "Detailed feedback...",
  "review_status": "completed"
}
```

**Response:**
```json
{
  "message": "Review submitted successfully",
  "paper": { /* updated paper object */ }
}
```

**Validation:**
- Verifies paper is assigned to the reviewer
- Validates status is either 'accepted' or 'rejected'
- Requires review_comments

### GET `/api/reviewers/profile`
Fetches the reviewer's profile information.

### PUT `/api/reviewers/profile`
Updates the reviewer's profile.

**Request Body:**
```json
{
  "full_name": "John Doe",
  "phone": "+1234567890",
  "institution": "University Name",
  "designation": "Professor",
  "country": "USA",
  "bio": "Professional background..."
}
```

### PUT `/api/reviewers/change-password`
Changes the reviewer's password.

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

**Validation:**
- Verifies current password with bcrypt
- Minimum 8 characters for new password
- Hashes new password before storing

## Security Implementation

### Authentication
- JWT token stored in httpOnly cookie
- Token verification on all API routes
- Role-based access control (reviewer role required)
- Automatic redirect to login on unauthorized access

### Authorization
- Reviewer can only access their own papers
- Papers are filtered by `reviewer_id` in queries
- Double verification on review submission
- Password change requires current password

### Data Validation
- Server-side validation on all inputs
- Status values restricted to enum values
- Required field validation
- SQL injection prevention via parameterized queries

## Integration with Author Dashboard

### Paper Status Visibility
When a reviewer marks a paper as 'accepted' or 'rejected':
1. The `status` field in `paper_submissions` is updated
2. Authors can see this status in their submissions page
3. Review comments become visible to authors (if system configured)

### Notification Flow (Future Enhancement)
The system is ready for email notifications:
- When paper is assigned to reviewer
- When review is completed (notify author)
- When paper is accepted/rejected

## UI/UX Features

### Design Consistency
- Matches existing brand colors (Navy #14213d, Orange #fca311)
- Consistent card layouts across dashboard
- Responsive design for mobile and desktop
- Gradient backgrounds matching site theme

### User Feedback
- Toast notifications for all actions
- Loading states during API calls
- Error handling with user-friendly messages
- Success confirmations

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance

## Database Migration Steps

1. Run the migration script:
```sql
-- Execute in Supabase SQL Editor
\i sql/add-reviewed-at-column.sql
```

2. Verify the column was added:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'paper_submissions' 
AND column_name = 'reviewed_at';
```

## Testing Checklist

### Functionality Testing
- [ ] Login as reviewer role
- [ ] View dashboard statistics
- [ ] Access review papers page
- [ ] Submit a review with accept decision
- [ ] Submit a review with reject decision
- [ ] View reviewed papers
- [ ] Check review details in modal
- [ ] Update profile information
- [ ] Change password
- [ ] Verify author sees updated paper status

### Security Testing
- [ ] Try accessing without authentication
- [ ] Try accessing with author role
- [ ] Try reviewing paper not assigned to you
- [ ] Try SQL injection in forms
- [ ] Verify password is hashed in database

### UI Testing
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768px)
- [ ] Test on mobile (375px)
- [ ] Check all buttons are clickable
- [ ] Verify form validations work
- [ ] Test modal open/close

## Usage Instructions

### For Admins: Assigning Papers to Reviewers
```sql
-- Assign a paper to a reviewer
UPDATE paper_submissions 
SET reviewer_id = 'reviewer-uuid',
    review_status = 'pending',
    status = 'under_review'
WHERE id = 'paper-uuid';
```

### For Reviewers: Reviewing Papers
1. Login with reviewer credentials
2. Navigate to "Review Papers" from dashboard
3. Click "Review Paper" on any assigned paper
4. Read the abstract and paper details
5. Select Accept or Reject
6. Provide detailed review comments
7. Click "Submit Review"

### For Authors: Checking Paper Status
Authors can see their paper status in `/authors/dashboard/submissions`:
- Papers marked as 'accepted' will show green badge
- Papers marked as 'rejected' will show red badge
- Review comments may be visible depending on configuration

## Future Enhancements

### Phase 1 (Immediate)
- [ ] Email notifications on review completion
- [ ] PDF paper upload and viewing
- [ ] Reviewer expertise matching
- [ ] Review deadline tracking

### Phase 2 (Short-term)
- [ ] Multiple reviewers per paper
- [ ] Reviewer consensus system
- [ ] Review quality ratings
- [ ] Conflict of interest declaration

### Phase 3 (Long-term)
- [ ] Automated paper assignment
- [ ] AI-assisted review suggestions
- [ ] Review analytics dashboard
- [ ] Peer review discussion forum

## Troubleshooting

### Common Issues

**Issue: "Paper not found or not assigned to you"**
- Solution: Verify the paper has the correct reviewer_id in the database

**Issue: Statistics showing 0 for all values**
- Solution: Check if papers are assigned with correct reviewer_id

**Issue: "Unauthorized" error**
- Solution: Clear cookies and login again; verify JWT token is valid

**Issue: Review submission fails**
- Solution: Check that status value is exactly 'accepted' or 'rejected'

### Debug Queries
```sql
-- Check papers assigned to a reviewer
SELECT id, cmt_paper_id, title, review_status, status 
FROM paper_submissions 
WHERE reviewer_id = 'reviewer-uuid';

-- Check reviewer profile
SELECT id, email, full_name, role 
FROM profiles 
WHERE role = 'reviewer';

-- Verify reviewed_at column exists
SELECT * FROM paper_submissions WHERE reviewed_at IS NOT NULL;
```

## Contact & Support
For issues or questions about the reviewer dashboard system, refer to the main project documentation or contact the development team.

---

**Implementation Date:** January 2025  
**Version:** 1.0.0  
**Status:** ✅ Complete and Ready for Testing
