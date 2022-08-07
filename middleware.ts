// This middleware is to protect the proxied api to be called only by the same host
// In the future it could get more logic, for example JWT tokens, etc.

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const definedHost = process.env.API_ALLOWED_DAPP_HOST;
  
  if (!definedHost) return NextResponse.next();

  if (request.nextUrl.pathname.startsWith('/sendScESDT')) {
    return NextResponse.rewrite(new URL('/underConstruction', request.url))
  }
/*
  let referer = request.headers.get('referer');

  if (!referer?.includes(definedHost)) {
    return NextResponse.rewrite(new URL('/forbidden', request.url));
  }
*/
  return NextResponse.next();
}
