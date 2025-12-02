'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FileText, CreditCard, User, LogOut, TrendingUp, Clock, CheckCircle, ExternalLink } from 'lucide-react'

interface UserProfile {
  id: string
  full_name: string
  email: string
  role: string
}

interface DashboardStats {
  totalSubmissions: number
  acceptedSubmissions: number
  pendingReview: number
  totalPayments: number
  verifiedPayments: number
  pendingPayments: number
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalSubmissions: 0,
    acceptedSubmissions: 0,
    pendingReview: 0,
    totalPayments: 0,
    verifiedPayments: 0,
    pendingPayments: 0
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
        // Fetch papers
        const papersRes = await fetch('/api/authors/papers', {
          credentials: 'include'
        })
        if (papersRes.ok) {
          const papersData = await papersRes.json()
          const papers = papersData.papers || []
          setStats(prev => ({
            ...prev,
            totalSubmissions: papers.length,
            acceptedSubmissions: papers.filter((p: any) => p.status === 'accepted').length,
            pendingReview: papers.filter((p: any) => p.status === 'under_review' || p.status === 'submitted').length
          }))
        }

        // Fetch payments
        const paymentsRes = await fetch('/api/authors/payments', {
          credentials: 'include'
        })
        if (paymentsRes.ok) {
          const paymentsData = await paymentsRes.json()
          const payments = paymentsData.payments || []
          setStats(prev => ({
            ...prev,
            totalPayments: payments.length,
            verifiedPayments: payments.filter((p: any) => p.status === 'verified').length,
            pendingPayments: payments.filter((p: any) => p.status === 'pending').length
          }))
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
      <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCC5C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="h-screen flex flex-col bg-linear-to-b from-blue-50 via-white to-gray-50 overflow-hidden">
      {/* Header */}
      <header className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white border-b-4 border-[#FFCC5C] shadow-lg shrink-0">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">AdComSys 2026</h1>
            <p className="text-xs sm:text-sm text-gray-300">Author Dashboard</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="bg-[#FFCC5C] text-white border-white hover:bg-white hover:text-[#14213d] transition-all text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
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
          <div className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-lg border-l-4 border-[#FFCC5C] shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 truncate">Welcome back, {profile?.full_name || 'User'}!</h2>
                <div className="text-gray-300 flex items-center gap-2 text-xs sm:text-sm">
                  <Badge className="bg-[#FFCC5C] text-white hover:bg-[#ff9800] text-xs px-2 py-0">
                    {profile?.role.toUpperCase()}
                  </Badge>
                  <span className="truncate">{profile?.email}</span>
                </div>
              </div>
              <User className="h-8 w-8 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-[#FFCC5C] opacity-50 shrink-0 ml-2" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 shrink-0">
            <Card className="border-l-4 border-blue-500 shadow-md hover:shadow-lg roundedtransition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 sm:p-4">
                <CardTitle className="text-xs sm:text-sm font-medium text-white-600">Submissions</CardTitle>
                <FileText className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{stats.totalSubmissions}</div>
                <p className="text-xs text-white-500 mt-0.5">Papers</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 sm:p-4">
                <CardTitle className="text-xs sm:text-sm font-medium text-white-600">Accepted</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{stats.acceptedSubmissions}</div>
                <p className="text-xs text-white-500 mt-0.5">Papers</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-yellow-500 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 sm:p-4">
                <CardTitle className="text-xs sm:text-sm font-medium text-white-600">Review</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{stats.pendingReview}</div>
                <p className="text-xs text-white-500 mt-0.5">Pending</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#FFCC5C] shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 sm:p-4">
                <CardTitle className="text-xs sm:text-sm font-medium text-white-600">Payments</CardTitle>
                <CreditCard className="h-4 w-4 text-[#FFCC5C]" />
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{stats.totalPayments}</div>
                <p className="text-xs text-white-500 mt-0.5">{stats.verifiedPayments} verified</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 flex-1 min-h-0">
            <Card className="shadow-md border-l-4 border-[#FFCC5C] hover:shadow-lg transition-all flex flex-col">
              <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] rounded-3xl text-white p-3 sm:p-4 pb-2">
                <CardTitle className="text-sm sm:text-base">
                  Submissions
                </CardTitle>
                <CardDescription className="text-gray-300 text-xs">Track papers</CardDescription>
              </CardHeader>
              <CardContent className="pt-3 sm:pt-4 p-3 sm:p-4 bg-linear-to-br from-white to-blue-50 flex-1 flex flex-col">
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 flex-1">
                  {stats.totalSubmissions > 0 
                    ? `${stats.totalSubmissions} paper${stats.totalSubmissions > 1 ? 's' : ''} submitted` 
                    : 'No submissions yet'}
                </p>
                <Button className="w-full bg-[#FFCC5C] border hover:bg-[#ff9800] text-white text-xs sm:text-sm py-1.5 sm:py-2" asChild>
                  <Link href="/authors/dashboard/submissions">View</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md border-l-4 border-[#FFCC5C] hover:shadow-lg transition-all flex flex-col">
              <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white rounded-3xl p-3 sm:p-4 pb-2">
                <CardTitle className="text-sm sm:text-base">
                  Payments
                </CardTitle>
                <CardDescription className="text-gray-300 text-xs">Check status</CardDescription>
              </CardHeader>
              <CardContent className="pt-3 sm:pt-4 p-3 sm:p-4 bg-linear-to-br from-white to-blue-50 flex-1 flex flex-col">
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 flex-1">
                  {stats.totalPayments > 0 
                    ? `${stats.verifiedPayments} verified, ${stats.pendingPayments} pending` 
                    : 'No payments'}
                </p>
                <Button className="w-full bg-white border-2 border-[#FFCC5C] text-[#14213d] hover:bg-[#FFCC5C] hover:text-white text-xs sm:text-sm py-1.5 sm:py-2" variant="outline" asChild>
                  <Link href="/authors/dashboard/payments">View</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md border-l-4 border-[#FFCC5C] hover:shadow-lg transition-all flex flex-col">
              <CardHeader className="bg-linear-to-r from-[#14213d] to-[#1a2844] rounded-3xl text-white p-3 sm:p-4 pb-2">
                <CardTitle className="text-sm sm:text-base">
                  Profile
                </CardTitle>
                <CardDescription className="text-gray-300 text-xs">Update info</CardDescription>
              </CardHeader>
              <CardContent className="pt-3 sm:pt-4 p-3 sm:p-4 bg-linear-to-br from-white to-blue-50 flex-1 flex flex-col">
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 flex-1">Manage account</p>
                <Button className="w-full bg-white border-2 border-[#FFCC5C] text-[#14213d] hover:bg-[#FFCC5C] hover:text-white text-xs sm:text-sm py-1.5 sm:py-2" variant="outline" asChild>
                  <Link href="/authors/dashboard/profile">Edit</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md border-l-4 border-green-500 hover:shadow-lg transition-all flex flex-col">
              <CardHeader className="bg-linear-to-r from-brand-navy-700 to-navy-900 text-white rounded-3xl p-3 sm:p-4 pb-2">
                <CardTitle className="text-sm sm:text-base">
                  CMT Portal
                </CardTitle>
                <CardDescription className="text-gray-200 text-xs">Submit paper</CardDescription>
              </CardHeader>
              <CardContent className="pt-3 sm:pt-4 p-3 sm:p-4 bg-linear-to-br from-white to-green-50 flex-1 flex flex-col">
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 flex-1">Official portal</p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm py-1.5 sm:py-2" asChild>
                  <a href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank" rel="noopener noreferrer">
                    Go to CMT →
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Role-Specific Sections */}
          {(profile?.role === 'reviewer' || profile?.role === 'admin') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 shrink-0">
              {profile?.role === 'reviewer' && (
                <Card className="border-l-4 border-blue-500 shadow-md bg-linear-to-br from-blue-50 to-white">
                  <CardHeader className="bg-linear-to-r from-blue-700 to-blue-900 text-white p-3 sm:p-4 pb-2">
                    <CardTitle className="text-sm sm:text-base">
                      Reviewer
                    </CardTitle>
                    <CardDescription className="text-gray-200 text-xs">Review papers</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-3 p-3 sm:p-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm py-1.5 sm:py-2" asChild>
                      <Link href="/authors/dashboard/reviews">View Papers</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {profile?.role === 'admin' && (
                <Card className="border-l-4 border-purple-500 shadow-md bg-linear-to-br from-purple-50 to-white">
                  <CardHeader className="bg-linear-to-r from-purple-700 to-purple-900 text-white p-3 sm:p-4 pb-2">
                    <CardTitle className="text-sm sm:text-base">
                      Admin
                    </CardTitle>
                    <CardDescription className="text-gray-200 text-xs">Manage conference</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-3 p-3 sm:p-4">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm py-1.5 sm:py-2" asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          </div>
        </div>
      </main>
    </div>
  )
}

