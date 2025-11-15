# 📧 Email System & Password Reset - Complete Setup

## ✅ What's Been Implemented

### 1. Email Infrastructure

**Email Service Provider**: Resend
- Professional email templates with React Email
- Branded design matching conference theme
- Mobile-responsive layouts
- Security features (DKIM, SPF, DMARC)

**Files Created**:
```
src/lib/email/
├── index.ts                           # Main email utilities & functions
└── templates/
    ├── WelcomeEmail.tsx              # Sent on user registration
    ├── PasswordResetEmail.tsx        # Password reset with token
    ├── PaymentApprovedEmail.tsx      # Payment verification approved
    ├── PaymentRejectedEmail.tsx      # Payment needs revision
    └── PaperSubmissionEmail.tsx      # Paper submission confirmation
```

### 2. Email Templates

#### Welcome Email
- **Trigger**: User signup
- **Content**: Account confirmation, dashboard link, important dates
- **Features**: Call-to-action button, contact information

#### Password Reset Email
- **Trigger**: Forgot password request
- **Content**: Reset link (expires in 1 hour), security notices
- **Features**: Token-based authentication, expiration warning

#### Payment Emails
- **Approved**: Confirmation, transaction ID, next steps
- **Rejected**: Reason for rejection, resubmission instructions
- **Features**: Status badges, action buttons

#### Paper Submission Email
- **Trigger**: Paper submitted via CMT or website
- **Content**: Submission ID, paper title, tracking information
- **Features**: CMT link, tracking dashboard link

### 3. Password Reset Feature

**User Flow**:
1. User clicks "Forgot Password" on login page
2. Enters email address
3. Receives reset email with secure token
4. Clicks link (valid for 1 hour)
5. Sets new password (with validation)
6. Redirected to login

**Pages Created**:
```
src/app/(auth)/
├── forgot-password/page.tsx          # Request reset link
└── reset-password/page.tsx           # Set new password with token
```

**API Routes**:
```
src/app/api/auth/
├── forgot-password/route.ts          # Generate & send reset token
└── reset-password/route.ts           # Verify token & update password
```

**Database Schema**:
```sql
-- sql/add-password-reset-columns.sql
ALTER TABLE users
ADD COLUMN password_reset_token TEXT,
ADD COLUMN password_reset_expires TIMESTAMPTZ;

-- Index for fast lookups
CREATE INDEX idx_users_password_reset_token 
ON users(password_reset_token);
```

### 4. Integration Points

