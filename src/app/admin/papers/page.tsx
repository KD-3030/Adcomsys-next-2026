'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import { Badge } from '@/components/ui/badge'
import { Eye, Edit, Trash2, FileText, Search } from 'lucide-react'
import { toast } from 'sonner'

interface Paper {
  id: string
  user_id: string
  cmt_paper_id: string
  title: string
  abstract?: string
  subject_area?: string
  authors?: string
  status: 'pending_approval' | 'submitted' | 'under_review' | 'accepted' | 'rejected'
  reviewer_id?: string
  review_comments?: string
  review_status?: 'pending' | 'completed'
  approved_by?: string
  approved_at?: string
  approval_notes?: string
  submission_date: string
  created_at: string
  user?: {
    id: string
    full_name: string
    email: string
    institution: string
  }
  reviewer?: {
    id: string
    full_name: string
    email: string
  }
  approver?: {
    id: string
    full_name: string
    email: string
  }
}

export default function PapersPage() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [filteredPapers, setFilteredPapers] = useState<Paper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    subject_area: '',
    authors: '',
    status: 'submitted' as Paper['status'],
    review_comments: '',
    approval_notes: ''
  })

  useEffect(() => {
    fetchPapers()
  }, [])

  useEffect(() => {
    let filtered = papers

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (paper) =>
          paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.cmt_paper_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.user?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((paper) => paper.status === statusFilter)
    }

    setFilteredPapers(filtered)
  }, [papers, searchTerm, statusFilter])

  const fetchPapers = async () => {
    try {
      const response = await fetch('/api/admin/papers')
      if (response.ok) {
        const data = await response.json()
        setPapers(data.papers)
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

  const handleView = (paper: Paper) => {
    setSelectedPaper(paper)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (paper: Paper) => {
    setEditingPaper(paper)
    setFormData({
      title: paper.title,
      abstract: paper.abstract || '',
      subject_area: paper.subject_area || '',
      authors: paper.authors || '',
      status: paper.status,
      review_comments: paper.review_comments || '',
      approval_notes: paper.approval_notes || ''
    })
    setIsEditDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingPaper) return

    try {
      const response = await fetch(`/api/admin/papers/${editingPaper.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Paper updated successfully')
        setIsEditDialogOpen(false)
        fetchPapers()
      } else {
        toast.error('Failed to update paper')
      }
    } catch (error) {
      console.error('Failed to update paper:', error)
      toast.error('An error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this paper?')) return

    try {
      const response = await fetch(`/api/admin/papers/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Paper deleted')
        fetchPapers()
      } else {
        toast.error('Failed to delete paper')
      }
    } catch (error) {
      console.error('Failed to delete paper:', error)
      toast.error('An error occurred')
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      pending_approval: { color: 'bg-yellow-500', text: 'Pending Approval' },
      submitted: { color: 'bg-blue-500', text: 'Submitted' },
      under_review: { color: 'bg-purple-500', text: 'Under Review' },
      accepted: { color: 'bg-green-500', text: 'Accepted' },
      rejected: { color: 'bg-red-500', text: 'Rejected' }
    }
    const statusConfig = config[status as keyof typeof config] || { color: 'bg-gray-500', text: status }
    return <Badge className={`${statusConfig.color} text-white`}>{statusConfig.text}</Badge>
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Paper Submissions</h1>
          <p className="text-gray-600 mt-1">Manage and review paper submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-lg px-4 py-2">
            Total: {papers.length}
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title, ID, author, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending_approval">Pending Approval</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Papers Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paper ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Subject Area</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPapers.length > 0 ? (
                  filteredPapers.map((paper) => (
                    <TableRow key={paper.id}>
                      <TableCell className="font-mono text-sm">{paper.cmt_paper_id}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium truncate">{paper.title}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{paper.user?.full_name}</div>
                          <div className="text-sm text-gray-500">{paper.user?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {paper.subject_area ? (
                          <Badge variant="outline" className="text-xs">
                            {paper.subject_area}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(paper.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(paper.submission_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(paper)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(paper)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(paper.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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

      {/* View Paper Dialog */}
      <ScrollablePopup open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} className="max-w-4xl">
        <ScrollablePopupHeader>
          <ScrollablePopupTitle>Paper Details</ScrollablePopupTitle>
          <ScrollablePopupDescription>
            View complete paper submission information
          </ScrollablePopupDescription>
        </ScrollablePopupHeader>
        {selectedPaper && (
          <div className="space-y-6">
            {/* Paper Info */}
            <div className="bg-brand-navy/5 border-l-4 border-brand-navy p-4 rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-brand-navy text-lg">{selectedPaper.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">ID: {selectedPaper.cmt_paper_id}</p>
                </div>
                {getStatusBadge(selectedPaper.status)}
              </div>
              
              {selectedPaper.abstract && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Abstract:</p>
                  <p className="text-sm text-gray-600">{selectedPaper.abstract}</p>
                </div>
              )}
            </div>

            {/* Author Info */}
            <div>
              <h4 className="font-semibold text-brand-navy mb-2">Author Information</h4>
              <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 p-4 rounded-lg">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 font-medium">{selectedPaper.user?.full_name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 font-medium">{selectedPaper.user?.email}</span>
                </div>
                <div>
                  <span className="text-gray-600">Institution:</span>
                  <span className="ml-2 font-medium">{selectedPaper.user?.institution || '-'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Submission Date:</span>
                  <span className="ml-2 font-medium">
                    {new Date(selectedPaper.submission_date).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Paper Details */}
            <div>
              <h4 className="font-semibold text-brand-navy mb-2">Paper Details</h4>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subject Area:</span>
                  <span className="font-medium">{selectedPaper.subject_area || '-'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Co-Authors:</span>
                  <span className="font-medium">{selectedPaper.authors || '-'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Review Status:</span>
                  <span className="font-medium capitalize">{selectedPaper.review_status || 'Pending'}</span>
                </div>
              </div>
            </div>

            {/* Review Info */}
            {(selectedPaper.reviewer || selectedPaper.review_comments) && (
              <div>
                <h4 className="font-semibold text-brand-navy mb-2">Review Information</h4>
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg space-y-2">
                  {selectedPaper.reviewer && (
                    <div className="text-sm">
                      <span className="text-gray-600">Reviewer:</span>
                      <span className="ml-2 font-medium">{selectedPaper.reviewer.full_name}</span>
                    </div>
                  )}
                  {selectedPaper.review_comments && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Comments:</p>
                      <p className="text-sm text-gray-600">{selectedPaper.review_comments}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Approval Info */}
            {(selectedPaper.approver || selectedPaper.approval_notes) && (
              <div>
                <h4 className="font-semibold text-brand-navy mb-2">Approval Information</h4>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-2">
                  {selectedPaper.approver && (
                    <div className="text-sm">
                      <span className="text-gray-600">Approved By:</span>
                      <span className="ml-2 font-medium">{selectedPaper.approver.full_name}</span>
                    </div>
                  )}
                  {selectedPaper.approved_at && (
                    <div className="text-sm">
                      <span className="text-gray-600">Approved At:</span>
                      <span className="ml-2 font-medium">
                        {new Date(selectedPaper.approved_at).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {selectedPaper.approval_notes && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                      <p className="text-sm text-gray-600">{selectedPaper.approval_notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center gap-2 pt-4">
              <div className="flex gap-2">
                {selectedPaper.status === 'pending_approval' && (
                  <>
                    <Button
                      onClick={async () => {
                        try {
                          const response = await fetch(`/api/admin/papers/${selectedPaper.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: 'submitted' })
                          })
                          if (response.ok) {
                            toast.success('Paper approved')
                            setIsViewDialogOpen(false)
                            fetchPapers()
                          } else {
                            toast.error('Failed to approve paper')
                          }
                        } catch (error) {
                          toast.error('An error occurred')
                        }
                      }}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={async () => {
                        try {
                          const response = await fetch(`/api/admin/papers/${selectedPaper.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: 'rejected' })
                          })
                          if (response.ok) {
                            toast.success('Paper rejected')
                            setIsViewDialogOpen(false)
                            fetchPapers()
                          } else {
                            toast.error('Failed to reject paper')
                          }
                        } catch (error) {
                          toast.error('An error occurred')
                        }
                      }}
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    handleEdit(selectedPaper)
                  }}
                  className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90"
                >
                  Edit Paper
                </Button>
              </div>
            </div>
          </div>
        )}
      </ScrollablePopup>

      {/* Edit Paper Dialog */}
      <ScrollablePopup open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} className="max-w-3xl">
        <ScrollablePopupHeader>
          <ScrollablePopupTitle>Edit Paper</ScrollablePopupTitle>
          <ScrollablePopupDescription>
            Update paper information and status
          </ScrollablePopupDescription>
        </ScrollablePopupHeader>
        {editingPaper && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Paper ID:</strong> {editingPaper.cmt_paper_id}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Author:</strong> {editingPaper.user?.full_name} ({editingPaper.user?.email})
              </p>
            </div>

            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="abstract">Abstract</Label>
              <Textarea
                id="abstract"
                value={formData.abstract}
                onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject_area">Subject Area</Label>
                <Input
                  id="subject_area"
                  value={formData.subject_area}
                  onChange={(e) => setFormData({ ...formData, subject_area: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as Paper['status'] })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending_approval">Pending Approval</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="authors">Co-Authors</Label>
              <Input
                id="authors"
                value={formData.authors}
                onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                placeholder="Comma-separated list of co-authors"
              />
            </div>

            <div>
              <Label htmlFor="review_comments">Review Comments</Label>
              <Textarea
                id="review_comments"
                value={formData.review_comments}
                onChange={(e) => setFormData({ ...formData, review_comments: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="approval_notes">Approval Notes</Label>
              <Textarea
                id="approval_notes"
                value={formData.approval_notes}
                onChange={(e) => setFormData({ ...formData, approval_notes: e.target.value })}
                rows={2}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90"
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </ScrollablePopup>
    </div>
  )
}
