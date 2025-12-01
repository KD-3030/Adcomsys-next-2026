'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FileText, ArrowLeft, Clock, CheckCircle, Star } from 'lucide-react'

interface Review {
  id: string
  paper_title: string
  submission_id: string
  status: 'pending' | 'in_progress' | 'completed'
  assigned_date: string
  due_date: string
  score?: number
  comments?: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/authors/reviews')
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login')
            return
          }
          if (response.status === 403) {
            setUserRole('user')
            setIsLoading(false)
            return
          }
          throw new Error('Failed to fetch reviews')
        }
        const data = await response.json()
        setReviews(data.reviews || [])
        setUserRole(data.role)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500'
      case 'in_progress':
        return 'bg-blue-500'
      case 'completed':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'in_progress':
        return <FileText className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    )
  }

  if (userRole !== 'reviewer' && userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-gray-50">
        <header className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white border-b-4 border-[#fca311] shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Link href="/authors/dashboard">
                <Button variant="outline" size="sm" className="bg-transparent text-white border-white hover:bg-white hover:text-[#14213d]">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Paper Reviews</h1>
                <p className="text-gray-300 text-sm">Review assigned papers</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-l-4 border-red-500">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Star className="h-24 w-24 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-[#14213d] mb-2">Reviewer Access Only</h3>
                <p className="text-gray-600 text-center max-w-md">
                  This section is only available to users with reviewer privileges. 
                  If you believe this is an error, please contact the conference administrators.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white border-b-4 border-[#fca311] shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/authors/dashboard">
              <Button variant="outline" size="sm" className="bg-transparent text-white border-white hover:bg-white hover:text-[#14213d]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Paper Reviews</h1>
              <p className="text-gray-300 text-sm">Review assigned papers and provide feedback</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {reviews.length === 0 ? (
            <Card className="shadow-lg border-l-4 border-[#fca311]">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FileText className="h-24 w-24 text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold text-[#14213d] mb-2">No Assigned Reviews</h3>
                <p className="text-gray-600 text-center max-w-md">
                  You don&apos;t have any papers assigned for review at the moment. 
                  Check back later or contact the program chair if you expect assignments.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="shadow-lg border-l-4 border-[#fca311] hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-linear-to-br from-white to-blue-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-[#14213d] mb-2">{review.paper_title}</CardTitle>
                        <CardDescription className="space-y-1">
                          <p className="text-xs text-gray-500">
                            Assigned: {new Date(review.assigned_date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            Due: {new Date(review.due_date).toLocaleDateString()}
                            {isOverdue(review.due_date) && review.status !== 'completed' && (
                              <Badge variant="destructive" className="ml-2 text-xs">Overdue</Badge>
                            )}
                          </p>
                        </CardDescription>
                      </div>
                      <Badge className={`${getStatusColor(review.status)} text-white flex items-center gap-1`}>
                        {getStatusIcon(review.status)}
                        {review.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {review.status === 'completed' && review.score && (
                      <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-green-800">Score: {review.score}/10</span>
                        </div>
                        {review.comments && (
                          <p className="text-sm text-gray-700 mt-2">{review.comments}</p>
                        )}
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>
                          {review.status === 'completed' 
                            ? 'Review completed. View your submitted feedback.' 
                            : 'Click to view paper details and submit your review.'}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-[#fca311] text-[#14213d] hover:bg-[#fca311] hover:text-white"
                        disabled={review.status === 'completed'}
                      >
                        {review.status === 'completed' ? 'View Review' : 'Start Review'}
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

