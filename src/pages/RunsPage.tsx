import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import RunCard from "@/components/runs/RunCard";
import RunsStatusFilters from "@/components/runs/RunsStatusFilters";
import { useRuns } from "@/hooks/useRuns";
import type { Run, RunFilterStatus } from "@/types/run";

export default function RunsPage() {
  const { data: runs, isLoading, error } = useRuns();
  const navigate = useNavigate();
  const [status, setStatus] = useState<RunFilterStatus>("all");
  const counts = useMemo(
    () => ({
      all: runs.length,
      running: runs.filter((run) => run.status === "running").length,
      waiting: runs.filter((run) => run.status === "waiting").length,
      completed: runs.filter((run) => run.status === "completed").length,
      failed: runs.filter((run) => run.status === "failed").length,
    }),[runs],
  );

  const filteredRuns = useMemo(() => {
    if (status === "all") {
      return runs;
    }

    return runs.filter((run) => run.status === status);
  }, [runs, status]);

  const handleCancelRun = (runId: string) => {
    console.log(runId);
  };

  const handleOpenRun = (runId: string) => {
    navigate(`/runs/${runId}`);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Runs"
        description="Monitor workflow executions and their current status."
      />
      <RunsStatusFilters value={status} counts={counts} onChange={setStatus} />
      {isLoading && (
        <div className="space-y-4">
          <div className="h-28 rounded-2xl bg-slate-100 animate-pulse" />
          <div className="h-28 rounded-2xl bg-slate-100 animate-pulse" />
          <div className="h-28 rounded-2xl bg-slate-100 animate-pulse" />
        </div>
      )}

      {!isLoading && error && <ErrorState message={error} />}
      {!isLoading && !error && filteredRuns.length === 0 && (
        <EmptyState
          title="No runs found"
          description="Try adjusting your filters."
        />
      )}

      {!isLoading && !error && filteredRuns.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Showing {filteredRuns.length} run
            {filteredRuns.length !== 1 ? "s" : ""}
          </p>

          {filteredRuns.map((run: Run) => (
            <RunCard
              key={run.id}
              run={run}
              onCancel={handleCancelRun}
              onClick={handleOpenRun}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
