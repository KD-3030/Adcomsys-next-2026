import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { generateMetadata as createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = createMetadata({
  title: 'Technical Program & Schedule',
  description: 'View the complete technical program schedule for AdComSys 2026. Three days of keynote sessions, paper presentations, workshops, and panel discussions.',
  path: '/technical-program',
  keywords: ['technical program', 'conference schedule', 'AdComSys 2026', 'paper presentations', 'workshops', 'keynote sessions']
})

export default function TechnicalProgramPage() {
  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-[#FFCC5C] to-transparent"></div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 text-center relative z-10">
          <Badge className="mb-4 sm:mb-6 bg-[#FFCC5C] text-[#14213d] hover:bg-[#FFCC5C]/90 text-sm sm:text-base px-3 sm:px-4 py-2">Coming Soon</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            Technical <span className="text-[#FFCC5C]">Program</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-medium px-2">
            Three days of keynotes, paper presentations, workshops, and networking
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-3 sm:px-4 py-10 sm:py-16 max-w-4xl">
        {/* Revealing Soon Card */}
        <Card className="shadow-2xl border-4 border-[#FFCC5C] bg-white relative z-10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-[#14213d] to-[#FFCC5C]"></div>
          <CardContent className="py-10 sm:py-16 lg:py-20 text-center px-4 sm:px-8 lg:px-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-6 sm:mb-8 bg-linear-to-br from-[#14213d] to-[#1a2844] rounded-full flex items-center justify-center shadow-xl ring-4 ring-[#FFCC5C]/30">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFCC5C]">?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14213d] mb-6 sm:mb-8">
              Program Schedule Revealing Soon
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/registration">
                <Button size="lg" className="w-full sm:w-auto bg-[#FFCC5C] hover:bg-[#ff9800] text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                  Register Now
                </Button>
              </Link>
              <Link href="/call-for-papers">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-[#14213d] text-[#14213d] hover:bg-[#14213d] hover:text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-lg transition-all">
                  Submit Paper
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}

