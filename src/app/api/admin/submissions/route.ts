import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Verify admin access
    const user = await getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      )
    }

    const { data: papers, error } = await supabaseAdmin
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
        approval_notes,
        user:profiles!paper_submissions_user_id_fkey (
          id,
          full_name,
          email,
          institution
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch papers' },
        { status: 500 }
      )
    }

    return NextResponse.json({ papers: papers || [] })
  } catch (error) {
    console.error('Failed to fetch papers:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
