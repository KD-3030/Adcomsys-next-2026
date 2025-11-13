import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Mock data for payments
  // In production, fetch from database
  const payments = [
    // Example structure - replace with actual database query
    // {
    //   id: '1',
    //   amount: 350,
    //   currency: 'USD',
    //   status: 'verified',
    //   payment_date: '2026-01-20',
    //   payment_method: 'Bank Transfer',
    //   transaction_id: 'TXN123456789'
    // }
  ]

  return NextResponse.json({ payments })
}
