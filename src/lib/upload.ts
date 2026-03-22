// Upload a file to Strapi and return the uploaded file id


const baseUrl =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL;
export async function uploadFileToStrapi(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('files', file);
  const res = await fetch(`${baseUrl}/api/upload`, {
    method: 'POST',
    body: formData,
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to upload file');
  }
  const data = await res.json();
  // Strapi returns an array of uploaded files
  return data[0]?.id;
}
