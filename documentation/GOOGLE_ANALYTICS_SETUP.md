# Google Analytics & Search Console Setup Guide

## 🎯 Overview

This guide will help you set up Google Analytics 4 (GA4) and Google Search Console for your AdComSys 2026 website.

## 📊 Google Analytics 4 Setup

### Step 1: Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **"Start measuring"** or **"Admin"** (gear icon)
3. Click **"Create Account"**
4. Enter account details:
   - Account name: `AdComSys 2026`
   - Check data sharing settings as needed
5. Click **"Next"**

### Step 2: Create Property

1. Property name: `AdComSys 2026 - Conference Website`
2. Reporting time zone: `(GMT+05:30) India Standard Time`
3. Currency: `Indian Rupee (INR)`
4. Click **"Next"**

### Step 3: Set Up Business Information

1. Industry category: `Education`
2. Business size: `Small (1-10 employees)` or as appropriate
3. Select how you plan to use Google Analytics
4. Click **"Create"**

### Step 4: Set Up Data Stream

1. Choose platform: **Web**
2. Website URL: `https://adcomsys.uemkcstcsit.in`
3. Stream name: `AdComSys Website`
4. Click **"Create stream"**

### Step 5: Get Measurement ID

1. After creating the stream, you'll see **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Copy this ID
3. Add it to your `.env.local` file:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 6: Deploy & Verify

1. Deploy your website with the updated environment variable
2. Visit your website
3. Go back to GA4 dashboard
4. Navigate to **Reports** → **Realtime**
5. You should see your visit in real-time!

---

## 🔍 Google Search Console Setup

### Step 1: Add Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Choose **URL prefix** property type
4. Enter: `https://adcomsys.uemkcstcsit.in`
5. Click **"Continue"**

### Step 2: Verify Ownership

Google will show multiple verification methods. We'll use **HTML meta tag**:

1. Select **"HTML tag"** method
2. Copy the verification code (looks like: `google-site-verification=XXXXXXXXXXXXX`)
3. Add it to your `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=XXXXXXXXXXXXX
```

4. Deploy your website
5. Go back to Search Console and click **"Verify"**

### Step 3: Submit Sitemap

1. After verification, click **"Sitemaps"** in the left sidebar
2. Enter: `sitemap.xml`
3. Click **"Submit"**

Your sitemap URL will be: `https://adcomsys.uemkcstcsit.in/sitemap.xml`

---

## 🚀 What's Already Configured

✅ **Google Analytics Component** (`src/components/analytics/GoogleAnalytics.tsx`)
- Automatically loads GA4 script
- Tracks page views
- Uses Next.js Script optimization

✅ **Search Console Verification** (`src/lib/metadata.ts`)
- Meta tag automatically added to `<head>`
- Works across all pages

✅ **Sitemap Generation** (`next-sitemap.config.js`)
- Automatically generates `sitemap.xml` on build
- Excludes admin/private pages
- Updates with production URL

✅ **SEO Metadata** (`src/lib/metadata.ts`)
- Open Graph tags for social sharing
- Twitter Card support
- Structured data
- Canonical URLs
- Robot directives

---

## 📈 What You'll Track

### Google Analytics 4 Metrics:

1. **User Engagement:**
   - Page views
   - Session duration
   - Bounce rate
   - User demographics

2. **Conversions:**
   - Paper submissions
   - User registrations
   - Contact form submissions

3. **Traffic Sources:**
   - Organic search
   - Direct traffic
   - Referral sites
   - Social media

4. **Technical:**
   - Page load speed
   - Device types
   - Browser types
   - Screen resolutions

### Google Search Console Data:

1. **Performance:**
   - Total clicks
   - Total impressions
   - Average CTR
   - Average position

2. **Coverage:**
   - Indexed pages
   - Pages with issues
   - Valid pages

3. **Enhancements:**
   - Mobile usability
   - Core Web Vitals
   - Structured data

4. **Links:**
   - External links
   - Internal links
   - Top linking sites

---

## 🎨 Custom Event Tracking (Optional)

You can track custom events like button clicks, form submissions, etc.

### Example: Track Paper Submission

Add this to your submission handler:

```typescript
// In your form submission handler
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'paper_submission', {
    event_category: 'engagement',
    event_label: 'Paper Submitted',
    value: 1
  });
}
```

### Example: Track User Registration

```typescript
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'sign_up', {
    method: 'email'
  });
}
```

---

## 🔐 Privacy & GDPR Compliance

### Cookie Consent (Recommended)

If you want to add cookie consent, install a library:

```bash
npm install react-cookie-consent
```

Then add to your layout:

```tsx
import CookieConsent from "react-cookie-consent";

// In your layout
<CookieConsent
  location="bottom"
  buttonText="Accept"
  cookieName="adcomsys-consent"
  style={{ background: "#14213d" }}
  buttonStyle={{ background: "#fca311", color: "#fff", fontSize: "13px" }}
>
  This website uses cookies to enhance user experience and analyze traffic.
</CookieConsent>
```

---

## 📊 Monitoring Dashboard

### Access Your Data:

**Google Analytics:**
- Dashboard: https://analytics.google.com/
- View real-time traffic
- Analyze user behavior
- Track conversions

**Search Console:**
- Dashboard: https://search.google.com/search-console
- Monitor search performance
- Fix indexing issues
- Submit new pages

**Vercel Analytics:**
- Dashboard: https://vercel.com/your-project/analytics
- View Core Web Vitals
- Monitor performance
- Track real user metrics

---

## 🧪 Testing Checklist

After setup, verify everything works:

- [ ] GA4 shows real-time visitors when you visit the site
- [ ] Search Console verification is successful
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] Meta tags appear in page source (right-click → View Source)
- [ ] No console errors related to analytics
- [ ] Page views are tracked correctly

---

## 🚨 Troubleshooting

### GA4 Not Tracking

1. Check browser console for errors
2. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
3. Ensure you're not using an ad blocker
4. Wait 24-48 hours for data to appear in reports (real-time should work immediately)

### Search Console Not Verifying

1. Make sure the meta tag is in the HTML `<head>`
2. Check that the verification code matches exactly
3. Clear your browser cache
4. Redeploy your site
5. Try the TXT record method instead

### Sitemap Not Found

1. Check that `next-sitemap.config.js` is configured
2. Run `npm run build` to regenerate sitemap
3. Verify file exists: `public/sitemap.xml`
4. Check that `postbuild` script runs in `package.json`

---

## 📝 Environment Variables Summary

Add these to your `.env.local` (development) and hosting platform (production):

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=XXXXXXXXXXXXX

# Site URL (already configured)
NEXT_PUBLIC_SITE_URL=https://adcomsys.uemkcstcsit.in
```

---

## 🎯 Next Steps

1. **Set up GA4** - Get your Measurement ID
2. **Verify Search Console** - Get verification code
3. **Add to environment variables** - Both locally and in production
4. **Deploy** - Push changes and deploy to production
5. **Submit sitemap** - Add sitemap.xml to Search Console
6. **Monitor** - Check analytics dashboard daily
7. **Optimize** - Use insights to improve your site

---

## 📚 Additional Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Search Console Help](https://support.google.com/webmasters/answer/9128668)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [SEO Best Practices](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

---

**Setup Date:** November 22, 2025
**Site:** https://adcomsys.uemkcstcsit.in
**Contact:** adcomsys@uem.edu.in
