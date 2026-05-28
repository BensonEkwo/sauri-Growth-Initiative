import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { getAnalyticsEvents, summarizeAnalytics } from "@/lib/analyticsStore";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const events = await getAnalyticsEvents();
  return NextResponse.json({ summary: summarizeAnalytics(events), events });
}
