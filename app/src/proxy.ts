import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Pass the request along if a guest_id or session token already exists
  const hasGuestId = request.cookies.has('guest_id');
  const hasSession = request.cookies.has('next-auth.session-token') || request.cookies.has('__Secure-next-auth.session-token');

  let response = NextResponse.next();

  if (!hasGuestId && !hasSession) {
    // Generate a fresh guest_id for unauthenticated users
    const guestId = crypto.randomUUID();
    response.cookies.set('guest_id', guestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
