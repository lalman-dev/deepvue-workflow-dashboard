import type { RunFilterStatus } from "@/types/run";

interface Props {
  value: RunFilterStatus;
  counts: Record<RunFilterStatus, number>;
  onChange: (value: RunFilterStatus) => void;
}

const statuses: RunFilterStatus[] = [
  "all",
  "running",
  "waiting",
  "completed",
  "failed",
];

export default function RunsStatusFilters({ value, counts, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => {
        const active = value === status;

        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={
              active
                ? "rounded-full bg-violet-900 px-4 py-2 text-white"
                : "rounded-full bg-white px-4 py-2"
            }
          >
            {status} ({counts[status]})
          </button>
        );
      })}
    </div>
  );
}
