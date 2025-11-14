# 🚀 Next Steps - Solo Developer Edition

## ✅ Setup Verification Complete!

Great job! Your environment is set up. Here's what I've confirmed:

- ✅ Supabase project connected
- ✅ Resend API key configured
- ✅ Project structure created
- ✅ Assets folder ready
- ✅ Dependencies installed

**Missing**: You need to add your `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

---

## 🎯 **Immediate Priority (Next 2-3 Hours)**

Since you're working solo, let's focus on building the foundation first:

### **Phase 1: Authentication System (Today)**

Start with the most critical feature - user authentication.

#### Step 1: Create Auth Pages (1 hour)

Create these files in order:

1. **Login Page**
```typescript
// src/app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.success('Logged in successfully!')
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">AdComSys 2026</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="text-center space-y-2 text-sm">
              <div>
                <Link href="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div>
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

2. **Signup Page with Role Selection**
```typescript
// src/app/(auth)/signup/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { toast } from 'sonner'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'author' | 'reviewer'>('author')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      })

      if (authError) throw authError

      // Create profile
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              email: email,
              full_name: fullName,
              role: role,
            },
          ])

        if (profileError) throw profileError
      }

      toast.success('Account created! Please check your email to verify.')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join AdComSys 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
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

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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

            <div className="space-y-2">
              <Label htmlFor="role">I am a...</Label>
              <Select value={role} onValueChange={(value: any) => setRole(value)} disabled={loading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="author">Author (Submit Papers)</SelectItem>
                  <SelectItem value="reviewer">Reviewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

3. **Auth Layout**
```typescript
// src/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
```

#### Step 2: Update Root Layout with Toast Provider (15 mins)

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdComSys 2026 - International Conference",
  description: "Third International Conference on Advanced Computing and Systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

#### Step 3: Create Simple Dashboard (30 mins)

```typescript
// src/app/(dashboard)/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AdComSys 2026</h1>
          <form action="/api/auth/signout" method="post">
            <Button variant="outline" type="submit">Sign out</Button>
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Welcome back, {profile?.full_name || 'User'}!</h2>
            <p className="text-gray-600 mt-2">Role: {profile?.role}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>My Submissions</CardTitle>
                <CardDescription>Track your paper submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">No submissions yet</p>
                <Button className="mt-4" asChild>
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
                <p className="text-sm text-gray-600">No payments recorded</p>
                <Button className="mt-4" variant="outline" asChild>
                  <Link href="/dashboard/payments">View Payments</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your information</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
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
                <Button asChild>
                  <a href={process.env.NEXT_PUBLIC_CMT_URL} target="_blank" rel="noopener noreferrer">
                    Go to CMT Portal
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
```

```typescript
// src/app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
```

#### Step 4: Create Sign Out API Route (10 mins)

```typescript
// src/app/api/auth/signout/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/login', request.url))
}
```

---

## 🧪 **Testing Your Auth System (15 mins)**

1. **Start dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Test signup**:
   - Go to http://localhost:3000/signup
   - Create a test account
   - Check Supabase Auth dashboard for the new user

3. **Test login**:
   - Go to http://localhost:3000/login
   - Login with your test account
   - Should redirect to /dashboard

4. **Test protected route**:
   - Try accessing /dashboard without login
   - Should redirect to /login

5. **Test sign out**:
   - Click "Sign out" button
   - Should redirect to /login

---

## 📋 **After Auth Works (Next 2-3 Hours)**

### Phase 2: Migrate Homepage

1. Copy content from old `Dashboard.jsx`
2. Create `src/app/(public)/page.tsx`
3. Migrate Header and Footer components
4. Make it look like the old site

### Phase 3: Create Public Layout

1. Header component with navigation
2. Footer component
3. Apply to all public pages

---

## 🎯 **Today's Goal**

By end of today, you should have:
- ✅ Working authentication (login/signup)
- ✅ Protected dashboard route
- ✅ Basic dashboard page
- ✅ Sign out functionality

**Tomorrow**: Start migrating public pages and creating API routes.

---

## 🚨 **Common Issues & Quick Fixes**

### Issue: "Module not found" errors
```bash
npm install
```

### Issue: Supabase connection errors
- Check `.env.local` has correct credentials
- Verify Supabase project is active
- Check if database schema is deployed

### Issue: Auth not working
- Make sure you ran the SQL schema in Supabase
- Check `profiles` table exists
- Verify RLS policies are enabled

---

## 📞 **Need Help?**

If you get stuck:
1. Check browser console for errors
2. Check terminal for errors
3. Verify Supabase dashboard for data
4. Review the code files I provided above

---

**Start with auth - it's the foundation for everything else! 🔐**
