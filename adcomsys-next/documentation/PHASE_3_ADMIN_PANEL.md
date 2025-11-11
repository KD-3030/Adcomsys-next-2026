# Phase 3: Admin Panel Implementation Plan

## Overview
Build a comprehensive admin panel for managing the AdComSys 2026 conference website.

---

## 🎯 Admin Panel Structure

```
/admin (Admin Dashboard)
├── /admin/users (User Management)
├── /admin/papers (Paper Submissions)
├── /admin/payments (Payment Verifications)
├── /admin/events (Event Management)
├── /admin/speakers (Speaker Management)
├── /admin/committee (Committee Management)
├── /admin/contacts (Contact Form Responses)
└── /admin/settings (Configuration)
```

---

## 📊 Features to Implement

### 1. Admin Dashboard (`/admin`)
**Priority**: High

**Features**:
- Overview statistics cards:
  - Total registrations
  - Pending payment verifications
  - Total paper submissions
  - Unread contact messages
- Recent activity feed
- Quick actions panel
- Charts/graphs for analytics

**Components Needed**:
- Statistics cards
- Activity timeline
- Chart component (recharts or similar)
- Quick action buttons

---

### 2. User Management (`/admin/users`)
**Priority**: High

**Features**:
- View all registered users
- Search and filter users (by name, email, role, status)
- Edit user details (name, email, role)
- Delete users
- Change user roles (student, academician, industry, attendee, admin)
- View user registration details
- Export user list to CSV

**Components Needed**:
- Data table with sorting
- Search bar
- Filter dropdowns
- Edit user dialog
- Delete confirmation dialog
- Pagination

**API Routes**:
- `GET /api/admin/users` - List all users
- `GET /api/admin/users/[id]` - Get user details
- `PUT /api/admin/users/[id]` - Update user
- `DELETE /api/admin/users/[id]` - Delete user

---

### 3. Paper Submission Management (`/admin/papers`)
**Priority**: High

**Features**:
- View all paper submissions from CMT (if API available)
- Link CMT paper IDs to user profiles
- Mark papers as accepted/rejected
- View paper metadata (title, authors, track)
- Filter by track, status
- Search by title/author
- Export list to CSV

**Components Needed**:
- Data table
- Filter by track/status
- Search functionality
- Paper details modal
- Status update dropdown

**API Routes**:
- `GET /api/admin/papers` - List all papers
- `GET /api/admin/papers/[id]` - Get paper details
- `PUT /api/admin/papers/[id]` - Update paper status

---

### 4. Payment Verification (`/admin/payments`)
**Priority**: High

**Features**:
- View all payment screenshot submissions
- Display uploaded payment proofs
- Approve or reject payments
- Add admin notes/comments
- Filter by status (pending, approved, rejected)
- Send email notifications on approval/rejection
- View payment details (amount, date, transaction ID)

**Components Needed**:
- Data table with image preview
- Image viewer/lightbox
- Approve/Reject buttons
- Comment input field
- Status filter
- Email notification trigger

**API Routes**:
- `GET /api/admin/payments` - List all payments
- `GET /api/admin/payments/[id]` - Get payment details
- `PUT /api/admin/payments/[id]` - Update payment status
- `POST /api/admin/payments/[id]/notify` - Send email notification

**File Upload Needed**:
- User-side upload component for payment screenshots
- Storage in Supabase Storage or file system
- Image validation (format, size)

---

### 5. Event Management (`/admin/events`)
**Priority**: Medium

**Features**:
- CRUD operations for events
- Add/Edit/Delete events
- Update event details (title, date, time, location, description)
- Reorder events
- Toggle event visibility

**Components Needed**:
- Event list table
- Add/Edit event dialog
- Delete confirmation
- Form with date/time picker

**API Routes**:
- `GET /api/admin/events` - List all events
- `POST /api/admin/events` - Create new event
- `PUT /api/admin/events/[id]` - Update event
- `DELETE /api/admin/events/[id]` - Delete event

---

### 6. Speaker Management (`/admin/speakers`)
**Priority**: Medium

**Features**:
- CRUD operations for speakers
- Add/Edit/Delete speaker profiles
- Upload speaker photos
- Update keynote topics
- Reorder speakers
- Toggle speaker visibility

**Components Needed**:
- Speaker list with photos
- Add/Edit speaker dialog
- Image upload component
- Delete confirmation

**API Routes**:
- `GET /api/admin/speakers` - List all speakers
- `POST /api/admin/speakers` - Create speaker
- `PUT /api/admin/speakers/[id]` - Update speaker
- `DELETE /api/admin/speakers/[id]` - Delete speaker
- `POST /api/admin/speakers/[id]/photo` - Upload photo

---

### 7. Committee Management (`/admin/committee`)
**Priority**: Medium

**Features**:
- CRUD operations for committee members
- Add/Edit/Delete members
- Assign committee type (Organizing/Technical/Advisory)
- Update member details
- Reorder members within categories

**Components Needed**:
- Tabbed interface matching frontend
- Member list per tab
- Add/Edit member dialog
- Delete confirmation

