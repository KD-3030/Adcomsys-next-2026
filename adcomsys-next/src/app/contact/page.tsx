'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Mail, Phone, MapPin, Building2, Send, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-blue-600">AdComSys 2026</h1>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Get in Touch</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have questions? We&apos;re here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll respond within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Registration inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-6 w-6 text-blue-600" />
                  Conference Venue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">University of Engineering and Management</h3>
                  <p className="text-sm text-gray-600 flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-blue-600" />
                    <span>
                      University Area, Plot No. III, B/5, New Town, Action Area III,<br />
                      Kolkata, West Bengal 700160, India
                    </span>
                  </p>
                </div>

                <div className="border-t pt-4">
                  <Link 
                    href="https://maps.google.com/?q=University+of+Engineering+and+Management+Kolkata" 
                    target="_blank"
                  >
                    <Button variant="outline" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      View on Google Maps
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-6 w-6 text-green-600" />
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-2">General Inquiries</h4>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-blue-600" />
                    <a href="mailto:info@adcomsys2026.com" className="hover:underline">
                      info@adcomsys2026.com
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-2">Paper Submissions</h4>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-blue-600" />
                    <a href="mailto:papers@adcomsys2026.com" className="hover:underline">
                      papers@adcomsys2026.com
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-2">Registration Support</h4>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-blue-600" />
                    <a href="mailto:registration@adcomsys2026.com" className="hover:underline">
                      registration@adcomsys2026.com
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-2">Phone</h4>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-blue-600" />
                    <a href="tel:+919876543210" className="hover:underline">
                      +91 98765 43210
                    </a>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <Phone className="h-4 w-4 mr-2 text-blue-600" />
                    <a href="tel:+919876543211" className="hover:underline">
                      +91 98765 43211
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-600 text-white">
              <CardContent className="py-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Office Hours
                </h3>
                <div className="space-y-2 text-sm text-blue-100">
                  <p><strong className="text-white">Monday - Friday:</strong> 9:00 AM - 6:00 PM (IST)</p>
                  <p><strong className="text-white">Saturday:</strong> 10:00 AM - 4:00 PM (IST)</p>
                  <p><strong className="text-white">Sunday:</strong> Closed</p>
                  <p className="pt-2 text-xs">
                    * During conference days (May 5-7, 2026), support desk will be available 8:00 AM - 8:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Conference Organizing Team</CardTitle>
            <CardDescription>Reach out to our team members for specific inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-1">Dr. Amit Kumar</h3>
                <p className="text-sm text-gray-600 mb-2">General Chair</p>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Mail className="h-3 w-3 mr-2 text-blue-600" />
                    <a href="mailto:amit.kumar@uem.edu.in" className="hover:underline text-blue-600">
                      amit.kumar@uem.edu.in
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-3 w-3 mr-2 text-blue-600" />
                    <span>+91 98765 00001</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Dr. Priya Singh</h3>
                <p className="text-sm text-gray-600 mb-2">Technical Program Chair</p>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Mail className="h-3 w-3 mr-2 text-blue-600" />
                    <a href="mailto:priya.singh@uem.edu.in" className="hover:underline text-blue-600">
                      priya.singh@uem.edu.in
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-3 w-3 mr-2 text-blue-600" />
                    <span>+91 98765 00002</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Mr. Rahul Sharma</h3>
                <p className="text-sm text-gray-600 mb-2">Registration Chair</p>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Mail className="h-3 w-3 mr-2 text-blue-600" />
                    <a href="mailto:rahul.sharma@uem.edu.in" className="hover:underline text-blue-600">
                      rahul.sharma@uem.edu.in
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-3 w-3 mr-2 text-blue-600" />
                    <span>+91 98765 00003</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Link */}
        <div className="text-center py-8 mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Looking for Quick Answers?</h2>
          <p className="text-gray-600 mb-6">
            Check out our FAQ section for commonly asked questions
          </p>
          <Link href="/about">
            <Button size="lg" variant="outline">
              View FAQ
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <p className="mb-2">© 2025 AdComSys 2026. All rights reserved.</p>
          <p className="text-gray-400 text-sm">
            Organized by Department of CST & CSIT, University of Engineering and Management, Kolkata
          </p>
        </div>
      </footer>
    </div>
  )
}
