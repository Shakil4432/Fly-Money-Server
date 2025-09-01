import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/register"];
type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/user/, /^\/create-shop/, /^\/profile/, /^\/wishlist/],
  admin: [/^\/admin/, /^\/profile/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  // Case 1: user is not logged in
  if (!userInfo) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    // 👇 Special case for profile → redirect to homepage
    if (pathname.startsWith("/profile")) {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }

    // Default → redirect to login
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  }

  // Case 2: user is logged in and role is matched
  if (userInfo?.role && roleBasedRoutes[userInfo.role as Role]) {
    const routes = roleBasedRoutes[userInfo.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Case 3: role doesn’t match route
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/profile",
    "/wishlist",
    "/create-shop",
    "/admin/:path*",
    "/user/:path*",
  ],
};
