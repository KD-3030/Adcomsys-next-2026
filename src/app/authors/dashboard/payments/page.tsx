'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { CreditCard, Clock, CheckCircle, XCircle, AlertTriangle, ArrowLeft, Upload, DollarSign, Eye } from 'lucide-react'
import PaymentProofUpload from '@/components/authors/PaymentProofUpload'

interface Payment {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'verified' | 'rejected'
  created_at: string
  screenshot_url: string
  category: string
  paper_id?: string
  transaction_id?: string | null
  verification_notes?: string
  verified_at?: string | null
  verified_by?: string | null
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const router = useRouter()

  const fetchPayments = useCallback(async () => {
    console.log('Fetching payments...')
    try {
      const response = await fetch('/api/authors/payments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
      })
      
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        if (response.status === 401) {
          console.error('Unauthorized - redirecting to login')
          router.push('/login')
          return
        }
        const errorData = await response.json()
        console.error('Error response:', errorData)
        throw new Error(errorData.error || 'Failed to fetch payments')
      }
      
      const data = await response.json()
      console.log('Payments data received:', data)
      console.log('Number of payments:', data.payments?.length || 0)
      
      setPayments(data.payments || [])
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchPayments()
  }, [fetchPayments])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500'
      case 'verified':
        return 'bg-green-500'
      case 'rejected':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'verified':
        return <CheckCircle className="h-4 w-4" />
      case 'rejected':
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white border-b-4 border-[#fca311] shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/authors/dashboard">
                <Button variant="outline" size="sm" className="bg-transparent text-white border-white hover:bg-white hover:text-[#14213d]">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Payment History</h1>
                <p className="text-gray-300 text-sm">Track your registration and publication fees</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsUploadOpen(true)}
              className="bg-[#fca311] hover:bg-[#ff9800] text-white"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Payment Proof
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Payment Info Card */}
          <Card className="shadow-lg border-l-4 border-blue-500">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
              <CardTitle className="flex items-center gap-2 text-[#14213d]">
                <DollarSign className="h-6 w-6 text-blue-500" />
                Registration Fee Information
              </CardTitle>
              <CardDescription>Conference registration and publication fees</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Early Bird (Before Feb 15, 2026)</p>
                  <p className="text-2xl font-bold text-green-700">$350</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Regular (Feb 16 - Mar 30, 2026)</p>
                  <p className="text-2xl font-bold text-blue-700">$450</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-white rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-600 mb-1">Late Registration (After Mar 30, 2026)</p>
                  <p className="text-2xl font-bold text-orange-700">$550</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                * Payment includes conference registration, proceedings, certificate, and lunch for conference days
              </p>
            </CardContent>
          </Card>

          {/* Payments List */}
          {payments.length === 0 ? (
            <Card className="shadow-lg border-l-4 border-[#fca311]">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <CreditCard className="h-24 w-24 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-[#14213d] mb-2">No Payment Records</h3>
                <p className="text-gray-600 mb-6 text-center max-w-md">
                  You haven&apos;t made any payments yet. Upload your payment proof after completing the registration fee.
                </p>
                <Button 
                  onClick={() => setIsUploadOpen(true)}
                  className="bg-[#fca311] hover:bg-[#ff9800] text-white"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Payment Proof
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <Card key={payment.id} className="shadow-lg border-l-4 border-[#fca311] hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-white to-blue-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-[#14213d] mb-2">
                          {payment.currency} {payment.amount.toFixed(2)}
                        </CardTitle>
                        <CardDescription className="space-y-1">
                          <p className="text-xs text-gray-500">
                            Payment Date: {new Date(payment.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            Category: {payment.category.charAt(0).toUpperCase() + payment.category.slice(1)}
                          </p>
                          {payment.transaction_id && (
                            <p className="text-xs text-gray-500">
                              Transaction ID: {payment.transaction_id}
                            </p>
                          )}
                        </CardDescription>
                      </div>
                      <Badge className={`${getStatusColor(payment.status)} text-white flex items-center gap-1`}>
                        {getStatusIcon(payment.status)}
                        {payment.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    {payment.verification_notes && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                        <p className="text-sm text-gray-700">
                          <strong>Admin Note:</strong> {payment.verification_notes}
                        </p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(payment.screenshot_url, '_blank')}
                        className="border-[#fca311] text-[#fca311] hover:bg-[#fca311] hover:text-white"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Upload Dialog */}
      <PaymentProofUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => {
          setIsUploadOpen(false)
          fetchPayments()
        }}
      />
    </div>
  )
}
