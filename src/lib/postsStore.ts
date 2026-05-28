import { readJsonFile, writeJsonFile } from "./dataStore";

export type GalleryLayout = "feature" | "grid" | "stack";

export type StoredPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  galleryLayout: GalleryLayout;
  mediaItems: {
    key: string;
    url: string;
    fileName: string;
    contentType: string;
    order: number;
  }[];
  importedFrom?: string;
  createdAt: string;
};

type LegacyPost = Partial<StoredPost> & {
  id: string;
  title: string;
  mediaUrl?: string;
  mediaKey?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function normalizePost(post: LegacyPost): StoredPost {
  const slug = post.slug || slugify(post.title || post.id);
  const mediaItems = post.mediaItems?.length
    ? post.mediaItems
    : post.mediaUrl
      ? [{
          key: post.mediaKey || post.mediaUrl,
          url: post.mediaUrl,
          fileName: post.title || "News media",
          contentType: "image/*",
          order: 1,
        }]
      : [];

  return {
    id: post.id,
    slug,
    title: post.title,
    category: post.category || "News",
    excerpt: post.excerpt || "",
    body: post.body || "",
    publishedAt: post.publishedAt || post.createdAt || new Date().toISOString(),
    galleryLayout: post.galleryLayout || "feature",
    mediaItems,
    importedFrom: post.importedFrom,
    createdAt: post.createdAt || new Date().toISOString(),
  };
}

export async function getPosts() {
  const posts = await readJsonFile<LegacyPost[]>("posts.json", []);
  return posts.map(normalizePost);
}

export async function getPostBySlug(slug: string) {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getPostById(id: string) {
  const posts = await getPosts();
  return posts.find((post) => post.id === id);
}

export async function savePosts(posts: StoredPost[]) {
  await writeJsonFile("posts.json", posts);
}

export function createSlug(value: string) {
  return slugify(value);
}
