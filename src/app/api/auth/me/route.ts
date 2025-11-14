import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const jwtUser = getUserFromRequest(request)

  if (!jwtUser) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Fetch full user profile from database
  const profile = await db.getUserById(jwtUser.userId)

  if (!profile) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(
    { 
      user: {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: profile.role
      }
    },
    { status: 200 }
  )
}
