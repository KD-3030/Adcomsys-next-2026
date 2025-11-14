'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle, XCircle, Eye, Clock, Download } from 'lucide-react'
import { toast } from 'sonner'

interface Payment {
  id: string
  user_id: string
  amount: number
  currency: string
  category: string
  transaction_id: string | null
  screenshot_url: string
  status: 'pending' | 'verified' | 'rejected'
  verification_notes?: string | null
  created_at: string
  user?: {
    full_name: string
    email: string
    institution: string
  }
  paper?: {
    id: string
    cmt_paper_id: string
    title: string
  } | null
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('pending')
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')

  useEffect(() => {
    fetchPayments()
  }, [])

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredPayments(payments)
    } else {
      setFilteredPayments(payments.filter(p => p.status === statusFilter))
    }
  }, [payments, statusFilter])

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/admin/payments')
      if (response.ok) {
        const data = await response.json()
        setPayments(data.payments)
      } else {
        toast.error('Failed to fetch payments')
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error)
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment)
    setAdminNotes(payment.verification_notes || '')
    setIsViewDialogOpen(true)
  }

  const handleDownloadFile = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
      toast.success('File downloaded successfully')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download file')
    }
  }

  const handlePreviewFile = (url: string) => {
    window.open(url, '_blank')
  }

  const getFileExtension = (url: string) => {
    return url.split('.').pop()?.toLowerCase() || ''
  }

  const isImageFile = (url: string) => {
    const ext = getFileExtension(url)
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)
  }

  const handleUpdateStatus = async (status: 'verified' | 'rejected') => {
    if (!selectedPayment) return

    try {
      const response = await fetch(`/api/admin/payments/${selectedPayment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          verification_notes: adminNotes
        })
      })

      if (response.ok) {
        toast.success(`Payment ${status}`)
        setIsViewDialogOpen(false)
        fetchPayments()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to update payment')
      }
    } catch (error) {
      console.error('Failed to update payment:', error)
      toast.error('An error occurred')
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { color: 'bg-brand-orange text-brand-navy', text: 'Pending' },
      verified: { color: 'bg-brand-navy text-white', text: 'Verified' },
      rejected: { color: 'bg-red-600 text-white', text: 'Rejected' }
    }
    const { color, text } = config[status as keyof typeof config] || config.pending
    return <Badge className={color}>{text}</Badge>
  }

  const exportToCSV = () => {
    const headers = ['User Name', 'Email', 'Amount', 'Currency', 'Category', 'Transaction ID', 'Status', 'Date']
    const rows = filteredPayments.map(payment => [
      payment.user?.full_name || 'N/A',
      payment.user?.email || 'N/A',
      payment.amount,
      payment.currency,
      payment.category,
      payment.transaction_id || 'N/A',
      payment.status,
      new Date(payment.created_at).toLocaleDateString()
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `payments_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    toast.success('CSV exported successfully')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center border-l-4 border-brand-orange bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white p-6 rounded-lg">
        <div>
          <h1 className="text-3xl font-bold">Payment Verification</h1>
          <p className="text-white/80 mt-1">
            {payments.filter(p => p.status === 'pending').length} pending verifications
          </p>
        </div>
        <Button onClick={exportToCSV} className="bg-white text-brand-navy hover:bg-brand-orange hover:text-brand-navy">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-brand-orange">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-brand-orange">
                  {payments.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-10 w-10 text-brand-orange" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-brand-navy">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-brand-navy">
                  {payments.filter(p => p.status === 'verified').length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-brand-navy" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {payments.filter(p => p.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.user?.full_name || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{payment.user?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {payment.currency} {payment.amount}
                      </TableCell>
                      <TableCell className="font-mono text-sm">{payment.transaction_id || 'N/A'}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>
                        {new Date(payment.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewPayment(payment)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No payments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View/Verify Payment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Verification</DialogTitle>
            <DialogDescription>
              Review payment details and approve or reject
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              {/* User Info */}
              <div className="bg-brand-navy/5 border-l-4 border-brand-navy p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-brand-navy">User Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{selectedPayment.user?.full_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">{selectedPayment.user?.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Institution:</span>
                    <span className="ml-2 font-medium">{selectedPayment.user?.institution || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-2 font-medium capitalize">{selectedPayment.category}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-brand-orange/5 border-l-4 border-brand-orange p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-brand-orange">Payment Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Amount:</span>
                    <span className="ml-2 font-medium">{selectedPayment.currency} {selectedPayment.amount}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="ml-2 font-mono text-xs">{selectedPayment.transaction_id || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="ml-2">{getStatusBadge(selectedPayment.status)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2">{new Date(selectedPayment.created_at).toLocaleString()}</span>
                  </div>
                  {selectedPayment.paper && (
                    <div className="col-span-2">
                      <span className="text-gray-600">Paper:</span>
                      <span className="ml-2 font-medium">{selectedPayment.paper.cmt_paper_id} - {selectedPayment.paper.title}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Screenshot */}
              {selectedPayment.screenshot_url && (
                <div>
                  <Label>Payment Proof</Label>
                  <div className="mt-2 border rounded-lg p-4 bg-gray-50 space-y-3">
                    {isImageFile(selectedPayment.screenshot_url) ? (
                      <div className="space-y-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedPayment.screenshot_url}
                          alt="Payment proof"
                          className="max-w-full h-auto rounded border cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => handlePreviewFile(selectedPayment.screenshot_url)}
                        />
                        <p className="text-xs text-gray-500 text-center">Click image to view full size</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-8 bg-white rounded border border-dashed">
                        <div className="text-center space-y-2">
                          <div className="mx-auto w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="font-medium text-gray-700">PDF Document</p>
                          <p className="text-sm text-gray-500">Payment proof file</p>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handlePreviewFile(selectedPayment.screenshot_url)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview in New Tab
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDownloadFile(
                          selectedPayment.screenshot_url,
                          `payment-proof-${selectedPayment.transaction_id || selectedPayment.id}.${getFileExtension(selectedPayment.screenshot_url)}`
                        )}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download File
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <Label htmlFor="admin-notes">Verification Notes</Label>
                <Textarea
                  id="admin-notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this payment verification..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              {/* Actions */}
              {selectedPayment.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-brand-navy text-white hover:bg-brand-navy/90"
                    onClick={() => handleUpdateStatus('verified')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verify Payment
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => handleUpdateStatus('rejected')}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Payment
                  </Button>
                </div>
              )}

              {selectedPayment.verification_notes && selectedPayment.status !== 'pending' && (
                <div className="bg-brand-orange/10 border border-brand-orange p-3 rounded">
                  <p className="text-sm font-semibold text-brand-navy mb-1">Previous Notes:</p>
                  <p className="text-sm text-brand-navy/80">{selectedPayment.verification_notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
