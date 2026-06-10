import { ChevronDown } from "lucide-react";
import type { WorkflowSort } from "@/types/workflow";

interface SortSelectProps {
  value: WorkflowSort;
  onChange: (value: WorkflowSort) => void;
}

const options: { value: WorkflowSort; label: string }[] = [
  { value: "last_modified", label: "Last Modified" },
  { value: "name", label: "Name" },
  { value: "nodes", label: "Nodes" },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as WorkflowSort)}
        className="appearance-none rounded-full border border-slate-200 bg-white pl-4 pr-9 py-1.5 text-sm font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-[#1B1464] focus:ring-1 focus:ring-[#1B1464] cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort: {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
    </div>
  );
}
