import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

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
    const { full_name, email, role, cmt_profile_url, institution, designation, country, phone } = body

    // Validate required fields
    if (!full_name || !email || !role) {
      return NextResponse.json(
        { error: 'Name, email, and role are required' },
        { status: 400 }
      )
    }

    // Update user
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        full_name,
        email,
        role,
        cmt_profile_url: cmt_profile_url || null,
        institution,
        designation,
        country,
        phone,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      )
    }

    // Log admin action
    await supabaseAdmin.from('admin_logs').insert({
      admin_id: user.id as string,
      action: 'updated_user',
      entity_type: 'profile',
      entity_id: params.id,
      details: {
        message: `Updated user ${full_name}`,
        changes: body
      }
    })

    return NextResponse.json({ 
      message: 'User updated successfully',
      user: data?.[0] 
    })
  } catch (error) {
    console.error('Failed to update user:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

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

    // Prevent self-deletion
    if (user.id === params.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    // Get user info before deletion
    const { data: userData } = await supabaseAdmin
      .from('profiles')
      .select('full_name, email')
      .eq('id', params.id)
      .single()

    // Delete user
    const { error } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete user' },
        { status: 500 }
      )
    }

    // Log admin action
    if (userData) {
      await supabaseAdmin.from('admin_logs').insert({
        admin_id: user.id as string,
        action: 'deleted_user',
        entity_type: 'profile',
        entity_id: params.id,
        details: {
          message: `Deleted user ${userData.full_name}`,
          email: userData.email
        }
      })
    }

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Failed to delete user:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
