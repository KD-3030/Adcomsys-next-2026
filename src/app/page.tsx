import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, MapPin, Users, FileText, Award, Mail } from 'lucide-react'
import HeroVideo from '@/components/layout/HeroVideo'
import { StructuredData } from '@/components/layout/StructuredData'
import Navbar from '@/components/layout/Navbar'

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Marquee Announcement Bar */}
      <div className="bg-brand-orange border-b-2 border-brand-navy overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2">
          <span className="text-brand-navy font-bold text-sm sm:text-base md:text-lg px-4">
            🎉 AdComSys 2026 will be organized by University of Engineering and Management, Kolkata on 26th & 27th JUNE 2026 🎉
          </span>
          <span className="text-brand-navy font-bold text-sm sm:text-base md:text-lg px-4">
            🎉 AdComSys 2026 will be organized by University of Engineering and Management, Kolkata on 26th & 27th JUNE 2026 🎉
          </span>
          <span className="text-brand-navy font-bold text-sm sm:text-base md:text-lg px-4">
            🎉 AdComSys 2026 will be organized by University of Engineering and Management, Kolkata on 26th & 27th JUNE 2026 🎉
          </span>
        </div>
      </div>

      {/* Hero Section - Fits in viewport */}
      <section className="relative h-[calc(100vh-116px)] flex items-center px-4 bg-linear-to-br from-brand-navy via-brand-navy to-brand-black overflow-hidden">
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-orange rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-orange rounded-full blur-2xl"></div>
        </div>

        {/* Background Media - Video on Desktop, Image on Mobile */}
        <div className="absolute inset-0 opacity-100">
          {/* Video for Desktop/Tablet - Hidden on Mobile */}
          <HeroVideo />
          {/* Image for Mobile - Better Performance with Next.js Image */}
          <Image 
            src="/assets/images/conference-bg.jpg" 
            alt="Conference Background"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 0px"
            className="md:hidden object-cover"
          />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Column - Main Content */}
            <div className="text-center lg:text-left space-y-2 sm:space-y-3 md:space-y-4">
              
              <div>
              <Image
                src="/assets/logos/logo-3.png"
                alt="AdComSys Conference Logo"
                width={200}
                height={200}
                quality={75}
                loading="lazy"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mx-auto lg:mx-0"
              />
        

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white drop-shadow-2xl leading-tight" style={{ fontFamily: '"Faculty Glyphic", sans-serif' }}>
                AdComSys 2026
              </h1>
              
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-base md:text-lg text-brand-white font-medium">
                  Third International Conference on
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-brand-orange drop-shadow-xl">
                  Advanced Computing and Systems
                </p>
              </div>
              
              <p className="text-xs sm:text-sm text-brand-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Organized by Department of CST & CSIT<br />
                <span className="font-semibold text-brand-orange">University of Engineering and Management, Kolkata</span>
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 sm:pt-2 justify-center lg:justify-start">
                <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
                  <Button size="lg" className="w-full sm:w-auto border-2 border-brand-orange text-brand-navy hover:bg-brand-black hover:text-brand-white shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold">
                    <FileText className="mr-2 h-4 w-4" />
                    Submit Paper
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-brand-orange text-brand-white hover:bg-brand-orange hover:text-brand-navy shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold">
                    <Users className="mr-2 h-4 w-4" />
                    Register Now
                  </Button>
                </Link>
              </div>
            </div>
            </div>

            {/* Right Column - Image/Visual or Info Cards */}
            <div className="hidden lg:block space-y-4">
              {/* Option 2: Info Cards (Current) */}
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-white/10 backdrop-blur-md border-2 border-brand-orange/40 hover:border-brand-orange hover:bg-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/30">
                  <CardContent className="p-6 sm:p-8 flex items-center gap-5">
                    <CalendarDays className="h-12 w-12 sm:h-14 sm:w-14 text-brand-orange shrink-0" />
                    <div className="text-left">
                      <h3 className="font-bold text-base sm:text-lg lg:text-xl text-brand-white">Conference Dates</h3>
                      <p className="text-brand-white/90 text-sm sm:text-base font-semibold">June 26-27, 2026</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-2 border-brand-orange/40 hover:border-brand-orange hover:bg-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/30">
                  <CardContent className="p-6 sm:p-8 flex items-center gap-5">
                    <MapPin className="h-12 w-12 sm:h-14 sm:w-14 text-brand-orange shrink-0" />
                    <div className="text-left">
                      <h3 className="font-bold text-base sm:text-lg lg:text-xl text-brand-white">Location</h3>
                      <p className="text-brand-white/90 text-sm sm:text-base font-semibold">UEM Kolkata, India</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-2 border-brand-orange/40 hover:border-brand-orange hover:bg-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/30">
                  <CardContent className="p-6 sm:p-8 flex items-center gap-5">
                    <Award className="h-12 w-12 sm:h-14 sm:w-14 text-brand-orange shrink-0" />
                    <div className="text-left">
                      <h3 className="font-bold text-base sm:text-lg lg:text-xl text-brand-white">Publication</h3>
                      <p className="text-brand-white/90 text-sm sm:text-base font-semibold">Springer LNNS (SCOPUS)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden bg-linear-to-br from-slate-50 via-white to-blue-50/30">
        {/* Subtle Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #14213d 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 text-brand-navy">
            About the Conference
          </h2>
          <Card className="border-3 border-brand-orange/30 hover:border-brand-orange transition-all duration-300 shadow-2xl hover:shadow-3xl bg-white">
            <CardHeader className="bg-linear-to-r from-brand-navy via-brand-navy to-brand-black text-white p-6 sm:p-8">
              <CardTitle className="text-brand-orange text-2xl sm:text-3xl font-bold">Welcome to AdComSys 2026</CardTitle>
              <CardDescription className="text-brand-white/90 text-base sm:text-lg mt-2">
                Third International Conference on Advanced Computing and Systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 text-gray-800 pt-6 sm:pt-8 p-6 sm:p-8 bg-white">
              <p className="text-base sm:text-lg leading-relaxed">
                AdComSys 2026 is the <span className="font-bold text-brand-navy">third edition</span> of the International Conference on Advanced 
                Computing and Systems, organized by the Department of Computer Science & Technology 
                and Computer Science & Information Technology at the <span className="font-bold text-brand-orange">University of Engineering and 
                Management, Kolkata</span>.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                The conference aims to bring together researchers, academicians, and industry 
                professionals to share their latest findings and innovations in the field of 
                advanced computing and systems.
              </p>
              <div className="bg-linear-to-r from-brand-orange/10 to-brand-orange/5 p-4 sm:p-6 rounded-xl border-l-4 border-brand-orange shadow-md">
                <p className="font-bold text-base sm:text-lg text-brand-navy flex items-start gap-3">
                  <Award className="h-6 w-6 text-brand-orange shrink-0 mt-1" />
                  <span>All accepted papers will be published in <span className="text-brand-orange">SCOPUS Indexed Lecture Notes in Networks 
                  and Systems by Springer</span>.</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Springer Publication Card */}
          <Card className="mt-8 border-3 border-brand-orange/40 hover:border-brand-orange transition-all duration-300 shadow-xl hover:shadow-2xl bg-brand-orange/5">
            <CardContent className="p-6 sm:p-8 text-center">
              <p className="text-lg sm:text-xl lg:text-2xl text-brand-navy font-medium leading-relaxed">
                All registered and presented papers will be published by the <span className="font-bold text-brand-orange">SCOPUS Indexed Lecture Notes in Networks and Systems</span>.
              </p>
              <a 
                href="https://www.springer.com/series/15179" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-4 text-brand-orange hover:text-brand-navy font-semibold text-base sm:text-lg underline underline-offset-4 transition-colors duration-200"
              >
                https://www.springer.com/series/15179
              </a>
              <p className="mt-2 text-sm sm:text-base text-gray-600 italic">(approval awaited)</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Dates Section */}
      <section id="dates" className="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden">
        {/* Elegant Background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-slate-50 to-white"></div>
        <div className="absolute inset-0 opacity-[0]" style={{
          backgroundImage: `linear-gradient(30deg, rgb(20, 33, 61) 12%, transparent 12.5%, transparent 87%, rgb(20, 33, 61) 87.5%, rgb(20, 33, 61)), linear-gradient(150deg, rgb(20, 33, 61) 12%, transparent 12.5%, transparent 87%, rgb(20, 33, 61) 87.5%, rgb(20, 33, 61))`,
          backgroundSize: '80px 140px'
        }}></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 text-brand-navy">
            Important Dates
          </h2>
          <p className="text-center text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Mark your calendar with these crucial deadlines for AdComSys 2026
          </p>
          <Card className="border-3 border-brand-navy/30 shadow-2xl bg-white">
            <CardContent className="pt-6 sm:pt-8 p-4 sm:p-8">
              <div className="space-y-3 sm:space-y-4">
                {[
                  { event: 'Paper Submission Open', date: 'December 15, 2025', icon: '📝', color: 'from-blue-50 to-blue-100/50' },
                  { event: 'Paper Submission Deadline', date: 'March 10, 2026', icon: '⏰', color: 'from-red-50 to-red-100/50', highlight: true },
                  { event: 'Acceptance Notification', date: 'May 10, 2026', icon: '✅', color: 'from-green-50 to-green-100/50' },
                  { event: 'Early Bird Registration', date: 'May 25, 2026', icon: '🎟️', color: 'from-purple-50 to-purple-100/50', highlight: true },
                  { event: 'Last Date of Registration', date: 'June 5, 2026', icon: '🚨', color: 'from-orange-50 to-orange-100/50' },
                  { event: 'Final Camera Ready Paper', date: 'June 15, 2026', icon: '📄', color: 'from-yellow-50 to-yellow-100/50' },
                  { event: 'Conference Dates', date: 'June 26-27, 2026', icon: '🎉', color: 'from-brand-orange/10 to-brand-navy/10', highlight: true },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-linear-to-r ${item.color} rounded-xl border-l-4 ${item.highlight ? 'border-brand-orange shadow-lg' : 'border-brand-navy/30'} hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl sm:text-3xl shrink-0">{item.icon}</span>
                      <span className={`font-bold ${item.highlight ? 'text-brand-navy text-lg sm:text-xl' : 'text-gray-800 text-base sm:text-lg'}`}>
                        {item.event}
                      </span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${item.highlight ? 'border-2 border-brand-orange bg-brand-orange/20 text-brand-navy font-bold' : 'border-brand-navy/30 bg-white text-gray-700'} text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 whitespace-nowrap`}
                    >
                      {item.date}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Submission Section */}
      <section id="submission" className="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden">
        {/* Elegant Background */}
        <div className="absolute inset-0 bg-linear-to-tr from-slate-50 via-white to-orange-50/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-navy/5 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 text-brand-navy">
            Paper Submission
          </h2>
          <p className="text-center text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Share your innovative research with the global academic community
          </p>
          <Card className="border-3 border-brand-orange/30 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white">
            <CardHeader className="bg-linear-to-r from-brand-orange/10 via-brand-orange/5 to-brand-navy/10 p-6 sm:p-8">
              <CardTitle className="text-brand-navy text-2xl sm:text-3xl font-bold">Submit Your Research</CardTitle>
              <CardDescription className="text-gray-700 text-base sm:text-lg mt-2">
                Share your latest findings in advanced computing and systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 p-6 sm:p-8">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                We invite submissions of <span className="font-bold text-brand-navy">original research papers</span>, case studies, and review articles 
                in all areas of advanced computing and systems.
              </p>
              <div className="bg-linear-to-br from-brand-navy/10 via-white to-brand-orange/10 p-6 sm:p-8 rounded-xl border-l-4 border-brand-orange shadow-md">
                <h4 className="font-bold mb-4 text-brand-navy text-lg sm:text-xl flex items-center gap-2">
                  <FileText className="h-6 w-6 text-brand-orange" />
                  Submission Guidelines:
                </h4>
                <ul className="space-y-3">
                  {[
                    'Submit through Microsoft CMT portal',
                    'Papers must be original and not submitted elsewhere',
                    'Follow Springer LNNS format',
                    'Maximum 10 pages including references'
                  ].map((guideline, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-800 text-base sm:text-lg">
                      <span className="text-brand-orange font-bold text-xl shrink-0">•</span>
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center pt-4 sm:pt-6">
                <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
                  <Button size="lg" className="w-full sm:w-auto bg-brand-orange text-brand-navy hover:bg-brand-orange/90 shadow-2xl hover:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-105 font-bold text-base sm:text-lg py-6 px-8">
                    <FileText className="mr-2 h-5 w-5" />
                    Submit via CMT Portal
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden">
        {/* Modern Background */}
        <div className="absolute inset-0 bg-linear-to-bl from-slate-50 via-blue-50/30 to-white"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/3 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 text-brand-navy">
            Contact Us
          </h2>
          <Card className="border-3 border-brand-navy/30 shadow-2xl bg-white">
            <CardContent className="pt-6 sm:pt-8 p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-linear-to-br from-brand-orange/10 to-brand-orange/5 p-6 sm:p-8 rounded-xl border-l-4 border-brand-orange shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <h3 className="font-bold text-xl sm:text-2xl mb-4 flex items-center text-brand-navy gap-3">
                    <Mail className="h-7 w-7 text-brand-orange shrink-0" />
                    Email
                  </h3>
                  <a 
                    href="mailto:adcomsys@uem.edu.in" 
                    className="text-brand-orange hover:text-brand-navy transition-colors duration-200 font-semibold text-base sm:text-lg break-all"
                  >
                    adcomsys@uem.edu.in
                  </a>
                </div>
                <div className="bg-linear-to-br from-brand-navy/10 to-brand-navy/5 p-6 sm:p-8 rounded-xl border-l-4 border-brand-navy shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <h3 className="font-bold text-xl sm:text-2xl mb-4 flex items-center text-brand-navy gap-3">
                    <MapPin className="h-7 w-7 text-brand-orange shrink-0" />
                    Location
                  </h3>
                  <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                    <span className="font-semibold">University of Engineering and Management</span><br />
                    Kolkata, India
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-linear-to-r from-brand-black via-brand-navy to-brand-black text-white py-12 sm:py-16 px-4 border-t-4 border-brand-orange">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-orange mb-4">AdComSys 2026</h2>
          <p className="mb-2 text-brand-white/90 text-sm sm:text-base">© 2025 AdComSys 2026. All rights reserved.</p>
          <p className="text-brand-white/80 text-xs sm:text-sm max-w-2xl mx-auto mb-6">
            Organized by Department of CST & CSIT, University of Engineering and Management, Kolkata
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {[
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
              { href: '/committee', label: 'Committee' },
              { href: '/registration', label: 'Registration' }
            ].map((link, index) => (
              <Link 
                key={index}
                href={link.href} 
                className="text-brand-white/90 hover:text-brand-orange transition-colors duration-200 font-medium text-sm sm:text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}
