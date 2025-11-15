import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

// GET all speakers
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

    const { data: speakers, error } = await supabaseAdmin
      .from('speakers')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch speakers' },
        { status: 500 }
      )
    }

    return NextResponse.json({ speakers: speakers || [] })
  } catch (error) {
    console.error('Failed to fetch speakers:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// POST - Create new speaker
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
    const { name, designation, affiliation, bio, image_url, topic, session_date, display_order, is_active } = body

    // Validate required fields
    if (!name || !designation || !affiliation) {
      return NextResponse.json(
        { error: 'Name, designation, and affiliation are required' },
        { status: 400 }
      )
    }

    // Create speaker
    // @ts-expect-error Supabase type inference issue
    const { data: newSpeaker, error } = await supabaseAdmin.from('speakers').insert({
      name,
      designation,
      affiliation,
      bio,
      image_url,
      topic,
      session_date,
      display_order: display_order || 0,
      is_active: is_active !== undefined ? is_active : true
    }).select().single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create speaker' },
        { status: 500 }
      )
    }

    // Log admin action
    // @ts-expect-error Supabase type inference issue
    await supabaseAdmin.from('admin_logs').insert({
      admin_id: (user as any).id,
      action: 'created_speaker',
      entity_type: 'speaker',
      entity_id: (newSpeaker as any).id,
      details: {
        message: `Created speaker ${name}`,
        affiliation
      }
    })

    return NextResponse.json({ 
      message: 'Speaker created successfully',
      speaker: newSpeaker 
    }, { status: 201 })
  } catch (error) {
    console.error('Failed to create speaker:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
