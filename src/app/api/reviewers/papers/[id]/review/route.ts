import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { verifyToken } from '@/lib/auth/jwt'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify token and get user
    const decoded = await verifyToken(token)
    if (!decoded || decoded.role !== 'reviewer') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { status, review_comments, review_status } = body

    // Validate required fields
    if (!status || !review_comments || !review_status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate status value
    if (!['accepted', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Verify the paper is assigned to this reviewer
    const { data: paper, error: fetchError } = await supabase
      .from('paper_submissions')
      .select('*')
      .eq('id', id)
      .eq('reviewer_id', decoded.userId)
      .single()

    if (fetchError || !paper) {
      return NextResponse.json(
        { error: 'Paper not found or not assigned to you' },
        { status: 404 }
      )
    }

    // Update the paper with review
    const { data, error } = await supabase
      .from('paper_submissions')
      // @ts-expect-error - Supabase types don't include custom columns
      .update({
        status,
        review_comments,
        review_status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: decoded.userId
      })
      .eq('id', id)
      .eq('reviewer_id', decoded.userId)
      .select()
      .single()

    if (error) {
      console.error('Database update error:', error)
      return NextResponse.json(
        { error: 'Failed to update paper' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Review submitted successfully',
      paper: data
    })

  } catch (error) {
    console.error('Review submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
