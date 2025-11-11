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
      color: 'blue',
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
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to AdComSys 2026 Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          const colors = getColorClasses(stat.color)
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${colors.bg} p-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${colors.text}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
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
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
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
                    className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.pendingPayments / stats.totalUsers) * 100 || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a 
                href="/admin/payments" 
                className="block p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Review Payments</span>
                  <Badge variant="destructive">{stats.pendingPayments}</Badge>
                </div>
              </a>
              <a 
                href="/admin/contacts" 
                className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Check Messages</span>
                  <Badge className="bg-purple-600">{stats.unreadContacts}</Badge>
                </div>
              </a>
              <a 
                href="/admin/users" 
                className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Manage Users</span>
                  <Badge className="bg-blue-600">{stats.totalUsers}</Badge>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-600" />
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
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardContent className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">May 5-7, 2026</div>
              <p className="text-blue-100 text-sm">Conference Dates</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">6 Tracks</div>
              <p className="text-blue-100 text-sm">Research Areas</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">Springer LNNS</div>
              <p className="text-blue-100 text-sm">Publication Partner</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
