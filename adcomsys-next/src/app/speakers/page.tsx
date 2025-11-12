import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Award, Briefcase, User } from 'lucide-react'
import { supabaseAdmin } from '@/lib/db'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface Speaker {
  id: string
  name: string
  designation: string
  affiliation: string
  bio: string | null
  image_url: string | null
  topic: string | null
  session_date: string | null
  display_order: number
  is_active: boolean
}

async function getSpeakers() {
  const { data, error } = await supabaseAdmin
    .from('speakers')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching speakers:', error)
    return []
  }

  return data as Speaker[]
}

export default async function SpeakersPage() {
  const speakers = await getSpeakers()

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fca311] to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-[#fca311]/20 backdrop-blur-sm p-4 rounded-full ring-2 ring-[#fca311]/50">
              <Award className="h-12 w-12 text-[#fca311]" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Distinguished <span className="text-[#fca311]">Speakers</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn from world-renowned experts and thought leaders
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Speakers Grid */}
        {speakers.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {speakers.map((speaker) => (
              <Card key={speaker.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {speaker.image_url ? (
                      <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-200">
                        <Image
                          src={speaker.image_url}
                          alt={speaker.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ) : (
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-blue-600 text-white text-xl">
                          <User className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex-1">
                      <CardTitle className="mb-1">{speaker.name}</CardTitle>
                      <p className="text-sm text-gray-600 font-medium">{speaker.designation}</p>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {speaker.affiliation}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {speaker.bio && (
                    <div>
                      <p className="text-sm text-gray-700 leading-relaxed">{speaker.bio}</p>
                    </div>
                  )}

                  {speaker.topic && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1 font-semibold">Keynote Topic:</p>
                      <p className="text-sm font-medium text-blue-900">{speaker.topic}</p>
                    </div>
                  )}

                  {speaker.session_date && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="h-4 w-4" />
                      <span>{new Date(speaker.session_date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No speakers announced yet. Check back soon!</p>
          </div>
        )}

        {/* More Speakers Coming Soon */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="py-12 text-center">
            <Award className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-2">More Speakers Coming Soon!</h2>
            <p className="text-blue-100 mb-6">
              We are finalizing additional keynote speakers and industry experts. Stay tuned for updates.
            </p>
            <Link href="/registration">
              <Button size="lg" variant="secondary">
                Register Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Speaker Benefits */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Attend Our Keynotes?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Latest Research Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get exclusive access to cutting-edge research and emerging trends from global leaders.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Networking Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Connect with speakers during Q&A sessions and networking breaks.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Industry Perspectives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Learn how academic research translates to real-world industry applications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
