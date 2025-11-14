-- Add review_status column to paper_submissions if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'paper_submissions' 
        AND column_name = 'review_status'
    ) THEN
        ALTER TABLE paper_submissions 
        ADD COLUMN review_status TEXT DEFAULT 'pending' 
        CHECK (review_status IN ('pending', 'reviewed', 'accepted', 'rejected'));
    END IF;
END $$;

-- Add reviewer_id column to paper_submissions if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'paper_submissions' 
        AND column_name = 'reviewer_id'
    ) THEN
        ALTER TABLE paper_submissions 
        ADD COLUMN reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_paper_submissions_reviewer_id ON paper_submissions(reviewer_id);

-- Add review_comments column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'paper_submissions' 
        AND column_name = 'review_comments'
    ) THEN
        ALTER TABLE paper_submissions 
        ADD COLUMN review_comments TEXT;
    END IF;
END $$;

-- Add review_rating column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'paper_submissions' 
        AND column_name = 'review_rating'
    ) THEN
        ALTER TABLE paper_submissions 
        ADD COLUMN review_rating INTEGER CHECK (review_rating >= 1 AND review_rating <= 5);
    END IF;
END $$;

-- Add reviewed_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'paper_submissions' 
        AND column_name = 'reviewed_at'
    ) THEN
        ALTER TABLE paper_submissions 
        ADD COLUMN reviewed_at TIMESTAMPTZ;
    END IF;
END $$;
