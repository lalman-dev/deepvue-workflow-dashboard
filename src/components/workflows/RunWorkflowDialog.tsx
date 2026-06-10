import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Workflow } from "@/types/workflow";

interface RunWorkflowDialogProps {
  workflow: Workflow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RunWorkflowDialog({
  workflow,
  open,
  onOpenChange,
}: RunWorkflowDialogProps) {
  if (!workflow) return null;

  const handleRun = () => {
    console.log("Running workflow:", workflow.id);

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Run Workflow</DialogTitle>

          <DialogDescription>
            Review workflow details before execution.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <p className="text-sm text-slate-500">Workflow Name</p>
            <p className="font-medium">{workflow.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p className="capitalize">{workflow.status}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Nodes</p>
            <p>{workflow.nodes}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-violet-900 hover:bg-violet-800 text-white"
            onClick={handleRun}
          >
            Run Workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
