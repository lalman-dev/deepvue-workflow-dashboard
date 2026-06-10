import type { WorkflowFilterStatus } from "@/types/workflow";

interface StatusFiltersProps {
  value: WorkflowFilterStatus;
  counts: Record<WorkflowFilterStatus, number>;
  onChange: (status: WorkflowFilterStatus) => void;
}

const statuses: WorkflowFilterStatus[] = [
  "all",
  "published",
  "draft",
  "archived",
];

export default function StatusFilters({
  value,
  counts,
  onChange,
}: StatusFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => {
        const active = value === status;

        return (
          <button
            key={status}
            type="button"
            onClick={() => onChange(status)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-[#1B1464] text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({counts[status]}
            )
          </button>
        );
      })}
    </div>
  );
}
