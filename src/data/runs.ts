import runsJson from "./runs.json";
import runsLargeJson from "./runs-large.json";
import type { Run } from "@/types/run";
import { simulateNetworkDelay } from "@/lib/network";

const runs = runsJson as Run[];
const largeRuns = runsLargeJson as Run[];

export async function getRuns(): Promise<Run[]> {
  await simulateNetworkDelay();
  return runs;
}

export async function getLargeRuns(): Promise<Run[]> {
  await simulateNetworkDelay();
  return largeRuns;
}

export async function getRunById(runId: string): Promise<Run | undefined> {
  await simulateNetworkDelay();
  const allRuns = [...runs, ...largeRuns];
  return allRuns.find((run) => run.id === runId);
}
