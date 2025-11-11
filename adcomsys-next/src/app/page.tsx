import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, MapPin, Users, FileText, Award, Mail, Menu } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className="bg-brand-navy border-b-4 border-brand-orange sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-orange">AdComSys 2026</h1>
              <Badge className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90 text-xs sm:text-sm px-2 py-0.5">3rd Edition</Badge>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              <Link href="/about" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">About</Link>
              <Link href="/committee" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Committee</Link>
              <Link href="/call-for-papers" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Call for Papers</Link>
              <Link href="/speakers" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Speakers</Link>
              <Link href="/technical-program" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Program</Link>
              <Link href="/registration" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Registration</Link>
              <Link href="/contact" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Contact</Link>
            </div>
            
            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="border-2 border-brand-orange text-brand-white hover:bg-brand-orange hover:text-brand-navy transition-all duration-200">Login</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200">Register</Button>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-brand-white hover:text-brand-orange transition-colors duration-200">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-black overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-brand-orange rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-brand-orange text-brand-navy hover:bg-brand-orange/90 text-sm sm:text-base md:text-lg px-4 sm:px-6 py-1.5 sm:py-2 font-bold animate-pulse">
            📅 June 25-26, 2026
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
            AdComSys 2026
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-brand-white mb-3 sm:mb-4 font-medium">
            Third International Conference on
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-orange mb-6 sm:mb-8 drop-shadow-xl">
            Advanced Computing and Systems
          </p>
          <p className="text-base sm:text-lg md:text-xl text-brand-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Organized by Department of CST & CSIT<br />
            <span className="font-semibold text-brand-orange">University of Engineering and Management, Kolkata</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12 sm:mb-16 px-4">
            <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg bg-brand-orange text-brand-navy hover:bg-brand-orange/90 shadow-2xl hover:shadow-brand-orange/50 transition-all duration-300 transform hover:scale-105 font-bold py-6 px-8">
                <FileText className="mr-2 h-5 w-5" />
                Submit Paper
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg border-3 border-brand-orange text-brand-white hover:bg-brand-orange hover:text-brand-navy shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold py-6 px-8">
                <Users className="mr-2 h-5 w-5" />
                Register Now
              </Button>
            </Link>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
            <Card className="bg-white/10 backdrop-blur-md border-2 border-brand-orange/40 hover:border-brand-orange hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-orange/30 transform hover:-translate-y-1">
              <CardContent className="pt-6 pb-6">
                <CalendarDays className="h-10 w-10 sm:h-12 sm:w-12 text-brand-orange mx-auto mb-4" />
                <h3 className="font-bold text-lg sm:text-xl mb-2 text-brand-white">Conference Dates</h3>
                <p className="text-brand-white/90 text-base sm:text-lg font-semibold">June 25-26, 2026</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-2 border-brand-orange/40 hover:border-brand-orange hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-orange/30 transform hover:-translate-y-1">
              <CardContent className="pt-6 pb-6">
                <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-brand-orange mx-auto mb-4" />
                <h3 className="font-bold text-lg sm:text-xl mb-2 text-brand-white">Location</h3>
                <p className="text-brand-white/90 text-base sm:text-lg font-semibold">UEM Kolkata, India</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-2 border-brand-orange/40 hover:border-brand-orange hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-orange/30 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <CardContent className="pt-6 pb-6">
                <Award className="h-10 w-10 sm:h-12 sm:w-12 text-brand-orange mx-auto mb-4" />
                <h3 className="font-bold text-lg sm:text-xl mb-2 text-brand-white">Publication</h3>
                <p className="text-brand-white/90 text-base sm:text-lg font-semibold">Springer LNNS (SCOPUS)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-[#fafafa] to-brand-gray/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 text-brand-navy">
            About the Conference
          </h2>
          <Card className="border-3 border-brand-orange/30 hover:border-brand-orange transition-all duration-300 shadow-2xl hover:shadow-3xl bg-white">
            <CardHeader className="bg-gradient-to-r from-brand-navy via-brand-navy to-brand-black text-white p-6 sm:p-8">
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
              <div className="bg-gradient-to-r from-brand-orange/10 to-brand-orange/5 p-4 sm:p-6 rounded-xl border-l-4 border-brand-orange shadow-md">
                <p className="font-bold text-base sm:text-lg text-brand-navy flex items-start gap-3">
                  <Award className="h-6 w-6 text-brand-orange flex-shrink-0 mt-1" />
                  <span>All accepted papers will be published in <span className="text-brand-orange">SCOPUS Indexed Lecture Notes in Networks 
                  and Systems by Springer</span>.</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Dates Section */}
      <section id="dates" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-brand-gray/20 to-[#fafafa]">
        <div className="container mx-auto max-w-6xl">
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
                  { event: 'Conference Dates', date: 'June 25-26, 2026', icon: '🎉', color: 'from-brand-orange/10 to-brand-navy/10', highlight: true },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r ${item.color} rounded-xl border-l-4 ${item.highlight ? 'border-brand-orange shadow-lg' : 'border-brand-navy/30'} hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl sm:text-3xl flex-shrink-0">{item.icon}</span>
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
      <section id="submission" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-[#fafafa] to-brand-gray/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 text-brand-navy">
            Paper Submission
          </h2>
          <p className="text-center text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Share your innovative research with the global academic community
          </p>
          <Card className="border-3 border-brand-orange/30 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white">
            <CardHeader className="bg-gradient-to-r from-brand-orange/10 via-brand-orange/5 to-brand-navy/10 p-6 sm:p-8">
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
              <div className="bg-gradient-to-br from-brand-navy/10 via-white to-brand-orange/10 p-6 sm:p-8 rounded-xl border-l-4 border-brand-orange shadow-md">
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
                      <span className="text-brand-orange font-bold text-xl flex-shrink-0">•</span>
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
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-brand-gray/20 to-[#fafafa]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 text-brand-navy">
            Contact Us
          </h2>
          <Card className="border-3 border-brand-navy/30 shadow-2xl bg-white">
            <CardContent className="pt-6 sm:pt-8 p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 p-6 sm:p-8 rounded-xl border-l-4 border-brand-orange shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <h3 className="font-bold text-xl sm:text-2xl mb-4 flex items-center text-brand-navy gap-3">
                    <Mail className="h-7 w-7 text-brand-orange flex-shrink-0" />
                    Email
                  </h3>
                  <a 
                    href="mailto:adcomsys@uem.edu.in" 
                    className="text-brand-orange hover:text-brand-navy transition-colors duration-200 font-semibold text-base sm:text-lg break-all"
                  >
                    adcomsys@uem.edu.in
                  </a>
                </div>
                <div className="bg-gradient-to-br from-brand-navy/10 to-brand-navy/5 p-6 sm:p-8 rounded-xl border-l-4 border-brand-navy shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <h3 className="font-bold text-xl sm:text-2xl mb-4 flex items-center text-brand-navy gap-3">
                    <MapPin className="h-7 w-7 text-brand-orange flex-shrink-0" />
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
      <footer className="bg-gradient-to-r from-brand-black via-brand-navy to-brand-black text-white py-12 sm:py-16 px-4 border-t-4 border-brand-orange">
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
  )
}
