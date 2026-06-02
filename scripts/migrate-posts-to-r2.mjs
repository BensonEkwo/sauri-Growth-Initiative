import { createHash, createHmac } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const postsFile = join(process.cwd(), "data", "posts.json");

loadEnv(".env.local");

if (!existsSync(postsFile)) {
  console.log("No local data/posts.json file found. Nothing to migrate.");
  process.exit(0);
}

const postsJson = await readFile(postsFile, "utf8");
JSON.parse(postsJson);

const key = process.env.CLOUDFLARE_R2_POSTS_KEY || "admin/posts.json";
await putR2Object({
  body: postsJson,
  contentType: "application/json",
  key,
});

console.log(`Uploaded local posts data to Cloudflare R2 at ${key}.`);

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

function getR2Config() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;

  if (!accountId || !bucket || !accessKeyId || !secretAccessKey) {
    throw new Error("Cloudflare R2 credentials are not configured in .env.local.");
  }

  return {
    accountId,
    bucket,
    accessKeyId,
    secretAccessKey,
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  };
}

function hmac(key, value) {
  return createHmac("sha256", key).update(value).digest();
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function encodeKey(key) {
  return key.split("/").map(encodeURIComponent).join("/");
}

async function putR2Object({ body, contentType, key }) {
  const config = getR2Config();
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const host = `${config.accountId}.r2.cloudflarestorage.com`;
  const pathname = `/${config.bucket}/${encodeKey(key)}`;
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
  const response = await fetch(`${config.endpoint}${pathname}`, {
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
}
