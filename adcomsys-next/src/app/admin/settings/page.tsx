'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, Settings as SettingsIcon } from 'lucide-react'
import { toast } from 'sonner'

interface Settings {
  // Conference Information
  conference_name: string
  conference_acronym: string
  conference_year: string
  conference_theme: string
  conference_venue: string
  conference_city: string
  conference_country: string
  
  // Important Dates
  paper_submission_deadline: string
  notification_date: string
  camera_ready_deadline: string
  early_bird_deadline: string
  conference_start_date: string
  conference_end_date: string
  
  // Registration Fees
  student_fee: string
  academician_fee: string
  industry_fee: string
  attendee_fee: string
  early_bird_discount: string
  
  // Contact Information
  contact_email: string
  contact_phone: string
  support_email: string
  
  // Social Media
  facebook_url: string
  twitter_url: string
  linkedin_url: string
  
  // Email Templates
  welcome_email_subject: string
  welcome_email_body: string
  payment_approved_subject: string
  payment_approved_body: string
  payment_rejected_subject: string
  payment_rejected_body: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    conference_name: '',
    conference_acronym: '',
    conference_year: '',
    conference_theme: '',
    conference_venue: '',
    conference_city: '',
    conference_country: '',
    paper_submission_deadline: '',
    notification_date: '',
    camera_ready_deadline: '',
    early_bird_deadline: '',
    conference_start_date: '',
    conference_end_date: '',
    student_fee: '',
    academician_fee: '',
    industry_fee: '',
    attendee_fee: '',
    early_bird_discount: '',
    contact_email: '',
    contact_phone: '',
    support_email: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    welcome_email_subject: '',
    welcome_email_body: '',
    payment_approved_subject: '',
    payment_approved_body: '',
    payment_rejected_subject: '',
    payment_rejected_body: ''
  })
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        if (data.settings) {
          setSettings(prev => ({ ...prev, ...data.settings }))
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        toast.success('Settings saved successfully')
      } else {
        toast.error('Failed to save settings')
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
      toast.error('An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const updateSetting = (key: keyof Settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure conference details and system settings</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="dates">Important Dates</TabsTrigger>
          <TabsTrigger value="fees">Registration Fees</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="emails">Email Templates</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conference Information</CardTitle>
              <CardDescription>Basic information about the conference</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Conference Name</Label>
                  <Input
                    value={settings.conference_name}
                    onChange={(e) => updateSetting('conference_name', e.target.value)}
                    placeholder="Advanced Computing Systems"
                  />
                </div>
                <div>
                  <Label>Acronym</Label>
                  <Input
                    value={settings.conference_acronym}
                    onChange={(e) => updateSetting('conference_acronym', e.target.value)}
                    placeholder="ADCOMSYS"
                  />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input
                    value={settings.conference_year}
                    onChange={(e) => updateSetting('conference_year', e.target.value)}
                    placeholder="2026"
                  />
                </div>
                <div>
                  <Label>Venue</Label>
                  <Input
                    value={settings.conference_venue}
                    onChange={(e) => updateSetting('conference_venue', e.target.value)}
                    placeholder="Grand Convention Center"
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    value={settings.conference_city}
                    onChange={(e) => updateSetting('conference_city', e.target.value)}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    value={settings.conference_country}
                    onChange={(e) => updateSetting('conference_country', e.target.value)}
                    placeholder="USA"
                  />
                </div>
              </div>
              <div>
                <Label>Conference Theme</Label>
                <Textarea
                  value={settings.conference_theme}
                  onChange={(e) => updateSetting('conference_theme', e.target.value)}
                  placeholder="Innovation in Computing and Technology"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Social media profile links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Facebook URL</Label>
                <Input
                  value={settings.facebook_url}
                  onChange={(e) => updateSetting('facebook_url', e.target.value)}
                  placeholder="https://facebook.com/adcomsys"
                />
              </div>
              <div>
                <Label>Twitter URL</Label>
                <Input
                  value={settings.twitter_url}
                  onChange={(e) => updateSetting('twitter_url', e.target.value)}
                  placeholder="https://twitter.com/adcomsys"
                />
              </div>
              <div>
                <Label>LinkedIn URL</Label>
                <Input
                  value={settings.linkedin_url}
                  onChange={(e) => updateSetting('linkedin_url', e.target.value)}
                  placeholder="https://linkedin.com/company/adcomsys"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Important Dates Tab */}
        <TabsContent value="dates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Important Dates</CardTitle>
              <CardDescription>Key deadlines and conference dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Paper Submission Deadline</Label>
                  <Input
                    type="date"
                    value={settings.paper_submission_deadline}
                    onChange={(e) => updateSetting('paper_submission_deadline', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Notification Date</Label>
                  <Input
                    type="date"
                    value={settings.notification_date}
                    onChange={(e) => updateSetting('notification_date', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Camera Ready Deadline</Label>
                  <Input
                    type="date"
                    value={settings.camera_ready_deadline}
                    onChange={(e) => updateSetting('camera_ready_deadline', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Early Bird Registration Deadline</Label>
                  <Input
                    type="date"
                    value={settings.early_bird_deadline}
                    onChange={(e) => updateSetting('early_bird_deadline', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Conference Start Date</Label>
                  <Input
                    type="date"
                    value={settings.conference_start_date}
                    onChange={(e) => updateSetting('conference_start_date', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Conference End Date</Label>
                  <Input
                    type="date"
                    value={settings.conference_end_date}
                    onChange={(e) => updateSetting('conference_end_date', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Registration Fees Tab */}
        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration Fees</CardTitle>
              <CardDescription>Set registration fees for different participant types (in USD)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Student Fee</Label>
                  <Input
                    type="number"
                    value={settings.student_fee}
                    onChange={(e) => updateSetting('student_fee', e.target.value)}
                    placeholder="200"
                  />
                </div>
                <div>
                  <Label>Academician Fee</Label>
                  <Input
                    type="number"
                    value={settings.academician_fee}
                    onChange={(e) => updateSetting('academician_fee', e.target.value)}
                    placeholder="300"
                  />
                </div>
                <div>
                  <Label>Industry Professional Fee</Label>
                  <Input
                    type="number"
                    value={settings.industry_fee}
                    onChange={(e) => updateSetting('industry_fee', e.target.value)}
                    placeholder="400"
                  />
                </div>
                <div>
                  <Label>General Attendee Fee</Label>
                  <Input
                    type="number"
                    value={settings.attendee_fee}
                    onChange={(e) => updateSetting('attendee_fee', e.target.value)}
                    placeholder="250"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Early Bird Discount (%)</Label>
                  <Input
                    type="number"
                    value={settings.early_bird_discount}
                    onChange={(e) => updateSetting('early_bird_discount', e.target.value)}
                    placeholder="15"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Percentage discount for early bird registrations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Information Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Contact details for conference inquiries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Primary Contact Email</Label>
                <Input
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => updateSetting('contact_email', e.target.value)}
                  placeholder="info@adcomsys.com"
                />
              </div>
              <div>
                <Label>Support Email</Label>
                <Input
                  type="email"
                  value={settings.support_email}
                  onChange={(e) => updateSetting('support_email', e.target.value)}
                  placeholder="support@adcomsys.com"
                />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input
                  type="tel"
                  value={settings.contact_phone}
                  onChange={(e) => updateSetting('contact_phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates Tab */}
        <TabsContent value="emails" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Email</CardTitle>
              <CardDescription>Sent when a user successfully registers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Subject</Label>
                <Input
                  value={settings.welcome_email_subject}
                  onChange={(e) => updateSetting('welcome_email_subject', e.target.value)}
                  placeholder="Welcome to ADCOMSYS 2026!"
                />
              </div>
              <div>
                <Label>Email Body</Label>
                <Textarea
                  value={settings.welcome_email_body}
                  onChange={(e) => updateSetting('welcome_email_body', e.target.value)}
                  placeholder="Dear {name},&#10;&#10;Thank you for registering for ADCOMSYS 2026...&#10;&#10;Use {name}, {email}, {role} as placeholders"
                  rows={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available placeholders: {'{name}'}, {'{email}'}, {'{role}'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Approved Email</CardTitle>
              <CardDescription>Sent when payment is verified and approved</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Subject</Label>
                <Input
                  value={settings.payment_approved_subject}
                  onChange={(e) => updateSetting('payment_approved_subject', e.target.value)}
                  placeholder="Payment Approved - ADCOMSYS 2026"
                />
              </div>
              <div>
                <Label>Email Body</Label>
                <Textarea
                  value={settings.payment_approved_body}
                  onChange={(e) => updateSetting('payment_approved_body', e.target.value)}
                  placeholder="Dear {name},&#10;&#10;Your payment of ${amount} has been approved...&#10;&#10;Use {name}, {amount}, {transaction_id} as placeholders"
                  rows={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available placeholders: {'{name}'}, {'{amount}'}, {'{transaction_id}'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Rejected Email</CardTitle>
              <CardDescription>Sent when payment verification fails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Subject</Label>
                <Input
                  value={settings.payment_rejected_subject}
                  onChange={(e) => updateSetting('payment_rejected_subject', e.target.value)}
                  placeholder="Payment Verification Issue - ADCOMSYS 2026"
                />
              </div>
              <div>
                <Label>Email Body</Label>
                <Textarea
                  value={settings.payment_rejected_body}
                  onChange={(e) => updateSetting('payment_rejected_body', e.target.value)}
                  placeholder="Dear {name},&#10;&#10;We were unable to verify your payment...&#10;&#10;Use {name}, {reason} as placeholders"
                  rows={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available placeholders: {'{name}'}, {'{reason}'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  )
}
