import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { uploadToR2 } from "@/lib/cloudflareR2";
import { getPosts, savePosts, type StoredPost } from "@/lib/postsStore";
import { sanitizeFileName, sanitizeMultiline, sanitizeText, validateDate, validateGalleryLayout, validateImageFile } from "@/lib/validation";

export const runtime = "nodejs";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const title = sanitizeText(formData.get("title"), 160);
  const category = sanitizeText(formData.get("category"), 80);
  const excerpt = sanitizeMultiline(formData.get("excerpt"), 500);
  const body = sanitizeMultiline(formData.get("body"), 8000);
  const publishedAt = validateDate(formData.get("publishedAt"));
  const galleryLayout = validateGalleryLayout(formData.get("galleryLayout")) as StoredPost["galleryLayout"];
  const mediaFiles = formData.getAll("media").filter((file): file is File => file instanceof File && file.size > 0);

  if (!title || !category || !excerpt || !body || !publishedAt || !mediaFiles.length) {
    return NextResponse.json({ message: "All post fields and at least one photo are required." }, { status: 400 });
  }

  if (mediaFiles.some((file) => !validateImageFile(file))) {
    return NextResponse.json({ message: "Only image uploads up to 10MB are supported for news galleries." }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const posts = await getPosts();
  const baseSlug = slugify(title);
  const slugExists = posts.some((post) => post.slug === baseSlug);
  const slug = slugExists ? `${baseSlug}-${id.slice(0, 8)}` : baseSlug;
  const mediaItems = await Promise.all(
    mediaFiles.map(async (media, index) => {
      const fileName = sanitizeFileName(media.name);
      const extension = fileName.includes(".") ? fileName.split(".").pop() : "bin";
      const mediaKey = `news/${new Date().getFullYear()}/${slug}-${id}-${index + 1}.${extension}`;
      const mediaUrl = await uploadToR2({
        key: mediaKey,
        body: Buffer.from(await media.arrayBuffer()),
        contentType: media.type || "application/octet-stream",
      });

      return {
        key: mediaKey,
        url: mediaUrl,
        fileName,
        contentType: media.type || "application/octet-stream",
        order: index + 1,
      };
    }),
  );
  const post: StoredPost = {
    id,
    slug,
    title,
    category,
    excerpt,
    body,
    publishedAt,
    galleryLayout,
    mediaItems,
    createdAt: new Date().toISOString(),
  };

  await savePosts([post, ...posts]);

  return NextResponse.json({ post });
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const posts = await getPosts();
  return NextResponse.json({ posts });
}
