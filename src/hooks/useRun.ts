import { useMemo } from "react";
import { useRuns } from "./useRuns";

export function useRun(runId: string | undefined) {
  const { data, isLoading, error } = useRuns();

  const run = useMemo(
    () => data.find((item) => item.id === runId),
    [data, runId],
  );

  return {
    run,
    isLoading,
    error,
  };
}
