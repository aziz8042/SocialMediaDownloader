// cancelDownload.ts
export function cancelDownload(
  eventSource: EventSource | null,
  setEventSource: (es: EventSource | null) => void,
  setTaskId: (id: string | null) => void,
  setProgress: (val: number) => void,
  setStatus: (status: string) => void
) {
  if (eventSource) {
    eventSource.close(); // stop listening to backend progress
    setEventSource(null);
  }
  setTaskId(null);       // forget this task
  setProgress(0);        // reset progress bar
  setStatus("cancelled");// update UI
}
