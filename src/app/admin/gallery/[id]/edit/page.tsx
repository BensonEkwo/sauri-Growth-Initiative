import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { AdminShell } from "@/app/components/admin/AdminShell";
import { EditPostForm } from "@/app/components/admin/EditPostForm";
import { requireAdmin } from "@/lib/adminAuth";
import { getPostById } from "@/lib/postsStore";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: EditPostPageProps) {
  if (!(await requireAdmin())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <AdminShell title="Edit News Post" description="Update story details, change the gallery layout, or add more photos to this news item.">
      <Link href="/admin/gallery" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-blue-900">
        <IoArrowBack />
        Gallery
      </Link>
      <EditPostForm post={post} />
    </AdminShell>
  );
}
