import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Mock data for submissions
  // In production, fetch from database
  const submissions = [
    // Example structure - replace with actual database query
    // {
    //   id: '1',
    //   title: 'Sample Paper Title',
    //   status: 'under_review',
    //   submitted_date: '2026-01-15',
    //   track: 'Data Communication and Networking'
    // }
  ]

  return NextResponse.json({ submissions })
}
