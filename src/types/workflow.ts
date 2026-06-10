export type WorkflowStatus = "published" | "draft" | "archived";

export interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  nodes: number;
  last_modified: string;
  description: string;
}

export type WorkflowSort = "last_modified" | "name" | "nodes";

export type WorkflowFilterStatus = "all" | "published" | "draft" | "archived";
