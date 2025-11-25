import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const profile = await db.getUserById(user.userId)
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const paper = await db.getPaperById(id)

    if (!paper) {
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 })
    }

    return NextResponse.json({ paper }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch paper:', error)
    return NextResponse.json(
      { error: 'Failed to fetch paper' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const profile = await db.getUserById(user.userId)
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const {
      title,
      abstract,
      subject_area,
      authors,
      status,
      reviewer_id,
      review_comments,
      review_status,
      approved_by,
      approval_notes
    } = body

    // Update paper
    const paper = await db.updatePaper(id, {
      title,
      abstract,
      subject_area,
      authors,
      status,
      reviewer_id,
      review_comments,
      review_status,
      approved_by,
      approval_notes,
      approved_at: approved_by ? new Date().toISOString() : undefined
    })

    return NextResponse.json(
      { message: 'Paper updated successfully', paper },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to update paper:', error)
    return NextResponse.json(
      { error: 'Failed to update paper' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const profile = await db.getUserById(user.userId)
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    await db.deletePaper(id)

    return NextResponse.json(
      { message: 'Paper deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to delete paper:', error)
    return NextResponse.json(
      { error: 'Failed to delete paper' },
      { status: 500 }
    )
  }
}
