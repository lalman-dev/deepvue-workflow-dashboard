import { useEffect, useState } from "react";
import { getRuns } from "@/data/runs";
import type { Run } from "@/types/run";

export function useRuns() {
  const [data, setData] = useState<Run[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadRuns = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const runs = await getRuns();
        if (!isMounted) return;
        setData(runs);
      } catch {
        if (!isMounted) return;
        setError("Failed to load runs.");
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    void loadRuns();
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}
