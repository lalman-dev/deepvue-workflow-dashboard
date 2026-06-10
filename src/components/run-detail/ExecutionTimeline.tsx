import TimelineStep from "@/components/run-detail/TimelineStep";
import EmptyState from "@/components/shared/EmptyState";
import type { RunStep } from "@/types/run";

interface Props {
  steps: RunStep[];
}

export default function ExecutionTimeline({ steps }: Props) {
  if (steps.length === 0) {
    return (
      <EmptyState
        title="No steps yet"
        description="This run has not started executing workflow nodes."
      />
    );
  }

  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <TimelineStep key={step.id} step={step} />
      ))}
    </div>
  );
}