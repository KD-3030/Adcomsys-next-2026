import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
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

    // Get all papers with user and reviewer info
    const papers = await db.getAllPapers()

    return NextResponse.json({ papers }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch papers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch papers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const {
      user_id,
      cmt_paper_id,
      title,
      abstract,
      subject_area,
      authors,
      status
    } = body

    // Validate required fields
    if (!user_id || !cmt_paper_id || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create paper
    const paper = await db.createPaper({
      user_id,
      cmt_paper_id,
      title,
      abstract,
      subject_area,
      authors,
      status: status || 'submitted'
    })

    return NextResponse.json(
      { message: 'Paper created successfully', paper },
      { status: 201 }
    )
  } catch (error) {
    console.error('Failed to create paper:', error)
    return NextResponse.json(
      { error: 'Failed to create paper' },
      { status: 500 }
    )
  }
}
