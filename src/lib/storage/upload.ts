export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

/**
 * Upload an image to Supabase Storage via API route
 * @param file - The file to upload
 * @param bucket - The storage bucket name (e.g., 'committee-images', 'speaker-images')
 * @param folder - Optional folder path within the bucket
 * @returns Upload result with public URL or error
 */
export async function uploadImage(
  file: File,
  bucket: string,
  folder?: string
): Promise<UploadResult> {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: 'Please upload an image file'
      }
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'Image size must be less than 5MB'
      }
    }

    // Create form data
    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', bucket)
    if (folder) {
      formData.append('folder', folder)
    }

    // Upload via API route
    const response = await fetch('/api/storage/upload', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to upload image'
      }
    }

    return {
      success: true,
      url: result.url
    }
  } catch (error) {
    console.error('Upload exception:', error)
    return {
      success: false,
      error: 'Failed to upload image'
    }
  }
}

/**
 * Delete an image from Supabase Storage via API route
 * @param url - The public URL of the image to delete
 * @param bucket - The storage bucket name
 * @returns Success status
 */
export async function deleteImage(url: string, bucket: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/storage/upload?url=${encodeURIComponent(url)}&bucket=${bucket}`, {
      method: 'DELETE'
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Delete error:', result.error)
      return false
    }

    return result.success
  } catch (error) {
    console.error('Delete exception:', error)
    return false
  }
}
