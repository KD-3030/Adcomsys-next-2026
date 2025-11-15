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

    // Get total users
    const { count: totalUsers } = await supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // Get pending payments
    const { count: pendingPayments } = await supabaseAdmin
      .from('payment_verifications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    // Get approved payments
    const { count: approvedPayments } = await supabaseAdmin
      .from('payment_verifications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')

    // Get total papers (placeholder - will be actual CMT integration later)
    const { count: totalPapers } = await supabaseAdmin
      .from('paper_submissions')
      .select('*', { count: 'exact', head: true })

    // Get unread contacts
    const { count: unreadContacts } = await supabaseAdmin
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new')

    // Get recent registrations (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const { count: recentRegistrations } = await supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString())

    // Get recent activity
    const { data: recentUsers } = await supabaseAdmin
      .from('profiles')
      .select('id, name, email, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    const recentActivity = recentUsers?.map((user: any) => ({
      id: user.id,
      type: 'registration',
      message: `New registration: ${user.name}`,
      timestamp: new Date(user.created_at).toLocaleString()
    })) || []

    return NextResponse.json({
      stats: {
        totalUsers: totalUsers || 0,
        pendingPayments: pendingPayments || 0,
        approvedPayments: approvedPayments || 0,
        totalPapers: totalPapers || 0,
        unreadContacts: unreadContacts || 0,
        recentRegistrations: recentRegistrations || 0
      },
      recentActivity
    })
  } catch (error) {
    console.error('Failed to fetch admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
