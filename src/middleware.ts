import { NextResponse, NextRequest } from "next/server";

export const config = {
    matcher: [
        "/",
        "/cart",
        "/checkout/:path*",
        "/product/:path*",
        "/profile/:path*",
        "/filter/:path*"
    ]
};

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const protectedRoutes = ["/cart", "/checkout", "/profile"];
    const url = request.nextUrl;

    if (
        !token &&
        protectedRoutes.some((route) => url.pathname.startsWith(route))
    ) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}
