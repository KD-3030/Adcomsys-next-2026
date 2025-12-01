'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  Calendar, 
  Mic, 
  UserCog, 
  Mail, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  name: string
  role: string
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          if (data.user.role !== 'admin') {
            toast.error('Access denied. Admin privileges required.')
            router.push('/dashboard')
            return
          }
          setUser(data.user)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      toast.error('Logout failed')
    }
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/papers', label: 'Papers', icon: FileText },
    { href: '/admin/payments', label: 'Payments', icon: CreditCard },
    { href: '/admin/events', label: 'Events', icon: Calendar },
    { href: '/admin/speakers', label: 'Speakers', icon: Mic },
    { href: '/admin/committee', label: 'Committee', icon: UserCog },
    { href: '/admin/contacts', label: 'Contacts', icon: Mail },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Top Navigation Bar */}
      <nav className="bg-brand-navy border-b-4 border-brand-orange fixed top-0 left-0 right-0 z-40 shadow-xl">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-brand-white hover:text-brand-orange hover:bg-brand-navy"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div>
                <h1 className="text-xl font-bold text-brand-orange">AdComSys 2026</h1>
                <p className="text-xs text-brand-white/80">Admin Panel</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-brand-white">{user.name}</p>
                <p className="text-xs text-brand-white/80">{user.email}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-2 border-brand-orange text-brand-white hover:bg-brand-orange hover:text-brand-navy transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`
        fixed top-[61px] left-0 bottom-0 w-64 bg-white border-r-2 border-brand-orange/20 z-30 transition-transform duration-300 shadow-lg
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 h-full overflow-y-auto">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-brand-orange text-brand-navy font-semibold shadow-md' 
                      : 'text-gray-700 hover:bg-brand-orange/10 hover:text-brand-navy'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Quick Links */}
          <div className="mt-8 pt-8 border-t border-brand-orange/20">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Quick Links</p>
            <div className="space-y-2">
              <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-brand-orange transition-colors duration-200">
                <span>View Website</span>
              </Link>
              <Link href="/authors/dashboard" className="flex items-center text-sm text-gray-600 hover:text-brand-orange transition-colors duration-200">
                <span>User Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-[61px]">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
