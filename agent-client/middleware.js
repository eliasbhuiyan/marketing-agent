import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request) {
  const refreshToken = request.cookies.get("_optimise_refresh_token")?.value;

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
    await jwtVerify(refreshToken, secretKey, { algorithms: ["HS256"] });
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
  ],
};