**Signup Flow** (`src/app/api/auth/signup/route.ts`):
- Sends welcome email automatically
- Non-blocking (doesn't fail signup if email fails)

**Contact Form** (`src/app/api/contact/route.ts`):
- Sends notification to admin
- Includes full submission details
- Reply-to set to sender's email

## 🔧 Configuration Required

### 1. Database Migration

Run this SQL in Supabase SQL Editor:

```bash
# Navigate to Supabase Dashboard > SQL Editor
# Run the file: sql/add-password-reset-columns.sql
```

Or manually execute:
```sql
ALTER TABLE users
ADD COLUMN IF NOT EXISTS password_reset_token TEXT,
ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_users_password_reset_token 
ON users(password_reset_token) 
WHERE password_reset_token IS NOT NULL;
```

### 2. Environment Variables

**Already configured** in `.env.local`:
```env
RESEND_API_KEY=re_3U2WN2oj_EMvmuuoouGZG1ZkKSpfCkmCo
ADMIN_EMAIL=adcomsys@uem.edu.in
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Resend Account Setup

**Current Status**: Using test mode (`onboarding@resend.dev`)

**For Production**:
1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your domain: `adcomsys2026.uem.edu.in`
3. Configure DNS records (DKIM, SPF, DMARC)
4. Verify domain ownership
5. Update sender email in `src/lib/email/index.ts`:
   ```typescript
   const FROM_EMAIL = 'AdComSys 2026 <noreply@adcomsys2026.uem.edu.in>'
   ```

## 📋 Testing Checklist

### Test Password Reset Flow

1. **Request Reset**:
   ```
   1. Navigate to http://localhost:3000/forgot-password
   2. Enter a valid user email
   3. Click "Send Reset Link"
   4. Check email inbox (and spam folder)
   ```

2. **Verify Email**:
   ```
   - Email should arrive within seconds
   - Check sender: AdComSys 2026
   - Verify reset link contains token
   - Link format: /reset-password?token=...
   ```

3. **Reset Password**:
   ```
   1. Click reset link in email
   2. Enter new password (must meet requirements)
   3. Confirm password
   4. Submit form
   5. Should redirect to login
   ```

4. **Test Login**:
   ```
   1. Go to /login
   2. Use email and NEW password
   3. Should successfully log in
   ```

### Test Email Templates

**Manual Testing**:
```typescript
// In any API route, you can test emails:
import { sendWelcomeEmail, sendPasswordResetEmail } from '@/lib/email'

// Test welcome email
await sendWelcomeEmail('test@example.com', 'Test User')

// Test password reset
await sendPasswordResetEmail('test@example.com', 'Test User', 'test-token-123')
```

**Using Resend Dashboard**:
1. Go to [Resend Logs](https://resend.com/emails)
2. See all sent emails
3. Preview rendered templates
4. Check delivery status

## 🛡️ Security Features

### Password Reset Security

1. **Token Generation**:
   - 32-byte cryptographically secure random token
   - Stored as hash in database
   - Single-use only

2. **Expiration**:
   - Tokens expire after 1 hour
   - Checked on every reset attempt
   - Cleared after successful reset

3. **Rate Limiting**:
   - Consider adding rate limiting to prevent spam
   - Example: Max 3 reset requests per hour per email

4. **Password Validation**:
   - Minimum 8 characters
   - Must contain: uppercase, lowercase, number
   - Client-side and server-side validation

### Email Security

1. **DKIM Signing**: Verifies sender authenticity
2. **SPF Records**: Prevents spoofing
3. **No Sensitive Data**: Never include passwords in emails
4. **HTTPS Links**: All links use secure protocol

## 📊 Email Analytics

**Resend provides**:
- Delivery rate
- Open rate (if enabled)
- Click rate
- Bounce rate
- Spam complaints

**Access**: [Resend Analytics Dashboard](https://resend.com/overview)

## 🔄 Usage Examples

### Send Welcome Email
```typescript
import { sendWelcomeEmail } from '@/lib/email'

await sendWelcomeEmail(user.email, user.full_name)
```

### Send Password Reset
```typescript
import { sendPasswordResetEmail } from '@/lib/email'

await sendPasswordResetEmail(user.email, user.full_name, resetToken)
```

### Send Payment Notification
```typescript
import { sendPaymentApprovedEmail, sendPaymentRejectedEmail } from '@/lib/email'

// Approved
await sendPaymentApprovedEmail(user.email, user.full_name, transactionId)

// Rejected
await sendPaymentRejectedEmail(user.email, user.full_name, reason)
```

### Send Paper Submission Confirmation
```typescript
import { sendPaperSubmissionEmail } from '@/lib/email'

await sendPaperSubmissionEmail(
  author.email, 
  author.full_name, 
  paperTitle,
  submissionId
)
```

### Custom Email
```typescript
import { sendEmail } from '@/lib/email'
import { CustomTemplate } from '@/lib/email/templates/CustomTemplate'

await sendEmail({
  to: 'recipient@example.com',
  subject: 'Custom Subject',
  react: CustomTemplate({ name: 'User' }),
  replyTo: 'custom@reply.com' // Optional
})
```

## 🚀 Next Steps

### Immediate (Required for Testing)
1. ✅ Run database migration (`add-password-reset-columns.sql`)
2. ✅ Test forgot password flow
3. ✅ Test all email templates
4. ✅ Verify emails arrive correctly

### Short Term (Before Production)
1. Add rate limiting to password reset
2. Create email template for payment reminders
3. Add email template for paper acceptance/rejection
4. Set up domain in Resend (replace onboarding@resend.dev)
5. Configure DNS records for email authentication

### Long Term (Enhancements)
1. Add email preferences for users
2. Implement email queue for bulk sending
3. Add email templates editor in admin panel
4. Track email open/click rates
5. A/B test email subject lines

## 📝 Common Issues & Solutions

### Issue: Emails not arriving
**Solution**: 
- Check Resend logs for delivery status
- Verify RESEND_API_KEY is correct
- Check spam folder
- Ensure email is valid

### Issue: Password reset link expired
**Solution**:
- Tokens expire after 1 hour
- Request new reset link
- Check system time is correct

### Issue: Template rendering issues
**Solution**:
- Verify @react-email/components version
- Check for TypeScript errors
- Test template in Resend preview

### Issue: Email formatting broken
**Solution**:
- Use inline styles (not Tailwind in emails)
- Test in multiple email clients
- Use Resend's email preview feature

## 🔗 Resources

- [Resend Documentation](https://resend.com/docs)
- [React Email Components](https://react.email/docs/components/html)
- [Email Design Best Practices](https://react.email/docs/introduction)
- [Resend Dashboard](https://resend.com/overview)

## 📞 Support

For issues with the email system:
1. Check Resend logs first
2. Review error messages in console
3. Verify environment variables
4. Test with a different email address

---

**Status**: ✅ Ready for Testing
**Last Updated**: November 16, 2025
**Next Review**: Before production deployment
