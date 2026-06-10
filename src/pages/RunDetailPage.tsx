import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import StatusBadge from "@/components/shared/StatusBadge";
import ExecutionTimeline from "@/components/run-detail/ExecutionTimeline";
import RunSummaryCard from "@/components/run-detail/RunSummaryCard";
import RunMetadataCard from "@/components/run-detail/RunMetadataCard";
import { useRun } from "@/hooks/useRun";

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

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
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

      <div className="mb-6">
        <RunSummaryCard run={run} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section>
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Execution Timeline</h2>
            <ExecutionTimeline steps={run.steps} />
          </div>
        </section>

        <aside>
          <RunMetadataCard run={run} />
        </aside>
      </div>
    </PageContainer>
  );
}
