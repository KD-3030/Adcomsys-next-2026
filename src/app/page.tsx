import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/layout/StructuredData'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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

            {/* Conference Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-navy text-center mb-2 sm:mb-3">
              AdComSys 2026
            </h1>

            {/* Conference Subtitle */}
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-[#FFCC5C] text-center mb-3 sm:mb-5 max-w-4xl px-2 sm:px-4 [text-shadow:_-1px_-1px_0_#14213d,_1px_-1px_0_#14213d,_-1px_1px_0_#14213d,_1px_1px_0_#14213d]">
              Third International Conference on Advanced Computing and Systems
            </h2>

            {/* Conference Dates */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#14213d] mb-3 sm:mb-5">
              26<sup>th</sup> & 27<sup>th</sup> June, 2026
            </p>

            {/* Location */}
            <div className="text-center mb-4 sm:mb-8 px-2">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#FFCC5C] mb-1 sm:mb-2 [text-shadow:_-1px_-1px_0_#14213d,_1px_-1px_0_#14213d,_-1px_1px_0_#14213d,_1px_1px_0_#14213d]">
                University of Engineering and Management, Kolkata
              </p>
              <p className="text-[#14213d]/80 text-xs sm:text-sm md:text-base lg:text-lg">
                University Area, Plot No. III-B/5, New Town, Action Area III, Kolkata, West Bengal 700160
              </p>

              <p className="text-[#14213d]/80 text-xs sm:text-sm md:text-base lg:text-lg">
                Organized by Department of CST, CSIT, CSE (Cybersecurity) and CSE (Network)
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 lg:gap-8 mb-4 sm:mb-8">
              <a href="/brochure.pd.pdf" download="AdComSys2026_Brochure.pdf">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="min-w-[160px] sm:min-w-[180px] border-2 border-[#14213d] text-[#14213d] bg-transparent hover:bg-[#14213d] hover:text-white font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300"
                >
                  Download Brochure
                </Button>
              </a>
              <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="min-w-[160px] sm:min-w-[180px] border-2 border-[#FFCC5C] text-[#14213d] bg-[#FFCC5C] hover:bg-brand-navy hover:text-[#FFCC5C] font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300"
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
              <p className="text-[#FFCC5C] font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                SCOPUS Indexed Lecture Notes in Networks and Systems by Springer
              </p>
              <p className="text-[#14213d]/50 text-xs sm:text-sm mt-1 italic">
                (approval awaited)
              </p>
            </div>
          </div>
        </section>

        {/* Kolkata Skyline Banner */}
        <section className="w-full bg-gradient-to-b from-[#ADD8E6] to-white">
          <div className="container mx-auto px-0">
            <Image
              src="/assets/images/kolkata-skyline.png"
              alt="Kolkata Skyline with UEM Building"
              width={1920}
              height={400}
              className="w-full h-auto object-contain"
              priority={false}
            />
          </div>
        </section>

        {/* About the Conference & Announcements Section - Side by Side */}
        <section className="py-10 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* About the Conference - Left */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#14213d] text-left mb-6">
                  About the Conference
                </h2>
                <div className="text-gray-700">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-justify">
                    The <strong>Third International Conference on Advanced Computing and Systems (AdComSys 2026)</strong> promotes a platform for exchanging ideas including spanning theory, practical implementations, and interdisciplinary applications, from generative AI, advanced computing, and IoT to bioinformatics and computational biology. Through peer‑reviewed paper presentations, tutorials, keynote and plenary sessions, and opportunities for networking among academia and industry, participants are encouraged to showcase novel work that addresses real‑world challenges while advancing scientific understanding.
                  </p>
                </div>
                <div className="text-left mt-6">
                  <Link href="/about">
                    <Button 
                      variant="outline"
                      className="border-2 border-[#14213d] text-white hover:bg-[#14213d] hover:text-white font-semibold text-base sm:text-lg px-8 py-4 transition-all duration-300"
                    >
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Announcements - Right */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#14213d] text-left mb-6">
                  Announcements
                </h2>
                <div className="bg-gray-50 rounded-lg shadow-lg border-l-4 border-[#fca311] p-6 sm:p-8 h-fit">
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-[#fca311] rounded-full mt-2 mr-3 shrink-0"></span>
                      <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                        The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
