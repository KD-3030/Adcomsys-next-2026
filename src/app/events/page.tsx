import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Music, Award, Utensils, Clock } from 'lucide-react'
import { generateMetadata as createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = createMetadata({
  title: 'Conference Events & Activities',
  description: 'Explore the exciting events at AdComSys 2026 including inauguration ceremony, welcome reception, cultural evening, gala dinner, and networking sessions.',
  path: '/events',
  keywords: ['conference events', 'AdComSys 2026', 'cultural evening', 'networking', 'gala dinner', 'conference activities']
})

export default function EventsPage() {
  const events = [
    {
      title: 'Inauguration Ceremony',
      date: 'May 5, 2026',
      time: '10:00 AM - 10:30 AM',
      location: 'Main Auditorium',
      description: 'Formal opening of AdComSys 2026 with lamp lighting, welcome address by Chief Patron, and inaugural keynote.',
      icon: Award,
      color: 'blue'
    },
    {
      title: 'Welcome Reception',
      date: 'May 5, 2026',
      time: '09:00 AM - 10:00 AM',
      location: 'Main Lobby',
      description: 'Registration desk opens. Welcome coffee and refreshments for all participants. Networking opportunity.',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Technical Workshop',
      date: 'May 6, 2026',
      time: '01:15 PM - 03:45 PM',
      location: 'Workshop Hall',
      description: 'Hands-on workshop on Large Language Models and Prompt Engineering. Limited seats available.',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Conference Banquet',
      date: 'May 6, 2026',
      time: '07:00 PM - 10:00 PM',
      location: 'UEM Convention Center',
      description: 'Gala dinner with networking opportunities, cultural performances, and entertainment. Dress code: Formal/Traditional.',
      icon: Utensils,
      color: 'orange'
    },
    {
      title: 'Cultural Evening',
      date: 'May 6, 2026',
      time: '08:00 PM - 09:30 PM',
      location: 'UEM Convention Center',
      description: 'Traditional Indian music and dance performances showcasing Bengali culture. Part of the banquet event.',
      icon: Music,
      color: 'pink'
    },
    {
      title: 'Best Paper Awards',
      date: 'May 7, 2026',
      time: '10:45 AM - 12:15 PM',
      location: 'Main Auditorium',
      description: 'Recognition of outstanding research contributions. Top papers from each track will be presented.',
      icon: Award,
      color: 'yellow'
    },
    {
      title: 'Panel Discussion',
      date: 'May 7, 2026',
      time: '01:15 PM - 02:15 PM',
      location: 'Main Auditorium',
      description: 'Expert panel on "Future of Computing Research" featuring all keynote speakers. Open Q&A session.',
      icon: Users,
      color: 'indigo'
    },
    {
      title: 'Closing Ceremony',
      date: 'May 7, 2026',
      time: '02:15 PM - 03:00 PM',
      location: 'Main Auditorium',
      description: 'Award distribution, valedictory address, vote of thanks, and announcement of AdComSys 2027.',
      icon: Award,
      color: 'red'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-l-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-l-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-l-purple-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-l-orange-600' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-l-pink-600' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-l-yellow-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-l-indigo-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-l-red-600' }
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-[#fca311] to-transparent"></div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 text-center relative z-10">
          <Badge className="mb-4 sm:mb-6 bg-[#fca311] text-[#14213d] hover:bg-[#fca311]/90 text-sm sm:text-base px-3 sm:px-4 py-2">Events & Activities</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            Conference <span className="text-[#fca311]">Events</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-medium px-2">
            Beyond technical sessions - Networking, culture, and celebration
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-5xl">

        {/* Events Timeline */}
        <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          {events.map((event, index) => {
            const Icon = event.icon
            const colors = getColorClasses(event.color)
            
            return (
              <Card key={index} className={`border-l-4 ${colors.border} hover:shadow-lg transition-shadow`}>
                <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className={`${colors.bg} rounded-full p-2 sm:p-3 shrink-0`}>
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg sm:text-xl mb-2">{event.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <p className="text-sm sm:text-base text-gray-700">{event.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Social Activities */}
        <Card className="mb-8 sm:mb-12">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">
              Social & Networking Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-blue-600">Coffee Breaks</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-2">
                  Daily morning and afternoon tea/coffee breaks provide excellent networking opportunities.
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1">
                  <li>11:30 AM - 12:00 PM (Daily)</li>
                  <li>03:00 PM - 03:30 PM (Daily)</li>
                  <li>Snacks and beverages</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-green-600">Poster Sessions</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-2">
                  Interactive poster presentations during lunch breaks in the conference foyer.
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1">
                  <li>May 5 & 6: 12:30 PM - 01:30 PM</li>
                  <li>20+ research posters</li>
                  <li>Direct interaction with authors</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-purple-600">Exhibition Area</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-2">
                  Industry exhibitions and demos showcasing latest technologies and products.
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1">
                  <li>Open throughout conference</li>
                  <li>10+ exhibitors</li>
                  <li>Live product demonstrations</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-orange-600">Campus Tour</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-2">
                  Guided tour of UEM Kolkata campus facilities and research labs.
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1">
                  <li>May 6: 04:00 PM - 05:00 PM</li>
                  <li>Optional activity</li>
                  <li>Registration at help desk</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Banquet Details */}
        <Card className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white mb-8 sm:mb-12">
          <CardContent className="py-8 sm:py-12 px-4 sm:px-6">
            <div className="text-center">
              <Utensils className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 mx-auto mb-3 sm:mb-4 text-[#fca311]" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Conference Banquet Highlights</h2>
              <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
                An evening of fine dining, cultural performances, and networking in an elegant setting
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-[#fca311]">Cuisine</h3>
                  <ul className="text-xs sm:text-sm space-y-1 text-gray-300">
                    <li>• Multi-cuisine buffet</li>
                    <li>• Indian & International</li>
                    <li>• Vegetarian & Non-veg options</li>
                    <li>• Special dietary accommodations</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-[#fca311]">Entertainment</h3>
                  <ul className="text-xs sm:text-sm space-y-1 text-gray-300">
                    <li>• Classical dance performances</li>
                    <li>• Bengali folk music</li>
                    <li>• Live band</li>
                    <li>• DJ & dance floor</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 text-[#fca311]">Networking</h3>
                  <ul className="text-xs sm:text-sm space-y-1 text-gray-300">
                    <li>• Keynote speaker meet & greet</li>
                    <li>• Industry leader interactions</li>
                    <li>• Informal discussions</li>
                    <li>• Photo opportunities</li>
                  </ul>
                </div>
              </div>

              <p className="mt-6 sm:mt-8 text-gray-300 text-xs sm:text-sm">
                <strong className="text-[#fca311]">Dress Code:</strong> Formal or Traditional Attire | <strong className="text-[#fca311]">Venue:</strong> UEM Convention Center
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="border-l-4 border-[#fca311]">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start">
                <Badge className="mr-2 mt-0.5 shrink-0 text-xs">Note</Badge>
                <span>Conference banquet is included in all registration categories except Attendee.</span>
              </li>
              <li className="flex items-start">
                <Badge className="mr-2 mt-0.5 shrink-0 text-xs">Note</Badge>
                <span>Workshop has limited seats - register early through your dashboard.</span>
              </li>
              <li className="flex items-start">
                <Badge className="mr-2 mt-0.5 shrink-0 text-xs">Note</Badge>
                <span>All events are subject to minor schedule changes. Check the mobile app for real-time updates.</span>
              </li>
              <li className="flex items-start">
                <Badge className="mr-2 mt-0.5 shrink-0 text-xs">Note</Badge>
                <span>Photography and videography allowed in all sessions except where explicitly prohibited.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-6 sm:py-8 mt-8 sm:mt-12 bg-linear-to-r from-[#fca311]/10 to-[#fca311]/20 rounded-lg px-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-[#14213d]">Don&apos;t Miss These Amazing Events!</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6">
            Register now to be part of AdComSys 2026
          </p>
          <Link href="/registration">
            <Button size="lg" className="bg-[#fca311] hover:bg-[#ff9800] text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6">
              <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Register for Conference
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
