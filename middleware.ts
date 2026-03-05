import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/admin/auth';

const PUBLIC_ADMIN_PATHS = ['/admin/login', '/api/admin/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  if (PUBLIC_ADMIN_PATHS.some((publicPath) => pathname.startsWith(publicPath))) {
    return NextResponse.next();
  }

  const adminSession = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const expectedSession = process.env.ADMIN_SESSION_TOKEN ?? 'admin-dev-session-token';

  if (adminSession === expectedSession) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
