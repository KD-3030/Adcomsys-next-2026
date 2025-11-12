import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

// GET single event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin access
    const user = await getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      )
    }

    const { data: event, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ event })
  } catch (error) {
    console.error('Failed to fetch event:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// PUT - Update event
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Update event
    const { data: updatedEvent, error } = await supabaseAdmin
      .from('events')
      .update({
        title,
        description,
        event_date,
        event_time,
        venue,
        image_url,
        registration_url,
        display_order,
        is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update event' },
        { status: 500 }
      )
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: (user as any).id,
        action: 'updated_event',
        entity_type: 'event',
        entity_id: params.id,
        details: {
          message: `Updated event ${title}`,
          changes: body
        }
      })

    return NextResponse.json({ 
      message: 'Event updated successfully',
      event: updatedEvent 
    })
  } catch (error) {
    console.error('Failed to update event:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// DELETE event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin access
    const user = await getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      )
    }

    // Get event info before deletion
    const { data: eventData } = await supabaseAdmin
      .from('events')
      .select('title, venue')
      .eq('id', params.id)
      .single()

    // Delete event
    const { error } = await supabaseAdmin
      .from('events')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete event' },
        { status: 500 }
      )
    }

    // Log admin action
    if (eventData) {
      await supabaseAdmin
        .from('admin_logs')
        .insert({
          admin_id: (user as any).id,
          action: 'deleted_event',
          entity_type: 'event',
          entity_id: params.id,
          details: {
            message: `Deleted event ${(eventData as any).title}`,
            venue: (eventData as any).venue
          }
        })
    }

    return NextResponse.json({ 
      message: 'Event deleted successfully' 
    })
  } catch (error) {
    console.error('Failed to delete event:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
