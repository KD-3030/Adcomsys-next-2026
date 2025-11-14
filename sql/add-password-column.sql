-- ============================================================================
-- Add password_hash column to profiles table for custom JWT auth
-- ============================================================================
-- Run this in Supabase SQL Editor to add password support to profiles table
-- ============================================================================

-- Add password_hash column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Make password_hash NOT NULL for new users (existing users can be NULL)
-- Update constraint later after migrating existing users

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name = 'password_hash';
