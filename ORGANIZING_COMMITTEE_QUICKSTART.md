# Quick Start: Seed Organizing Committee Data

## Prerequisites
- Supabase project set up
- Environment variables configured

## Steps

### 1. Set Environment Variables

**Option A: Add to `.env.local` file**
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Option B: Set in PowerShell session**
```powershell
$env:NEXT_PUBLIC_SUPABASE_URL = "your-supabase-project-url"
$env:SUPABASE_SERVICE_ROLE_KEY = "your-service-role-key"
```

### 2. Run the Seed Script

**Recommended: Node.js Script (Cross-platform)**
```bash
node scripts/seed-organizing-committee.js
```

This script will:
- Read credentials from your `.env.local` file
- Clear existing organizing committee data
- Insert all 31 committee members
- Verify the data was inserted correctly

### 3. Verify

Visit your website at `/committee` to see the organizing committee data.

## Alternative: Manual SQL Execution

If the script doesn't work:

1. Go to https://app.supabase.com
2. Open your project
3. Click "SQL Editor"
4. Open `sql/seed-organizing-committee.sql`
5. Copy and paste the content
6. Click "Run"

## What Gets Seeded

- **31 organizing committee members** across all roles
- Chief Patron, Patrons, General Chairs, Co-Convenors, Technical Chairs, Finance Chair, and Organizing Members
- Duplicates removed (Prof. Dr. Maumita Chakraborty appears once)
- Proper display order for hierarchical presentation

## Troubleshooting

### "Supabase credentials not found"
Make sure environment variables are set (see Step 1)

### Script errors
- Ensure `.env.local` exists with correct credentials
- Check that `@supabase/supabase-js` is installed: `npm install`
- Or use the manual SQL execution method

### Data not showing on website
- Clear Next.js cache: `npm run build`
- Restart dev server: `npm run dev`
- Check Supabase dashboard to verify data was inserted

## Documentation

For detailed information, see:
- `documentation/ORGANIZING_COMMITTEE_SETUP.md` - Complete setup guide
- `documentation/ORGANIZING_COMMITTEE_MIGRATION.md` - Migration details
