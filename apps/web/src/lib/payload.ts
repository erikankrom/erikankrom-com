export const CMS_URL = import.meta.env.CMS_URL || "http://localhost:3000";

export interface MediaItem {
  id: string;
  url: string;
  alt: string;
  filename: string;
  width?: number;
  height?: number;
}

export function mediaUrl(media: MediaItem | string | null | undefined): string | null {
  if (!media) return null;
  if (typeof media === "string") return `${CMS_URL}${media}`;
  return `${CMS_URL}${media.url}`;
}

export function mediaAlt(media: MediaItem | string | null | undefined): string {
  if (!media || typeof media === "string") return "";
  return media.alt || "";
}

interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export async function fetchFromCMS<T>(
  collection: string,
  params: Record<string, string> = {},
): Promise<PayloadResponse<T>> {
  const query = new URLSearchParams(params).toString();
  const url = `${CMS_URL}/api/${collection}${query ? `?${query}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`CMS fetch failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchOneFromCMS<T>(
  collection: string,
  slug: string,
): Promise<T | null> {
  const res = await fetchFromCMS<T>(collection, {
    "where[slug][equals]": slug,
    limit: "1",
  });
  return res.docs[0] ?? null;
}

export async function fetchGlobal<T>(global: string): Promise<T> {
  const url = `${CMS_URL}/api/globals/${global}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`CMS global fetch failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
