import { NextResponse, NextRequest } from "next/server";

const publicRoutes = ["/login", "/signup"];

export default function proxy(req: NextRequest) {
  const userId = req.cookies.get("userId")?.value;
  const path = req.nextUrl.pathname;
  const isPublicRoutes = publicRoutes.includes(path);

  if (isPublicRoutes && userId) {
    return NextResponse.redirect(new URL(`/home`, req.url));
  }

  if (!isPublicRoutes && !userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
