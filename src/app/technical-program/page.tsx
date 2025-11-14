import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Users, Coffee, Award, Presentation } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function TechnicalProgramPage() {
  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-6 bg-brand-orange text-brand-navy hover:bg-brand-orange/90 text-base px-4 py-2">Schedule</Badge>
          <h1 className="text-5xl sm:text-6xl font-bold text-brand-navy mb-6">Technical Program</h1>
          <p className="text-xl sm:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
            Three days of keynotes, paper presentations, workshops, and networking
          </p>
        </div>

        {/* Program Overview */}
        <Card className="mb-12 sm:mb-16 bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white shadow-2xl border-4 border-brand-orange relative z-10">
          <CardContent className="py-10 sm:py-12">
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div>
                <Calendar className="h-12 w-12 sm:h-14 sm:w-14 mx-auto mb-4 text-brand-orange" />
                <h3 className="font-bold text-xl sm:text-2xl mb-2">May 5-7, 2026</h3>
                <p className="text-gray-200 text-base sm:text-lg font-medium">Three full days</p>
              </div>
              <div>
                <Users className="h-12 w-12 sm:h-14 sm:w-14 mx-auto mb-4 text-brand-orange" />
                <h3 className="font-bold text-xl sm:text-2xl mb-2">6 Keynote Speakers</h3>
                <p className="text-gray-200 text-base sm:text-lg font-medium">World-renowned experts</p>
              </div>
              <div>
                <Presentation className="h-12 w-12 sm:h-14 sm:w-14 mx-auto mb-4 text-brand-orange" />
                <h3 className="font-bold text-xl sm:text-2xl mb-2">50+ Paper Sessions</h3>
                <p className="text-gray-200 text-base sm:text-lg font-medium">Across 6 tracks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Day 1 */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8 gap-2 sm:gap-0">
            <div className="bg-brand-orange text-brand-navy px-6 py-3 rounded-lg font-bold text-lg sm:text-xl shadow-lg">
              Day 1 - May 5, 2026
            </div>
            <div className="sm:ml-4 text-gray-700 text-base sm:text-lg font-semibold">Monday - Inauguration & Keynotes</div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <Card className="shadow-2xl border-2 border-brand-navy/20 bg-white relative z-10 hover:shadow-2xl hover:scale-[1.01] transition-all">
              <CardContent className="py-5 sm:py-6 bg-white">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="flex items-center text-brand-orange font-bold min-w-full sm:min-w-36 text-base sm:text-lg">
                    <Clock className="h-5 w-5 mr-2" />
                    09:00 - 10:00
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 text-[#14213d]">Registration & Welcome Coffee</h3>
                    <div className="flex items-center text-base text-gray-700">
                      <MapPin className="h-5 w-5 mr-2" />
                      Main Lobby
                    </div>
                  </div>
                  <Badge variant="secondary">
                    <Coffee className="h-3 w-3 mr-1" />
                    Break
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-brand-orange shadow-2xl border-2 border-brand-navy/20 bg-white relative z-10 hover:shadow-2xl hover:scale-[1.01] transition-all">
              <CardContent className="py-5 sm:py-6 bg-white">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="flex items-center text-brand-orange font-bold min-w-full sm:min-w-36 text-base sm:text-lg">
                    <Clock className="h-5 w-5 mr-2" />
                    10:00 - 10:30
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 text-[#14213d]">Inauguration Ceremony</h3>
                    <p className="text-base text-gray-800 mb-3 leading-relaxed">
                      Welcome address by Chief Patron, Lighting of the lamp, Inaugural keynote
                    </p>
                    <div className="flex items-center text-base text-gray-700">
                      <MapPin className="h-5 w-5 mr-2" />
                      Main Auditorium
                    </div>
                  </div>
                  <Badge className="bg-brand-navy text-white text-sm px-3 py-1">
                    <Award className="h-4 w-4 mr-1" />
                    Ceremony
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600 shadow-2xl bg-white relative z-10 hover:shadow-2xl hover:scale-[1.01] transition-all">
              <CardContent className="py-5 sm:py-6 bg-white">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="flex items-center text-green-600 font-bold min-w-full sm:min-w-36 text-base sm:text-lg">
                    <Clock className="h-5 w-5 mr-2" />
                    10:30 - 11:30
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 text-[#14213d]">Keynote 1: Future of AI in Healthcare</h3>
                    <p className="text-base text-gray-800 mb-3 font-medium">
                      Dr. Rajesh Kumar, IIT Delhi
                    </p>
                    <div className="flex items-center text-base text-gray-700">
                      <MapPin className="h-5 w-5 mr-2" />
                      Main Auditorium
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    <Users className="h-3 w-3 mr-1" />
                    Keynote
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-2xl bg-white relative z-10 hover:shadow-2xl hover:scale-[1.01] transition-all">
              <CardContent className="py-5 sm:py-6 bg-white">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="flex items-center text-blue-600 font-bold min-w-full sm:min-w-36 text-base sm:text-lg">
                    <Clock className="h-5 w-5 mr-2" />
                    11:30 - 12:00
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 text-[#14213d]">Tea Break & Networking</h3>
                    <div className="flex items-center text-base text-gray-700">
                      <MapPin className="h-5 w-5 mr-2" />
                      Conference Hall Foyer
                    </div>
                  </div>
                  <Badge variant="secondary">
                    <Coffee className="h-3 w-3 mr-1" />
                    Break
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-orange-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    12:00 - 13:30
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Parallel Sessions - Track 1 & 2</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Track 1: AI & ML (Hall A) | Track 2: IoT & Edge Computing (Hall B)
                    </p>
                    <p className="text-xs text-gray-500">6 papers per track (15 min each)</p>
                  </div>
                  <Badge className="bg-orange-600 text-white">
                    <Presentation className="h-3 w-3 mr-1" />
                    Papers
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-blue-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    13:30 - 14:30
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Lunch Break</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      University Cafeteria
                    </div>
                  </div>
                  <Badge variant="secondary">
                    <Coffee className="h-3 w-3 mr-1" />
                    Break
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-green-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    14:30 - 15:30
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Keynote 2: Quantum Computing - Theory to Practice</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Prof. Sarah Johnson, MIT
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      Main Auditorium
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    <Users className="h-3 w-3 mr-1" />
                    Keynote
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-orange-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    15:30 - 17:00
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Parallel Sessions - Track 3 & 4</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Track 3: Cloud Computing (Hall A) | Track 4: Cybersecurity (Hall B)
                    </p>
                    <p className="text-xs text-gray-500">6 papers per track</p>
                  </div>
                  <Badge className="bg-orange-600 text-white">
                    <Presentation className="h-3 w-3 mr-1" />
                    Papers
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Day 2 */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
            <div className="bg-brand-orange text-brand-navy px-4 py-2 rounded-lg font-bold text-base sm:text-lg">
              Day 2 - May 6, 2026
            </div>
            <div className="sm:ml-4 text-gray-600 text-sm sm:text-base">Tuesday - Technical Sessions</div>
          </div>

          <div className="space-y-4">
            <Card className="border-l-4 border-l-green-600">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-green-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    09:30 - 10:30
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Keynote 3: Scaling Data Systems in Cloud Era</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Dr. Priya Sharma, Microsoft Research India
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      Main Auditorium
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    <Users className="h-3 w-3 mr-1" />
                    Keynote
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-orange-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    10:45 - 12:15
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Parallel Sessions - Track 5 & 6</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Track 5: Big Data & Analytics (Hall A) | Track 6: Emerging Tech (Hall B)
                    </p>
                  </div>
                  <Badge className="bg-orange-600 text-white">
                    <Presentation className="h-3 w-3 mr-1" />
                    Papers
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-blue-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    12:15 - 13:15
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Lunch Break</h3>
                  </div>
                  <Badge variant="secondary">
                    <Coffee className="h-3 w-3 mr-1" />
                    Break
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-purple-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    13:15 - 15:45
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Workshop: Hands-on with LLMs & Prompt Engineering</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Interactive workshop on building AI applications
                    </p>
                    <p className="text-xs text-gray-500">Limited seats - Prior registration required</p>
                  </div>
                  <Badge className="bg-purple-600 text-white">
                    Workshop
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-600 bg-blue-50">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-blue-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    19:00 - 22:00
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Conference Banquet & Cultural Evening</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Networking dinner with cultural performances
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      UEM Convention Center
                    </div>
                  </div>
                  <Badge className="bg-blue-600 text-white">
                    Social Event
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Day 3 */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
            <div className="bg-brand-orange text-brand-navy px-4 py-2 rounded-lg font-bold text-base sm:text-lg">
              Day 3 - May 7, 2026
            </div>
            <div className="sm:ml-4 text-gray-600 text-sm sm:text-base">Wednesday - Workshops & Closing</div>
          </div>

          <div className="space-y-4">
            <Card className="border-l-4 border-l-green-600">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-green-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    09:30 - 10:30
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Keynote 4: Blockchain Revolution in Security</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Prof. David Chen, Stanford University
                    </p>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    <Users className="h-3 w-3 mr-1" />
                    Keynote
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-orange-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    10:45 - 12:15
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Best Paper Sessions</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Presentation of top-rated papers from all tracks
                    </p>
                  </div>
                  <Badge className="bg-orange-600 text-white">
                    <Award className="h-3 w-3 mr-1" />
                    Awards
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-blue-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    12:15 - 13:15
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Lunch Break</h3>
                  </div>
                  <Badge variant="secondary">
                    <Coffee className="h-3 w-3 mr-1" />
                    Break
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-purple-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    13:15 - 14:15
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Panel Discussion: Future of Computing Research</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      All keynote speakers participate
                    </p>
                  </div>
                  <Badge className="bg-purple-600 text-white">
                    Panel
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-600 bg-blue-50">
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center text-blue-600 font-semibold min-w-32">
                    <Clock className="h-4 w-4 mr-2" />
                    14:15 - 15:00
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Closing Ceremony & Award Distribution</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Best paper awards, Valedictory address, Vote of thanks
                    </p>
                  </div>
                  <Badge className="bg-blue-600 text-white">
                    <Award className="h-3 w-3 mr-1" />
                    Ceremony
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Download Schedule */}
        <div className="text-center py-10 sm:py-12 bg-white rounded-lg border-4 border-brand-orange shadow-2xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-brand-navy">Download Full Schedule</h2>
          <p className="text-gray-800 mb-8 px-4 text-lg sm:text-xl font-medium max-w-3xl mx-auto">
            Get the detailed program with all paper presentations and timings
          </p>
          <Button size="lg" className="bg-brand-orange hover:bg-[#ff9800] text-white font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-lg px-8 py-6">
            <Calendar className="mr-3 h-6 w-6" />
            Download PDF Schedule
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
