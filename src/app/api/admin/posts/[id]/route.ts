import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { uploadToR2 } from "@/lib/cloudflareR2";
import { createSlug, getPosts, savePosts, type StoredPost } from "@/lib/postsStore";
import { sanitizeFileName, sanitizeMultiline, sanitizeText, validateDate, validateGalleryLayout, validateImageFile } from "@/lib/validation";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const posts = await getPosts();
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return NextResponse.json({ message: "Post not found." }, { status: 404 });
  }

  const currentPost = posts[postIndex];
  const formData = await request.formData();
  const title = sanitizeText(formData.get("title"), 160);
  const category = sanitizeText(formData.get("category"), 80);
  const excerpt = sanitizeMultiline(formData.get("excerpt"), 500);
  const body = sanitizeMultiline(formData.get("body"), 8000);
  const publishedAt = validateDate(formData.get("publishedAt"));
  const galleryLayout = validateGalleryLayout(formData.get("galleryLayout"), currentPost.galleryLayout) as StoredPost["galleryLayout"];
  const mediaFiles = formData.getAll("media").filter((file): file is File => file instanceof File && file.size > 0);

  if (!title || !category || !excerpt || !body || !publishedAt) {
    return NextResponse.json({ message: "Title, category, excerpt, body, and publish date are required." }, { status: 400 });
  }

  if (mediaFiles.some((file) => !validateImageFile(file))) {
    return NextResponse.json({ message: "Only image uploads up to 10MB are supported for news galleries." }, { status: 400 });
  }

  const baseSlug = createSlug(title);
  const slugExists = posts.some((post) => post.id !== id && post.slug === baseSlug);
  const slug = slugExists ? currentPost.slug : baseSlug;
  const nextOrder = currentPost.mediaItems.length + 1;
  const addedMedia = await Promise.all(
    mediaFiles.map(async (media, index) => {
      const fileName = sanitizeFileName(media.name);
      const extension = fileName.includes(".") ? fileName.split(".").pop() : "bin";
      const mediaKey = `news/${new Date().getFullYear()}/${slug}-${id}-${nextOrder + index}.${extension}`;
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
        order: nextOrder + index,
      };
    }),
  );

  const updatedPost: StoredPost = {
    ...currentPost,
    slug,
    title,
    category,
    excerpt,
    body,
    publishedAt,
    galleryLayout,
    mediaItems: [...currentPost.mediaItems, ...addedMedia],
  };

  posts[postIndex] = updatedPost;
  await savePosts(posts);

  return NextResponse.json({ post: updatedPost });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const posts = await getPosts();
  const remainingPosts = posts.filter((post) => post.id !== id);

  if (remainingPosts.length === posts.length) {
    return NextResponse.json({ message: "Post not found." }, { status: 404 });
  }

  await savePosts(remainingPosts);

  return NextResponse.json({ ok: true });
}
