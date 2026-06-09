import workflowsJson from "./workflows.json";
import type { Workflow } from "@/types/workflow";
import { simulateNetworkDelay } from "@/lib/network";
const workflows = workflowsJson as Workflow[];

export async function getWorkflows(): Promise<Workflow[]> {
  await simulateNetworkDelay();
  return workflows;
}

export async function getWorkflowById(
  workflowId: string,
): Promise<Workflow | undefined> {
  await simulateNetworkDelay();
  return workflows.find((workflow) => workflow.id === workflowId);
}
