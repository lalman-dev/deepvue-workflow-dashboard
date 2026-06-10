import { format, isFuture } from "date-fns";

export function getWorkflowDateInfo(dateString: string) {
  const date = new Date(dateString);

  return {
    formatted: format(date, "MMM d, yyyy"),

    isFutureDate: isFuture(date),
  };
}
