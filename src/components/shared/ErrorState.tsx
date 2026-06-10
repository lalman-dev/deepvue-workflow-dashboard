import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-rose-600" />
        <p className="text-sm font-medium text-rose-700">{message}</p>
      </div>
    </div>
  );
}
