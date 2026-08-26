
import { API_BASE_URL } from "./api";
export interface StartApiResponse {
  task_id: string;
  thumbnail: string;
  title: string;
  duration: string;
}

export async function startDownload(url: string, format: string): Promise<StartApiResponse> {
  const params = new URLSearchParams({ url, format });

  const res = await fetch(`${API_BASE_URL}/start?${params.toString()}`, {
    method: "GET", // your FastAPI route is GET
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`);
  }

  return res.json();
}
