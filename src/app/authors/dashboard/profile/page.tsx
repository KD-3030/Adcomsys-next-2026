'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { User, Mail, Briefcase, ArrowLeft, Save, Key } from 'lucide-react'
import { toast } from 'sonner'

interface UserProfile {
  id: string
  full_name: string
  email: string
  role: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
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
        setFullName(data.user.full_name)
        setEmail(data.user.email)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch('/api/authors/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      toast.success('Profile updated successfully!')
      const data = await response.json()
      setProfile(data.user)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch('/api/authors/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to change password')
      }

      toast.success('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to change password')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white border-b-4 border-[#fca311] shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/authors/dashboard">
              <Button variant="outline" size="sm" className="bg-transparent text-white border-white hover:bg-white hover:text-[#14213d]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="text-gray-300 text-sm">Manage your account information</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Info Card */}
          <Card className="shadow-lg border-l-4 border-[#fca311]">
            <CardHeader className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white">
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-[#fca311]" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-gray-300">Update your profile details</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 bg-gradient-to-br from-white to-blue-50">
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-[#14213d] font-semibold flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-[#fca311]" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#14213d] font-semibold flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#fca311]" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#14213d] font-semibold">Role</Label>
                  <div>
                    <Badge className="bg-[#fca311] text-white">
                      {profile.role.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#fca311] hover:bg-[#ff9800] text-white shadow-lg" 
                  disabled={isSaving}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password Card */}
          <Card className="shadow-lg border-l-4 border-blue-500">
            <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
              <CardTitle className="flex items-center gap-2">
                <Key className="h-6 w-6 text-blue-300" />
                Change Password
              </CardTitle>
              <CardDescription className="text-gray-200">Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 bg-gradient-to-br from-white to-blue-50">
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-[#14213d] font-semibold">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-[#14213d] font-semibold">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    disabled={isSaving}
                  />
                  <p className="text-xs text-gray-500">Minimum 8 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#14213d] font-semibold">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    disabled={isSaving}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg" 
                  disabled={isSaving}
                >
                  <Key className="mr-2 h-4 w-4" />
                  {isSaving ? 'Updating...' : 'Change Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
