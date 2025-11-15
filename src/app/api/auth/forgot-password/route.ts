import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'
import { sendPasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const { data: user, error: userError } = await (supabaseAdmin
      .from('profiles') as any)
      .select('id, email, full_name')
      .eq('email', email.toLowerCase())
      .single()

    if (userError || !user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account exists with that email, a reset link has been sent.' },
        { status: 200 }
      )
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Save reset token to database
    const { error: updateError } = await (supabaseAdmin
      .from('profiles') as any)
      .update({
        password_reset_token: resetToken,
        password_reset_expires: resetExpires.toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Failed to save reset token:', updateError)
      return NextResponse.json(
        { error: 'Failed to process reset request' },
        { status: 500 }
      )
    }

    // Send reset email
    const emailResult = await sendPasswordResetEmail(
      user.email,
      user.full_name,
      resetToken
    )

    if (!emailResult.success) {
      console.error('Failed to send reset email:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send reset email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Password reset link sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
