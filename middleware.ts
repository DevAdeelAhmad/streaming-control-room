import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Allow the request to continue
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
        // Public paths that don't require authentication
        const publicPaths = ['/login', '/register', '/api/auth', '/api/health'];
        const isPublicPath = publicPaths.some(p => path.startsWith(p));
        
        if (isPublicPath) {
          return true;
        }
        
        // All other paths require authentication
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

// Protect these routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/themes/:path*',
    '/api/assets/:path*',
    '/api/upload/:path*',
    '/api/playout/:path*',
  ],
};

