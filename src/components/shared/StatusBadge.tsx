import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  published: "bg-emerald-100 text-emerald-700",
  completed: "bg-emerald-100 text-emerald-700",
  draft: "bg-slate-100 text-slate-700",
  archived: "bg-stone-100 text-stone-700",
  running: "bg-violet-100 text-violet-700",
  waiting: "bg-amber-100 text-amber-700",
  failed: "bg-rose-100 text-rose-700",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize",
        statusStyles[status],
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}
