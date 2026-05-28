import { redirect } from "next/navigation";
import { AdminShell } from "@/app/components/admin/AdminShell";
import { CreatePostForm } from "@/app/components/admin/CreatePostForm";
import { requireAdmin } from "@/lib/adminAuth";

export default async function CreatePostPage() {
  if (!(await requireAdmin())) {
    redirect("/admin/login");
  }

  return (
    <AdminShell title="Create Post" description="Create a news item and upload its media directly into the configured Cloudflare R2 S3 bucket.">
      <CreatePostForm />
    </AdminShell>
  );
}
