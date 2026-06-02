import { redirect } from "next/navigation";
import { AdminShell } from "../components/admin/AdminShell";
import { getAnalyticsEvents, summarizeAnalytics } from "@/lib/analyticsStore";
import { requireAdmin } from "@/lib/adminAuth";
import { getPosts } from "@/lib/postsStore";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await requireAdmin())) {
    redirect("/admin/login");
  }

  const events = await getAnalyticsEvents();
  const posts = await getPosts();
  const summary = summarizeAnalytics(events);

  return (
    <AdminShell title="Dashboard" description="Manage news publishing, media uploads, and visitor intelligence from one protected workspace.">
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Sessions" value={summary.totalSessions} />
        <Metric label="Events" value={summary.totalEvents} />
        <Metric label="Avg. Duration" value={`${summary.averageDuration}s`} />
        <Metric label="Posts" value={posts.length} />
      </div>
      <div className="mt-6 rounded-md bg-white p-5 shadow-md">
        <h3 className="font-poppins text-xl font-bold">Recent Posts</h3>
        <div className="mt-4 grid gap-3">
          {posts.slice(0, 5).map((post) => (
            <a key={post.id} href={`/news-feed/${post.slug}`} className="rounded-md border border-slate-200 p-4 hover:border-blue-900">
              <p className="text-sm font-bold uppercase text-blue-900">{post.category}</p>
              <h4 className="font-poppins text-lg font-bold">{post.title}</h4>
              <p className="text-sm text-slate-600">{post.publishedAt} · {post.galleryLayout} layout · {post.mediaItems.length} photo{post.mediaItems.length === 1 ? "" : "s"}</p>
            </a>
          ))}
          {!posts.length ? <p className="text-slate-600">No admin-created posts yet.</p> : null}
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
