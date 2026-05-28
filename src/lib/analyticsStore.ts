import { readJsonFile, writeJsonFile } from "./dataStore";

export type AnalyticsEvent = {
  id: string;
  sessionId: string;
  visitorId: string;
  type: "page_view" | "interaction" | "session_end";
  path: string;
  label?: string;
  durationSeconds?: number;
  createdAt: string;
  ip: string;
  country: string;
  region: string;
  city: string;
  userAgent: string;
};

const ANALYTICS_FILE = "analytics-events.json";
const MAX_EVENTS = 1500;

export async function saveAnalyticsEvent(event: AnalyticsEvent) {
  const events = await readJsonFile<AnalyticsEvent[]>(ANALYTICS_FILE, []);
  events.unshift(event);
  await writeJsonFile(ANALYTICS_FILE, events.slice(0, MAX_EVENTS));
}

export async function getAnalyticsEvents() {
  return readJsonFile<AnalyticsEvent[]>(ANALYTICS_FILE, []);
}

export function summarizeAnalytics(events: AnalyticsEvent[]) {
  const sessions = new Map<string, AnalyticsEvent[]>();

  events.forEach((event) => {
    sessions.set(event.sessionId, [...(sessions.get(event.sessionId) || []), event]);
  });

  const endedSessions = events.filter((event) => typeof event.durationSeconds === "number");
  const averageDuration = endedSessions.length
    ? Math.round(endedSessions.reduce((total, event) => total + (event.durationSeconds || 0), 0) / endedSessions.length)
    : 0;

  const topPaths = countBy(events.filter((event) => event.type === "page_view"), "path");
  const countries = countBy(events, "country");

  return {
    totalSessions: sessions.size,
    totalEvents: events.length,
    averageDuration,
    topPaths,
    countries,
  };
}

function countBy<T>(items: T[], key: keyof T) {
  return Object.entries(
    items.reduce<Record<string, number>>((totals, item) => {
      const label = String(item[key] || "Unknown");
      totals[label] = (totals[label] || 0) + 1;
      return totals;
    }, {}),
  )
    .sort(([, first], [, second]) => second - first)
    .slice(0, 8)
    .map(([label, count]) => ({ label, count }));
}
