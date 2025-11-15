import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from '@react-email/components'

interface ContactNotificationEmailProps {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export const ContactNotificationEmail = ({
  name,
  email,
  phone,
  subject,
  message,
}: ContactNotificationEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Contact Form Submission</Heading>
        
        <Section style={section}>
          <Text style={label}>From:</Text>
          <Text style={value}>{name}</Text>
        </Section>
        
        <Section style={section}>
          <Text style={label}>Email:</Text>
          <Text style={value}>{email}</Text>
        </Section>
        
        {phone && (
          <Section style={section}>
            <Text style={label}>Phone:</Text>
            <Text style={value}>{phone}</Text>
          </Section>
        )}
        
        <Section style={section}>
          <Text style={label}>Subject:</Text>
          <Text style={value}>{subject}</Text>
        </Section>
        
        <Hr style={hr} />
        
        <Section>
          <Text style={label}>Message:</Text>
          <Text style={messageText}>{message}</Text>
        </Section>
        
        <Hr style={hr} />
        
        <Text style={footer}>
          This message was submitted via the AdComSys 2026 contact form
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ContactNotificationEmail

// Styles
const main = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f6f9fc',
  padding: '20px',
}

const container = {
  backgroundColor: '#ffffff',
  padding: '24px',
  maxWidth: '600px',
  margin: '0 auto',
  borderRadius: '8px',
}

const h1 = {
  color: '#14213d',
  fontSize: '24px',
  marginBottom: '20px',
  marginTop: '0',
}

const section = {
  marginBottom: '16px',
}

const label = {
  fontWeight: 'bold' as const,
  color: '#14213d',
  marginBottom: '4px',
  margin: '0 0 4px 0',
  fontSize: '14px',
}

const value = {
  color: '#525f7f',
  margin: '0',
  fontSize: '16px',
}

const messageText = {
  color: '#525f7f',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
  margin: '8px 0 0 0',
  fontSize: '16px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '20px',
}
