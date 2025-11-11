import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      .update({
        title,
        description: description || '',
        event_date,
        event_time: event_time || '',
        location
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Failed to update event:', error)
      return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: (user as any).id,
        action: 'update',
        table_name: 'events',
        record_id: params.id,
        details: { title }
      })
      .then(() => {})
      .catch(() => {})

    return NextResponse.json({ event: data })
  } catch (error) {
    console.error('Event update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyJWT(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { error } = await supabaseAdmin
      .from('events')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Failed to delete event:', error)
      return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: (user as any).id,
        action: 'delete',
        table_name: 'events',
        record_id: params.id
      })
      .then(() => {})
      .catch(() => {})

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Event delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
