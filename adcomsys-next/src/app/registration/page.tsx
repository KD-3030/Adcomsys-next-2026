import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, IndianRupee, Users, FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react'

export default function RegistrationPage() {
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
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Registration</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Conference Registration</h1>
          <p className="text-lg text-gray-600">
            Secure your spot at AdComSys 2026 - Register now!
          </p>
        </div>

        {/* Registration Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-2 hover:border-blue-600 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
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

          <Card className="border-2 hover:border-blue-600 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
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
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Full conference access
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Premium networking
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  All meals & banquet
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Conference proceedings
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-600 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
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
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4 text-lg font-bold">2</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">Make Payment</h4>
                  <p className="text-gray-600 mb-2">Transfer registration fee to the following bank account:</p>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-1 text-sm">
                    <p><strong>Bank Name:</strong> State Bank of India</p>
                    <p><strong>Account Name:</strong> AdComSys 2026</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                    <p><strong>IFSC Code:</strong> SBIN0001234</p>
                    <p><strong>Branch:</strong> Salt Lake, Kolkata</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4 text-lg font-bold">3</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">Upload Payment Proof</h4>
                  <p className="text-gray-600 mb-2">Log in to your dashboard and upload a screenshot/photo of your payment transaction.</p>
                  <div className="flex items-center bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Payment proof must clearly show transaction ID, amount, and date.</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4 text-lg font-bold">4</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">Verification & Confirmation</h4>
                  <p className="text-gray-600 mb-2">Our team will verify your payment within 24-48 hours. You&apos;ll receive a confirmation email once approved.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-6 w-6 text-blue-600" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Early Bird Discount:</strong> Register before March 1, 2026 to get 10% off!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Paper Authors:</strong> At least one author must register to present the paper.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Group Registration:</strong> Groups of 5+ can avail 15% discount. Contact us for group codes.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Refund Policy:</strong> Cancellations before March 15, 2026 are eligible for 50% refund.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>On-site Registration:</strong> Available on conference days with 20% additional charge.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Register?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join researchers and professionals from around the world at AdComSys 2026
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg">
                <Upload className="mr-2 h-5 w-5" />
                Register Now
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
                Login to Dashboard
              </Button>
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
