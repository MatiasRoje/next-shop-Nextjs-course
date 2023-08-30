export class ApiError extends Error {
  constructor(url: string, public status: number) {
    super(`'${url}' returned ${status}`);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = "ApiError";
  }
}

export async function fetchJson(
  url: string,
  options: RequestInit
): Promise<any> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new ApiError(url, res.status);
  }

  return await res.json();
}
