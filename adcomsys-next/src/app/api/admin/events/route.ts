import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await verifyJWT(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { data: events, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })

    if (error) {
      console.error('Failed to fetch events:', error)
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Event fetch error:', error)
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
    const { title, description, event_date, event_time, location } = body

    // Validate required fields
    if (!title || !event_date || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('events')
      .insert({
        title,
        description: description || '',
        event_date,
        event_time: event_time || '',
        location
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to create event:', error)
      return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: (user as any).id,
        action: 'create',
        table_name: 'events',
        record_id: data.id,
        details: { title }
      })
      .then(() => {})
      .catch(() => {})

    return NextResponse.json({ event: data })
  } catch (error) {
    console.error('Event create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
