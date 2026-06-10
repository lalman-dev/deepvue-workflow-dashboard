import type { WorkflowSort } from "@/types/workflow";

interface SortSelectProps {
  value: WorkflowSort;
  onChange: (value: WorkflowSort) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as WorkflowSort)}
      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
    >
      <option value="last_modified">Last Modified</option>
      <option value="name">Name</option>
      <option value="nodes">Nodes</option>
    </select>
  );
}
