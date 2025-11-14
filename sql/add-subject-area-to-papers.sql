-- Add subject_area column to paper_submissions table
ALTER TABLE public.paper_submissions 
ADD COLUMN IF NOT EXISTS subject_area text;

-- Add authors column to store comma-separated author names
ALTER TABLE public.paper_submissions 
ADD COLUMN IF NOT EXISTS authors text;

-- Update status constraint to include 'pending_approval' status
ALTER TABLE public.paper_submissions 
DROP CONSTRAINT IF EXISTS paper_submissions_status_check;

ALTER TABLE public.paper_submissions 
ADD CONSTRAINT paper_submissions_status_check 
CHECK (status = ANY (ARRAY['pending_approval'::text, 'submitted'::text, 'under_review'::text, 'accepted'::text, 'rejected'::text]));

-- Add admin approval fields
ALTER TABLE public.paper_submissions 
ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES public.profiles(id);

ALTER TABLE public.paper_submissions 
ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone;

ALTER TABLE public.paper_submissions 
ADD COLUMN IF NOT EXISTS approval_notes text;
