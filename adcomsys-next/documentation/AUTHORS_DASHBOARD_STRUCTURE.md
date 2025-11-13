# Authors Dashboard - Reorganized Structure

## Overview
The author dashboard has been reorganized into a dedicated `/authors` directory with its own routing structure and API endpoints. This creates a clear separation between author functionality and other parts of the application.

## New Directory Structure

```
src/app/authors/
├── page.tsx                    # Root redirect to /authors/dashboard
└── dashboard/
    ├── layout.tsx              # Authentication guard
    ├── page.tsx                # Main dashboard
    ├── submissions/
    │   └── page.tsx           # Paper submissions
    ├── payments/
    │   └── page.tsx           # Payment verification
    ├── profile/
    │   └── page.tsx           # Profile management
    └── reviews/
        └── page.tsx           # Reviewer dashboard

src/app/api/authors/
├── submissions/
│   └── route.ts              # GET submissions
├── payments/
│   └── route.ts              # GET payments
├── profile/
│   └── route.ts              # PUT profile
├── reviews/
│   └── route.ts              # GET reviews
└── change-password/
    └── route.ts              # POST change password
```

## Routing Structure

### Public Routes
- `/authors` → Redirects to `/authors/dashboard` (requires authentication)

### Author Dashboard Routes
- `/authors/dashboard` - Main author dashboard
- `/authors/dashboard/submissions` - View paper submissions
- `/authors/dashboard/payments` - Payment verification status
- `/authors/dashboard/profile` - Edit profile and change password
- `/authors/dashboard/reviews` - Reviewer dashboard (role-specific)

### API Endpoints
All author-related API endpoints are now under `/api/authors`:

- `GET /api/authors/submissions` - Fetch user's submissions
- `GET /api/authors/payments` - Fetch user's payments
- `PUT /api/authors/profile` - Update user profile
- `POST /api/authors/change-password` - Change password
- `GET /api/authors/reviews` - Fetch reviewer assignments

## Authentication Flow

```
Login (/login)
  ↓
Check User Role
  ├── Admin → /admin
  └── Author/Reviewer → /authors/dashboard
```

### Login Redirect Logic
```typescript
// In login page
if (data.user?.role === 'admin') {
  router.push('/admin')
} else {
  router.push('/authors/dashboard')
}
```

### Dashboard Authentication
The `/authors/dashboard/layout.tsx` provides server-side authentication:
```typescript
- Checks for valid JWT token
- Verifies token with verifyToken()
- Redirects to /login if unauthorized
- Protects all child routes
```

## Key Features

### 1. Separation of Concerns
- **Authors Directory**: Contains all author-specific pages and functionality
- **API Authors Directory**: Contains all author-related API endpoints
- **Clear Namespace**: `/authors` prefix makes routing intuitive

### 2. Consistent Navigation
All dashboard pages include:
- Back button linking to `/authors/dashboard`
- Consistent navy/orange branding
- Breadcrumb-style navigation

### 3. Role-Based Access
- Reviews page checks for `reviewer` or `admin` role
- Non-reviewers see "Reviewer Access Only" message
- Admin users get link to admin panel from dashboard

### 4. External Integration
- CMT Portal links throughout the dashboard
- External submission through Microsoft CMT
- Seamless integration with conference management tools

## Migration Summary

### Changed Routes

**Frontend Pages:**
| Old Route | New Route |
|-----------|-----------|
| `/dashboard` | `/authors/dashboard` |
| `/dashboard/submissions` | `/authors/dashboard/submissions` |
| `/dashboard/payments` | `/authors/dashboard/payments` |
| `/dashboard/profile` | `/authors/dashboard/profile` |
| `/dashboard/reviews` | `/authors/dashboard/reviews` |

**API Endpoints:**
| Old Endpoint | New Endpoint |
|--------------|--------------|
| `/api/dashboard/submissions` | `/api/authors/submissions` |
| `/api/dashboard/payments` | `/api/authors/payments` |
| `/api/dashboard/profile` | `/api/authors/profile` |
| `/api/dashboard/change-password` | `/api/authors/change-password` |
| `/api/dashboard/reviews` | `/api/authors/reviews` |

