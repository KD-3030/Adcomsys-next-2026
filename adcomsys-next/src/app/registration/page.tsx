import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IndianRupee, Users, FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Navbar />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="mb-4 bg-brand-orange text-brand-navy hover:bg-brand-orange/90">Registration</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4">Conference Registration</h1>
          <p className="text-base sm:text-lg text-gray-600">
            Secure your spot at AdComSys 2026 - Register now!
          </p>
        </div>

        {/* Registration Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card className="border-2 border-brand-navy/20 hover:border-brand-orange transition-colors shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-orange" />
              </div>
              <CardTitle>Student</CardTitle>
              <CardDescription>Full-time students</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center mb-4">
                <IndianRupee className="h-6 w-6 text-gray-600" />
                <span className="text-3xl font-bold">2,000</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Conference access
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Certificate
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Lunch & refreshments
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Conference materials
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-4">* Valid student ID required</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-brand-navy/20 hover:border-brand-orange transition-colors shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-orange" />
              </div>
              <CardTitle>Academician</CardTitle>
              <CardDescription>Faculty & researchers</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center mb-4">
                <IndianRupee className="h-6 w-6 text-gray-600" />
                <span className="text-3xl font-bold">3,000</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  All conference sessions
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Certificate & proceedings
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Meals & networking
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Workshop access
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-600 transition-colors border-blue-600">
            <CardHeader className="text-center">
              <Badge className="mx-auto mb-2">Popular</Badge>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle>Industry</CardTitle>
              <CardDescription>Corporate professionals</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center mb-4">
                <IndianRupee className="h-6 w-6 text-gray-600" />
                <span className="text-3xl font-bold">5,000</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-brand-orange mr-2 mt-0.5 flex-shrink-0" />
                  Full conference access
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-brand-orange mr-2 mt-0.5 flex-shrink-0" />
                  Premium networking
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-brand-orange mr-2 mt-0.5 flex-shrink-0" />
                  All meals & banquet
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-brand-orange mr-2 mt-0.5 flex-shrink-0" />
                  Conference proceedings
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-brand-navy/20 hover:border-brand-orange transition-colors shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-orange" />
              </div>
              <CardTitle>Attendee</CardTitle>
              <CardDescription>Listen-only access</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center mb-4">
                <IndianRupee className="h-6 w-6 text-gray-600" />
                <span className="text-3xl font-bold">1,500</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Session attendance
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Certificate
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Refreshments
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  No paper presentation
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Registration Process */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Registration Process</CardTitle>
            <CardDescription>Follow these steps to complete your registration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4 text-lg font-bold">1</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">Create Account</h4>
                  <p className="text-gray-600 mb-2">Sign up on the AdComSys 2026 portal with your email and create a password.</p>
                  <Link href="/signup">
                    <Button size="sm" variant="outline">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-orange text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4 text-lg font-bold">2</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">Make Payment</h4>
                  <p className="text-gray-600 mb-2">Transfer registration fee to the following bank account:</p>
                  <div className="bg-brand-navy/5 p-4 rounded-lg space-y-1 text-sm border border-brand-navy/10">
                    <p><strong>Bank Name:</strong> State Bank of India</p>
                    <p><strong>Account Name:</strong> AdComSys 2026</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                    <p><strong>IFSC Code:</strong> SBIN0001234</p>
                    <p><strong>Branch:</strong> Salt Lake, Kolkata</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-orange text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4 text-lg font-bold">3</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">Upload Payment Proof</h4>
                  <p className="text-gray-600 mb-2">Log in to your dashboard and upload a screenshot/photo of your payment transaction.</p>
                  <div className="flex items-center bg-brand-orange/10 p-3 rounded-lg text-sm text-brand-navy border border-brand-orange/30">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-brand-orange" />
                    <span>Payment proof must clearly show transaction ID, amount, and date.</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-orange text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4 text-lg font-bold">4</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">Verification & Confirmation</h4>
                  <p className="text-gray-600 mb-2">Our team will verify your payment within 24-48 hours. You&apos;ll receive a confirmation email once approved.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-8 sm:mb-12 shadow-xl border-2 border-brand-navy/20">
          <CardHeader className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white">
            <CardTitle className="flex items-center text-xl sm:text-2xl">
              <FileText className="mr-2 h-6 w-6 text-brand-orange" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Early Bird Discount:</strong> Register before March 1, 2026 to get 10% off!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Paper Authors:</strong> At least one author must register to present the paper.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Group Registration:</strong> Groups of 5+ can avail 15% discount. Contact us for group codes.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Refund Policy:</strong> Cancellations before March 15, 2026 are eligible for 50% refund.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>On-site Registration:</strong> Available on conference days with 20% additional charge.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-8 sm:py-12 bg-gradient-to-r from-brand-navy to-brand-navy/90 rounded-lg text-white shadow-2xl border-4 border-brand-orange">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Register?</h2>
          <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg px-4">
            Join researchers and professionals from around the world at AdComSys 2026
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg bg-brand-orange text-brand-navy hover:bg-brand-orange/90 font-semibold shadow-lg">
                <Upload className="mr-2 h-5 w-5" />
                Register Now
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg bg-transparent text-white border-2 border-white hover:bg-white hover:text-brand-navy">
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
