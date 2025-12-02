import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
          <div className="absolute inset-0 bg-linear-to-br from-[#FFCC5C] to-transparent"></div>
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
            About <span className="text-[#FFCC5C]">AdComSys 2026</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto px-2">
            Advancing Computing Systems Through Innovation and Collaboration
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-5xl">

        {/* About Conference */}
        <Card className="mb-8 border-l-4 border-[#FFCC5C] shadow-lg hover:shadow-xl transition-shadow">
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
          </CardContent>
        </Card>

        {/* About UEM */}
        <Card className="mb-8 border-l-4 border-[#FFCC5C] shadow-lg hover:shadow-xl transition-shadow">
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
            
            {/* Vision, Mission, Values */}
            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="bg-linear-to-br from-[#14213d] to-[#1a2844] p-6 rounded-lg border-l-4 border-[#FFCC5C]">
                <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#FFCC5C]">
                  Vision
                </h3>
                <p className="text-base text-white/90 leading-relaxed">
                  To be a globally recognized educational institution known for outcome based education and application oriented research.
                </p>
              </div>
              <div className="bg-linear-to-br from-[#14213d] to-[#1a2844] p-6 rounded-lg border-l-4 border-[#FFCC5C]">
                <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#FFCC5C]">
                  Mission
                </h3>
                <p className="text-base text-white/90 leading-relaxed">
                  To assist students to understand and enjoy seamless nature of knowledge and encourage them to apply acquired knowledge to practical use, so that they become worthy, socially responsible good human beings sought after their leadership qualities. To foster creativity, innovation and excellence through example based teaching-learning process imparted in the most simple and easily comprehensible way.
                </p>
              </div>
              <div className="bg-linear-to-br from-[#14213d] to-[#1a2844] p-6 rounded-lg border-l-4 border-[#FFCC5C]">
                <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#FFCC5C]">
                  Values
                </h3>
                <p className="text-base text-white/90 leading-relaxed">
                  Graduate, Postgraduate and Doctoral Students known for their hard work, competence, disciplined life, socially responsible, professional conduct & intellectual and moral integrity.
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
        <Card className="mb-8 border-l-4 border-[#FFCC5C] shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white rounded-t-lg">
            <CardTitle className="text-xl sm:text-2xl">
              Conference Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#FFCC5C] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#FFCC5C] transition-colors">Keynote speeches by renowned researchers and industry leaders</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#FFCC5C] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#FFCC5C] transition-colors">Technical paper presentations across multiple tracks</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#FFCC5C] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#FFCC5C] transition-colors">Panel discussions on emerging technologies</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#FFCC5C] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#FFCC5C] transition-colors">Networking opportunities with peers and experts</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#FFCC5C] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#FFCC5C] transition-colors">Publication in Springer LNNS (SCOPUS indexed)</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#FFCC5C] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#FFCC5C] transition-colors">Workshops and tutorials on latest technologies</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#FFCC5C] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#FFCC5C] transition-colors">Industry-academia collaboration opportunities</p>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-[#FFCC5C] rounded-full mt-2 mr-3 group-hover:scale-150 transition-transform"></div>
                  <p className="text-white-700 text-base sm:text-lg group-hover:text-[#FFCC5C] transition-colors">Best paper awards and recognition</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research Areas */}
        <Card className="mb-8 border-l-4 border-[#FFCC5C] shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white rounded-t-lg">
            <CardTitle className="text-xl sm:text-2xl">
              Research Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-blue-50 p-4 sm:p-5 rounded-lg border-l-4 border-blue-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 text-[#14213d]">Track 1: Computing Paradigms & Technologies</h3>
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-800">
                  <li>Cloud Computing</li>
                  <li>Fog Computing</li>
                  <li>Dew Computing</li>
                  <li>Parallel Computing</li>
                  <li>Mobile Computing</li>
                  <li>Pervasive Computing</li>
                  <li>Green Computing</li>
                  <li>Cognitive Computing</li>
                  <li>Evolutionary Computation</li>
                  <li>Grid Computing</li>
                  <li>Quantum Computing</li>
                  <li>Bio-inspired Computing</li>
                  <li>Neuromorphic Computing</li>
                  <li>High Performance Computing</li>
                  <li>Distributed Computing</li>
                  <li>Edge Computing</li>
                  <li>DNA Computing & Reversible Computing</li>
                  <li>Optical Computing</li>
                  <li>Analog Computing</li>
                  <li>Quantum Cryptography</li>
                  <li>Digital Forensics</li>
                  <li>Geoscience and Remote Sensing</li>
                  <li>Industrial Informatics</li>
                  <li>Human Centric Computing</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 sm:p-5 rounded-lg border-l-4 border-green-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 text-[#14213d]">Track 2: Intelligent Systems & AI</h3>
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-800">
                  <li>Intelligent Systems</li>
                  <li>AI with Robotics</li>
                  <li>AI-based Image Processing</li>
                  <li>Explainable AI</li>
                  <li>Deep Learning</li>
                  <li>Reinforcement Learning</li>
                  <li>Active Learning</li>
                  <li>Featured Learning</li>
                  <li>Meta Learning</li>
                  <li>Generative Models</li>
                  <li>Generative Adversarial Network</li>
                  <li>Soft Computing</li>
                  <li>NLP-based Smart Systems</li>
                  <li>Robotics Systems</li>
                  <li>Data Analytics Systems</li>
                  <li>Big Data</li>
                  <li>Data Mining</li>
                  <li>Automation</li>
                  <li>AI-Systems in Autonomous Vehicles</li>
                  <li>Fuzzy Systems</li>
                  <li>Hybrid AI</li>
                  <li>Cognitive Intelligence</li>
                  <li>Affective Computing</li>
                  <li>Audio, Speech and Video Processing</li>
                  <li>Biomedical and Health Informatics</li>
                  <li>Bioinformatics</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 sm:p-5 rounded-lg border-l-4 border-purple-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 text-[#14213d]">Track 3: Internet of Things & Applications</h3>
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-800">
                  <li>IoT in Healthcare</li>
                  <li>IoT in Vehicular Network</li>
                  <li>Industrial IoT</li>
                  <li>IoT in Industry</li>
                  <li>IoT in Agriculture</li>
                  <li>IoT in Underwater Surveillance</li>
                  <li>IoT in Smart City</li>
                  <li>Human Activity Recognition</li>
                  <li>Wireless Sensor Networks</li>
                  <li>5G & beyond 5G</li>
                  <li>IoT in Everything</li>
                  <li>AI IoT</li>
                  <li>Industry 4.0</li>
                  <li>Consumer IoT</li>
                  <li>Infrastructure IoT</li>
                  <li>Commercial IoT</li>
                  <li>Fog IoT</li>
                  <li>Short and Long Range IoT</li>
                  <li>Environmental IoT</li>
                  <li>Security in IoT</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 sm:p-5 rounded-lg border-l-4 border-red-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 text-[#14213d]">Track 4: Cybersecurity & Blockchain</h3>
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-800">
                  <li>Various types of Security Systems</li>
                  <li>Malware Protection Systems</li>
                  <li>Phishing Protection Systems</li>
                  <li>DoS/DDoS Protection Systems</li>
                  <li>Preventive and Detective Security Systems</li>
                  <li>Corrective Security Systems</li>
                  <li>Blockchain Authentication</li>
                  <li>Consensus Mechanisms</li>
                  <li>Blockchain Types and Networks</li>
                  <li>Smart Contracts</li>
                  <li>Decentralized Applications</li>
                  <li>Blockchain Scalability Solutions</li>
                  <li>Blockchain Governance</li>
                  <li>Blockchain Interoperability</li>
                  <li>Blockchain Security</li>
                  <li>Cryptocurrencies and Tokens</li>
                  <li>Non-Fungible Tokens</li>
                  <li>Security, Privacy, Attacks, and Forensics</li>
                  <li>Encryption Techniques</li>
                  <li>Security in IoT</li>
                  <li>Crypt Analysis</li>
                  <li>Blockchain-based Machine Learning</li>
                  <li>Dependable and Secure Computing</li>
                  <li>Cybernetics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/*Call to Action
        <Card className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white border-0 shadow-2xl">
          <CardContent className="py-8 sm:py-12 text-center px-4 sm:px-6">
            <Award className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-[#FFCC5C]" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Join Us at AdComSys 2026</h2>
            <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto">
              Be part of this exciting conference and contribute to the advancement of computing and systems.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-[#FFCC5C] hover:bg-white text-[#14213d] border-0 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                  <Users className="mr-2 h-5 w-5" />
                  Register Now
                </Button>
              </Link>
              <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
                <Button size="lg" variant="outline" className="bg-[#FFCC5C] text-[#14213d] border-2 border-[#14213d] hover:bg-white w-full sm:w-auto">
                  <FileText className="mr-2 h-5 w-5" />
                  Submit Paper
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>*/}
      </div>

      <Footer />
    </div>
  )
}
