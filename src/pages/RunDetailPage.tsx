import { ArrowLeft, ChevronDown } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import PageContainer from "@/components/layout/PageContainer";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import StatusBadge from "@/components/shared/StatusBadge";
import TimelineStep from "@/components/run-detail/TimelineStep";
import { useRun } from "@/hooks/useRun";
import { formatDuration } from "@/lib/run-utils";

export default function RunDetailPage() {
  const { id } = useParams();
  const { run, isLoading, error } = useRun(id);
  if (isLoading) {
    return (
      <PageContainer>
        <div className="space-y-6">
          <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-32 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      </PageContainer>
    );
  }
  if (error) {
    return (
      <PageContainer>
        <ErrorState message={error} />
      </PageContainer>
    );
  }
  if (!run) {
    return (
      <PageContainer>
        <EmptyState
          title="Run not found"
          description="The requested run does not exist."
        />
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <Link
        to="/runs"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to Runs
      </Link>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {run.workflow_name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>Run #{run.id.slice(-8)}</span>
            <span>•</span>
            <span>Subject: {run.subject_id ?? "—"}</span>
          </div>
        </div>
        <StatusBadge status={run.status} />
      </div>
      {run.warning && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
          <p className="font-medium">Warning</p>
          <p className="mt-1 text-sm">{run.warning}</p>
        </div>
      )}
      <div className="mb-6 rounded-2xl border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Execution Summary</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">Started</p>
            <p className="mt-1 font-medium">
              {new Date(run.started_at).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Duration</p>
            <p className="mt-1 font-medium">
              {formatDuration(run.duration_ms)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Workflow Version</p>
            <p className="mt-1 font-medium">{run.workflow_version}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Progress</p>
            <p className="mt-1 font-medium">{run.progress ?? 0}%</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Execution Timeline</h2>
            {run.steps.length === 0 ? (
              <EmptyState
                title="No steps yet"
                description="This run has not started executing workflow nodes."
              />
            ) : (
              <div className="space-y-4">
                {run.steps.map((step) => (
                  <TimelineStep key={step.id} step={step} />
                ))}
              </div>
            )}
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Run Details</h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-slate-500">Workflow ID</dt>
                <dd className="mt-1 break-all font-medium">
                  {run.workflow_id}
                </dd>
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
                <ChevronDown size={18} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <pre className=" mt-4 overflow-auto rounded-lg bg-slate-50  p-4 text-xs">
                  {JSON.stringify(run.trigger_input, null, 2)}
                </pre>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
