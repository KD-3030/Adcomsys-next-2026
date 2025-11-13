'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, Building2, Send, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Navbar />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="mb-4 bg-brand-orange text-brand-navy hover:bg-brand-orange/90">Get in Touch</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4">Contact Us</h1>
          <p className="text-base sm:text-lg text-gray-600">
            Have questions? We&apos;re here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Contact Form */}
          <Card className="shadow-xl border-2 border-brand-navy/20">
            <CardHeader className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white">
              <CardTitle className="text-xl">Send us a Message</CardTitle>
              <CardDescription className="text-gray-300">
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

                <Button 
                  type="submit" 
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-brand-navy font-semibold shadow-lg" 
                  disabled={isSubmitting}
                >
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
            <Card className="shadow-xl border-2 border-brand-navy/20">
              <CardHeader className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white">
                <CardTitle className="flex items-center text-xl">
                  <Building2 className="mr-2 h-6 w-6 text-brand-orange" />
                  Conference Venue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <h3 className="font-semibold mb-2">University of Engineering and Management</h3>
                  <p className="text-sm text-gray-600 flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-brand-orange" />
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
                    <Button variant="outline" className="w-full border-2 border-brand-orange text-brand-navy hover:bg-brand-orange hover:text-white">
                      <MapPin className="mr-2 h-4 w-4" />
                      View on Google Maps
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-2 border-brand-navy/20">
              <CardHeader className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white">
                <CardTitle className="flex items-center text-xl">
                  <Mail className="mr-2 h-6 w-6 text-brand-orange" />
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
                    <Mail className="h-4 w-4 mr-2 text-brand-orange" />
                    <a href="mailto:papers@adcomsys2026.com" className="hover:underline text-brand-orange">
                      papers@adcomsys2026.com
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-2">Registration Support</h4>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-brand-orange" />
                    <a href="mailto:registration@adcomsys2026.com" className="hover:underline text-brand-orange">
                      registration@adcomsys2026.com
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-2">Phone</h4>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-brand-orange" />
                    <a href="tel:+919876543210" className="hover:underline">
                      +91 98765 43210
                    </a>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <Phone className="h-4 w-4 mr-2 text-brand-orange" />
                    <a href="tel:+919876543211" className="hover:underline">
                      +91 98765 43211
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white shadow-xl border-4 border-brand-orange">
              <CardContent className="py-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-brand-orange" />
                  Office Hours
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
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
        <Card className="shadow-xl border-2 border-brand-navy/20">
          <CardHeader className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white">
            <CardTitle className="text-xl">Conference Organizing Team</CardTitle>
            <CardDescription className="text-gray-300">Reach out to our team members for specific inquiries</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-1">Dr. Amit Kumar</h3>
                <p className="text-sm text-gray-600 mb-2">General Chair</p>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Mail className="h-3 w-3 mr-2 text-brand-orange" />
                    <a href="mailto:amit.kumar@uem.edu.in" className="hover:underline text-brand-orange">
                      amit.kumar@uem.edu.in
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-3 w-3 mr-2 text-brand-orange" />
                    <span>+91 98765 00001</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Dr. Priya Singh</h3>
                <p className="text-sm text-gray-600 mb-2">Technical Program Chair</p>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Mail className="h-3 w-3 mr-2 text-brand-orange" />
                    <a href="mailto:priya.singh@uem.edu.in" className="hover:underline text-brand-orange">
                      priya.singh@uem.edu.in
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-3 w-3 mr-2 text-brand-orange" />
                    <span>+91 98765 00002</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Mr. Rahul Sharma</h3>
                <p className="text-sm text-gray-600 mb-2">Registration Chair</p>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Mail className="h-3 w-3 mr-2 text-brand-orange" />
                    <a href="mailto:rahul.sharma@uem.edu.in" className="hover:underline text-brand-orange">
                      rahul.sharma@uem.edu.in
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-3 w-3 mr-2 text-brand-orange" />
                    <span>+91 98765 00003</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Link */}
        <div className="text-center py-6 sm:py-8 mt-8 sm:mt-12 bg-gradient-to-r from-brand-navy/10 to-brand-orange/10 rounded-lg border-2 border-brand-orange/30">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-brand-navy">Looking for Quick Answers?</h2>
          <p className="text-gray-600 mb-4 sm:mb-6 px-4">
            Check out our FAQ section for commonly asked questions
          </p>
          <Link href="/about">
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-brand-navy font-semibold shadow-lg">
              View FAQ
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
