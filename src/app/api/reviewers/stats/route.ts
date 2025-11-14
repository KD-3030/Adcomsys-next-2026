import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get reviewer's assigned papers count
    const { data: allPapers, error: papersError } = await supabaseAdmin
      .from('paper_submissions')
      .select('*')
      .eq('reviewer_id', user.userId)

    if (papersError) {
      console.error('Error fetching papers:', papersError)
    }

    const totalAssigned = allPapers?.length || 0
    const reviewed = allPapers?.filter(p => p.review_status === 'reviewed' || p.review_status === 'accepted' || p.review_status === 'rejected').length || 0
    const pending = allPapers?.filter(p => p.review_status === 'pending' || !p.review_status).length || 0
    const accepted = allPapers?.filter(p => p.review_status === 'accepted').length || 0

    return NextResponse.json({
      stats: {
        totalAssigned,
        reviewed,
        pending,
        accepted,
      },
    })
  } catch (error) {
    console.error('Error fetching reviewer stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
