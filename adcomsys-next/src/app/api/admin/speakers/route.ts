import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await verifyJWT(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { data: speakers, error } = await supabaseAdmin
      .from('speakers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch speakers:', error)
      return NextResponse.json({ error: 'Failed to fetch speakers' }, { status: 500 })
    }

    return NextResponse.json({ speakers })
  } catch (error) {
    console.error('Speaker fetch error:', error)
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
    const { name, title, affiliation, bio, photo_url, talk_title, talk_abstract } = body

    // Validate required fields
    if (!name || !affiliation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('speakers')
      .insert({
        name,
        title: title || '',
        affiliation,
        bio: bio || '',
        photo_url: photo_url || null,
        talk_title: talk_title || null,
        talk_abstract: talk_abstract || null
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to create speaker:', error)
      return NextResponse.json({ error: 'Failed to create speaker' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: (user as any).id,
        action: 'create',
        table_name: 'speakers',
        record_id: data.id,
        details: { name }
      })
      .then(() => {})
      .catch(() => {})

    return NextResponse.json({ speaker: data })
  } catch (error) {
    console.error('Speaker create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
