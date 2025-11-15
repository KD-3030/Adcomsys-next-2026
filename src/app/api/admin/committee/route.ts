import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

// GET all committee members
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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const committee_type = searchParams.get('type')

    // Build query
    let query = supabaseAdmin
      .from('committee_members')
      .select('*')
      .order('display_order', { ascending: true })

    // Apply filter
    if (committee_type && committee_type !== 'all') {
      query = query.eq('committee_type', committee_type)
    }

    const { data: members, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch committee members' },
        { status: 500 }
      )
    }

    return NextResponse.json({ members: members || [] })
  } catch (error) {
    console.error('Failed to fetch committee members:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// POST - Create new committee member
export async function POST(request: NextRequest) {
  try {
    // Verify admin access
    const user = await getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, designation, affiliation, email, image_url, committee_type, display_order, is_active } = body

    // Validate required fields
    if (!name || !designation || !affiliation || !committee_type) {
      return NextResponse.json(
        { error: 'Name, designation, affiliation, and committee_type are required' },
        { status: 400 }
      )
    }

    // Validate committee_type
    if (!['organizing', 'technical', 'advisory'].includes(committee_type)) {
      return NextResponse.json(
        { error: 'Invalid committee_type. Must be organizing, technical, or advisory' },
        { status: 400 }
      )
    }

    // Create committee member
    // @ts-expect-error Supabase type inference issue
    const { data: newMember, error } = await supabaseAdmin.from('committee_members').insert({
      name,
      designation,
      affiliation,
      email,
      image_url,
      committee_type,
      display_order: display_order || 0,
      is_active: is_active !== undefined ? is_active : true
    }).select().single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create committee member' },
        { status: 500 }
      )
    }

    // Log admin action
    // @ts-expect-error Supabase type inference issue
    await supabaseAdmin.from('admin_logs').insert({
      admin_id: (user as any).id,
      action: 'created_committee_member',
      entity_type: 'committee_member',
      entity_id: (newMember as any).id,
      details: {
        message: `Created committee member ${name}`,
        committee_type,
        affiliation
      }
    })

    return NextResponse.json({ 
      message: 'Committee member created successfully',
      member: newMember 
    }, { status: 201 })
  } catch (error) {
    console.error('Failed to create committee member:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
