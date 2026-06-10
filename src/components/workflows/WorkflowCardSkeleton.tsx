export default function WorkflowCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 h-5 w-20 rounded bg-slate-200" />
      <div className="mb-3 h-6 w-3/4 rounded bg-slate-200" />
      <div className="mb-2 h-4 w-full rounded bg-slate-200" />
      <div className="mb-4 h-4 w-2/3 rounded bg-slate-200" />
      <div className="h-4 w-24 rounded bg-slate-200" />
    </div>
  );
}
