'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { toast } from 'sonner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { UserPlus } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'author' | 'reviewer'>('author')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    
    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          full_name: fullName,
          role,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      toast.success('Account created successfully!')
      
      // Redirect to authors dashboard
      router.push('/authors/dashboard')
      router.refresh()
    } catch (error: unknown) {
      // Handle rate limiting specifically
      if (error instanceof Error) {
        if (error.message.includes('rate limit') || error.message.includes('429')) {
          toast.error('Too many requests', {
            description: 'Please wait 1-2 minutes before trying again. You hit the rate limit.',
          })
        } else {
          toast.error('Signup failed', {
            description: error.message,
          })
        }
      } else {
        toast.error('Failed to create account')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fca311] to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-[#fca311]/20 backdrop-blur-sm p-3 rounded-full ring-2 ring-[#fca311]/50">
              <UserPlus className="h-10 w-10 text-[#fca311]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            Join <span className="text-[#fca311]">AdComSys 2026</span>
          </h1>
          <p className="text-lg text-gray-300">Create your account to get started</p>
        </div>
      </div>

      {/* Signup Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-2xl border-l-4 border-[#fca311] rounded-3xl">
          <CardHeader className="text-center bg-gradient-to-br from-yellow-500 to-yellow-300 rounded-t-3xl">
            <CardTitle className="text-2xl font-bold text-[#14213d]">Create Account</CardTitle>
            <CardDescription className="text-gray-600">Join our academic conference</CardDescription>
          </CardHeader>
        <CardContent className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-b-3xl">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2 text-black">
              <Label htmlFor="fullName" className="text-black font-semibold">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Dr. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2 text-black">
              <Label htmlFor="email" className="text-black font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
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
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={loading}
              />
            </div>

            <div className="space-y-2 text-black">
              <Label htmlFor="role" className="text-black font-semibold">I am a...</Label>
              <Select value={role} onValueChange={(value) => setRole(value as 'author' | 'reviewer')} disabled={loading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="author">Author (Submit Papers)</SelectItem>
                  <SelectItem value="reviewer">Reviewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full bg-[#fca311] text-white hover:bg-[#ff9800] font-semibold shadow-lg hover:shadow-xl transition-all" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>

            <div className="text-center text-sm text-gray-700">
              Already have an account?{' '}
              <Link href="/login" className="text-[#fca311] hover:text-[#ff9800] hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
      
      <Footer />
    </div>
  )
}
