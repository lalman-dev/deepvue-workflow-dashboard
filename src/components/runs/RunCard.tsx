import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatDuration, formatRelativeTime } from "@/lib/run-utils";
import type { Run } from "@/types/run";

interface Props {
  run: Run;
  onCancel: (runId: string) => void;
  onClick: (runId: string) => void;
}

export default function RunCard({ run, onCancel, onClick }: Props) {
  const canCancel = run.status === "running" || run.status === "waiting";

  return (
    <article
      onClick={() => onClick(run.id)}
      className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-violet-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-slate-900">
            {run.workflow_name}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>{run.id.slice(-8)}</span>
            <span>•</span>
            <span>{formatRelativeTime(run.started_at)}</span>
          </div>
        </div>

        <StatusBadge status={run.status} />
      </div>

      {run.status === "running" && (
        <div className="mt-3">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
            <span>Progress</span>
            <span>{run.progress ?? 0}%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-violet-600 transition-all duration-300"
              style={{
                width: `${run.progress ?? 0}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-slate-500">
          {run.status === "running" && "In progress"}
          {run.status === "waiting" && "Waiting to start"}
          {(run.status === "completed" || run.status === "failed") &&
            formatDuration(run.duration_ms)}
        </div>

        {canCancel && (
          <Button
            variant="outline"
            size="sm"
            onClick={(event) => {
              event.stopPropagation();
              onCancel(run.id);
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </article>
  );
}
