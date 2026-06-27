import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname === "/login" || pathname === "/signup";

  const isDashboard =
    pathname.startsWith("/dashboard");

  // User not logged in
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // User already logged in
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};