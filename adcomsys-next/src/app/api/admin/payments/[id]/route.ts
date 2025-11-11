import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin access
    const user = await getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { status, admin_notes } = body

    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be approved or rejected' },
        { status: 400 }
      )
    }

    // Update payment status
    const { data, error } = await supabaseAdmin
      .from('payment_verifications')
      .update({
        status,
        admin_notes: admin_notes || null,
        verified_at: new Date().toISOString(),
        verified_by: (user as any).id,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update payment' },
        { status: 500 }
      )
    }

    // Log admin action
    await supabaseAdmin.from('admin_logs').insert({
      admin_id: (user as any).id,
      action: 'verify_payment',
      table_name: 'payment_verifications',
      record_id: params.id,
      details: { status, admin_notes }
    }).then(() => {}).catch(() => {})

    // TODO: Send email notification to user about payment status

    return NextResponse.json({ 
      payment: data?.[0],
      message: `Payment ${status} successfully`
    })
  } catch (error) {
    console.error('Failed to update payment:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