**API Routes**:
- `GET /api/admin/committee` - List all members
- `POST /api/admin/committee` - Add member
- `PUT /api/admin/committee/[id]` - Update member
- `DELETE /api/admin/committee/[id]` - Delete member

---

### 8. Contact Form Responses (`/admin/contacts`)
**Priority**: Medium

**Features**:
- View all contact form submissions
- Mark as read/unread
- Reply to contacts via email
- Filter by status (new, read, replied)
- Search by name/email
- Delete old submissions
- Export to CSV

**Components Needed**:
- Data table with status badges
- Message detail view
- Reply email dialog
- Status filter
- Delete confirmation

**API Routes**:
- `GET /api/admin/contacts` - List all contacts
- `GET /api/admin/contacts/[id]` - Get contact details
- `PUT /api/admin/contacts/[id]` - Update status
- `POST /api/admin/contacts/[id]/reply` - Send reply email
- `DELETE /api/admin/contacts/[id]` - Delete submission

---

### 9. Settings/Configuration (`/admin/settings`)
**Priority**: Low

**Features**:
- Update conference details
- Edit important dates
- Configure email templates
- Manage registration fees
- Update bank details
- Toggle features on/off

**Components Needed**:
- Settings form sections
- Date pickers
- Toggle switches
- Rich text editor for email templates

**API Routes**:
- `GET /api/admin/settings` - Get all settings
- `PUT /api/admin/settings` - Update settings

---

## 🔐 Security & Authorization

### Middleware Updates
- Extend `/middleware.ts` to protect `/admin/*` routes
- Check for `role === 'admin'` in JWT payload
- Redirect non-admins to dashboard with error message

### Admin User Creation
- Create SQL script to promote user to admin:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'admin@example.com';
```

### Audit Logging
- Log all admin actions to `admin_logs` table
- Track: user_id, action, table_name, record_id, timestamp, details

---

## 📦 Additional Components to Install

```bash
# Data table
npx shadcn@latest add data-table

# Calendar/Date picker
npx shadcn@latest add calendar
npx shadcn@latest add popover

# Checkbox
npx shadcn@latest add checkbox

# Radio group
npx shadcn@latest add radio-group

# Switch
npx shadcn@latest add switch

# Separator
npx shadcn@latest add separator

# Command (for search)
npx shadcn@latest add command
```

---

## 🚀 Implementation Order

### Week 1: Foundation
1. ✅ Create admin dashboard layout
2. ✅ Implement admin route protection
3. ✅ Build statistics cards
4. ✅ Create admin navigation sidebar

### Week 2: Core Features
5. ✅ User management page
6. ✅ Payment verification page
7. ✅ Contact responses page

### Week 3: Content Management
8. ✅ Event management
9. ✅ Speaker management
10. ✅ Committee management

### Week 4: Advanced Features
11. ✅ Paper management
12. ✅ Email notifications (Resend integration)
13. ✅ Settings page
14. ✅ Audit logging
15. ✅ Export functionality

---

## 📧 Email Notifications

### Resend Integration
- Welcome email on signup
- Payment verification notification (approved/rejected)
- Paper submission confirmation
- Contact form auto-reply
- Admin alerts for new submissions

### Email Templates
- HTML email templates with conference branding
- Variables: {name}, {email}, {status}, etc.
- Store templates in database or files

---

## 📤 File Upload System

### Payment Screenshots
**Location**: Supabase Storage or local `/uploads`

**Flow**:
1. User uploads file in dashboard
2. Validate file (type: jpg/png/pdf, max: 5MB)
3. Store with unique filename: `payment_${userId}_${timestamp}.ext`
4. Save file path in `payment_verifications` table
5. Admin views/downloads from admin panel

**API Routes**:
- `POST /api/upload/payment` - Upload payment screenshot
- `GET /api/upload/payment/[filename]` - View/download file

---

## 🧪 Testing Checklist

- [ ] Admin user can access all admin routes
- [ ] Non-admin users are redirected from admin routes
- [ ] CRUD operations work for all entities
- [ ] File upload works correctly
- [ ] Email notifications are sent
- [ ] Search and filters work properly
- [ ] Data exports to CSV
- [ ] Mobile responsive design
- [ ] Error handling for all operations
- [ ] Audit logs are created

---

## 📝 Notes

1. **Admin Creation**: Manually update database to create first admin user
2. **Permissions**: Consider adding more granular permissions later (view-only admin, etc.)
3. **Rate Limiting**: Add rate limiting to prevent abuse of upload endpoints
4. **Backups**: Implement regular database backups before allowing deletions
5. **Soft Deletes**: Consider soft deletes instead of hard deletes for audit trail

---

## 🎯 Success Criteria

Admin panel is complete when:
- ✅ All CRUD operations work for each entity
- ✅ Admins can manage users, payments, papers
- ✅ Email notifications are sent automatically
- ✅ File uploads work securely
- ✅ Dashboard shows real-time statistics
- ✅ All operations are logged
- ✅ Mobile-responsive design
- ✅ Comprehensive error handling

---

*Ready to start Phase 3? Let's build the admin panel!*
