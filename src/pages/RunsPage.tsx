import { useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVirtualizer } from "@tanstack/react-virtual";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import RunCard from "@/components/runs/RunCard";
import RunsStatusFilters from "@/components/runs/RunsStatusFilters";
import { useRuns } from "@/hooks/useRuns";
import type { Run, RunFilterStatus } from "@/types/run";

const DEFAULT_STATUS: RunFilterStatus = "all";

export default function RunsPage() {
  const { data: runs, isLoading, error } = useRuns();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const status =
    (searchParams.get("status") as RunFilterStatus) ?? DEFAULT_STATUS;
  const parentRef = useRef<HTMLDivElement>(null);

  const setStatus = (next: RunFilterStatus) => {
    const params = new URLSearchParams();
    if (next !== DEFAULT_STATUS) params.set("status", next);
    setSearchParams(params, { replace: true });
  };

  const counts = useMemo(
    () => ({
      all: runs.length,
      running: runs.filter((r) => r.status === "running").length,
      waiting: runs.filter((r) => r.status === "waiting").length,
      completed: runs.filter((r) => r.status === "completed").length,
      failed: runs.filter((r) => r.status === "failed").length,
    }),
    [runs],
  );

  const filteredRuns = useMemo(
    () => (status === "all" ? runs : runs.filter((r) => r.status === status)),
    [runs, status],
  );
  
  const rowVirtualizer = useVirtualizer({
    count: filteredRuns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 160,
    overscan: 5,
    measureElement:
      typeof window !== "undefined"
        ? (el) => el.getBoundingClientRect().height
        : undefined,
  });

  const handleCancelRun = (runId: string) => console.log(runId);
  const handleOpenRun = (runId: string) => navigate(`/runs/${runId}`);

  return (
    <PageContainer>
      <PageHeader
        title="Runs"
        description="Monitor workflow executions and their current status."
      />
      <RunsStatusFilters value={status} counts={counts} onChange={setStatus} />

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-slate-100 animate-pulse"
            />
          ))}
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
        <div className="space-y-2">
          <p className="text-sm text-slate-500">
            Showing {filteredRuns.length.toLocaleString()} run
            {filteredRuns.length !== 1 ? "s" : ""}
          </p>

          <div
            ref={parentRef}
            className="overflow-auto"
            style={{ height: "calc(100vh - 280px)", minHeight: 400 }}
          >
            <div
              style={{
                height: rowVirtualizer.getTotalSize(),
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const run = filteredRuns[virtualRow.index] as Run;
                return (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                    style={{
                      position: "absolute",
                      top: virtualRow.start,
                      left: 0,
                      right: 0,
                    }}
                    className="pb-4"
                  >
                    <RunCard
                      run={run}
                      onCancel={handleCancelRun}
                      onClick={handleOpenRun}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
