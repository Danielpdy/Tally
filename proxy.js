import { auth } from "@auth";
import { NextResponse } from "next/server";

// Paths that don't require authentication
const PUBLIC_PATHS = [
    "/",
    "/LoginSignup",
    "/privacy",
    "/terms",
    "/forgot-password",
    "/reset-password",
    "/dashboard",
    "/transactions",
    "/budgets",
    "/insights",
];

function isPublicPath(pathname) {
    return PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p + "/"));
}

export default auth((req) => {
    const { nextUrl } = req;
    const { pathname } = nextUrl;
    const session = req.auth;

    // ── No session: unauthenticated ──────────────────────────────────────────
    if (!session) {
        if (isPublicPath(pathname)) return NextResponse.next();
        return NextResponse.redirect(new URL("/LoginSignup", nextUrl.origin));
    }

    // ── Pending OAuth: new user who hasn't agreed to terms yet ───────────────
    if (session.pendingOAuth) {
        if (pathname === "/accept-terms" || isPublicPath(pathname)) {
            return NextResponse.next();
        }
        // Every other route → forced to accept-terms (can't skip via URL)
        return NextResponse.redirect(new URL("/accept-terms", nextUrl.origin));
    }

    // ── Fully authenticated ──────────────────────────────────────────────────

    // Prevent fully-authed users from accessing accept-terms
    if (pathname === "/accept-terms") {
        return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }

    // Prevent fully-authed users from hitting the login page
    if (pathname === "/LoginSignup") {
        return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Exclude Next.js internals, static files, and NextAuth's own API routes
        "/((?!_next/static|_next/image|favicon.ico|assets/|api/auth).*)",
    ],
};
