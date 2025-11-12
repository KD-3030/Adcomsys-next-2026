# Supabase Storage Setup Guide

## Required Storage Buckets

You need to create two public storage buckets in your Supabase project:

### 1. Committee Images Bucket
- **Bucket Name**: `committee-images`
- **Public**: Yes (Allow public access)
- **File Size Limit**: 5MB
- **Allowed MIME Types**: image/*

### 2. Speaker Images Bucket
- **Bucket Name**: `speaker-images`
- **Public**: Yes (Allow public access)
- **File Size Limit**: 5MB
- **Allowed MIME Types**: image/*

## Setup Steps

### Step 1: Create Storage Buckets

1. **Go to Supabase Dashboard**
   - Navigate to https://app.supabase.com
   - Select your project

2. **Access Storage**
   - Click on "Storage" in the left sidebar
   - Click "New bucket" button

3. **Create Committee Images Bucket**
   - Name: `committee-images`
   - Set as Public bucket: ✅ Yes
   - Click "Create bucket"

4. **Create Speaker Images Bucket**
   - Name: `speaker-images`
   - Set as Public bucket: ✅ Yes
   - Click "Create bucket"

### Step 2: Set Up Environment Variables

Add your Supabase Service Role Key to `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Where to find it:**
- Go to your Supabase project settings
- Navigate to "API" section
- Copy the `service_role` key (not the `anon` key)
- ⚠️ **Warning**: Keep this key secure! Never commit it to version control.

### Step 3: Configure Storage Policies (Optional)

The application now uses a server-side API route with the service role key, which bypasses RLS policies. However, if you want to set up RLS policies for additional security, run the SQL script:

```sql
-- Run sql/setup-storage-policies.sql in your Supabase SQL Editor
```

This will allow authenticated users to upload/update/delete images, and allow public read access.

## Bucket Structure

Images will be organized as follows:

```
committee-images/
  └── photos/
      ├── 1234567890-abc123.jpg
      ├── 1234567891-def456.png
      └── ...

speaker-images/
  └── photos/
      ├── 1234567892-ghi789.jpg
      ├── 1234567893-jkl012.png
      └── ...
```

## How It Works

1. **Upload Process**:
   - Admin selects an image file in the form
   - File is validated (type and size)
   - Unique filename is generated: `timestamp-randomid.extension`
   - File is uploaded to Supabase Storage
   - Public URL is returned and stored in database

2. **Display Process**:
   - Image URL is retrieved from database
   - Next.js Image component loads the image
   - Images are optimized automatically by Next.js

3. **Delete Process**:
   - When updating with a new image, old image is deleted
   - When deleting a member/speaker, their image can be deleted

## Image Requirements

- **Format**: JPG, PNG, WebP, or GIF
- **Size**: Maximum 5MB
- **Recommended**: Square images (1:1 aspect ratio)
- **Minimum**: 200x200 pixels
- **Optimal**: 400x400 pixels or higher

## Security Notes

- Buckets are set to public for read access
- Only authenticated admins can upload through the app
- File size is validated on upload
- File type is validated on upload
- Unique filenames prevent overwrites
