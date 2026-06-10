export type RunStatus = "running" | "waiting" | "completed" | "failed";

export type StepStatus = "succeeded" | "pending" | "not_started" | "failed";

export interface RunStep {
  id: string;
  node_id: string;
  node_type: string;
  status: StepStatus;
  started_at: string | null;
  duration_ms: number | null;
  output: Record<string, unknown> | null;
  error: string | null;
}

export interface Run {
  id: string;
  workflow_id: string;
  workflow_name: string;
  workflow_version: string;
  status: RunStatus;
  started_at: string;
  duration_ms: number | null;
  progress: number | null;
  subject_id: string | null;
  error: string | null;
  trigger_input: Record<string, unknown>;
  steps: RunStep[];
  warning: string | null;
}

export type RunFilterStatus =
  | "all"
  | "running"
  | "waiting"
  | "completed"
  | "failed";
