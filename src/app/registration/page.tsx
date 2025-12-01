import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { generateMetadata as createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = createMetadata({
  title: 'Registration & Fees',
  description: 'Register for AdComSys 2026 conference. View registration fees for students, academicians, and industry professionals. Early bird discounts available.',
  path: '/registration',
  keywords: ['conference registration', 'registration fees', 'AdComSys 2026', 'early bird registration', 'conference fees']
})

export default function RegistrationPage() {
  const fees = [
    { category: 'Regular Author (UG/PG)', earlyInr: '₹5,500', earlyUsd: '$150', regularInr: '₹8,000', regularUsd: '$300' },
    { category: 'Regular Author Academician, PhD Scholars', earlyInr: '₹6,000', earlyUsd: '$130', regularInr: '₹7,000', regularUsd: '$250' },
    { category: 'Regular Author from Industry', earlyInr: '₹8,000', earlyUsd: '$250', regularInr: '₹9,000', regularUsd: '$300' },
    { category: 'Only Attending or Accompanying', earlyInr: '₹3,500', earlyUsd: '$130', regularInr: '₹3,500', regularUsd: '$130' }
  ];

  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Page Content */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-16 max-w-7xl">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 relative">
          <div className="absolute inset-0 bg-linear-to-r from-brand-orange/5 via-transparent to-brand-navy/5 rounded-3xl -z-10"></div>
          <Badge className="mb-4 sm:mb-6 bg-linear-to-r from-brand-orange to-orange-500 text-white hover:from-orange-500 hover:to-brand-orange text-sm sm:text-base px-4 sm:px-6 py-2 shadow-lg animate-pulse">
            Registration Policy
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-navy mb-4 sm:mb-6 leading-tight px-2">
            Conference <span className="text-brand-orange">Registration</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed px-2">
            Secure your spot at AdComSys 2026 - Register now!
          </p>
        </div>

        {/* Registration Policy */}
        <Card className="mb-8 sm:mb-12 lg:mb-16 shadow-2xl bg-linear-to-br from-white to-gray-50 relative z-10 border-2 border-brand-navy/20 hover:shadow-3xl hover:border-brand-orange/50 transition-all duration-300">
          <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 bg-transparent px-4 sm:px-6">
            <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed">
                According to the AdComSys 2026 conference registration policy, after obtaining the formal acceptance by e-mail, <strong className="text-brand-navy">at least one author of each paper must complete regular registration formalities</strong> including payment of full registration fees.
            </p>
          </CardContent>
        </Card>

        {/* Registration Fees Table */}
        <Card className="mb-8 sm:mb-12 lg:mb-16 shadow-2xl bg-white relative z-10 border-l-4 border-brand-orange hover:shadow-3xl transition-all duration-300">
          <CardHeader className="bg-linear-to-r from-brand-orange/5 to-transparent px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-[#14213d]">Registration Fees</CardTitle>
            <CardDescription className="text-sm sm:text-base lg:text-lg mt-1">Complete fee structure for AdComSys 2026</CardDescription>
          </CardHeader>
          <CardContent className="bg-white overflow-x-auto pt-4 sm:pt-6 px-2 sm:px-6">
            <div className="min-w-full rounded-lg overflow-hidden border-2 border-gray-200">
              <table className="w-full border-collapse text-xs sm:text-sm md:text-base">
                <thead>
                  <tr className="bg-linear-to-r from-brand-navy to-brand-navy/90 text-white">
                    <th className="border border-gray-400 px-2 sm:px-4 py-3 sm:py-5 text-left font-bold">Category</th>
                    <th className="border border-gray-400 px-2 sm:px-4 py-3 sm:py-5 text-center font-bold">Indian Authors<br /><span className="text-xs font-normal text-gray-200">(Early Bird) INR</span></th>
                    <th className="border border-gray-400 px-2 sm:px-4 py-3 sm:py-5 text-center font-bold">Foreign Authors<br /><span className="text-xs font-normal text-gray-200">(Early Bird) USD</span></th>
                    <th className="border border-gray-400 px-2 sm:px-4 py-3 sm:py-5 text-center font-bold">Indian Authors<br /><span className="text-xs font-normal text-gray-200">(Regular) INR*</span></th>
                    <th className="border border-gray-400 px-2 sm:px-4 py-3 sm:py-5 text-center font-bold">Foreign Authors<br /><span className="text-xs font-normal text-gray-200">(Regular) USD*</span></th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-brand-orange/5 transition-colors`}>
                      <td className="border border-gray-300 px-2 sm:px-4 py-3 sm:py-5 font-bold text-gray-800">{fee.category}</td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-3 sm:py-5 text-center">
                        <span className="text-brand-orange font-bold text-sm sm:text-base md:text-xl inline-block bg-orange-50 px-2 sm:px-3 py-1 rounded-lg">{fee.earlyInr}</span>
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-3 sm:py-5 text-center">
                        <span className="text-brand-orange font-bold text-sm sm:text-base md:text-xl inline-block bg-orange-50 px-2 sm:px-3 py-1 rounded-lg">{fee.earlyUsd}</span>
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-3 sm:py-5 text-center text-gray-700 font-semibold">{fee.regularInr}</td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-3 sm:py-5 text-center text-gray-700 font-semibold">{fee.regularUsd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-linear-to-r from-orange-50 to-orange-100/50 border-l-4 border-brand-orange p-6 rounded-r-xl shadow-md">
              <p className="text-base text-gray-800 leading-relaxed">
                <strong className="text-brand-navy text-lg">Note:</strong> All rates are exclusive of GST and other monetary transaction charges.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-12 sm:mb-16 shadow-2xl bg-white relative z-10 border-2 border-brand-navy/20 overflow-hidden hover:shadow-3xl transition-all duration-300">
          <CardHeader className="bg-linear-to-r from-brand-navy via-brand-navy to-brand-navy/90 text-white py-8">
            <CardTitle className="text-2xl sm:text-3xl">Important Registration Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="pt-10 pb-10 bg-white space-y-8">
            <div className="flex items-start group hover:bg-orange-50 p-5 rounded-xl transition-all duration-300">
              <div className="bg-linear-to-br from-brand-orange to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 mr-5 mt-1 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">1</div>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Final submissions can only be uploaded with regular registration and <strong className="text-brand-navy">at least one author of each paper must register at the regular rate</strong>.
              </p>
            </div>

            <div className="flex items-start group hover:bg-orange-50 p-5 rounded-xl transition-all duration-300">
              <div className="bg-linear-to-br from-brand-orange to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 mr-5 mt-1 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">2</div>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                This fee is only applicable for <strong className="text-brand-navy">single author from each paper</strong> who will be coming to present his/her paper in the respective venue of the conference. Necessary details for the registration process will be intimated to the corresponding authors of accepted papers through email.
              </p>
            </div>

            <div className="flex items-start group hover:bg-orange-50 p-5 rounded-xl transition-all duration-300">
              <div className="bg-linear-to-br from-brand-orange to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 mr-5 mt-1 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">3</div>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                If an author has got <strong className="text-brand-navy">more than one accepted papers</strong>, each paper has also to be registered.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information for Indian Authors */}
        <Card className="mb-12 sm:mb-16 shadow-2xl bg-white relative z-10 border-l-4 border-brand-orange hover:shadow-3xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-brand-orange/5 to-transparent rounded-full -mr-32 -mt-32"></div>
          <CardHeader className="bg-linear-to-r from-brand-orange/5 to-transparent relative z-10">
            <CardTitle className="text-2xl sm:text-3xl text-[#14213d]">Payment Information for Indian Authors</CardTitle>
          </CardHeader>
          <CardContent className="bg-white pt-6 space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
              <p className="text-base text-gray-800 mb-4">
                To register your paper, please{' '}
                <a 
                  href="https://uem.edu.in/uem-kolkata/adcomsys-2025/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold underline hover:text-blue-800"
                >
                  click here
                </a>
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-base text-gray-800 leading-relaxed">
                After your paper gets registered, the author will receive an auto-generated e-mail. The auto-generated e-mail consists of an invoice having the amount you have paid to register your paper.
              </p>

              <div className="bg-orange-50 border-l-4 border-brand-orange p-5 rounded-r-lg">
                <h4 className="font-bold text-lg text-brand-navy mb-3">Submission Instructions:</h4>
                <ul className="space-y-3 text-base text-gray-800">
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2 font-bold">•</span>
                    <span>Email the invoice to conference email ID: <strong className="text-brand-navy">adcomsys@uem.edu.in</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2 font-bold">•</span>
                    <span>Include your <strong>paper ID</strong> and <strong>paper title</strong> in the email</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2 font-bold">•</span>
                    <span>File format must be <strong>PDF</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2 font-bold">•</span>
                    <span>File name format: <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">123_Payment_Receipt.pdf</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2 font-bold">•</span>
                    <span>Where 123 is your <a href="https://cmt3.research.microsoft.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">cmt3.research.microsoft.com</a> paper number</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-300 p-5 rounded-lg">
                <p className="text-base text-gray-800">
                  <strong className="text-red-600">Important:</strong> If any author does not send the invoice to the conference email ID, their registration will not be granted or treated as invalid.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information for Foreign Authors */}
        <Card className="mb-8 sm:mb-12 lg:mb-16 shadow-2xl bg-white relative z-10 border-l-4 border-brand-orange hover:shadow-3xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-500/5 to-transparent rounded-full -mr-32 -mt-32"></div>
          <CardHeader className="bg-linear-to-r from-blue-500/5 to-transparent relative z-10 px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-[#14213d]">Payment Information for Foreign Authors</CardTitle>
          </CardHeader>
          <CardContent className="bg-white pt-4 sm:pt-6 space-y-4 sm:space-y-6 px-4 sm:px-6">
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
              Foreign authors are requested to pay the registration fees using the following bank details:
            </p>

            <div className="bg-linear-to-br from-brand-navy/5 to-blue-50/50 border-2 border-brand-navy/30 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <tbody>
                  <tr className="border-b border-gray-300 hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="py-3 sm:py-4 pr-2 sm:pr-4 font-bold text-gray-700">Name of the Beneficiary:</td>
                    <td className="py-3 sm:py-4 text-gray-800 font-medium">University of Engineering and Management, Kolkata</td>
                  </tr>
                  <tr className="border-b border-gray-300 hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="py-3 sm:py-4 pr-2 sm:pr-4 font-bold text-gray-700">Name of the Bank:</td>
                    <td className="py-3 sm:py-4 text-gray-800 font-medium">Indian Overseas Bank, Sector - V, Salt Lake Branch</td>
                  </tr>
                  <tr className="border-b border-gray-300 hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="py-3 sm:py-4 pr-2 sm:pr-4 font-bold text-gray-700">Beneficiary A/c. No:</td>
                    <td className="py-3 sm:py-4"><span className="bg-orange-50 text-brand-orange font-bold text-sm sm:text-base px-2 sm:px-3 py-1 rounded-lg border border-brand-orange/30">164201000001924 (Savings A/c.)</span></td>
                  </tr>
                  <tr className="border-b border-gray-300 hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="py-3 sm:py-4 pr-2 sm:pr-4 font-bold text-gray-700">IFSC Code:</td>
                    <td className="py-3 sm:py-4"><span className="bg-orange-50 text-brand-orange font-bold text-sm sm:text-base px-2 sm:px-3 py-1 rounded-lg border border-brand-orange/30">IOBA0001642</span></td>
                  </tr>
                  <tr className="hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="py-3 sm:py-4 pr-2 sm:pr-4 font-bold text-gray-700">SWIFT Code:</td>
                    <td className="py-3 sm:py-4"><span className="bg-orange-50 text-brand-orange font-bold text-sm sm:text-base px-2 sm:px-3 py-1 rounded-lg border border-brand-orange/30">IOBAINBB893</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-linear-to-br from-orange-50 to-orange-100/50 border-l-4 border-brand-orange p-4 sm:p-6 rounded-r-xl shadow-md">
              <h4 className="font-bold text-lg sm:text-xl text-brand-navy mb-4 sm:mb-5">
                Submission Instructions:
              </h4>
              <ul className="space-y-3 sm:space-y-5 text-sm sm:text-base text-gray-800">
                <li className="flex items-start group hover:bg-white/50 p-2 sm:p-3 rounded-lg transition-all duration-200">
                  <div className="bg-linear-to-br from-brand-orange to-orange-500 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 mr-3 sm:mr-4 mt-0.5 font-bold text-sm sm:text-base shadow-md group-hover:scale-110 transition-transform duration-200">1</div>
                  <span className="leading-relaxed">The author has to email the <strong className="text-brand-navy">TRANSACTION ID</strong> to the conference email ID (<strong className="text-brand-orange">adcomsys@uem.edu.in</strong>) along with their <strong className="text-brand-navy">paper ID</strong> and <strong className="text-brand-navy">paper title</strong>.</span>
                </li>
                <li className="flex items-start group hover:bg-white/50 p-2 sm:p-3 rounded-lg transition-all duration-200">
                  <div className="bg-linear-to-br from-brand-orange to-orange-500 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 mr-3 sm:mr-4 mt-0.5 font-bold text-sm sm:text-base shadow-md group-hover:scale-110 transition-transform duration-200">2</div>
                  <span className="leading-relaxed">The file format of the transaction ID proof should be typically in <strong className="text-brand-navy">PDF format</strong>.</span>
                </li>
                <li className="flex items-start group hover:bg-white/50 p-2 sm:p-3 rounded-lg transition-all duration-200">
                  <div className="bg-linear-to-br from-brand-orange to-orange-500 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 mr-3 sm:mr-4 mt-0.5 font-bold text-sm sm:text-base shadow-md group-hover:scale-110 transition-transform duration-200">3</div>
                  <span className="leading-relaxed">The file name must be in this format: <code className="bg-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-mono border border-gray-300 shadow-sm">123_Payment_Receipt.pdf</code>. Where 123 is your <a href="https://cmt3.research.microsoft.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 font-medium">cmt3.research.microsoft.com</a> paper number.</span>
                </li>
                <li className="flex items-start group hover:bg-white/50 p-2 sm:p-3 rounded-lg transition-all duration-200">
                  <div className="bg-linear-to-br from-brand-orange to-orange-500 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 mr-3 sm:mr-4 mt-0.5 font-bold text-sm sm:text-base shadow-md group-hover:scale-110 transition-transform duration-200">4</div>
                  <span className="leading-relaxed">For example, if the submission ID is 87, then the file name should be <code className="bg-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-mono border border-gray-300 shadow-sm">87_Payment_Receipt.pdf</code></span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border-2 border-red-300 p-4 sm:p-5 rounded-lg">
              <p className="text-sm sm:text-base text-gray-800">
                <strong className="text-red-600">Important:</strong> If any author does not send the invoice to the conference email ID, then their registration will not be granted and will be treated as invalid.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Registration Process Steps */}
        <div className="mb-8 sm:mb-12 lg:mb-16 space-y-8 sm:space-y-12 border-2 border-brand-navy/20 p-4 sm:p-6 lg:p-8 rounded-2xl bg-linear-to-br from-white to-gray-50 shadow-2xl hover:shadow-3xl transition-all duration-300">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#14213d] text-center mb-6 sm:mb-8">Registration Process</h3>
          
          <div className="flex items-start">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 mr-4 sm:mr-5 text-lg sm:text-xl font-bold shadow-lg">1</div>
            <div className="flex-1">
              <h4 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-[#14213d]">Create Account</h4>
              <p className="text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">Sign up on the AdComSys 2026 portal with your email and create a password.</p>
              <Link href="/signup">
                <Button size="sm" variant="outline" className="text-sm">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 mr-4 sm:mr-5 text-lg sm:text-xl font-bold shadow-lg">2</div>
            <div className="flex-1">
              <h4 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-[#14213d]">Make Payment</h4>
              <p className="text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">Transfer registration fee to the bank account provided above.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-red-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 mr-4 sm:mr-5 text-lg sm:text-xl font-bold shadow-lg">3</div>
            <div className="flex-1">
              <h4 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-[#14213d]">Send Verification Mail</h4>
              <p className="text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">Send the payment invoice to <strong>adcomsys@uem.edu.in</strong> for verification.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 mr-4 sm:mr-5 text-lg sm:text-xl font-bold shadow-lg">4</div>
            <div className="flex-1">
              <h4 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-[#14213d]">Login Your Profile</h4>
              <p className="text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">Login into your profile for updates on your paper.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative text-center py-10 sm:py-16 lg:py-20 bg-linear-to-br from-brand-navy via-brand-navy to-blue-900 rounded-2xl text-white shadow-2xl border-4 border-brand-orange overflow-hidden z-10">
          <div className="absolute inset-0 bg-linear-to-r from-brand-orange/5 via-transparent to-brand-orange/5"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-linear-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
              Ready to Register?
            </h2>
            <p className="text-gray-200 mb-6 sm:mb-8 lg:mb-12 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium max-w-4xl mx-auto leading-relaxed">
              Join researchers and professionals from around the world at <span className="text-brand-orange font-bold">AdComSys 2026</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-8">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base lg:text-xl px-6 sm:px-8 lg:px-10 py-4 sm:py-6 lg:py-7 bg-linear-to-r from-brand-orange to-orange-500 text-white hover:from-orange-500 hover:to-brand-orange font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border-2 border-orange-400">
                  Register Now
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm sm:text-base lg:text-xl px-6 sm:px-8 lg:px-10 py-4 sm:py-6 lg:py-7 bg-white/10 backdrop-blur-sm text-white border-3 border-white hover:bg-white hover:text-brand-navy font-bold transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl">
                  Login to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}


