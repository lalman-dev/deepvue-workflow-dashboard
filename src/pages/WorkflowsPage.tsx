import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import WorkflowToolbar from "@/components/workflows/WorkflowToolbar";
import { useWorkflows } from "@/hooks/useWorkflows";
import { useDebounce } from "@/hooks/useDebounce";
import type {
  Workflow,
  WorkflowFilterStatus,
  WorkflowSort,
} from "@/types/workflow";

const DEFAULT_STATUS: WorkflowFilterStatus = "all";
const DEFAULT_SORT: WorkflowSort = "last_modified";

export default function WorkflowsPage() {
  const { data: workflows, isLoading, error } = useWorkflows();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";
  const initialStatus =
    (searchParams.get("status") as WorkflowFilterStatus) ?? DEFAULT_STATUS;
  const initialSort =
    (searchParams.get("sort") as WorkflowSort) ?? DEFAULT_SORT;
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState<WorkflowFilterStatus>(initialStatus);
  const [sort, setSort] = useState<WorkflowSort>(initialSort);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    }
    if (status !== DEFAULT_STATUS) {
      params.set("status", status);
    }
    if (sort !== DEFAULT_SORT) {
      params.set("sort", sort);
    }
    setSearchParams(params);
  }, [debouncedSearch, status, sort, setSearchParams]);

  const counts = useMemo(() => {
    return {
      all: workflows.length,
      published: workflows.filter((workflow) => workflow.status === "published")
        .length,
      draft: workflows.filter((workflow) => workflow.status === "draft").length,
      archived: workflows.filter((workflow) => workflow.status === "archived")
        .length,
    };
  }, [workflows]);

  const filteredWorkflows = useMemo(() => {
    let result = [...workflows];
    if (debouncedSearch) {
      result = result.filter((workflow) =>
        workflow.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    if (status !== "all") {
      result = result.filter((workflow) => workflow.status === status);
    }

    switch (sort) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "nodes":
        result.sort((a, b) => b.nodes - a.nodes);
        break;

      case "last_modified":
      default:
        result.sort(
          (a, b) =>
            new Date(b.last_modified).getTime() -
            new Date(a.last_modified).getTime(),
        );
    }

    return result;
  }, [workflows, debouncedSearch, status, sort]);

  return (
    <PageContainer>
      <PageHeader
        title="Workflows Library"
        description="Browse and manage reusable workflows."
      />
      <WorkflowToolbar
        search={search}
        status={status}
        sort={sort}
        counts={counts}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onSortChange={setSort}
      />
      {isLoading && <div>Loading workflows...</div>}
      {error && <div>{error}</div>}
      {!isLoading && !error && (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">
            {filteredWorkflows.length} workflows found
          </p>
        </div>
      )}
    </PageContainer>
  );
}
