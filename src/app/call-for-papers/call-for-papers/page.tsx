import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Award } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { generateMetadata as createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = createMetadata({
  title: 'Call for Papers',
  description: 'Submit your research papers to AdComSys 2026. Conference tracks include AI, IoT, Cloud Computing, Cybersecurity, and more.',
  path: '/call-for-papers/call-for-papers',
  keywords: ['call for papers', 'research tracks', 'AdComSys 2026', 'conference papers', 'academic publishing']
})

export default function CallForPapersSubPage() {
  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-20 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-[#fca311] to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[#fca311] backdrop-blur-sm p-5 rounded-full ring-4 ring-[#fca311]/30 shadow-xl">
              <FileText className="h-14 w-14 text-white" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Call for <span className="text-[#fca311]">Papers</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium">
            Share your innovations and contribute to advancing computing and systems
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">

        {/* Research Tracks */}
        <Card className="mb-8 shadow-2xl border-l-4 border-[#fca311] bg-white relative z-10">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-6">
            <CardTitle className="text-xl text-[#fca311]"><strong>Call For Papers</strong></CardTitle>
          </CardHeader>
          <CardContent className="pt-6 bg-white">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <h3 className="font-bold text-lg mb-3 text-[#14213d]">Track 1: Computing Paradigms & Technologies</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
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

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <h3 className="font-bold text-lg mb-3 text-[#14213d]">Track 2: Intelligent Systems & AI</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
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

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <h3 className="font-bold text-lg mb-3 text-[#14213d]">Track 3: Internet of Things & Applications</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
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

              <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <h3 className="font-bold text-lg mb-3 text-[#14213d]">Track 4: Cybersecurity & Blockchain</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
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

        {/* Submission Button */}
        <Card className="text-center py-12 bg-linear-to-r from-[#14213d] to-[#1a2844] text-white border-0 shadow-2xl relative z-10">
          <CardContent>
            <Award className="h-20 w-20 mx-auto mb-8 text-[#fca311]" />
            <h2 className="text-4xl font-bold mb-6">Ready to Submit?</h2>
            <p className="text-gray-200 mb-8 text-lg font-medium">
              Submit your paper through Microsoft CMT portal
            </p>
            <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
              <Button size="lg" className="text-xl px-8 py-6 bg-[#fca311] hover:bg-[#ff9800] text-white border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <FileText className="mr-3 h-6 w-6" />
                Submit Paper via CMT
              </Button>
            </Link>
            <p className="text-base text-gray-300 mt-6 font-semibold">
              Deadline: March 10, 2026
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
