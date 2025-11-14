import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, MapPin, Users, Music, Award, Utensils, Camera, Clock } from 'lucide-react'

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
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Events & Activities</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Conference Events</h1>
          <p className="text-lg text-gray-600">
            Beyond technical sessions - Networking, culture, and celebration
          </p>
        </div>

        {/* Events Timeline */}
        <div className="space-y-6 mb-16">
          {events.map((event, index) => {
            const Icon = event.icon
            const colors = getColorClasses(event.color)
            
            return (
              <Card key={index} className={`border-l-4 ${colors.border} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`${colors.bg} rounded-full p-3`}>
                      <Icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{event.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Social Activities */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="mr-2 h-6 w-6 text-blue-600" />
              Social & Networking Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-blue-600">Coffee Breaks</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Daily morning and afternoon tea/coffee breaks provide excellent networking opportunities.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>11:30 AM - 12:00 PM (Daily)</li>
                  <li>03:00 PM - 03:30 PM (Daily)</li>
                  <li>Snacks and beverages</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-green-600">Poster Sessions</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Interactive poster presentations during lunch breaks in the conference foyer.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>May 5 & 6: 12:30 PM - 01:30 PM</li>
                  <li>20+ research posters</li>
                  <li>Direct interaction with authors</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-purple-600">Exhibition Area</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Industry exhibitions and demos showcasing latest technologies and products.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Open throughout conference</li>
                  <li>10+ exhibitors</li>
                  <li>Live product demonstrations</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-orange-600">Campus Tour</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Guided tour of UEM Kolkata campus facilities and research labs.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>May 6: 04:00 PM - 05:00 PM</li>
                  <li>Optional activity</li>
                  <li>Registration at help desk</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Banquet Details */}
        <Card className="bg-gradient-to-r from-orange-600 to-orange-700 text-white mb-12">
          <CardContent className="py-12">
            <div className="text-center">
              <Utensils className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Conference Banquet Highlights</h2>
              <p className="text-orange-100 mb-8 text-lg max-w-2xl mx-auto">
                An evening of fine dining, cultural performances, and networking in an elegant setting
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Cuisine</h3>
                  <ul className="text-sm space-y-1 text-orange-100">
                    <li>• Multi-cuisine buffet</li>
                    <li>• Indian & International</li>
                    <li>• Vegetarian & Non-veg options</li>
                    <li>• Special dietary accommodations</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Entertainment</h3>
                  <ul className="text-sm space-y-1 text-orange-100">
                    <li>• Classical dance performances</li>
                    <li>• Bengali folk music</li>
                    <li>• Live band</li>
                    <li>• DJ & dance floor</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Networking</h3>
                  <ul className="text-sm space-y-1 text-orange-100">
                    <li>• Keynote speaker meet & greet</li>
                    <li>• Industry leader interactions</li>
                    <li>• Informal discussions</li>
                    <li>• Photo opportunities</li>
                  </ul>
                </div>
              </div>

              <p className="mt-8 text-orange-100 text-sm">
                <strong>Dress Code:</strong> Formal or Traditional Attire | <strong>Venue:</strong> UEM Convention Center
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <Badge className="mr-2 mt-0.5">Note</Badge>
                <span>Conference banquet is included in all registration categories except Attendee.</span>
              </li>
              <li className="flex items-start">
                <Badge className="mr-2 mt-0.5">Note</Badge>
                <span>Workshop has limited seats - register early through your dashboard.</span>
              </li>
              <li className="flex items-start">
                <Badge className="mr-2 mt-0.5">Note</Badge>
                <span>All events are subject to minor schedule changes. Check the mobile app for real-time updates.</span>
              </li>
              <li className="flex items-start">
                <Badge className="mr-2 mt-0.5">Note</Badge>
                <span>Photography and videography allowed in all sessions except where explicitly prohibited.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-8 mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Don&apos;t Miss These Amazing Events!</h2>
          <p className="text-gray-600 mb-6">
            Register now to be part of AdComSys 2026
          </p>
          <Link href="/registration">
            <Button size="lg">
              <Calendar className="mr-2 h-5 w-5" />
              Register for Conference
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
