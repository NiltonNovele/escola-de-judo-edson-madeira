export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://ejem-donations.onrender.com";

export function resolveUploadedImage(image: string) {
  return image.startsWith("/uploads") ? `${API_BASE}${image}` : image;
}
