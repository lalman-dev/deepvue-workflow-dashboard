import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StatusBadge from "@/components/shared/StatusBadge";
import { getWorkflowDateInfo } from "@/lib/date";
import type { Workflow } from "@/types/workflow";

interface WorkflowCardProps {
  workflow: Workflow;
  isSelected: boolean;
  onSelect: (workflowId: string, checked: boolean) => void;
  onRun: (workflow: Workflow) => void;
  onOpen: (workflowId: string) => void;
}

export default function WorkflowCard({
  workflow,
  isSelected,
  onSelect,
  onRun,
  onOpen,
}: WorkflowCardProps) {
  const { formatted, isFutureDate } = getWorkflowDateInfo(
    workflow.last_modified,
  );

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelect(workflow.id, checked === true)}
        />
        <StatusBadge status={workflow.status} />
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className="mt-4 line-clamp-2 cursor-default text-lg font-semibold text-slate-900">
              {workflow.name}
            </h3>
          </TooltipTrigger>

          <TooltipContent>{workflow.name}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
        {workflow.description}
      </p>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{workflow.nodes} nodes</span>

          <span className={isFutureDate ? "font-medium text-amber-600" : ""}>
            {formatted}
            {isFutureDate && " (future)"}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onRun(workflow);
            }}
          >
            Run
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(workflow.id);
            }}
          >
            Open
          </Button>
        </div>
      </div>
    </article>
  );
}
