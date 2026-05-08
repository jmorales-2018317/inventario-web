import { API_URL } from "@/lib/constants";

type HttpClientResponse<T> = {
  data: T;
};

async function parseResponse<T>(response: Response): Promise<HttpClientResponse<T>> {
  const data = (await response.json()) as T;
  return { data };
}

function buildUrl(path: string): string {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return `${API_URL}${path}`;
}

export const httpInventoryClient = {
  async get<T>(path: string): Promise<HttpClientResponse<T>> {
    const response = await fetch(buildUrl(path), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return parseResponse<T>(response);
  },
};
