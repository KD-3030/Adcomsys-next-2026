import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Building2, Users, Award, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-blue-600">AdComSys 2026</h1>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About AdComSys 2026</h1>

        {/* About Conference */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-6 w-6 text-blue-600" />
              About the Conference
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              The <strong>Third International Conference on Advanced Computing and Systems (AdComSys 2026)</strong> 
              is a premier forum for researchers, academicians, and industry professionals to present their 
              latest research findings, exchange ideas, and explore emerging trends in advanced computing 
              and systems.
            </p>
            <p>
              Building upon the success of previous editions, AdComSys 2026 aims to foster collaboration 
              and innovation in cutting-edge technologies including Artificial Intelligence, Machine Learning, 
              Internet of Things, Cloud Computing, Cybersecurity, and more.
            </p>
            <p className="bg-blue-50 p-4 rounded-lg font-semibold text-blue-900">
              All accepted papers will be published in <strong>Springer's Lecture Notes in Networks and Systems (LNNS)</strong>, 
              which is indexed in SCOPUS, ensuring global visibility for your research.
            </p>
          </CardContent>
        </Card>

        {/* About UEM */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-6 w-6 text-blue-600" />
              About University of Engineering and Management (UEM)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              The <strong>University of Engineering and Management (UEM), Kolkata</strong> is a leading 
              institution committed to excellence in technical education, research, and innovation. 
              Established with a vision to nurture future engineers and technologists, UEM has consistently 
              maintained high academic standards and industry relevance.
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-blue-900">Our Mission</h3>
                <p className="text-sm text-gray-700">
                  To provide world-class technical education and foster research excellence that 
                  addresses real-world challenges and contributes to societal development.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-green-900">Our Vision</h3>
                <p className="text-sm text-gray-700">
                  To be recognized globally as a center of excellence in engineering education, 
                  research, and innovation, producing graduates who lead technological advancement.
                </p>
              </div>
            </div>
            <p>
              The Department of Computer Science & Technology (CST) and Computer Science & Information 
              Technology (CSIT) at UEM are at the forefront of cutting-edge research and education in 
              computing fields. Our faculty members are actively engaged in research across various domains, 
              and our students consistently excel in both academics and industry placements.
            </p>
          </CardContent>
        </Card>

        {/* Conference Highlights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-6 w-6 text-blue-600" />
              Conference Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Keynote speeches by renowned researchers and industry leaders</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Technical paper presentations across multiple tracks</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Panel discussions on emerging technologies</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Networking opportunities with peers and experts</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Publication in Springer LNNS (SCOPUS indexed)</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Workshops and tutorials on latest technologies</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Industry-academia collaboration opportunities</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">Best paper awards and recognition</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research Areas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-6 w-6 text-blue-600" />
              Research Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
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
                <div key={index} className="bg-gray-50 p-3 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-blue-50 transition">
                  {area}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Join Us at AdComSys 2026</h2>
          <p className="text-gray-600 mb-6">
            Be part of this exciting conference and contribute to the advancement of computing and systems.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Register Now</Button>
            </Link>
            <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
              <Button size="lg" variant="outline">Submit Paper</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <p className="mb-2">© 2025 AdComSys 2026. All rights reserved.</p>
          <p className="text-gray-400 text-sm">
            Organized by Department of CST & CSIT, University of Engineering and Management, Kolkata
          </p>
        </div>
      </footer>
    </div>
  )
}
