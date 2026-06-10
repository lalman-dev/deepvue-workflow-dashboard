import { useEffect, useState } from "react";
import { getWorkflows } from "@/data/workflows";
import type { Workflow } from "@/types/workflow";

export function useWorkflows() {
  const [data, setData] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadWorkflows = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const workflows = await getWorkflows();
        if (!isMounted) return;
        setData(workflows);
      } catch {
        if (!isMounted) return;
        setError("Failed to load workflows.");
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    void loadWorkflows();
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
