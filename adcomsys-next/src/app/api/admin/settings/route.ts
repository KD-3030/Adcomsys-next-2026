import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await verifyJWT(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Fetch all settings from the database
    const { data: settingsArray, error } = await supabaseAdmin
      .from('settings')
      .select('*')

    if (error) {
      console.error('Failed to fetch settings:', error)
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }

    // Convert array of key-value pairs to an object
    const settings: Record<string, string> = {}
    if (settingsArray) {
      settingsArray.forEach((setting: any) => {
        settings[setting.key] = setting.value
      })
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await verifyJWT(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()

    // Update or insert each setting
    const updates = []
    for (const [key, value] of Object.entries(body)) {
      updates.push(
        supabaseAdmin
          .from('settings')
          .upsert(
            { key, value: value as string },
            { onConflict: 'key' }
          )
      )
    }

    await Promise.all(updates)

    // Log admin action
    await supabaseAdmin
      .from('admin_logs')
      .insert({
        admin_id: (user as any).id,
        action: 'update',
        table_name: 'settings',
        record_id: 'global',
        details: { updated_keys: Object.keys(body) }
      })
      .then(() => {})
      .catch(() => {})

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
