import type { Workflow } from "@/types/workflow";
import StatusBadge from "@/components/shared/StatusBadge";

interface WorkflowCardProps {
  workflow: Workflow;
}

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
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
      <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-slate-900">
        {workflow.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
        {workflow.description}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>{workflow.nodes} nodes</span>
        <span>{new Date(workflow.last_modified).toLocaleDateString()}</span>
      </div>
    </article>
  );
}
