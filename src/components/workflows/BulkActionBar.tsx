import { Button } from "@/components/ui/button";
import { Archive, Play, X } from "lucide-react";

interface BulkActionBarProps {
  count: number;
  onArchive: () => void;
  onBulkRun: () => void;
  onClear: () => void;
}

export default function BulkActionBar({
  count,
  onArchive,
  onBulkRun,
  onClear,
}: BulkActionBarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-xl">
      <span className="text-sm font-medium text-slate-700 min-w-max">
        {count} selected
      </span>
      <div className="h-4 w-px bg-slate-200" />
      <Button
        size="sm"
        variant="outline"
        className="gap-1.5 border-slate-200 text-slate-700 hover:bg-slate-50"
        onClick={onArchive}
      >
        <Archive className="h-3.5 w-3.5" />
        Archive
      </Button>
      <Button
        size="sm"
        className="gap-1.5 bg-violet-900 hover:bg-violet-800 text-white"
        onClick={onBulkRun}
      >
        <Play className="h-3.5 w-3.5" />
        Bulk Run
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="gap-1.5 text-slate-500 hover:text-slate-700"
        onClick={onClear}
      >
        <X className="h-3.5 w-3.5" />
        Clear
      </Button>
    </div>
  );
}
