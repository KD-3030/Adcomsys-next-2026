'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, CheckCircle, Clock, User, ExternalLink, Eye } from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalAssigned: number
  reviewed: number
  pending: number
  accepted: number
}

export default function ReviewerDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalAssigned: 0,
    reviewed: 0,
    pending: 0,
    accepted: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
    fetchStats()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/reviewers/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card className="border-l-4 border-l-blue-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back, {user?.full_name || 'Reviewer'}!</CardTitle>
          <CardDescription>
            You are logged in as a <Badge variant="outline" className="ml-2">Reviewer</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Review assigned papers and provide valuable feedback to help improve the quality of submissions.
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Submissions Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assigned</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalAssigned}</div>
            <p className="text-xs text-gray-500 mt-1">Papers assigned to you</p>
          </CardContent>
        </Card>

        {/* Accepted Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviewed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.reviewed}</div>
            <p className="text-xs text-gray-500 mt-1">Papers reviewed</p>
          </CardContent>
        </Card>

        {/* Review Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting your review</p>
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.accepted}</div>
            <p className="text-xs text-gray-500 mt-1">Papers you accepted</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>
              My Profile
            </CardTitle>
            <CardDescription>Update your reviewer profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/reviewers/dashboard/profile">
              <Button className="w-full">
                View Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* CMT Portal Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>
              CMT Portal
            </CardTitle>
            <CardDescription>Access the Microsoft CMT review system</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
              <Button className="w-full" variant="outline">
                Open CMT Portal
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Reviewer Card - View Papers */}
      <Card className="border-l-4 border-l-green-600 shadow-lg">
        <CardHeader>
          <CardTitle>
            Review Papers
          </CardTitle>
          <CardDescription>
            View and review papers assigned to you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Access all papers assigned to you for review. Provide ratings, comments, and recommendations.
          </p>
          <Link href="/reviewers/dashboard/papers">
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
              <Eye className="h-5 w-5 mr-2" />
              View Assigned Papers
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
