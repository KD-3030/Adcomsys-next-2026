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

    // Get papers that have been reviewed by this reviewer
    const { data: papers, error } = await supabase
      .from('paper_submissions')
      .select('*')
      .eq('reviewer_id', decoded.userId)
      .eq('review_status', 'completed')
      .order('submission_date', { ascending: false })

    if (error) {
      console.error('Database query error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch papers' },
        { status: 500 }
      )
    }

    return NextResponse.json({ papers: papers || [] })

  } catch (error) {
    console.error('Completed papers API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
