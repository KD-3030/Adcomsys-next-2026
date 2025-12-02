'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { toast } from 'sonner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login')
      }

      toast.success('Logged in successfully!')
      
      // Redirect based on user role with hard navigation to ensure cookie is sent
      if (data.user?.role === 'admin') {
        window.location.href = '/admin'
      } else if (data.user?.role === 'reviewer') {
        window.location.href = '/reviewers/dashboard'
      } else {
        window.location.href = '/authors/dashboard'
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to login'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-gray-50 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-[#FFCC5C] to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-[#FFCC5C]/20 backdrop-blur-sm p-3 rounded-full ring-2 ring-[#FFCC5C]/50">
              <LogIn className="h-10 w-10 text-[#FFCC5C]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome to <span className="text-[#FFCC5C]">AdComSys 2026</span>
          </h1>
          <p className="text-lg text-gray-300">Sign in to access your account</p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-2xl border-l-4 border-[#FFCC5C] rounded-3xl">
          <CardHeader className="text-center bg-linear-to-br from-yellow-500 to-yellow-300 rounded-t-3xl">
            <CardTitle className="text-2xl font-bold text-[#14213d]">Sign In</CardTitle>
            <CardDescription className="text-gray-600">Enter your credentials to continue</CardDescription>
          </CardHeader>
        <CardContent className="bg-linear-to-br from-blue-50 to-blue-100 rounded-b-3xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2 text-black">
              <Label htmlFor="email" className="text-black font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2 text-black">
              <Label htmlFor="password" className="text-black font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <Button type="submit" className="w-full bg-[#FFCC5C] text-white hover:bg-[#ff9800] font-semibold shadow-lg hover:shadow-xl transition-all" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="text-center space-y-2 text-sm">
              <div>
                <Link href="/forgot-password" className="text-[#FFCC5C] hover:text-[#ff9800] hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="text-gray-700">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-[#FFCC5C] hover:text-[#ff9800] hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
      
      <Footer />
    </div>
  )
}
