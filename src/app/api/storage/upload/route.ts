import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const bucket = formData.get('bucket') as string
    const folder = formData.get('folder') as string | null

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!bucket) {
      return NextResponse.json(
        { error: 'No bucket specified' },
        { status: 400 }
      )
    }

    // Validate file type - allow images and PDFs for payment-screenshots bucket
    const isPaymentBucket = bucket === 'payment-screenshots'
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const validPdfType = 'application/pdf'
    
    if (isPaymentBucket) {
      if (!validImageTypes.includes(file.type) && file.type !== validPdfType) {
        return NextResponse.json(
          { error: 'Please upload an image (JPG, PNG, GIF, WebP) or PDF file' },
          { status: 400 }
        )
      }
    } else {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Please upload an image file' },
          { status: 400 }
        )
      }
    }

    // Validate file size (max 5MB for images, 10MB for payment screenshots)
    const maxSize = isPaymentBucket ? 10 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      const maxSizeMB = isPaymentBucket ? '10MB' : '5MB'
      return NextResponse.json(
        { error: `File size must be less than ${maxSizeMB}` },
        { status: 400 }
      )
    }

    // Create Supabase client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return NextResponse.json({
      success: true,
      url: publicUrl
    })
  } catch (error) {
    console.error('Upload exception:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const bucket = searchParams.get('bucket')

    if (!url || !bucket) {
      return NextResponse.json(
        { error: 'URL and bucket are required' },
        { status: 400 }
      )
    }

    // Create Supabase client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Extract file path from URL
    const urlParts = url.split(`${bucket}/`)
    if (urlParts.length < 2) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    const filePath = urlParts[1]

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete exception:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
