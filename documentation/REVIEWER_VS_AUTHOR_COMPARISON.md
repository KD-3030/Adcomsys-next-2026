# Reviewer vs Author Dashboard Comparison

## System Overview

The AdComSys 2026 conference management system now includes complete dashboards for both **Authors** and **Reviewers**. Both systems follow similar architectural patterns while serving different user needs.

## Architecture Comparison

| Aspect | Author Dashboard | Reviewer Dashboard |
|--------|-----------------|-------------------|
| **Base Route** | `/authors/dashboard` | `/reviewers/dashboard` |
| **Required Role** | `role='author'` | `role='reviewer'` |
| **Primary Entity** | Papers submitted by user | Papers assigned to reviewer |
| **Key Relationship** | `user_id` = logged in user | `reviewer_id` = logged in user |
| **Authentication** | JWT with author role check | JWT with reviewer role check |

## Feature Comparison

### Dashboard Main Page

#### Author Dashboard (`/authors/dashboard`)
**Statistics Displayed:**
- Total Submissions (all papers submitted)
- Approved Submissions (papers approved by admin)
- Pending Approval (waiting for admin review)
- Under Review (being reviewed by reviewers)
- Payment Pending (awaiting payment verification)
- Payments Verified (completed payments)

**Quick Actions:**
- Submit New Paper
- View Submissions
- Payment History
- My Reviews (of their own papers)

#### Reviewer Dashboard (`/reviewers/dashboard`)
**Statistics Displayed:**
- Total Assigned Papers (papers assigned for review)
- Completed Reviews (reviews submitted)
- Pending Reviews (awaiting review)
- Accepted Papers (papers reviewer accepted)
- Rejected Papers (papers reviewer rejected)

**Quick Actions:**
- Review Papers (pending reviews)
- View Reviewed Papers (completed reviews)
- My Profile

### Paper Management

#### Author: Submissions Page (`/authors/dashboard/submissions`)
**Purpose:** View and manage submitted papers

**Features:**
- See all papers submitted by the author
- View submission status (pending_approval, submitted, under_review, accepted, rejected)
- Download or view paper PDFs (if implemented)
- See review feedback (when available)
- Track paper through approval workflow

**Filters/Sorting:**
- Filter by status
- Sort by submission date
- Search by title or CMT ID

**Actions Available:**
- View paper details
- See review comments (read-only)
- Update paper (if status allows)
- Submit revised version (if requested)

#### Reviewer: Review Papers Page (`/reviewers/dashboard/review-papers`)
**Purpose:** Review assigned papers and make accept/reject decisions

**Features:**
- See all papers assigned for review
- View paper details (title, abstract, authors, subject area)
- Submit reviews with comments
- Accept or reject papers
- Track papers pending review

**Filters/Sorting:**
- Only shows pending reviews
- Sort by submission date
- Search by title or CMT ID

**Actions Available:**
- Review paper (opens modal)
- Select Accept/Reject decision
- Write detailed review comments
- Submit review

### Review History

#### Author: Reviews Page (`/authors/dashboard/reviews`)
**Purpose:** View feedback received from reviewers

**Features:**
- See all papers that have been reviewed
- Read reviewer comments
- View acceptance/rejection decisions
- See review dates

**Information Displayed:**
- Paper title and CMT ID
- Review decision (accepted/rejected)
- Reviewer comments (anonymous or attributed)
- Review submission date
- Current paper status

**Actions Available:**
- Read review details
- Download review report (if implemented)
- Respond to reviews (if system allows)

#### Reviewer: Reviewed Papers Page (`/reviewers/dashboard/reviewed-papers`)
**Purpose:** View history of completed reviews

**Features:**
- See all papers reviewed
- View own review comments
- Track review decisions made
- Statistics on accept/reject ratio

**Information Displayed:**
- Paper title and CMT ID
- Review decision given
- Own review comments
- Review date
- Current paper status

**Actions Available:**
- View full review details
- See complete paper information
- Track paper final outcome

### Profile Management

