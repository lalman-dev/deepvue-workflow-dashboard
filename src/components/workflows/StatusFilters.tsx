import type { WorkflowFilterStatus } from "@/types/workflow";

interface StatusFiltersProps {
  value: WorkflowFilterStatus;
  counts: Record<WorkflowFilterStatus, number>;
  onChange: (status: WorkflowFilterStatus) => void;
}

const statuses: WorkflowFilterStatus[] = ["all", "published", "draft", "archived"];

export default function StatusFilters({ value, counts, onChange }: StatusFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => {
        const active = value === status;
        return (
          <button
            key={status}
            type="button"
            onClick={() => onChange(status)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
              active
                ? "bg-[#1B1464] text-white border-[#1B1464]"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
            <span className={active ? "opacity-75" : "text-slate-400"}>
              ({counts[status]})
            </span>
          </button>
        );
      })}
    </div>
  );
}
