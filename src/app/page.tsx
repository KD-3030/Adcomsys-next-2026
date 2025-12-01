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
        <section className="min-h-[calc(100vh-80px)] bg-[#ADD8E6] flex flex-col items-center px-3 sm:px-4 py-4 sm:py-6">
          
          {/* Top Logos Row - All five logos in a line */}
          <div className="flex items-center justify-center gap-4 sm:gap-10 lg:gap-16 mt-2 sm:mt-4 mb-4 sm:mb-8">
            <Image
              src="/assets/logos/logo-2.png"
              alt="Partner Logo"
              width={140}
              height={140}
              priority
              className="w-14 h-auto sm:w-24 md:w-28 lg:w-32 object-contain"
            />
            <Image
              src="/assets/logos/logo-3.png"
              alt="AdComSys Logo"
              width={160}
              height={160}
              priority
              className="w-20 h-auto sm:w-32 md:w-36 lg:w-44 object-contain"
            />
            <Image
              src="/assets/logos/logo-4.png"
              alt="Partner Logo"
              width={140}
              height={140}
              priority
              className="w-14 h-auto sm:w-24 md:w-28 lg:w-32 object-contain"
            />
          </div>

          {/* Main Content - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Presents Line */}
            <p className="text-[#14213d]/90 text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 px-2 text-center">
              Department of CST & CSIT, UEM Kolkata Presents 3<sup>rd</sup> edition of
            </p>

            {/* Conference Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-navy text-center mb-2 sm:mb-3">
              AdComSys 2026
            </h1>

            {/* Conference Subtitle */}
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-[#fca311] text-center mb-3 sm:mb-5 max-w-4xl px-2 sm:px-4">
              Third International Conference on Advanced Computing and Systems
            </h2>

            {/* Conference Dates */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#14213d] mb-3 sm:mb-5">
              26<sup>th</sup> & 27<sup>th</sup> June, 2026
            </p>

            {/* Location */}
            <div className="text-center mb-4 sm:mb-8 px-2">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#fca311] mb-1 sm:mb-2">
                University of Engineering and Management, Kolkata
              </p>
              <p className="text-[#14213d]/80 text-xs sm:text-sm md:text-base lg:text-lg">
                University Area, Plot No. III-B/5, New Town, Action Area III, Kolkata, West Bengal 700160
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 lg:gap-8 mb-4 sm:mb-8">
              <Link href="/registration">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="min-w-[160px] sm:min-w-[180px] border-2 border-white text-[#14213d] bg-white hover:bg-transparent hover:text-white font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300"
                >
                  Register Now
                </Button>
              </Link>
              <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="min-w-[160px] sm:min-w-[180px] border-2 border-[#fca311] text-[#14213d] bg-[#fca311] hover:bg-transparent hover:text-[#fca311] font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300"
                >
                  Submit Your Paper
                </Button>
              </Link>
            </div>

            {/* Publication Info */}
            <div className="text-center px-2">
              <p className="text-[#14213d]/70 text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">
                All accepted papers will be published in
              </p>
              <p className="text-[#fca311] font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                SCOPUS Indexed Lecture Notes in Networks and Systems by Springer
              </p>
              <p className="text-[#14213d]/50 text-xs sm:text-sm mt-1 italic">
                (approval awaited)
              </p>
            </div>
          </div>
        </section>

        {/* About the Conference Section */}
        <section className="py-10 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#14213d] text-center mb-6 sm:mb-10">
              About the Conference
            </h2>
            <div className="space-y-4 sm:space-y-6 text-gray-700">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-justify">
                The <strong className="text-[#14213d]">Third International Conference on Advanced Computing and Systems (AdComSys 2026)</strong> is a premier forum for researchers, academicians, and industry professionals to present their latest research findings, exchange ideas, and explore emerging trends in advanced computing and systems.
              </p>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-justify">
                Building upon the success of previous editions, AdComSys 2026 aims to foster collaboration and innovation in cutting-edge technologies including Artificial Intelligence, Machine Learning, Internet of Things, Cloud Computing, Cybersecurity, and more.
              </p>
              <div className="bg-[#14213d] text-white p-6 sm:p-8 rounded-lg mt-8">
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-center">
                  All accepted papers will be published in <strong className="text-[#fca311]">Springer&apos;s Lecture Notes in Networks and Systems (LNNS)</strong>, which is indexed in SCOPUS, ensuring global visibility for your research.
                </p>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link href="/about">
                <Button 
                  variant="outline"
                  className="border-2 border-[#14213d] text-[#14213d] hover:bg-[#14213d] hover:text-white font-semibold text-base sm:text-lg px-8 py-4 transition-all duration-300"
                >
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
