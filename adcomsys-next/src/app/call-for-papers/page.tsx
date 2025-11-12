import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, CheckCircle, Clock, Award } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function CallForPapersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fca311] to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-[#fca311]/20 backdrop-blur-sm p-4 rounded-full ring-2 ring-[#fca311]/50">
              <FileText className="h-12 w-12 text-[#fca311]" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Call for <span className="text-[#fca311]">Papers</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Share your innovations and contribute to advancing computing and systems
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">

        {/* Submission Guidelines */}
        <Card className="mb-8 shadow-lg border-l-4 border-[#fca311]">
          <CardHeader className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white">
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-6 w-6 text-[#fca311]" />
              Submission Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-semibold mb-2 flex items-center text-[#14213d]">
                  <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                  Paper Format
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Springer LNNS format</li>
                  <li>Maximum 10 pages (including references)</li>
                  <li>PDF format only</li>
                  <li>English language</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-l-4 border-[#fca311]">
                <h3 className="font-semibold mb-2 flex items-center text-[#14213d]">
                  <Award className="mr-2 h-5 w-5 text-[#fca311]" />
                  Publication
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Springer LNNS series</li>
                  <li>SCOPUS indexed</li>
                  <li>International visibility</li>
                  <li>Fast publication process</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-[#fca311] bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded">
              <h3 className="font-semibold mb-2 text-[#14213d]">Important Notes:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Papers must be original and not published elsewhere</li>
                <li>Submit through Microsoft CMT portal only</li>
                <li>All papers will undergo double-blind peer review</li>
                <li>At least one author must register for the conference</li>
                <li>Selected papers may be invited for extended journal versions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Research Tracks */}
        <Card className="mb-8 shadow-lg border-l-4 border-[#fca311]">
          <CardHeader className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white">
            <CardTitle>Research Tracks</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-white to-blue-50 p-4 rounded-lg border-l-4 border-blue-600 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-3 text-[#14213d]">Track 1: Artificial Intelligence & Machine Learning</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Deep Learning & Neural Networks</li>
                  <li>Computer Vision & Image Processing</li>
                  <li>Natural Language Processing</li>
                  <li>Reinforcement Learning</li>
                  <li>AI Ethics & Explainable AI</li>
                  <li>Generative AI & Large Language Models</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-white to-green-50 p-4 rounded-lg border-l-4 border-green-600 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-3 text-[#14213d]">Track 2: Internet of Things & Edge Computing</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>IoT Architecture & Protocols</li>
                  <li>Smart Cities & Infrastructure</li>
                  <li>Industrial IoT (IIoT)</li>
                  <li>Edge & Fog Computing</li>
                  <li>IoT Security & Privacy</li>
                  <li>Sensor Networks</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-white to-purple-50 p-4 rounded-lg border-l-4 border-purple-600 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-3 text-[#14213d]">Track 3: Cloud Computing & Distributed Systems</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Cloud Architecture & Services</li>
                  <li>Serverless Computing</li>
                  <li>Container Orchestration</li>
                  <li>Distributed Databases</li>
                  <li>Cloud Security</li>
                  <li>Multi-cloud & Hybrid Cloud</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-white to-red-50 p-4 rounded-lg border-l-4 border-red-600 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-3 text-[#14213d]">Track 4: Cybersecurity & Blockchain</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Network Security</li>
                  <li>Cryptography & Encryption</li>
                  <li>Blockchain Technology</li>
                  <li>Smart Contracts & DeFi</li>
                  <li>Privacy-Preserving Technologies</li>
                  <li>Threat Detection & Response</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-white to-orange-50 p-4 rounded-lg border-l-4 border-[#fca311] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-3 text-[#14213d]">Track 5: Big Data & Analytics</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Data Mining & Warehousing</li>
                  <li>Real-time Analytics</li>
                  <li>Business Intelligence</li>
                  <li>Predictive Analytics</li>
                  <li>Data Visualization</li>
                  <li>Stream Processing</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-white to-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-3 text-[#14213d]">Track 6: Emerging Technologies</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Quantum Computing</li>
                  <li>5G/6G Networks</li>
                  <li>Augmented & Virtual Reality</li>
                  <li>Robotics & Automation</li>
                  <li>Autonomous Systems</li>
                  <li>Green Computing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Process */}
        <Card className="mb-8 shadow-lg border-l-4 border-[#14213d]">
          <CardHeader className="bg-gradient-to-r from-[#14213d] to-[#14213d] text-white">
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-6 w-6 text-[#fca311]" />
              Review Process
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start hover:bg-blue-50 p-3 rounded-lg transition-colors">
                <div className="bg-[#fca311] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-[#14213d]">Submission</h4>
                  <p className="text-sm text-gray-600">Submit your paper through Microsoft CMT portal by the deadline</p>
                </div>
              </div>
              <div className="flex items-start hover:bg-blue-50 p-3 rounded-lg transition-colors">
                <div className="bg-[#fca311] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-[#14213d]">Initial Screening</h4>
                  <p className="text-sm text-gray-600">Papers are checked for format compliance and plagiarism</p>
                </div>
              </div>
              <div className="flex items-start hover:bg-blue-50 p-3 rounded-lg transition-colors">
                <div className="bg-[#fca311] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-[#14213d]">Double-Blind Review</h4>
                  <p className="text-sm text-gray-600">At least 2-3 reviewers evaluate each paper</p>
                </div>
              </div>
              <div className="flex items-start hover:bg-blue-50 p-3 rounded-lg transition-colors">
                <div className="bg-[#fca311] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-[#14213d]">Decision Notification</h4>
                  <p className="text-sm text-gray-600">Authors receive accept/reject decision with reviewer comments</p>
                </div>
              </div>
              <div className="flex items-start hover:bg-blue-50 p-3 rounded-lg transition-colors">
                <div className="bg-[#fca311] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-[#14213d]">Camera-Ready Submission</h4>
                  <p className="text-sm text-gray-600">Authors submit final version incorporating reviewer feedback</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Button */}
        <Card className="text-center py-8 bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white border-0 shadow-2xl">
          <CardContent>
            <Award className="h-16 w-16 mx-auto mb-6 text-[#fca311]" />
            <h2 className="text-3xl font-bold mb-4">Ready to Submit?</h2>
            <p className="text-gray-300 mb-6">
              Submit your paper through Microsoft CMT portal
            </p>
            <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
              <Button size="lg" className="text-lg bg-[#fca311] hover:bg-[#ff9800] text-white border-0 shadow-lg hover:shadow-xl transition-all">
                <FileText className="mr-2 h-5 w-5" />
                Submit Paper via CMT
              </Button>
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              Deadline: March 10, 2026
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
