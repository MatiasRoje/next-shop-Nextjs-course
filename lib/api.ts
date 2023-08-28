export async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`request failed: ${res.status}`);
  }

  return await res.json();
}
