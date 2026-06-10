import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import PageContainer from "@/components/layout/PageContainer";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import StatusBadge from "@/components/shared/StatusBadge";

import { useRun } from "@/hooks/useRun";

import { formatDuration } from "@/lib/run-utils";

export default function RunDetailPage() {
  const { id } = useParams();

  const { run, isLoading, error } = useRun(id);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <div className="h-12 rounded bg-slate-100 animate-pulse" />
          <div className="h-40 rounded bg-slate-100 animate-pulse" />
          <div className="h-64 rounded bg-slate-100 animate-pulse" />
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
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to Runs
      </Link>

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{run.workflow_name}</h1>

          <p className="mt-2 text-slate-500">Run #{run.id.slice(-8)}</p>
        </div>

        <StatusBadge status={run.status} />
      </div>

      {run.warning && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
          {run.warning}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Execution Timeline</h2>

            {run.steps.length === 0 ? (
              <p className="text-slate-500">No steps available yet.</p>
            ) : (
              <div className="space-y-4">
                {run.steps.map((step) => (
                  <div key={step.id} className="rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{step.node_id}</h3>

                        <p className="text-sm text-slate-500">
                          {step.node_type}
                        </p>
                      </div>

                      <StatusBadge status={step.status} />
                    </div>

                    {step.output && (
                      <pre className="mt-4 overflow-auto rounded-lg bg-slate-50 p-3 text-xs">
                        {JSON.stringify(step.output, null, 2)}
                      </pre>
                    )}

                    {step.error && (
                      <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                        {step.error}
                      </div>
                    )}

                    <div className="mt-4 text-xs text-slate-500">
                      Duration: {formatDuration(step.duration_ms)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Run Details</h2>

            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Workflow</dt>
                <dd>{run.workflow_id}</dd>
              </div>

              <div>
                <dt className="text-slate-500">Version</dt>
                <dd>{run.workflow_version}</dd>
              </div>

              <div>
                <dt className="text-slate-500">Subject</dt>
                <dd>{run.subject_id ?? "—"}</dd>
              </div>

              <div>
                <dt className="text-slate-500">Started</dt>
                <dd>{new Date(run.started_at).toLocaleString()}</dd>
              </div>

              <div>
                <dt className="text-slate-500">Duration</dt>
                <dd>{formatDuration(run.duration_ms)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Trigger Input</h2>

            <pre className="overflow-auto rounded-lg bg-slate-50 p-3 text-xs">
              {JSON.stringify(run.trigger_input, null, 2)}
            </pre>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
