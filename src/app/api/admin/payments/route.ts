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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    // Build query
    let query = supabaseAdmin
      .from('payment_verifications')
      .select(`
        *,
        user:profiles!payment_verifications_user_id_fkey (
          id,
          full_name,
          email,
          institution
        ),
        paper:paper_submissions!payment_verifications_paper_id_fkey (
          id,
          cmt_paper_id,
          title
        )
      `)
      .order('created_at', { ascending: false })

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    const { data: payments, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch payments' },
        { status: 500 }
      )
    }

    return NextResponse.json({ payments: payments || [] })
  } catch (error) {
    console.error('Failed to fetch payments:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
