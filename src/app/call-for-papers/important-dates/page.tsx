import { Card, CardContent } from '@/components/ui/card'
import { CalendarDays } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { generateMetadata as createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = createMetadata({
  title: 'Important Dates - AdComSys 2026',
  description: 'Important dates and deadlines for AdComSys 2026 conference. Paper submission, registration, and conference dates.',
  path: '/call-for-papers/important-dates',
  keywords: ['important dates', 'conference deadlines', 'AdComSys 2026', 'paper submission deadline', 'registration deadline']
})

const importantDates = [
  { date: '15th December 2025', event: 'Paper Submission Open', isLeft: true },
  { date: '10th March 2026', event: 'Paper Submission Deadline', isLeft: false },
  { date: '10th May 2026', event: 'Acceptance Notification', isLeft: true },
  { date: '25th May 2026', event: 'Early Bird Registration', isLeft: false },
  { date: '5th June 2026', event: 'Last Date of Registration', isLeft: true },
  { date: '15th June 2026', event: 'Final Camera Ready Paper', isLeft: false },
  { date: '15th June 2026', event: 'Submission of Copyright', isLeft: true },
  { date: '26th & 27th June 2026', event: 'Date(s) of Conference', isLeft: false, isHighlight: true },
]

export default function ImportantDatesPage() {
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
              <CalendarDays className="h-14 w-14 text-white" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Important <span className="text-[#fca311]">Dates</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium">
            Mark your calendar with these crucial deadlines for AdComSys 2026
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <Card className="shadow-2xl border-0 bg-linear-to-b from-gray-50 to-white relative z-10 overflow-hidden">
          <CardContent className="p-8 sm:p-12">
            {/* Timeline */}
            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-linear-to-b from-[#fca311] via-[#14213d] to-[#fca311] h-full rounded-full hidden md:block"></div>
              
              {/* Mobile Line */}
              <div className="absolute left-4 w-1 bg-linear-to-b from-[#fca311] via-[#14213d] to-[#fca311] h-full rounded-full md:hidden"></div>

              <div className="space-y-8 md:space-y-12">
                {importantDates.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center">
                      {item.isLeft ? (
                        <>
                          {/* Left Side - Date */}
                          <div className="w-1/2 pr-8 text-right">
                            <div className={`inline-block px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ${item.isHighlight ? 'bg-[#14213d]' : 'bg-[#fca311]'}`}>
                              <span className={`font-bold text-lg ${item.isHighlight ? 'text-[#fca311]' : 'text-white'}`}>
                                {item.date}
                              </span>
                            </div>
                          </div>
                          
                          {/* Center Circle */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-[#fca311] rounded-full z-10 shadow-lg"></div>
                          
                          {/* Right Side - Event */}
                          <div className="w-1/2 pl-8">
                            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#14213d] hover:shadow-xl transition-all duration-300">
                              <span className="text-sm text-gray-500 font-medium">{index + 1}</span>
                              <h3 className="font-bold text-[#14213d] text-lg">{item.event}</h3>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Left Side - Event */}
                          <div className="w-1/2 pr-8 text-right">
                            <div className="bg-white p-4 rounded-lg shadow-md border-r-4 border-[#14213d] hover:shadow-xl transition-all duration-300">
                              <span className="text-sm text-gray-500 font-medium">{index + 1}</span>
                              <h3 className="font-bold text-[#14213d] text-lg">{item.event}</h3>
                            </div>
                          </div>
                          
                          {/* Center Circle */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-[#fca311] rounded-full z-10 shadow-lg"></div>
                          
                          {/* Right Side - Date */}
                          <div className="w-1/2 pl-8">
                            <div className={`inline-block px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ${item.isHighlight ? 'bg-[#14213d]' : 'bg-[#fca311]'}`}>
                              <span className={`font-bold text-lg ${item.isHighlight ? 'text-[#fca311]' : 'text-white'}`}>
                                {item.date}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden flex items-start">
                      {/* Circle */}
                      <div className="absolute left-4 transform -translate-x-1/2 w-5 h-5 bg-white border-4 border-[#fca311] rounded-full z-10 shadow-lg mt-2"></div>
                      
                      {/* Content */}
                      <div className="ml-12 flex-1">
                        <div className={`inline-block px-4 py-2 rounded-lg shadow-lg mb-2 ${item.isHighlight ? 'bg-[#14213d]' : 'bg-[#fca311]'}`}>
                          <span className={`font-bold text-sm ${item.isHighlight ? 'text-[#fca311]' : 'text-white'}`}>
                            {item.date}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-md border-l-4 border-[#14213d]">
                          <span className="text-xs text-gray-500 font-medium">{index + 1}</span>
                          <h3 className="font-bold text-[#14213d] text-base">{item.event}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Note Card */}
        <Card className="mt-8 shadow-xl border-l-4 border-[#fca311] bg-white">
          <CardContent className="p-6">
            <p className="text-gray-700 text-center">
              <span className="font-bold text-[#14213d]">Note:</span> All deadlines are at <span className="font-semibold text-[#fca311]">11:59 PM IST</span> on the respective dates.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
