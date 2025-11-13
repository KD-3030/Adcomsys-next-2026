// Auto-generated database types
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          password_hash: string | null
          institution: string | null
          designation: string | null
          country: string | null
          phone: string | null
          bio: string | null
          avatar_url: string | null
          role: 'guest' | 'author' | 'reviewer' | 'admin'
          is_active: boolean
          cmt_profile_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          password_hash?: string | null
          institution?: string | null
          designation?: string | null
          country?: string | null
          phone?: string | null
          bio?: string | null
          avatar_url?: string | null
          role?: 'guest' | 'author' | 'reviewer' | 'admin'
          is_active?: boolean
          cmt_profile_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          institution?: string | null
          designation?: string | null
          country?: string | null
          phone?: string | null
          bio?: string | null
          avatar_url?: string | null
          role?: 'guest' | 'author' | 'reviewer' | 'admin'
          is_active?: boolean
          cmt_profile_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      paper_submissions: {
        Row: {
          id: string
          user_id: string
          cmt_paper_id: string
          title: string
          status: 'submitted' | 'under_review' | 'accepted' | 'rejected'
          submission_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cmt_paper_id: string
          title: string
          status?: 'submitted' | 'under_review' | 'accepted' | 'rejected'
          submission_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cmt_paper_id?: string
          title?: string
          status?: 'submitted' | 'under_review' | 'accepted' | 'rejected'
          submission_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      payment_verifications: {
        Row: {
          id: string
          user_id: string
          paper_id: string | null
          amount: number
          currency: string
          category: 'student' | 'academician' | 'industry' | 'attendee'
          screenshot_url: string
          status: 'pending' | 'verified' | 'rejected'
          verified_by: string | null
          verified_at: string | null
          verification_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          paper_id?: string | null
          amount: number
          currency?: string
          category: 'student' | 'academician' | 'industry' | 'attendee'
          screenshot_url: string
          status?: 'pending' | 'verified' | 'rejected'
          verified_by?: string | null
          verified_at?: string | null
          verification_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          paper_id?: string | null
          amount?: number
          currency?: string
          category?: 'student' | 'academician' | 'industry' | 'attendee'
          screenshot_url?: string
          status?: 'pending' | 'verified' | 'rejected'
          verified_by?: string | null
          verified_at?: string | null
          verification_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // Add more table types as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'guest' | 'author' | 'reviewer' | 'admin'
      paper_status: 'submitted' | 'under_review' | 'accepted' | 'rejected'
      payment_status: 'pending' | 'verified' | 'rejected'
      payment_category: 'student' | 'academician' | 'industry' | 'attendee'
    }
  }
}
