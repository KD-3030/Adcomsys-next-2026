import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await verifyJWT(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { data: members, error } = await supabaseAdmin
      .from('committee_members')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true })

    if (error) {
      console.error('Failed to fetch committee members:', error)
      return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 })
    }

    return NextResponse.json({ members })
  } catch (error) {
    console.error('Committee fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyJWT(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()
    const { name, title, affiliation, email, category, photo_url } = body

    // Validate required fields
    if (!name || !affiliation || !email || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate category
    if (!['organizing', 'technical', 'advisory'].includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('committee_members')
      .insert({
        name,
        title: title || '',
        affiliation,
        email,
        category,
        photo_url: photo_url || null
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to create committee member:', error)
      return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: (user as any).id,
        action: 'create',
        table_name: 'committee_members',
        record_id: data.id,
        details: { name, category }
      })
      .then(() => {})
      .catch(() => {})

    return NextResponse.json({ member: data })
  } catch (error) {
    console.error('Committee create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
