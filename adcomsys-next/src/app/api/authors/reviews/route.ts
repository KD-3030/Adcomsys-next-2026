import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if user has reviewer role
  if (user.role !== 'reviewer' && user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Mock data for reviews
  // In production, fetch from database
  const reviews: Array<{
    id: string
    paper_title: string
    submission_id: string
    status: 'pending' | 'in_progress' | 'completed'
    assigned_date: string
    due_date: string
    score?: number
    comments?: string
  }> = [
    // Example structure - replace with actual database query
    // {
    //   id: '1',
    //   paper_title: 'Sample Research Paper',
    //   submission_id: 'sub123',
    //   status: 'pending',
    //   assigned_date: '2026-01-10',
    //   due_date: '2026-02-10'
    // }
  ]

  return NextResponse.json({ reviews, role: user.role })
}
