// Upload a file to Strapi and return the uploaded file id
export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "http://nginx"
    : "http://localhost";
export async function uploadFileToStrapi(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('files', file);
  const res = await fetch(`${SITE_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    throw new Error('Failed to upload file');
  }
  const data = await res.json();
  // Strapi returns an array of uploaded files
  return data[0]?.id;
}
