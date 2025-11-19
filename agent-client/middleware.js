import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");
  const refreshToken = request.cookies.get("_mg_ref_tn")?.value;

  if (!refreshToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const jwtSecret = "sldkfjasj34qrt4efsdkjfawef";
  if (!jwtSecret) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secretKey = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(refreshToken, secretKey, { algorithms: ["HS256"] });
    if (isAdminPath) {
      const hasSuperAdmin = (
        payload?.role === "superadmin" ||
        payload?.userRole === "superadmin" ||
        (Array.isArray(payload?.permissions) && payload.permissions.includes("superadmin")) ||
        payload?.isSuperAdmin === true
      );
      if (!hasSuperAdmin) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/dashboard";
        return NextResponse.redirect(redirectUrl);
      }
    }
    return NextResponse.next();
  } catch {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/posters/:path*",
    "/content/:path*",
    "/trends/:path*",
    "/youtube/:path*",
    "/scheduler/:path*",
    "/templates/:path*",
    "/settings/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