#### Author Profile (`/authors/dashboard/profile`)
**Editable Fields:**
- Full Name
- Phone Number
- Institution
- Designation
- Country
- Research Interests
- Bio

**Additional Sections:**
- Password Change
- Account Settings
- Notification Preferences (if implemented)

#### Reviewer Profile (`/reviewers/dashboard/profile`)
**Editable Fields:**
- Full Name
- Phone Number
- Institution
- Designation
- Country
- Bio (professional background)

**Additional Sections:**
- Password Change
- Expertise Areas (future enhancement)
- Review Statistics (future enhancement)

**Similarities:**
- Both use same profile structure
- Both allow password changes
- Both have read-only email field
- Both use bcrypt for password security

### Payment Management

#### Author: Payments Page (`/authors/dashboard/payments`)
**Purpose:** Manage paper submission payments

**Features:**
- Submit payment verification
- Upload payment proof
- Track payment status
- View payment history

**Payment Workflow:**
- Author submits payment details
- Admin verifies payment
- Status updates to 'verified' or 'rejected'

**Status Values:**
- Pending
- Verified
- Rejected

#### Reviewer: No Payment Section
Reviewers don't handle payments, so this section doesn't exist in the reviewer dashboard.

## API Endpoint Comparison

### Authors API Endpoints
```
GET  /api/authors/papers          # Get author's papers
POST /api/authors/papers          # Submit new paper
GET  /api/authors/papers/[id]     # Get specific paper
PUT  /api/authors/papers/[id]     # Update paper

GET  /api/authors/payments        # Get payment history
POST /api/authors/payments        # Submit payment verification

GET  /api/authors/profile         # Get profile
PUT  /api/authors/profile         # Update profile

PUT  /api/authors/change-password # Change password
```

### Reviewers API Endpoints
```
GET  /api/reviewers/stats                    # Get dashboard stats
GET  /api/reviewers/papers/pending          # Get papers to review
GET  /api/reviewers/papers/completed        # Get reviewed papers
PUT  /api/reviewers/papers/[id]/review     # Submit review

GET  /api/reviewers/profile                 # Get profile
PUT  /api/reviewers/profile                 # Update profile

PUT  /api/reviewers/change-password        # Change password
```

## Database Interactions

### Author Queries
```sql
-- Get author's papers
SELECT * FROM paper_submissions 
WHERE user_id = 'author-id'
ORDER BY submission_date DESC;

-- Get paper with review
SELECT p.*, pr.full_name as reviewer_name
FROM paper_submissions p
LEFT JOIN profiles pr ON p.reviewer_id = pr.id
WHERE p.user_id = 'author-id';

-- Get payments
SELECT * FROM payment_verifications
WHERE user_id = 'author-id'
ORDER BY created_at DESC;
```

### Reviewer Queries
```sql
-- Get assigned papers
SELECT * FROM paper_submissions
WHERE reviewer_id = 'reviewer-id'
ORDER BY submission_date DESC;

-- Get pending reviews
SELECT * FROM paper_submissions
WHERE reviewer_id = 'reviewer-id'
AND review_status = 'pending'
ORDER BY submission_date ASC;

-- Get review statistics
SELECT 
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE status = 'accepted') as accepted,
  COUNT(*) FILTER (WHERE status = 'rejected') as rejected
FROM paper_submissions
WHERE reviewer_id = 'reviewer-id';
```

## Status Flow Comparison

### Paper Status from Author Perspective
```
1. Author submits paper → status: 'pending_approval'
2. Admin approves → status: 'submitted'
3. Admin assigns reviewer → status: 'under_review'
4. Reviewer reviews → status: 'accepted' or 'rejected'
5. Author sees final status in dashboard
```

### Paper Status from Reviewer Perspective
```
1. Paper assigned → review_status: 'pending', status: 'under_review'
2. Reviewer opens paper → (no status change)
3. Reviewer submits review → review_status: 'completed', status: 'accepted'/'rejected'
4. Paper moves to reviewed papers list
```

## Security Comparison

