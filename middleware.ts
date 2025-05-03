import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export function middleware(request: NextRequest) {
  // Log request details for debugging
  console.log("Middleware triggered for:", {
    pathname: request.nextUrl.pathname,
    method: request.method,
    timestamp: new Date().toISOString(),
  });

  // Allow the request to proceed without modification
  return NextResponse.next();
}

// Configure matcher to apply middleware to specific routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes (/api/*)
     * - Next.js internals (/_next/*)
     * - Static files (ending in .png, .jpg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico)).*)",
    // Explicitly include workspace routes for debugging
    "/workspace/:path*",
  ],
};