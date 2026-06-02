import { createHash, createHmac } from "crypto";

type UploadInput = {
  body: Buffer;
  contentType: string;
  key: string;
};

type R2Object = {
  body: string;
  contentType: string | null;
};

function hmac(key: Buffer | string, value: string) {
  return createHmac("sha256", key).update(value).digest();
}

function hash(value: Buffer | string) {
  return createHash("sha256").update(value).digest("hex");
}

function encodeKey(key: string) {
  return key.split("/").map(encodeURIComponent).join("/");
}

function getR2Config() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const publicBaseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;

  if (!accountId || !bucket || !accessKeyId || !secretAccessKey) {
    throw new Error("Cloudflare R2 credentials are not configured.");
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

export async function uploadToR2({ body, contentType, key }: UploadInput) {
  await putR2Object(key, body, contentType);
  const config = getR2Config();
  const encodedKey = encodeKey(key);
  const uploadUrl = `${config.endpoint}/${config.bucket}/${encodedKey}`;

  return config.publicBaseUrl
    ? `${config.publicBaseUrl.replace(/\/$/, "")}/${encodedKey}`
    : uploadUrl;
}

export async function putR2Object(key: string, body: Buffer | string, contentType: string) {
  const config = getR2Config();
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const host = `${config.accountId}.r2.cloudflarestorage.com`;
  const encodedKey = encodeKey(key);
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
}

export async function getR2Object(key: string): Promise<R2Object | null> {
  const config = getR2Config();
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const host = `${config.accountId}.r2.cloudflarestorage.com`;
  const encodedKey = encodeKey(key);
  const pathname = `/${config.bucket}/${encodedKey}`;
  const payloadHash = hash("");
  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
  const canonicalHeaders = [
    `host:${host}`,
    `x-amz-content-sha256:${payloadHash}`,
    `x-amz-date:${amzDate}`,
    "",
  ].join("\n");
  const canonicalRequest = [
    "GET",
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
    method: "GET",
    headers: {
      Authorization: authorization,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate,
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Cloudflare R2 read failed with status ${response.status}.`);
  }

  return {
    body: await response.text(),
    contentType: response.headers.get("content-type"),
  };
}
