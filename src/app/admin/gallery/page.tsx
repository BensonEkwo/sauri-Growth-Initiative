import Link from "next/link";
import { redirect } from "next/navigation";
import { FiEdit3, FiExternalLink } from "react-icons/fi";
import { AdminShell } from "@/app/components/admin/AdminShell";
import { DeletePostButton } from "@/app/components/admin/DeletePostButton";
import { requireAdmin } from "@/lib/adminAuth";
import { getPosts } from "@/lib/postsStore";

export default async function GalleryPage() {
  if (!(await requireAdmin())) {
    redirect("/admin/login");
  }

  const posts = await getPosts();

  return (
    <AdminShell title="Gallery" description="Manage all admin-created news posts, review their galleries, edit story details, or remove posts from the news feed.">
      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.id} className="grid gap-4 rounded-md bg-white p-4 shadow-md md:grid-cols-[180px_1fr] md:p-5">
            <div className="grid grid-cols-3 gap-2 md:grid-cols-2">
              {post.mediaItems.slice(0, 4).map((item) => (
                <img key={item.key} src={item.url} alt={item.fileName} className="aspect-square w-full rounded-md object-cover" />
              ))}
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              <div>
                <p className="text-xs font-bold uppercase text-blue-900">{post.category}</p>
                <h3 className="font-poppins text-xl font-bold leading-snug md:text-2xl">{post.title}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {post.publishedAt} · {post.galleryLayout} layout · {post.mediaItems.length} photo{post.mediaItems.length === 1 ? "" : "s"}
                </p>
              </div>
              <p className="line-clamp-2 text-sm leading-6 text-slate-700">{post.excerpt}</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Link href={`/admin/gallery/${post.id}/edit`} className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-900 px-3 py-2 text-sm font-bold text-white hover:bg-blue-800">
                  <FiEdit3 />
                  Edit
                </Link>
                <Link href={`/news-feed/${post.slug}`} target="_blank" className="inline-flex items-center justify-center gap-2 rounded-md border border-blue-900 px-3 py-2 text-sm font-bold text-blue-900 hover:bg-blue-50">
                  <FiExternalLink />
                  View
                </Link>
                <DeletePostButton postId={post.id} title={post.title} />
              </div>
            </div>
          </article>
        ))}
        {!posts.length ? (
          <div className="rounded-md bg-white p-6 text-slate-700 shadow-md">
            No admin-created news posts yet.
          </div>
        ) : null}
      </div>
    </AdminShell>
  );
}
