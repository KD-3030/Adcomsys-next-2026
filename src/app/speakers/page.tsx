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
import { generateMetadata as createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = createMetadata({
  title: 'Keynote Speakers',
  description: 'Learn about the distinguished keynote speakers at AdComSys 2026. Renowned experts sharing insights on advanced computing and systems.',
  path: '/speakers',
  keywords: ['keynote speakers', 'invited speakers', 'AdComSys 2026', 'conference speakers', 'computing experts']
})

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
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white py-20 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fca311] to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[#fca311] backdrop-blur-sm p-5 rounded-full ring-4 ring-[#fca311]/30 shadow-xl">
              <Award className="h-14 w-14 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6">
            Distinguished <span className="text-[#fca311]">Speakers</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium">
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
              <Card key={speaker.id} className="bg-white shadow-2xl hover:shadow-2xl hover:scale-[1.02] transition-all border-l-4 border-[#fca311] relative z-10">
                <CardHeader className="bg-white pb-4">
                  <div className="flex items-start gap-4">
                    {speaker.image_url ? (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-[#fca311]/30 shadow-lg">
                        <Image
                          src={speaker.image_url}
                          alt={speaker.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ) : (
                      <Avatar className="h-24 w-24 ring-4 ring-[#fca311]/30 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-br from-[#14213d] to-[#1a2844] text-white text-xl">
                          <User className="h-10 w-10" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex-1">
                      <CardTitle className="mb-2 text-xl text-[#14213d]">{speaker.name}</CardTitle>
                      <p className="text-base text-gray-700 font-semibold">{speaker.designation}</p>
                      <p className="text-base text-gray-600 flex items-center mt-2">
                        <Briefcase className="h-4 w-4 mr-2 text-[#fca311]" />
                        {speaker.affiliation}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 bg-white">
                  {speaker.bio && (
                    <div>
                      <p className="text-base text-gray-800 leading-relaxed">{speaker.bio}</p>
                    </div>
                  )}

                  {speaker.topic && (
                    <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-[#fca311] shadow-md">
                      <p className="text-sm text-gray-700 mb-2 font-bold">Keynote Topic:</p>
                      <p className="text-base font-semibold text-[#14213d]">{speaker.topic}</p>
                    </div>
                  )}

                  {speaker.session_date && (
                    <div className="flex items-center gap-2 text-base text-gray-700 font-medium">
                      <Award className="h-5 w-5 text-[#fca311]" />
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
          <div className="text-center py-16 text-gray-700 bg-white rounded-lg shadow-xl border-l-4 border-[#fca311] relative z-10">
            <User className="h-16 w-16 mx-auto mb-6 text-[#fca311]" />
            <p className="text-lg font-semibold">No speakers announced yet. Check back soon!</p>
          </div>
        )}

        {/* More Speakers Coming Soon */}
        <Card className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white shadow-2xl border-0 relative z-10">
          <CardContent className="py-16 text-center">
            <Award className="h-20 w-20 mx-auto mb-8 text-[#fca311]" />
            <h2 className="text-4xl font-bold mb-6">More Speakers Coming Soon!</h2>
            <p className="text-gray-200 mb-8 text-lg font-medium max-w-2xl mx-auto">
              We are finalizing additional keynote speakers and industry experts. Stay tuned for updates.
            </p>
            <Link href="/registration">
              <Button size="lg" className="bg-[#fca311] hover:bg-[#ff9800] text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                Register Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Speaker Benefits */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#14213d]">Why Attend Our Keynotes?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-2xl hover:shadow-2xl hover:scale-[1.02] transition-all border-l-4 border-blue-600 relative z-10">
              <CardHeader className="bg-white pb-4">
                <CardTitle className="text-xl text-[#14213d]">Latest Research Insights</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <p className="text-base text-gray-800 leading-relaxed">
                  Get exclusive access to cutting-edge research and emerging trends from global leaders.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-2xl hover:shadow-2xl hover:scale-[1.02] transition-all border-l-4 border-green-600 relative z-10">
              <CardHeader className="bg-white pb-4">
                <CardTitle className="text-xl text-[#14213d]">Networking Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <p className="text-base text-gray-800 leading-relaxed">
                  Connect with speakers during Q&A sessions and networking breaks.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-2xl hover:shadow-2xl hover:scale-[1.02] transition-all border-l-4 border-[#fca311] relative z-10">
              <CardHeader className="bg-white pb-4">
                <CardTitle className="text-xl text-[#14213d]">Industry Perspectives</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <p className="text-base text-gray-800 leading-relaxed">
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
