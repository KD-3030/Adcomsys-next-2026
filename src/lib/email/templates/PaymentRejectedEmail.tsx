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

interface PaymentRejectedEmailProps {
  name: string
  reason: string
}

export const PaymentRejectedEmail = ({ name, reason }: PaymentRejectedEmailProps) => (
  <Html>
    <Head />
    <Preview>Payment Verification Required - AdComSys 2026</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>⚠️ Payment Verification Required</Heading>
        </Section>
        
        <Section style={content}>
          <Text style={paragraph}>Dear {name},</Text>
          
          <Text style={paragraph}>
            We've reviewed your payment submission, but unfortunately we need some clarification
            before we can approve it.
          </Text>
          
          <Section style={warningBox}>
            <Text style={warningLabel}>Reason for Review:</Text>
            <Text style={warningValue}>{reason}</Text>
          </Section>
          
          <Text style={paragraph}>
            <strong>What You Need to Do:</strong>
          </Text>
          <ul style={list}>
            <li>Review the payment screenshot/details you submitted</li>
            <li>Ensure the transaction ID is clearly visible</li>
            <li>Verify the amount matches the registration fee</li>
            <li>Upload a new, clearer screenshot if needed</li>
            <li>Contact us if you need assistance</li>
          </ul>
          
          <Section style={buttonContainer}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_SITE_URL}/authors/payments`}>
              Resubmit Payment Proof
            </Button>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={paragraph}>
            <strong>Need Help?</strong>
          </Text>
          <Text style={paragraph}>
            If you have any questions or need clarification, please contact us at{' '}
            <Link href="mailto:adcomsys@uem.edu.in" style={link}>
              adcomsys@uem.edu.in
            </Link>
            {' '}with your transaction details. We're here to help!
          </Text>
          
          <Text style={paragraph}>
            Best regards,
            <br />
            <strong>AdComSys 2026 Payment Verification Team</strong>
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

export default PaymentRejectedEmail

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

const warningBox = {
  backgroundColor: '#fff3cd',
  border: '2px solid #ff9800',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
}

const warningLabel = {
  color: '#d97706',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
}

const warningValue = {
  color: '#14213d',
  fontSize: '16px',
  margin: '0',
  lineHeight: '22px',
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
