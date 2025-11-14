import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyPassword } from '@/lib/auth/password'
import { signToken, setAuthCookie } from '@/lib/auth/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Get user by email
    const user = await db.getUserByEmail(email)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user has password_hash (for custom auth)
    if (!user.password_hash) {
      return NextResponse.json(
        { error: 'Please use Supabase authentication or reset your password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role || 'author',
    })

    // Create response and set auth cookie
    const response = NextResponse.json(
      {
        message: 'Logged in successfully',
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
        },
      },
      { status: 200 }
    )

    setAuthCookie(response, token)

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
