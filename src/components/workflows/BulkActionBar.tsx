import { Button } from "@/components/ui/button";

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
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <span className="text-sm font-medium">{count} selected</span>
      <Button variant="outline" onClick={onArchive}>
        Archive Selected
      </Button>
      <Button onClick={onBulkRun}>Bulk Run</Button>
      <Button variant="ghost" onClick={onClear}>
        Clear Selection
      </Button>
    </div>
  );
}
