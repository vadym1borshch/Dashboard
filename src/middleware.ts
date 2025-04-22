import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/ua/dashboard'
    return NextResponse.redirect(url)
  }

  return createMiddleware(routing)(request)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [ '/','/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};