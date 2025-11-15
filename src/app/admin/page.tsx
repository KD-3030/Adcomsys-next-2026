'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, FileText, CreditCard, Mail, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface Stats {
  totalUsers: number
  pendingPayments: number
  totalPapers: number
  unreadContacts: number
  recentRegistrations: number
  approvedPayments: number
}

interface RecentActivity {
  id: string
  type: string
  message: string
  timestamp: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    pendingPayments: 0,
    totalPapers: 0,
    unreadContacts: 0,
    recentRegistrations: 0,
    approvedPayments: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data.stats)
          setRecentActivity(data.recentActivity || [])
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'white',
      change: `+${stats.recentRegistrations} this week`
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      icon: CreditCard,
      color: 'orange',
      change: 'Requires attention'
    },
    {
      title: 'Paper Submissions',
      value: stats.totalPapers,
      icon: FileText,
      color: 'green',
      change: 'Via CMT Portal'
    },
    {
      title: 'Unread Messages',
      value: stats.unreadContacts,
      icon: Mail,
      color: 'purple',
      change: 'Contact form'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-brand-navy/10', text: 'text-brand-navy' },
      orange: { bg: 'bg-brand-orange/10', text: 'text-brand-orange' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' }
    }
    return colors[color] || colors.blue
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-24 bg-gray-100" />
              <CardContent className="h-16 bg-gray-50" />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-brand-navy to-brand-navy/90 rounded-xl p-6 shadow-lg border-l-4 border-brand-orange">
        <h1 className="text-3xl font-bold text-brand-white">Admin Dashboard</h1>
        <p className="text-brand-white/80 mt-1">Welcome to AdComSys 2026 Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          const colors = getColorClasses(stat.color)
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-l-4 border-brand-orange/40 hover:border-brand-orange">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white-600">
                  {stat.title}
                </CardTitle>
                <div className={`${colors.bg} p-3 rounded-lg shadow-sm`}>
                  <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-brand-white">{stat.value}</div>
                <p className="text-xs text-white-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Important Notice */}
      <Card className="bg-gradient-to-r from-brand-orange to-brand-orange/90 text-brand-navy border-none shadow-lg">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5" />
              <p className="font-semibold">Conference Date: June 25-26, 2026 | Springer LNNS Publication</p>
            </div>
            <Badge className="bg-brand-navy text-brand-white hover:bg-brand-navy/90">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-brand-navy/10">
          <CardHeader>
            <CardTitle className="flex items-center text-brand-white">
              <TrendingUp className="h-5 w-5 mr-2 text-brand-orange" />
              Registration Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Approved Payments</span>
                  <span className="font-medium">{stats.approvedPayments}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-brand-orange h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.approvedPayments / stats.totalUsers) * 100 || 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pending Verification</span>
                  <span className="font-medium">{stats.pendingPayments}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-brand-navy h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.pendingPayments / stats.totalUsers) * 100 || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-brand-navy/10">
          <CardHeader>
            <CardTitle className="flex items-center text-brand-white">
              <CheckCircle className="h-5 w-5 mr-2 text-brand-orange" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a 
                href="/admin/payments" 
                className="block p-3 bg-brand-orange hover:bg-brand-orange/10 rounded-lg transition-all duration-200 border border-brand-orange/20 hover:border-brand-orange"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-navy">Review Payments</span>
                  <Badge className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90">{stats.pendingPayments}</Badge>
                </div>
              </a>
              <a 
                href="/admin/contacts" 
                className="block p-3 bg-brand-orange hover:bg-brand-orange/10 rounded-lg transition-all duration-200 border border-brand-orange/20 hover:border-brand-orange"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-navy">Check Messages</span>
                  <Badge className="bg-brand-orange text-black hover:bg-brand-orange/90">{stats.unreadContacts}</Badge>
                </div>
              </a>
              <a 
                href="/admin/submissions" 
                className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-400"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-navy">Review Submissions</span>
                  <Badge className="bg-blue-600 text-white hover:bg-blue-700">{stats.totalPapers}</Badge>
                </div>
              </a>
              <a 
                href="/admin/users" 
                className="block p-3 bg-brand-orange hover:bg-brand-orange/10 rounded-lg transition-all duration-200 border border-brand-orange/20 hover:border-brand-orange"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-navy">Manage Users</span>
                  <Badge className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90">{stats.totalUsers}</Badge>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="border-brand-navy/10">
          <CardHeader>
            <CardTitle className="flex items-center text-brand-navy">
              <Clock className="h-5 w-5 mr-2 text-brand-orange" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-700">{activity.message}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No recent activity
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Conference Info */}
      <Card className="bg-gradient-to-r from-brand-navy via-brand-navy to-brand-black text-brand-white border-none shadow-xl">
        <CardContent className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="border-r border-brand-white/20 last:border-r-0">
              <div className="text-3xl font-bold mb-1 text-brand-orange">June 25-26, 2026</div>
              <p className="text-brand-white/80 text-sm">Conference Dates</p>
            </div>
            <div className="border-r border-brand-white/20 last:border-r-0">
              <div className="text-3xl font-bold mb-1 text-brand-orange">6 Tracks</div>
              <p className="text-brand-white/80 text-sm">Research Areas</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1 text-brand-orange">Springer LNNS</div>
              <p className="text-brand-white/80 text-sm">Publication Partner</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
