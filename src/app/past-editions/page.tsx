import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, FileText, ExternalLink } from 'lucide-react'
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
    date: 'June 26-27, 2025',
    location: 'G H Raisoni College of Engineering, Nagpur, India',
    theme: 'Advances in Computing & Systems',
    papers: '150+',
    participants: '300+',
    publication: 'Springer LNNS',
    color: 'blue'
  },
  {
    year: '2024',
    title: 'AdComSys 2024',
    date: 'June 2024',
    location: 'G H Raisoni College of Engineering, Nagpur, India',
    theme: 'Advances in Computing & Systems',
    papers: '120+',
    participants: '250+',
    publication: 'Springer LNNS',
    color: 'green'
  }
]

export default function PastEditionsPage() {
  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-20 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-[#fca311] to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[#fca311] backdrop-blur-sm p-5 rounded-full ring-4 ring-[#fca311]/30 shadow-xl">
              <Calendar className="h-14 w-14 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6">
            Past <span className="text-[#fca311]">Editions</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium">
            Explore the rich history and achievements of AdComSys conferences
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="space-y-8">
          {pastEditions.map((edition, index) => (
            <Card key={index} className="shadow-2xl border-l-4 border-[#fca311] bg-white hover:shadow-3xl transition-all">
              <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <span className="text-[#fca311]">{edition.title}</span>
                  </CardTitle>
                  <Badge className="bg-[#fca311] text-[#14213d] text-lg px-4 py-1">
                    {edition.year}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="h-5 w-5 text-[#fca311]" />
                    <span className="font-medium">{edition.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="h-5 w-5 text-[#fca311]" />
                    <span className="font-medium">{edition.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="h-5 w-5 text-[#fca311]" />
                    <span className="font-medium">{edition.participants} Participants</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FileText className="h-5 w-5 text-[#fca311]" />
                    <span className="font-medium">{edition.papers} Papers Published</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-gray-600">
                    <span className="font-semibold text-[#14213d]">Theme:</span> {edition.theme}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-semibold text-[#14213d]">Publication:</span> {edition.publication}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <Card className="mt-12 bg-linear-to-r from-[#14213d] to-[#1a2844] text-white border-0 shadow-2xl">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-[#fca311]">AdComSys 2026</span> - Coming Soon!
            </h2>
            <p className="text-gray-200 mb-6">
              Join us for the next edition on June 26-27, 2026
            </p>
            <Link 
              href="/call-for-papers" 
              className="inline-flex items-center gap-2 bg-[#fca311] text-[#14213d] px-6 py-3 rounded-lg font-bold hover:bg-[#ff9800] transition-all hover:scale-105"
            >
              Submit Your Paper
              <ExternalLink className="h-5 w-5" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
