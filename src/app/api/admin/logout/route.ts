import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const acceptsHtml = request.headers.get("accept")?.includes("text/html");
  const response = acceptsHtml
    ? NextResponse.redirect(new URL("/admin/login", request.url))
    : new NextResponse(null, { status: 204 });

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });

  return response;
}
