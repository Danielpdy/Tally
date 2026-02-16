import { auth } from "@auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/profile"];

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isProtected = protectedRoutes.some(route =>
        nextUrl.pathname.startsWith(route)
    );

    if (isProtected && !isLoggedIn) {
        const loginUrl = new URL("/LoginSignup", nextUrl.origin);
        loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/profile",
        "/dashboard",
        "/transactions",
        "/budgets",
        "/insights",
    ],
};
