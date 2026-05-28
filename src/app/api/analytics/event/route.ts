import { NextResponse } from "next/server";
import { saveAnalyticsEvent, type AnalyticsEvent } from "@/lib/analyticsStore";
import { sanitizePath, sanitizePositiveInteger, sanitizeText } from "@/lib/validation";

export const runtime = "nodejs";

function getHeader(request: Request, key: string) {
  return request.headers.get(key) || "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.visitorId || !body?.sessionId || !body?.type || !body?.path) {
    return NextResponse.json({ message: "Invalid analytics event." }, { status: 400 });
  }

  const event: AnalyticsEvent = {
    id: crypto.randomUUID(),
    sessionId: sanitizeText(body.sessionId, 120),
    visitorId: sanitizeText(body.visitorId, 120),
    type: body.type,
    path: sanitizePath(body.path, 300),
    label: body.label ? sanitizeText(body.label, 120) : undefined,
    durationSeconds: sanitizePositiveInteger(body.durationSeconds),
    createdAt: new Date().toISOString(),
    ip: sanitizeText(getHeader(request, "cf-connecting-ip") || getHeader(request, "x-forwarded-for").split(",")[0]?.trim() || "unknown", 80),
    country: sanitizeText(getHeader(request, "cf-ipcountry") || getHeader(request, "x-vercel-ip-country") || "Unknown", 80),
    region: sanitizeText(getHeader(request, "x-vercel-ip-country-region") || "Unknown", 80),
    city: sanitizeText(getHeader(request, "x-vercel-ip-city") || "Unknown", 80),
    userAgent: sanitizeText(getHeader(request, "user-agent"), 300),
  };

  if (!["page_view", "interaction", "session_end"].includes(event.type)) {
    return NextResponse.json({ message: "Unsupported analytics event type." }, { status: 400 });
  }

  await saveAnalyticsEvent(event);

  return NextResponse.json({ ok: true });
}
