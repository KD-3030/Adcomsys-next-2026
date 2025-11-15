import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface PasswordResetEmailProps {
  name: string
  resetUrl: string
}

export const PasswordResetEmail = ({ name, resetUrl }: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your AdComSys 2026 password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>🔐 Password Reset Request</Heading>
        </Section>
        
        <Section style={content}>
          <Text style={paragraph}>Dear {name},</Text>
          
          <Text style={paragraph}>
            We received a request to reset your password for your AdComSys 2026 account.
          </Text>
          
          <Text style={paragraph}>
            Click the button below to reset your password. This link will expire in <strong>1 hour</strong>.
          </Text>
          
          <Section style={buttonContainer}>
            <Button style={button} href={resetUrl}>
              Reset Password
            </Button>
          </Section>
          
          <Text style={paragraph}>
            Or copy and paste this link into your browser:
          </Text>
          <Text style={codeBlock}>
            {resetUrl}
          </Text>
          
          <Hr style={hr} />
          
          <Text style={warningText}>
            ⚠️ <strong>Security Notice:</strong>
          </Text>
          <ul style={list}>
            <li>If you didn't request this password reset, please ignore this email</li>
            <li>Never share this link with anyone</li>
            <li>The link expires in 1 hour for security</li>
            <li>If you need help, contact us at{' '}
              <Link href="mailto:adcomsys@uem.edu.in" style={link}>
                adcomsys@uem.edu.in
              </Link>
            </li>
          </ul>
          
          <Text style={paragraph}>
            Best regards,
            <br />
            <strong>AdComSys 2026 Security Team</strong>
          </Text>
        </Section>
        
        <Section style={footer}>
          <Text style={footerText}>
            © 2026 AdComSys. University of Engineering & Management, Kolkata, India.
          </Text>
          <Text style={footerText}>
            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}`} style={footerLink}>
              Conference Website
            </Link>
            {' • '}
            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/contact`} style={footerLink}>
              Contact Us
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default PasswordResetEmail

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const header = {
  backgroundColor: '#14213d',
  padding: '32px 24px',
  textAlign: 'center' as const,
}

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
}

const content = {
  padding: '24px 48px',
}

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
}

const list = {
  color: '#525f7f',
  fontSize: '14px',
  lineHeight: '22px',
  paddingLeft: '20px',
  marginTop: '8px',
}

const buttonContainer = {
  padding: '24px 0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#fca311',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const link = {
  color: '#fca311',
  textDecoration: 'underline',
}

const codeBlock = {
  backgroundColor: '#f4f4f4',
  borderRadius: '4px',
  color: '#333',
  fontSize: '12px',
  padding: '12px',
  wordBreak: 'break-all' as const,
  fontFamily: 'monospace',
}

const warningText = {
  color: '#d93025',
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '8px',
}

const footer = {
  padding: '0 48px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '4px 0',
}

const footerLink = {
  color: '#8898aa',
  textDecoration: 'underline',
}
