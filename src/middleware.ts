import { NextResponse, type NextRequest } from "next/server";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 40;
const attempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest) {
  return request.headers.get("cf-connecting-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

function rateLimit(request: NextRequest) {
  const ip = getClientIp(request);
  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }

  current.count += 1;

  if (current.count > MAX_REQUESTS) {
    return NextResponse.json(
      { message: "Too many requests. Please wait before trying again." },
      { status: 429 },
    );
  }

  return null;
}

function isDocumentNavigation(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const fetchMode = request.headers.get("sec-fetch-mode");
  const fetchDest = request.headers.get("sec-fetch-dest");
  const isRscRequest = request.headers.get("rsc") !== null;

  return !isRscRequest && (fetchMode === "navigate" || fetchDest === "document" || accept.includes("text/html"));
}

export function middleware(request: NextRequest) {
  const limited = rateLimit(request);

  if (limited) {
    return limited;
  }

  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has("sgi_admin_session");
  const isProtectedAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (isProtectedAdminPage && (!hasSession || isDocumentNavigation(request))) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login" && !hasSession) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
