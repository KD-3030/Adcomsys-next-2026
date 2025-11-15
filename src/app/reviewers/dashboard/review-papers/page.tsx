'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
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
import { FileText, CheckCircle, XCircle, ArrowLeft, Eye } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface Paper {
  id: string
  cmt_paper_id: string
  title: string
  abstract: string
  authors: string
  subject_area: string
  status: string
  review_status: string
  review_comments: string
  submission_date: string
  user_id: string
}

export default function ReviewPapersPage() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewComments, setReviewComments] = useState('')
  const [reviewDecision, setReviewDecision] = useState<'accepted' | 'rejected' | ''>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchPapers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchPapers = async () => {
    try {
      const response = await fetch('/api/reviewers/papers/pending', {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setPapers(data.papers)
      } else if (response.status === 401) {
        router.push('/login')
      } else {
        toast.error('Failed to fetch papers')
      }
    } catch (error) {
      console.error('Failed to fetch papers:', error)
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReviewPaper = (paper: Paper) => {
    setSelectedPaper(paper)
    setReviewComments(paper.review_comments || '')
    setReviewDecision('')
    setIsReviewDialogOpen(true)
  }

  const handleSubmitReview = async () => {
    if (!selectedPaper || !reviewDecision) {
      toast.error('Please select a decision')
      return
    }

    if (!reviewComments.trim()) {
      toast.error('Please provide review comments')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/reviewers/papers/${selectedPaper.id}/review`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          status: reviewDecision,
          review_comments: reviewComments,
          review_status: 'completed'
        })
      })

      if (response.ok) {
        toast.success('Review submitted successfully')
        setIsReviewDialogOpen(false)
        fetchPapers()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to submit review')
      }
    } catch (error) {
      console.error('Failed to submit review:', error)
      toast.error('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending_approval: { label: 'Pending Approval', className: 'bg-yellow-100 text-yellow-800' },
      submitted: { label: 'Submitted', className: 'bg-blue-100 text-blue-800' },
      under_review: { label: 'Under Review', className: 'bg-purple-100 text-purple-800' },
      accepted: { label: 'Accepted', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.submitted
    return <Badge className={config.className}>{config.label}</Badge>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Themed Header */}
      <header className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white border-b-4 border-[#fca311] shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/reviewers/dashboard">
              <Button variant="outline" size="sm" className="bg-transparent text-white border-white hover:bg-white hover:text-[#14213d]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Review Papers</h1>
              <p className="text-gray-300 text-sm">Review and evaluate assigned papers</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">

          {/* Papers List */}
          {papers.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No papers assigned for review</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {papers.map((paper) => (
                <Card key={paper.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{paper.title}</CardTitle>
                        <CardDescription className="text-sm space-y-1">
                          <div><span className="font-semibold">CMT ID:</span> {paper.cmt_paper_id}</div>
                          <div><span className="font-semibold">Authors:</span> {paper.authors || 'Not specified'}</div>
                          <div><span className="font-semibold">Subject Area:</span> {paper.subject_area || 'Not specified'}</div>
                          <div><span className="font-semibold">Submitted:</span> {new Date(paper.submission_date).toLocaleDateString()}</div>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(paper.status)}
                        <Badge className={paper.review_status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                          {paper.review_status === 'completed' ? 'Reviewed' : 'Pending Review'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Abstract:</h4>
                      <p className="text-sm text-gray-700 line-clamp-3">{paper.abstract || 'No abstract provided'}</p>
                    </div>
                    <Button 
                      onClick={() => handleReviewPaper(paper)}
                      className="bg-[#fca311] hover:bg-[#ff9800] text-white"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Review Paper
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Paper</DialogTitle>
            <DialogDescription>
              Provide your review and decision for this paper
            </DialogDescription>
          </DialogHeader>

          {selectedPaper && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">{selectedPaper.title}</h3>
                <p className="text-sm text-gray-600">CMT ID: {selectedPaper.cmt_paper_id}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Abstract:</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedPaper.abstract}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Details:</h4>
                <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
                  <p><span className="font-semibold">Authors:</span> {selectedPaper.authors || 'Not specified'}</p>
                  <p><span className="font-semibold">Subject Area:</span> {selectedPaper.subject_area || 'Not specified'}</p>
                </div>
              </div>

              <div>
                <Label htmlFor="decision">Review Decision *</Label>
                <Select value={reviewDecision} onValueChange={(value: 'accepted' | 'rejected') => setReviewDecision(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select decision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accepted">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Accept
                      </div>
                    </SelectItem>
                    <SelectItem value="rejected">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        Reject
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="comments">Review Comments *</Label>
                <Textarea
                  id="comments"
                  placeholder="Provide detailed feedback for the authors..."
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  rows={6}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                  className="bg-[#fca311] hover:bg-[#ff9800] text-white"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
