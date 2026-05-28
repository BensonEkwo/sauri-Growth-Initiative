import { NextResponse } from "next/server";
import { COOKIE_NAME, createSessionToken, verifyPassword } from "@/lib/adminAuth";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  return request.headers.get("cf-connecting-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

function getAttemptState(ip: string) {
  const now = Date.now();
  const current = loginAttempts.get(ip);

  if (!current || current.resetAt <= now) {
    const next = { count: 0, resetAt: now + LOGIN_WINDOW_MS };
    loginAttempts.set(ip, next);
    return next;
  }

  return current;
}

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  const ip = getClientIp(request);
  const attempts = getAttemptState(ip);

  if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
    const retryAfter = Math.max(1, Math.ceil((attempts.resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { message: "Too many password attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  if (!verifyPassword(String(password || ""))) {
    attempts.count += 1;
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  loginAttempts.delete(ip);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
