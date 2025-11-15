'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FileText, User, LogOut, CheckCircle, Clock, AlertCircle, List } from 'lucide-react'

interface UserProfile {
  id: string
  full_name: string
  email: string
  role: string
}

interface DashboardStats {
  totalAssignedPapers: number
  completedReviews: number
  pendingReviews: number
  acceptedPapers: number
  rejectedPapers: number
}

export default function ReviewerDashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalAssignedPapers: 0,
    completedReviews: 0,
    pendingReviews: 0,
    acceptedPapers: 0,
    rejectedPapers: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (!response.ok) {
          router.push('/login')
          return
        }
        const data = await response.json()
        
        if (data.user.role !== 'reviewer') {
          router.push('/login')
          return
        }
        
        setProfile(data.user)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    const fetchStats = async () => {
      try {
        const response = await fetch('/api/reviewers/stats', {
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchProfile()
    fetchStats()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-gray-50 overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white border-b-4 border-[#fca311] shadow-lg flex-shrink-0">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">AdComSys 2026</h1>
            <p className="text-xs sm:text-sm text-gray-300">Reviewer Dashboard</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="bg-[#fca311] text-white border-white hover:bg-white hover:text-[#14213d] transition-all text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
          >
            <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Sign out
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 h-full">
          <div className="max-w-7xl mx-auto h-full flex flex-col gap-3 sm:gap-4">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-lg border-l-4 border-[#fca311] flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 truncate">Welcome back, {profile?.full_name || 'Reviewer'}!</h2>
                  <div className="text-gray-300 flex items-center gap-2 text-xs sm:text-sm">
                    <Badge className="bg-[#fca311] text-white hover:bg-[#ff9800] text-xs px-2 py-0">
                      {profile?.role.toUpperCase()}
                    </Badge>
                    <span className="truncate">{profile?.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 flex-shrink-0">
              <Card className="border-2 border-blue-200 hover:shadow-lg transition-all">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    Assigned Papers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{stats.totalAssignedPapers}</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 hover:shadow-lg transition-all">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{stats.completedReviews}</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200 hover:shadow-lg transition-all">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">{stats.pendingReviews}</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-emerald-200 hover:shadow-lg transition-all">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                    Accepted
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600">{stats.acceptedPapers}</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 hover:shadow-lg transition-all">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                    Rejected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600">{stats.rejectedPapers}</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 flex-shrink-0">
              <Link href="/reviewers/dashboard/review-papers" className="block">
                <Card className="hover:shadow-xl transition-all bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                        <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-sm sm:text-base">Review Papers</CardTitle>
                        <CardDescription className="text-xs">Review assigned papers</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/reviewers/dashboard/reviewed-papers" className="block">
                <Card className="hover:shadow-xl transition-all bg-gradient-to-br from-green-50 to-white border-2 border-green-200 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                        <List className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-sm sm:text-base">Reviewed Papers</CardTitle>
                        <CardDescription className="text-xs">View completed reviews</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/reviewers/dashboard/profile" className="block">
                <Card className="hover:shadow-xl transition-all bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
                        <User className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-sm sm:text-base">My Profile</CardTitle>
                        <CardDescription className="text-xs">Update your information</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
