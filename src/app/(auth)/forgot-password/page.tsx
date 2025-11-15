'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { MailIcon, ArrowLeftIcon } from 'lucide-react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        toast.success('Password reset link sent! Check your email.')
      } else {
        toast.error(data.error || 'Failed to send reset link')
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#14213d] via-[#1a2844] to-[#14213d]">
        <Card className="w-full max-w-md shadow-2xl border-2 border-[#fca311]">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <MailIcon className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#14213d]">Check Your Email</CardTitle>
            <CardDescription className="text-base">
              We've sent a password reset link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Next Steps:</strong>
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the reset link in the email</li>
                <li>The link expires in 1 hour</li>
                <li>Create your new password</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => router.push('/login')}
                className="w-full bg-[#14213d] hover:bg-[#1a2844]"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
              <Button
                onClick={() => setIsSuccess(false)}
                variant="outline"
                className="w-full"
              >
                Try Another Email
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500">
              Didn't receive the email?{' '}
              <button
                onClick={() => {
                  setIsSuccess(false)
                  handleSubmit(new Event('submit') as any)
                }}
                className="text-[#fca311] hover:underline font-medium"
              >
                Resend
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#14213d] via-[#1a2844] to-[#14213d]">
      <Card className="w-full max-w-md shadow-2xl border-2 border-[#fca311]">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-[#fca311] bg-opacity-10 rounded-full flex items-center justify-center mb-2">
            <MailIcon className="w-8 h-8 text-[#fca311]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#14213d]">Forgot Password?</CardTitle>
          <CardDescription className="text-base">
            No worries! Enter your email and we'll send you a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="border-gray-300 focus:border-[#fca311] focus:ring-[#fca311]"
              />
              <p className="text-xs text-gray-500">
                Enter the email address associated with your account
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#fca311] hover:bg-[#ff9800] text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending Reset Link...
                </>
              ) : (
                <>
                  <MailIcon className="w-4 h-4 mr-2" />
                  Send Reset Link
                </>
              )}
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="text-sm text-[#14213d] hover:text-[#fca311] hover:underline font-medium inline-flex items-center"
              >
                <ArrowLeftIcon className="w-3 h-3 mr-1" />
                Back to Login
              </Link>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#fca311] hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
