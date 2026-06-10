import { useEffect, useState } from "react";
import { getRunById } from "@/data/runs";
import type { Run } from "@/types/run";

export function useRun(runId: string) {
  const [data, setData] = useState<Run | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadRun = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const run = await getRunById(runId);
        if (!isMounted) return;
        if (!run) {
          throw new Error("Run not found");
        }
        setData(run);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to load run.");
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    void loadRun();
    return () => {
      isMounted = false;
    };
  }, [runId]);

  return {
    data,
    isLoading,
    error,
  };
}
