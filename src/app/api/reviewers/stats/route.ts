import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { verifyToken } from '@/lib/auth/jwt'

export async function GET(request: NextRequest) {
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

    const supabase = await createClient()

    // Get reviewer's papers count
    const { data: assignedPapers, error: assignedError } = await supabase
      .from('paper_submissions')
      .select('id', { count: 'exact' })
      .eq('reviewer_id', decoded.userId)

    const { data: completedPapers, error: completedError } = await supabase
      .from('paper_submissions')
      .select('id', { count: 'exact' })
      .eq('reviewer_id', decoded.userId)
      .eq('review_status', 'completed')

    const { data: pendingPapers, error: pendingError } = await supabase
      .from('paper_submissions')
      .select('id', { count: 'exact' })
      .eq('reviewer_id', decoded.userId)
      .eq('review_status', 'pending')

    const { data: acceptedPapers, error: acceptedError } = await supabase
      .from('paper_submissions')
      .select('id', { count: 'exact' })
      .eq('reviewer_id', decoded.userId)
      .eq('review_status', 'completed')
      .eq('status', 'accepted')

    const { data: rejectedPapers, error: rejectedError } = await supabase
      .from('paper_submissions')
      .select('id', { count: 'exact' })
      .eq('reviewer_id', decoded.userId)
      .eq('review_status', 'completed')
      .eq('status', 'rejected')

    if (assignedError || completedError || pendingError || acceptedError || rejectedError) {
      console.error('Database query error:', assignedError || completedError || pendingError || acceptedError || rejectedError)
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      totalAssignedPapers: assignedPapers?.length || 0,
      completedReviews: completedPapers?.length || 0,
      pendingReviews: pendingPapers?.length || 0,
      acceptedPapers: acceptedPapers?.length || 0,
      rejectedPapers: rejectedPapers?.length || 0
    })

  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
