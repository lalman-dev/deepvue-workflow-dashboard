export interface TimelineNode {
  id: string;
  name: string;
  status: "completed" | "running" | "waiting" | "failed";
  timestamp: string;
}
