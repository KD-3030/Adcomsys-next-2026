# Production Deployment Checklist - AdComSys 2026

## ✅ Completed Changes

### 1. Domain Configuration
- [x] Updated `NEXT_PUBLIC_SITE_URL` to `https://adcomsys.uemkcstcsit.in` in `.env.local`
- [x] Updated site.ts fallback URL to production domain
- [x] Updated next-sitemap.config.js with production domain

## 🔧 Additional Steps Required

### 2. Environment Variables for Production

Create a `.env.production` file or set these in your hosting platform (Vercel/Netlify/etc.):

```bash
# Required Production Variables
NEXT_PUBLIC_SITE_URL=https://adcomsys.uemkcstcsit.in
NEXT_PUBLIC_SUPABASE_URL=https://pacmuptvseskbjqzyxlc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhY211cHR2c2Vza2JqcXp5eGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3Nzk0NzYsImV4cCI6MjA3ODM1NTQ3Nn0.eVF4Bl2FaUdkvhAF--uZXqtl6al0u9Luz6pV-mhwvE4
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhY211cHR2c2Vza2JqcXp5eGxjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjc3OTQ3NiwiZXhwIjoyMDc4MzU1NDc2fQ.xc7VSFeggDA0rQSY9pQMmtVg9d1Fx_WEkQB7oaRwKUI
JWT_SECRET=d893dea45c190059e96701c6aec8585e
RESEND_API_KEY=re_3U2WN2oj_EMvmuuoouGZG1ZkKSpfCkmCo
ADMIN_EMAIL=adcomsys@uem.edu.in
NEXT_PUBLIC_CMT_URL=https://cmt3.research.microsoft.com/AdComSys2025
NEXT_PUBLIC_SITE_NAME=AdComSys 2026
```

### 3. Supabase Configuration

**Update Allowed URLs in Supabase:**
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add to **Site URL**: `https://adcomsys.uemkcstcsit.in`
3. Add to **Redirect URLs**:
   - `https://adcomsys.uemkcstcsit.in/login`
   - `https://adcomsys.uemkcstcsit.in/signup`
   - `https://adcomsys.uemkcstcsit.in/admin`
   - `https://adcomsys.uemkcstcsit.in/authors/dashboard`
   - `https://adcomsys.uemkcstcsit.in/reviewers/dashboard`

**Update CORS Settings:**
1. Go to Supabase Dashboard → Settings → API
2. Add `https://adcomsys.uemkcstcsit.in` to allowed origins

### 4. Email Configuration (Resend)

**Current Status:** Test mode - emails only sent to adcomsys@uem.edu.in

**For Production Email Sending:**
1. Go to Resend Dashboard: https://resend.com/domains
2. Click "Add Domain"
3. Add domain: `adcomsys.uemkcstcsit.in` (or a subdomain like `mail.adcomsys.uemkcstcsit.in`)
4. Add these DNS records to your domain registrar:

```
Type: TXT
Name: @
Value: [Resend verification code]

Type: MX
Name: @
Priority: 10
Value: feedback-smtp.us-east-1.amazonses.com

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; pct=100; rua=mailto:adcomsys@uem.edu.in

Type: TXT  
Name: resend._domainkey
Value: [DKIM key from Resend]

Type: TXT
Name: @
Value: v=spf1 include:amazonses.com ~all
```

5. After DNS propagation (24-48 hours), verify domain in Resend
6. Update `src/lib/email/index.ts`:
   ```typescript
   const FROM_EMAIL = 'AdComSys 2026 <noreply@adcomsys.uemkcstcsit.in>'
   ```

### 5. Build & Deploy Commands

**Build the project:**
```bash
npm run build
```

**If using Vercel:**
```bash
vercel --prod
```

**If using custom server:**
```bash
npm run build
npm run start
```

### 6. DNS & SSL Configuration

**Ensure your domain has:**
- [x] A/AAAA record pointing to your hosting server IP
- [x] SSL certificate (Let's Encrypt or hosting provider SSL)
- [ ] WWW redirect (optional): `www.adcomsys.uemkcstcsit.in` → `adcomsys.uemkcstcsit.in`

### 7. Security Checklist

- [ ] All environment variables are set in production (not in `.env.local`)
- [ ] JWT_SECRET is strong and unique (current one is good)
- [ ] Supabase service role key is kept secret (never exposed to client)
- [ ] CORS is configured correctly in Supabase
- [ ] Rate limiting is enabled (optional: add Upstash Redis)
- [ ] HTTPS is enforced (SSL certificate active)

### 8. Testing Checklist

After deployment, test these features:

**Authentication:**
- [ ] User signup works
- [ ] User login works
- [ ] Password reset emails are sent
- [ ] JWT tokens are generated correctly

**Authors:**
- [ ] Paper submission works
- [ ] Payment proof upload works
- [ ] Dashboard displays correctly
- [ ] Welcome emails are sent

**Admin:**
- [ ] Admin login works
- [ ] Paper approval/rejection works
- [ ] Payment verification works
- [ ] Admin stats load correctly

**Email:**
- [ ] Welcome emails sent on signup
- [ ] Password reset emails sent
- [ ] Contact form emails received
- [ ] Payment status emails sent

**General:**
- [ ] All images load correctly
- [ ] Forms submit properly
- [ ] Database queries work
- [ ] No console errors

### 9. Performance Optimization

**Already Configured:**
- ✅ Image optimization (AVIF/WebP)
- ✅ Compression enabled
- ✅ Security headers
- ✅ SEO metadata

**Optional Improvements:**
- [ ] Add CDN (Cloudflare) for static assets
- [ ] Enable Redis caching for rate limiting
- [ ] Monitor with Vercel Analytics or Google Analytics
- [ ] Set up error tracking (Sentry)

### 10. Monitoring & Maintenance

**Set up monitoring for:**
- Server uptime (UptimeRobot, Pingdom)
- Error tracking (Sentry, LogRocket)
- Performance (Vercel Analytics, PageSpeed Insights)
- Database usage (Supabase dashboard)

### 11. Post-Deployment Tasks

- [ ] Update Google Search Console with new domain
- [ ] Submit sitemap: `https://adcomsys.uemkcstcsit.in/sitemap.xml`
- [ ] Update social media links with new domain
- [ ] Test all email templates in production
- [ ] Verify payment integration works
- [ ] Check mobile responsiveness on real devices

### 12. Backup & Recovery

- [ ] Set up automated database backups (Supabase)
- [ ] Document deployment process
- [ ] Keep staging environment for testing
- [ ] Version control all configuration changes

## 📞 Support Contacts

- **Conference Email:** adcomsys@uem.edu.in
- **Domain:** https://adcomsys.uemkcstcsit.in
- **Hosting Provider:** [Your hosting provider]
- **Database:** Supabase (https://pacmuptvseskbjqzyxlc.supabase.co)

## 🎯 Quick Deploy Commands

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Test production build locally
npm run start

# 4. Deploy (if using Vercel)
vercel --prod

# 5. Regenerate sitemap after deploy
npm run postbuild
```

## ⚠️ Important Notes

1. **Never commit `.env.local` to git** - it contains sensitive keys
2. **Set environment variables** directly in your hosting platform
3. **Test in staging** before deploying to production
4. **Email domain verification** takes 24-48 hours for DNS propagation
5. **Keep Supabase keys secure** - service role key should never be exposed to client-side code

---

**Current Status:** ✅ Configuration files updated
**Next Step:** Deploy to production with updated environment variables
**Production URL:** https://adcomsys.uemkcstcsit.in
