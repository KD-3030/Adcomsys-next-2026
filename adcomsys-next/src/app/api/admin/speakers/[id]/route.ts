import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

// GET single speaker
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

    const { data: speaker, error } = await supabaseAdmin
      .from('speakers')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Speaker not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ speaker })
  } catch (error) {
    console.error('Failed to fetch speaker:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// PUT - Update speaker
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
    const { name, designation, affiliation, bio, image_url, topic, session_date, display_order, is_active } = body

    // Update speaker
    const { data: updatedSpeaker, error } = await supabaseAdmin
      .from('speakers')
      .update({
        name,
        designation,
        affiliation,
        bio,
        image_url,
        topic,
        session_date,
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
        { error: 'Failed to update speaker' },
        { status: 500 }
      )
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: (user as any).id,
        action: 'updated_speaker',
        entity_type: 'speaker',
        entity_id: params.id,
        details: {
          message: `Updated speaker ${name}`,
          changes: body
        }
      })

    return NextResponse.json({ 
      message: 'Speaker updated successfully',
      speaker: updatedSpeaker 
    })
  } catch (error) {
    console.error('Failed to update speaker:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// DELETE speaker
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

    // Get speaker info before deletion
    const { data: speakerData } = await supabaseAdmin
      .from('speakers')
      .select('name, affiliation')
      .eq('id', params.id)
      .single()

    // Delete speaker
    const { error } = await supabaseAdmin
      .from('speakers')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete speaker' },
        { status: 500 }
      )
    }

    // Log admin action
    if (speakerData) {
      await supabaseAdmin
        .from('admin_logs')
        .insert({
          admin_id: (user as any).id,
          action: 'deleted_speaker',
          entity_type: 'speaker',
          entity_id: params.id,
          details: {
            message: `Deleted speaker ${(speakerData as any).name}`,
            affiliation: (speakerData as any).affiliation
          }
        })
    }

    return NextResponse.json({ 
      message: 'Speaker deleted successfully' 
    })
  } catch (error) {
    console.error('Failed to delete speaker:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
