import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from './config/constants';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookie = request.cookies.get('refresh_token');

  //* Exclude Next.js internal assets and API routes
  if (
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/api/') || 
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  //* Redirect root ("/") to login page
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  //* If no token, restrict access except for login & signup
  if (!cookie?.value && pathname !== '/auth/login' && pathname !== '/auth/signup') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (cookie?.value) {
    const jwtDecode = await decodeToken(cookie.value);
    if (jwtDecode) {
      if (pathname === '/auth/login' || pathname === '/auth/signup') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return NextResponse.next();
    } else {
      if (pathname !== '/auth/login') {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

//* Function to decode and verify the JWT token
async function decodeToken(token: string) {
  try {
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const decodedToken = await jwtVerify(token, secretKey);
    return decodedToken;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return null;
  }
}
