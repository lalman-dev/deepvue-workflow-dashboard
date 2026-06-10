import StatusBadge from "@/components/shared/StatusBadge";
import type { Run } from "@/types/run";
import { formatDuration } from "@/lib/run-utils";

interface Props {
  run: Run;
}

export default function RunSummaryCard({ run }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Execution Summary</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm text-slate-500">Status</p>
          <div className="mt-1">
            <StatusBadge status={run.status} />
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500">Started</p>
          <p className="mt-1 font-medium">
            {new Date(run.started_at).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Duration</p>
          <p className="mt-1 font-medium">{formatDuration(run.duration_ms)}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Progress</p>
          <p className="mt-1 font-medium">{run.progress ?? 0}%</p>
        </div>
      </div>
    </div>
  );
}
