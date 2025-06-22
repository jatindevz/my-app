// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
    // Get the requested path
    const { pathname } = request.nextUrl

    // Only allow requests to the root path ('/')
    if (pathname !== '/') {
        // Redirect to root URL
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Continue to the requested path if it's root
    return NextResponse.next()
}

// Match all paths except:
// - The root path ('/')
// - API routes (optional, remove if you want to redirect APIs too)
// - Static files (/_next/static, /_next/image, /favicon.ico, etc.)
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}