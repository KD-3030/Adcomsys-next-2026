'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { LockIcon, EyeIcon, EyeOffIcon, CheckCircleIcon } from 'lucide-react'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing reset token')
      setTimeout(() => router.push('/forgot-password'), 2000)
    }
  }, [token, router])

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return 'Password must be at least 8 characters long'
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/[a-z]/.test(pwd)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!/[0-9]/.test(pwd)) {
      return 'Password must contain at least one number'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const passwordError = validatePassword(password)
    if (passwordError) {
      toast.error(passwordError)
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        toast.success('Password reset successful!')
        setTimeout(() => router.push('/login'), 3000)
      } else {
        toast.error(data.error || 'Failed to reset password')
      }
    } catch (error) {
      console.error('Reset password error:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#14213d] via-[#1a2844] to-[#14213d]">
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Redirecting...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#14213d] via-[#1a2844] to-[#14213d]">
        <Card className="w-full max-w-md shadow-2xl border-2 border-green-500">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#14213d]">Password Reset Successful!</CardTitle>
            <CardDescription className="text-base">
              Your password has been changed successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 text-center">
                You can now log in with your new password
              </p>
            </div>
            <Button
              onClick={() => router.push('/login')}
              className="w-full bg-[#14213d] hover:bg-[#1a2844]"
            >
              Continue to Login
            </Button>
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
            <LockIcon className="w-8 h-8 text-[#fca311]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#14213d]">Reset Your Password</CardTitle>
          <CardDescription className="text-base">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-gray-300 focus:border-[#fca311] focus:ring-[#fca311] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
              <ul className="text-xs text-gray-500 space-y-1 mt-2">
                <li className={password.length >= 8 ? 'text-green-600' : ''}>
                  ✓ At least 8 characters
                </li>
                <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                  ✓ One uppercase letter
                </li>
                <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
                  ✓ One lowercase letter
                </li>
                <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
                  ✓ One number
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-gray-300 focus:border-[#fca311] focus:ring-[#fca311] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && (
                <p className={`text-xs ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                  {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#fca311] hover:bg-[#ff9800] text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Resetting Password...
                </>
              ) : (
                <>
                  <LockIcon className="w-4 h-4 mr-2" />
                  Reset Password
                </>
              )}
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="text-sm text-[#14213d] hover:text-[#fca311] hover:underline font-medium"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
