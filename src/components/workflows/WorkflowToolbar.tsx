import SearchInput from "./SearchInput";
import SortSelect from "./SortSelect";
import StatusFilters from "./StatusFilters";
import type { WorkflowFilterStatus, WorkflowSort } from "@/types/workflow";

interface WorkflowToolbarProps {
  search: string;
  status: WorkflowFilterStatus;
  sort: WorkflowSort;
  counts: Record<WorkflowFilterStatus, number>;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: WorkflowFilterStatus) => void;
  onSortChange: (value: WorkflowSort) => void;
}

export default function WorkflowToolbar({
  search,
  status,
  sort,
  counts,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: WorkflowToolbarProps) {
  return (
    <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm">
      <SearchInput value={search} onChange={onSearchChange} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <StatusFilters
          value={status}
          counts={counts}
          onChange={onStatusChange}
        />
        <SortSelect value={sort} onChange={onSortChange} />
      </div>
    </div>
  );
}
