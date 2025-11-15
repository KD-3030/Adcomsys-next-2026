-- Add password reset columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS password_reset_token TEXT,
ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMPTZ;

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_profiles_password_reset_token 
ON profiles(password_reset_token) 
WHERE password_reset_token IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN profiles.password_reset_token IS 'Token used for password reset, expires after 1 hour';
COMMENT ON COLUMN profiles.password_reset_expires IS 'Expiration timestamp for password reset token';
