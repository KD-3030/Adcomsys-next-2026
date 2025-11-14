-- ============================================================================
-- AdComSys 2026 - Simplified Database Schema (Safe Re-run Version)
-- ============================================================================
-- This version uses DROP IF EXISTS to allow safe re-runs
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- DROP EXISTING TRIGGERS (if any)
-- ============================================================================
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_paper_submissions_updated_at ON paper_submissions;
DROP TRIGGER IF EXISTS update_payment_verifications_updated_at ON payment_verifications;
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
DROP TRIGGER IF EXISTS update_speakers_updated_at ON speakers;
DROP TRIGGER IF EXISTS update_committee_members_updated_at ON committee_members;
DROP TRIGGER IF EXISTS update_important_dates_updated_at ON important_dates;

-- ============================================================================
-- PROFILES TABLE (extends Supabase Auth)
-- ============================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  institution TEXT,
  designation TEXT,
  country TEXT,
  phone TEXT,
  bio TEXT,
  avatar_url TEXT,
  
  -- Role: guest, author, reviewer, admin
  role TEXT DEFAULT 'author' CHECK (role IN ('guest', 'author', 'reviewer', 'admin')),
  
  -- CMT Profile Link (manual entry by user)
  cmt_profile_url TEXT,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PAPER SUBMISSIONS TRACKING
-- ============================================================================
CREATE TABLE IF NOT EXISTS paper_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  cmt_paper_id TEXT UNIQUE NOT NULL,
  
  title TEXT NOT NULL,
  abstract TEXT,
  
  status TEXT DEFAULT 'submitted' CHECK (status IN (
    'submitted',
    'under_review',
    'accepted',
    'rejected'
  )),
  
  reviewer_id UUID REFERENCES profiles(id),
  review_comments TEXT,
  review_status TEXT CHECK (review_status IN ('pending', 'completed')),
  
  submission_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PAYMENT VERIFICATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS payment_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  paper_id UUID REFERENCES paper_submissions(id) ON DELETE SET NULL,
  
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  category TEXT NOT NULL CHECK (category IN (
    'student',
    'academician',
    'industry',
    'attendee'
  )),
  
  screenshot_url TEXT NOT NULL,
  transaction_id TEXT,
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  verification_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- EVENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  event_time TEXT,
  venue TEXT NOT NULL,
  image_url TEXT,
  registration_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SPEAKERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS speakers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  affiliation TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  topic TEXT,
  session_date TIMESTAMPTZ,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- COMMITTEE MEMBERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS committee_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  affiliation TEXT NOT NULL,
  email TEXT,
  image_url TEXT,
  committee_type TEXT NOT NULL CHECK (committee_type IN (
    'organizing',
    'technical',
    'advisory'
  )),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- IMPORTANT DATES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS important_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date_value TIMESTAMPTZ NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  replied_at TIMESTAMPTZ,
  replied_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ADMIN LOGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES for Performance
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_paper_submissions_user ON paper_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_paper_submissions_cmt ON paper_submissions(cmt_paper_id);
CREATE INDEX IF NOT EXISTS idx_paper_submissions_status ON paper_submissions(status);
CREATE INDEX IF NOT EXISTS idx_paper_submissions_reviewer ON paper_submissions(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_payment_verifications_user ON payment_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_verifications_status ON payment_verifications(status);

-- ============================================================================
-- TRIGGERS for Updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers (these will replace existing ones due to CREATE OR REPLACE above)
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_paper_submissions_updated_at 
  BEFORE UPDATE ON paper_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_verifications_updated_at 
  BEFORE UPDATE ON payment_verifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at 
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_speakers_updated_at 
  BEFORE UPDATE ON speakers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_committee_members_updated_at 
  BEFORE UPDATE ON committee_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_important_dates_updated_at 
  BEFORE UPDATE ON important_dates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE paper_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE important_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (safe to run multiple times)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view own submissions" ON paper_submissions;
DROP POLICY IF EXISTS "Users can create submissions" ON paper_submissions;
DROP POLICY IF EXISTS "Users can update own draft submissions" ON paper_submissions;
DROP POLICY IF EXISTS "Reviewers can view assigned papers" ON paper_submissions;
DROP POLICY IF EXISTS "Reviewers can update assigned papers" ON paper_submissions;
DROP POLICY IF EXISTS "Admins can manage all submissions" ON paper_submissions;
DROP POLICY IF EXISTS "Users can view own payments" ON payment_verifications;
DROP POLICY IF EXISTS "Users can create payments" ON payment_verifications;
DROP POLICY IF EXISTS "Admins can manage payments" ON payment_verifications;
DROP POLICY IF EXISTS "Anyone can view active events" ON events;
DROP POLICY IF EXISTS "Anyone can view active speakers" ON speakers;
DROP POLICY IF EXISTS "Anyone can view active committee members" ON committee_members;
DROP POLICY IF EXISTS "Anyone can view active important dates" ON important_dates;
DROP POLICY IF EXISTS "Admins can manage events" ON events;
DROP POLICY IF EXISTS "Admins can manage speakers" ON speakers;
DROP POLICY IF EXISTS "Admins can manage committee members" ON committee_members;
DROP POLICY IF EXISTS "Admins can manage important dates" ON important_dates;
DROP POLICY IF EXISTS "Anyone can create contact submission" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can view logs" ON admin_logs;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Paper Submissions Policies
CREATE POLICY "Users can view own submissions" ON paper_submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions" ON paper_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own draft submissions" ON paper_submissions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Reviewers can view assigned papers" ON paper_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('reviewer', 'admin')
    ) OR auth.uid() = reviewer_id
  );

CREATE POLICY "Reviewers can update assigned papers" ON paper_submissions
  FOR UPDATE USING (auth.uid() = reviewer_id);

CREATE POLICY "Admins can manage all submissions" ON paper_submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Payment Verifications Policies
CREATE POLICY "Users can view own payments" ON payment_verifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create payments" ON payment_verifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage payments" ON payment_verifications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Public Content Policies
CREATE POLICY "Anyone can view active events" ON events
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active speakers" ON speakers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active committee members" ON committee_members
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active important dates" ON important_dates
  FOR SELECT USING (is_active = true);

-- Admins can manage public content
CREATE POLICY "Admins can manage events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage speakers" ON speakers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage committee members" ON committee_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage important dates" ON important_dates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Contact Submissions Policies
CREATE POLICY "Anyone can create contact submission" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions" ON contact_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admin Logs Policies
CREATE POLICY "Admins can view logs" ON admin_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- SEED DATA (Important Dates)
-- ============================================================================
INSERT INTO important_dates (title, date_value, display_order) VALUES
  ('Paper Submission Open', '2025-12-15', 1),
  ('Paper Submission Deadline', '2026-03-10', 2),
  ('Acceptance Notification', '2026-05-10', 3),
  ('Early Bird Registration', '2026-05-25', 4),
  ('Last Date of Registration', '2026-06-05', 5),
  ('Final Camera Ready Paper', '2026-06-15', 6),
  ('Submission of Copyright', '2026-06-15', 7),
  ('Conference Dates', '2026-06-25', 8)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- SUCCESS! Schema deployed successfully
-- ============================================================================