### Updated Files
1. **src/app/(auth)/login/page.tsx** - Updated redirect to `/authors/dashboard`
2. **src/app/authors/dashboard/page.tsx** - Updated all internal links
3. **src/app/authors/dashboard/submissions/page.tsx** - Updated API and navigation
4. **src/app/authors/dashboard/payments/page.tsx** - Updated API and navigation
5. **src/app/authors/dashboard/profile/page.tsx** - Updated API endpoints
6. **src/app/authors/dashboard/reviews/page.tsx** - Updated API and navigation

### Deleted Directories
- `src/app/(dashboard)/` - Moved to `src/app/authors/dashboard/`
- `src/app/api/dashboard/` - Moved to `src/app/api/authors/`

## Benefits of New Structure

### 1. Better Organization
- Clear separation between author and admin functionality
- Easier to locate author-specific features
- Intuitive URL structure for users

### 2. Scalability
- Easy to add new author-specific features
- Simple to extend with additional role-based sections
- Clear namespace prevents route conflicts

### 3. Maintainability
- All author code in one location
- API endpoints grouped by feature
- Easier debugging and testing

### 4. Security
- Dedicated authentication layer for authors
- Role-based access control at route level
- Clear separation from admin functionality

## Usage Examples

### Linking to Author Dashboard
```tsx
// From anywhere in the app
<Link href="/authors/dashboard">Author Dashboard</Link>

// From within author dashboard
<Link href="/authors/dashboard/submissions">My Submissions</Link>
```

### API Calls
```typescript
// Fetch submissions
const response = await fetch('/api/authors/submissions')
const data = await response.json()

// Update profile
const response = await fetch('/api/authors/profile', {
  method: 'PUT',
  body: JSON.stringify({ full_name, email })
})
```

### Navigation Components
```tsx
// Back to dashboard
<Link href="/authors/dashboard">
  <Button>Back to Dashboard</Button>
</Link>

// Navigation within dashboard
const dashboardLinks = [
  { href: '/authors/dashboard', label: 'Overview' },
  { href: '/authors/dashboard/submissions', label: 'Submissions' },
  { href: '/authors/dashboard/payments', label: 'Payments' },
  { href: '/authors/dashboard/profile', label: 'Profile' },
]
```

## Testing Checklist

After reorganization, verify:

- [ ] Login redirects to `/authors/dashboard` for non-admin users
- [ ] `/authors` redirects to `/authors/dashboard`
- [ ] All navigation links work correctly
- [ ] API endpoints respond at new URLs
- [ ] Back buttons navigate to correct routes
- [ ] External CMT links still work
- [ ] Authentication guard protects all routes
- [ ] Role-based access for reviews page works
- [ ] Admin users can still access `/admin`
- [ ] Mobile responsive navigation works

## Future Enhancements

### Potential Additions to Authors Section
1. **Document Library** (`/authors/documents`)
   - Conference guidelines
   - LaTeX templates
   - Formatting instructions

2. **Notifications** (`/authors/notifications`)
   - Email preferences
   - Deadline reminders
   - Status change alerts

3. **Co-Authors Management** (`/authors/co-authors`)
   - Add/remove co-authors
   - Permission management
   - Collaboration tools

4. **Conference Schedule** (`/authors/schedule`)
   - Personal schedule
   - Session assignments
   - Virtual meeting links

## Development Notes

### Adding New Author Pages
1. Create page in `src/app/authors/dashboard/[feature]/page.tsx`
2. Add API route in `src/app/api/authors/[feature]/route.ts`
3. Update main dashboard links
4. Follow existing patterns for styling and navigation

### Adding New API Endpoints
1. Create route handler in `src/app/api/authors/[endpoint]/route.ts`
2. Add authentication check using `getUserFromRequest()`
3. Return appropriate status codes (401, 403, 500)
4. Follow existing error handling patterns

### Styling Guidelines
- Use navy (#14213d) for headers and primary text
- Use orange (#fca311) for accents and CTAs
- Maintain consistent card layouts with left orange border
- Include gradient backgrounds for visual interest
- Ensure mobile responsiveness

---

**Last Updated**: November 13, 2025
**Structure Version**: 2.0 (Reorganized)
**Status**: ✅ Complete and functional
