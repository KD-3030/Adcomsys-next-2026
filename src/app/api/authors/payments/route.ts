import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user) {
    console.log('GET payments: No user found in request')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log('GET payments: User ID:', user.userId)

  try {
    const supabase = await createClient()

    // Fetch payment verifications for the user
    const { data: payments, error } = await supabase
      .from('payment_verifications')
      .select(`
        id,
        amount,
        currency,
        category,
        status,
        screenshot_url,
        transaction_id,
        verification_notes,
        created_at,
        updated_at,
        paper_id,
        verified_at,
        verified_by
      `)
      .eq('user_id', user.userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error fetching payments:', error)
      return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
    }

    console.log('Fetched payments count:', payments?.length || 0)
    console.log('Payments data:', JSON.stringify(payments, null, 2))

    return NextResponse.json({ payments: payments || [] })
  } catch (error) {
    console.error('Exception in GET payments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      amount,
      currency,
      category,
      paperId,
      paperTitle,
      transactionId,
      paymentMethod,
      screenshot_url,
      notes
    } = body

    // Validate required fields
    if (!amount || !category || !screenshot_url) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // If paper ID is provided, verify it exists
    let validatedPaperId: string | null = null
    if (paperId) {
      const { data: paper } = await supabase
        .from('paper_submissions')
        .select('id')
        .eq('cmt_paper_id', paperId)
        .eq('user_id', user.userId)
        .single()

      if (paper) {
        validatedPaperId = paper.id
      }
    }

    // Create payment verification record
    const { data: payment, error } = await supabase
      .from('payment_verifications')
      .insert({
        user_id: user.userId,
        amount: parseFloat(amount),
        currency: currency || 'INR',
        category,
        paper_id: validatedPaperId,
        transaction_id: transactionId || null,
        screenshot_url,
        status: 'pending',
        verification_notes: notes || null
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create payment record' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      payment
    })
  } catch (error) {
    console.error('Exception:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
