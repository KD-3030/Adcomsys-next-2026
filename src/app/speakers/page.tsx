import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

export default function SpeakersPage() {
  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-[#fca311] to-transparent"></div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 text-center relative z-10">
          <Badge className="mb-4 sm:mb-6 bg-[#fca311] text-[#14213d] hover:bg-[#fca311]/90 text-sm sm:text-base px-3 sm:px-4 py-2">Coming Soon</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            Distinguished <span className="text-[#fca311]">Speakers</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-medium px-2">
            Learn from world-renowned experts and thought leaders
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-3 sm:px-4 py-10 sm:py-16 max-w-4xl">
        {/* Revealing Soon Card */}
        <Card className="shadow-2xl border-4 border-[#fca311] bg-white relative z-10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-[#14213d] to-[#fca311]"></div>
          <CardContent className="py-10 sm:py-16 lg:py-20 text-center px-4 sm:px-8 lg:px-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-6 sm:mb-8 bg-linear-to-br from-[#14213d] to-[#1a2844] rounded-full flex items-center justify-center shadow-xl ring-4 ring-[#fca311]/30">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fca311]">?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14213d] mb-4 sm:mb-6">
              Speakers Revealing Soon
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              We are in the process of finalizing our distinguished lineup of keynote speakers and industry experts. 
              The speaker details will be announced shortly.
            </p>
            <div className="bg-[#fca311]/10 border-l-4 border-[#fca311] p-4 sm:p-6 rounded-r-lg mb-6 sm:mb-8 text-left max-w-xl mx-auto">
              <p className="text-sm sm:text-base lg:text-lg text-gray-800 font-medium">
                Stay tuned for announcements featuring renowned researchers, industry leaders, and domain experts 
                who will share their insights on advanced computing and systems.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/registration">
                <Button size="lg" className="w-full sm:w-auto bg-[#fca311] hover:bg-[#ff9800] text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                  Register Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-[#14213d] text-[#14213d] hover:bg-[#14213d] hover:text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-lg transition-all">
                  Contact Us
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


