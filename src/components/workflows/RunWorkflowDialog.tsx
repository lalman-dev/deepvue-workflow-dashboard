import { useEffect, useState } from "react";
import type { Workflow } from "@/types/workflow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

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
    if (!open) setSubjectId("");
  }, [open]);

  const handleSubmit = () => {
    if (!workflow) return;
    console.log({ workflow_id: workflow.id, subject_id: subjectId });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Run Workflow</DialogTitle>
          <DialogDescription>
            Start an execution of this workflow.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Workflow
            </p>
            <p className="mt-0.5 text-sm font-medium text-slate-900 leading-snug">
              {workflow?.name}
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="subject-id"
              className="text-sm font-medium text-slate-700"
            >
              Subject ID
            </label>
            <Input
              id="subject-id"
              placeholder="e.g. user_abc123"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              autoFocus
            />
          </div>

          <Button
            className="w-full gap-2 bg-violet-900 hover:bg-violet-800 text-white"
            onClick={handleSubmit}
          >
            <Play className="h-4 w-4" />
            Start Run
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
