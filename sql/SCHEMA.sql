-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.admin_logs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  admin_id uuid,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  details jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT admin_logs_pkey PRIMARY KEY (id),
  CONSTRAINT admin_logs_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.committee_members (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  designation text NOT NULL,
  affiliation text NOT NULL,
  email text,
  image_url text,
  committee_type text NOT NULL CHECK (committee_type = ANY (ARRAY['organizing'::text, 'technical'::text, 'advisory'::text])),
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT committee_members_pkey PRIMARY KEY (id)
);
CREATE TABLE public.contact_submissions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new'::text CHECK (status = ANY (ARRAY['new'::text, 'read'::text, 'replied'::text, 'archived'::text])),
  replied_at timestamp with time zone,
  replied_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contact_submissions_pkey PRIMARY KEY (id),
  CONSTRAINT contact_submissions_replied_by_fkey FOREIGN KEY (replied_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamp with time zone NOT NULL,
  event_time text,
  venue text NOT NULL,
  image_url text,
  registration_url text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (id)
);
CREATE TABLE public.important_dates (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  date_value timestamp with time zone NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT important_dates_pkey PRIMARY KEY (id)
);
CREATE TABLE public.paper_submissions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  cmt_paper_id text NOT NULL UNIQUE,
  title text NOT NULL,
  abstract text,
  status text DEFAULT 'submitted'::text CHECK (status = ANY (ARRAY['submitted'::text, 'under_review'::text, 'accepted'::text, 'rejected'::text])),
  reviewer_id uuid,
  review_comments text,
  review_status text CHECK (review_status = ANY (ARRAY['pending'::text, 'completed'::text])),
  submission_date timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT paper_submissions_pkey PRIMARY KEY (id),
  CONSTRAINT paper_submissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT paper_submissions_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.payment_verifications (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  paper_id uuid,
  amount numeric NOT NULL,
  currency text DEFAULT 'INR'::text,
  category text NOT NULL CHECK (category = ANY (ARRAY['student'::text, 'academician'::text, 'industry'::text, 'attendee'::text])),
  screenshot_url text NOT NULL,
  transaction_id text,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'verified'::text, 'rejected'::text])),
  verified_by uuid,
  verified_at timestamp with time zone,
  verification_notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT payment_verifications_pkey PRIMARY KEY (id),
  CONSTRAINT payment_verifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT payment_verifications_paper_id_fkey FOREIGN KEY (paper_id) REFERENCES public.paper_submissions(id),
  CONSTRAINT payment_verifications_verified_by_fkey FOREIGN KEY (verified_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text NOT NULL UNIQUE,
  full_name text,
  institution text,
  designation text,
  country text,
  phone text,
  bio text,
  avatar_url text,
  role text DEFAULT 'author'::text CHECK (role = ANY (ARRAY['guest'::text, 'author'::text, 'reviewer'::text, 'admin'::text])),
  cmt_profile_url text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  password_hash text,
  CONSTRAINT profiles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.speakers (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  designation text NOT NULL,
  affiliation text NOT NULL,
  bio text,
  image_url text,
  topic text,
  session_date timestamp with time zone,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT speakers_pkey PRIMARY KEY (id)
);