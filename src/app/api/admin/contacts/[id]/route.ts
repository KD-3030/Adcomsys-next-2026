import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { supabaseAdmin } from '@/lib/db'

// GET single contact by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params

    const { data: contact, error } = await supabaseAdmin
      .from('contact_submissions')
      .select(`
        *,
        replied_by_user:profiles!contact_submissions_replied_by_fkey (
          id,
          full_name,
          email
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ contact })
  } catch (error) {
    console.error('Failed to fetch contact:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// PUT - Update contact status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be new, read, replied, or archived' },
        { status: 400 }
      )
    }

    // Update contact
    const updateData: any = {
      status,
    }

    // If marking as replied, set replied_by and replied_at
    if (status === 'replied') {
      updateData.replied_by = (user as any).id
      updateData.replied_at = new Date().toISOString()
    }

    // @ts-expect-error Supabase type inference issue
    const { data: updatedContact, error } = await supabaseAdmin.from('contact_submissions').update(updateData).eq('id', id).select().single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update contact' },
        { status: 500 }
      )
    }

    // Log admin action
    // @ts-expect-error Supabase type inference issue
    await supabaseAdmin.from('admin_logs').insert({
      admin_id: (user as any).id,
      action: 'updated_contact',
      entity_type: 'contact_submission',
      entity_id: id,
      details: {
        message: `Updated contact status to ${status}`,
        subject: (updatedContact as any).subject,
        from: (updatedContact as any).email
      }
    })

    return NextResponse.json({ 
      message: 'Contact updated successfully',
      contact: updatedContact 
    })
  } catch (error) {
    console.error('Failed to update contact:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// DELETE contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params

    // Get contact info before deletion
    const { data: contactData } = await supabaseAdmin
      .from('contact_submissions')
      .select('name, email, subject')
      .eq('id', id)
      .single()

    // Delete contact
    const { error } = await supabaseAdmin
      .from('contact_submissions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete contact' },
        { status: 500 }
      )
    }

    // Log admin action
    if (contactData) {
      // @ts-expect-error Supabase type inference issue
      await supabaseAdmin.from('admin_logs').insert({
        admin_id: (user as any).id,
        action: 'deleted_contact',
        entity_type: 'contact_submission',
        entity_id: id,
        details: {
          message: `Deleted contact from ${(contactData as any).name}`,
          email: (contactData as any).email,
          subject: (contactData as any).subject
        }
      })
    }

    return NextResponse.json({ 
      message: 'Contact deleted successfully' 
    })
  } catch (error) {
    console.error('Failed to delete contact:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
