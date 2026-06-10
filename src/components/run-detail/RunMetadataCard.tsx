import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Run } from "@/types/run";
import { formatDuration } from "@/lib/run-utils";

interface Props {
  run: Run;
}

export default function RunMetadataCard({ run }: Props) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Run Details</h2>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-slate-500">Workflow ID</dt>
            <dd className="mt-1 break-all font-medium">{run.workflow_id}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Version</dt>
            <dd className="mt-1 font-medium">{run.workflow_version}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Subject</dt>
            <dd className="mt-1 font-medium">{run.subject_id ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Started</dt>
            <dd className="mt-1 font-medium">
              {new Date(run.started_at).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Duration</dt>
            <dd className="mt-1 font-medium">
              {formatDuration(run.duration_ms)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <h2 className="text-lg font-semibold">Trigger Input</h2>
            <ChevronDown
              size={18}
              className="transition-transform group-data-[state=open]:rotate-180"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <pre className="mt-4 overflow-auto rounded-lg bg-slate-50 p-4 text-xs">
              {JSON.stringify(run.trigger_input, null, 2)}
            </pre>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
