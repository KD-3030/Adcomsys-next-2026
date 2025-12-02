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
  ScrollablePopup,
  ScrollablePopupHeader,
  ScrollablePopupTitle,
  ScrollablePopupDescription,
} from '@/components/ui/scrollable-popup'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle, XCircle, Eye, Clock, FileText } from 'lucide-react'
import { toast } from 'sonner'

interface Paper {
  id: string
  cmt_paper_id: string
  title: string
  authors?: string
  subject_area?: string
  abstract?: string
  status: string
  submission_date: string
  created_at: string
  approved_by?: string
  approved_at?: string
  approval_notes?: string
  user?: {
    full_name: string
    email: string
    institution: string
  }
}

export default function AdminSubmissionsPage() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('pending_approval')
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [approvalNotes, setApprovalNotes] = useState('')

  useEffect(() => {
    fetchPapers()
  }, [])

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredPapers(papers)
    } else {
      setFilteredPapers(papers.filter(p => p.status === statusFilter))
    }
  }, [papers, statusFilter])

  const fetchPapers = async () => {
    try {
      const response = await fetch('/api/admin/submissions')
      if (response.ok) {
        const data = await response.json()
        setPapers(data.papers)
      } else {
        toast.error('Failed to fetch submissions')
      }
    } catch (error) {
      console.error('Failed to fetch papers:', error)
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewPaper = (paper: Paper) => {
    setSelectedPaper(paper)
    setApprovalNotes(paper.approval_notes || '')
    setIsViewDialogOpen(true)
  }

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedPaper) return

    try {
      const response = await fetch(`/api/admin/submissions/${selectedPaper.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          approval_notes: approvalNotes
        })
      })

      if (response.ok) {
        toast.success(`Paper ${newStatus === 'submitted' ? 'approved' : 'rejected'} successfully`)
        setIsViewDialogOpen(false)
        fetchPapers()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to update status')
      }
    } catch (error) {
      console.error('Update error:', error)
      toast.error('An error occurred')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return <Badge className="bg-purple-500 text-white">Pending Approval</Badge>
      case 'submitted':
        return <Badge className="bg-blue-500 text-white">Approved</Badge>
      case 'under_review':
        return <Badge className="bg-yellow-500 text-white">Under Review</Badge>
      case 'accepted':
        return <Badge className="bg-green-500 text-white">Accepted</Badge>
      case 'rejected':
        return <Badge className="bg-red-500 text-white">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCC5C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#14213d] mb-2">Paper Submissions</h1>
        <p className="text-gray-600">Review and approve author paper submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-purple-600">
                  {papers.filter(p => p.status === 'pending_approval').length}
                </p>
              </div>
              <Clock className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-blue-600">
                  {papers.filter(p => p.status === 'submitted').length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-[#14213d]">
                  {papers.length}
                </p>
              </div>
              <FileText className="h-10 w-10 text-[#FFCC5C]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {papers.filter(p => p.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="h-10 w-10 text-red-500" />
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
              <SelectItem value="pending_approval">Pending Approval</SelectItem>
              <SelectItem value="submitted">Approved</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Papers Table */}
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paper ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPapers.length > 0 ? (
                  filteredPapers.map((paper) => (
                    <TableRow key={paper.id}>
                      <TableCell className="font-mono text-sm">{paper.cmt_paper_id}</TableCell>
                      <TableCell className="max-w-xs truncate">{paper.title}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{paper.user?.full_name || 'Unknown'}</div>
                          <div className="text-gray-500 text-xs">{paper.user?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">{paper.subject_area || 'N/A'}</TableCell>
                      <TableCell>{getStatusBadge(paper.status)}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(paper.submission_date || paper.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewPaper(paper)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No papers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Review Paper Dialog */}
      <ScrollablePopup open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} className="max-w-3xl">
        <ScrollablePopupHeader>
          <ScrollablePopupTitle>Review Paper Submission</ScrollablePopupTitle>
          <ScrollablePopupDescription>
            Review paper details and approve or reject the submission
          </ScrollablePopupDescription>
        </ScrollablePopupHeader>
          {selectedPaper && (
            <div className="space-y-4">
              {/* Paper Info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-900">Paper Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-gray-600">CMT Paper ID:</span>
                      <span className="ml-2 font-mono font-medium">{selectedPaper.cmt_paper_id}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className="ml-2">{getStatusBadge(selectedPaper.status)}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Title:</span>
                    <p className="ml-2 font-medium mt-1">{selectedPaper.title}</p>
                  </div>
                  {selectedPaper.authors && (
                    <div>
                      <span className="text-gray-600">Authors:</span>
                      <p className="ml-2 mt-1">{selectedPaper.authors}</p>
                    </div>
                  )}
                  {selectedPaper.subject_area && (
                    <div>
                      <span className="text-gray-600">Subject Area:</span>
                      <Badge variant="outline" className="ml-2">{selectedPaper.subject_area}</Badge>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Submission Date:</span>
                    <span className="ml-2">{new Date(selectedPaper.submission_date || selectedPaper.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Submitted By</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{selectedPaper.user?.full_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2">{selectedPaper.user?.email}</span>
                  </div>
                  {selectedPaper.user?.institution && (
                    <div className="col-span-2">
                      <span className="text-gray-600">Institution:</span>
                      <span className="ml-2">{selectedPaper.user.institution}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Abstract */}
              {selectedPaper.abstract && (
                <div>
                  <Label>Abstract</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded border text-sm">
                    {selectedPaper.abstract}
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <Label htmlFor="approval-notes">Approval Notes</Label>
                <Textarea
                  id="approval-notes"
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  placeholder="Add notes about this submission..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              {/* Actions */}
              {selectedPaper.status === 'pending_approval' && (
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => handleUpdateStatus('submitted')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Submission
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => handleUpdateStatus('rejected')}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Submission
                  </Button>
                </div>
              )}
            </div>
          )}
      </ScrollablePopup>
    </div>
  )
}
