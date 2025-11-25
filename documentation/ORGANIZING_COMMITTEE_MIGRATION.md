# Organizing Committee Data Migration Summary

## What Was Done

Successfully migrated the organizing committee data from hardcoded arrays to database-driven architecture.

## Files Created

### 1. SQL Seed Script
**File**: `sql/seed-organizing-committee.sql`
- Contains INSERT statements for all 31 organizing committee members
- Removes duplicates (Prof. Dr. Maumita Chakraborty listed once instead of twice)
- Properly categorizes members by role using the `designation` field
- Includes optional DELETE statement to clear existing data before seeding

### 2. PowerShell Automation Script
**File**: `scripts/seed-organizing-committee.ps1`
- Automates the execution of the SQL seed script
- Validates Supabase credentials from environment variables
- Provides helpful error messages and manual alternatives
- Includes success confirmation and next steps

### 3. Documentation
**File**: `documentation/ORGANIZING_COMMITTEE_SETUP.md`
- Complete guide for managing committee data
- Explains database schema and structure
- Provides SQL examples for updates, inserts, and deletes
- Troubleshooting section for common issues
- Lists all 31 committee members with their roles

## Data Structure

### Committee Breakdown
- **Chief Patron**: 1 member
- **Patrons**: 7 members
- **General Chairs**: 4 members
- **Co-Convenors**: 3 members
- **Technical Chairs**: 2 members
- **Finance Chair**: 1 member
- **Organizing Members**: 11 members
- **Industrial Chair**: 0 members (commented out in source)

**Total: 31 unique members**

### Duplicates Removed
- **Prof. Dr. Maumita Chakraborty** was listed in both:
  - General Chair (kept)
  - Convenor (removed duplicate)

## How It Works

### Before (Hardcoded)
```jsx
const members = {
  chiefPatron: [...],
  patrons: [...],
  // Data hardcoded in component
}
```

### After (Database-Driven)
```tsx
// Data fetched from Supabase
const organizingMembers = await getOrganizingCommittee()
// Automatically sorted by display_order
```

## Benefits

1. **Easy Updates**: Change data without redeploying code
2. **Admin Panel Ready**: Can add CRUD interface later
3. **Consistent Data**: Single source of truth in database
4. **Scalable**: Easy to add/remove members
5. **Professional**: Industry-standard data management

## Hierarchy Detection

The existing code automatically categorizes members by their designation:

```typescript
const getHierarchyLevel = (designation: string) => {
  if (lower.includes('chief patron')) return 'chief'
  if (lower.includes('patron')) return 'patron'
  if (lower.includes('chair') || lower.includes('convener')) return 'chair'
  return 'member'
}
```

This means:
- "Chancellor" → Chief Patron (yellow badge)
- "Vice Chancellor", "Registrar", etc. → Patron (blue badge)
- "General Chair", "Technical Chair", etc. → Chair (blue badge)
- "Organizing Member" → Member (gray badge)

## Running the Migration

### Quick Start
```powershell
# Set environment variables (in .env.local or PowerShell)
$env:NEXT_PUBLIC_SUPABASE_URL = "your-url"
$env:SUPABASE_SERVICE_ROLE_KEY = "your-key"

# Run the seed script
cd scripts
.\seed-organizing-committee.ps1
```

### Manual Alternative
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy contents of `sql/seed-organizing-committee.sql`
4. Run the SQL

## Verification

Check the data was inserted correctly:

```sql
SELECT COUNT(*) FROM committee_members 
WHERE committee_type = 'organizing' AND is_active = true;
-- Expected: 31
```

## Next Steps

1. **Run the seed script** to populate the database
2. **Verify data** in Supabase dashboard
3. **Test the website** - committee page should show all members
4. **(Optional)** Build admin CRUD interface for easier updates
5. **(Optional)** Add profile images by updating `image_url` field

## Maintenance

To update committee members in the future:

### Add a new member
```sql
INSERT INTO committee_members (name, designation, affiliation, committee_type, display_order)
VALUES ('New Member', 'Organizing Member', 'Institution Name', 'organizing', 32);
```

### Update existing member
```sql
UPDATE committee_members
SET designation = 'New Title', affiliation = 'New Institution'
WHERE name = 'Member Name' AND committee_type = 'organizing';
```

### Remove a member
```sql
-- Soft delete (recommended)
UPDATE committee_members SET is_active = false
WHERE name = 'Member Name' AND committee_type = 'organizing';

-- Hard delete
DELETE FROM committee_members
WHERE name = 'Member Name' AND committee_type = 'organizing';
```

## Technical Notes

- Uses existing `committee_members` table from SCHEMA.sql
- Compatible with current Next.js app structure
- No frontend changes needed - already fetching from database
- Display order: 1-31 (sequential based on role hierarchy)
- All email fields empty (as per source data)
- All image_url fields null (add later if needed)

## Support Files

- `sql/SCHEMA.sql` - Original database schema reference
- `src/app/committee/page.tsx` - Frontend implementation
- `src/lib/db/index.ts` - Database query functions
- `documentation/` - Additional project documentation
