'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft, ExternalLink, Plus } from 'lucide-react'

interface Submission {
  id: string
  title: string
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'revision_required'
  submitted_date: string
  track: string
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/authors/submissions')
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login')
            return
          }
          throw new Error('Failed to fetch submissions')
        }
        const data = await response.json()
        setSubmissions(data.submissions || [])
      } catch (error) {
        console.error('Error fetching submissions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubmissions()
  }, [router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-500'
      case 'under_review':
        return 'bg-yellow-500'
      case 'accepted':
        return 'bg-green-500'
      case 'rejected':
        return 'bg-red-500'
      case 'revision_required':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="h-4 w-4" />
      case 'under_review':
        return <AlertCircle className="h-4 w-4" />
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />
      case 'rejected':
        return <XCircle className="h-4 w-4" />
      case 'revision_required':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
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
                <h1 className="text-3xl font-bold">My Submissions</h1>
                <p className="text-gray-300 text-sm">Track your paper submissions</p>
              </div>
            </div>
            <a href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#fca311] hover:bg-[#ff9800] text-white">
                <Plus className="mr-2 h-4 w-4" />
                Submit New Paper
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {submissions.length === 0 ? (
            <Card className="shadow-lg border-l-4 border-[#fca311]">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FileText className="h-24 w-24 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-[#14213d] mb-2">No Submissions Yet</h3>
                <p className="text-gray-600 mb-6 text-center max-w-md">
                  You haven&apos;t submitted any papers yet. Submit your research through the Microsoft CMT portal.
                </p>
                <a href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#fca311] hover:bg-[#ff9800] text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Submit Your First Paper
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission.id} className="shadow-lg border-l-4 border-[#fca311] hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-white to-blue-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-[#14213d] mb-2">{submission.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {submission.track}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Submitted: {new Date(submission.submitted_date).toLocaleDateString()}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge className={`${getStatusColor(submission.status)} text-white flex items-center gap-1`}>
                        {getStatusIcon(submission.status)}
                        {submission.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>Track progress and view feedback for your submission</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-[#fca311] text-[#14213d] hover:bg-[#fca311] hover:text-white">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
