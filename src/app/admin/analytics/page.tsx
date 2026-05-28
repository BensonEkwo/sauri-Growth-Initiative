import { redirect } from "next/navigation";
import { AdminShell } from "@/app/components/admin/AdminShell";
import { getAnalyticsEvents, summarizeAnalytics } from "@/lib/analyticsStore";
import { requireAdmin } from "@/lib/adminAuth";

export default async function AnalyticsPage() {
  if (!(await requireAdmin())) {
    redirect("/admin/login");
  }

  const events = await getAnalyticsEvents();
  const summary = summarizeAnalytics(events);

  return (
    <AdminShell title="Visitor Analytics" description="Review session duration, IP-derived location signals, page navigation, and interaction logs.">
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Sessions" value={summary.totalSessions} />
        <Metric label="Tracked Events" value={summary.totalEvents} />
        <Metric label="Average Session" value={`${summary.averageDuration}s`} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Top Paths" items={summary.topPaths} />
        <Panel title="Locations" items={summary.countries} />
      </div>
      <div className="mt-6 rounded-md bg-white p-5 shadow-md">
        <h3 className="font-poppins text-xl font-bold">Activity Logs</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase text-slate-600">
              <tr>
                <th className="px-3 py-3">Time</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Path</th>
                <th className="px-3 py-3">Location</th>
                <th className="px-3 py-3">Duration</th>
                <th className="px-3 py-3">Label</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 100).map((event) => (
                <tr key={event.id} className="border-b border-slate-100">
                  <td className="px-3 py-3">{new Date(event.createdAt).toLocaleString()}</td>
                  <td className="px-3 py-3 font-semibold">{event.type}</td>
                  <td className="px-3 py-3">{event.path}</td>
                  <td className="px-3 py-3">{[event.city, event.region, event.country].filter(Boolean).join(", ") || "Unknown"}</td>
                  <td className="px-3 py-3">{event.durationSeconds ? `${event.durationSeconds}s` : "-"}</td>
                  <td className="px-3 py-3">{event.label || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!events.length ? <p className="py-6 text-slate-600">No visitor activity recorded yet.</p> : null}
        </div>
      </div>
    </AdminShell>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md bg-white p-5 shadow-md">
      <p className="text-sm font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-2 font-poppins text-3xl font-extrabold text-blue-950">{value}</p>
    </div>
  );
}

function Panel({ title, items }: { title: string; items: { label: string; count: number }[] }) {
  return (
    <div className="rounded-md bg-white p-5 shadow-md">
      <h3 className="font-poppins text-xl font-bold">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-md bg-slate-100 px-4 py-3">
            <span className="font-semibold">{item.label}</span>
            <span className="font-bold text-blue-950">{item.count}</span>
          </div>
        ))}
        {!items.length ? <p className="text-slate-600">No data yet.</p> : null}
      </div>
    </div>
  );
}
