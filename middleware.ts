import { NextResponse, type NextRequest } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/jwt'
import { db } from '@/lib/db'

export async function middleware(request: NextRequest) {
  const user = getUserFromRequest(request)

  // Protected routes - require authentication
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Admin routes - require admin role
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if user is admin
    const profile = await db.getUserById(user.userId)

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/authors/dashboard', request.url))
    }
  }

  // Reviewer routes - require reviewer role
  if (request.nextUrl.pathname.startsWith('/reviewers')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if user is reviewer
    const profile = await db.getUserById(user.userId)

    if (profile?.role !== 'reviewer') {
      return NextResponse.redirect(new URL('/authors/dashboard', request.url))
    }
  }

  // Author routes - require author or reviewer role
  if (request.nextUrl.pathname.startsWith('/authors')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if user is author
    const profile = await db.getUserById(user.userId)

    if (profile?.role !== 'author' && profile?.role !== 'reviewer') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    // Check user role and redirect accordingly
    const profile = await db.getUserById(user.userId)
    if (profile?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    } else if (profile?.role === 'reviewer') {
      return NextResponse.redirect(new URL('/reviewers/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/authors/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
