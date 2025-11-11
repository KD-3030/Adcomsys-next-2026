-- ============================================================================
-- Remove Foreign Key Constraint for Custom JWT Auth
-- ============================================================================
-- The profiles table no longer needs to reference auth.users
-- since we're using custom JWT authentication
-- ============================================================================

-- Drop the foreign key constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Make id a regular UUID primary key (not referencing auth.users)
-- The column already exists, we just removed the foreign key

-- Verify the constraint was removed
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name='profiles' AND tc.constraint_type = 'FOREIGN KEY';

-- Should return empty result if foreign key was removed successfully
