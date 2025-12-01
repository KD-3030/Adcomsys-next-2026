'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye, FileText, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'

interface Paper {
  id: string
  title: string
  cmt_paper_id: string
  submission_date: string
  status: string
  review_status?: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  author_name?: string
}

export default function ReviewPapersPage() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('all')

  useEffect(() => {
    fetchPapers()
  }, [])

  const fetchPapers = async () => {
    try {
      const response = await fetch('/api/reviewers/papers')
      if (response.ok) {
        const data = await response.json()
        setPapers(data.papers || [])
      }
    } catch (error) {
      console.error('Failed to fetch papers:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
      pending: { label: 'Pending Review', className: 'bg-orange-100 text-orange-700', icon: Clock },
      reviewed: { label: 'Reviewed', className: 'bg-blue-100 text-blue-700', icon: CheckCircle },
      accepted: { label: 'Accepted', className: 'bg-green-100 text-green-700', icon: CheckCircle },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700', icon: XCircle },
    }

    const config = statusConfig[status] || statusConfig.pending
    const Icon = config.icon

    return (
      <Badge className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const filteredPapers = papers.filter((paper) => {
    if (filter === 'all') return true
    if (filter === 'pending') return paper.review_status === 'pending'
    if (filter === 'reviewed') return paper.review_status === 'reviewed' || paper.review_status === 'accepted' || paper.review_status === 'rejected'
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading papers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Review Papers</h1>
        <p className="text-gray-600 mt-2">Review papers assigned to you for evaluation</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{papers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {papers.filter(p => p.review_status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Reviewed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {papers.filter(p => p.review_status !== 'pending').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Papers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Papers
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
            >
              Pending
            </Button>
            <Button
              variant={filter === 'reviewed' ? 'default' : 'outline'}
              onClick={() => setFilter('reviewed')}
            >
              Reviewed
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Papers Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Assigned Papers
          </CardTitle>
          <CardDescription>
            {filteredPapers.length} paper{filteredPapers.length !== 1 ? 's' : ''} assigned
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPapers.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium">No papers assigned yet</p>
              <p className="text-gray-500 mt-2">Papers will appear here when assigned to you by the admin</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paper ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPapers.map((paper) => (
                    <TableRow key={paper.id}>
                      <TableCell className="font-mono text-sm">
                        {paper.cmt_paper_id || 'N/A'}
                      </TableCell>
                      <TableCell className="font-medium max-w-md truncate">
                        {paper.title}
                      </TableCell>
                      <TableCell>{paper.author_name || 'Unknown'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(paper.submission_date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(paper.review_status || 'pending')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link href={`/reviewers/dashboard/papers/${paper.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CMT Portal Link */}
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader>
          <CardTitle>Need to Access CMT?</CardTitle>
          <CardDescription>
            For detailed paper content and submission files, visit the Microsoft CMT portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
            <Button variant="outline">
              Open CMT Portal
              <Eye className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
