import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromHeader } from "@/lib/jwt";
import { UserRole } from "@/types";

// Use Node.js runtime for JWT support
export const runtime = 'nodejs';

// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/complaints",
  "/admin",
  "/api/complaints",
  "/api/users",
  "/api/notifications",
];

// Routes that require admin or staff role
const adminRoutes = [
  "/admin",
  "/dashboard/admin",
  "/api/admin",
  "/api/users",
];

// Routes that require staff role ONLY
const staffOnlyRoutes = [
  "/staff-dashboard",
];

// Routes that require passenger role
const passengerRoutes = [
  "/dashboard/passenger",
];

// Routes that require staff or admin role
const staffRoutes = [
  "/api/complaints/assign",
  "/api/complaints/update-status",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip authentication for public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Check if the route requires authentication
  if (isProtectedRoute(pathname)) {
    const token = getTokenFromRequest(request);
    
    if (!token) {
      return redirectToLogin(request);
    }

    try {
      const payload = verifyToken(token);
      
      // ✅ STAFF RESTRICTION: Staff can ONLY access /staff-dashboard routes
      if (payload.role === 'staff') {
        // Check if staff is trying to access non-staff routes
        if (!isStaffOnlyRoute(pathname) && !isPublicRoute(pathname) && !pathname.startsWith('/api/staff') && !pathname.startsWith('/api/complaints') && !pathname.startsWith('/api/notifications') && !pathname.startsWith('/api/auth')) {
          console.log('🚫 Middleware: Staff trying to access restricted route:', pathname, '→ Redirecting to /staff-dashboard');
          const redirectUrl = new URL("/staff-dashboard", request.url);
          return NextResponse.redirect(redirectUrl);
        }
      }
      
      // Check if non-staff trying to access staff-only routes
      if (isStaffOnlyRoute(pathname) && payload.role !== 'staff') {
        console.log('🚫 Middleware: Non-staff trying to access staff route:', pathname);
        if (payload.role === 'admin') {
          const redirectUrl = new URL("/dashboard/admin", request.url);
          return NextResponse.redirect(redirectUrl);
        } else if (payload.role === 'passenger') {
          const redirectUrl = new URL("/dashboard/passenger", request.url);
          return NextResponse.redirect(redirectUrl);
        }
      }
      
      // Check role-based access and redirect accordingly
      if (isAdminRoute(pathname)) {
        if (payload.role === 'staff') {
          console.log('🚫 Middleware: Staff trying to access admin route, redirecting to staff dashboard');
          const redirectUrl = new URL("/staff-dashboard", request.url);
          return NextResponse.redirect(redirectUrl);
        }
        if (payload.role !== "admin") {
          console.log('🚀 Middleware: Non-admin accessing admin route, redirecting to passenger dashboard');
          const redirectUrl = new URL("/dashboard/passenger", request.url);
          return NextResponse.redirect(redirectUrl);
        }
      }
      
      if (isPassengerRoute(pathname)) {
        if (payload.role === 'staff') {
          console.log('🚫 Middleware: Staff accessing passenger route, redirecting to staff dashboard');
          const redirectUrl = new URL("/staff-dashboard", request.url);
          return NextResponse.redirect(redirectUrl);
        }
        if (payload.role === 'admin') {
          console.log('👷 Middleware: Admin accessing passenger route, redirecting to admin dashboard');
          const redirectUrl = new URL("/dashboard/admin", request.url);
          return NextResponse.redirect(redirectUrl);
        }
      }
      
      if (isStaffRoute(pathname) && !["staff", "admin"].includes(payload.role)) {
        return new NextResponse("Unauthorized", { status: 403 });
      }

      // Add user info to headers for API routes
      const response = NextResponse.next();
      response.headers.set("X-User-Id", payload.userId);
      response.headers.set("X-User-Email", payload.email);
      response.headers.set("X-User-Role", payload.role);
      
      return response;
    } catch (error) {
      // Token is invalid
      if (pathname.startsWith("/api/")) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      return redirectToLogin(request);
    }
  }

  return NextResponse.next();
}

function isPublicRoute(pathname: string): boolean {
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/logout",
    "/api/auth/clear",
    "/api/auth/me",
    "/api/categories",
    "/api/health",
    "/about",
    "/contact",
    "/privacy",
    "/privacy-policy"
  ];
  
  return publicRoutes.some(route => pathname === route || pathname.startsWith(route));
}

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(route => pathname.startsWith(route));
}

function isAdminRoute(pathname: string): boolean {
  return adminRoutes.some(route => pathname.startsWith(route));
}

function isStaffOnlyRoute(pathname: string): boolean {
  return staffOnlyRoutes.some(route => pathname.startsWith(route));
}

function isStaffRoute(pathname: string): boolean {
  return staffRoutes.some(route => pathname.startsWith(route));
}

function isPassengerRoute(pathname: string): boolean {
  return passengerRoutes.some(route => pathname.startsWith(route));
}

function getTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from Authorization header
  const authHeader = request.headers.get("Authorization");
  const tokenFromHeader = getTokenFromHeader(authHeader || "");
  
  if (tokenFromHeader) {
    return tokenFromHeader;
  }
  
  // Try to get token from cookie
  const tokenFromCookie = request.cookies.get("auth-token")?.value;
  if (tokenFromCookie) {
    return tokenFromCookie;
  }
  
  return null;
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("redirect", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};