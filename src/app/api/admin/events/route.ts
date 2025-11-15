import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

// GET all events
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

    const { data: events, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch events' },
        { status: 500 }
      )
    }

    return NextResponse.json({ events: events || [] })
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// POST - Create new event
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
    const { title, description, event_date, event_time, venue, image_url, registration_url, display_order, is_active } = body

    // Validate required fields
    if (!title || !description || !event_date || !venue) {
      return NextResponse.json(
        { error: 'Title, description, event_date, and venue are required' },
        { status: 400 }
      )
    }

    // Create event
    // @ts-expect-error Supabase type inference issue
    const { data: newEvent, error } = await supabaseAdmin.from('events').insert({
      title,
      description,
      event_date,
      event_time,
      venue,
      image_url,
      registration_url,
      display_order: display_order || 0,
      is_active: is_active !== undefined ? is_active : true
    }).select().single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create event' },
        { status: 500 }
      )
    }

    // Log admin action
    // @ts-expect-error Supabase type inference issue
    await supabaseAdmin.from('admin_logs').insert({
      admin_id: (user as any).id,
      action: 'created_event',
      entity_type: 'event',
      entity_id: (newEvent as any).id,
      details: {
        message: `Created event ${title}`,
        venue,
        date: event_date
      }
    })

    return NextResponse.json({ 
      message: 'Event created successfully',
      event: newEvent 
    }, { status: 201 })
  } catch (error) {
    console.error('Failed to create event:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
