'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, X, FileText, CheckCircle, AlertCircle, Loader2, IndianRupee, DollarSign } from 'lucide-react'

interface PaymentProofUploadProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function PaymentProofUpload({ isOpen, onClose, onSuccess }: PaymentProofUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    amount: '',
    currency: 'INR',
    category: '',
    paperId: '',
    paperTitle: '',
    transactionId: '',
    paymentMethod: 'Bank Transfer',
    notes: ''
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a JPG, PNG, or PDF file')
      return
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (selectedFile.size > maxSize) {
      setError('File size must be less than 10MB')
      return
    }

    setFile(selectedFile)
    setError(null)

    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreviewUrl(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      setError('Please select a payment proof file')
      return
    }

    if (!formData.amount || !formData.category) {
      setError('Please fill in all required fields')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Step 1: Upload file to Supabase Storage
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('bucket', 'payment-screenshots')
      uploadFormData.append('folder', 'receipts')

      const uploadResponse = await fetch('/api/storage/upload', {
        method: 'POST',
        body: uploadFormData
      })

      if (!uploadResponse.ok) {
        const uploadError = await uploadResponse.json()
        throw new Error(uploadError.error || 'Failed to upload file')
      }

      const { url } = await uploadResponse.json()

      // Step 2: Create payment verification record
      const paymentData = {
        ...formData,
        amount: parseFloat(formData.amount),
        screenshot_url: url
      }

      const response = await fetch('/api/authors/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit payment proof')
      }

      setSuccess(true)
      setTimeout(() => {
        onSuccess()
        handleClose()
      }, 2000)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Failed to upload payment proof')
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setPreviewUrl(null)
    setError(null)
    setSuccess(false)
    setFormData({
      amount: '',
      currency: 'INR',
      category: '',
      paperId: '',
      paperTitle: '',
      transactionId: '',
      paymentMethod: 'Bank Transfer',
      notes: ''
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#14213d] flex items-center gap-2">
            <Upload className="h-6 w-6 text-[#fca311]" />
            Upload Payment Proof
          </DialogTitle>
          <DialogDescription>
            Submit your payment receipt for verification. Your registration will be confirmed once the admin verifies your payment.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <Alert className="bg-green-50 border-green-500">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800">
              Payment proof submitted successfully! Admin will verify it shortly.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert className="bg-red-50 border-red-500">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file" className="text-base font-semibold">
                Payment Receipt/Screenshot *
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#fca311] transition-colors">
                {!file ? (
                  <div>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      JPG, PNG, or PDF (max 10MB)
                    </p>
                    <Input
                      id="file"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label htmlFor="file" className="cursor-pointer">
                      <Button type="button" variant="outline" className="mt-4" asChild>
                        <span>Select File</span>
                      </Button>
                    </Label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {previewUrl ? (
                      <div className="relative w-full max-h-48 mx-auto">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={previewUrl}
                          alt="Payment receipt preview"
                          className="max-h-48 mx-auto rounded-lg shadow-md"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-gray-700">
                        <FileText className="h-8 w-8" />
                        <span className="font-medium">{file.name}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-600">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-base">
                  Amount Paid *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="5500.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="text-base">
                  Currency *
                </Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4" />
                        INR (Indian Rupee)
                      </div>
                    </SelectItem>
                    <SelectItem value="USD">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        USD (US Dollar)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-base">
                  Registration Category *
                </Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">UG/PG Student</SelectItem>
                    <SelectItem value="academician">Academician/PhD Scholar</SelectItem>
                    <SelectItem value="industry">Industry Professional</SelectItem>
                    <SelectItem value="attendee">Attending Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod" className="text-base">
                  Payment Method
                </Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="NEFT/RTGS">NEFT/RTGS</SelectItem>
                    <SelectItem value="Wire Transfer">International Wire Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Paper Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paperId" className="text-base">
                  CMT Paper ID (Optional)
                </Label>
                <Input
                  id="paperId"
                  placeholder="e.g., 123"
                  value={formData.paperId}
                  onChange={(e) => setFormData({ ...formData, paperId: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionId" className="text-base">
                  Transaction ID
                </Label>
                <Input
                  id="transactionId"
                  placeholder="e.g., TXN123456789"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paperTitle" className="text-base">
                Paper Title (Optional)
              </Label>
              <Input
                id="paperTitle"
                placeholder="Enter your paper title"
                value={formData.paperTitle}
                onChange={(e) => setFormData({ ...formData, paperTitle: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-base">
                Additional Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Any additional information..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUploading || !file}
                className="bg-[#fca311] hover:bg-[#ff9800] text-white"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Payment Proof
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
