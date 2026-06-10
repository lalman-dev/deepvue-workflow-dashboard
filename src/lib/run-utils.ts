import { formatDistanceToNow } from "date-fns";

export function formatRelativeTime(dateString: string) {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
  });
}

export function formatDuration(durationMs?: number | null) {
  if (!durationMs) {
    return "—";
  }
  const seconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }

  return `${seconds}s`;
}
