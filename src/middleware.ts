import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('authjs.session-token') || request.cookies.get('__Secure-authjs.session-token');

  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/write', '/entry', '/settings'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
