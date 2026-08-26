

// // src/apis/downlaodApi.ts
// import { API_BASE_URL } from "./api";

// /**
//  * Fetches the prepared file URL from backend for a given taskId.
//  */
// export async function downloadFile(taskId: string): Promise<{ url: string; status: string }> {
//   const res = await fetch(`${API_BASE_URL}/download?task_id=${encodeURIComponent(taskId)}`, {
//     method: "GET",
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`Failed to fetch download: ${res.status} ${res.statusText} - ${text}`);
//   }

//   const data = await res.json();

//   if (data.status === "done" && data.url) {
//     const fullUrl = `${API_BASE_URL}${data.url}`
//     console.log(fullUrl)
//     return { url: fullUrl, status: "done" };
//   } else if (data.status === "pending" || data.status === "downloading" || res.status === 202) {
//     return { url: "", status: "downloading" };
//   } else {
//     throw new Error(`Download failed or invalid response: ${JSON.stringify(data)}`);
//   }
// }





// src/apis/downlaodApi.ts
import { API_BASE_URL, NGINX_URL } from "./api";

/**
 * Fetches the prepared file URL from backend for a given taskId.
 * Automatically converts backend URL (/user_videos/...) → Nginx direct URL.
 */
export async function downloadFile(taskId: string): Promise<{ url: string; status: string }> {
  const res = await fetch(`${API_BASE_URL}/download?task_id=${encodeURIComponent(taskId)}`, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch download: ${res.status} ${res.statusText} - ${text}`);
  }

  const data = await res.json();

  if (data.status === "done" && data.url) {
    // Example: data.url = "/user_videos/xxxx.mp3"
    const filename = data.url.split("/").pop();
    const nginxUrl = `${NGINX_URL}/user_videos/${filename}`;
    console.log("🎯 Nginx file URL:", nginxUrl);
    return { url: nginxUrl, status: "done" };
  } else if (data.status === "pending" || data.status === "downloading" || res.status === 202) {
    return { url: "", status: "downloading" };
  } else {
    throw new Error(`Download failed or invalid response: ${JSON.stringify(data)}`);
  }
}
