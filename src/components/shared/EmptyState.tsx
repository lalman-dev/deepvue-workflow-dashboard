import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
      <SearchX className="mx-auto mb-4 h-8 w-8 text-slate-400" />
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}
