import { Resend } from 'resend'
import { WelcomeEmail } from './templates/WelcomeEmail'
import { PasswordResetEmail } from './templates/PasswordResetEmail'
import { PaymentApprovedEmail } from './templates/PaymentApprovedEmail'
import { PaymentRejectedEmail } from './templates/PaymentRejectedEmail'
import { PaperSubmissionEmail } from './templates/PaperSubmissionEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

// Resend test mode: Can only send to verified email
// In production: Update FROM_EMAIL to use your verified domain (e.g., noreply@adcomsys2026.uem.edu.in)
const FROM_EMAIL = 'AdComSys 2026 <onboarding@resend.dev>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'adcomsys@uem.edu.in'
const REPLY_TO = ADMIN_EMAIL

// In test mode, Resend only allows sending to the verified email address
// For testing, we'll send all emails to the admin email
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development' || !process.env.RESEND_API_KEY?.startsWith('re_')
const TEST_RECIPIENT = ADMIN_EMAIL // In test mode, all emails go here

export interface SendEmailOptions {
  to: string
  subject: string
  react: React.ReactElement
  replyTo?: string
}

export async function sendEmail({ to, subject, react, replyTo }: SendEmailOptions) {
  try {
    // In test mode, override recipient with admin email and add original recipient to subject
    const actualRecipient = IS_DEVELOPMENT ? TEST_RECIPIENT : to
    const actualSubject = IS_DEVELOPMENT && to !== TEST_RECIPIENT 
      ? `[TEST - For: ${to}] ${subject}` 
      : subject

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: actualRecipient,
      subject: actualSubject,
      react,
      replyTo: replyTo || REPLY_TO,
    })

    if (error) {
      console.error('Failed to send email:', error)
      return { success: false, error }
    }

    console.log(`Email sent successfully to ${actualRecipient}${IS_DEVELOPMENT ? ` (original: ${to})` : ''}`)
    return { success: true, data }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to AdComSys 2026!',
    react: WelcomeEmail({ name }),
  })
}

export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetToken: string
) {
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`
  
  return sendEmail({
    to: email,
    subject: 'Reset Your Password - AdComSys 2026',
    react: PasswordResetEmail({ name, resetUrl }),
  })
}

export async function sendPaymentApprovedEmail(
  email: string,
  name: string,
  transactionId: string
) {
  return sendEmail({
    to: email,
    subject: 'Payment Approved - AdComSys 2026',
    react: PaymentApprovedEmail({ name, transactionId }),
  })
}

export async function sendPaymentRejectedEmail(
  email: string,
  name: string,
  reason: string
) {
  return sendEmail({
    to: email,
    subject: 'Payment Verification Required - AdComSys 2026',
    react: PaymentRejectedEmail({ name, reason }),
  })
}

export async function sendPaperSubmissionEmail(
  email: string,
  name: string,
  paperTitle: string,
  submissionId: string
) {
  return sendEmail({
    to: email,
    subject: 'Paper Submission Received - AdComSys 2026',
    react: PaperSubmissionEmail({ name, paperTitle, submissionId }),
  })
}
