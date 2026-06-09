export type WorkflowStatus = "published" | "draft" | "archived";

export interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  nodes: number;
  last_modified: string;
  description: string;
}
