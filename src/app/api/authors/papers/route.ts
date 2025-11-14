import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user) {
    console.log('GET papers: No user found in request')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log('GET papers: User ID:', user.userId)

  try {
    const supabase = await createClient()

    // Fetch paper submissions for the user
    const { data: papers, error } = await supabase
      .from('paper_submissions')
      .select(`
        id,
        cmt_paper_id,
        title,
        authors,
        subject_area,
        abstract,
        status,
        submission_date,
        created_at,
        updated_at,
        review_status,
        review_comments,
        approval_notes
      `)
      .eq('user_id', user.userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error fetching papers:', error)
      return NextResponse.json({ error: 'Failed to fetch papers' }, { status: 500 })
    }

    console.log('Fetched papers count:', papers?.length || 0)

    return NextResponse.json({ papers: papers || [] })
  } catch (error) {
    console.error('Exception in GET papers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
