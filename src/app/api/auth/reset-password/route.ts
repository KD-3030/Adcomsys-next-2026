import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'
import { hashPassword } from '@/lib/auth/password'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: 'Password must contain uppercase, lowercase, and numbers' },
        { status: 400 }
      )
    }

    // Find user with valid reset token
    const { data: user, error: userError } = await (supabaseAdmin
      .from('profiles') as any)
      .select('id, email, password_reset_token, password_reset_expires')
      .eq('password_reset_token', token)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Check if token is expired
    const expiresAt = new Date(user.password_reset_expires)
    if (expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Reset token has expired. Please request a new one' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await hashPassword(password)

    // Update password and clear reset token
    const { error: updateError } = await (supabaseAdmin
      .from('profiles') as any)
      .update({
        password_hash: hashedPassword,
        password_reset_token: null,
        password_reset_expires: null,
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Failed to update password:', updateError)
      return NextResponse.json(
        { error: 'Failed to reset password' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Password reset successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
