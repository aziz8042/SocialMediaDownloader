// // /apis/fetchBlobFile.ts
// import { API_BASE_URL } from "./api";
// export async function fetchBlobFile(taskId: string): Promise<Blob> {
//   console.log("FetchBlob api has been called with taskID :",taskId)
//   const response = await fetch(`${API_BASE_URL}/fetch_blob?task_id=${encodeURIComponent(taskId)}`, {
//     method: "GET",
//   });

//   if (!response.ok) {
//     throw new Error(`Backend error: ${response.statusText}`);
//   }

//   // ✅ Return only the blob, not wrapped in an object
//   return await response.blob();
// }
