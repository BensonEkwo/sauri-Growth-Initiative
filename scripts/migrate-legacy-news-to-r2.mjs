import { createHash, createHmac } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const postsFile = join(process.cwd(), "data", "posts.json");

loadEnv(".env.local");

const legacyPosts = [
  {
    id: "legacy-empowering-women-with-disabilities-in-benue-state",
    slug: "empowering-women-with-disabilities-in-benue-state",
    title: "Empowering Women With Disabilities in Benue State.",
    category: "ECONOMIC DEVELOPMENT",
    excerpt: "A 2-day training helped 30 women with disabilities in Otukpo, Benue State build knowledge of climate change and resilience strategies.",
    body: [
      "We're thrilled to share the success of our 2-day training on climate change and resilience strategies for 30 women with disabilities in Otukpo, Benue State!",
      "We kicked off the training with a startling realization - 70% of our participants had little to no knowledge about climate change and its impact on their lives.",
      "After an engaging and informative session, the women demonstrated a clear understanding of climate change and its effects on women with different disabilities through their group work presentations.",
      "We're proud to have created a safe space for these incredible women to learn, share, and grow.",
    ].join("\n\n"),
    publishedAt: "2024-10-22",
    galleryLayout: "feature",
    images: [
      "public/images/climateChange.jpeg",
      "public/images/roundtable.jpeg",
    ],
  },
  {
    id: "legacy-empowering-women-and-girls-with-disabilities-through-inclusive-climate-action",
    slug: "empowering-women-and-girls-with-disabilities-through-inclusive-climate-action",
    title: "Empowering Women and Girls with Disabilities through Inclusive Climate Action.",
    category: "ECONOMIC DEVELOPMENT",
    excerpt: "Accessible climate action resources for women and girls with disabilities, including resilient strategies, a booklet, and a policy brief.",
    body: [
      "This accessible resource explores the intersection of climate change, disability, and gender.",
      "It highlights practical strategies including accessible early warning systems, climate-resilient livelihoods, inclusive disaster risk reduction, and mental health support.",
      "The work also includes a booklet and policy brief focused on inclusive climate change policies for women and girls with disabilities in Benue State.",
    ].join("\n\n"),
    publishedAt: "2024-09-15",
    galleryLayout: "grid",
    images: [
      "public/images/IMG_2479.JPG",
      "public/images/climatechangecartoon2.jpeg",
      "public/images/climateChangecartoon3.jpeg",
      "public/images/climateChangecartoon4.jpeg",
      "public/images/climatechangecartoon5.jpeg",
    ],
  },
  {
    id: "legacy-significant-action-on-the-disability-bill-benue-state",
    slug: "significant-action-on-the-disability-bill-benue-state",
    title: "Significant Action on the Disability Bill, Benue State.",
    category: "ACTION STORY",
    excerpt: "A major disability-rights advocacy moment in Benue State following renewed commitment to the swift passage of the Disability Bill.",
    body: [
      "On the 11th of November 2024, Governor Hyacinth Alia's commitment to the swift passage of the Disability Bill marked a turning point for disability rights in Benue State.",
      "The bill, once passed, will address long-standing challenges faced by persons with disabilities in accessing education, employment, and public infrastructure.",
      "Advocacy groups are hopeful that the bill will set a benchmark for other states and support full participation of persons with disabilities in society.",
    ].join("\n\n"),
    publishedAt: "2024-10-28",
    galleryLayout: "feature",
    images: [
      "public/images/IMG_2477.JPG",
    ],
  },
];

const existingPosts = await readPosts();
const existingIds = new Set(existingPosts.map((post) => post.id));
const migratedPosts = [];

for (const legacyPost of legacyPosts) {
  if (existingIds.has(legacyPost.id)) {
    console.log(`Skipping existing legacy post: ${legacyPost.title}`);
    continue;
  }

  const mediaItems = [];

  for (const [index, imagePath] of legacyPost.images.entries()) {
    const body = await readFile(join(process.cwd(), imagePath));
    const fileName = imagePath.split("/").pop() || `image-${index + 1}`;
    const contentType = getContentType(fileName);
    const key = `legacy-news/${legacyPost.slug}/${index + 1}-${fileName}`;
    const url = await uploadToR2({ body, contentType, key });

    mediaItems.push({
      key,
      url,
      fileName,
      contentType,
      order: index + 1,
    });

    console.log(`Uploaded ${fileName}`);
  }

  migratedPosts.push({
    id: legacyPost.id,
    slug: legacyPost.slug,
    title: legacyPost.title,
    category: legacyPost.category,
    excerpt: legacyPost.excerpt,
    body: legacyPost.body,
    publishedAt: legacyPost.publishedAt,
    galleryLayout: legacyPost.galleryLayout,
    mediaItems,
    importedFrom: "legacy-news-feed",
    createdAt: new Date().toISOString(),
  });
}

if (migratedPosts.length) {
  await mkdir(join(process.cwd(), "data"), { recursive: true });
  await writeFile(postsFile, JSON.stringify([...migratedPosts, ...existingPosts], null, 2));
}

console.log(`Migrated ${migratedPosts.length} legacy post${migratedPosts.length === 1 ? "" : "s"} to admin gallery data.`);

async function readPosts() {
  if (!existsSync(postsFile)) {
    return [];
  }

  return JSON.parse(await readFile(postsFile, "utf8"));
}

function loadEnv(fileName) {
  const filePath = join(process.cwd(), fileName);

  if (!existsSync(filePath)) {
    return;
  }

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex);
    const value = trimmed.slice(separatorIndex + 1).replace(/^["']|["']$/g, "");
    process.env[key] ||= value;
  }
}

function getContentType(fileName) {
  const extension = extname(fileName).toLowerCase();
  const contentTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  };

  return contentTypes[extension] || "application/octet-stream";
}

function getR2Config() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const publicBaseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;

  if (!accountId || !bucket || !accessKeyId || !secretAccessKey) {
    throw new Error("Cloudflare R2 credentials are not configured in .env.local.");
  }

  return {
    accountId,
    bucket,
    accessKeyId,
    secretAccessKey,
    publicBaseUrl,
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  };
}

function hmac(key, value) {
  return createHmac("sha256", key).update(value).digest();
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function uploadToR2({ body, contentType, key }) {
  const config = getR2Config();
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const host = `${config.accountId}.r2.cloudflarestorage.com`;
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  const pathname = `/${config.bucket}/${encodedKey}`;
  const payloadHash = hash(body);
  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;
  const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";
  const canonicalHeaders = [
    `content-type:${contentType}`,
    `host:${host}`,
    `x-amz-content-sha256:${payloadHash}`,
    `x-amz-date:${amzDate}`,
    "",
  ].join("\n");
  const canonicalRequest = [
    "PUT",
    pathname,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    hash(canonicalRequest),
  ].join("\n");
  const dateKey = hmac(`AWS4${config.secretAccessKey}`, dateStamp);
  const regionKey = hmac(dateKey, "auto");
  const serviceKey = hmac(regionKey, "s3");
  const signingKey = hmac(serviceKey, "aws4_request");
  const signature = createHmac("sha256", signingKey).update(stringToSign).digest("hex");
  const authorization = `AWS4-HMAC-SHA256 Credential=${config.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  const uploadUrl = `${config.endpoint}${pathname}`;
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: authorization,
      "Content-Type": contentType,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate,
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Cloudflare R2 upload failed with status ${response.status}.`);
  }

  return config.publicBaseUrl
    ? `${config.publicBaseUrl.replace(/\/$/, "")}/${encodedKey}`
    : uploadUrl;
}
