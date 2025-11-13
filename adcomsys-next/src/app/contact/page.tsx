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
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-6 bg-brand-orange text-brand-navy hover:bg-brand-orange/90 text-base px-4 py-2">Get in Touch</Badge>
          <h1 className="text-5xl sm:text-6xl font-bold text-brand-navy mb-6">Contact Us</h1>
          <p className="text-xl sm:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
            Have questions? We&apos;re here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {/* Contact Form */}
          <Card className="shadow-2xl border-2 border-brand-navy/20 bg-[#FCA311] relative z-10 hover:shadow-2xl transition-all">
            <CardHeader className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white py-6">
              <CardTitle className="text-2xl sm:text-3xl">Send us a Message</CardTitle>
              <CardDescription className="text-gray-200 text-base">
                Fill out the form below and we&apos;ll respond within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-[#FCA311] pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-black font-bold text-black">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-black"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-bold text-black">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="text-black"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-bold text-black">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="text-black"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-base font-bold text-black">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Registration inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="text-black"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-base font-bold text-black">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="text-black"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-navy hover:bg-brand-navy text-white text-lg py-6 font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-2xl border-2 border-brand-navy/20 bg-[#FCA311] relative z-10 hover:shadow-2xl transition-all">
              <CardHeader className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white py-6">
                <CardTitle className="flex items-center text-2xl sm:text-3xl">
                  <Building2 className="mr-3 h-8 w-8 text-brand-orange" />
                  Conference Venue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-6 bg-[#FCA311]">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-[#14213d]">University of Engineering and Management</h3>
                  <p className="text-base text-gray-800 flex items-start leading-relaxed">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-brand-orange" />
                    <span>
                      University Area, Plot No. III, B/5, New Town, Action Area III,<br />
                      Kolkata, West Bengal 700160, India
                    </span>
                  </p>
                </div>

                <div className="bg-[#FCA311] border-t pt-5">
                  <Link 
                    href="https://maps.google.com/?q=University+of+Engineering+and+Management+Kolkata" 
                    target="_blank"
                  >
                    <Button variant="outline" className="w-full border-2 border-brand-orange text-white hover:bg-white hover:text-brand-navy text-base py-5 font-bold transition-all hover:scale-[1.02]">
                      <MapPin className="mr-2 h-5 w-5" />
                      View on Google Maps
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-2xl border-2 border-brand-navy/20 bg-[#FCA311] relative z-10 hover:shadow-2xl transition-all">
              <CardHeader className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white py-6">
                <CardTitle className="flex items-center text-2xl sm:text-3xl">
                  <Mail className="mr-3 h-8 w-8 text-brand-orange" />
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-6 bg-[#FCA311]">
                <div>
                  <h4 className="font-bold text-base text-gray-700 mb-3">General Inquiries</h4>
                  <div className="flex items-center text-base">
                    <Mail className="h-5 w-5 mr-3 text-blue-600" />
                    <a href="mailto:info@adcomsys2026.com" className="hover:underline text-black font-medium">
                      info@adcomsys2026.com
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-base text-gray-700 mb-3">Paper Submissions</h4>
                  <div className="flex items-center text-base">
                    <Mail className="h-5 w-5 mr-3 text-blue-600" />
                    <a href="mailto:papers@adcomsys2026.com" className="hover:underline text-black font-medium">
                      papers@adcomsys2026.com
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-base text-gray-700 mb-3">Registration Support</h4>
                  <div className="flex items-center text-base">
                    <Mail className="h-5 w-5 mr-3 text-blue-600" />
                    <a href="mailto:registration@adcomsys2026.com" className="hover:underline text-black font-medium">
                      registration@adcomsys2026.com
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-base text-gray-700 mb-3">Phone</h4>
                  <div className="flex items-center text-base">
                    <Phone className="h-5 w-5 mr-3 text-blue-600" />
                    <a href="tel:+919876543210" className="hover:underline text-black font-medium">
                      +91 98765 43210
                    </a>
                  </div>
                  <div className="flex items-center text-base mt-2">
                    <Phone className="h-5 w-5 mr-3 text-blue-600" />
                    <a href="tel:+919876543211" className="hover:underline text-black font-medium">
                      +91 98765 43211
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white shadow-2xl border-4 border-brand-orange relative z-10">
              <CardContent className="py-8">
                <h3 className="font-bold text-2xl mb-5 flex items-center">
                  <CheckCircle className="mr-3 h-7 w-7 text-brand-orange" />
                  Office Hours
                </h3>
                <div className="space-y-3 text-base text-gray-200">
                  <p><strong className="text-white font-bold">Monday - Friday:</strong> 9:00 AM - 6:00 PM (IST)</p>
                  <p><strong className="text-white font-bold">Saturday:</strong> 10:00 AM - 4:00 PM (IST)</p>
                  <p><strong className="text-white font-bold">Sunday:</strong> Closed</p>
                  <p className="pt-3 text-sm">
                    * During conference days (May 5-7, 2026), support desk will be available 8:00 AM - 8:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Contacts */}
        <Card className="shadow-2xl border-2 border-brand-navy/20 bg-[#FCA311] relative z-10">
          <CardHeader className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white py-6">
            <CardTitle className="text-2xl sm:text-3xl">Conference Organizing Team</CardTitle>
            <CardDescription className="text-gray-200 text-base">Reach out to our team members for specific inquiries</CardDescription>
          </CardHeader>
          <CardContent className="pt-8 bg-white">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#14213d]">Dr. Amit Kumar</h3>
                <p className="text-base text-gray-700 mb-3 font-medium">General Chair</p>
                <div className="space-y-2">
                  <div className="flex items-center text-base">
                    <Mail className="h-4 w-4 mr-2 text-brand-orange" />
                    <a href="mailto:amit.kumar@uem.edu.in" className="hover:underline text-brand-orange">
                      amit.kumar@uem.edu.in
                    </a>
                  </div>
                  <div className="flex items-center text-base">
                    <Phone className="h-4 w-4 mr-2 text-brand-orange" />
                    <span className="text-gray-800">+91 98765 00001</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-[#14213d]">Dr. Priya Singh</h3>
                <p className="text-base text-gray-700 mb-3 font-medium">Technical Program Chair</p>
                <div className="space-y-2">
                  <div className="flex items-center text-base">
                    <Mail className="h-4 w-4 mr-2 text-brand-orange" />
                    <a href="mailto:priya.singh@uem.edu.in" className="hover:underline text-brand-orange">
                      priya.singh@uem.edu.in
                    </a>
                  </div>
                  <div className="flex items-center text-base">
                    <Phone className="h-4 w-4 mr-2 text-brand-orange" />
                    <span className="text-gray-800">+91 98765 00002</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-[#14213d]">Mr. Rahul Sharma</h3>
                <p className="text-base text-gray-700 mb-3 font-medium">Registration Chair</p>
                <div className="space-y-2">
                  <div className="flex items-center text-base">
                    <Mail className="h-4 w-4 mr-2 text-brand-orange" />
                    <a href="mailto:rahul.sharma@uem.edu.in" className="hover:underline text-brand-orange">
                      rahul.sharma@uem.edu.in
                    </a>
                  </div>
                  <div className="flex items-center text-base">
                    <Phone className="h-4 w-4 mr-2 text-brand-orange" />
                    <span className="text-gray-800">+91 98765 00003</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Link */}
        <div className="text-center py-12 sm:py-16 mt-12 sm:mt-16 bg-gradient-to-r from-brand-navy to-brand-navy/90 rounded-lg border-4 border-brand-orange shadow-2xl relative z-10 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Looking for Quick Answers?</h2>
          <p className="text-gray-200 mb-6 sm:mb-8 px-4 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
            Check out our FAQ section for commonly asked questions
          </p>
          <Link href="/about">
            <Button size="lg" className="bg-brand-orange hover:bg-[#ff9800] text-white text-lg px-8 py-6 font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              View FAQ
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
