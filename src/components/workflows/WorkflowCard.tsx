import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StatusBadge from "@/components/shared/StatusBadge";
import { getWorkflowDateInfo } from "@/lib/date";
import type { Workflow } from "@/types/workflow";

interface WorkflowCardProps {
  workflow: Workflow;
}

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  const { formatted, isFutureDate } = getWorkflowDateInfo(
    workflow.last_modified,
  );
  return (
    <article
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <StatusBadge status={workflow.status} />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <h3
              className="
                mt-4
                line-clamp-2
                text-lg
                font-semibold
                text-slate-900
              "
            >
              {workflow.name}
            </h3>
          </TooltipTrigger>

          <TooltipContent>{workflow.name}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <p
        className="
          mt-2
          line-clamp-2
          text-sm
          text-slate-500
        "
      >
        {workflow.description}
      </p>

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          text-sm
          text-slate-500
        "
      >
        <span>{workflow.nodes} nodes</span>
        <span className={isFutureDate ? "text-amber-600 font-medium" : ""}>
          {formatted}
          {isFutureDate && " (future)"}
        </span>
      </div>
    </article>
  );
}
