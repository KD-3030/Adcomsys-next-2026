import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to AdComSys 2026 - International Conference</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Welcome to AdComSys 2026!</Heading>
        </Section>
        
        <Section style={content}>
          <Text style={paragraph}>Dear {name},</Text>
          
          <Text style={paragraph}>
            Thank you for registering for the <strong>International Conference on Advances in 
            Computing and Data Sciences (AdComSys 2026)</strong>!
          </Text>
          
          <Text style={paragraph}>
            Your account has been successfully created. You can now:
          </Text>
          
          <ul style={list}>
            <li>Submit your research papers</li>
            <li>Upload payment proofs</li>
            <li>Track your submission status</li>
            <li>Update your profile information</li>
          </ul>
          
          <Section style={buttonContainer}>
            <Button style={button} href={`${process.env.NEXT_PUBLIC_SITE_URL}/authors`}>
              Go to Dashboard
            </Button>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={paragraph}>
            <strong>Important Dates:</strong>
          </Text>
          <ul style={list}>
            <li>Paper Submission Deadline: Check conference website</li>
            <li>Notification Date: Check conference website</li>
            <li>Camera-Ready Deadline: Check conference website</li>
          </ul>
          
          <Text style={paragraph}>
            For any queries, please contact us at{' '}
            <Link href="mailto:adcomsys@uem.edu.in" style={link}>
              adcomsys@uem.edu.in
            </Link>
          </Text>
          
          <Text style={paragraph}>
            Best regards,
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

export default WelcomeEmail

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
