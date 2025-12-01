import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/layout/StructuredData'
import Navbar from '@/components/layout/Navbar'

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section - Full viewport, solid navy background */}
        <section className="h-[calc(100vh-80px)] bg-[#ADD8E6] flex flex-col items-center px-4 py-6">
          
          {/* Top Logos Row - All five logos in a line */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 lg:gap-16 mt-4 mb-8">
            <Image
              src="/assets/logos/logo-2.png"
              alt="Partner Logo"
              width={140}
              height={140}
              priority
              className="w-20 h-auto sm:w-28 lg:w-32 object-contain"
            />
            <Image
              src="/assets/logos/logo-3.png"
              alt="AdComSys Logo"
              width={160}
              height={160}
              priority
              className="w-28 h-auto sm:w-36 lg:w-44 object-contain"
            />
            <Image
              src="/assets/logos/logo-4.png"
              alt="Partner Logo"
              width={140}
              height={140}
              priority
              className="w-20 h-auto sm:w-28 lg:w-32 object-contain"
            />
          </div>

          {/* Main Content - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Presents Line */}
            <p className="text-[#14213d]/90 text-sm sm:text-base mb-2">
              Department of CST & CSIT, UEM Kolkata Presents 3<sup>rd</sup> edition of
            </p>

            {/* Conference Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy text-center mb-2">
              AdComSys 2026
            </h1>

            {/* Conference Subtitle */}
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#fca311] text-center mb-4 max-w-3xl px-4">
              Third International Conference on Advanced Computing and Systems
            </h2>

            {/* Conference Dates */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#14213d] mb-4">
              26<sup>th</sup> & 27<sup>th</sup> June, 2026
            </p>

            {/* Location */}
            <div className="text-center mb-6">
              <p className="text-base sm:text-lg font-semibold text-[#fca311] mb-1">
                University of Engineering and Management, Kolkata
              </p>
              <p className="text-[#14213d]/80 text-xs sm:text-sm">
                University Area, Plot No. III-B/5, New Town, Action Area III, Kolkata, West Bengal 700160
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6">
              <Link href="/registration">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="min-w-[160px] border-2 border-white text-[#14213d] bg-white hover:bg-transparent hover:text-white font-semibold text-sm sm:text-base px-6 py-5 transition-all duration-300"
                >
                  Register Now
                </Button>
              </Link>
              <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="min-w-[160px] border-2 border-[#fca311] text-[#14213d] bg-[#fca311] hover:bg-transparent hover:text-[#fca311] font-semibold text-sm sm:text-base px-6 py-5 transition-all duration-300"
                >
                  Submit Your Paper
                </Button>
              </Link>
            </div>

            {/* Publication Info */}
            <div className="text-center">
              <p className="text-[#14213d]/70 text-xs sm:text-sm mb-1">
                All accepted papers will be published in
              </p>
              <p className="text-[#fca311] font-semibold text-sm sm:text-base">
                SCOPUS Indexed Lecture Notes in Networks and Systems by Springer
              </p>
              <p className="text-[#14213d]/50 text-xs mt-0.5 italic">
                (approval awaited)
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
