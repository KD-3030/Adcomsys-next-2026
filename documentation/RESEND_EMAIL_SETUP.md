# 📧 Resend Email Configuration Guide

## Current Status: Test Mode ⚠️

Your Resend account is in **test mode**, which means:
- ✅ Emails can ONLY be sent to: `adcomsys@uem.edu.in` (verified email)
- ❌ Emails to other recipients will fail
- 🔄 All emails are automatically redirected to `ADMIN_EMAIL` during testing
- 📝 Subject lines are prefixed with `[TEST - For: original@email.com]`

## How It Works Now

When a user signs up or requests password reset:
1. System attempts to send email to their address
2. Email is automatically redirected to `adcomsys@uem.edu.in`
3. Subject line shows original recipient
4. You receive all test emails in one place

**Example:**
- Original: Send welcome email to `user@example.com`
- Actual: Email sent to `adcomsys@uem.edu.in` with subject `[TEST - For: user@example.com] Welcome to AdComSys 2026!`

## For Production: Verify Your Domain

### Step 1: Add Domain to Resend

1. Go to [Resend Domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter your domain: `adcomsys2026.uem.edu.in`
4. Click **"Add"**

### Step 2: Configure DNS Records

Resend will provide you with DNS records to add. You'll need to add these records to your domain's DNS settings:

**Required DNS Records:**

1. **SPF Record** (Prevents spoofing)
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.resend.com ~all
   ```

2. **DKIM Record** (Email authentication)
   ```
   Type: TXT
   Name: resend._domainkey
   Value: [provided by Resend]
   ```

3. **DMARC Record** (Email policy)
   ```
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:dmarc@adcomsys2026.uem.edu.in
   ```

### Step 3: Verify Domain

1. After adding DNS records, click **"Verify"** in Resend
2. Wait for DNS propagation (can take up to 48 hours, usually faster)
3. Once verified, you'll see a green checkmark ✅

### Step 4: Update Code

After domain verification, update `src/lib/email/index.ts`:

```typescript
// Change this line:
const FROM_EMAIL = 'AdComSys 2026 <onboarding@resend.dev>'

// To this:
const FROM_EMAIL = 'AdComSys 2026 <noreply@adcomsys2026.uem.edu.in>'
```

### Step 5: Test Production Emails

After updating the FROM_EMAIL:
1. Restart your development server
2. Test signup, password reset, and contact form
3. Emails will now be sent to actual recipient addresses
4. Check Resend dashboard for delivery status

## DNS Configuration with UEM IT Team

Contact your IT team to add these DNS records:

**Email to IT Team:**

```
Subject: DNS Records Request for Conference Email System

Dear IT Team,

We need to add the following DNS records for our conference email system:

Domain: adcomsys2026.uem.edu.in

1. SPF Record:
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.resend.com ~all

2. DKIM Record:
   Type: TXT
   Name: resend._domainkey
   Value: [Will be provided by Resend after domain is added]

3. DMARC Record:
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:dmarc@adcomsys2026.uem.edu.in

These records are required for email authentication and delivery.

Please let us know once these records are added so we can verify the domain.

Thank you,
AdComSys 2026 Team
```

## Current Testing Workflow

**For now, you can test all email features:**

1. **Signup Email**: 
   - Register new user → Welcome email sent to `adcomsys@uem.edu.in`
   - Subject: `[TEST - For: newuser@example.com] Welcome to AdComSys 2026!`

2. **Password Reset**:
   - Request reset → Email sent to `adcomsys@uem.edu.in`
   - Subject: `[TEST - For: user@example.com] Reset Your Password - AdComSys 2026`
   - Click the reset link (it will work!)

3. **Contact Form**:
   - Submit contact form → Notification sent to `adcomsys@uem.edu.in`
   - Subject: `New Contact Form Submission: [subject]`

4. **Payment Notifications**:
   - Approve/reject payment → Email sent to `adcomsys@uem.edu.in`
   - Subject: `[TEST - For: author@example.com] Payment Approved - AdComSys 2026`

## Monitoring Emails

### Resend Dashboard

View all sent emails at: [https://resend.com/emails](https://resend.com/emails)

You can see:
- ✅ Delivered emails
- ⏳ Pending emails
- ❌ Failed emails
- 📊 Open rates (if enabled)
- 🔗 Click rates

### Check Server Logs

All email operations are logged in the server console:
```
Email sent successfully to adcomsys@uem.edu.in (original: user@example.com)
Failed to send email: { statusCode: 403, message: ... }
```

## Troubleshooting

### Issue: "validation_error: You can only send testing emails..."

**Solution**: This is expected in test mode. The email system automatically redirects to `ADMIN_EMAIL`. Check `adcomsys@uem.edu.in` inbox.

### Issue: Emails not arriving

**Checklist**:
- ✅ Check spam/junk folder
- ✅ Verify `ADMIN_EMAIL` in `.env.local` is correct
- ✅ Check Resend dashboard for delivery status
- ✅ Verify `RESEND_API_KEY` is correct
- ✅ Check server console for error messages

### Issue: Reset link doesn't work

**Checklist**:
- ✅ Verify `NEXT_PUBLIC_SITE_URL` in `.env.local`
- ✅ Check if token is in the URL
- ✅ Verify database migration was run (profiles table has reset columns)
- ✅ Check if token expired (1 hour expiration)

## Production Deployment Checklist

Before going live:

- [ ] Domain verified in Resend
- [ ] DNS records added and verified
- [ ] Updated `FROM_EMAIL` in code
- [ ] Tested all email types with real recipients
- [ ] Configured DMARC reporting email
- [ ] Set up email monitoring/alerts
- [ ] Updated `.env.local` → `.env.production`
- [ ] Tested password reset flow end-to-end
- [ ] Verified email deliverability (not in spam)

## Cost & Limits

**Resend Free Tier:**
- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ All features included

**For Conference Use:**
- Expected emails per day: ~50-200 (signups, resets, notifications)
- Free tier should be sufficient for initial launch
- Upgrade if needed: $20/month for 50,000 emails

## Support

**Resend Support:**
- Dashboard: https://resend.com
- Documentation: https://resend.com/docs
- Support: support@resend.com

**Internal Support:**
- Email system code: `src/lib/email/`
- Templates: `src/lib/email/templates/`
- API routes: `src/app/api/auth/forgot-password` & `reset-password`

---

**Current Status**: ✅ Working in test mode (all emails to admin)  
**Next Step**: Verify domain for production use  
**Last Updated**: November 16, 2025
