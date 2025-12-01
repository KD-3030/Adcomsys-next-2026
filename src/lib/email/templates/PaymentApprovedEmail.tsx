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

interface PaymentApprovedEmailProps {
  name: string
  transactionId: string
}

export const PaymentApprovedEmail = ({ name, transactionId }: PaymentApprovedEmailProps) => (
  <Html>
    <Head />
    <Preview>Payment Approved - AdComSys 2026</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Payment Approved!</Heading>
        </Section>
        
        <Section style={content}>
          <Text style={paragraph}>Dear {name},</Text>
          
          <Text style={paragraph}>
            Great news! Your payment has been <strong style={successText}>successfully verified and approved</strong>.
          </Text>
          
          <Section style={infoBox}>
            <Text style={infoLabel}>Transaction ID:</Text>
            <Text style={infoValue}>{transactionId}</Text>
          </Section>
          
          <Text style={paragraph}>
            <strong>What's Next?</strong>
          </Text>
          <ul style={list}>
            <li>You can now submit your research papers</li>
            <li>Your registration is confirmed for AdComSys 2026</li>
            <li>You'll receive a confirmation certificate via email</li>
            <li>Check the conference schedule for important dates</li>
          </ul>
          
          <Section style={buttonContainer}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_SITE_URL}/authors`}>
              Submit Your Paper
            </Button>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={paragraph}>
            If you have any questions, feel free to contact us at{' '}
            <Link href="mailto:adcomsys@uem.edu.in" style={link}>
              adcomsys@uem.edu.in
            </Link>
          </Text>
          
          <Text style={paragraph}>
            We look forward to your participation!
            <br />
            <strong>AdComSys 2026 Organizing Committee</strong>
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

export default PaymentApprovedEmail

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

const successText = {
  color: '#0f9d58',
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
  padding: '16px',
  margin: '24px 0',
}

const infoLabel = {
  color: '#0369a1',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
}

const infoValue = {
  color: '#14213d',
  fontSize: '18px',
  fontWeight: 'bold',
  fontFamily: 'monospace',
  margin: '0',
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
