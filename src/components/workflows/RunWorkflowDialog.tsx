import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [subjectId, setSubjectId] = useState("");

  useEffect(() => {
    if (!open) {
      setSubjectId("");
    }
  }, [open]);

  if (!workflow) return null;

  const handleSubmit = () => {
    console.log({
      workflow_id: workflow.id,
      subject_id: subjectId,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Run Workflow</DialogTitle>

          <DialogDescription>Start a new workflow execution.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">Workflow</p>

            <p className="font-medium">{workflow.name}</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject-id" className="text-sm font-medium">
              Subject ID
            </label>

            <Input
              id="subject-id"
              placeholder="Enter subject ID"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button onClick={handleSubmit}>Start</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
