-- Add reviewed_at and reviewed_by columns to paper_submissions table
ALTER TABLE paper_submissions
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES profiles(id);

-- Add comments to explain the columns
COMMENT ON COLUMN paper_submissions.reviewed_at IS 'Timestamp when the paper was reviewed by the reviewer';
COMMENT ON COLUMN paper_submissions.reviewed_by IS 'ID of the reviewer who completed the review (may differ from reviewer_id if reassigned)';

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_paper_submissions_reviewed_by ON paper_submissions(reviewed_by);
