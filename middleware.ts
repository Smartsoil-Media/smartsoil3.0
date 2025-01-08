import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // List of protected routes that require authentication
    const protectedRoutes = [
        '/dashboard',
        '/admin',
        '/courses/*/lessons/*'  // Protect individual lessons
    ]

    // Public routes that should always be accessible
    const publicRoutes = [
        '/courses',  // Allow viewing course listings
        '/login',
        '/signup',
        '/pricing',
        '/'
    ]

    const { pathname } = request.nextUrl

    // Check if the current path matches any protected route pattern
    const isProtectedRoute = protectedRoutes.some(route => {
        if (route.includes('*')) {
            const pattern = new RegExp('^' + route.replace(/\*/g, '.*') + '$')
            return pattern.test(pathname)
        }
        return pathname.startsWith(route)
    })

    // Allow public routes
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next()
    }

    // Check auth for protected routes
    if (isProtectedRoute) {
        // Get the token from the session
        const token = request.cookies.get('session')

        if (!token) {
            // Redirect to login with return URL
            const url = new URL('/login', request.url)
            url.searchParams.set('redirect', pathname)
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/courses/:path*',
        '/login',
        '/signup'
    ]
} 