'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FileCheck, ArrowLeft, Eye, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface ReviewedPaper {
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
  reviewed_at: string
}

export default function ReviewedPapersPage() {
  const [papers, setPapers] = useState<ReviewedPaper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPaper, setSelectedPaper] = useState<ReviewedPaper | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchReviewedPapers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchReviewedPapers = async () => {
    try {
      const response = await fetch('/api/reviewers/papers/completed', {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setPapers(data.papers)
      } else if (response.status === 401) {
        router.push('/login')
      } else {
        toast.error('Failed to fetch reviewed papers')
      }
    } catch (error) {
      console.error('Failed to fetch papers:', error)
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewDetails = (paper: ReviewedPaper) => {
    setSelectedPaper(paper)
    setIsDetailDialogOpen(true)
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

  const getDecisionIcon = (status: string) => {
    if (status === 'accepted') {
      return <CheckCircle className="h-5 w-5 text-green-600" />
    } else if (status === 'rejected') {
      return <XCircle className="h-5 w-5 text-red-600" />
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-gray-50">
      {/* Themed Header */}
      <header className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white border-b-4 border-[#fca311] shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/reviewers/dashboard">
              <Button variant="outline" size="sm" className="bg-transparent text-white border-white hover:bg-white hover:text-[#14213d]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Reviewed Papers</h1>
              <p className="text-gray-300 text-sm">View your completed paper reviews</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reviewed</p>
                    <p className="text-2xl font-bold text-[#14213d]">{papers.length}</p>
                  </div>
                  <FileCheck className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Accepted</p>
                    <p className="text-2xl font-bold text-green-600">
                      {papers.filter(p => p.status === 'accepted').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">
                      {papers.filter(p => p.status === 'rejected').length}
                    </p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Papers List */}
          {papers.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No reviewed papers yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {papers.map((paper) => (
                <Card key={paper.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getDecisionIcon(paper.status)}
                          <CardTitle className="text-xl">{paper.title}</CardTitle>
                        </div>
                        <CardDescription className="text-sm space-y-1">
                          <div><span className="font-semibold">CMT ID:</span> {paper.cmt_paper_id}</div>
                          <div><span className="font-semibold">Authors:</span> {paper.authors || 'Not specified'}</div>
                          <div><span className="font-semibold">Subject Area:</span> {paper.subject_area || 'Not specified'}</div>
                          <div><span className="font-semibold">Submitted:</span> {new Date(paper.submission_date).toLocaleDateString()}</div>
                          {paper.reviewed_at && (
                            <div><span className="font-semibold">Reviewed:</span> {new Date(paper.reviewed_at).toLocaleDateString()}</div>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(paper.status)}
                        <Badge className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Your Review Comments:</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded line-clamp-2">
                        {paper.review_comments || 'No comments provided'}
                      </p>
                    </div>
                    <Button 
                      onClick={() => handleViewDetails(paper)}
                      variant="outline"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>
              Complete details of your review
            </DialogDescription>
          </DialogHeader>

          {selectedPaper && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getDecisionIcon(selectedPaper.status)}
                <h3 className="font-bold text-lg">{selectedPaper.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">CMT ID:</p>
                  <p className="text-gray-700">{selectedPaper.cmt_paper_id}</p>
                </div>
                <div>
                  <p className="font-semibold">Status:</p>
                  <div className="mt-1">{getStatusBadge(selectedPaper.status)}</div>
                </div>
                <div>
                  <p className="font-semibold">Submitted:</p>
                  <p className="text-gray-700">{new Date(selectedPaper.submission_date).toLocaleDateString()}</p>
                </div>
                {selectedPaper.reviewed_at && (
                  <div>
                    <p className="font-semibold">Reviewed:</p>
                    <p className="text-gray-700">{new Date(selectedPaper.reviewed_at).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">Authors:</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  {selectedPaper.authors || 'Not specified'}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Subject Area:</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  {selectedPaper.subject_area || 'Not specified'}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Abstract:</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-wrap">
                  {selectedPaper.abstract}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Your Review Comments:</h4>
                <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded whitespace-pre-wrap border-l-4 border-blue-500">
                  {selectedPaper.review_comments || 'No comments provided'}
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setIsDetailDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

