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
      setIsLoading(true);
      setError(null);
      try {
        const runs = await getRuns();
        if (isMounted) {
          setData(runs);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load runs.");
          setIsLoading(false);
        }
      }
    };

    void loadRuns();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
