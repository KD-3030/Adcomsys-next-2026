import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth/jwt'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    redirect('/login')
  }

  const user = verifyToken(token)
  
  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await db.getUserById(user.userId)

  if (!profile) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AdComSys 2026</h1>
          <form action="/api/auth/logout" method="post">
            <Button variant="outline" type="submit">Sign out</Button>
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Welcome back, {profile?.full_name || 'User'}!</h2>
            <p className="text-gray-600 mt-2">Role: <span className="capitalize font-medium">{profile?.role}</span></p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>My Submissions</CardTitle>
                <CardDescription>Track your paper submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">No submissions yet</p>
                <Button className="w-full" asChild>
                  <Link href="/dashboard/submissions">View Submissions</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
                <CardDescription>Check payment verification</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">No payments recorded</p>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/dashboard/payments">View Payments</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your information</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/dashboard/profile">Edit Profile</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submit to CMT</CardTitle>
                <CardDescription>Submit your paper via Microsoft CMT</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <a href={process.env.NEXT_PUBLIC_CMT_URL} target="_blank" rel="noopener noreferrer">
                    Go to CMT Portal →
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {profile?.role === 'reviewer' && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle>Reviewer Dashboard</CardTitle>
                <CardDescription>Review assigned papers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/dashboard/reviews">View Assigned Papers</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {profile?.role === 'admin' && (
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle>Admin Panel</CardTitle>
                <CardDescription>Manage conference operations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin">Go to Admin Panel</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
