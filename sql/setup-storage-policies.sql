-- Storage Policies for Committee and Speaker Images
-- Run this in your Supabase SQL Editor

-- ============================================
-- COMMITTEE IMAGES BUCKET POLICIES
-- ============================================

-- Policy: Allow public read access to committee images
CREATE POLICY "Public Access to Committee Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'committee-images');

-- Policy: Allow authenticated users to upload committee images
CREATE POLICY "Authenticated users can upload committee images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'committee-images');

-- Policy: Allow authenticated users to update committee images
CREATE POLICY "Authenticated users can update committee images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'committee-images');

-- Policy: Allow authenticated users to delete committee images
CREATE POLICY "Authenticated users can delete committee images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'committee-images');

-- ============================================
-- SPEAKER IMAGES BUCKET POLICIES
-- ============================================

-- Policy: Allow public read access to speaker images
CREATE POLICY "Public Access to Speaker Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'speaker-images');

-- Policy: Allow authenticated users to upload speaker images
CREATE POLICY "Authenticated users can upload speaker images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'speaker-images');

-- Policy: Allow authenticated users to update speaker images
CREATE POLICY "Authenticated users can update speaker images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'speaker-images');

-- Policy: Allow authenticated users to delete speaker images
CREATE POLICY "Authenticated users can delete speaker images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'speaker-images');

-- ============================================
-- VERIFY POLICIES
-- ============================================

-- Check all storage policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage'
ORDER BY policyname;
