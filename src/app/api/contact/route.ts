import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db'
import { sendEmail } from '@/lib/email'
import { ContactNotificationEmail } from '@/lib/email/templates/ContactNotificationEmail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Validate name length
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Validate subject length
    if (subject.trim().length < 5) {
      return NextResponse.json(
        { error: 'Subject must be at least 5 characters long' },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      )
    }

    // Insert into database with cleaned data
    // @ts-expect-error Supabase type inference issue
    const { data, error } = await supabaseAdmin.from('contact_submissions').insert([
      {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        subject: subject.trim(),
        message: message.trim(),
        status: 'new'
      }
    ]).select().single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to submit your message. Please try again.' },
        { status: 500 }
      )
    }

    // Send notification email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'adcomsys@iem.edu.in'
    
    sendEmail({
      to: adminEmail,
      subject: `New Contact Form Submission: ${subject}`,
      react: ContactNotificationEmail({ name, email, phone, subject, message }),
      replyTo: email,
    }).catch((error) => {
      console.error('Failed to send admin notification:', error)
      // Don't fail the request if email fails
    })

    return NextResponse.json(
      { 
        success: true,
        message: 'Message sent successfully! We will get back to you soon.',
        data 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
