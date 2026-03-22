// Submit lead to Strapi API (all fields)
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function submitLead(data: {
  full_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  service?: any;
  status_lead?: string;
  ip_address?: string;
  user_agent?: string;
  note?: string;
  message?: string;
  attachments?: File | null;
}) {
  const payload = { data };
  const res = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error("Failed to submit lead");
  }
  return await res.json();
}
