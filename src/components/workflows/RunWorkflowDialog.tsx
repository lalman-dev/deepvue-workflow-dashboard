import { useEffect, useState } from "react";
import type { Workflow } from "@/types/workflow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const handleSubmit = () => {
    if (!workflow) return;
    console.log({
      workflow_id: workflow.id,
      subject_id: subjectId,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Run Workflow</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">Workflow</p>
            <p className="font-medium">{workflow?.name}</p>
          </div>
          <Input
            placeholder="Subject ID"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          />
          <Button className="w-full" onClick={handleSubmit}>
            Start
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
