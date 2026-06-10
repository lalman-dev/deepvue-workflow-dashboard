export default function WorkflowCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm animate-pulse">
      {/* top row: checkbox + badge */}
      <div className="flex items-start justify-between">
        <div className="h-4 w-4 rounded bg-slate-200" />
        <div className="h-5 w-20 rounded-full bg-slate-200" />
      </div>
      {/* title */}
      <div className="mt-4 h-5 w-3/4 rounded bg-slate-200" />
      <div className="mt-2 h-4 w-full rounded bg-slate-200" />
      <div className="mt-1 h-4 w-2/3 rounded bg-slate-200" />
      {/* meta row */}
      <div className="mt-5 flex justify-between">
        <div className="h-4 w-16 rounded bg-slate-200" />
        <div className="h-4 w-24 rounded bg-slate-200" />
      </div>
      {/* buttons */}
      <div className="mt-3 flex gap-2">
        <div className="h-8 flex-1 rounded-md bg-slate-200" />
        <div className="h-8 w-16 rounded-md bg-slate-200" />
      </div>
    </div>
  );
}
