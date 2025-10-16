export async function apiClient(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API Error ${res.status}: ${error}`);
  }

  return res.status === 204 ? null : res.json();
}
