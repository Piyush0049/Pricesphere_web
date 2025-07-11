import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = getTokenFromCookies(request);

  const isPublicRoute =
    path.startsWith("/login") ||
    path.startsWith("/signup") ||
    path.startsWith("/verify") ||
    path.startsWith("/forgot-password") ||
    path.startsWith("/resetpassword");

  const hasValidToken = token && token.trim() !== "";

  // If a valid token exists, prevent access to public routes
  if (hasValidToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  // If no valid token and not on a public route, redirect to login (avoid infinite redirects)
  if (!hasValidToken && !isPublicRoute && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

function getTokenFromCookies(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  return token && token.trim() !== "" ? token : null;
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/verify",
    "/resetpassword/:path*",
    "/forgot-password",
    "/",
    "/dashboard",

  ],
};
