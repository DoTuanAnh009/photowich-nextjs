// Upload a file to Strapi and return the uploaded file id
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function uploadFileToStrapi(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('files', file);
  const res = await fetch(`${SITE_URL}/upload`, {
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
