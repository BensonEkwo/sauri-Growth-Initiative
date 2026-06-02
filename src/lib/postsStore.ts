import { readJsonFile } from "./dataStore";
import { getR2Object, putR2Object } from "./cloudflareR2";

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

const LOCAL_POSTS_FILE = "posts.json";
const DEFAULT_R2_POSTS_KEY = "admin/posts.json";

function getPostsKey() {
  return process.env.CLOUDFLARE_R2_POSTS_KEY || DEFAULT_R2_POSTS_KEY;
}

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
  const posts = await readCloudflarePosts();
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
  await putR2Object(getPostsKey(), JSON.stringify(posts, null, 2), "application/json");
}

export function createSlug(value: string) {
  return slugify(value);
}

async function readCloudflarePosts() {
  try {
    const object = await getR2Object(getPostsKey());

    if (!object) {
      return readLocalPosts();
    }

    return JSON.parse(object.body) as LegacyPost[];
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Cloudflare R2 posts JSON is invalid.");
    }

    return readLocalPosts();
  }
}

async function readLocalPosts() {
  return readJsonFile<LegacyPost[]>(LOCAL_POSTS_FILE, []);
}
