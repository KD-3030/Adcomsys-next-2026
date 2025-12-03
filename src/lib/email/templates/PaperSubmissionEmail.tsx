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

interface PaperSubmissionEmailProps {
  name: string
  paperTitle: string
  submissionId: string
}

export const PaperSubmissionEmail = ({ 
  name, 
  paperTitle, 
  submissionId 
}: PaperSubmissionEmailProps) => (
  <Html>
    <Head />
    <Preview>Paper Submission Received - AdComSys 2026</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Paper Submission Received</Heading>
        </Section>
        
        <Section style={content}>
          <Text style={paragraph}>Dear {name},</Text>
          
          <Text style={paragraph}>
            Thank you for submitting your paper to <strong>AdComSys 2026</strong>!
          </Text>
          
          <Section style={infoBox}>
            <Text style={infoLabel}>Paper Title:</Text>
            <Text style={paperTitleStyle}>{paperTitle}</Text>
            
            <Text style={{ ...infoLabel, marginTop: '16px' }}>Submission ID:</Text>
            <Text style={infoValue}>{submissionId}</Text>
          </Section>
          
          <Text style={paragraph}>
            <strong>What Happens Next?</strong>
          </Text>
          <ul style={list}>
            <li>Your paper will undergo a peer-review process</li>
            <li>Reviewers will evaluate your work for quality and relevance</li>
            <li>You'll receive a notification about the review status</li>
            <li>The review process typically takes 4-6 weeks</li>
          </ul>
          
          <Text style={paragraph}>
            <strong>Keep This Information:</strong>
          </Text>
          <ul style={list}>
            <li>Save your Submission ID: <strong>{submissionId}</strong></li>
            <li>Use it to track your submission status</li>
            <li>Quote it in any correspondence with us</li>
          </ul>
          
          <Section style={buttonContainer}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_SITE_URL}/authors/submissions`}>
              Track Submission Status
            </Button>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={paragraph}>
            <strong>Alternative Submission Platform:</strong>
          </Text>
          <Text style={paragraph}>
            You can also track your submission on CMT (Microsoft Conference Management Toolkit):
          </Text>
          <Text style={paragraph}>
            <Link href={process.env.NEXT_PUBLIC_CMT_URL || '#'} style={link}>
              {process.env.NEXT_PUBLIC_CMT_URL || 'CMT Portal'}
            </Link>
          </Text>
          
          <Hr style={hr} />
          
          <Text style={paragraph}>
            For any queries regarding your submission, please contact us at{' '}
            <Link href="mailto:adcomsys@iem.edu.in" style={link}>
              adcomsys@iem.edu.in
            </Link>
          </Text>
          
          <Text style={paragraph}>
            Thank you for your contribution!
            <br />
            <strong>AdComSys 2026 Program Committee</strong>
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

export default PaperSubmissionEmail

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
  fontSize: '16px',
  lineHeight: '24px',
  paddingLeft: '20px',
}

const infoBox = {
  backgroundColor: '#f0f9ff',
  border: '2px solid #0ea5e9',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const infoLabel = {
  color: '#0369a1',
  fontSize: '13px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 4px 0',
}

const paperTitleStyle = {
  color: '#14213d',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
  lineHeight: '26px',
}

const infoValue = {
  color: '#14213d',
  fontSize: '16px',
  fontWeight: 'bold',
  fontFamily: 'monospace',
  margin: '0',
}

const buttonContainer = {
  padding: '24px 0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#FFCC5C',
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
  color: '#FFCC5C',
  textDecoration: 'underline',
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