### Author Security Checks
- ✅ JWT token required
- ✅ Role must be 'author'
- ✅ Can only access own papers (`user_id` match)
- ✅ Can only view own payments
- ✅ Cannot access admin functions
- ✅ Cannot access reviewer functions

### Reviewer Security Checks
- ✅ JWT token required
- ✅ Role must be 'reviewer'
- ✅ Can only access assigned papers (`reviewer_id` match)
- ✅ Cannot view papers not assigned to them
- ✅ Cannot access admin functions
- ✅ Cannot access author submission functions

## UI/UX Similarities

### Shared Design Elements
- Same color scheme (Navy #14213d, Orange #fca311)
- Consistent card layouts
- Similar navigation patterns
- Matching button styles
- Same form components
- Unified toast notifications
- Identical loading states

### Responsive Behavior
- Both dashboards work on mobile, tablet, desktop
- Same breakpoints used
- Similar mobile menu patterns (if implemented)
- Consistent touch-friendly buttons

## Key Differences Summary

| Feature | Author Dashboard | Reviewer Dashboard |
|---------|-----------------|-------------------|
| **Primary Action** | Submit papers | Review papers |
| **Paper Relationship** | Owner/Creator | Evaluator/Judge |
| **Can Edit Papers** | Yes (own papers) | No (read-only) |
| **Can Submit Reviews** | No | Yes |
| **Payment Management** | Yes | No |
| **Status Changes** | Can see changes | Can make changes |
| **Approval Workflow** | Subject to approval | Not applicable |
| **Multiple Papers** | Can submit many | Can review many |

## Integration Points

### How Systems Work Together

1. **Paper Submission Flow**
   - Author submits → Admin approves → Reviewer assigned → Reviewer reviews → Status visible to author

2. **Review Visibility**
   - Reviewer submits review → Paper status updates → Author sees updated status in submissions

3. **Status Synchronization**
   - Single source of truth in `paper_submissions` table
   - Both dashboards query same data
   - Real-time consistency maintained

4. **Notification Flow (Future)**
   - Author submits → Admin notified
   - Admin assigns → Reviewer notified
   - Reviewer reviews → Author notified
   - Status changes → All parties notified

## Future Enhancements

### Planned Features for Both Dashboards

**Phase 1:**
- [ ] Email notifications
- [ ] PDF upload and viewing
- [ ] Real-time updates (WebSocket)
- [ ] Advanced search and filters

**Phase 2:**
- [ ] Discussion forum per paper
- [ ] Revision submission workflow
- [ ] Multiple reviewer support
- [ ] Review quality ratings

**Phase 3:**
- [ ] AI-assisted features
- [ ] Analytics and insights
- [ ] Export/import functionality
- [ ] Mobile app integration

## Migration from Author to Reviewer Dashboard

If you need to understand the author dashboard to work on the reviewer dashboard, these are the parallel files:

### Directory Mapping
```
AUTHORS                              REVIEWERS
src/app/authors/dashboard/          src/app/reviewers/dashboard/
├── layout.tsx           →          ├── layout.tsx
├── page.tsx            →          ├── page.tsx
├── submissions/        →          ├── review-papers/
├── reviews/            →          ├── reviewed-papers/
└── profile/            →          └── profile/
```

### API Mapping
```
AUTHORS                              REVIEWERS
/api/authors/papers      →          /api/reviewers/papers/pending
/api/authors/papers      →          /api/reviewers/papers/completed
/api/authors/profile     →          /api/reviewers/profile
```

## Conclusion

Both dashboard systems follow similar patterns and share common infrastructure, making them easy to maintain and extend. The reviewer dashboard was intentionally designed to mirror the author dashboard structure while serving the specific needs of the review workflow.

---

**Last Updated:** January 2025  
**Documentation Version:** 1.0.0  
**Related Docs:** 
- `REVIEWER_DASHBOARD_COMPLETE.md`
- `REVIEWER_SETUP_GUIDE.md`
- `AUTHORS_DASHBOARD_STRUCTURE.md`
