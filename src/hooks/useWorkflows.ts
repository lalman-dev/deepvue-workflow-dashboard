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
      setIsLoading(true);
      setError(null);
      try {
        const workflows = await getWorkflows();
        if (isMounted) {
          setData(workflows);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load workflows.");
          setIsLoading(false);
        }
      }
    };

    void loadWorkflows();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
