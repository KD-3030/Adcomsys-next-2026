# Organizing Committee Data Management

This document explains how to manage the organizing committee data in the AdComSys 2026 application.

## Overview

The organizing committee data is now stored in the **Supabase database** rather than being hardcoded. This allows for:
- Easy updates through the admin panel
- Data persistence across deployments
- Centralized data management
- No need to redeploy when updating committee members

## Database Schema

The committee members are stored in the `committee_members` table with the following structure:

```sql
committee_members (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  designation text NOT NULL,
  affiliation text NOT NULL,
  email text,
  image_url text,
  committee_type text CHECK (committee_type IN ('organizing', 'technical', 'advisory')),
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
```

## Initial Data Setup

### Method 1: Using Node.js Script (Recommended)

1. Ensure your `.env.local` file contains:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. Run the seeding script:
   ```bash
   node scripts/seed-organizing-committee.js
   ```

   The script will:
   - Automatically read credentials from `.env.local`
   - Clear existing organizing committee data
   - Insert all committee members
   - Verify the insertion

### Method 2: Manual SQL Execution

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Navigate to your project
3. Click on "SQL Editor" in the left sidebar
4. Open the file `sql/seed-organizing-committee.sql`
5. Copy and paste the SQL content into the editor
6. Click "Run" to execute the script

## Committee Data Structure

The organizing committee includes the following roles:

### Chief Patron
- Prof. Banani Chakrabarti (Chancellor, UEM Kolkata)

### Patrons (7 members)
- Prof. Dr. Sajal Dasgupta (Vice Chancellor)
- Prof. Dr. Satyajit Chakrabarti (Pro Vice Chancellor)
- Prof. Dr. Sukalyan Goswami (Registrar)
- Prof. Dr. Rajashree Paul (Deputy-Dean Research)
- Prof. Dr. Kamakhya Prasad Ghatak (Dean-Engineering)
- Prof. Dr. Rajiv Ganguly (Dean-Science)
- Prof. Dr. Abir Chatterjee (Dean-Research)

### General Chairs (4 members)
- Prof. Dr. Weiping Ding (Nantong University, China)
- Prof. Dr. Amlan Chakrabarti (University of Calcutta)
- Prof. Dr. Maumita Chakraborty (UEM Kolkata)
- Prof. Dr. Shouvik Chakraborty (Government of West Bengal)

### Co-Convenors (3 members)
- Prof. Dr. Subhalaxmi Chakraborty
- Prof. Dr. Sudipta Basu Pal
- Prof. Dr. Chiradeep Mukherjee

### Technical Chairs (2 members)
- Prof. Dr. Danilo Pelusi (University of Teramo, Italy)
- Prof. Dr. Asit Kumar Das (IIEST Shibpur)

### Finance Chair
- Mr. Indranil Banerjee

### Organizing Committee Members (11 members)
- Prof. Dr. Srilekha Mukherjee
- Prof. Dr. Anirban Ganguly
- Prof. Dr. Subhrangshu Das
- Prof. Dr. Debanjana Datta Mitra
- Prof. Pradipta Sarkar
- Prof. Sanjukta Mishra
- Prof. Kamalika Bhowal
- Prof. Dr. Suvaditya Majumdar
- Prof. Ayan Das
- Prof. Arpita Saha Chowdhury
- Prof. Ritika Pramanick

**Total: 31 unique members** (Note: Prof. Dr. Maumita Chakraborty appears in both General Chair and Convenor roles, counted once)

## Updating Committee Data

### Option 1: Admin Panel (Coming Soon)
Use the admin panel to add, edit, or remove committee members through the web interface.

### Option 2: Direct SQL Updates

To update a member's information:
```sql
UPDATE committee_members
SET 
  designation = 'New Designation',
  affiliation = 'New Affiliation'
WHERE name = 'Member Name' AND committee_type = 'organizing';
```

To add a new member:
```sql
INSERT INTO committee_members (name, designation, affiliation, email, committee_type, display_order, is_active)
VALUES ('New Member Name', 'Designation', 'Affiliation', 'email@example.com', 'organizing', 32, true);
```

To deactivate a member (soft delete):
```sql
UPDATE committee_members
SET is_active = false
WHERE name = 'Member Name' AND committee_type = 'organizing';
```

To delete a member permanently:
```sql
DELETE FROM committee_members
WHERE name = 'Member Name' AND committee_type = 'organizing';
```

## Display Order

Members are displayed based on the `display_order` field. Lower numbers appear first:
- 1: Chief Patron
- 2-8: Patrons
- 9-12: General Chairs
- 14-16: Co-Convenors
- 17-18: Technical Chairs
- 20: Finance Chair
- 21-31: Organizing Members

To reorder members, update the `display_order` value:
```sql
UPDATE committee_members
SET display_order = 25
WHERE name = 'Member Name' AND committee_type = 'organizing';
```

## Data Consistency Notes

1. **No Duplicates**: Prof. Dr. Maumita Chakraborty serves multiple roles but is listed once in the General Chair section
2. **Industrial Chair**: Currently not active (was commented out in source data)
3. **Email Fields**: Most email fields are empty - populate as needed
4. **Image URLs**: Currently null - add profile images by updating the `image_url` field

## Verification

After seeding, verify the data:

```sql
SELECT 
    name, 
    designation, 
    affiliation, 
    display_order 
FROM committee_members 
WHERE committee_type = 'organizing' 
ORDER BY display_order;
```

Expected result: 31 rows

## Troubleshooting

### Script fails to run
- Ensure `.env.local` file exists in project root
- Verify environment variables are correct
- Check that dependencies are installed: `npm install`
- Check network connection to Supabase

### Data not appearing on website
- Clear Next.js cache: `npm run build`
- Restart development server
- Check browser console for errors
- Verify database connection in Supabase dashboard

### Duplicate entries
The SQL script includes `DELETE FROM committee_members WHERE committee_type = 'organizing';` at the top to clear existing data. Comment this out if you want to preserve existing records.

## Files

- `sql/seed-organizing-committee.sql` - SQL script with all committee data
- `scripts/seed-organizing-committee.ps1` - PowerShell automation script
- `src/app/committee/page.tsx` - Frontend page that fetches and displays data

## Support

For issues or questions, refer to:
- Supabase Documentation: https://supabase.com/docs
- Project Documentation: `documentation/` folder
