// Upload a file to Strapi and return the uploaded file id
export async function uploadFileToStrapi(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('files', file);
  const res = await fetch('http://localhost:1337/api/upload', {
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
