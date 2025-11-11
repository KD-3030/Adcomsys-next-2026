import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, FileText, CheckCircle, Clock, Award } from 'lucide-react'

export default function CallForPapersPage() {
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
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Call for Papers</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Your Research</h1>
          <p className="text-lg text-gray-600">
            Share your innovations and contribute to advancing computing and systems
          </p>
        </div>

        {/* Submission Guidelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-6 w-6 text-blue-600" />
              Submission Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
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
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-green-600" />
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

            <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Important Notes:</h3>
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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Research Tracks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-blue-600">Track 1: Artificial Intelligence & Machine Learning</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Deep Learning & Neural Networks</li>
                  <li>Computer Vision & Image Processing</li>
                  <li>Natural Language Processing</li>
                  <li>Reinforcement Learning</li>
                  <li>AI Ethics & Explainable AI</li>
                  <li>Generative AI & Large Language Models</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-green-600">Track 2: Internet of Things & Edge Computing</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>IoT Architecture & Protocols</li>
                  <li>Smart Cities & Infrastructure</li>
                  <li>Industrial IoT (IIoT)</li>
                  <li>Edge & Fog Computing</li>
                  <li>IoT Security & Privacy</li>
                  <li>Sensor Networks</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-purple-600">Track 3: Cloud Computing & Distributed Systems</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Cloud Architecture & Services</li>
                  <li>Serverless Computing</li>
                  <li>Container Orchestration</li>
                  <li>Distributed Databases</li>
                  <li>Cloud Security</li>
                  <li>Multi-cloud & Hybrid Cloud</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-red-600">Track 4: Cybersecurity & Blockchain</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Network Security</li>
                  <li>Cryptography & Encryption</li>
                  <li>Blockchain Technology</li>
                  <li>Smart Contracts & DeFi</li>
                  <li>Privacy-Preserving Technologies</li>
                  <li>Threat Detection & Response</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-orange-600">Track 5: Big Data & Analytics</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Data Mining & Warehousing</li>
                  <li>Real-time Analytics</li>
                  <li>Business Intelligence</li>
                  <li>Predictive Analytics</li>
                  <li>Data Visualization</li>
                  <li>Stream Processing</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-indigo-600">Track 6: Emerging Technologies</h3>
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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-6 w-6 text-blue-600" />
              Review Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">1</div>
                <div>
                  <h4 className="font-semibold">Submission</h4>
                  <p className="text-sm text-gray-600">Submit your paper through Microsoft CMT portal by the deadline</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">2</div>
                <div>
                  <h4 className="font-semibold">Initial Screening</h4>
                  <p className="text-sm text-gray-600">Papers are checked for format compliance and plagiarism</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">3</div>
                <div>
                  <h4 className="font-semibold">Double-Blind Review</h4>
                  <p className="text-sm text-gray-600">At least 2-3 reviewers evaluate each paper</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">4</div>
                <div>
                  <h4 className="font-semibold">Decision Notification</h4>
                  <p className="text-sm text-gray-600">Authors receive accept/reject decision with reviewer comments</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">5</div>
                <div>
                  <h4 className="font-semibold">Camera-Ready Submission</h4>
                  <p className="text-sm text-gray-600">Authors submit final version incorporating reviewer feedback</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Button */}
        <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Submit?</h2>
          <p className="text-gray-600 mb-6">
            Submit your paper through Microsoft CMT portal
          </p>
          <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
            <Button size="lg" className="text-lg">
              <FileText className="mr-2 h-5 w-5" />
              Submit Paper via CMT
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Deadline: March 10, 2026
          </p>
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
