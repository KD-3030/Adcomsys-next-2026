import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DollarSign, IndianRupee, Upload, AlertCircle, Mail, CheckCircle } from 'lucide-react'
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
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-7xl">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/5 via-transparent to-brand-navy/5 rounded-3xl -z-10"></div>
          <Badge className="mb-6 bg-gradient-to-r from-brand-orange to-orange-500 text-white hover:from-orange-500 hover:to-brand-orange text-base px-6 py-2 shadow-lg animate-pulse">
            <DollarSign className="h-5 w-5 inline mr-2" />
            Registration Policy
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-navy mb-6 leading-tight">
            Conference <span className="text-brand-orange">Registration</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed">
            Secure your spot at AdComSys 2026 - Register now!
          </p>
        </div>

        {/* Registration Policy */}
        <Card className="mb-12 sm:mb-16 shadow-2xl bg-gradient-to-br from-white to-gray-50 relative z-10 border-2 border-brand-navy/20 hover:shadow-3xl hover:border-brand-orange/50 transition-all duration-300">
          <CardContent className="pt-8 pb-8 bg-transparent">
            <div className="flex items-start space-x-4">
              <div className="bg-brand-orange/10 p-3 rounded-full flex-shrink-0">
                <CheckCircle className="h-7 w-7 text-brand-orange" />
              </div>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                According to the AdComSys 2026 conference registration policy, after obtaining the formal acceptance by e-mail, <strong className="text-brand-navy">at least one author of each paper must complete regular registration formalities</strong> including payment of full registration fees.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Registration Fees Table */}
        <Card className="mb-12 sm:mb-16 shadow-2xl bg-white relative z-10 border-l-4 border-brand-orange hover:shadow-3xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-brand-orange/5 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-orange p-2 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl sm:text-3xl text-[#14213d]">Registration Fees</CardTitle>
                <CardDescription className="text-lg mt-1">Complete fee structure for AdComSys 2026</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="bg-white overflow-x-auto pt-6">
            <div className="min-w-full rounded-lg overflow-hidden border-2 border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white">
                    <th className="border border-gray-400 px-4 py-5 text-left font-bold text-base">Category</th>
                    <th className="border border-gray-400 px-4 py-5 text-center font-bold text-base">Indian Authors<br /><span className="text-sm font-normal text-gray-200">(Early Bird) INR</span></th>
                    <th className="border border-gray-400 px-4 py-5 text-center font-bold text-base">Foreign Authors<br /><span className="text-sm font-normal text-gray-200">(Early Bird) USD</span></th>
                    <th className="border border-gray-400 px-4 py-5 text-center font-bold text-base">Indian Authors<br /><span className="text-sm font-normal text-gray-200">(Regular) INR*</span></th>
                    <th className="border border-gray-400 px-4 py-5 text-center font-bold text-base">Foreign Authors<br /><span className="text-sm font-normal text-gray-200">(Regular) USD*</span></th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-brand-orange/5 transition-colors`}>
                      <td className="border border-gray-300 px-4 py-5 font-bold text-gray-800 text-base">{fee.category}</td>
                      <td className="border border-gray-300 px-4 py-5 text-center">
                        <span className="text-brand-orange font-bold text-xl inline-block bg-orange-50 px-3 py-1 rounded-lg">{fee.earlyInr}</span>
                      </td>
                      <td className="border border-gray-300 px-4 py-5 text-center">
                        <span className="text-brand-orange font-bold text-xl inline-block bg-orange-50 px-3 py-1 rounded-lg">{fee.earlyUsd}</span>
                      </td>
                      <td className="border border-gray-300 px-4 py-5 text-center text-gray-700 font-semibold text-lg">{fee.regularInr}</td>
                      <td className="border border-gray-300 px-4 py-5 text-center text-gray-700 font-semibold text-lg">{fee.regularUsd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-gradient-to-r from-orange-50 to-orange-100/50 border-l-4 border-brand-orange p-6 rounded-r-xl shadow-md">
              <div className="flex items-start">
                <AlertCircle className="h-7 w-7 text-brand-orange mr-4 mt-0.5 flex-shrink-0" />
                <p className="text-base text-gray-800 leading-relaxed">
                  <strong className="text-brand-navy text-lg">Note:</strong> All rates are exclusive of GST and other monetary transaction charges.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-12 sm:mb-16 shadow-2xl bg-white relative z-10 border-2 border-brand-navy/20 overflow-hidden hover:shadow-3xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-brand-navy via-brand-navy to-brand-navy/90 text-white py-8">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-orange p-3 rounded-lg">
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl">Important Registration Guidelines</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-10 pb-10 bg-white space-y-8">
            <div className="flex items-start group hover:bg-orange-50 p-5 rounded-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-brand-orange to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-5 mt-1 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">1</div>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Final submissions can only be uploaded with regular registration and <strong className="text-brand-navy">at least one author of each paper must register at the regular rate</strong>.
              </p>
            </div>

            <div className="flex items-start group hover:bg-orange-50 p-5 rounded-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-brand-orange to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-5 mt-1 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">2</div>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                This fee is only applicable for <strong className="text-brand-navy">single author from each paper</strong> who will be coming to present his/her paper in the respective venue of the conference. Necessary details for the registration process will be intimated to the corresponding authors of accepted papers through email.
              </p>
            </div>

            <div className="flex items-start group hover:bg-orange-50 p-5 rounded-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-brand-orange to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-5 mt-1 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">3</div>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                If an author has got <strong className="text-brand-navy">more than one accepted papers</strong>, each paper has also to be registered.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information for Indian Authors */}
        <Card className="mb-12 sm:mb-16 shadow-2xl bg-white relative z-10 border-l-4 border-brand-orange hover:shadow-3xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-orange/5 to-transparent rounded-full -mr-32 -mt-32"></div>
          <CardHeader className="bg-gradient-to-r from-brand-orange/5 to-transparent relative z-10">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-brand-orange to-orange-500 p-3 rounded-xl shadow-lg">
                <IndianRupee className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl text-[#14213d]">Payment Information for Indian Authors</CardTitle>
            </div>
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
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-base text-gray-800">
                    <strong className="text-red-600">Important:</strong> If any author does not send the invoice to the conference email ID, their registration will not be granted or treated as invalid.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information for Foreign Authors */}
        <Card className="mb-12 sm:mb-16 shadow-2xl bg-white relative z-10 border-l-4 border-brand-orange hover:shadow-3xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -mr-32 -mt-32"></div>
          <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent relative z-10">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl text-[#14213d]">Payment Information for Foreign Authors</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="bg-white pt-6 space-y-6">
            <p className="text-base text-gray-800 leading-relaxed">
              Foreign authors are requested to pay the registration fees using the following bank details:
            </p>

            <div className="bg-gradient-to-br from-brand-navy/5 to-blue-50/50 border-2 border-brand-navy/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-300 hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="py-4 pr-4 font-bold text-gray-700 text-base">Name of the Beneficiary:</td>
                    <td className="py-4 text-gray-800 text-base font-medium">University of Engineering and Management, Kolkata</td>
                  </tr>
                  <tr className="border-b border-gray-300 hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="py-4 pr-4 font-bold text-gray-700 text-base">Name of the Bank:</td>
                    <td className="py-4 text-gray-800 text-base font-medium">Indian Overseas Bank, Sector - V, Salt Lake Branch</td>
                  </tr>
                  <tr className="border-b border-gray-300 hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="py-4 pr-4 font-bold text-gray-700 text-base">Beneficiary A/c. No:</td>
                    <td className="py-4"><span className="bg-orange-50 text-brand-orange font-bold text-base px-3 py-1 rounded-lg border border-brand-orange/30">164201000001924 (Savings A/c.)</span></td>
                  </tr>
                  <tr className="border-b border-gray-300 hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="py-4 pr-4 font-bold text-gray-700 text-base">IFSC Code:</td>
                    <td className="py-4"><span className="bg-orange-50 text-brand-orange font-bold text-base px-3 py-1 rounded-lg border border-brand-orange/30">IOBA0001642</span></td>
                  </tr>
                  <tr className="hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="py-4 pr-4 font-bold text-gray-700 text-base">SWIFT Code:</td>
                    <td className="py-4"><span className="bg-orange-50 text-brand-orange font-bold text-base px-3 py-1 rounded-lg border border-brand-orange/30">IOBAINBB893</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-l-4 border-brand-orange p-6 rounded-r-xl shadow-md">
              <h4 className="font-bold text-xl text-brand-navy mb-5 flex items-center">
                <div className="bg-brand-orange/10 p-2 rounded-lg mr-3">
                  <Upload className="h-5 w-5 text-brand-orange" />
                </div>
                Submission Instructions:
              </h4>
              <ul className="space-y-5 text-base text-gray-800">
                <li className="flex items-start group hover:bg-white/50 p-3 rounded-lg transition-all duration-200">
                  <div className="bg-gradient-to-br from-brand-orange to-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5 font-bold shadow-md group-hover:scale-110 transition-transform duration-200">1</div>
                  <span className="leading-relaxed">The author has to email the <strong className="text-brand-navy">TRANSACTION ID</strong> to the conference email ID (<strong className="text-brand-orange">adcomsys@uem.edu.in</strong>) along with their <strong className="text-brand-navy">paper ID</strong> and <strong className="text-brand-navy">paper title</strong>.</span>
                </li>
                <li className="flex items-start group hover:bg-white/50 p-3 rounded-lg transition-all duration-200">
                  <div className="bg-gradient-to-br from-brand-orange to-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5 font-bold shadow-md group-hover:scale-110 transition-transform duration-200">2</div>
                  <span className="leading-relaxed">The file format of the transaction ID proof should be typically in <strong className="text-brand-navy">PDF format</strong>.</span>
                </li>
                <li className="flex items-start group hover:bg-white/50 p-3 rounded-lg transition-all duration-200">
                  <div className="bg-gradient-to-br from-brand-orange to-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5 font-bold shadow-md group-hover:scale-110 transition-transform duration-200">3</div>
                  <span className="leading-relaxed">The file name must be in this format: <code className="bg-white px-3 py-1.5 rounded-lg text-sm font-mono border border-gray-300 shadow-sm">123_Payment_Receipt.pdf</code>. Where 123 is your <a href="https://cmt3.research.microsoft.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 font-medium">cmt3.research.microsoft.com</a> paper number (contained in the acknowledgement message to your submission).</span>
                </li>
                <li className="flex items-start group hover:bg-white/50 p-3 rounded-lg transition-all duration-200">
                  <div className="bg-gradient-to-br from-brand-orange to-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5 font-bold shadow-md group-hover:scale-110 transition-transform duration-200">4</div>
                  <span className="leading-relaxed">For example, if the submission ID is 87 and the corresponding author name is Dr. Alex Simpson, then the file name should be <code className="bg-white px-3 py-1.5 rounded-lg text-sm font-mono border border-gray-300 shadow-sm">87_Payment_Receipt.pdf</code></span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border-2 border-red-300 p-5 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-base text-gray-800">
                  <strong className="text-red-600">Important:</strong> If any author does not send the invoice to the conference email ID, then their registration will not be granted and will be treated as invalid.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Process - Removed Old Section */}
        {/* Important Notes - Removed Old Section */}
        <div className="mb-16 space-y-12 border-2 border-brand-navy/20 p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-5 text-xl font-bold shadow-lg">1</div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl mb-3 text-[#14213d]">Create Account</h4>
                  <p className="text-gray-800 mb-4 text-base leading-relaxed">Sign up on the AdComSys 2026 portal with your email and create a password.</p>
                  <Link href="/signup">
                    <Button size="sm" variant="outline">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-orange text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-5 text-xl font-bold shadow-lg">2</div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl mb-3 text-[#14213d]">Make Payment</h4>
                  <p className="text-gray-800 mb-4 text-base leading-relaxed">Transfer registration fee to the following bank account:</p>
                  <div className="bg-blue-50 p-5 rounded-lg space-y-2 text-base border-2 border-blue-200 shadow-md">
                    <p className="text-gray-800"><strong>Bank Name:</strong> State Bank of India</p>
                    <p className="text-gray-800"><strong>Account Name:</strong> AdComSys 2026</p>
                    <p className="text-gray-800"><strong>Account Number:</strong> 1234567890</p>
                    <p className="text-gray-800"><strong>IFSC Code:</strong> SBIN0001234</p>
                    <p className="text-gray-800"><strong>Branch:</strong> Salt Lake, Kolkata</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-5 text-xl font-bold shadow-lg">3</div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl mb-3 text-[#14213d]">Send Verification Mail</h4>
                  <p className="text-gray-800 mb-4 text-base leading-relaxed">Send the payment invoice to <strong>adcomsys@uem.edu.in</strong> for verification.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-5 text-xl font-bold shadow-lg">4</div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl mb-3 text-[#14213d]">Login Your Profile</h4>
                  <p className="text-gray-800 mb-4 text-base leading-relaxed">Login into your profile for updates on your paper.</p>
                </div>
              </div>
        </div>
        {/* Registration Process - Removed Old Section */}
        {/* Important Notes - Removed Old Section */}

        {/* CTA */}
        <div className="relative text-center py-16 sm:py-20 bg-gradient-to-br from-brand-navy via-brand-navy to-blue-900 rounded-2xl text-white shadow-2xl border-4 border-brand-orange overflow-hidden z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/5 via-transparent to-brand-orange/5"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
              Ready to Register?
            </h2>
            <p className="text-gray-200 mb-10 sm:mb-12 text-xl sm:text-2xl lg:text-3xl px-4 font-medium max-w-4xl mx-auto leading-relaxed">
              Join researchers and professionals from around the world at <span className="text-brand-orange font-bold">AdComSys 2026</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-8 px-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto text-xl px-10 py-7 bg-gradient-to-r from-brand-orange to-orange-500 text-white hover:from-orange-500 hover:to-brand-orange font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border-2 border-orange-400">
                  <Upload className="mr-3 h-7 w-7" />
                  Register Now
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-xl px-10 py-7 bg-white/10 backdrop-blur-sm text-white border-3 border-white hover:bg-white hover:text-brand-navy font-bold transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl">
                  <Mail className="mr-3 h-7 w-7" />
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
