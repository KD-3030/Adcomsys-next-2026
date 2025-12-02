import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, FileText, ExternalLink, Mail, Globe, Award, Cpu, Shield, Network } from 'lucide-react'
import Link from 'next/link'
import { generateMetadata as createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = createMetadata({
  title: 'Past Editions',
  description: 'Explore the history of AdComSys conferences. View past editions, proceedings, and achievements from previous years.',
  path: '/past-editions',
  keywords: ['past editions', 'conference history', 'AdComSys archive', 'previous conferences']
})

const pastEditions = [
  {
    year: '2025',
    title: 'AdComSys 2025',
    subtitle: '2nd International Conference on Advanced Computing and Systems',
    date: '26th & 27th June, 2025',
    location: 'University of Engineering and Management (UEM), Kolkata',
    address: 'University Area, Plot No. III-B/5, New Town, Action Area III, Kolkata, West Bengal 700160',
    organizer: 'Department of Computer Science and Technology (CST) & Department of Computer Science and Information Technology (CSIT)',
    theme: 'Advancing AI, IoT, Cybersecurity & Emerging Computing Technologies',
    papers: '150+',
    participants: '300+',
    publication: 'Springer LNNS (SCOPUS Indexed)',
    publicationFull: 'Lecture Notes in Networks and Systems by Springer',
    publicationUrl: 'https://link.springer.com/series/15179',
    tracks: [
      { name: 'Emerging Computing', icon: Cpu, topics: 'Cloud, Fog, Quantum, Green Computing, DNA/Optical Computing' },
      { name: 'AI Systems', icon: Network, topics: 'Deep Learning, NLP, Robotics, Explainable AI, Generative Models' },
      { name: 'IoT Systems', icon: Globe, topics: 'Smart Cities, Healthcare IoT, Industry 4.0, 5G & Beyond' },
      { name: 'Cybersecurity & Blockchain', icon: Shield, topics: 'Smart Contracts, NFTs, Digital Forensics, Cryptanalysis' }
    ],
    importantDates: [
      { event: 'Paper Submission Opens', date: '15 November 2024' },
      { event: 'Submission Deadline', date: '10 April 2025' },
      { event: 'Acceptance Notification', date: '10 May 2025' },
      { event: 'Conference Dates', date: '26-27 June 2025' }
    ],
    convenor: 'Prof. Dr. Maumita Chakraborty',
    email: 'adcomsys@uem.edu.in',
    chiefPatron: 'Prof. Banani Chakrabarti',
    additionalEvents: ['Technical Poster Competition', 'Technical Workshop', 'Coding Competition (GeeksforGeeks Student Chapter)'],
    websiteUrl: 'https://adcomsys2025.vercel.app/',
    color: 'blue'
  },
  {
    year: '2024',
    title: 'AdComSys 2024',
    subtitle: '1st International Conference on Advanced Computing and Systems',
    date: '26th & 27th June, 2024',
    location: 'University of Engineering and Management (UEM), Kolkata',
    address: 'University Area, Plot No. III-B/5, New Town, Action Area III, Kolkata, West Bengal 700160',
    organizer: 'Department of Computer Science and Technology (CST) & Department of Computer Science and Information Technology (CSIT)',
    theme: 'Advancing AI, IoT, Cybersecurity & Blockchain Systems',
    papers: '120+',
    participants: '250+',
    publication: 'Springer AIS (Web of Science Indexed)',
    publicationFull: 'Algorithms for Intelligent Systems by Springer Nature',
    publicationUrl: 'https://link.springer.com/series/16171',
    tracks: [
      { name: 'Emerging Computing', icon: Cpu, topics: 'Cloud, Fog, Parallel, Mobile, Pervasive, Green Computing' },
      { name: 'AI Systems', icon: Network, topics: 'Deep Learning, NLP, Robotics, Computer Vision, Data Analytics' },
      { name: 'IoT Systems', icon: Globe, topics: 'Smart Cities, Healthcare IoT, Industry 4.0, Sensor Networks' },
      { name: 'Cybersecurity & Blockchain', icon: Shield, topics: 'Security Systems, Blockchain, Smart Contracts, Cryptography' }
    ],
    importantDates: [
      { event: 'Paper Submission Opens', date: '28 August 2023' },
      { event: 'Submission Deadline', date: '15 March 2024' },
      { event: 'Acceptance Notification', date: '25 March 2024' },
      { event: 'Conference Dates', date: '26-27 June 2024' }
    ],
    convenor: 'Prof. Dr. Maumita Chakraborty',
    email: 'adcomsys@uem.edu.in',
    chiefPatron: 'Prof. Banani Chakrabarti',
    additionalEvents: ['Keynote Addresses', 'Technical Tracks', 'Panel Discussions', 'Industry Exhibits'],
    websiteUrl: 'https://adcomsys.vercel.app',
    color: 'green'
  }
]

export default function PastEditionsPage() {
  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-[#FFCC5C] to-transparent"></div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-2">
            Past <span className="text-[#FFCC5C]">Editions</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto font-medium px-2">
            Explore the rich history and achievements of AdComSys conferences
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-6xl">
        <div className="space-y-8 sm:space-y-12">
          {pastEditions.map((edition, index) => (
            <Card key={index} className="shadow-2xl border-l-4 border-[#FFCC5C] bg-white hover:shadow-3xl transition-all overflow-hidden">
              <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                      <span className="text-[#FFCC5C]">{edition.title}</span>
                    </CardTitle>
                    <p className="text-gray-300 mt-2 text-base sm:text-lg">{edition.subtitle}</p>
                  </div>
                  <Badge className="bg-[#FFCC5C] text-[#14213d] text-lg px-4 py-1 font-bold">
                    {edition.year}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3 text-gray-700">
                    <Calendar className="h-6 w-6 text-[#FFCC5C] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-[#14213d] text-base">Date:</span>
                      <p className="font-medium text-base sm:text-lg">{edition.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="h-6 w-6 text-[#FFCC5C] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-[#14213d] text-base">Venue:</span>
                      <p className="font-medium text-base sm:text-lg">{edition.location}</p>
                      <p className="text-base text-gray-500">{edition.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <Users className="h-6 w-6 text-[#FFCC5C] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-[#14213d] text-base">Participants:</span>
                      <p className="font-medium text-base sm:text-lg">{edition.participants}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <FileText className="h-6 w-6 text-[#FFCC5C] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-[#14213d] text-base">Papers:</span>
                      <p className="font-medium text-base sm:text-lg">{edition.papers} Papers Presented</p>
                    </div>
                  </div>
                </div>

                {/* Organizer & Theme */}
                <div className="bg-gray-50 p-5 rounded-lg">
                  <p className="text-gray-700 mb-3 text-base sm:text-lg">
                    <span className="font-semibold text-[#14213d]">Organized by:</span> {edition.organizer}
                  </p>
                  <p className="text-gray-700 text-base sm:text-lg">
                    <span className="font-semibold text-[#14213d]">Theme:</span> {edition.theme}
                  </p>
                </div>

                {/* Conference Tracks */}
                <div>
                  <h3 className="font-bold text-[#14213d] text-xl mb-4">
                    Conference Tracks
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {edition.tracks.map((track, trackIndex) => {
                      const IconComponent = track.icon
                      return (
                        <div key={trackIndex} className="bg-blue-50 p-4 rounded-lg border-l-3 border-[#14213d]">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="h-5 w-5 text-[#FFCC5C]" />
                            <span className="font-semibold text-[#14213d] text-base">{track.name}</span>
                          </div>
                          <p className="text-sm sm:text-base text-gray-600">{track.topics}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Publication */}
                <div className="bg-[#FFCC5C]/10 p-5 rounded-lg border border-[#FFCC5C]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-6 w-6 text-[#FFCC5C]" />
                    <span className="font-bold text-[#14213d] text-lg">Publication</span>
                  </div>
                  <p className="text-gray-700 text-base sm:text-lg">{edition.publicationFull}</p>
                  <Link href={edition.publicationUrl} target="_blank" rel="noopener noreferrer">
                    <Badge className="mt-3 bg-[#14213d] text-white text-sm px-3 py-1 hover:bg-[#1a2844] cursor-pointer transition-colors">
                      {edition.year === '2024' ? 'Web of Science Indexed' : 'SCOPUS Indexed'}
                      <ExternalLink className="h-3 w-3 ml-1 inline" />
                    </Badge>
                  </Link>
                </div>

                {/* Additional Events (if any) */}
                {edition.additionalEvents.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[#14213d] text-xl mb-4">Additional Events</h3>
                    <div className="flex flex-wrap gap-3">
                      {edition.additionalEvents.map((event, eventIndex) => (
                        <Badge key={eventIndex} variant="outline" className="border-[#14213d] text-[#14213d] text-sm px-3 py-1">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact & Website */}
                <div className="pt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4 text-[#FFCC5C]" />
                    <span className="text-sm">
                      <span className="font-semibold">Convenor:</span> {edition.convenor} | 
                      <a href={`mailto:${edition.email}`} className="text-[#FFCC5C] hover:underline ml-1">{edition.email}</a>
                    </span>
                  </div>
                  {edition.websiteUrl && (
                    <Link 
                      href={edition.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#14213d] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1a2844] transition-all hover:scale-105 text-sm"
                    >
                      <Globe className="h-4 w-4" />
                      Visit Conference Website
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/*
        <Card className="mt-12 bg-linear-to-r from-[#14213d] to-[#1a2844] text-white border-0 shadow-2xl">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-[#FFCC5C]">AdComSys 2026</span> - Coming Soon!
            </h2>
            <p className="text-gray-200 mb-6">
              Join us for the next edition on June 26-27, 2026
            </p>
            <Link 
              href="/call-for-papers" 
              className="inline-flex items-center gap-2 bg-[#FFCC5C] text-[#14213d] px-6 py-3 rounded-lg font-bold hover:bg-[#ff9800] transition-all hover:scale-105"
            >
              Submit Your Paper
              <ExternalLink className="h-5 w-5" />
            </Link>
          </CardContent>
        </Card>*/}
      </div>

      <Footer />
    </div>
  )
}
