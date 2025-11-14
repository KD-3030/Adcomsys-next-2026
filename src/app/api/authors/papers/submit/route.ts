import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { cmtPaperId, title, authors, subjectArea, abstract } = body

    // Validate required fields
    if (!cmtPaperId || !title || !authors || !subjectArea) {
      return NextResponse.json(
        { error: 'Missing required fields: CMT Paper ID, Title, Authors, and Subject Area are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if paper ID already exists
    const { data: existingPaper } = await supabase
      .from('paper_submissions')
      .select('id, cmt_paper_id')
      .eq('cmt_paper_id', cmtPaperId)
      .single()

    if (existingPaper) {
      return NextResponse.json(
        { error: 'A paper with this CMT Paper ID already exists' },
        { status: 409 }
      )
    }

    // Create paper submission with pending_approval status
    const { data: paper, error } = await supabase
      .from('paper_submissions')
      .insert({
        user_id: user.userId,
        cmt_paper_id: cmtPaperId,
        title,
        authors,
        subject_area: subjectArea,
        abstract: abstract || null,
        status: 'pending_approval',
        submission_date: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to submit paper' },
        { status: 500 }
      )
    }

    // Log the submission
    await supabase
      .from('admin_logs')
      .insert({
        admin_id: user.userId,
        action: 'paper_submitted',
        entity_type: 'paper_submission',
        entity_id: paper.id,
        details: {
          message: `New paper submission: ${title}`,
          cmt_paper_id: cmtPaperId,
          subject_area: subjectArea
        }
      })

    return NextResponse.json({
      success: true,
      paper
    })
  } catch (error) {
    console.error('Exception in paper submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
