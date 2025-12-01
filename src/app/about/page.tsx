import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Users, Award, Globe, FileText } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { generateMetadata as createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = createMetadata({
  title: 'About AdComSys 2026',
  description: 'Learn about the Third International Conference on Advanced Computing and Systems organized by UEM Kolkata. Discover our mission, objectives, and conference themes.',
  path: '/about',
  keywords: ['AdComSys 2026', 'conference about', 'UEM Kolkata', 'computing conference', 'academic conference', 'research conference']
})

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-10 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-[#fca311] to-transparent"></div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Image
              src="/assets/logos/logo-3.png"
              alt="AdComSys 2026 Logo"
              width={160}
              height={160}
              className="w-20 h-auto sm:w-28 md:w-36 lg:w-44 object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 px-2">
            About <span className="text-[#fca311]">AdComSys 2026</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto px-2">
            Advancing Computing Systems Through Innovation and Collaboration
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-5xl">

        {/* About Conference */}
        <Card className="mb-8 border-l-4 border-[#fca311] shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white rounded-t-lg">
            <CardTitle className="text-xl sm:text-2xl">
              About the Conference
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-white-700 pt-6">
            <p className="leading-relaxed text-base sm:text-lg">
              The <strong className="text-white">Third International Conference on Advanced Computing and Systems (AdComSys 2026) </strong> 
              is a premier forum for researchers, academicians, and industry professionals to present their 
              latest research findings, exchange ideas, and explore emerging trends in advanced computing 
              and systems.
            </p>
            <p className="leading-relaxed text-base sm:text-lg">
              Building upon the success of previous editions, AdComSys 2026 aims to foster collaboration 
              and innovation in cutting-edge technologies including Artificial Intelligence, Machine Learning, 
              Internet of Things, Cloud Computing, Cybersecurity, and more.
            </p>
            <div className="bg-linear-to-br from-[#fca311] to-[#fca311] border-l-4 border-[#fca311] p-5 rounded-lg">
              <p className="font-semibold text-[#14213d] text-base sm:text-lg">
                All accepted papers will be published in <strong>Springers Lecture Notes in Networks and Systems (LNNS)</strong>, 
                which is indexed in SCOPUS, ensuring global visibility for your research.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* About UEM */}
        <Card className="mb-8 border-l-4 border-[#fca311] shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white rounded-t-lg">
            <CardTitle className="text-xl sm:text-2xl">
              About University of Engineering and Management (UEM)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-white-700 pt-6">
            <p className="leading-relaxed text-base sm:text-lg">
              The <strong className="text-white">University of Engineering and Management (UEM), Kolkata</strong> is a leading 
              institution committed to excellence in technical education, research, and innovation. 
              Established with a vision to nurture future engineers and technologists, UEM has consistently 
              maintained high academic standards and industry relevance.
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-linear-to-br from-[#fca311] to-[#fca311] p-6 rounded-lg text-white border-l-4 border-[#fca311]">
                <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#14213d]">
                  Our Mission
                </h3>
                <p className="text-base text-[#14213d] leading-relaxed">
                  To provide world-class technical education and foster research excellence that 
                  addresses real-world challenges and contributes to societal development.
                </p>
              </div>
              <div className="bg-linear-to-br from-[#fca311] to-[#ff9800] p-6 rounded-lg text-white border-l-4 border-[#14213d]">
                <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#14213d]">
                  Our Vision
                </h3>
                <p className="text-base text-[#14213d] leading-relaxed">
                  To be recognized globally as a center of excellence in engineering education, 
                  research, and innovation, producing graduates who lead technological advancement.
                </p>
              </div>
            </div>
            <p className="leading-relaxed text-base sm:text-lg">
              The Department of Computer Science & Technology (CST) and Computer Science & Information 
              Technology (CSIT) at UEM are at the forefront of cutting-edge research and education in 
              computing fields. Our faculty members are actively engaged in research across various domains, 
              and our students consistently excel in both academics and industry placements.
            </p>
          </CardContent>
        </Card>

        {/* Conference Highlights */}
        <Card className="mb-8 border-l-4 border-[#fca311] shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white rounded-t-lg">
            <CardTitle className="text-xl sm:text-2xl">
              Conference Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#fca311] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#fca311] transition-colors">Keynote speeches by renowned researchers and industry leaders</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#fca311] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#fca311] transition-colors">Technical paper presentations across multiple tracks</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#fca311] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#fca311] transition-colors">Panel discussions on emerging technologies</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#fca311] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#fca311] transition-colors">Networking opportunities with peers and experts</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#fca311] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#fca311] transition-colors">Publication in Springer LNNS (SCOPUS indexed)</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#fca311] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#fca311] transition-colors">Workshops and tutorials on latest technologies</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#fca311] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#fca311] transition-colors">Industry-academia collaboration opportunities</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#fca311] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#fca311] transition-colors">Best paper awards and recognition</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research Areas */}
        <Card className="mb-8 border-l-4 border-[#fca311] shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white rounded-t-lg">
            <CardTitle className="text-xl sm:text-2xl">
              Research Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {[
                'Artificial Intelligence',
                'Machine Learning',
                'Deep Learning',
                'Internet of Things (IoT)',
                'Cloud Computing',
                'Cybersecurity',
                'Blockchain Technology',
                'Big Data Analytics',
                'Computer Vision',
                'Natural Language Processing',
                'Edge Computing',
                'Quantum Computing',
                'Robotics & Automation',
                'Software Engineering',
                'Network Security',
                'Data Science',
                'Human-Computer Interaction',
                'Mobile Computing',
              ].map((area, index) => (
                <div key={index} className="bg-linear-to-br from-gray-50 to-gray-100 p-2 sm:p-3 rounded-lg text-center text-xs sm:text-sm md:text-base font-medium text-gray-700 hover:bg-linear-to-br hover:from-[#fca311] hover:to-[#fca311] hover:border-[#fca311] border border-gray-200 transition-all duration-300 hover:shadow-md cursor-pointer">
                  {area}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white border-0 shadow-2xl">
          <CardContent className="py-8 sm:py-12 text-center px-4 sm:px-6">
            <Award className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-[#fca311]" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Join Us at AdComSys 2026</h2>
            <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto">
              Be part of this exciting conference and contribute to the advancement of computing and systems.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-[#fca311] hover:bg-white text-[#14213d] border-0 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                  <Users className="mr-2 h-5 w-5" />
                  Register Now
                </Button>
              </Link>
              <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
                <Button size="lg" variant="outline" className="bg-[#fca311] text-[#14213d] border-2 border-[#14213d] hover:bg-white w-full sm:w-auto">
                  <FileText className="mr-2 h-5 w-5" />
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
