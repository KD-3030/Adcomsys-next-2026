import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'
import type { Database } from '@/types/database.types'

type CommitteeMemberUpdate = Database['public']['Tables']['committee_members']['Update']

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()
    const { name, designation, affiliation, email, committee_type, image_url, display_order, is_active } = body

    // Validate required fields
    if (!name || !affiliation || !email || !committee_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate committee_type
    if (!['organizing', 'technical', 'advisory'].includes(committee_type)) {
      return NextResponse.json({ error: 'Invalid committee_type' }, { status: 400 })
    }

    const updateData: CommitteeMemberUpdate = {
      name,
      designation: designation || '',
      affiliation,
      email,
      committee_type: committee_type as 'organizing' | 'technical' | 'advisory',
      image_url: image_url || null,
      display_order: display_order || 0,
      is_active: is_active !== undefined ? is_active : true
    }

    const { data, error } = await supabaseAdmin
      .from('committee_members')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Failed to update committee member:', error)
      return NextResponse.json({ error: 'Failed to update member' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: user.userId,
        action: 'update',
        entity_type: 'committee_members',
        entity_id: id,
        details: { name, committee_type }
      })

    return NextResponse.json({ member: data })
  } catch (error) {
    console.error('Committee update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { error } = await supabaseAdmin
      .from('committee_members')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Failed to delete committee member:', error)
      return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: user.userId,
        action: 'delete',
        entity_type: 'committee_members',
        entity_id: id
      })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Committee delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
