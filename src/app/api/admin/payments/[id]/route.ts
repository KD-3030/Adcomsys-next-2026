import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

// GET single payment by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { id } = await params

    // Verify admin access
    const user = await getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      )
    }

    const { data: payment, error } = await supabaseAdmin
      .from('payment_verifications')
      .select(`
        *,
        user:profiles!payment_verifications_user_id_fkey (
          id,
          full_name,
          email,
          institution,
          phone
        ),
        paper:paper_submissions!payment_verifications_paper_id_fkey (
          id,
          cmt_paper_id,
          title
        ),
        verified_by_user:profiles!payment_verifications_verified_by_fkey (
          id,
          full_name,
          email
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ payment })
  } catch (error) {
    console.error('Failed to fetch payment:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// PUT - Update payment verification status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15+
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
    const { status, verification_notes } = body

    if (!['verified', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be verified, rejected, or pending' },
        { status: 400 }
      )
    }

    // Update payment verification
    // @ts-expect-error Supabase type inference issue
    const { data: updatedPayment, error } = await supabaseAdmin.from('payment_verifications').update({
      status,
      verification_notes,
      verified_by: user.userId,
      verified_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }).eq('id', id).select(`
      *,
      user:profiles!payment_verifications_user_id_fkey (
        id,
        full_name,
        email
      )
    `).single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update payment' },
        { status: 500 }
      )
    }

    // Log admin action
    // @ts-expect-error Supabase type inference issue
    await supabaseAdmin.from('admin_logs').insert({
      admin_id: user.userId,
      action: status === 'verified' ? 'verified_payment' : 'rejected_payment',
      entity_type: 'payment_verification',
      entity_id: id,
      details: {
        message: `${status === 'verified' ? 'Verified' : 'Rejected'} payment for ${(updatedPayment as any).user?.full_name}`,
        amount: (updatedPayment as any).amount,
        category: (updatedPayment as any).category,
        notes: verification_notes
      }
    })

    return NextResponse.json({ 
      message: `Payment ${status} successfully`,
      payment: updatedPayment 
    })
  } catch (error) {
    console.error('Failed to update payment:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// DELETE payment verification
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { id } = await params

    // Verify admin access
    const user = await getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      )
    }

    // Get payment info before deletion
    const { data: paymentData } = await supabaseAdmin
      .from('payment_verifications')
      .select('transaction_id, amount')
      .eq('id', id)
      .single()

    // Delete payment
    const { error } = await supabaseAdmin
      .from('payment_verifications')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete payment' },
        { status: 500 }
      )
    }

    // Log admin action
    if (paymentData) {
      // @ts-expect-error Supabase type inference issue
      await supabaseAdmin.from('admin_logs').insert({
        admin_id: user.userId,
        action: 'deleted_payment',
        entity_type: 'payment_verification',
        entity_id: id,
        details: {
          message: `Deleted payment verification`,
          transaction_id: (paymentData as any).transaction_id,
          amount: (paymentData as any).amount
        }
      })
    }

    return NextResponse.json({ 
      message: 'Payment deleted successfully' 
    })
  } catch (error) {
    console.error('Failed to delete payment:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
