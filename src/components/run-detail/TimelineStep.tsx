import { CheckCircle2, Clock3, Circle, XCircle } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatDuration } from "@/lib/run-utils";
import type { RunStep } from "@/types/run";

interface Props {
  step: RunStep;
}

export default function TimelineStep({ step }: Props) {
  const getIcon = () => {
    switch (step.status) {
      case "succeeded":
        return <CheckCircle2 className="text-emerald-600" size={18} />;
      case "failed":
        return <XCircle className="text-rose-600" size={18} />;
      case "pending":
        return <Clock3 className="text-amber-600" size={18} />;
      default:
        return <Circle className="text-slate-400" size={18} />;
    }
  };

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="mt-1">{getIcon()}</div>
          <div>
            <h3 className="font-medium">{step.node_id}</h3>
            <p className="text-sm text-slate-500">{step.node_type}</p>
          </div>
        </div>
        <StatusBadge status={step.status} />
      </div>
      {step.output && (
        <pre className="mt-4 overflow-auto rounded-lg bg-slate-50 p-3 text-xs">
          {JSON.stringify(step.output, null, 2)}
        </pre>
      )}
      {step.error && (
        <div className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          {step.error}
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
        <span>
          Started:{" "}
          {step.started_at ? new Date(step.started_at).toLocaleString() : "—"}
        </span>
        <span>Duration: {formatDuration(step.duration_ms)}</span>
      </div>
    </div>
  );
}
