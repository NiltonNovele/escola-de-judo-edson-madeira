import { API_BASE } from "@/lib/api";

export { API_BASE, resolveUploadedImage } from "@/lib/api";

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || "";

export async function adminFetch(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  if (ADMIN_API_KEY) headers.set("Authorization", `Bearer ${ADMIN_API_KEY}`);

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.message || `Request failed (${res.status})`);
  }

  return body;
}
