import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side only client with service role key for direct database access
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: {
      schema: 'public',
    },
  }
)

// Helper functions for database operations
export const db = {
  // Users
  async getUserByEmail(email: string): Promise<Profile | null> {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error) return null
    return data
  },

  async getUserById(id: string): Promise<Profile | null> {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  },

  async createUser(userData: {
    id: string
    email: string
    password_hash: string
    full_name?: string
    role: string
  }): Promise<Profile | null> {
    // @ts-expect-error Supabase type inference issue
    const { data, error } = await supabaseAdmin.from('profiles').insert([userData]).select().single()
    
    if (error) return null
    return data
  },

  async updateUser(id: string, updates: Partial<{
    email: string
    full_name: string
    institution: string
    designation: string
    country: string
    phone: string
    bio: string
    avatar_url: string
    cmt_profile_url: string
  }>): Promise<Profile | null> {
    // @ts-expect-error Supabase type inference issue
    const { data, error } = await supabaseAdmin.from('profiles').update(updates).eq('id', id).select().single()
    
    if (error) return null
    return data
  },

  async updateUserPassword(id: string, passwordHash: string): Promise<Profile | null> {
    // @ts-expect-error Supabase type inference issue
    const { data, error } = await supabaseAdmin.from('profiles').update({ password_hash: passwordHash }).eq('id', id).select().single()
    
    if (error) return null
    return data
  },

  // Paper submissions
  async getPapersByUserId(userId: string) {
    const { data, error } = await supabaseAdmin
      .from('paper_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Payment verifications
  async getPaymentsByUserId(userId: string) {
    const { data, error } = await supabaseAdmin
      .from('payment_verifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },
}
