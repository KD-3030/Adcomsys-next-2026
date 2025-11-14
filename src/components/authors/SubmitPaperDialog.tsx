'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Upload, Loader2 } from 'lucide-react'

interface SubmitPaperDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const PAPER_TRACKS = [
  'Wireless Networks and Mobile Computing',
  'Ad Hoc Networks',
  'Sensor Networks',
  'Internet of Things (IoT)',
  'Network Security and Privacy',
  'Cloud Computing',
  'Edge Computing',
  'Network Protocols and Architecture',
  'Quality of Service (QoS)',
  'Network Performance and Management',
  'Software Defined Networking (SDN)',
  'Network Function Virtualization (NFV)',
  'Machine Learning for Networks',
  'Blockchain and Distributed Systems',
  'Green Computing and Energy Efficiency'
]

export default function SubmitPaperDialog({ isOpen, onClose, onSuccess }: SubmitPaperDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    cmtPaperId: '',
    title: '',
    authors: '',
    subjectArea: '',
    abstract: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.cmtPaperId || !formData.title || !formData.authors || !formData.subjectArea) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/authors/papers/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit paper')
      }

      toast.success('Paper submitted successfully! Awaiting admin approval.')
      setFormData({
        cmtPaperId: '',
        title: '',
        authors: '',
        subjectArea: '',
        abstract: ''
      })
      onSuccess()
    } catch (error) {
      console.error('Submission error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to submit paper')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit New Paper</DialogTitle>
          <DialogDescription>
            Enter your paper details. This will be sent to admin for approval before appearing in your submissions.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800">
            <strong className="font-semibold">Important:</strong> Make sure you have already submitted your paper through the{' '}
            <a 
              href="https://cmt3.research.microsoft.com/AdComSys2025" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-blue-600 font-semibold"
            >
              CMT Portal
            </a>
            {' '}and received your CMT Paper ID before filling this form.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cmtPaperId">
              CMT Paper ID <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cmtPaperId"
              value={formData.cmtPaperId}
              onChange={(e) => setFormData({ ...formData, cmtPaperId: e.target.value })}
              placeholder="e.g., 12345"
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your paper ID from the CMT portal
            </p>
          </div>

          <div>
            <Label htmlFor="title">
              Paper Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter the full paper title"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="authors">
              Authors <span className="text-red-500">*</span>
            </Label>
            <Input
              id="authors"
              value={formData.authors}
              onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
              placeholder="e.g., John Doe, Jane Smith, Robert Brown"
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter all author names separated by commas
            </p>
          </div>

          <div>
            <Label htmlFor="subjectArea">
              Subject Area / Track <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.subjectArea}
              onValueChange={(value) => setFormData({ ...formData, subjectArea: value })}
              required
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a track" />
              </SelectTrigger>
              <SelectContent>
                {PAPER_TRACKS.map((track) => (
                  <SelectItem key={track} value={track}>
                    {track}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="abstract">Abstract (Optional)</Label>
            <Textarea
              id="abstract"
              value={formData.abstract}
              onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
              placeholder="Enter paper abstract..."
              rows={5}
              className="mt-1"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#fca311] hover:bg-[#ff9800] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Paper
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
