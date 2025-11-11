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
    const { name, title, affiliation, bio, photo_url, talk_title, talk_abstract } = body

    // Validate required fields
    if (!name || !affiliation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('speakers')
      .update({
        name,
        title: title || '',
        affiliation,
        bio: bio || '',
        photo_url: photo_url || null,
        talk_title: talk_title || null,
        talk_abstract: talk_abstract || null
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Failed to update speaker:', error)
      return NextResponse.json({ error: 'Failed to update speaker' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: (user as any).id,
        action: 'update',
        table_name: 'speakers',
        record_id: params.id,
        details: { name }
      })
      .then(() => {})
      .catch(() => {})

    return NextResponse.json({ speaker: data })
  } catch (error) {
    console.error('Speaker update error:', error)
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
      .from('speakers')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Failed to delete speaker:', error)
      return NextResponse.json({ error: 'Failed to delete speaker' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: (user as any).id,
        action: 'delete',
        table_name: 'speakers',
        record_id: params.id
      })
      .then(() => {})
      .catch(() => {})

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Speaker delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
