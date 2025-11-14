import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { db } from '@/lib/db'

export async function PUT(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { full_name, email } = body

    if (!full_name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Update user in database
    const updatedUser = await db.updateUser(user.userId, {
      full_name,
      email,
    })

    if (!updatedUser) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }

    const { id, full_name: userName, email: userEmail, role } = updatedUser

    return NextResponse.json({ 
      success: true, 
      user: {
        id,
        full_name: userName || null,
        email: userEmail,
        role
      }
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
