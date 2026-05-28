import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "sgi_admin_session";
const SESSION_AGE_SECONDS = 60 * 60 * 8;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export function verifyPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (!adminPassword || !password) {
    return false;
  }

  return safeEqual(password, adminPassword);
}

export function createSessionToken() {
  const expiresAt = Date.now() + SESSION_AGE_SECONDS * 1000;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string) {
  if (!token || !getSecret()) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const [role, expiresAt, signature] = parts;
  const payload = `${role}.${expiresAt}`;
  const expiry = Number(expiresAt);

  return role === "admin" && expiry > Date.now() && safeEqual(signature, sign(payload));
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  return verifySessionToken(token);
}

export { COOKIE_NAME, SESSION_AGE_SECONDS };
