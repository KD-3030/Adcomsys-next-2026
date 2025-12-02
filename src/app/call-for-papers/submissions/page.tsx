import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Download, Upload, AlertTriangle, Monitor, FileCheck } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { generateMetadata as createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = createMetadata({
  title: 'Submissions - Information for Authors',
  description: 'Submit your research papers to AdComSys 2026. Guidelines for submission, camera ready papers, and presentation templates.',
  path: '/call-for-papers/submissions',
  keywords: ['paper submission', 'author guidelines', 'AdComSys 2026', 'camera ready', 'conference submission']
})

export default function SubmissionsPage() {
  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-[#FFCC5C] to-transparent"></div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
            <div className="bg-[#FFCC5C] backdrop-blur-sm p-3 sm:p-4 lg:p-5 rounded-full ring-4 ring-[#FFCC5C]/30 shadow-xl">
              <Upload className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-2">
            Information for <span className="text-[#FFCC5C]">Authors</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto font-medium px-2">
            Guidelines and resources for paper submission
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-5xl">

        {/* Guidelines For Submission */}
        <Card className="mb-8 shadow-2xl border-l-4 border-[#FFCC5C] bg-white relative z-10">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-6">
            <CardTitle className="text-xl sm:text-2xl">
              Guidelines For Submission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-800 pt-6 bg-white">
            <p className="text-base sm:text-lg leading-relaxed">
              Prospective authors are invited to submit original technical papers that have not been submitted elsewhere for publication (copyright infringement issues will be the author&apos;s responsibility) in the <strong className="text-[#14213d]">AdComSys 2026</strong> Conference Proceedings. Papers must be written in good English. The <strong className="text-[#14213d]">Conference Management Toolkit (CMT)</strong> portal will be used for the submission link. All manuscripts will be double-blind reviewed for technical content and scope by a technical program committee. The organizers of AdComSys 2026 are strict about Plagiarism. The submitting authors should avoid the deliberate or reckless representation of another&apos;s words, thoughts, or ideas as one&apos;s own without attribution in connection with submitting academic work, whether graded or otherwise. The Technical Program Committee will check the plagiarism level of all the submitted papers to ensure the originality of the content using <strong className="text-[#14213d]">Turnitin</strong> plagiarism checking software, and <strong className="text-[#14213d]">any paper having AI INDEX more than 0% and similarity score above 15% will not be processed further.</strong>
            </p>
          </CardContent>
        </Card>

        {/* How to Submit */}
        <Card className="mb-8 shadow-2xl border-l-4 border-[#FFCC5C] bg-white relative z-10">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-6">
            <CardTitle className="text-xl sm:text-2xl">
              How to Submit Your Paper
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-800 pt-6 bg-white">
            <p className="text-base sm:text-lg leading-relaxed">
              Prospective authors are invited to submit manuscripts at{' '}
              <Link 
                href="https://cmt3.research.microsoft.com/AdComSys2026" 
                target="_blank"
                className="text-[#FFCC5C] hover:text-[#14213d] font-bold underline underline-offset-4 transition-colors"
              >
                https://cmt3.research.microsoft.com/AdComSys2026
              </Link>{' '}
              reporting original unpublished research and recent developments in the topics related to the SCOPE of the conference.
            </p>
            <div className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded-lg shadow-md">
              <p className="text-base sm:text-lg text-red-600 font-semibold italic">
                The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Camera Ready Submission */}
        <Card className="mb-8 shadow-2xl border-l-4 border-[#FFCC5C] bg-white relative z-10">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-6">
            <CardTitle className="text-xl sm:text-2xl">
              Camera Ready Submission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-800 pt-6 bg-white">
            <p className="text-base sm:text-lg leading-relaxed">
              The authors of the accepted papers are instructed to download the template for the preparation of camera ready papers from the below-mentioned links:
            </p>
            <div className="grid sm:grid-cols-1 gap-4">
              <Link 
                href="/assets/docs/splnproc2311.docm" 
                className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-l-4 border-[#FFCC5C] hover:bg-orange-100 transition-all hover:shadow-lg group"
              >
                <span className="font-medium text-[#14213d] text-base sm:text-lg">Word template for camera ready submission</span>
                <Download className="h-5 w-5 text-[#FFCC5C] group-hover:scale-110 transition-transform" />
              </Link>
              <Link 
                href="/assets/docs/LaTeX2e+Proceedings+Templates+download.zip" 
                className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-l-4 border-[#FFCC5C] hover:bg-orange-100 transition-all hover:shadow-lg group"
              >
                <span className="font-medium text-[#14213d] text-base sm:text-lg">LaTeX template for camera ready submission</span>
                <Download className="h-5 w-5 text-[#FFCC5C] group-hover:scale-110 transition-transform" />
              </Link>
              <Link 
                href="/assets/docs/SPLNPROC-Technical-Instructions.pdf" 
               
                className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-l-4 border-[#FFCC5C] hover:bg-orange-100 transition-all hover:shadow-lg group"
              >
                <span className="font-medium text-[#14213d] text-base sm:text-lg">Springer Guidelines for Conference Proceedings</span>
                <Download className="h-5 w-5 text-[#FFCC5C] group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Mode of Presentation */}
        <Card className="mb-8 shadow-2xl border-l-4 border-[#FFCC5C] bg-white relative z-10">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-6">
            <CardTitle className="text-xl sm:text-2xl">
              Mode of Presentation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-800 pt-6 bg-white">
            <p className="text-base sm:text-lg leading-relaxed">
              AdComSys 2026 will be held in <strong className="text-[#FFCC5C]">HYBRID MODE</strong> where authors shall present their papers either in physical mode at the conference venue or through ONLINE as per their preference and convenience. However, all matters related to publication and indexing will remain unchanged.
            </p>
            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-lg shadow-md">
              <p className="text-base sm:text-lg text-red-700 font-bold">
                Without registration and attending the conference online or offline, the organizing committee will not include his/her paper in the book.
              </p>
            </div>
            <div className="mt-4">
              <Link 
                href="https://media.uemkcstcsit.in/adcomsys_2025_template.pptx" 
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600 hover:bg-blue-100 transition-all hover:shadow-lg group"
              >
                <span className="font-medium text-[#14213d] text-base sm:text-lg">PPT Template of AdComSys 2026 (New)</span>
                <Download className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Paper Categories */}
        <Card className="mb-8 shadow-2xl border-l-4 border-[#FFCC5C] bg-white relative z-10">
          <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-6">
            <CardTitle className="text-xl sm:text-2xl">
              AdComSys 2026 Paper Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-800 pt-6 bg-white">
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-[#FFCC5C] font-bold text-xl">•</span>
                <span className="text-base sm:text-lg">Regular Paper: <strong className="text-[#14213d]">10</strong> pages minimum and <strong className="text-[#14213d]">12</strong> pages maximum.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <span className="text-red-500 font-bold text-xl">•</span>
                <span className="text-base sm:text-lg">To add more pages, an amount of <strong className="text-red-600">₹ 500</strong> per page shall be charged.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <span className="text-red-500 font-bold text-xl">•</span>
                <span className="text-base sm:text-lg">There is no provision for submitting short papers and posters <strong className="text-red-600">(4 – 6 pages)</strong>.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-[#FFCC5C] font-bold text-xl">•</span>
                <span className="text-base sm:text-lg">Regular papers should present novel perspectives within the general scope of the conference.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Submit Paper Button */}
        <div className="text-center">
          <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
            <Button size="lg" className="bg-[#FFCC5C] text-[#14213d] hover:bg-[#FFCC5C]/90 shadow-2xl hover:shadow-[#FFCC5C]/50 transition-all duration-300 transform hover:scale-105 font-bold text-lg py-6 px-10">
              <Upload className="mr-2 h-5 w-5" />
              Click Here to Submit Paper
            </Button>
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  )
}
