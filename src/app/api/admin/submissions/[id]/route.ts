import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Verify admin access
    const user = await getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { status, approval_notes } = body

    if (!['submitted', 'rejected', 'under_review', 'accepted'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Update paper submission
    // @ts-expect-error Supabase type inference issue
    const { data: updatedPaper, error } = await supabaseAdmin.from('paper_submissions').update({
      status,
      approval_notes,
      approved_by: user.userId,
      approved_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }).eq('id', id).select(`
      *,
      user:profiles!paper_submissions_user_id_fkey (
        id,
        full_name,
        email
      )
    `).single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update paper' },
        { status: 500 }
      )
    }

    // Log admin action
    // @ts-expect-error Supabase type inference issue
    await supabaseAdmin.from('admin_logs').insert({
      admin_id: user.userId,
      action: status === 'submitted' ? 'approved_paper' : `${status}_paper`,
      entity_type: 'paper_submission',
      entity_id: id,
      details: {
        message: `${status === 'submitted' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Updated'} paper: ${(updatedPaper as any).title}`,
        cmt_paper_id: (updatedPaper as any).cmt_paper_id,
        status,
        notes: approval_notes
      }
    })

    return NextResponse.json({ 
      message: `Paper ${status} successfully`,
      paper: updatedPaper 
    })
  } catch (error) {
    console.error('Failed to update paper:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
