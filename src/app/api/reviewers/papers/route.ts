import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get papers assigned to this reviewer
    const { data: papers, error } = await supabaseAdmin
      .from('paper_submissions')
      .select(`
        *,
        profiles:user_id (
          full_name,
          email
        )
      `)
      .eq('reviewer_id', user.userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching papers:', error)
      return NextResponse.json(
        { error: 'Failed to fetch papers' },
        { status: 500 }
      )
    }

    // Format the response
    const formattedPapers = papers?.map((paper: any) => ({
      id: paper.id,
      title: paper.title,
      cmt_paper_id: paper.cmt_paper_id,
      submission_date: paper.submission_date,
      status: paper.status,
      review_status: paper.review_status || 'pending',
      author_name: paper.profiles?.full_name || 'Unknown',
    })) || []

    return NextResponse.json({
      papers: formattedPapers,
    })
  } catch (error) {
    console.error('Error fetching papers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
