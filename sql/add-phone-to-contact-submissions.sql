-- Add phone column to contact_submissions table
ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS phone VARCHAR(50);

COMMENT ON COLUMN contact_submissions.phone IS 'Optional phone number for contact form submissions';
