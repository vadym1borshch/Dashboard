import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const SUPPORTED_LOCALES = ['en', 'ua']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathParts = pathname.split('/').filter(Boolean)

  if (pathname === '/') {
    const locale = request.headers.get('accept-language')?.split(',')?.[0]?.split('-')[0] || 'en'
    const preferredLocale = SUPPORTED_LOCALES.includes(locale) ? locale : 'en'
    const url = request.nextUrl.clone()
    url.pathname = `/${preferredLocale}/login`
    return NextResponse.redirect(url)
  }

  if (pathParts.length === 1 && SUPPORTED_LOCALES.includes(pathParts[0])) {
    const url = request.nextUrl.clone()
    url.pathname = `/${pathParts[0]}/login`
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