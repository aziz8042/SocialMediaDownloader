import { API_BASE_URL } from "./api";

export interface UpdateFormatResponse {
  task_id: string;
  format: string;
  thumbnail?: string;
  title?: string;
  duration?: string;
  message: string;
}

export async function updateFormatApi(
  taskId: string,
  format: string
): Promise<UpdateFormatResponse> {
  const base = API_BASE_URL.replace(/\/+$/, "");
  const url = `${base}/update_format/${encodeURIComponent(taskId)}?format=${encodeURIComponent(format)}`;
  console.log("update format is called")
  const res = await fetch(url, { method: "POST" });
  console.log("taskID changed to :",res)
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `Failed to update format: ${res.status}`);
  }
  return res.json();
}
