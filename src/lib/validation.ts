const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const DANGEROUS_CHARS = /[<>`]/g;

export function sanitizeText(value: unknown, maxLength = 180) {
  return String(value || "")
    .replace(CONTROL_CHARS, "")
    .replace(DANGEROUS_CHARS, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeMultiline(value: unknown, maxLength = 5000) {
  return String(value || "")
    .replace(CONTROL_CHARS, "")
    .replace(DANGEROUS_CHARS, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

export function sanitizePath(value: unknown, maxLength = 300) {
  const path = sanitizeText(value, maxLength);
  return path.startsWith("/") ? path : "/";
}

export function sanitizeFileName(value: unknown) {
  return sanitizeText(value, 120)
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "") || "upload";
}

export function validateDate(value: unknown) {
  const date = sanitizeText(value, 10);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return "";
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? "" : date;
}

export function validateGalleryLayout(value: unknown, fallback: "feature" | "grid" | "stack" = "feature") {
  return value === "feature" || value === "grid" || value === "stack" ? value : fallback;
}

export function validateImageFile(file: File) {
  return file.type.startsWith("image/") && file.size > 0 && file.size <= 10 * 1024 * 1024;
}

export function sanitizePositiveInteger(value: unknown, fallback?: number) {
  const number = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return fallback;
  }

  return Math.round(number);
}
